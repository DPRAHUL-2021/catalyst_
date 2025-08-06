'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Cpu, Zap, Filter, Plus, Play, Pause } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { UserRole } from '@/app/page'
import { useState } from 'react'

interface JobSchedulingPanelProps {
  role: UserRole
}

export function JobSchedulingPanel({ role }: JobSchedulingPanelProps) {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')

  const jobs = [
    {
      id: '1',
      title: 'GPT-4 Fine-tuning',
      model: 'GPT-4',
      priority: 'high',
      reward: 2400,
      estimatedTime: '2.3h',
      progress: 0,
      status: 'queued',
      requirements: { gpu: 'A100', memory: '80GB', cores: 16 }
    },
    {
      id: '2',
      title: 'DALL-E Image Generation',
      model: 'DALL-E 3',
      priority: 'medium',
      reward: 1200,
      estimatedTime: '45m',
      progress: 67,
      status: 'running',
      requirements: { gpu: 'RTX 4090', memory: '24GB', cores: 8 }
    },
    {
      id: '3',
      title: 'LLaMA Inference Batch',
      model: 'LLaMA 2',
      priority: 'low',
      reward: 800,
      estimatedTime: '1.2h',
      progress: 0,
      status: 'queued',
      requirements: { gpu: 'RTX 3080', memory: '16GB', cores: 6 }
    }
  ]

  const filteredJobs = jobs.filter(job => 
    filter === 'all' || job.priority === filter
  )

  const priorityColors = {
    high: 'from-red-500 to-red-600',
    medium: 'from-yellow-500 to-yellow-600',
    low: 'from-green-500 to-green-600'
  }

  const priorityBgs = {
    high: 'bg-red-50',
    medium: 'bg-yellow-50',
    low: 'bg-green-50'
  }

  const statusColors = {
    queued: 'text-slate-600',
    running: 'text-blue-600',
    completed: 'text-green-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            {role === 'requester' ? 'Submit Jobs' : 'Available Tasks'}
          </h3>
          
          <div className="flex items-center gap-2">
            {/* Filter */}
            <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
              {['all', 'high', 'medium', 'low'].map((f) => (
                <Button
                  key={f}
                  variant={filter === f ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter(f as any)}
                  className={`text-xs ${
                    filter === f 
                      ? 'bg-blue-500 text-white hover:bg-blue-600' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>

            {role === 'requester' && (
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
                <Plus className="w-4 h-4 mr-1" />
                New Job
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  selectedJob === job.id
                    ? 'bg-blue-50 border-blue-200 shadow-md'
                    : 'bg-white/60 border-slate-200 hover:bg-white/80 hover:border-slate-300'
                }`}
                onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priorityColors[job.priority as keyof typeof priorityColors]}`} />
                    <div>
                      <div className="font-medium text-slate-900">{job.title}</div>
                      <div className="text-sm text-slate-600">{job.model}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {job.reward.toLocaleString()} CAT
                    </div>
                    <div className="text-sm text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.estimatedTime}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {job.status === 'running' && (
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-blue-600">{job.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <motion.div
                        className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${job.progress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={`${statusColors[job.status as keyof typeof statusColors]} border-current`}
                    >
                      {job.status}
                    </Badge>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      {job.requirements.gpu}
                    </div>
                  </div>

                  {role === 'contributor' && job.status === 'queued' && (
                    <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                      <Play className="w-3 h-3 mr-1" />
                      Accept
                    </Button>
                  )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedJob === job.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-slate-200"
                    >
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-slate-600 mb-1">GPU Required</div>
                          <div className="text-slate-900 font-medium">{job.requirements.gpu}</div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">Memory</div>
                          <div className="text-slate-900 font-medium">{job.requirements.memory}</div>
                        </div>
                        <div>
                          <div className="text-slate-600 mb-1">CPU Cores</div>
                          <div className="text-slate-900 font-medium">{job.requirements.cores}</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Queue Stats */}
        <div className="mt-6 pt-4 border-t border-slate-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900">24</div>
              <div className="text-sm text-slate-600">In Queue</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-slate-600">Running</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">156</div>
              <div className="text-sm text-slate-600">Completed</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
