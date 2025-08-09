'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Clock, Cpu, Zap, Filter, Plus, Play, Pause, Search, MoreHorizontal, CheckCircle, AlertCircle, X, Send, Loader2 } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

type UserRole = 'requester' | 'contributor'

interface Job {
  id: string
  title: string
  model: string
  priority: 'high' | 'medium' | 'low'
  reward: number
  estimatedTime: string
  progress: number
  status: 'queued' | 'running' | 'completed'
  requirements: { gpu: string; memory: string; cores: number }
  submittedBy: string
  submittedAt: string
  description: string
}

interface JobsPageProps {
  role: UserRole
}

export function JobsPage({ role }: JobsPageProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'running' | 'queued' | 'completed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isAccepting, setIsAccepting] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New job form state
  const [newJob, setNewJob] = useState({
    title: '',
    model: 'GPT-4',
    priority: 'medium' as 'high' | 'medium' | 'low',
    reward: 1000,
    estimatedTime: '1h',
    description: '',
    requirements: {
      gpu: 'RTX 4090',
      memory: '24GB',
      cores: 8
    }
  })

  const [jobs, setJobs] = useState<Job[]>([
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
  ])

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

  const handleAcceptJob = (job: Job) => {
    setSelectedJob(job)
    setShowAcceptDialog(true)
  }

  const confirmAcceptJob = async () => {
    if (!selectedJob) return
    
    setIsAccepting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update job status to running
    setJobs(prevJobs => prevJobs.map(job => 
      job.id === selectedJob.id 
        ? { ...job, status: 'running', progress: 5 }
        : job
    ))
    
    setIsAccepting(false)
    setShowAcceptDialog(false)
    setSelectedJob(null)
  }

  const handleSubmitJob = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Add new job to the list
    const job: Job = {
      id: (jobs.length + 1).toString(),
      title: newJob.title,
      model: newJob.model,
      priority: newJob.priority,
      reward: newJob.reward,
      estimatedTime: newJob.estimatedTime,
      progress: 0,
      status: 'queued',
      requirements: newJob.requirements,
      submittedBy: 'You',
      submittedAt: 'Just now',
      description: newJob.description
    }
    
    setJobs(prevJobs => [job, ...prevJobs])
    
    // Reset form
    setNewJob({
      title: '',
      model: 'GPT-4',
      priority: 'medium',
      reward: 1000,
      estimatedTime: '1h',
      description: '',
      requirements: {
        gpu: 'RTX 4090',
        memory: '24GB',
        cores: 8
      }
    })
    
    setIsSubmitting(false)
    setShowSubmitDialog(false)
  }

  const stats = getJobStats()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen"
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
          <Button 
            onClick={() => setShowSubmitDialog(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
          >
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
                        <Button 
                          onClick={() => handleAcceptJob(job)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                        >
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

      {/* Accept Job Dialog */}
      <AnimatePresence>
        {showAcceptDialog && selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isAccepting && setShowAcceptDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Accept Job</h3>
                <p className="text-slate-600">Are you sure you want to accept this compute job?</p>
              </div>

              <Card className="p-4 mb-6 bg-slate-50 border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-2">{selectedJob.title}</h4>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Reward:</span>
                    <span className="font-medium text-green-600">{selectedJob.reward.toLocaleString()} CAT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time:</span>
                    <span className="font-medium">{selectedJob.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GPU Required:</span>
                    <span className="font-medium">{selectedJob.requirements.gpu}</span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAcceptDialog(false)}
                  disabled={isAccepting}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
                  onClick={confirmAcceptJob}
                  disabled={isAccepting}
                >
                  {isAccepting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Accepting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Accept Job
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Job Dialog */}
      <AnimatePresence>
        {showSubmitDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => !isSubmitting && setShowSubmitDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Submit New Job</h3>
                    <p className="text-slate-600">Deploy your AI workload to the network</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSubmitDialog(false)}
                  disabled={isSubmitting}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                    <Input
                      value={newJob.title}
                      onChange={(e) => setNewJob(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., GPT-4 Fine-tuning Pipeline"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Model</label>
                    <select
                      value={newJob.model}
                      onChange={(e) => setNewJob(prev => ({ ...prev, model: e.target.value }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="GPT-4">GPT-4</option>
                      <option value="GPT-3.5">GPT-3.5</option>
                      <option value="Claude 3">Claude 3</option>
                      <option value="LLaMA 2">LLaMA 2</option>
                      <option value="DALL-E 3">DALL-E 3</option>
                      <option value="Stable Diffusion">Stable Diffusion</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                    <select
                      value={newJob.priority}
                      onChange={(e) => setNewJob(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Reward (CAT)</label>
                    <Input
                      type="number"
                      value={newJob.reward}
                      onChange={(e) => setNewJob(prev => ({ ...prev, reward: parseInt(e.target.value) }))}
                      min="100"
                      step="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Est. Time</label>
                    <Input
                      value={newJob.estimatedTime}
                      onChange={(e) => setNewJob(prev => ({ ...prev, estimatedTime: e.target.value }))}
                      placeholder="e.g., 2h 30m"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={newJob.description}
                    onChange={(e) => setNewJob(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your AI workload and requirements..."
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Hardware Requirements</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">GPU</label>
                      <select
                        value={newJob.requirements.gpu}
                        onChange={(e) => setNewJob(prev => ({ 
                          ...prev, 
                          requirements: { ...prev.requirements, gpu: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="RTX 3080">RTX 3080</option>
                        <option value="RTX 4080">RTX 4080</option>
                        <option value="RTX 4090">RTX 4090</option>
                        <option value="A100">A100</option>
                        <option value="H100">H100</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">Memory</label>
                      <select
                        value={newJob.requirements.memory}
                        onChange={(e) => setNewJob(prev => ({ 
                          ...prev, 
                          requirements: { ...prev.requirements, memory: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="16GB">16GB</option>
                        <option value="24GB">24GB</option>
                        <option value="32GB">32GB</option>
                        <option value="48GB">48GB</option>
                        <option value="80GB">80GB</option>
                        <option value="96GB">96GB</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-600 mb-1">CPU Cores</label>
                      <Input
                        type="number"
                        value={newJob.requirements.cores}
                        onChange={(e) => setNewJob(prev => ({ 
                          ...prev, 
                          requirements: { ...prev.requirements, cores: parseInt(e.target.value) }
                        }))}
                        min="1"
                        max="32"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    onClick={() => setShowSubmitDialog(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitJob}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Job
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}