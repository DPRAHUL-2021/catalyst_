'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Zap, Crown, Medal, Target } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { UserRole } from '@/app/page'

interface GamificationCenterProps {
  role: UserRole
}

export function GamificationCenter({ role }: GamificationCenterProps) {
  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first compute task',
      icon: Star,
      progress: 100,
      unlocked: true,
      rarity: 'common'
    },
    {
      id: 2,
      title: 'Power User',
      description: 'Complete 50 compute tasks',
      icon: Zap,
      progress: 76,
      unlocked: false,
      rarity: 'rare'
    },
    {
      id: 3,
      title: 'Network Champion',
      description: 'Contribute 1000+ hours',
      icon: Crown,
      progress: 23,
      unlocked: false,
      rarity: 'legendary'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'ComputeMaster', score: 45280, region: 'US-West', streak: 47 },
    { rank: 2, name: 'NetworkNinja', score: 42150, region: 'EU-Central', streak: 32 },
    { rank: 3, name: 'DataDragon', score: 38920, region: 'Asia-Pacific', streak: 28 },
    { rank: 4, name: 'You', score: 35640, region: 'US-East', streak: 15 },
    { rank: 5, name: 'CloudRunner', score: 33210, region: 'EU-West', streak: 19 }
  ]

  const rarityColors = {
    common: 'from-slate-400 to-slate-500',
    rare: 'from-blue-500 to-purple-500',
    legendary: 'from-yellow-500 to-orange-500'
  }

  const rarityBgs = {
    common: 'bg-slate-50',
    rare: 'bg-blue-50',
    legendary: 'bg-yellow-50'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60 h-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            Achievements
          </h3>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">Level 42</div>
              <div className="text-sm text-slate-600">Expert</div>
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

        {/* XP Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Experience Points</span>
            <span className="text-sm text-blue-600">8,420 / 10,000 XP</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <motion.div
              className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '84.2%' }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-900 mb-3">Recent Achievements</h4>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked
                    ? `${rarityBgs[achievement.rarity as keyof typeof rarityBgs]} border-slate-200`
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`p-2 rounded-lg bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} ${
                      achievement.unlocked ? '' : 'grayscale'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    animate={achievement.unlocked ? { 
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.1)',
                        '0 0 0 4px rgba(59, 130, 246, 0.1)',
                        '0 0 0 0 rgba(59, 130, 246, 0.1)',
                      ]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <achievement.icon className="w-4 h-4 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{achievement.title}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} bg-clip-text text-transparent border-current`}
                      >
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <div className="text-sm text-slate-600 mb-2">{achievement.description}</div>
                    
                    {!achievement.unlocked && (
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-1">
                          <div 
                            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">{achievement.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
            <Medal className="w-4 h-4 text-yellow-500" />
            Global Leaderboard
          </h4>
          <div className="space-y-2">
            {leaderboard.map((player, index) => (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
                  player.name === 'You'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-slate-50 hover:bg-white/60'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  player.rank === 1 ? 'bg-yellow-500 text-white' :
                  player.rank === 2 ? 'bg-slate-400 text-white' :
                  player.rank === 3 ? 'bg-orange-500 text-white' :
                  'bg-slate-200 text-slate-700'
                }`}>
                  {player.rank}
                </div>
                
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{player.name}</div>
                  <div className="text-xs text-slate-600">{player.region}</div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium text-blue-600">{player.score.toLocaleString()}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <Target className="w-3 h-3" />
                    {player.streak} streak
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
