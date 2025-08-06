'use client'

import { motion } from 'framer-motion'
import { Wallet, TrendingUp, Download, ArrowUpRight, Coins, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/app/page'

interface WalletRewardsProps {
  role: UserRole
}

export function WalletRewards({ role }: WalletRewardsProps) {
  const walletData = {
    totalBalance: 45280,
    pendingRewards: 2340,
    weeklyEarnings: 8920,
    monthlyEarnings: 34560,
    weeklyChange: 12.3,
    conversionRate: 0.0024 // CAT to USD
  }

  const recentTransactions = [
    {
      id: 1,
      type: 'earned',
      description: 'GPT-4 Fine-tuning Task',
      amount: 2400,
      timestamp: '2 hours ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'earned',
      description: 'DALL-E Image Generation',
      amount: 1200,
      timestamp: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'bonus',
      description: 'Weekly Streak Bonus',
      amount: 500,
      timestamp: '1 day ago',
      status: 'completed'
    },
    {
      id: 4,
      type: 'withdrawal',
      description: 'Payout to Wallet',
      amount: -5000,
      timestamp: '2 days ago',
      status: 'pending'
    }
  ]

  const chartData = [
    { day: 'Mon', earnings: 4200 },
    { day: 'Tue', earnings: 5800 },
    { day: 'Wed', earnings: 3900 },
    { day: 'Thu', earnings: 7200 },
    { day: 'Fri', earnings: 6100 },
    { day: 'Sat', earnings: 8900 },
    { day: 'Sun', earnings: 5200 }
  ]

  const maxEarnings = Math.max(...chartData.map(d => d.earnings))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            Wallet
          </h3>
          
          <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
            <Download className="w-4 h-4 mr-1" />
            Withdraw
          </Button>
        </div>

        {/* Balance Display */}
        <div className="mb-6">
          <motion.div
            className="text-center p-6 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200"
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(34, 197, 94, 0.1)',
                '0 0 0 4px rgba(34, 197, 94, 0.1)',
                '0 0 0 0 rgba(34, 197, 94, 0.1)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="w-6 h-6 text-yellow-500" />
              <span className="text-sm text-slate-600">Total Balance</span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {walletData.totalBalance.toLocaleString()} CAT
            </div>
            <div className="text-sm text-green-600">
              ≈ ${(walletData.totalBalance * walletData.conversionRate).toFixed(2)} USD
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Weekly</span>
              <div className={`flex items-center gap-1 text-xs ${
                walletData.weeklyChange > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <ArrowUpRight className="w-3 h-3" />
                {walletData.weeklyChange}%
              </div>
            </div>
            <div className="text-xl font-bold text-blue-600">
              {walletData.weeklyEarnings.toLocaleString()}
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
            <div className="text-sm text-slate-600 mb-2">Pending</div>
            <div className="text-xl font-bold text-yellow-600">
              {walletData.pendingRewards.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            Weekly Earnings
          </h4>
          <div className="h-24 flex items-end gap-2">
            {chartData.map((data, index) => (
              <motion.div
                key={data.day}
                className="flex-1 flex flex-col items-center gap-2"
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-full bg-gradient-to-t from-green-400/60 to-green-500/80 rounded-sm"
                  style={{ height: `${(data.earnings / maxEarnings) * 60}px` }}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.earnings / maxEarnings) * 60}px` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    backgroundColor: 'rgba(34, 197, 94, 0.9)',
                    scale: 1.05
                  }}
                />
                <span className="text-xs text-slate-500">{data.day}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <h4 className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-purple-500" />
            Recent Activity
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white transition-all duration-300"
              >
                <div className="flex-1">
                  <div className="font-medium text-slate-900 text-sm">
                    {transaction.description}
                  </div>
                  <div className="text-xs text-slate-500">
                    {transaction.timestamp}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-medium ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                  </div>
                  <div className={`text-xs ${
                    transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {transaction.status}
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
