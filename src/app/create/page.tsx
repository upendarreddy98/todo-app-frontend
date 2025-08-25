'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ColorPicker } from '@/components/ColorPicker'
import { useTodos } from '@/contexts/TodoContext'

export default function CreateTask() {
  const router = useRouter()
  const { createTodo } = useTodos()
  const [title, setTitle] = useState('')
  const [selectedColor, setSelectedColor] = useState('blue')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert('Title is required')
      return
    }

    setLoading(true)

    try {
      await createTodo({
        title: title.trim(),
        color: selectedColor,
      })

      router.push('/')
    } catch (error) {
      console.error('Error creating task:', error)
      // Error handling is done in context, but we can show user feedback
      alert('Failed to create task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-blue-600 rounded-lg p-4 mb-8 text-center">
          <h1 className="text-xl font-semibold">Todo App</h1>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-3">
                Task Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your task title..."
                required
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Choose Color
              </label>
              <div className="bg-gray-700 rounded-lg p-4">
                <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Link href="/" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-600 hover:bg-gray-500 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                {loading ? 'Creating...' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
