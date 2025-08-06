// Environment configuration for easy backend integration
export const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
    retries: parseInt(process.env.NEXT_PUBLIC_API_RETRIES || '3'),
  },
  auth: {
    tokenKey: 'catalyst_token',
    refreshTokenKey: 'catalyst_refresh_token',
    userKey: 'catalyst_user',
  },
  websocket: {
    url: process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000/ws',
    reconnectInterval: 5000,
    maxReconnectAttempts: 10,
  },
  features: {
    enableRealTimeUpdates: process.env.NEXT_PUBLIC_ENABLE_REALTIME === 'true',
    enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  app: {
    name: 'Catalyst',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  }
}
