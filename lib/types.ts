// Complete type definitions for backend integration
export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  avatar?: string
  joinedAt: string
  lastActive: string
  isVerified: boolean
  level: number
  experience: number
  totalEarnings: number
  settings: UserSettings
}

export interface UserSettings {
  notifications: {
    email: boolean
    push: boolean
    jobUpdates: boolean
    achievements: boolean
    marketing: boolean
  }
  privacy: {
    profileVisible: boolean
    statsVisible: boolean
    activityVisible: boolean
  }
  performance: {
    maxCpuUsage: number
    maxGpuUsage: number
    maxTemperature: number
    autoAcceptJobs: boolean
    preferredJobTypes: string[]
  }
  security: {
    twoFactorEnabled: boolean
    sessionTimeout: number
    ipWhitelist: string[]
  }
  display: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    timezone: string
    currency: string
  }
}

export interface Job {
  id: string
  title: string
  description: string
  model: string
  priority: 'low' | 'medium' | 'high'
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled'
  reward: number
  estimatedTime: number
  actualTime?: number
  progress: number
  requirements: {
    gpu: string
    memory: string
    cores: number
    storage: string
    bandwidth?: string
  }
  submittedBy: string
  submittedAt: string
  startedAt?: string
  completedAt?: string
  assignedTo?: string
  tags: string[]
  metadata: Record<string, any>
  files: JobFile[]
}

export interface JobFile {
  id: string
  name: string
  size: number
  type: string
  url: string
  checksum: string
}

export interface CreateJobRequest {
  title: string
  description: string
  model: string
  priority: 'low' | 'medium' | 'high'
  reward: number
  estimatedTime: number
  requirements: Job['requirements']
  tags: string[]
  metadata: Record<string, any>
  files: File[]
}

export interface Node {
  id: string
  name: string
  address: string
  port: number
  status: 'online' | 'offline' | 'maintenance'
  owner: string
  registeredAt: string
  lastSeen: string
  specs: {
    cpu: string
    gpu: string
    memory: string
    storage: string
    bandwidth: string
    os: string
  }
  performance: {
    uptime: number
    tasksCompleted: number
    tasksRunning: number
    totalEarnings: number
    averageTaskTime: number
    successRate: number
  }
  metrics: {
    cpuUsage: number
    gpuUsage: number
    memoryUsage: number
    temperature: number
    powerUsage: number
    networkLatency: number
  }
  settings: {
    maxCpuUsage: number
    maxGpuUsage: number
    maxTemperature: number
    autoAcceptJobs: boolean
    preferredJobTypes: string[]
    maintenanceWindow?: {
      start: string
      end: string
      timezone: string
    }
  }
  isActive: boolean
}

export interface RegisterNodeRequest {
  name: string
  address: string
  port: number
  specs: Node['specs']
  settings: Node['settings']
}

export interface NetworkMetrics {
  totalNodes: number
  activeNodes: number
  totalJobs: number
  runningJobs: number
  completedJobs: number
  totalEarnings: number
  averageUptime: number
  networkThroughput: number
  regions: RegionMetrics[]
  timeSeriesData: TimeSeriesData[]
}

export interface RegionMetrics {
  id: string
  name: string
  nodes: number
  load: number
  coordinates: {
    lat: number
    lng: number
  }
}

export interface TimeSeriesData {
  timestamp: string
  value: number
  metric: string
}

export interface NodeMetrics {
  nodeId: string
  timeSeriesData: TimeSeriesData[]
  aggregates: {
    avgCpuUsage: number
    avgGpuUsage: number
    avgMemoryUsage: number
    avgTemperature: number
    totalTasks: number
    totalEarnings: number
  }
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  category: 'compute' | 'social' | 'milestone' | 'special'
  reward: number
  requirements: {
    type: string
    target: number
    timeframe?: string
  }
  isActive: boolean
}

export interface UserAchievement {
  id: string
  achievementId: string
  achievement: Achievement
  progress: number
  unlocked: boolean
  unlockedAt?: string
  currentValue: number
}

export interface Insight {
  id: string
  type: 'optimization' | 'earnings' | 'alert' | 'forecast'
  title: string
  description: string
  impact: 'low' | 'medium' | 'high'
  action: string
  data: Record<string, any>
  createdAt: string
  isRead: boolean
}

export interface Wallet {
  id: string
  userId: string
  balance: number
  pendingBalance: number
  totalEarnings: number
  totalWithdrawals: number
  currency: string
  addresses: WalletAddress[]
}

export interface WalletAddress {
  id: string
  address: string
  network: string
  isDefault: boolean
  createdAt: string
}

export interface Transaction {
  id: string
  type: 'earning' | 'withdrawal' | 'bonus' | 'penalty'
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  description: string
  metadata: Record<string, any>
  createdAt: string
  completedAt?: string
  txHash?: string
}

export interface Notification {
  id: string
  type: 'job' | 'achievement' | 'system' | 'security'
  title: string
  message: string
  data: Record<string, any>
  isRead: boolean
  createdAt: string
  expiresAt?: string
}

export type UserRole = 'contributor' | 'requester' | 'admin'
export type PageType = 'overview' | 'jobs' | 'achievements' | 'insights' | 'network' | 'settings'
