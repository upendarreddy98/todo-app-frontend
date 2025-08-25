import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TodoProvider } from '@/contexts/TodoContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A full-stack todo application built with Next.js and Express.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoProvider>
          <div className="min-h-screen bg-gray-900 text-white">
            {children}
          </div>
        </TodoProvider>
      </body>
    </html>
  )
}
