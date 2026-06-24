'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

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
    idle: '[ EXECUTE_SEND ]',
    loading: '[ TRANSMITTING... ]',
    success: '[ MESSAGE_SENT ✓ ]',
    error: '[ ERROR — RETRY ]',
  }

  return (
    <main className="flex-grow pt-32 pb-24 px-8 md:px-16 w-full max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-12 gap-8">
      <PillNav isVisible={true} />

      {/* Left Gutter (Line Numbers) */}
      <aside className="hidden md:block md:col-span-2 border-r-2 border-[#7F8FA6] relative">
        <div className="sticky top-40 font-mono text-sm text-zinc-500 opacity-50 flex flex-col gap-2 items-end pr-4">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
          <span>07</span>
          <span>08</span>
          <span>09</span>
          <span>10</span>
          <span>11</span>
          <span>12</span>
        </div>
      </aside>

      {/* Right Content Area */}
      <section className="md:col-span-10 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight">
            Let's build something <span className="text-[#c6bfff]">extraordinary.</span>
          </h1>
          <p className="font-body text-lg text-zinc-400 max-w-2xl">
            Initializing communication protocol. Whether it's optimizing physics engines, structuring compiler design, or architecting robust digital infrastructure, let's execute the next command.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Card */}
          <div className="bg-[#353B48] border-2 border-[#7F8FA6] p-8 relative">
            {/* Terminal Window Motif */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-8" noValidate>
              <div className="flex flex-col gap-2 relative">
                <label className="font-mono text-xs text-[#c6bfff] uppercase" htmlFor="name">Full Name_</label>
                <input 
                  className={`bg-transparent border-b-2 text-white font-mono text-sm py-2 placeholder-zinc-500 focus:outline-none focus:border-[#6C5CE7] transition-colors ${errors.name ? 'border-[#FF7675]' : 'border-[#7F8FA6]'}`}
                  id="name" 
                  name="name"
                  placeholder="Enter your identifier" 
                  type="text"
                  onChange={() => errors.name && setErrors(e => ({ ...e, name: '' }))}
                />
                {errors.name && <p className="text-[#FF7675] text-xs font-mono absolute -bottom-5">{errors.name}</p>}
              </div>

              <div className="flex flex-col gap-2 relative mt-2">
                <label className="font-mono text-xs text-[#c6bfff] uppercase" htmlFor="email">Email Address_</label>
                <input 
                  className={`bg-transparent border-b-2 text-white font-mono text-sm py-2 placeholder-zinc-500 focus:outline-none focus:border-[#6C5CE7] transition-colors ${errors.email ? 'border-[#FF7675]' : 'border-[#7F8FA6]'}`}
                  id="email" 
                  name="email"
                  placeholder="user@domain.com" 
                  type="email"
                  onChange={() => errors.email && setErrors(e => ({ ...e, email: '' }))}
                />
                {errors.email && <p className="text-[#FF7675] text-xs font-mono absolute -bottom-5">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-2 relative mt-2">
                <label className="font-mono text-xs text-[#c6bfff] uppercase" htmlFor="message">Message Payload_</label>
                <textarea 
                  className={`bg-transparent border-b-2 text-white font-mono text-sm py-2 placeholder-zinc-500 focus:outline-none focus:border-[#6C5CE7] transition-colors resize-none ${errors.message ? 'border-[#FF7675]' : 'border-[#7F8FA6]'}`}
                  id="message" 
                  name="message"
                  placeholder="Input parameters..." 
                  rows={4}
                  onChange={() => errors.message && setErrors(e => ({ ...e, message: '' }))}
                ></textarea>
                {errors.message && <p className="text-[#FF7675] text-xs font-mono absolute -bottom-5">{errors.message}</p>}
              </div>

              <button 
                className={`font-mono text-sm text-white uppercase py-4 px-8 mt-4 transition-all duration-200 border-2 active:translate-y-0.5 active:translate-x-0.5 disabled:opacity-50
                  ${state === 'error' ? 'bg-[#FF7675] border-[#FF7675] hover:shadow-[4px_4px_0px_0px_#0d141d]' :
                    state === 'success' ? 'bg-[#55E6C1] text-[#0d141d] border-[#55E6C1]' :
                    'bg-[#6C5CE7] border-[#6C5CE7] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#55E6C1]'}`}
                type="submit"
                disabled={state === 'loading'}
              >
                {buttonText[state]}
              </button>

              <AnimatePresence>
                {state === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[#55E6C1] text-sm text-center mt-2"
                  >
                    &gt; TRANSMISSION_COMPLETE: Will respond within 24h.
                  </motion.div>
                )}
                {state === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[#FF7675] text-sm text-center mt-2"
                  >
                    &gt; TRANSMISSION_FAILED: Connection error.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Info Sidebar */}
          <div className="flex flex-col gap-8">
            {/* Terminal Block */}
            <div className="bg-[#1e2124] border-l-4 border-[#6C5CE7] p-6 font-mono text-sm">
              <p className="text-zinc-400"><span className="text-[#c6bfff]">user@system:~$</span> ping -c 1 location</p>
              <p className="text-[#4addb9] mt-2">PING location.abdulmueez (127.0.0.1): 56 data bytes</p>
              <p className="text-white mt-1">64 bytes from Peshawar, Pakistan: icmp_seq=0 ttl=64 time=0.042 ms</p>
              
              <p className="text-zinc-400 mt-4"><span className="text-[#c6bfff]">user@system:~$</span> cat contact.info</p>
              <p className="text-[#ffb3b0] mt-2">email: <a className="hover:underline" href="mailto:abdulmueezshahid550@gmail.com">abdulmueezshahid550@gmail.com</a></p>
            </div>

            {/* Map Image Placeholder */}
            <div className="h-64 relative overflow-hidden border-2 border-[#7F8FA6] bg-[#353B48]">
              <Image 
                className="object-cover opacity-60" 
                src="https://abdulmueezdev.github.io/map-placeholder.jpg" 
                alt="Map of Peshawar"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d141d] to-transparent pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 font-mono text-xs text-[#c6bfff] bg-[#2e353f] px-2 py-1 border border-[#7F8FA6]">
                LOC_DATA: PESH, PK
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </main>
  )
}
