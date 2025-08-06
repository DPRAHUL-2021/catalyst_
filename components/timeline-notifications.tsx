'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, AlertCircle, Zap, Gift, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'

export function TimelineNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Job Completed',
      description: 'GPT-4 fine-tuning task finished successfully',
      timestamp: '2 min ago',
      reward: 2400,
      icon: CheckCircle
    },
    {
      id: 2,
      type: 'info',
      title: 'New High Priority Job',
      description: 'DALL-E 3 image generation batch available',
      timestamp: '5 min ago',
      reward: 1800,
      icon: Zap
    },
    {
      id: 3,
      type: 'warning',
      title: 'Performance Alert',
      description: 'GPU temperature reached 82°C',
      timestamp: '12 min ago',
      icon: AlertCircle
    },
    {
      id: 4,
      type: 'success',
      title: 'Achievement Unlocked',
      description: 'First Steps badge earned!',
      timestamp: '1 hour ago',
      icon: Gift
    },
    {
      id: 5,
      type: 'info',
      title: 'Network Update',
      description: 'New contributor joined your region',
      timestamp: '2 hours ago',
      icon: TrendingUp
    }
  ])

  const [newNotification, setNewNotification] = useState(false)

  useEffect(() => {
    // Simulate new notifications
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newNotif = {
          id: Date.now(),
          type: 'info',
          title: 'Real-time Update',
          description: 'New compute task available in your region',
          timestamp: 'now',
          reward: Math.floor(Math.random() * 2000) + 500,
          icon: Zap
        }
        
        setNotifications(prev => [newNotif, ...prev.slice(0, 4)])
        setNewNotification(true)
        
        setTimeout(() => setNewNotification(false), 3000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const typeColors = {
    success: 'text-green-600',
    info: 'text-blue-600',
    warning: 'text-yellow-600',
    error: 'text-red-600'
  }

  const typeBgColors = {
    success: 'bg-green-50 border-green-200',
    info: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200'
  }

  const typeIconBgs = {
    success: 'bg-green-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            Activity Timeline
          </h3>
          
          <motion.div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              newNotification 
                ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                : 'bg-slate-100 text-slate-600'
            }`}
            animate={newNotification ? { 
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0.1)',
                '0 0 0 4px rgba(59, 130, 246, 0.1)',
                '0 0 0 0 rgba(59, 130, 246, 0.1)',
              ]
            } : {}}
            transition={{ duration: 1, repeat: newNotification ? Infinity : 0 }}
          >
            Live
          </motion.div>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md ${
                  typeBgColors[notification.type as keyof typeof typeBgColors]
                }`}
              >
                {/* Timeline connector */}
                {index < notifications.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-slate-200" />
                )}

                <div className="flex items-start gap-3">
                  <motion.div
                    className={`p-2 rounded-lg ${typeIconBgs[notification.type as keyof typeof typeIconBgs]} flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    animate={index === 0 && newNotification ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <notification.icon className="w-4 h-4 text-white" />
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-slate-900 truncate">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-slate-500 flex-shrink-0 ml-2">
                        {notification.timestamp}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-2">
                      {notification.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${typeColors[notification.type as keyof typeof typeColors]} border-current`}
                      >
                        {notification.type}
                      </Badge>
                      
                      {notification.reward && (
                        <div className="text-sm font-medium text-blue-600">
                          +{notification.reward.toLocaleString()} CAT
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Activity Summary */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-600">12</div>
              <div className="text-xs text-slate-600">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-600">3</div>
              <div className="text-xs text-slate-600">In Progress</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">8</div>
              <div className="text-xs text-slate-600">Queued</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
