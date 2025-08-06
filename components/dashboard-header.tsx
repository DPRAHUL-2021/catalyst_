'use client'

import { motion } from 'framer-motion'
import { Bell, Search, Menu, Zap, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserRole, User, PageType } from '@/app/page'

interface DashboardHeaderProps {
  currentRole: UserRole
  currentPage: PageType
  user: User
  sidebarOpen: boolean
  onSidebarToggle: () => void
}

export function DashboardHeader({ currentRole, currentPage, user, sidebarOpen, onSidebarToggle }: DashboardHeaderProps) {
  const roleMessages = {
    contributor: "Your compute power is making AI possible",
    requester: "Deploy and scale your AI workloads",
    admin: "Managing the global compute network"
  }

  const pageLabels = {
    overview: 'Overview',
    jobs: 'Jobs',
    achievements: 'Achievements',
    insights: 'Insights',
    network: 'Network'
  }

  return (
    <motion.header
      className="h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-6 flex items-center justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500">Dashboard</span>
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <span className="font-medium text-slate-900">{pageLabels[currentPage]}</span>
        </div>

        <motion.div
          className="hidden md:flex items-center gap-3 ml-6"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-slate-600 font-medium">
            {roleMessages[currentRole]}
          </span>
        </motion.div>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search network..."
            className="pl-10 w-64 bg-white/60 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        {/* Notifications */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative hover:bg-white/60">
            <Bell className="w-5 h-5 text-slate-600" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </Button>
        </motion.div>

        {/* Network Status */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200"
          animate={{ 
            boxShadow: [
              '0 0 0 0 rgba(34, 197, 94, 0.1)',
              '0 0 0 4px rgba(34, 197, 94, 0.1)',
              '0 0 0 0 rgba(34, 197, 94, 0.1)',
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Zap className="w-4 h-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">Online</span>
        </motion.div>

        {/* User Avatar */}
        <motion.div
          className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white font-medium text-sm">
            {user.username.charAt(0).toUpperCase()}
          </span>
        </motion.div>
      </div>
    </motion.header>
  )
}
