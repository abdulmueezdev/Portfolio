'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function Contact() {
  const [isSent, setIsSent] = useState(false)

  useEffect(() => {
    if (window.location.search.includes('sent=true')) {
      setIsSent(true)
    }
  }, [])

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

            <form action="https://formsubmit.co/abdulmueezshahid550@gmail.com" method="POST" className="mt-8 flex flex-col gap-8">
              <input type="hidden" name="_next" value="https://portfolio-kx7f1jhe3-abdulmueezs-projects-99b2e67f.vercel.app/contact?sent=true" />
              
              <div className="flex flex-col gap-2 relative">
                <label className="font-mono text-xs text-[#c6bfff] uppercase" htmlFor="name">Full Name_</label>
                <input 
                  className="bg-transparent border-b-2 text-white font-mono text-sm py-2 placeholder-zinc-500 focus:outline-none focus:border-[#6C5CE7] transition-colors border-[#7F8FA6]"
                  id="name" 
                  name="name"
                  placeholder="Enter your identifier" 
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 relative mt-2">
                <label className="font-mono text-xs text-[#c6bfff] uppercase" htmlFor="email">Email Address_</label>
                <input 
                  className="bg-transparent border-b-2 text-white font-mono text-sm py-2 placeholder-zinc-500 focus:outline-none focus:border-[#6C5CE7] transition-colors border-[#7F8FA6]"
                  id="email" 
                  name="email"
                  placeholder="user@domain.com" 
                  type="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2 relative mt-2">
                <label className="font-mono text-xs text-[#c6bfff] uppercase" htmlFor="message">Message Payload_</label>
                <textarea 
                  className="bg-transparent border-b-2 text-white font-mono text-sm py-2 placeholder-zinc-500 focus:outline-none focus:border-[#6C5CE7] transition-colors resize-none border-[#7F8FA6]"
                  id="message" 
                  name="message"
                  placeholder="Input parameters..." 
                  rows={4}
                  required
                ></textarea>
              </div>

              <button 
                className="font-mono text-sm text-white uppercase py-4 px-8 mt-4 transition-all duration-200 border-2 active:translate-y-0.5 active:translate-x-0.5 bg-[#6C5CE7] border-[#6C5CE7] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0px_0px_#55E6C1]"
                type="submit"
              >
                [ EXECUTE_SEND ]
              </button>

              <AnimatePresence>
                {isSent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-[#55E6C1] text-sm text-center mt-2"
                  >
                    &gt; MESSAGE_TRANSMITTED_SUCCESSFULLY
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

            {/* Terminal Info Panel */}
            <div className="bg-[#353B48] border-2 border-[#7F8FA6] p-6 font-mono text-sm text-zinc-300">
              <p className="text-[#55E6C1] mb-4">&gt; STATUS: ONLINE</p>
              <div className="flex flex-col gap-3">
                <div className="flex">
                  <span className="text-[#c6bfff] w-32">GITHUB:</span>
                  <a href="https://github.com/abdulmueezdev" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#55E6C1] transition-colors">/abdulmueezdev</a>
                </div>
                <div className="flex">
                  <span className="text-[#c6bfff] w-32">LINKEDIN:</span>
                  <a href="https://linkedin.com/in/abdulmueezdev" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#55E6C1] transition-colors">/in/abdulmueezdev</a>
                </div>
                <div className="flex">
                  <span className="text-[#c6bfff] w-32">INSTAGRAM:</span>
                  <a href="https://instagram.com/abdul.mueez.shahid" target="_blank" rel="noreferrer" className="hover:underline hover:text-[#55E6C1] transition-colors">/abdul.mueez.shahid</a>
                </div>
                <div className="flex mt-4 pt-4 border-t border-[#7F8FA6]/30">
                  <span className="text-zinc-500">AVAILABLE_FOR_HIRE: TRUE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </main>
  )
}
