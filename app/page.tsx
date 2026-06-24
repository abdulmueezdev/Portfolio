'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import AlucardSection from '@/components/sections/AlucardSection'

const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

export default function Home() {
  const [booted, setBooted] = useState(false)

  // Lock scroll immediately on mount — release only after boot
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    if (booted) {
      document.body.style.overflow = 'auto'
    }
  }, [booted])

  return (
    <main>
      <PillNav isVisible={booted} />

      {/* Hero — full viewport canvas */}
      <section className="relative w-full h-screen overflow-hidden bg-[#2F3640]">
        <div className="absolute inset-0 w-full h-full">
          <HeroScene onBootComplete={() => setBooted(true)} />
        </div>

        {/* Pre-boot prompt overlay */}
        <AnimatePresence>
          {!booted && (
            <motion.div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-sm text-[#55E6C1] z-10 select-none pointer-events-none"
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
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 pointer-events-none z-10"
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
                  className="font-display text-6xl md:text-8xl mb-6 tracking-tight"
                >
                  ABDUL-MUEEZ.
                </motion.h1>
                <motion.h2
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.02, duration: 0.4 }}
                  className="text-2xl md:text-3xl text-zinc-300 mb-6 font-display"
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
                  className="flex flex-wrap gap-4"
                >
                  <Link href="/portfolio" className="bg-[#6C5CE7] text-white px-8 py-3 hover:bg-[#5a4cdb] transition-colors rounded-sm font-mono text-sm">
                    Explore Work →
                  </Link>
                  <Link href="/contact" className="border border-white/20 px-8 py-3 hover:bg-white/5 transition-colors rounded-sm font-mono text-sm">
                    Contact Me →
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Everything below — hidden until booted */}
      <div
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
