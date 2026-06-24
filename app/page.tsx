'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import AlucardSection from '@/components/sections/AlucardSection'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

export default function Home() {
  const [booted, setBooted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = booted ? 'auto' : 'hidden'
  }, [booted])

  return (
    <main>
      <PillNav isVisible={booted} />
      
      {/* Hero — always rendered */}
      <section className="relative h-screen w-full">
        <div className="absolute inset-0">
          <HeroScene onBootComplete={() => setBooted(true)} />
        </div>

        {/* Pre-boot prompt overlay */}
        <AnimatePresence>
          {!booted && (
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-sm text-[#55E6C1]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              exit={{ opacity: 0 }}
            >
              &gt; CLICK TO BOOT_
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post-boot hero text */}
        <AnimatePresence>
          {booted && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-16 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="max-w-2xl mt-32 pointer-events-auto">
                <motion.p 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="font-mono text-[#6C5CE7] text-sm mb-4"
                >
                  [ CS Student · 3rd Semester ]
                </motion.p>
                <motion.h1 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.96, duration: 0.4 }}
                  className="font-display text-8xl mb-6 tracking-tight"
                >
                  ABDUL-MUEEZ.
                </motion.h1>
                <motion.h2 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.02, duration: 0.4 }}
                  className="text-3xl text-zinc-300 mb-6 font-display"
                >
                  Code. Cloud. Craft...
                </motion.h2>
                <motion.p 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.08, duration: 0.4 }}
                  className="text-zinc-400 max-w-xl mb-10 leading-relaxed text-lg"
                >
                  A Computer Science student merging theoretical depth
                  with practical deployment. Specialising in Web Development,
                  AWS, and System Architecture.
                </motion.p>
                <motion.div 
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.14, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <button className="bg-[#6C5CE7] text-white px-8 py-3 hover:bg-[#5a4cdb] transition-colors rounded-sm">
                    Explore Work →
                  </button>
                  <button className="border border-white/20 px-8 py-3 hover:bg-white/5 transition-colors rounded-sm">
                    Contact Me →
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Everything below — hidden until booted */}
      <div className={booted ? 'block' : 'hidden'}>
        <AlucardSection />
        <Footer />
      </div>
    </main>
  )
}
