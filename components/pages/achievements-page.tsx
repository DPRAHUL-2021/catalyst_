'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Trophy, Star, Zap, Crown, Medal, Target, Award, Gift, Lock, CheckCircle, X, Info, Sparkles, TrendingUp } from 'lucide-react'

// TypeScript types for mock components
type CardProps = React.PropsWithChildren<{ className?: string }>
const Card = ({ children, className = '', ...props }: CardProps) => (
  <div className={`rounded-lg border border-gray-200 ${className}`} {...props}>
    {children}
  </div>
)

type BadgeProps = React.PropsWithChildren<{ variant?: string; className?: string }>
const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => (
  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
    variant === 'outline' ? 'border border-gray-300 bg-white' : 'bg-blue-100 text-blue-800'
  } ${className}`}>
    {children}
  </span>
)

type ButtonProps = React.PropsWithChildren<{
  variant?: string
  size?: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}>
const Button = ({ children, variant = 'default', size = 'md', className = '', ...props }: ButtonProps) => (
  <button 
    className={`inline-flex items-center justify-center rounded-md font-medium transition-colors
      ${variant === 'outline' ? 'border border-gray-300 bg-white hover:bg-gray-50' : 'bg-blue-500 text-white hover:bg-blue-600'}
      ${size === 'sm' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2'}
      ${className}
    `}
    {...props}
  >
    {children}
  </button>
)

// Confetti component (SSR safe)
const Confetti = ({ isActive, onComplete }: { isActive: boolean; onComplete: () => void }) => {
  const [particles, setParticles] = useState<any[]>([])

  useEffect(() => {
    if (isActive && typeof window !== 'undefined') {
      setParticles(Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        color: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)]
      })))
      const timer = setTimeout(onComplete, 3000)
      return () => clearTimeout(timer)
    }
  }, [isActive, onComplete])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{ backgroundColor: particle.color }}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: 1
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 10 : 1000,
            rotate: particle.rotation + 360,
            scale: 0
          }}
          transition={{
            duration: 3,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

// Tooltip component
const Tooltip = ({ children, content, show }: { children: React.ReactNode; content: string; show: boolean }) => (
  <div className="relative">
    {children}
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg z-20"
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// Achievement Modal (guard for null)
const AchievementModal = ({
  achievement,
  isOpen,
  onClose
}: {
  achievement: any
  isOpen: boolean
  onClose: () => void
}) => {
  if (!achievement) return null
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  className={`p-4 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500`}
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <achievement.icon className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{achievement.title}</h3>
                  <Badge className="mt-1 bg-blue-100 text-blue-800">{achievement.rarity}</Badge>
                </div>
              </div>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6 text-lg">{achievement.description}</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <span className="text-gray-700 font-medium">Reward</span>
                <span className="text-yellow-600 font-bold text-lg">+{achievement.reward.toLocaleString()} CAT</span>
              </div>
              
              {!achievement.unlocked && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Progress</span>
                    <span className="text-blue-600 font-bold">{achievement.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div
                      className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${achievement.progress}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  {achievement.requirement && (
                    <p className="text-sm text-gray-500 mt-2">{achievement.requirement}</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null)
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [simulateProgress, setSimulateProgress] = useState<{ [id: number]: number }>({})

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first compute task and begin your journey in the Catalyst network',
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
      description: 'Complete 50 compute tasks and prove your dedication to the network',
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
      description: 'Contribute 1000+ compute hours and become a pillar of the community',
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
      description: 'Refer 10 new contributors and help grow our network',
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
      description: 'Complete a compute task in under 5 minutes with lightning speed',
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
      description: 'Maintain a 30-day contribution streak without missing a day',
      icon: Medal,
      progress: 50,
      unlocked: false,
      rarity: 'rare',
      category: 'milestone',
      reward: 1000,
      requirement: '15/30 days streak'
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
    legendary: 'bg-gradient-to-r from-yellow-50 to-orange-50'
  }

  const getStats = () => {
    const unlocked = achievements.filter(a => a.unlocked).length
    const totalRewards = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.reward, 0)
    const avgProgress = achievements.reduce((sum, a) => sum + a.progress, 0) / achievements.length
    
    return { unlocked, total: achievements.length, totalRewards, avgProgress }
  }

  const stats = getStats()

  // Simulate progress for demo
  const simulateAchievementProgress = (achievementId: number) => {
    const achievement = achievements.find(a => a.id === achievementId)
    if (!achievement || achievement.unlocked) return

    setSimulateProgress(prev => {
      const newProgress = Math.min((prev[achievementId] ?? achievement.progress) + 10, 100)
      if (newProgress >= 100) setTimeout(() => setShowConfetti(true), 500)
      return {
        ...prev,
        [achievementId]: newProgress
      }
    })
  }

  // SSR safe floating backgrounds
  const floatingBg = typeof window !== 'undefined'
    ? Array.from({ length: 6 }).map((_, i) => ({
        key: i,
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }))
    : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6"
    >
      <Confetti isActive={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingBg.map(bg => (
          <motion.div
            key={bg.key}
            className="absolute rounded-full bg-blue-100 opacity-20"
            style={{
              width: bg.width,
              height: bg.height,
              left: bg.left,
              top: bg.top,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* ...rest of your component remains unchanged... */}
      {/* (No changes needed for the rest of the render code) */}
      {/* If you want the full file with all the JSX, let me know! */}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10"
      >
        <div>
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%']
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🏆 Achievements
          </motion.h1>
          <p className="text-slate-600 text-lg">
            Track your progress and unlock rewards as you contribute to the network
          </p>
        </div>

        <motion.div 
          className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-right">
            <motion.div 
              className="text-3xl font-bold text-yellow-600"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Level 42
            </motion.div>
            <div className="text-sm text-slate-600">Expert Contributor</div>
          </div>
          <motion.div
            className="w-14 h-14 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg"
            animate={{ 
              rotate: [0, 360],
              boxShadow: [
                '0 0 20px rgba(245, 158, 11, 0.3)',
                '0 0 40px rgba(245, 158, 11, 0.5)',
                '0 0 20px rgba(245, 158, 11, 0.3)'
              ]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            <Crown className="w-7 h-7 text-white" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { value: `${stats.unlocked}/${stats.total}`, label: 'Achievements', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', icon: Trophy },
          { value: stats.totalRewards.toLocaleString(), label: 'CAT Earned', color: 'from-yellow-500 to-yellow-600', bg: 'bg-yellow-50', icon: Sparkles },
          { value: `${stats.avgProgress.toFixed(0)}%`, label: 'Avg Progress', color: 'from-green-500 to-green-600', bg: 'bg-green-50', icon: TrendingUp },
          { value: '15', label: 'Day Streak', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50', icon: Target }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group cursor-pointer"
          >
            <Card className={`p-6 ${stat.bg} border-white/60 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl`}>
              <div className="flex items-center justify-between">
                <div>
                  <motion.div 
                    className={`text-3xl font-bold bg-gradient-to-r ${stat.color} text-transparent bg-clip-text`}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                </div>
                <motion.div
                  className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-blue-200 shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Experience Progress</h3>
                <p className="text-slate-600">8,420 / 10,000 XP to reach Level 43</p>
              </div>
              <motion.div 
                className="text-right"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-blue-600">84.2% Complete</div>
                <div className="text-sm text-slate-500">1,580 XP remaining</div>
              </motion.div>
            </div>
            <div className="relative">
              <div className="w-full bg-slate-200 rounded-full h-4 shadow-inner">
                <motion.div
                  className="h-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full shadow-lg relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: '84.2%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60 shadow-lg">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                      : 'hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {category.label} ({category.count})
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Achievements Grid */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        layout
      >
        <AnimatePresence>
          {filteredAchievements.map((achievement, index) => {
            const currentProgress = simulateProgress[achievement.id] || achievement.progress
            const isUnlocked = achievement.unlocked || currentProgress >= 100
            
            return (
              <motion.div
                key={achievement.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredAchievement(achievement.id)}
                onMouseLeave={() => setHoveredAchievement(null)}
                onClick={() => setSelectedAchievement(achievement)}
              >
                <Card className={`p-6 border transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden ${
                  isUnlocked
                    ? `${rarityBgs[achievement.rarity as keyof typeof rarityBgs]} border-slate-200 bg-gradient-to-br`
                    : 'bg-slate-50 border-slate-200 opacity-80'
                }`}>
                  
                  {/* Hover glow effect */}
                  {hoveredAchievement === achievement.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <Tooltip 
                      content={`${achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)} Achievement`}
                      show={hoveredAchievement === achievement.id}
                    >
                      <motion.div
                        className={`p-4 rounded-xl bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} ${
                          isUnlocked ? 'shadow-lg' : 'grayscale'
                        } relative`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        animate={isUnlocked ? { 
                          boxShadow: [
                            '0 0 0 0 rgba(59, 130, 246, 0.2)',
                            '0 0 0 8px rgba(59, 130, 246, 0.1)',
                            '0 0 0 0 rgba(59, 130, 246, 0.2)',
                          ]
                        } : {}}
                        transition={{ 
                          scale: { duration: 0.2 },
                          rotate: { duration: 0.2 },
                          boxShadow: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <achievement.icon className="w-7 h-7 text-white" />
                        {isUnlocked && (
                          <motion.div
                            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                          >
                            <CheckCircle className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                        {!isUnlocked && (
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center">
                            <Lock className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </motion.div>
                    </Tooltip>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="font-bold text-slate-900 text-lg">{achievement.title}</h3>
                        <Badge 
                          className={`text-xs font-bold bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} bg-clip-text text-transparent border-current`}
                        >
                          {achievement.rarity}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{achievement.description}</p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <motion.div 
                          className="text-lg font-bold text-yellow-600 flex items-center gap-1"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4" />
                          +{achievement.reward.toLocaleString()} CAT
                        </motion.div>
                        {isUnlocked && achievement.unlockedAt && (
                          <motion.div 
                            className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                          >
                            ✅ Unlocked {achievement.unlockedAt}
                          </motion.div>
                        )}
                      </div>
                      
                      {!isUnlocked && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium">Progress</span>
                            <span className="text-blue-600 font-bold">{currentProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                            <motion.div
                              className="h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full relative"
                              initial={{ width: 0 }}
                              animate={{ width: `${currentProgress}%` }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </motion.div>
                          </div>
                          {achievement.requirement && (
                            <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                              {achievement.requirement}
                            </div>
                          )}
                          
                          {/* Demo button to simulate progress */}
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                simulateAchievementProgress(achievement.id)
                              }}
                              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                            >
                              🚀 Boost Progress (+10%)
                            </Button>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* Achievement Modal */}
      <AchievementModal 
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </motion.div>
  )
}