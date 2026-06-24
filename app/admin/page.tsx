'use client'
import { useState } from 'react'
import { adminLogin } from './actions'
import PillNav from '@/components/layout/PillNav'

export default function AdminLogin() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const formData = new FormData(e.currentTarget)
    try {
      const res = await adminLogin(formData)
      if (res?.error) setError(res.error)
    } catch (err: any) {
      if (err?.message?.includes('NEXT_REDIRECT')) {
        throw err // Next.js redirect handles it
      }
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 flex items-center justify-center">
      <PillNav isVisible={true} />
      
      <div className="w-full max-w-sm border border-white/10 bg-[#2F3640] p-8 shadow-2xl relative z-10">
        <p className="font-mono text-xs text-[#55E6C1] mb-6">&gt; SECURE_GATEWAY_</p>
        <h1 className="font-display text-3xl mb-8">Admin Access</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-mono text-xs text-zinc-500 mb-2">ACCESS_CODE</label>
            <input 
              required
              type="password" 
              name="password"
              className="w-full bg-black/20 border border-white/10 p-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#6C5CE7] transition-colors font-mono"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-[#FF7675] text-xs font-mono">{error}</p>}
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#6C5CE7] text-white py-3 font-mono text-sm hover:bg-[#5a4cdb] transition-colors disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </main>
  )
}
