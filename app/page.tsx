'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LandingPage } from '@/components/landing-page'
import { Dashboard } from '@/components/dashboard'
import { ThemeProvider } from '@/contexts/theme-context'
import { ErrorBoundary } from '@/components/common/error-boundary'

export type UserRole = 'contributor' | 'requester' | 'admin'
export type PageType = 'overview' | 'jobs' | 'achievements' | 'insights' | 'network' | 'settings' | 'profile'

export interface User {
  id: string
  username: string
  role: UserRole
  token: string
  email?: string
  joinedAt?: string
  totalEarnings?: number
  level?: number
}

export default function CatalystApp() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('catalyst_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('catalyst_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('catalyst_user')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <motion.div
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AnimatePresence mode="wait">
          {user ? (
            <Dashboard key="dashboard" user={user} onLogout={handleLogout} />
          ) : (
            <LandingPage key="landing" onLogin={handleLogin} />
          )}
        </AnimatePresence>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
