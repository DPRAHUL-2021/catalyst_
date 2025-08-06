// Production-ready API service layer
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  error?: string
}

interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiService {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
    this.loadToken()
  }

  private loadToken() {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('catalyst_user')
      if (userData) {
        const user = JSON.parse(userData)
        this.token = user.token
      }
    }
  }

  setToken(token: string) {
    this.token = token
  }

  clearToken() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('catalyst_user')
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new ApiError(
          data.message || 'An error occurred',
          response.status,
          data.code
        )
      }

      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      
      throw new ApiError(
        'Network error occurred',
        0,
        'NETWORK_ERROR'
      )
    }
  }

  // Authentication
  async login(username: string, password: string) {
    return this.request<{
      user: User
      token: string
      refreshToken: string
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
  }

  async register(userData: {
    username: string
    email: string
    password: string
    role: UserRole
  }) {
    return this.request<{
      user: User
      token: string
      refreshToken: string
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async refreshToken(refreshToken: string) {
    return this.request<{
      token: string
      refreshToken: string
    }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    })
  }

  // User Profile
  async getProfile() {
    return this.request<User>('/user/profile')
  }

  async updateProfile(data: Partial<User>) {
    return this.request<User>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Jobs
  async getJobs(params?: {
    status?: string
    priority?: string
    search?: string
    page?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<PaginatedResponse<Job>>(`/jobs?${searchParams}`)
  }

  async getJob(id: string) {
    return this.request<Job>(`/jobs/${id}`)
  }

  async createJob(jobData: CreateJobRequest) {
    return this.request<Job>('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    })
  }

  async acceptJob(id: string) {
    return this.request<Job>(`/jobs/${id}/accept`, {
      method: 'POST',
    })
  }

  async cancelJob(id: string) {
    return this.request<Job>(`/jobs/${id}/cancel`, {
      method: 'POST',
    })
  }

  // Nodes
  async getNodes() {
    return this.request<Node[]>('/nodes')
  }

  async getNode(id: string) {
    return this.request<Node>(`/nodes/${id}`)
  }

  async registerNode(nodeData: RegisterNodeRequest) {
    return this.request<Node>('/nodes', {
      method: 'POST',
      body: JSON.stringify(nodeData),
    })
  }

  async updateNode(id: string, data: Partial<Node>) {
    return this.request<Node>(`/nodes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async deleteNode(id: string) {
    return this.request('/nodes/${id}', {
      method: 'DELETE',
    })
  }

  // Metrics
  async getMetrics(timeframe: string = '24h') {
    return this.request<NetworkMetrics>(`/metrics?timeframe=${timeframe}`)
  }

  async getNodeMetrics(nodeId: string, timeframe: string = '24h') {
    return this.request<NodeMetrics>(`/nodes/${nodeId}/metrics?timeframe=${timeframe}`)
  }

  // Achievements
  async getAchievements() {
    return this.request<Achievement[]>('/achievements')
  }

  async getUserAchievements() {
    return this.request<UserAchievement[]>('/user/achievements')
  }

  // Insights
  async getInsights(timeframe: string = '7d') {
    return this.request<Insight[]>(`/insights?timeframe=${timeframe}`)
  }

  // Wallet
  async getWallet() {
    return this.request<Wallet>('/wallet')
  }

  async getTransactions(params?: {
    page?: number
    limit?: number
    type?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<PaginatedResponse<Transaction>>(`/wallet/transactions?${searchParams}`)
  }

  async withdraw(amount: number, address: string) {
    return this.request<Transaction>('/wallet/withdraw', {
      method: 'POST',
      body: JSON.stringify({ amount, address }),
    })
  }

  // Settings
  async getSettings() {
    return this.request<UserSettings>('/user/settings')
  }

  async updateSettings(settings: Partial<UserSettings>) {
    return this.request<UserSettings>('/user/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }

  // Notifications
  async getNotifications(params?: {
    page?: number
    limit?: number
    unread?: boolean
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    return this.request<PaginatedResponse<Notification>>(`/notifications?${searchParams}`)
  }

  async markNotificationRead(id: string) {
    return this.request(`/notifications/${id}/read`, {
      method: 'POST',
    })
  }

  async markAllNotificationsRead() {
    return this.request('/notifications/read-all', {
      method: 'POST',
    })
  }
}

// Export singleton instance
export const apiService = new ApiService()
export { ApiError }
export type { ApiResponse, PaginatedResponse }
