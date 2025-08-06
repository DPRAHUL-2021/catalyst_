'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, Cpu, Zap, Filter, Plus, Play, Pause, Search, MoreHorizontal, CheckCircle, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { UserRole } from '@/app/page'

interface JobsPageProps {
  role: UserRole
}

export function JobsPage({ role }: JobsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'running' | 'queued' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const jobs = [
    {
      id: '1',
      title: 'GPT-4 Fine-tuning Pipeline',
      model: 'GPT-4',
      priority: 'high',
      reward: 2400,
      estimatedTime: '2.3h',
      progress: 0,
      status: 'queued',
      requirements: { gpu: 'A100', memory: '80GB', cores: 16 },
      submittedBy: 'OpenAI Research',
      submittedAt: '2 hours ago',
      description: 'Fine-tune GPT-4 model on custom dataset for improved performance on domain-specific tasks.'
    },
    {
      id: '2',
      title: 'DALL-E Image Generation Batch',
      model: 'DALL-E 3',
      priority: 'medium',
      reward: 1200,
      estimatedTime: '45m',
      progress: 67,
      status: 'running',
      requirements: { gpu: 'RTX 4090', memory: '24GB', cores: 8 },
      submittedBy: 'Creative Studio',
      submittedAt: '4 hours ago',
      description: 'Generate high-quality images for marketing campaign using DALL-E 3 model.'
    },
    {
      id: '3',
      title: 'LLaMA Inference Optimization',
      model: 'LLaMA 2',
      priority: 'low',
      reward: 800,
      estimatedTime: '1.2h',
      progress: 100,
      status: 'completed',
      requirements: { gpu: 'RTX 3080', memory: '16GB', cores: 6 },
      submittedBy: 'Meta AI',
      submittedAt: '1 day ago',
      description: 'Optimize LLaMA 2 inference performance for production deployment.'
    },
    {
      id: '4',
      title: 'Stable Diffusion XL Training',
      model: 'SDXL',
      priority: 'high',
      reward: 1800,
      estimatedTime: '30m',
      progress: 23,
      status: 'running',
      requirements: { gpu: 'RTX 4080', memory: '16GB', cores: 8 },
      submittedBy: 'Stability AI',
      submittedAt: '6 hours ago',
      description: 'Train Stable Diffusion XL model on custom artistic dataset.'
    },
    {
      id: '5',
      title: 'Claude 3 Reasoning Tasks',
      model: 'Claude 3',
      priority: 'medium',
      reward: 1500,
      estimatedTime: '1.8h',
      progress: 0,
      status: 'queued',
      requirements: { gpu: 'H100', memory: '96GB', cores: 20 },
      submittedBy: 'Anthropic',
      submittedAt: '30 minutes ago',
      description: 'Execute complex reasoning tasks using Claude 3 model for research purposes.'
    }
  ]

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = selectedFilter === 'all' || job.status === selectedFilter
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const priorityColors = {
    high: 'from-red-500 to-red-600',
    medium: 'from-yellow-500 to-yellow-600',
    low: 'from-green-500 to-green-600'
  }

  const statusColors = {
    queued: 'text-slate-600 bg-slate-100',
    running: 'text-blue-600 bg-blue-100',
    completed: 'text-green-600 bg-green-100'
  }

  const statusIcons = {
    queued: Clock,
    running: Play,
    completed: CheckCircle
  }

  const getJobStats = () => {
    return {
      total: jobs.length,
      running: jobs.filter(j => j.status === 'running').length,
      queued: jobs.filter(j => j.status === 'queued').length,
      completed: jobs.filter(j => j.status === 'completed').length
    }
  }

  const stats = getJobStats()

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {role === 'requester' ? 'Submit & Manage Jobs' : 'Available Compute Jobs'}
          </h1>
          <p className="text-slate-600">
            {role === 'requester' 
              ? 'Deploy your AI workloads across the global compute network'
              : 'Contribute your compute power to earn rewards'
            }
          </p>
        </div>

        {role === 'requester' && (
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Submit New Job
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-white/60">
          <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
          <div className="text-sm text-slate-600">Total Jobs</div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.running}</div>
          <div className="text-sm text-slate-600">Running</div>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.queued}</div>
          <div className="text-sm text-slate-600">Queued</div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-slate-600">Completed</div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search jobs, models, or organizations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/60 border-slate-200"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            {['all', 'running', 'queued', 'completed'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter as any)}
                className={selectedFilter === filter ? 'bg-blue-500 text-white' : ''}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map((job, index) => {
          const StatusIcon = statusIcons[job.status as keyof typeof statusIcons]
          
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${priorityColors[job.priority as keyof typeof priorityColors]}`} />
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{job.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span>{job.model}</span>
                            <span>•</span>
                            <span>by {job.submittedBy}</span>
                            <span>•</span>
                            <span>{job.submittedAt}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={`${statusColors[job.status as keyof typeof statusColors]} border-0`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {job.status}
                        </Badge>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-4">{job.description}</p>

                    {/* Progress Bar */}
                    {job.status === 'running' && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600">Progress</span>
                          <span className="text-blue-600 font-medium">{job.progress}%</span>
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

                    {/* Requirements */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">
                        <Cpu className="w-3 h-3 mr-1" />
                        {job.requirements.gpu}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.requirements.memory} RAM
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.requirements.cores} cores
                      </Badge>
                    </div>
                  </div>

                  {/* Reward & Actions */}
                  <div className="lg:w-48 flex flex-col justify-between">
                    <div className="text-center lg:text-right mb-4">
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {job.reward.toLocaleString()} CAT
                      </div>
                      <div className="text-sm text-slate-500 flex items-center justify-center lg:justify-end gap-1">
                        <Clock className="w-3 h-3" />
                        {job.estimatedTime}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {role === 'contributor' && job.status === 'queued' && (
                        <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                          <Play className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                      )}
                      
                      {role === 'requester' && (
                        <Button variant="outline" className="flex-1">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="p-12 bg-white/80 backdrop-blur-sm border-white/60 text-center">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No jobs found</h3>
          <p className="text-slate-600">
            {searchQuery 
              ? 'Try adjusting your search terms or filters'
              : 'No jobs match the selected filter'
            }
          </p>
        </Card>
      )}
    </motion.div>
  )
}
