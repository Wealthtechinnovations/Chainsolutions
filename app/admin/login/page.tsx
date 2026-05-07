'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.error) {
      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#D4A017] to-[#F5C842] rounded-2xl mb-4 shadow-lg shadow-[#D4A017]/30">
            <span className="text-[#0A1628] font-black text-2xl">CS</span>
          </div>
          <h1 className="text-white text-2xl font-bold">ChainSolutions</h1>
          <p className="text-white/50 text-sm mt-1">Espace Administration</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white text-lg font-semibold mb-6">Connexion</h2>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-4 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  placeholder="votre@email.com"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4A017]/50 focus:ring-1 focus:ring-[#D4A017]/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'} value={password}
                  onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••••"
                  className="w-full bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg pl-10 pr-12 py-3 text-sm focus:outline-none focus:border-[#D4A017]/50 focus:ring-1 focus:ring-[#D4A017]/20 transition-colors"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-[#D4A017] to-[#F5C842] text-[#0A1628] font-bold py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6">
              {loading
                ? <div className="w-4 h-4 border-2 border-[#0A1628] border-t-transparent rounded-full animate-spin" />
                : 'Se connecter'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          Accès réservé aux administrateurs autorisés — www.chainsolutions.fr
        </p>
      </div>
    </div>
  )
}
