'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { User, MapPin, Calendar, Trophy, Zap, Star, Edit, Camera, Mail, Globe, Shield, Award } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { UserRole } from '@/app/page'

interface ProfilePageProps {
  role: UserRole
  user: any
}

export function ProfilePage({ role, user }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Mock user profile data
  const profileData = {
    username: user.username,
    email: 'user@catalyst.ai',
    fullName: 'Alex Thompson',
    bio: 'Passionate about contributing to the future of AI through distributed computing. Experienced in machine learning and high-performance computing.',
    location: 'San Francisco, CA',
    joinedAt: '2024-01-15',
    avatar: null,
    level: 42,
    experience: 8420,
    nextLevelXp: 10000,
    stats: {
      totalEarnings: 45280,
      tasksCompleted: 1247,
      uptime: 99.7,
      successRate: 98.5,
      totalHours: 2340,
      rank: 156
    },
    achievements: [
      { id: 1, title: 'First Steps', icon: Star, rarity: 'common', unlocked: true },
      { id: 2, title: 'Power User', icon: Zap, rarity: 'rare', unlocked: true },
      { id: 3, title: 'Network Champion', icon: Trophy, rarity: 'legendary', unlocked: false },
      { id: 4, title: 'Speed Demon', icon: Award, rarity: 'uncommon', unlocked: true }
    ],
    recentActivity: [
      { type: 'task_completed', description: 'Completed GPT-4 fine-tuning task', timestamp: '2 hours ago', reward: 2400 },
      { type: 'achievement', description: 'Unlocked "Power User" achievement', timestamp: '1 day ago', reward: 500 },
      { type: 'task_completed', description: 'Completed DALL-E image generation', timestamp: '2 days ago', reward: 1200 }
    ]
  }

  const rarityColors = {
    common: 'from-slate-400 to-slate-500',
    uncommon: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500'
  }

  const activityIcons = {
    task_completed: Zap,
    achievement: Trophy,
    milestone: Star
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Profile</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your profile information and view your contribution history
          </p>
        </div>

        <Button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Profile Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Avatar & Basic Info */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profileData.username.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <Button
                    size="icon"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600"
                  >
                    <Camera className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </Button>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                {profileData.fullName}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-2">@{profileData.username}</p>
              
              <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profileData.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(profileData.joinedAt).toLocaleDateString()}
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 text-left">
                {profileData.bio}
              </p>
            </div>
          </Card>

          {/* Level & XP */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                Level {profileData.level}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Expert Contributor
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Experience</span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {profileData.experience.toLocaleString()} / {profileData.nextLevelXp.toLocaleString()} XP
                </span>
              </div>
              <Progress 
                value={(profileData.experience / profileData.nextLevelXp) * 100} 
                className="h-2"
              />
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">catalyst.ai/u/{profileData.username}</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-0">
                  Verified
                </Badge>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats & Activity */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Performance Stats */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Performance Statistics</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {profileData.stats.totalEarnings.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total CAT Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {profileData.stats.tasksCompleted.toLocaleString()}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {profileData.stats.uptime}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                  #{profileData.stats.rank}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Global Rank</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {profileData.stats.successRate}%
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Success Rate</div>
                  <Progress value={profileData.stats.successRate} className="mt-2 h-2" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
                    {profileData.stats.totalHours.toLocaleString()}h
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Compute Hours</div>
                  <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                    +127h this month
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Recent Achievements</h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {profileData.achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    achievement.unlocked
                      ? 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-60'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${
                      rarityColors[achievement.rarity as keyof typeof rarityColors]
                    } flex items-center justify-center ${achievement.unlocked ? '' : 'grayscale'}`}>
                      <achievement.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="font-medium text-slate-900 dark:text-slate-100 text-sm mb-1">
                      {achievement.title}
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs bg-gradient-to-r ${
                        rarityColors[achievement.rarity as keyof typeof rarityColors]
                      } bg-clip-text text-transparent border-current`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/60 dark:border-slate-700/60">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {profileData.recentActivity.map((activity, index) => {
                const Icon = activityIcons[activity.type as keyof typeof activityIcons]
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
                  >
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {activity.description}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {activity.timestamp}
                      </div>
                    </div>
                    {activity.reward && (
                      <div className="text-green-600 dark:text-green-400 font-medium">
                        +{activity.reward.toLocaleString()} CAT
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  )
}
