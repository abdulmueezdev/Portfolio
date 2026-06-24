'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { useState } from 'react'

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    
    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 flex flex-col">
      <PillNav isVisible={true} />
      
      <div className="max-w-xl mx-auto w-full flex-1 mb-24">
        <p className="font-mono text-xs text-[#55E6C1] mb-4">/ CONTACT</p>
        <h1 className="font-display text-5xl mb-8">Get in Touch.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
          Interested in collaborating or have a question? Leave a message and I'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-mono text-xs text-zinc-500 mb-2">NAME</label>
            <input 
              required
              type="text" 
              name="name"
              id="name"
              className="w-full bg-[#2F3640] border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6C5CE7] transition-colors rounded-sm"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-xs text-zinc-500 mb-2">EMAIL</label>
            <input 
              required
              type="email" 
              name="email"
              id="email"
              className="w-full bg-[#2F3640] border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6C5CE7] transition-colors rounded-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-xs text-zinc-500 mb-2">MESSAGE</label>
            <textarea 
              required
              name="message"
              id="message"
              rows={5}
              className="w-full bg-[#2F3640] border border-white/10 p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-[#6C5CE7] transition-colors rounded-sm resize-none"
              placeholder="Hello..."
            />
          </div>
          <button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-[#6C5CE7] text-white py-4 font-mono text-sm hover:bg-[#5a4cdb] transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE →'}
          </button>
          
          {status === 'success' && <p className="text-[#55E6C1] text-sm text-center">Message sent successfully!</p>}
          {status === 'error' && <p className="text-[#FF7675] text-sm text-center">Something went wrong. Please try again.</p>}
        </form>
      </div>

      <Footer />
    </main>
  )
}
