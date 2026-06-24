'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import LogoLoop from '@/components/ui/LogoLoop'
import Image from 'next/image'
import { FaMicrochip } from 'react-icons/fa'
import { SiCplusplus, SiJavascript, SiReact, SiNodedotjs, SiTypescript, SiPython, SiGit, SiDocker, SiLinux } from 'react-icons/si'
import { MdAccountBalance, MdGroups } from 'react-icons/md'

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
    <main className="flex-grow z-10 grid grid-cols-1 md:grid-cols-12 gap-0 mt-32 mb-24 max-w-7xl mx-auto w-full border-x-2 border-[#7F8FA6] relative">
      <PillNav isVisible={true} />

      {/* Left Gutter (Line Numbers / IDE Margin) */}
      <aside className="hidden md:flex md:col-span-1 border-r-2 border-[#7F8FA6] flex-col items-center pt-8 bg-[#080f17] opacity-50 font-mono text-sm text-[#7F8FA6] select-none">
        <span className="mb-2">01</span>
        <span className="mb-2">02</span>
        <span className="mb-2">03</span>
        <span className="mb-2">04</span>
        <span className="mb-2">05</span>
        <span className="mb-2">..</span>
      </aside>

      {/* Primary Canvas */}
      <article className="col-span-1 md:col-span-11 p-8 md:p-16 space-y-24">
        {/* Section 1: Introduction */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Box */}
          <div className="space-y-6">
            <div className="inline-block bg-[#6C5CE7] px-3 py-1 mb-4">
              <span className="font-mono text-xs text-white uppercase tracking-widest">Sys.Init()</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-white uppercase border-l-4 border-[#6C5CE7] pl-4">
              Abdul-Mueez Shahid
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
              I&apos;m Abdul-Mueez, a Computer Science student passionate about building scalable web applications and robust systems.
              From low-level Assembly to high-level cloud architecture, I believe in understanding the full stack to create better software.
            </p>
            <a
              href="/files/abdulmueez-cv.pdf"
              download="Abdul-Mueez-Shahid-CV.pdf"
              className="inline-block font-mono text-sm px-6 py-3 border border-[#55E6C1] text-[#55E6C1] hover:bg-[#55E6C1] hover:text-[#2F3640] transition-all duration-200"
            >
              ↓ Download CV
            </a>
          </div>
          {/* Image Masked Box */}
          <div className="relative w-full aspect-[4/5] bg-[#353B48] border-2 border-[#7F8FA6] p-2 overflow-hidden flex justify-center items-center group">
            <div className="absolute top-2 left-2 flex space-x-1.5 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb3b0]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#55E6C1]"></div>
            </div>
            {/* Diagonal Brutalist Striping behind image */}
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_100%)] bg-[length:20px_20px] z-0"></div>
            <div className="relative w-[85%] h-[85%] border-2 border-[#6C5CE7] bg-[#2e353f] overflow-hidden z-10 transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                className="w-full h-full object-cover grayscale mix-blend-luminosity opacity-80"
                src="https://abdulmueezdev.github.io/image.png"
                alt="Abdul-Mueez Shahid"
                fill
                priority
              />
            </div>
          </div>
        </section>

        {/* Section 2: Stats Bar */}
        <section className="border-y-2 border-[#7F8FA6] py-8 relative bg-[#151c25]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-2 divide-[#7F8FA6]">
            <div className="flex flex-col items-center justify-center px-4 text-center">
              <span className="font-display text-[40px] text-[#55E6C1] leading-none">1+</span>
              <span className="font-mono text-xs text-zinc-400 mt-2 uppercase tracking-wide">Years of Experience</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4 text-center">
              <span className="font-display text-[40px] text-[#55E6C1] leading-none">4+</span>
              <span className="font-mono text-xs text-zinc-400 mt-2 uppercase tracking-wide">Projects</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4 text-center">
              <span className="font-display text-[40px] text-[#55E6C1] leading-none">7+</span>
              <span className="font-mono text-xs text-zinc-400 mt-2 uppercase tracking-wide">Technologies</span>
            </div>
            <div className="flex flex-col items-center justify-center px-4 text-center">
              <span className="font-display text-[40px] text-[#55E6C1] leading-none">100%</span>
              <span className="font-mono text-xs text-zinc-400 mt-2 uppercase tracking-wide">Dedication</span>
            </div>
          </div>
        </section>

        {/* Section 3: Education & Societies */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education Card */}
          <div className="bg-[#353B48] border-2 border-[#7F8FA6] p-8 relative group">
            <div className="absolute top-4 left-4 flex space-x-1.5 z-20">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="mt-8">
              <div className="flex items-center space-x-3 mb-4">
                <MdAccountBalance className="text-[#6C5CE7]" size={32} />
                <h2 className="font-display text-2xl text-white uppercase">Education</h2>
              </div>
              <div className="border-l-2 border-[#6C5CE7] pl-4 py-2 space-y-4">
                <div>
                  <h3 className="text-xl text-white font-bold">BS Computer Science</h3>
                  <p className="font-mono text-sm text-zinc-400">NUCES, Peshawar (Batch 2024)</p>
                </div>
                <div className="bg-[#1e2124] p-4 border-l-4 border-[#6C5CE7]">
                  <p className="font-mono text-sm text-[#4addb9] mb-2">// Core Focus</p>
                  <ul className="font-mono text-sm text-white space-y-1">
                    <li>&gt; System Architecture</li>
                    <li>&gt; Full-Stack Engineering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Societies / Leadership Card */}
          <div className="bg-[#353B48] border-2 border-[#7F8FA6] p-8 relative">
            <div className="absolute top-4 left-4 flex space-x-1.5 z-20">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
            </div>
            <div className="mt-8">
              <div className="flex items-center space-x-3 mb-4">
                <MdGroups className="text-[#6C5CE7]" size={32} />
                <h2 className="font-display text-2xl text-white uppercase">Leadership</h2>
              </div>
              <div className="border-l-2 border-[#6C5CE7] pl-4 py-2 space-y-6">
                <div>
                  <h3 className="text-xl text-white font-bold">AWS Student Builder Group</h3>
                  <p className="font-mono text-sm text-[#55E6C1]">Lead</p>
                </div>
                {/* Future expansion slot */}
                <div className="opacity-50 border-t border-[#7F8FA6] pt-4">
                  <p className="font-mono text-sm">[ Awaiting Next Initialization... ]</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Tech Stack LogoLoop */}
        <section className="border-y-2 border-[#7F8FA6] bg-[#353B48] overflow-hidden py-8 relative">
          {/* Inner Terminal styling */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' }}></div>
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#353B48] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#353B48] to-transparent z-10"></div>
          <p className="font-mono text-sm text-[#6C5CE7] text-center mb-6 z-20 relative px-4 bg-[#353B48] inline-block uppercase">Supported Architectures & Frameworks</p>
          
          <div className="h-24 relative overflow-hidden flex items-center z-20">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={64}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#353B48"
              ariaLabel="Abdul-Mueez tech stack"
            />
          </div>
        </section>
      </article>

      <div className="col-span-1 md:col-span-12">
        <Footer />
      </div>
    </main>
  )
}
