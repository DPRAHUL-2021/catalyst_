'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Send, Sparkles, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export function AIInsightsChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Your node contributed to 3 training runs today, earning 2,400 CAT tokens! 🚀',
      timestamp: '2 min ago'
    },
    {
      id: 2,
      type: 'ai',
      content: 'Tip: Consider reducing batch size to 16 to optimize memory usage and increase job acceptance rate.',
      timestamp: '5 min ago'
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const suggestions = [
    'How can I optimize my node?',
    'Show my earnings breakdown',
    'What jobs are trending?',
    'Predict my weekly rewards'
  ]

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: input,
      timestamp: 'now'
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: 'Based on your current setup, I recommend enabling boost mode during peak hours (2-6 PM UTC) to maximize your earnings by up to 34%.',
        timestamp: 'now'
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-white/60 h-96 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(147, 51, 234, 0.1)',
                '0 0 0 4px rgba(147, 51, 234, 0.1)',
                '0 0 0 0 rgba(147, 51, 234, 0.1)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Brain className="w-5 h-5 text-white" />
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-900">AI Assistant</h3>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-600">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                    : 'bg-slate-100 border border-slate-200 text-slate-800'
                }`}>
                  {message.type === 'ai' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-purple-600 font-medium">AI Insight</span>
                    </div>
                  )}
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs opacity-60 mt-1">{message.timestamp}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div className="bg-slate-100 border border-slate-200 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">AI is thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Suggestions */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={index}
                onClick={() => setInput(suggestion)}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Lightbulb className="w-3 h-3 inline mr-1" />
                {suggestion}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the AI assistant..."
            className="flex-1 bg-white/60 border-slate-200 text-slate-900 placeholder-slate-500 focus:border-purple-500 focus:ring-purple-500/20"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
