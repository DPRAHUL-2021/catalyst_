'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Cpu,
  Server,
  Database,
  Clock,
  Star,
  Play,
  CheckCircle,
  X,
  PlusCircle,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { UserRole } from '@/app/page'

type Priority = 'high' | 'medium' | 'low'
type Status = 'queued' | 'running' | 'completed'

interface Job {
  id: string
  title: string
  model: string
  priority: Priority
  reward: number
  estimatedTime: string
  progress: number
  status: Status
  requirements: { gpu: string; memory: string; cores: number }
  description?: string
}

interface JobSchedulingPanelProps {
  role: UserRole
}

const priorityMeta: Record<
  Priority,
  { label: string; gradient: string; text: string }>
  = {
  high: { label: 'High', gradient: 'from-red-500 to-pink-500', text: 'text-red-600' },
  medium: { label: 'Medium', gradient: 'from-amber-400 to-amber-600', text: 'text-amber-600' },
  low: { label: 'Low', gradient: 'from-green-400 to-emerald-500', text: 'text-green-600' },
}

export function JobSchedulingPanel({ role }: JobSchedulingPanelProps) {
  // Initial demo jobs
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'job-1',
      title: 'GPT-4 Fine-tuning',
      model: 'GPT-4',
      priority: 'high',
      reward: 2400,
      estimatedTime: '2.3h',
      progress: 0,
      status: 'queued',
      requirements: { gpu: 'A100', memory: '80GB', cores: 16 },
      description: 'Fine-tune on legal contract clauses for contract extraction and clause matching.'
    },
    {
      id: 'job-2',
      title: 'DALL·E — Imagery Batch',
      model: 'DALL·E 3',
      priority: 'medium',
      reward: 1200,
      estimatedTime: '45m',
      progress: 67,
      status: 'running',
      requirements: { gpu: 'RTX 4090', memory: '24GB', cores: 8 },
      description: 'Large batch generation of synthetic images for UI mockups.'
    },
    {
      id: 'job-3',
      title: 'LLaMA Inference Batch',
      model: 'LLaMA 2',
      priority: 'low',
      reward: 800,
      estimatedTime: '1.2h',
      progress: 0,
      status: 'queued',
      requirements: { gpu: 'RTX 3080', memory: '16GB', cores: 6 },
      description: 'Inference for a small set of customer prompts.'
    }
  ])

  // panel state: list, confirm (accept), form (new job)
  const [view, setView] = useState<'list' | 'confirm' | 'form'>('list')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  // New job form state
  const emptyNew: Partial<Job> = {
    title: '',
    model: '',
    priority: 'medium',
    reward: 0,
    estimatedTime: '',
    requirements: { gpu: '', memory: '', cores: 0 },
    description: ''
  }
  const [newJob, setNewJob] = useState<Partial<Job>>(emptyNew)

  // simulate running progress for jobs
  useEffect(() => {
    const intervals: number[] = []
    jobs.forEach((j) => {
      if (j.status === 'running' && j.progress < 100) {
        const id = window.setInterval(() => {
          setJobs(prev => prev.map(p => p.id === j.id ? {
            ...p,
            progress: Math.min(100, p.progress + Math.ceil(Math.random() * 8))
          } : p))
        }, 1200)
        intervals.push(id)
      }
    })
    return () => intervals.forEach(clearInterval)
  }, [jobs])

  // Accept a job: set to running and start progress
  const confirmAccept = (jobId?: string) => {
    const id = jobId ?? selectedJob?.id
    if (!id) return
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'running', progress: j.progress ?? 0 } : j))
    setView('list')
    setSelectedJob(null)
  }

  // Create a job and put it at top
  const handleCreateJob = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!newJob.title || !newJob.model) return
    const created: Job = {
      id: `job-${Date.now()}`,
      title: newJob.title!,
      model: newJob.model!,
      priority: (newJob.priority ?? 'medium') as Priority,
      reward: Number(newJob.reward ?? 0),
      estimatedTime: newJob.estimatedTime ?? '1h',
      progress: 0,
      status: 'queued',
      requirements: {
        gpu: newJob.requirements?.gpu ?? '',
        memory: newJob.requirements?.memory ?? '',
        cores: Number(newJob.requirements?.cores ?? 0)
      },
      description: newJob.description ?? ''
    }
    setJobs(prev => [created, ...prev])
    setNewJob(emptyNew)
    setView('list')
  }

  // Helper to remove a job (admin-style)
  const removeJob = (id: string) => {
    setJobs(prev => prev.filter(p => p.id !== id))
  }

  // UI motion presets
  const pageMotion = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.28 }
  }

  return (
    <Card className="h-full rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
      <div className="p-6 h-full flex flex-col">
        {/* Panel header */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="rounded-lg p-2 bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Scheduler</div>
              <div className="font-semibold text-slate-900 dark:text-white">Job Scheduling — Catalyst</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {role === 'requester' && (
              <Button
                onClick={() => { setView('form'); setSelectedJob(null) }}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                size="sm"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> New Job
              </Button>
            )}
            <div className="text-xs text-slate-500">Role: <span className="font-medium ml-1 text-slate-900 dark:text-white">{role}</span></div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto mt-4">
          <AnimatePresence mode="wait">
            {/* LIST VIEW */}
            {view === 'list' && (
              <motion.div key="list" {...pageMotion} className="space-y-4">
                {/* quick stats row */}
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <div className="p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/6 flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white/30"><Cpu className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-slate-500">Running</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{jobs.filter(j => j.status === 'running').length}</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/6 flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white/30"><Server className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-slate-500">Queued</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{jobs.filter(j => j.status === 'queued').length}</div>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-white/6 flex items-center gap-3">
                    <div className="p-2 rounded-md bg-white/30"><Clock className="w-5 h-5" /></div>
                    <div>
                      <div className="text-sm text-slate-500">Completed</div>
                      <div className="font-semibold text-slate-900 dark:text-white">{jobs.filter(j => j.status === 'completed').length}</div>
                    </div>
                  </div>
                </div>

                {/* job cards */}
                <div className="space-y-4">
                  {jobs.map(job => {
                    const meta = priorityMeta[job.priority]
                    return (
                      <motion.div
                        key={job.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.28 }}
                        className="relative p-4 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-white/6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-transform"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${meta.gradient} flex items-center justify-center text-white shadow`}>
                                  <Star className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold text-slate-900 dark:text-white truncate">{job.title}</div>
                                  <div className="text-xs text-slate-500 truncate">{job.model}</div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-sm font-semibold text-blue-600">{job.reward.toLocaleString()} CAT</div>
                                  <div className="text-xs text-slate-500">{job.estimatedTime}</div>
                                </div>
                              </div>
                            </div>

                            {/* small detail row */}
                            <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                              <div className="flex items-center gap-2">
                                <Server className="w-4 h-4" />
                                <span>{job.requirements.gpu}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Database className="w-4 h-4" />
                                <span>{job.requirements.memory}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Cpu className="w-4 h-4" />
                                <span>{job.requirements.cores} cores</span>
                              </div>
                            </div>

                            {/* progress if running */}
                            {job.status === 'running' && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                                  <div>Progress</div>
                                  <div className="font-medium text-blue-600">{job.progress}%</div>
                                </div>
                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${job.progress}%` }}
                                    transition={{ duration: 0.8 }}
                                    className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* actions */}
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={`${meta.text} border-current`} variant="outline">{meta.label}</Badge>

                            {role === 'contributor' ? (
                              job.status === 'queued' ? (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => { setSelectedJob(job); setView('confirm') }}
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                  >
                                    <Play className="w-4 h-4 mr-2" /> Accept
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => removeJob(job.id)}>
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-xs text-slate-500">{job.status.toUpperCase()}</div>
                              )
                            ) : (
                              <div className="flex flex-col items-end gap-2">
                                <div className="text-xs text-slate-500">Status</div>
                                <div className="font-medium text-slate-700 dark:text-slate-300">{job.status}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {/* CONFIRM (full-panel) */}
            {view === 'confirm' && selectedJob && (
              <motion.div key="confirm" {...pageMotion} className="h-full flex flex-col justify-center items-center">
                <div className="w-full max-w-3xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/8 shadow-xl">
                  {/* header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-lg p-3 bg-gradient-to-r ${priorityMeta[selectedJob.priority].gradient} text-white`}>
                        <Play className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm text-slate-500">Accept Job</div>
                        <div className="text-lg font-semibold text-slate-900 dark:text-white">{selectedJob.title}</div>
                        <div className="text-xs text-slate-500">{selectedJob.model}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-sm text-slate-500">Reward</div>
                      <div className="text-xl font-semibold text-blue-600">{selectedJob.reward.toLocaleString()} CAT</div>
                    </div>
                  </div>

                  {/* three stat cards */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/6 flex items-center gap-3">
                      <Server className="w-6 h-6" />
                      <div>
                        <div className="text-xs text-slate-500">GPU</div>
                        <div className="font-medium text-slate-900 dark:text-white">{selectedJob.requirements.gpu}</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/6 flex items-center gap-3">
                      <Database className="w-6 h-6" />
                      <div>
                        <div className="text-xs text-slate-500">Memory</div>
                        <div className="font-medium text-slate-900 dark:text-white">{selectedJob.requirements.memory}</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 border border-white/6 flex items-center gap-3">
                      <Cpu className="w-6 h-6" />
                      <div>
                        <div className="text-xs text-slate-500">Cores</div>
                        <div className="font-medium text-slate-900 dark:text-white">{selectedJob.requirements.cores}</div>
                      </div>
                    </div>
                  </div>

                  {/* description */}
                  {selectedJob.description && (
                    <div className="mb-6 text-sm text-slate-600">{selectedJob.description}</div>
                  )}

                  {/* actions */}
                  <div className="flex items-center justify-end gap-3">
                    <Button variant="outline" onClick={() => { setSelectedJob(null); setView('list') }}>
                      Cancel
                    </Button>
                    <Button onClick={() => confirmAccept()} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" /> Confirm Accept
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* NEW JOB FORM (full-panel) */}
            {view === 'form' && (
              <motion.form
                key="form"
                {...pageMotion}
                onSubmit={(e) => handleCreateJob(e)}
                className="w-full max-w-3xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-2xl p-6 border border-white/8 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-slate-500">Create Job</div>
                    <div className="text-lg font-semibold text-slate-900 dark:text-white">New Compute Job</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => { setNewJob(emptyNew); setView('list') }}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <PlusCircle className="w-4 h-4 mr-2" /> Create
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={newJob.title ?? ''}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    placeholder="Job title"
                    required
                  />
                  <Input
                    value={newJob.model ?? ''}
                    onChange={(e) => setNewJob({ ...newJob, model: e.target.value })}
                    placeholder="Model (e.g., GPT-4)"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <select
                      defaultValue="medium"
                      className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <Input
                    value={newJob.reward ?? ''}
                    onChange={(e) => setNewJob({ ...newJob, reward: Number(e.target.value) })}
                    placeholder="Reward (CAT)"
                    type="number"
                  />
                  <Input
                    value={newJob.estimatedTime ?? ''}
                    onChange={(e) => setNewJob({ ...newJob, estimatedTime: e.target.value })}
                    placeholder="Estimated time (e.g., 1h 30m)"
                  />
                  <Input
                    value={newJob.requirements?.gpu ?? ''}
                    onChange={(e) => setNewJob({ ...newJob, requirements: { ...newJob.requirements!, gpu: e.target.value } })}
                    placeholder="GPU (e.g., A100)"
                  />
                  <Input
                    value={newJob.requirements?.memory ?? ''}
                    onChange={(e) => setNewJob({ ...newJob, requirements: { ...newJob.requirements!, memory: e.target.value } })}
                    placeholder="Memory (e.g., 32GB)"
                  />
                  <Input
                    value={newJob.requirements?.cores ?? 0}
                    onChange={(e) => setNewJob({ ...newJob, requirements: { ...newJob.requirements!, cores: Number(e.target.value) } })}
                    placeholder="Cores (e.g., 8)"
                    type="number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    placeholder="Describe the job requirements..."
                    className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={4}
                  />
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  )
}
