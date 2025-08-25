'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { todoApi, Todo, ApiError } from '@/lib/api'

// Types
interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
}

type TodoAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number }

interface TodoContextType extends TodoState {
  fetchTodos: () => Promise<void>
  createTodo: (data: { title: string; color?: string }) => Promise<void>
  updateTodo: (id: number, data: { title?: string; color?: string; completed?: boolean }) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
  toggleTodo: (id: number, completed: boolean) => Promise<void>
  clearError: () => void
}

// Initial state
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
}

// Reducer
function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'SET_TODOS':
      return { ...state, todos: action.payload, loading: false, error: null }
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos], error: null }
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
        error: null,
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
        error: null,
      }
    default:
      return state
  }
}

// Context
const TodoContext = createContext<TodoContextType | undefined>(undefined)

// Provider component
interface TodoProviderProps {
  children: ReactNode
}

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // Actions
  const fetchTodos = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const todos = await todoApi.getTodos()
      dispatch({ type: 'SET_TODOS', payload: todos })
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to fetch todos'
      dispatch({ type: 'SET_ERROR', payload: message })
    }
  }

  const createTodo = async (data: { title: string; color?: string }) => {
    try {
      const newTodo = await todoApi.createTodo(data)
      dispatch({ type: 'ADD_TODO', payload: newTodo })
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to create todo'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error // Re-throw to allow component to handle it
    }
  }

  const updateTodo = async (id: number, data: { title?: string; color?: string; completed?: boolean }) => {
    try {
      const updatedTodo = await todoApi.updateTodo(id, data)
      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo })
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to update todo'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error // Re-throw to allow component to handle it
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      await todoApi.deleteTodo(id)
      dispatch({ type: 'DELETE_TODO', payload: id })
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to delete todo'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error // Re-throw to allow component to handle it
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id, completed)
      dispatch({ type: 'UPDATE_TODO', payload: updatedTodo })
    } catch (error) {
      const message = error instanceof ApiError ? error.message : 'Failed to toggle todo'
      dispatch({ type: 'SET_ERROR', payload: message })
      throw error // Re-throw to allow component to handle it
    }
  }

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null })
  }

  // Load todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const value: TodoContextType = {
    ...state,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearError,
  }

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

// Hook to use the context
export function useTodos() {
  const context = useContext(TodoContext)
  if (context === undefined) {
    throw new Error('useTodos must be used within a TodoProvider')
  }
  return context
}
