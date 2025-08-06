'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Network, Server, Cpu, HardDrive, Wifi, Settings, Plus, Power, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { UserRole } from '@/app/page'

interface NetworkPageProps {
  role: UserRole
}

export function NetworkPage({ role }: NetworkPageProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const nodes = [
    {
      id: '1',
      name: 'Primary Node',
      address: '192.168.1.100:9000',
      status: 'online',
      cpu: 'Intel Core i9-13900K',
      gpu: 'NVIDIA RTX 4090',
      ram: '32GB DDR5',
      storage: '2TB NVMe SSD',
      uptime: '99.8%',
      tasksCompleted: 1247,
      earnings: 15420,
      lastSeen: '2 minutes ago',
      temperature: 65,
      powerUsage: 450,
      isActive: true
    },
    {
      id: '2',
      name: 'Secondary Node',
      address: '192.168.1.101:9001',
      status: 'online',
      cpu: 'AMD Ryzen 9 7950X',
      gpu: 'NVIDIA RTX 4080',
      ram: '64GB DDR5',
      storage: '1TB NVMe SSD',
      uptime: '97.2%',
      tasksCompleted: 892,
      earnings: 11230,
      lastSeen: '5 minutes ago',
      temperature: 58,
      powerUsage: 380,
      isActive: true
    },
    {
      id: '3',
      name: 'Backup Node',
      address: '192.168.1.102:9002',
      status: 'offline',
      cpu: 'Intel Core i7-12700K',
      gpu: 'NVIDIA RTX 3080',
      ram: '16GB DDR4',
      storage: '500GB NVMe SSD',
      uptime: '95.1%',
      tasksCompleted: 634,
      earnings: 7890,
      lastSeen: '2 hours ago',
      temperature: 0,
      powerUsage: 0,
      isActive: false
    }
  ]

  const networkStats = {
    totalNodes: nodes.length,
    activeNodes: nodes.filter(n => n.status === 'online').length,
    totalEarnings: nodes.reduce((sum, n) => sum + n.earnings, 0),
    avgUptime: nodes.reduce((sum, n) => sum + parseFloat(n.uptime), 0) / nodes.length,
    totalTasks: nodes.reduce((sum, n) => sum + n.tasksCompleted, 0)
  }

  const statusColors = {
    online: 'text-green-600 bg-green-100',
    offline: 'text-red-600 bg-red-100',
    maintenance: 'text-yellow-600 bg-yellow-100'
  }

  const statusIcons = {
    online: CheckCircle,
    offline: AlertTriangle,
    maintenance: Clock
  }

  const toggleNodeStatus = (nodeId: string) => {
    // In a real app, this would make an API call
    console.log(`Toggling node ${nodeId}`)
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Network Management</h1>
          <p className="text-slate-600">
            Monitor and manage your compute nodes across the network
          </p>
        </div>

        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add New Node
        </Button>
      </div>

      {/* Network Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-white/60">
          <div className="text-2xl font-bold text-slate-900">{networkStats.totalNodes}</div>
          <div className="text-sm text-slate-600">Total Nodes</div>
        </Card>
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="text-2xl font-bold text-green-600">{networkStats.activeNodes}</div>
          <div className="text-sm text-slate-600">Active Nodes</div>
        </Card>
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{networkStats.totalTasks.toLocaleString()}</div>
          <div className="text-sm text-slate-600">Tasks Completed</div>
        </Card>
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{networkStats.totalEarnings.toLocaleString()}</div>
          <div className="text-sm text-slate-600">Total Earnings</div>
        </Card>
        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="text-2xl font-bold text-yellow-600">{networkStats.avgUptime.toFixed(1)}%</div>
          <div className="text-sm text-slate-600">Avg Uptime</div>
        </Card>
      </div>

      {/* Nodes List */}
      <div className="space-y-4">
        {nodes.map((node, index) => {
          const StatusIcon = statusIcons[node.status as keyof typeof statusIcons]
          
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className={`p-6 bg-white/80 backdrop-blur-sm border-white/60 hover:shadow-lg transition-all duration-300 ${
                selectedNode === node.id ? 'ring-2 ring-blue-500' : ''
              }`}>
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Node Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Server className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{node.name}</h3>
                          <div className="text-sm text-slate-600">{node.address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Badge className={`${statusColors[node.status as keyof typeof statusColors]} border-0`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {node.status}
                        </Badge>
                        <Switch
                          checked={node.isActive}
                          onCheckedChange={() => toggleNodeStatus(node.id)}
                        />
                      </div>
                    </div>

                    {/* Hardware Specs */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{node.cpu}</div>
                          <div className="text-xs text-slate-500">CPU</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{node.gpu}</div>
                          <div className="text-xs text-slate-500">GPU</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{node.ram}</div>
                          <div className="text-xs text-slate-500">RAM</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-slate-500" />
                        <div>
                          <div className="text-sm font-medium text-slate-900">{node.storage}</div>
                          <div className="text-xs text-slate-500">Storage</div>
                        </div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <div className="text-lg font-bold text-slate-900">{node.uptime}</div>
                        <div className="text-xs text-slate-600">Uptime</div>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{node.tasksCompleted}</div>
                        <div className="text-xs text-slate-600">Tasks</div>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{node.earnings.toLocaleString()}</div>
                        <div className="text-xs text-slate-600">CAT Earned</div>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="text-lg font-bold text-yellow-600">{node.temperature}°C</div>
                        <div className="text-xs text-slate-600">Temperature</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="lg:w-48 flex flex-col justify-between">
                    <div className="text-center lg:text-right mb-4">
                      <div className="text-sm text-slate-500 mb-1">Last Seen</div>
                      <div className="font-medium text-slate-900">{node.lastSeen}</div>
                      <div className="text-sm text-slate-500 mt-2">Power Usage</div>
                      <div className="font-medium text-slate-900">{node.powerUsage}W</div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      
                      {node.status === 'online' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Power className="w-4 h-4 mr-1" />
                          Stop Node
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Power className="w-4 h-4 mr-1" />
                          Start Node
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Configuration */}
                {selectedNode === node.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-slate-200"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <Card className="p-4 bg-slate-50">
                        <h4 className="font-medium text-slate-900 mb-3">Network Settings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Port:</span>
                            <span className="text-slate-900">9000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Protocol:</span>
                            <span className="text-slate-900">TCP/UDP</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Bandwidth:</span>
                            <span className="text-slate-900">1 Gbps</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-slate-50">
                        <h4 className="font-medium text-slate-900 mb-3">Performance Limits</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Max CPU:</span>
                            <span className="text-slate-900">90%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Max GPU:</span>
                            <span className="text-slate-900">95%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Max Temp:</span>
                            <span className="text-slate-900">85°C</span>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 bg-slate-50">
                        <h4 className="font-medium text-slate-900 mb-3">Task Preferences</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">AI Training:</span>
                            <span className="text-green-600">Enabled</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Image Gen:</span>
                            <span className="text-green-600">Enabled</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Data Processing:</span>
                            <span className="text-red-600">Disabled</span>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Network Health */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-500 rounded-lg">
            <Network className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Network Health Status
            </h3>
            <p className="text-slate-600 mb-4">
              Your network is performing excellently with {networkStats.activeNodes} of {networkStats.totalNodes} nodes online. 
              Average uptime is {networkStats.avgUptime.toFixed(1)}% across all nodes.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                Excellent Performance
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                High Availability
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                Optimal Configuration
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
