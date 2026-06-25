'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import AlucardSection from '@/components/sections/AlucardSection'

const customStyles = `
@keyframes flicker {
    0% { opacity: 0; }
    5% { opacity: 1; }
    10% { opacity: 0; }
    15% { opacity: 1; }
    30% { opacity: 0.5; }
    50% { opacity: 1; }
    80% { opacity: 0.8; }
    100% { opacity: 1; }
}

@keyframes textGlitch {
    0% { transform: translate(0) }
    20% { transform: translate(-2px, 2px) }
    40% { transform: translate(-2px, -2px) }
    60% { transform: translate(2px, 2px) }
    80% { transform: translate(2px, -2px) }
    100% { transform: translate(0) }
}

.glitch-text:hover {
    animation: textGlitch 0.2s linear infinite;
    color: #55E6C1;
    text-shadow: 2px 0 #6C5CE7, -2px 0 #ff5f56;
}

.flicker-in {
    animation: flicker 1s step-end forwards;
}

#bg-log {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: rgba(108, 92, 231, 0.15);
    line-height: 1;
    white-space: pre-wrap;
    word-break: break-all;
    opacity: 0.5;
    transition: transform 0.1s ease-out;
}
`

const generateChunk = (len: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
  let result = ''
  for(let i=0; i<len; i++) {
    if (Math.random() > 0.95) result += '\n> SYSTEM_LOG_' + Math.floor(Math.random()*9999) + ' '
    else if (Math.random() > 0.98) result += ' [ERROR_CORRECT] '
    else result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default function Home() {
  const [booted, setBooted] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [logText, setLogText] = useState('')
  const [logTransform, setLogTransform] = useState('translate(0px, 0px)')

  // Background log generation
  useEffect(() => {
    setLogText(generateChunk(5000))

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLogText(prev => prev.substring(100) + generateChunk(100))
      }
    }, 100)

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setLogTransform(`translate(${x}px, ${y}px)`)
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(interval)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const [hasSkipped, setHasSkipped] = useState(false)

  // Lock scroll immediately on mount — release only after boot
  useEffect(() => {
    if (sessionStorage.getItem("portfolioEntryCompleted") === "true") {
      setHasSkipped(true)
      setClicked(true)
      setBooted(true)
    } else {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    if (booted) {
      document.body.style.overflow = 'auto'
    }
  }, [booted])

  const handleBootClick = () => {
    if (clicked) return
    setClicked(true)

    document.body.style.animation = 'textGlitch 0.1s infinite'
    setTimeout(() => { document.body.style.animation = 'none' }, 300)

    setTimeout(() => {
      setBooted(true)
      sessionStorage.setItem("portfolioEntryCompleted", "true")
    }, 600)
  }

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      {/* Background Data Stream */}
      <div id="bg-log" style={{ transform: logTransform }}>
        {logText}
      </div>

      <PillNav isVisible={booted} />

      {/* Hero — full viewport canvas */}
      <section className="relative w-full h-screen overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-[#0a0a0a]/80 -z-10 backdrop-blur-sm"></div>

        {/* Interaction Area */}
        {!hasSkipped && (
          <div 
            onClick={handleBootClick}
            className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center cursor-pointer z-20 transition-transform duration-500 ease-in-out hover:scale-105"
            style={{
              transform: clicked ? 'scale(2) translate(20%, -20%)' : 'none',
              filter: clicked ? 'contrast(200%) hue-rotate(90deg)' : 'none',
              opacity: clicked ? 0.1 : 1,
              pointerEvents: clicked ? 'none' : 'auto',
            }}
          >
          {/* Click Prompt (Initial State) */}
          <AnimatePresence>
            {!clicked && (
              <motion.div 
                className="absolute top-1/2 left-1/4 -translate-y-1/2 text-left flicker-in"
                exit={{ opacity: 0 }}
              >
                <span className="font-mono text-sm text-[#55E6C1] block mb-2 border-b border-[#55E6C1] pb-1 w-max">
                  &gt;&gt; SYSTEM_HALTED
                </span>
                <p className="font-mono text-sm text-zinc-400 flex items-center gap-2 mt-4 hover:text-[#55E6C1] transition-colors">
                  <span className="text-[#55E6C1]">&gt;</span>
                  EXECUTE_BOOT_SEQUENCE
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        )}

        {/* Post-boot hero text */}
        <AnimatePresence>
          {booted && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pointer-events-none z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0 }} // delay removed because timeout handles it
            >
              <div className="max-w-2xl mt-32 pointer-events-auto flicker-in">
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="font-mono text-[#6C5CE7] text-sm mb-4 inline-flex items-center gap-2 bg-transparent border-l-4 border-[#6C5CE7] pl-4 py-1"
                >
                  <span className="tracking-widest uppercase">&gt;&gt; USER: [ COMPUTER SCIENCE STUDENT ]</span>
                </motion.p>
                <motion.h1
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.16, duration: 0.4 }}
                  className="font-display text-5xl md:text-8xl mb-6 tracking-tight text-white glitch-text cursor-crosshair break-words max-w-full"
                >
                  ABDUL-MUEEZ.
                </motion.h1>
                <motion.h2
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 0.4 }}
                  className="text-xl md:text-3xl text-zinc-300 mb-6 font-display uppercase tracking-widest text-outline-variant leading-snug"
                >
                  [ Code ] [ Cloud ] [ Craft ]
                </motion.h2>
                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.28, duration: 0.4 }}
                  className="text-zinc-400 max-w-xl mb-10 leading-relaxed text-lg"
                >
                  A Computer Science student merging theoretical depth
                  with practical deployment. Specialising in Web Development,
                  AWS, and System Architecture.
                </motion.p>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.34, duration: 0.4 }}
                  className="flex flex-col md:flex-row gap-4"
                >
                  <Link href="/portfolio" className="bg-[#6C5CE7] text-[#0a0a0a] border-2 border-[#6C5CE7] px-8 py-3 hover:bg-[#0a0a0a] hover:text-[#6C5CE7] transition-all rounded-sm font-mono text-sm uppercase font-bold hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0px_0px_#6C5CE7] text-center w-full md:w-auto">
                    Explore Work →
                  </Link>
                  <Link href="/contact" className="border-2 border-[#6C5CE7] text-[#6C5CE7] px-8 py-3 hover:bg-[#6C5CE7] hover:text-[#0a0a0a] transition-all rounded-sm font-mono text-sm uppercase font-bold hover:-translate-y-1 hover:translate-x-1 hover:shadow-[-6px_6px_0px_0px_rgba(108,92,231,0.5)] text-center w-full md:w-auto">
                    Init Contact
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Everything below — hidden until booted */}
      <div
        className={booted ? "unlocked" : ""}
        style={{
          visibility: booted ? 'visible' : 'hidden',
          pointerEvents: booted ? 'auto' : 'none',
          height: booted ? 'auto' : 0,
          overflow: booted ? 'visible' : 'hidden',
        }}
      >
        <AlucardSection />
        <Footer />
      </div>
    </main>
  )
}

