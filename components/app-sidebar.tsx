'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Zap, Crown, Activity, Calendar, Trophy, Brain, Network, Settings, LogOut, Menu, X, ChevronLeft, ChevronRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UserRole, User as UserType, PageType } from '@/app/page'

interface AppSidebarProps {
  currentRole: UserRole
  onRoleChange: (role: UserRole) => void
  currentPage: PageType
  onPageChange: (page: PageType) => void
  isOpen: boolean
  onToggle: () => void
  user: UserType
  onLogout: () => void
}

export function AppSidebar({ 
  currentRole, 
  onRoleChange, 
  currentPage, 
  onPageChange, 
  isOpen, 
  onToggle, 
  user, 
  onLogout 
}: AppSidebarProps) {
  const roleConfig = {
    contributor: {
      icon: Cpu,
      color: 'from-blue-500 to-blue-600',
      label: 'Contributor',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    requester: {
      icon: Zap,
      color: 'from-indigo-500 to-indigo-600',
      label: 'Requester',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    admin: {
      icon: Crown,
      color: 'from-amber-500 to-amber-600',
      label: 'Admin',
      bg: 'bg-amber-50 dark:bg-amber-900/20'
    }
  }

  const menuItems = [
    { icon: Activity, label: 'Overview', id: 'overview' as PageType },
    { icon: Calendar, label: 'Jobs', id: 'jobs' as PageType },
    { icon: Trophy, label: 'Achievements', id: 'achievements' as PageType },
    { icon: Brain, label: 'Insights', id: 'insights' as PageType },
    { icon: Network, label: 'Network', id: 'network' as PageType },
    { icon: User, label: 'Profile', id: 'profile' as PageType },
    { icon: Settings, label: 'Settings', id: 'settings' as PageType },
  ]

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60 z-50 transition-all duration-300 overflow-hidden`}
        initial={false}
        animate={{ 
          width: isOpen ? 288 : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 80 : 0),
          opacity: isOpen ? 1 : (typeof window !== 'undefined' && window.innerWidth >= 1024 ? 1 : 0)
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center justify-between">
              <motion.div
                className="flex items-center gap-3"
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                {isOpen && (
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Catalyst
                  </span>
                )}
              </motion.div>
            </div>

            {/* Role Switcher */}
            {isOpen && (
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl">
                  {Object.entries(roleConfig).map(([role, config]) => {
                    const Icon = config.icon
                    const isActive = currentRole === role
                    
                    return (
                      <motion.button
                        key={role}
                        onClick={() => onRoleChange(role as UserRole)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-300 ${
                          isActive 
                            ? `bg-gradient-to-r ${config.color} text-white shadow-lg` 
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-700/60'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{config.label}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* User Info */}
                <motion.div
                  className={`mt-4 p-4 rounded-xl ${roleConfig[currentRole].bg} border border-slate-200/60 dark:border-slate-700/60`}
                  animate={{ 
                    backgroundColor: roleConfig[currentRole].bg
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${roleConfig[currentRole].color} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-medium text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{user.username}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{roleConfig[currentRole].label}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4">
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    currentPage === item.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-700/60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  title={!isOpen ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span 
                        className="font-medium"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {currentPage === item.id && isOpen && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="space-y-2">
              <Button
                variant="ghost"
                onClick={onLogout}
                className="w-full justify-start text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut className="w-5 h-5 mr-3" />
                {isOpen && 'Sign Out'}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:shadow-md z-10"
        >
          {isOpen ? <ChevronLeft className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        </Button>
      </motion.aside>
    </>
  )
}
