'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, TrendingUp, Gift, Zap, Heart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/app/page'

interface RetentionEngineProps {
  role: UserRole
}

export function RetentionEngine({ role }: RetentionEngineProps) {
  const retentionData = {
    riskScore: 23,
    satisfactionScore: 87,
    engagementTrend: 'increasing',
    lastActive: '2 hours ago',
    streakDays: 15,
    totalRewards: 12450
  }

  const nudges = [
    {
      id: 1,
      type: 'bonus',
      title: 'Weekend Boost!',
      description: 'Earn 2x rewards for all completed tasks',
      action: 'Activate Boost',
      urgency: 'high',
      icon: Zap
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Almost There!',
      description: 'Complete 3 more tasks to unlock next level',
      action: 'View Tasks',
      urgency: 'medium',
      icon: Gift
    },
    {
      id: 3,
      type: 'social',
      title: 'Community Challenge',
      description: 'Join 1,247 contributors in the global challenge',
      action: 'Join Challenge',
      urgency: 'low',
      icon: Heart
    }
  ]

  const urgencyColors = {
    high: 'from-red-500 to-red-600',
    medium: 'from-yellow-500 to-yellow-600',
    low: 'from-green-500 to-green-600'
  }

  const urgencyBgs = {
    high: 'bg-red-50',
    medium: 'bg-yellow-50',
    low: 'bg-green-50'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            Insights
          </h3>
          
          <motion.div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              retentionData.riskScore < 30 
                ? 'bg-green-50 text-green-700 border border-green-200'
                : retentionData.riskScore < 60
                ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.1)',
                '0 0 0 4px rgba(34, 197, 94, 0.1)',
                '0 0 0 0 rgba(34, 197, 94, 0.1)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Risk: {retentionData.riskScore}%
          </motion.div>
        </div>

        {/* Satisfaction Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Satisfaction Score</span>
            <span className="text-sm text-green-600">{retentionData.satisfactionScore}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${retentionData.satisfactionScore}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">{retentionData.streakDays}</div>
            <div className="text-sm text-slate-600">Day Streak</div>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
            <div className="text-2xl font-bold text-purple-600">{retentionData.totalRewards.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Total CAT</div>
          </div>
        </div>

        {/* Personalized Nudges */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-3">Recommended Actions</h4>
          <div className="space-y-3">
            {nudges.map((nudge, index) => (
              <motion.div
                key={nudge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all duration-300 ${urgencyBgs[nudge.urgency as keyof typeof urgencyBgs]} border-slate-200 hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${urgencyColors[nudge.urgency as keyof typeof urgencyColors]}`}
                    whileHover={{ scale: 1.1 }}
                    animate={{ 
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.1)',
                        '0 0 0 4px rgba(59, 130, 246, 0.1)',
                        '0 0 0 0 rgba(59, 130, 246, 0.1)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <nudge.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 mb-1">{nudge.title}</div>
                    <div className="text-sm text-slate-600 mb-3">{nudge.description}</div>
                    
                    <Button 
                      size="sm" 
                      className={`bg-gradient-to-r ${urgencyColors[nudge.urgency as keyof typeof urgencyColors]} hover:opacity-90 text-white`}
                    >
                      {nudge.action}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Engagement Trend */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-slate-600">Engagement Trend</span>
            </div>
            <div className="text-sm font-medium text-green-600 capitalize">
              {retentionData.engagementTrend}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
