'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export function useScrollDirection() {
  const [dir, setDir] = useState<'up' | 'down'>('up')
  const prev = useRef(0)
  
  useEffect(() => {
    const fn = () => {
      setDir(window.scrollY > prev.current && window.scrollY > 50 ? 'down' : 'up')
      prev.current = window.scrollY
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return dir
}

export default function PillNav({ isVisible = true }: { isVisible?: boolean }) {
  const dir = useScrollDirection()
  
  return (
    <nav className={`
      fixed top-4 left-1/2 -translate-x-1/2 z-50
      flex items-center gap-8 px-8 py-3
      rounded-full
      bg-[#2F3640]/70 backdrop-blur-md
      border border-white/10
      transition-all duration-300
      ${!isVisible ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100'}
      ${dir === 'down' && isVisible ? '-translate-y-24' : 'translate-y-0'}
    `}>
      <Link href="/" className="text-sm hover:text-[#55E6C1] transition-colors">Home</Link>
      <Link href="/about" className="text-sm hover:text-[#55E6C1] transition-colors">About</Link>
      <Link href="/portfolio" className="text-sm hover:text-[#55E6C1] transition-colors">Portfolio</Link>
      <Link href="/contact" className="text-sm hover:text-[#55E6C1] transition-colors">Contact</Link>
    </nav>
  )
}
