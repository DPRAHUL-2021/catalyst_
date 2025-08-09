'use client'

import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you use
})

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  Cpu,
  Star,
  Sparkles,
  ChevronDown
} from 'lucide-react'
import { User } from '@/app/page'

interface LandingPageProps {
  onLogin: (user: User) => void
}

export function LandingPage({ onLogin }: LandingPageProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const statsRef = useRef<HTMLDivElement | null>(null)
  const authRef = useRef<HTMLDivElement | null>(null)
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0])
  const countsTarget = [10000, 50000000, 99.9, 150]

  // features & stats (kept your data + slightly tuned)
  const features = [
    {
      icon: Cpu,
      title: 'Distributed Computing',
      description: 'Share unused compute power and earn rewards',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with end-to-end encryption',
      gradient: 'from-emerald-500 to-teal-400'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Monitor performance and earnings in real-time',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with contributors worldwide',
      gradient: 'from-orange-500 to-red-400'
    }
  ]

  const stats = [
    { value: '10,000+', label: 'Active Nodes', trend: '+12%' },
    { value: '50M+', label: 'Compute Hours', trend: '+28%' },
    { value: '99.9%', label: 'Uptime', trend: 'Stable' },
    { value: '150+', label: 'Countries', trend: '+5%' }
  ]

  // ----- mouse & scroll listeners -----
  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY })
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // ----- animated counters (trigger when stats in view) -----
  useEffect(() => {
    if (!statsRef.current) return
    const rect = statsRef.current.getBoundingClientRect()
    const triggerY = rect.top + window.scrollY - window.innerHeight * 0.75
    if (scrollY < triggerY) return

    let rafId: number
    const start = performance.now()
    const duration = 1200

    const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t)

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = easeOutQuad(t)
      setCounts(
        countsTarget.map((target, i) => {
          if (i === 2) {
            // uptime: decimal
            return parseFloat((target * eased).toFixed(1))
          }
          return Math.floor(target * eased)
        })
      )
      if (t < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollY])

  // ----- auth-card tilt based on mouse position -----
  const [cardStyle, setCardStyle] = useState<Record<string, string>>({})
  useEffect(() => {
    const el = authRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (mousePosition.x - centerX) / rect.width
    const dy = (mousePosition.y - centerY) / rect.height
    const rotateY = Math.max(Math.min(dx * 18, 18), -18)
    const rotateX = Math.max(Math.min(-dy * 10, 10), -10)
    const distance = Math.min(Math.hypot(dx, dy), 1)
    const blur = Math.min(18, 6 + distance * 30)
    setCardStyle({
      transform: `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
      filter: `drop-shadow(0 ${Math.max(8, blur / 2)}px rgba(14,165,233,0.12))`
    })
    // update on each mouse move
  }, [mousePosition])

  // ----- form submit (mock) -----
  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setIsLoading(true)
    // small animation + mock
    setTimeout(() => {
      setIsLoading(false)
      // save user and call parent
      const user: User = {
        id: '1',
        username: formData.username,
        role: 'contributor',
        token: 'mock-token'
      }
      try {
        localStorage.setItem('catalyst_user', JSON.stringify(user))
      } catch {}
      onLogin(user)
    }, 1200)
  }

  // utility: format large numbers for display
  const formatNum = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${Math.floor(n / 1000)}K`
    if (Number.isFinite(n)) return `${n}`
    return `${n}`
  }

  // motion options
  const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* small keyframes kept inline for shimmer + pulse */}
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-120%);} 100% { transform: translateX(120%);} }
        @keyframes pulse { 0% { transform: scale(0.9); opacity: .8 } 50% { transform: scale(1.05); opacity: 1 } 100% { transform: scale(0.9); opacity: .8 } }
        .shimmer { animation: shimmer 1.8s linear infinite; }
      `}</style>

      {/* Layered gradient orbs with parallax */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div
          style={{
            left: '-10%',
            top: '-18%',
            width: 640,
            height: 640,
            borderRadius: '50%'
          }}
          animate={{
            x: [mousePosition.x * 0.02 - 120, mousePosition.x * 0.01 - 80, mousePosition.x * 0.02 - 120]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bg-[radial-gradient(ellipse_at_center,_#60a5fa33,_transparent)] blur-3xl"
        />
        <motion.div
          style={{
            right: '-6%',
            top: '6%',
            width: 520,
            height: 520,
            borderRadius: '50%'
          }}
          animate={{
            x: [-mousePosition.x * 0.015 + 80, -mousePosition.x * 0.01 + 40, -mousePosition.x * 0.015 + 80]
          }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bg-[radial-gradient(ellipse_at_center,_#7c3aed22,_transparent)] blur-3xl"
        />
        <motion.div
          style={{
            left: '20%',
            bottom: '-20%',
            width: 420,
            height: 420,
            borderRadius: '50%'
          }}
          animate={{
            y: [mousePosition.y * 0.01 - 40, -mousePosition.y * 0.01 + 10, mousePosition.y * 0.01 - 40]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bg-[radial-gradient(ellipse_at_center,_#06b6d42a,_transparent)] blur-3xl"
        />
      </div>

      {/* Header */}
      <header className="relative z-40 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Catalyst
              </div>
              <div className="text-xs text-slate-500">v2.0 · Distributed AI grid</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'About', 'Contact'].map((t) => (
              <a
                key={t}
                href={`#${t.toLowerCase()}`}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
              >
                {t}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main */}
      <div className=" ${poppins.className} min-h-screen bg-white flex min-h-[calc(100vh-120px)]">
        {/* Left: Hero */}
        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="max-w-2xl">
            <motion.div {...fadeUp as any}>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 shimmer" />
                <Sparkles className="w-4 h-4 text-blue-600" />
                <div className="text-sm font-semibold text-blue-700">Powering the Future of AI</div>
                <div className="flex gap-1 ml-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 text-yellow-400" />)}
                </div>
              </div>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
            >
              The Future of
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Distributed Computing
              </span>
            </motion.h1>

            <motion.p className="text-xl text-slate-600 mb-12" {...(fadeUp as any)}>
              Connect your unused compute power to a global network of AI developers.{' '}
              <span className="font-semibold text-blue-600">Earn rewards</span> while fueling the next generation of models.
            </motion.p>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((s, i) => (
                <motion.div key={s.label} whileHover={{ y: -6 }} className="relative group">
                  <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                      {i === 2 ? `${counts[i].toFixed(1)}%` : formatNum(counts[i])}
                      {i !== 2 && '+'}
                    </div>
                    <div className="text-sm text-slate-600">{s.label}</div>
                    <div className="text-[10px] inline-block mt-3 px-2 py-1 rounded-full bg-green-50 text-green-700">
                      {s.trend}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {features.map((f, idx) => {
                const Icon = f.icon
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + idx * 0.06 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow transition">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${f.gradient} shadow-md`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
                        <p className="text-sm text-slate-600">{f.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="flex gap-4">
                <button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg hover:scale-105 transition"
                  onClick={() => {
                    // open the form for quick login flow: toggle to login
                    setIsLogin(true)
                    // optional scroll to auth card
                    authRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                >
                  Get Started Free
                </button>
                <button
                  className="px-6 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 text-slate-700 font-semibold shadow hover:scale-105 transition flex items-center gap-2"
                  onClick={() => authRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                >
                  Watch Demo <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right: Auth card */}
        <div className="w-full max-w-md flex items-center justify-center px-8 py-12">
          <div className="w-full">
            <motion.div
              ref={authRef}
              style={cardStyle}
              initial={{ scale: 0.98, opacity: 0.97 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 140, damping: 16 }}
              className="relative bg-white/85 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 overflow-hidden"
            >
              {/* soft inner glow that follows cursor (via mousePosition) */}
              <div
                className="absolute -inset-10 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(96,165,250,0.06), transparent 20%)`
                }}
              />

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg mb-3">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">
                    {isLogin ? 'Welcome Back' : 'Create your account'}
                  </h2>
                  <p className="text-sm text-slate-600">{isLogin ? 'Sign in to your dashboard' : 'Join Catalyst and start earning'}</p>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter username"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 pr-12 rounded-xl bg-white/80 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                  </button>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1"><Shield className="w-3 h-3" /> Secure</div>
                  <div className="flex items-center gap-1"><Zap className="w-3 h-3" /> Fast setup</div>
                  <div className="flex items-center gap-1"><Globe className="w-3 h-3" /> Global</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
