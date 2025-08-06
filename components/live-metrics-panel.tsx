'use client'

import { motion } from 'framer-motion'
import { Activity, Cpu, HardDrive, Zap, TrendingUp, Globe } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { UserRole } from '@/app/page'
import { useEffect, useState } from 'react'

interface LiveMetricsPanelProps {
  role: UserRole
}

export function LiveMetricsPanel({ role }: LiveMetricsPanelProps) {
  const [metrics, setMetrics] = useState({
    activeNodes: 1247,
    cpuLoad: 73.2,
    gpuLoad: 89.1,
    memoryUsage: 67.8,
    networkThroughput: 2.4,
    uptime: 99.97
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        activeNodes: prev.activeNodes + Math.floor(Math.random() * 10 - 5),
        cpuLoad: Math.max(0, Math.min(100, prev.cpuLoad + (Math.random() - 0.5) * 5)),
        gpuLoad: Math.max(0, Math.min(100, prev.gpuLoad + (Math.random() - 0.5) * 3)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 2)),
        networkThroughput: Math.max(0, prev.networkThroughput + (Math.random() - 0.5) * 0.5),
        uptime: prev.uptime
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const metricCards = [
    {
      title: 'Active Nodes',
      value: metrics.activeNodes.toLocaleString(),
      icon: Globe,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
      change: '+12.3%',
      sparkline: [65, 72, 68, 75, 82, 78, 85, 89, 92, 88]
    },
    {
      title: 'CPU Load',
      value: `${metrics.cpuLoad.toFixed(1)}%`,
      icon: Cpu,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
      change: '+2.1%',
      sparkline: [45, 52, 48, 55, 62, 58, 65, 69, 72, 73]
    },
    {
      title: 'GPU Utilization',
      value: `${metrics.gpuLoad.toFixed(1)}%`,
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
      change: '+8.7%',
      sparkline: [78, 82, 85, 88, 84, 87, 90, 89, 91, 89]
    },
    {
      title: 'Memory Usage',
      value: `${metrics.memoryUsage.toFixed(1)}%`,
      icon: HardDrive,
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      change: '-1.2%',
      sparkline: [62, 65, 68, 70, 67, 69, 66, 68, 67, 68]
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          Network Status
        </h2>
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
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-green-700">
            {metrics.uptime}% Uptime
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className={`p-6 ${metric.bg} border-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group`}>
              <motion.div
                className="space-y-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-r ${metric.color}`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className={`text-sm font-medium ${
                    metric.change.startsWith('+') ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {metric.change}
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-sm text-slate-600">
                    {metric.title}
                  </div>
                </div>

                {/* Sparkline */}
                <div className="h-12 flex items-end gap-1">
                  {metric.sparkline.map((value, i) => (
                    <motion.div
                      key={i}
                      className={`flex-1 bg-gradient-to-t ${metric.color} rounded-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
                      style={{ height: `${(value / 100) * 100}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(value / 100) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Network Throughput Chart */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Network Throughput
          </h3>
          <div className="text-2xl font-bold text-blue-600">
            {metrics.networkThroughput.toFixed(1)} GB/s
          </div>
        </div>

        <div className="h-32 flex items-end gap-2">
          {[...Array(24)].map((_, i) => {
            const height = Math.random() * 80 + 20
            return (
              <motion.div
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-400/60 to-blue-500/80 rounded-sm"
                style={{ height: `${height}%` }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: i * 0.02 }}
                whileHover={{ 
                  height: `${Math.min(height + 10, 100)}%`,
                  backgroundColor: 'rgba(59, 130, 246, 0.9)'
                }}
              />
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
