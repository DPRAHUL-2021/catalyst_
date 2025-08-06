'use client'

import { motion } from 'framer-motion'
import { LiveMetricsPanel } from '@/components/live-metrics-panel'
import { JobSchedulingPanel } from '@/components/job-scheduling-panel'
import { GamificationCenter } from '@/components/gamification-center'
import { RetentionEngine } from '@/components/retention-engine'
import { AIInsightsChat } from '@/components/ai-insights-chat'
import { TimelineNotifications } from '@/components/timeline-notifications'
import { WalletRewards } from '@/components/wallet-rewards'
import { GlobalHeatmap } from '@/components/global-heatmap'
import { UserRole } from '@/app/page'

interface OverviewPageProps {
  role: UserRole
}

export function OverviewPage({ role }: OverviewPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-12 gap-6 h-full"
    >
      {/* Left Column - Main Metrics */}
      <div className="col-span-12 lg:col-span-8 space-y-6">
        <LiveMetricsPanel role={role} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <JobSchedulingPanel role={role} />
          <GamificationCenter role={role} />
        </div>
        <GlobalHeatmap />
      </div>

      {/* Right Column - Secondary Panels */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <RetentionEngine role={role} />
        <AIInsightsChat />
        <TimelineNotifications />
        <WalletRewards role={role} />
      </div>
    </motion.div>
  )
}
