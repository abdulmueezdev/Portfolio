'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type FormState = 'idle' | 'loading' | 'success' | 'error'

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function Contact() {
  const [state, setState] = useState<FormState>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = useCallback((formData: FormData): boolean => {
    const newErrors: Record<string, string> = {}
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim()
    const message = (formData.get('message') as string)?.trim()

    if (!name) newErrors.name = 'Name is required'
    if (!email) newErrors.email = 'Email is required'
    else if (!validateEmail(email)) newErrors.email = 'Invalid email format'
    if (!message) newErrors.message = 'Message is required'
    else if (message.length < 10) newErrors.message = 'Message must be at least 10 characters'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!validate(formData)) return

    setState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) throw new Error('Failed to send')
      setState('success')
      ;(e.target as HTMLFormElement).reset()
      setErrors({})
    } catch {
      setState('error')
    }
  }

  const buttonText = {
    idle: '> EXECUTE_SEND',
    loading: '> TRANSMITTING...',
    success: '> MESSAGE_SENT ✓',
    error: '> ERROR — RETRY',
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 flex flex-col">
      <PillNav isVisible={true} />

      <div className="max-w-xl mx-auto w-full flex-1 mb-24">
        <p className="font-mono text-xs text-[#55E6C1] mb-4">/ CONTACT</p>
        <h1 className="font-display text-5xl mb-8">Get in Touch.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
          Interested in collaborating or have a question? Leave a message and I&apos;ll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label htmlFor="name" className="block font-mono text-xs text-zinc-500 mb-2">NAME</label>
            <input
              type="text"
              name="name"
              id="name"
              className={`w-full bg-[#2F3640] border p-4 text-white placeholder-zinc-600 focus:outline-none transition-colors rounded-sm ${
                errors.name ? 'border-[#FF7675]' : 'border-white/10 focus:border-[#6C5CE7]'
              }`}
              placeholder="Your name"
              onChange={() => errors.name && setErrors(e => ({ ...e, name: '' }))}
            />
            {errors.name && <p className="text-[#FF7675] text-xs font-mono mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-xs text-zinc-500 mb-2">EMAIL</label>
            <input
              type="email"
              name="email"
              id="email"
              className={`w-full bg-[#2F3640] border p-4 text-white placeholder-zinc-600 focus:outline-none transition-colors rounded-sm ${
                errors.email ? 'border-[#FF7675]' : 'border-white/10 focus:border-[#6C5CE7]'
              }`}
              placeholder="your@email.com"
              onChange={() => errors.email && setErrors(e => ({ ...e, email: '' }))}
            />
            {errors.email && <p className="text-[#FF7675] text-xs font-mono mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-xs text-zinc-500 mb-2">MESSAGE</label>
            <textarea
              name="message"
              id="message"
              rows={5}
              className={`w-full bg-[#2F3640] border p-4 text-white placeholder-zinc-600 focus:outline-none transition-colors rounded-sm resize-none ${
                errors.message ? 'border-[#FF7675]' : 'border-white/10 focus:border-[#6C5CE7]'
              }`}
              placeholder="Tell me about your project or idea..."
              onChange={() => errors.message && setErrors(e => ({ ...e, message: '' }))}
            />
            {errors.message && <p className="text-[#FF7675] text-xs font-mono mt-1">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={state === 'loading'}
            className={`w-full py-4 font-mono text-sm transition-colors disabled:opacity-50 rounded-sm ${
              state === 'error'
                ? 'bg-[#FF7675] text-white hover:bg-[#e06865]'
                : state === 'success'
                ? 'bg-[#55E6C1] text-[#2F3640]'
                : 'bg-[#6C5CE7] text-white hover:bg-[#5a4cdb]'
            }`}
          >
            {buttonText[state]}
          </button>

          <AnimatePresence>
            {state === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[#55E6C1] text-sm mt-6 text-center"
              >
                &gt; TRANSMISSION_COMPLETE: Message received. Will respond within 24h.
              </motion.div>
            )}
            {state === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-mono text-[#FF7675] text-sm mt-6 text-center"
              >
                &gt; TRANSMISSION_FAILED: Connection error. Please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      <Footer />
    </main>
  )
}
