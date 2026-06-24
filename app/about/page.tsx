'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import LogoLoop from '@/components/ui/LogoLoop'
import Image from 'next/image'
import { FaMicrochip } from 'react-icons/fa'
import { SiCplusplus, SiJavascript, SiReact, SiNodedotjs, SiTypescript, SiPython, SiGit, SiDocker, SiLinux } from 'react-icons/si'

const techLogos = [
  { node: <FaMicrochip size={32} />, title: 'Assembly (8088)' },
  { node: <SiCplusplus size={32} />, title: 'C++' },
  { node: <SiJavascript size={32} />, title: 'JavaScript' },
  { node: <SiReact size={32} />, title: 'React' },
  { node: <SiNodedotjs size={32} />, title: 'Node.js' },
  { node: <SiTypescript size={32} />, title: 'TypeScript' },
  { node: <SiPython size={32} />, title: 'Python' },
  { node: <SiGit size={32} />, title: 'Git' },
  { node: <SiDocker size={32} />, title: 'Docker' },
  { node: <SiLinux size={32} />, title: 'Linux' },
]

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-8">
      <PillNav isVisible={true} />

      <div className="max-w-4xl mx-auto mb-24">
        <p className="font-mono text-xs text-[#55E6C1] mb-4">/ ABOUT</p>
        <h1 className="font-display text-5xl mb-8">Bridging Theory & Practice.</h1>

        {/* Intro with profile image */}
        <div className="flex flex-col md:flex-row gap-12 mb-16">
          <div className="flex-1">
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              I&apos;m Abdul-Mueez, a Computer Science student passionate about building scalable web applications and robust systems.
              From low-level Assembly to high-level cloud architecture, I believe in understanding the full stack to create better software.
            </p>
            <a
              href="/files/abdulmueez-cv.pdf"
              download="Abdul-Mueez-Shahid-CV.pdf"
              className="inline-block font-mono text-sm px-6 py-3 border border-[#55E6C1] text-[#55E6C1] hover:bg-[#55E6C1] hover:text-[#2F3640] transition-all duration-200 rounded-sm"
            >
              ↓ Download CV
            </a>
          </div>
          <div className="w-full md:w-64 flex-shrink-0">
            <Image
              src="https://abdulmueezdev.github.io/image.png"
              alt="Abdul-Mueez Shahid"
              width={400}
              height={480}
              className="object-cover rounded-sm border border-white/10 w-full"
              priority
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-24">
          <h2 className="font-mono text-sm text-zinc-500 mb-8 border-b border-white/10 pb-4">CURRENT_STACK</h2>
          <div className="h-24 relative overflow-hidden bg-[#2F3640] flex items-center">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={64}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#2F3640"
              ariaLabel="Abdul-Mueez tech stack"
            />
          </div>
        </div>

        {/* Education & Societies */}
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-mono text-sm text-zinc-500 mb-6 border-b border-white/10 pb-4">EDUCATION</h2>
            <div className="border border-white/10 p-6 bg-white/5 rounded-xl">
              <h3 className="text-xl mb-2 text-white">BSc Computer Science</h3>
              <p className="text-[#55E6C1] text-sm mb-2">National University of Computer and Emerging Sciences (NUCES), Peshawar</p>
              <p className="text-zinc-400 text-sm">Batch of 2024 — Focus on system architecture and full-stack engineering.</p>
            </div>
          </div>
          <div>
            <h2 className="font-mono text-sm text-zinc-500 mb-6 border-b border-white/10 pb-4">SOCIETIES & CLUBS</h2>
            <div className="space-y-4">
              <div className="border border-white/10 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                <h3 className="text-white">AWS Student Builder Group</h3>
                <p className="text-sm text-zinc-400">Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
