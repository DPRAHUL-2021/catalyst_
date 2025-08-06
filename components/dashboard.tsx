'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AppSidebar } from '@/components/app-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { OverviewPage } from '@/components/pages/overview-page'
import { JobsPage } from '@/components/pages/jobs-page'
import { AchievementsPage } from '@/components/pages/achievements-page'
import { InsightsPage } from '@/components/pages/insights-page'
import { NetworkPage } from '@/components/pages/network-page'
import { SettingsPage } from '@/components/pages/settings-page'
import { ProfilePage } from '@/components/pages/profile-page'
import { User, UserRole, PageType } from '@/app/page'

interface DashboardProps {
  user: User
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentRole, setCurrentRole] = useState<UserRole>(user.role)
  const [currentPage, setCurrentPage] = useState<PageType>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <OverviewPage role={currentRole} />
      case 'jobs':
        return <JobsPage role={currentRole} />
      case 'achievements':
        return <AchievementsPage role={currentRole} />
      case 'insights':
        return <InsightsPage role={currentRole} />
      case 'network':
        return <NetworkPage role={currentRole} />
      case 'profile':
        return <ProfilePage role={currentRole} user={user} />
      case 'settings':
        return <SettingsPage role={currentRole} />
      default:
        return <OverviewPage role={currentRole} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex h-screen">
        <AppSidebar 
          currentRole={currentRole} 
          onRoleChange={setCurrentRole}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          user={user}
          onLogout={onLogout}
        />
        
        <main className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'
        }`}>
          <DashboardHeader 
            currentRole={currentRole} 
            currentPage={currentPage}
            user={user} 
            sidebarOpen={sidebarOpen}
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="flex-1 p-6 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentRole}-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}
