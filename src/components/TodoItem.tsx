import Link from 'next/link'
import { Todo } from '@/lib/api'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

const colorClasses = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  indigo: 'bg-indigo-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  gray: 'bg-gray-500',
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const colorClass = todo.color && colorClasses[todo.color as keyof typeof colorClasses] 
    ? colorClasses[todo.color as keyof typeof colorClasses]
    : 'bg-gray-500'

  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
      {/* Color indicator */}
      <div className={`w-4 h-4 rounded-full ${colorClass} flex-shrink-0`}></div>
      
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id, !todo.completed)}
        className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
          todo.completed 
            ? 'bg-green-500 border-green-500' 
            : 'border-gray-400 hover:border-gray-300'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Todo content - clickable to edit */}
      <Link href={`/edit/${todo.id}`} className="flex-1 min-w-0">
        <div className="cursor-pointer hover:bg-gray-700 rounded p-2 -m-2 transition-colors">
          <h3 className={`font-medium truncate ${todo.completed ? 'line-through text-gray-400' : 'text-white hover:text-blue-300'}`}>
            {todo.title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">Click to edit</p>
        </div>
      </Link>

      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-400 transition-colors p-1"
        title="Delete task"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 112 0v3a1 1 0 11-2 0V9zm4 0a1 1 0 112 0v3a1 1 0 11-2 0V9z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}
