// Custom hooks for API integration with proper error handling and loading states
import { useState, useEffect, useCallback } from 'react'
import { apiService, ApiError } from '@/lib/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useApi<T>(
  apiCall: () => Promise<{ data: T }>,
  dependencies: any[] = []
): UseApiState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }, dependencies)

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

export function useApiMutation<T, P = any>() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mutate = useCallback(async (
    apiCall: (params: P) => Promise<{ data: T }>,
    params: P
  ): Promise<T | null> => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall(params)
      return response.data
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message)
      } else {
        setError('An unexpected error occurred')
      }
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    mutate,
    loading,
    error,
    clearError: () => setError(null)
  }
}

// Specific hooks for common operations
export function useJobs(params?: Parameters<typeof apiService.getJobs>[0]) {
  return useApi(() => apiService.getJobs(params), [params])
}

export function useNodes() {
  return useApi(() => apiService.getNodes())
}

export function useMetrics(timeframe: string = '24h') {
  return useApi(() => apiService.getMetrics(timeframe), [timeframe])
}

export function useAchievements() {
  return useApi(() => apiService.getUserAchievements())
}

export function useInsights(timeframe: string = '7d') {
  return useApi(() => apiService.getInsights(timeframe), [timeframe])
}

export function useWallet() {
  return useApi(() => apiService.getWallet())
}

export function useSettings() {
  return useApi(() => apiService.getSettings())
}

export function useNotifications(params?: Parameters<typeof apiService.getNotifications>[0]) {
  return useApi(() => apiService.getNotifications(params), [params])
}
