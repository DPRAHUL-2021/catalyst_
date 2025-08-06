'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Settings, User, Bell, Shield, Eye, Palette, Globe, Save, CheckCircle, Moon, Sun } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { UserRole } from '@/app/page'
import { useTheme } from '@/contexts/theme-context'

interface SettingsPageProps {
  role: UserRole
}

// Mock settings data
const mockSettings = {
  notifications: {
    email: true,
    push: true,
    jobUpdates: true,
    achievements: true,
    marketing: false
  },
  privacy: {
    profileVisible: true,
    statsVisible: true,
    activityVisible: false
  },
  performance: {
    maxCpuUsage: 90,
    maxGpuUsage: 95,
    maxTemperature: 85,
    autoAcceptJobs: false,
    preferredJobTypes: ['ai-training', 'image-generation']
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 60,
    ipWhitelist: []
  },
  display: {
    theme: 'light' as 'light' | 'dark' | 'auto',
    language: 'en',
    timezone: 'UTC',
    currency: 'USD'
  }
}

export function SettingsPage({ role }: SettingsPageProps) {
  const { theme, toggleTheme } = useTheme()
  const [localSettings, setLocalSettings] = useState(mockSettings)
  const [hasChanges, setHasChanges] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle')

  const updateLocalSetting = (path: string, value: any) => {
    const keys = path.split('.')
    const newSettings = { ...localSettings }
    let current: any = newSettings

    for (let i = 0; i < keys.length - 1; i++) {
      current[keys[i]] = { ...current[keys[i]] }
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
    setLocalSettings(newSettings)
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaveStatus('saving')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSaveStatus('success')
    setHasChanges(false)
    setTimeout(() => setSaveStatus('idle'), 3000)
  }

  const handleReset = () => {
    setLocalSettings(mockSettings)
    setHasChanges(false)
  }

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your account information and preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Control how and when you receive notifications'
    },
    {
      id: 'privacy',
      title: 'Privacy & Visibility',
      icon: Eye,
      description: 'Manage your privacy settings and profile visibility'
    },
    {
      id: 'performance',
      title: 'Performance Settings',
      icon: Settings,
      description: 'Configure compute performance and job preferences'
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Secure your account with advanced security features'
    },
    {
      id: 'display',
      title: 'Display & Language',
      icon: Palette,
      description: 'Customize your interface and regional settings'
    }
  ]

  const [activeSection, setActiveSection] = useState('profile')

  const renderProfileSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Username
          </label>
          <Input
            defaultValue="contributor_user"
            placeholder="Enter username"
            className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            defaultValue="user@catalyst.ai"
            placeholder="Enter email"
            className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Bio
        </label>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          rows={3}
          placeholder="Tell us about yourself..."
          defaultValue="Passionate about contributing to the future of AI through distributed computing."
        />
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">Email Notifications</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Receive notifications via email</p>
          </div>
          <Switch
            checked={localSettings.notifications?.email || false}
            onCheckedChange={(checked) => updateLocalSetting('notifications.email', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">Push Notifications</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Receive browser push notifications</p>
          </div>
          <Switch
            checked={localSettings.notifications?.push || false}
            onCheckedChange={(checked) => updateLocalSetting('notifications.push', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">Job Updates</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get notified about job status changes</p>
          </div>
          <Switch
            checked={localSettings.notifications?.jobUpdates || false}
            onCheckedChange={(checked) => updateLocalSetting('notifications.jobUpdates', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">Achievement Notifications</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Get notified when you unlock achievements</p>
          </div>
          <Switch
            checked={localSettings.notifications?.achievements || false}
            onCheckedChange={(checked) => updateLocalSetting('notifications.achievements', checked)}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">Marketing Communications</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Receive updates about new features and promotions</p>
          </div>
          <Switch
            checked={localSettings.notifications?.marketing || false}
            onCheckedChange={(checked) => updateLocalSetting('notifications.marketing', checked)}
          />
        </div>
      </div>
    </div>
  )

  const renderDisplaySettings = () => (
    <div className="space-y-6">
      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          ) : (
            <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          )}
          <div>
            <h4 className="font-medium text-slate-900 dark:text-slate-100">Dark Mode</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Toggle between light and dark themes</p>
          </div>
        </div>
        <Switch
          checked={theme === 'dark'}
          onCheckedChange={toggleTheme}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Language
          </label>
          <select
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            value={localSettings.display?.language || 'en'}
            onChange={(e) => updateLocalSetting('display.language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
            <option value="ja">Japanese</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Timezone
          </label>
          <select
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            value={localSettings.display?.timezone || 'UTC'}
            onChange={(e) => updateLocalSetting('display.timezone', e.target.value)}
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
          Currency
        </label>
        <select
          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          value={localSettings.display?.currency || 'USD'}
          onChange={(e) => updateLocalSetting('display.currency', e.target.value)}
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
          <option value="JPY">JPY (¥)</option>
          <option value="CAD">CAD (C$)</option>
          <option value="AUD">AUD (A$)</option>
        </select>
      </div>
    </div>
  )

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSettings()
      case 'notifications':
        return renderNotificationSettings()
      case 'display':
        return renderDisplaySettings()
      default:
        return renderProfileSettings()
    }
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Settings</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your account preferences and system configuration
          </p>
        </div>

        {/* Save Controls */}
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300"
            >
              Reset Changes
            </Button>
            <Button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
            >
              {saveStatus === 'saving' ? (
                <motion.div
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Changes
            </Button>
          </motion.div>
        )}
      </div>

      {/* Save Status */}
      {saveStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg border bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Settings Navigation */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <nav className="space-y-2">
              {settingSections.map((section, index) => (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                    activeSection === section.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <section.icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs opacity-75">{section.description}</div>
                  </div>
                </motion.button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="col-span-12 lg:col-span-9">
          <Card className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {settingSections.find(s => s.id === activeSection)?.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  {settingSections.find(s => s.id === activeSection)?.description}
                </p>
              </div>

              {renderSectionContent()}
            </motion.div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
