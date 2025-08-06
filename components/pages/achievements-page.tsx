'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Trophy, Star, Zap, Crown, Medal, Target, Award, Gift, Lock, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/app/page'

interface AchievementsPageProps {
  role: UserRole
}

export function AchievementsPage({ role }: AchievementsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'compute' | 'social' | 'milestone'>('all')

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first compute task',
      icon: Star,
      progress: 100,
      unlocked: true,
      rarity: 'common',
      category: 'milestone',
      reward: 100,
      unlockedAt: '2 days ago'
    },
    {
      id: 2,
      title: 'Power User',
      description: 'Complete 50 compute tasks',
      icon: Zap,
      progress: 76,
      unlocked: false,
      rarity: 'rare',
      category: 'compute',
      reward: 500,
      requirement: '38/50 tasks completed'
    },
    {
      id: 3,
      title: 'Network Champion',
      description: 'Contribute 1000+ compute hours',
      icon: Crown,
      progress: 23,
      unlocked: false,
      rarity: 'legendary',
      category: 'compute',
      reward: 2000,
      requirement: '230/1000 hours contributed'
    },
    {
      id: 4,
      title: 'Community Builder',
      description: 'Refer 10 new contributors',
      icon: Award,
      progress: 60,
      unlocked: false,
      rarity: 'rare',
      category: 'social',
      reward: 750,
      requirement: '6/10 referrals'
    },
    {
      id: 5,
      title: 'Speed Demon',
      description: 'Complete a task in under 5 minutes',
      icon: Target,
      progress: 100,
      unlocked: true,
      rarity: 'uncommon',
      category: 'compute',
      reward: 200,
      unlockedAt: '1 week ago'
    },
    {
      id: 6,
      title: 'Consistency King',
      description: 'Maintain a 30-day contribution streak',
      icon: Medal,
      progress: 50,
      unlocked: false,
      rarity: 'rare',
      category: 'milestone',
      reward: 1000,
      requirement: '15/30 days streak'
    },
    {
      id: 7,
      title: 'GPU Master',
      description: 'Complete 100 GPU-intensive tasks',
      icon: Zap,
      progress: 85,
      unlocked: false,
      rarity: 'epic',
      category: 'compute',
      reward: 1500,
      requirement: '85/100 GPU tasks'
    },
    {
      id: 8,
      title: 'Early Adopter',
      description: 'Join Catalyst in the first month',
      icon: Gift,
      progress: 100,
      unlocked: true,
      rarity: 'legendary',
      category: 'milestone',
      reward: 5000,
      unlockedAt: '3 weeks ago'
    }
  ]

  const categories = [
    { id: 'all', label: 'All', count: achievements.length },
    { id: 'compute', label: 'Compute', count: achievements.filter(a => a.category === 'compute').length },
    { id: 'social', label: 'Social', count: achievements.filter(a => a.category === 'social').length },
    { id: 'milestone', label: 'Milestone', count: achievements.filter(a => a.category === 'milestone').length }
  ]

  const filteredAchievements = achievements.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  )

  const rarityColors = {
    common: 'from-slate-400 to-slate-500',
    uncommon: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 to-orange-500'
  }

  const rarityBgs = {
    common: 'bg-slate-50',
    uncommon: 'bg-green-50',
    rare: 'bg-blue-50',
    epic: 'bg-purple-50',
    legendary: 'bg-yellow-50'
  }

  const getStats = () => {
    const unlocked = achievements.filter(a => a.unlocked).length
    const totalRewards = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.reward, 0)
    const avgProgress = achievements.reduce((sum, a) => sum + a.progress, 0) / achievements.length
    
    return { unlocked, total: achievements.length, totalRewards, avgProgress }
  }

  const stats = getStats()

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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Achievements</h1>
          <p className="text-slate-600">
            Track your progress and unlock rewards as you contribute to the network
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-600">Level 42</div>
            <div className="text-sm text-slate-600">Expert Contributor</div>
          </div>
          <motion.div
            className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Crown className="w-6 h-6 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-white/60">
          <div className="text-2xl font-bold text-slate-900">{stats.unlocked}/{stats.total}</div>
          <div className="text-sm text-slate-600">Achievements</div>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{stats.totalRewards.toLocaleString()}</div>
          <div className="text-sm text-slate-600">CAT Earned</div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.avgProgress.toFixed(0)}%</div>
          <div className="text-sm text-slate-600">Avg Progress</div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-2xl font-bold text-green-600">15</div>
          <div className="text-sm text-slate-600">Day Streak</div>
        </Card>
      </div>

      {/* XP Progress */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Experience Progress</h3>
            <p className="text-sm text-slate-600">8,420 / 10,000 XP to next level</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-600 font-medium">84.2% Complete</div>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-3">
          <motion.div
            className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '84.2%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </Card>

      {/* Category Filters */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id as any)}
              className={selectedCategory === category.id ? 'bg-blue-500 text-white' : ''}
            >
              {category.label} ({category.count})
            </Button>
          ))}
        </div>
      </Card>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAchievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className={`p-6 border transition-all duration-300 hover:shadow-lg ${
              achievement.unlocked
                ? `${rarityBgs[achievement.rarity as keyof typeof rarityBgs]} border-slate-200`
                : 'bg-slate-50 border-slate-200 opacity-75'
            }`}>
              <div className="flex items-start gap-4">
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} ${
                    achievement.unlocked ? '' : 'grayscale'
                  } relative`}
                  whileHover={{ scale: 1.05 }}
                  animate={achievement.unlocked ? { 
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.1)',
                      '0 0 0 4px rgba(59, 130, 246, 0.1)',
                      '0 0 0 0 rgba(59, 130, 246, 0.1)',
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <achievement.icon className="w-6 h-6 text-white" />
                  {achievement.unlocked && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <CheckCircle className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                  {!achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-400 rounded-full flex items-center justify-center">
                      <Lock className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                    <Badge 
                      variant="outline" 
                      className={`text-xs bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} bg-clip-text text-transparent border-current`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-3">{achievement.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-medium text-blue-600">
                      +{achievement.reward.toLocaleString()} CAT
                    </div>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="text-xs text-green-600">
                        Unlocked {achievement.unlockedAt}
                      </div>
                    )}
                  </div>
                  
                  {!achievement.unlocked && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="text-blue-600 font-medium">{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div
                          className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      {achievement.requirement && (
                        <div className="text-xs text-slate-500">
                          {achievement.requirement}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
