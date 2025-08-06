'use client'

import { motion } from 'framer-motion'
import { Globe, MapPin, Activity } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'

export function GlobalHeatmap() {
  const [activeRegions, setActiveRegions] = useState([
    { id: 1, name: 'North America', nodes: 342, load: 78, x: 25, y: 35 },
    { id: 2, name: 'Europe', nodes: 289, load: 65, x: 50, y: 30 },
    { id: 3, name: 'Asia Pacific', nodes: 456, load: 89, x: 75, y: 45 },
    { id: 4, name: 'South America', nodes: 123, load: 45, x: 30, y: 65 },
    { id: 5, name: 'Africa', nodes: 87, load: 34, x: 52, y: 60 },
    { id: 6, name: 'Australia', nodes: 98, load: 56, x: 80, y: 75 }
  ])

  const [pulseNodes, setPulseNodes] = useState<number[]>([])

  useEffect(() => {
    // Simulate real-time activity
    const interval = setInterval(() => {
      setActiveRegions(prev => prev.map(region => ({
        ...region,
        nodes: region.nodes + Math.floor(Math.random() * 10 - 5),
        load: Math.max(0, Math.min(100, region.load + (Math.random() - 0.5) * 10))
      })))

      // Random pulse effect
      if (Math.random() > 0.7) {
        const randomRegion = Math.floor(Math.random() * activeRegions.length) + 1
        setPulseNodes(prev => [...prev, randomRegion])
        setTimeout(() => {
          setPulseNodes(prev => prev.filter(id => id !== randomRegion))
        }, 2000)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [activeRegions.length])

  const getLoadColor = (load: number) => {
    if (load < 30) return 'from-green-500 to-emerald-500'
    if (load < 60) return 'from-yellow-500 to-orange-500'
    if (load < 80) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-pink-500'
  }

  const getLoadIntensity = (load: number) => {
    return Math.max(0.3, load / 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            Global Network
          </h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-slate-600">Low Load</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-slate-600">Medium Load</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-600">High Load</span>
            </div>
          </div>
        </div>

        {/* World Map Visualization */}
        <div className="relative h-64 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
          {/* Background grid */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Active Regions */}
          {activeRegions.map((region) => (
            <motion.div
              key={region.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${region.x}%`, top: `${region.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: region.id * 0.1 }}
            >
              {/* Pulse Effect */}
              <motion.div
                className={`absolute inset-0 rounded-full bg-gradient-to-r ${getLoadColor(region.load)}`}
                animate={pulseNodes.includes(region.id) ? {
                  scale: [1, 2, 1],
                  opacity: [0.6, 0.2, 0.6]
                } : {}}
                transition={{ duration: 2, repeat: pulseNodes.includes(region.id) ? Infinity : 0 }}
                style={{ 
                  width: `${20 + region.nodes / 10}px`, 
                  height: `${20 + region.nodes / 10}px`,
                  opacity: getLoadIntensity(region.load)
                }}
              />

              {/* Main Node */}
              <motion.div
                className={`relative rounded-full bg-gradient-to-r ${getLoadColor(region.load)} shadow-lg cursor-pointer group`}
                style={{ 
                  width: `${20 + region.nodes / 10}px`, 
                  height: `${20 + region.nodes / 10}px`
                }}
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  boxShadow: [
                    `0 0 10px rgba(59, 130, 246, ${getLoadIntensity(region.load)})`,
                    `0 0 20px rgba(147, 51, 234, ${getLoadIntensity(region.load) * 1.5})`,
                    `0 0 10px rgba(59, 130, 246, ${getLoadIntensity(region.load)})`,
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MapPin className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white" />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm whitespace-nowrap">
                    <div className="font-medium text-white mb-1">{region.name}</div>
                    <div className="text-slate-300">Nodes: {region.nodes}</div>
                    <div className="text-slate-300">Load: {region.load.toFixed(1)}%</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {activeRegions.map((region, index) => {
              const nextRegion = activeRegions[(index + 1) % activeRegions.length]
              return (
                <motion.line
                  key={`connection-${region.id}-${nextRegion.id}`}
                  x1={`${region.x}%`}
                  y1={`${region.y}%`}
                  x2={`${nextRegion.x}%`}
                  y2={`${nextRegion.y}%`}
                  stroke="url(#connectionGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                />
              )
            })}
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Global Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {activeRegions.reduce((sum, region) => sum + region.nodes, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-600">Total Nodes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {(activeRegions.reduce((sum, region) => sum + region.load, 0) / activeRegions.length).toFixed(1)}%
            </div>
            <div className="text-sm text-slate-600">Avg Load</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {activeRegions.length}
            </div>
            <div className="text-sm text-slate-600">Regions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
              <Activity className="w-5 h-5" />
              99.9%
            </div>
            <div className="text-sm text-slate-600">Uptime</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
