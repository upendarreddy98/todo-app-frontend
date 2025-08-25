'use client'

import Link from 'next/link'
import { TodoItem } from '@/components/TodoItem'
import { TodoStats } from '@/components/TodoStats'
import { useTodos } from '@/contexts/TodoContext'

export default function Home() {
  const { todos, loading, error, toggleTodo, deleteTodo, clearError } = useTodos()

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await toggleTodo(id, completed)
    } catch (error) {
      // Error is already handled in context, but we can show user feedback
      console.error('Error updating todo:', error)
    }
  }

  const handleDeleteTodo = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTodo(id)
      } catch (error) {
        // Error is already handled in context, but we can show user feedback
        console.error('Error deleting todo:', error)
      }
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-md mx-auto p-6">
        {/* Header */}
        <div className="bg-blue-600 rounded-lg p-4 mb-6 text-center">
          <h1 className="text-xl font-semibold">Todo App</h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white p-3 rounded-lg mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={clearError} className="text-white hover:text-gray-200">
              ✕
            </button>
          </div>
        )}

        {/* Stats */}
        <TodoStats total={todos.length} completed={completedCount} />

        {/* Todo List */}
        <div className="space-y-3 mb-6">
          {todos.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>No tasks yet. Create your first task!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>

        {/* Add Task Button */}
        <Link href="/create">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            Create Task
          </button>
        </Link>
      </div>
    </div>
  )
}
