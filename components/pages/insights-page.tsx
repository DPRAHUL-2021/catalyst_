'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Brain, TrendingUp, BarChart3, PieChart, Activity, Zap, DollarSign, Clock, Target, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/app/page'

interface InsightsPageProps {
  role: UserRole
}

export function InsightsPage({ role }: InsightsPageProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d')

  const insights = [
    {
      id: 1,
      title: 'Peak Performance Hours',
      description: 'Your nodes perform 34% better during 2-6 PM UTC. Consider scheduling more tasks during these hours.',
      type: 'optimization',
      impact: 'high',
      icon: Clock,
      action: 'Optimize Schedule'
    },
    {
      id: 2,
      title: 'GPU Utilization Opportunity',
      description: 'Your GPU is underutilized by 23%. Enable GPU boost mode to increase earnings by up to $45/day.',
      type: 'earnings',
      impact: 'high',
      icon: Zap,
      action: 'Enable GPU Boost'
    },
    {
      id: 3,
      title: 'Network Congestion Alert',
      description: 'High network congestion detected in your region. Consider switching to backup nodes.',
      type: 'alert',
      impact: 'medium',
      icon: AlertTriangle,
      action: 'Switch Nodes'
    },
    {
      id: 4,
      title: 'Earnings Forecast',
      description: 'Based on current trends, you\'re projected to earn 15% more this month compared to last month.',
      type: 'forecast',
      impact: 'medium',
      icon: TrendingUp,
      action: 'View Details'
    }
  ]

  const performanceMetrics = [
    {
      title: 'Average Task Completion Time',
      value: '23.4 min',
      change: '-12%',
      trend: 'down',
      good: true
    },
    {
      title: 'Success Rate',
      value: '98.7%',
      change: '+2.1%',
      trend: 'up',
      good: true
    },
    {
      title: 'Energy Efficiency',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      good: true
    },
    {
      title: 'Network Latency',
      value: '45ms',
      change: '+8%',
      trend: 'up',
      good: false
    }
  ]

  const earningsData = [
    { period: 'Week 1', earnings: 1200, tasks: 45 },
    { period: 'Week 2', earnings: 1450, tasks: 52 },
    { period: 'Week 3', earnings: 1680, tasks: 58 },
    { period: 'Week 4', earnings: 1920, tasks: 64 }
  ]

  const taskDistribution = [
    { type: 'AI Training', percentage: 45, color: 'bg-blue-500' },
    { type: 'Image Generation', percentage: 30, color: 'bg-purple-500' },
    { type: 'Data Processing', percentage: 15, color: 'bg-green-500' },
    { type: 'Model Inference', percentage: 10, color: 'bg-yellow-500' }
  ]

  const impactColors = {
    high: 'border-red-200 bg-red-50',
    medium: 'border-yellow-200 bg-yellow-50',
    low: 'border-green-200 bg-green-50'
  }

  const impactIcons = {
    optimization: Clock,
    earnings: DollarSign,
    alert: AlertTriangle,
    forecast: TrendingUp
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Insights</h1>
          <p className="text-slate-600">
            Get personalized recommendations to optimize your performance and earnings
          </p>
        </div>

        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map((timeframe) => (
            <Button
              key={timeframe}
              variant={selectedTimeframe === timeframe ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe as any)}
              className={selectedTimeframe === timeframe ? 'bg-blue-500 text-white' : ''}
            >
              {timeframe}
            </Button>
          ))}
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          Personalized Recommendations
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {insights.map((insight, index) => {
            const IconComponent = impactIcons[insight.type as keyof typeof impactIcons]
            
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className={`p-6 border transition-all duration-300 hover:shadow-lg ${impactColors[insight.impact as keyof typeof impactColors]}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      insight.impact === 'high' ? 'bg-red-500' :
                      insight.impact === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact} impact
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4">{insight.description}</p>
                      
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                        {insight.action}
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          Performance Metrics
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-white/60">
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="text-sm text-slate-600 mb-2">{metric.title}</div>
                <div className={`text-sm font-medium flex items-center gap-1 ${
                  metric.good 
                    ? (metric.trend === 'up' ? 'text-green-600' : 'text-green-600')
                    : (metric.trend === 'up' ? 'text-red-600' : 'text-green-600')
                }`}>
                  <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                  {metric.change}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-500" />
              Weekly Earnings Trend
            </h3>
            <div className="text-2xl font-bold text-green-600">
              +18.2%
            </div>
          </div>

          <div className="h-48 flex items-end gap-3">
            {earningsData.map((data, index) => {
              const maxEarnings = Math.max(...earningsData.map(d => d.earnings))
              const height = (data.earnings / maxEarnings) * 100
              
              return (
                <motion.div
                  key={data.period}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-xs text-slate-600 mb-1">
                    {data.earnings.toLocaleString()} CAT
                  </div>
                  <motion.div
                    className="w-full bg-gradient-to-t from-green-400/60 to-green-500/80 rounded-sm"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ 
                      backgroundColor: 'rgba(34, 197, 94, 0.9)',
                      scale: 1.05
                    }}
                  />
                  <span className="text-xs text-slate-500">{data.period}</span>
                  <span className="text-xs text-slate-400">{data.tasks} tasks</span>
                </motion.div>
              )
            })}
          </div>
        </Card>

        {/* Task Distribution */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-500" />
              Task Distribution
            </h3>
          </div>

          <div className="space-y-4">
            {taskDistribution.map((task, index) => (
              <motion.div
                key={task.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className={`w-4 h-4 rounded-full ${task.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{task.type}</span>
                    <span className="text-sm text-slate-600">{task.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${task.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${task.percentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recommendations Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500 rounded-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Weekly Performance Summary
            </h3>
            <p className="text-slate-600 mb-4">
              Based on your activity this week, you've shown excellent performance with room for optimization. 
              Implementing the recommendations above could increase your earnings by up to 25%.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                High Success Rate
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                Consistent Performance
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                Optimization Potential
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
