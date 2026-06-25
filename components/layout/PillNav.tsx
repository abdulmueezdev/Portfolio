'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Contact', path: '/contact' },
]

export default function PillNav({ isVisible = true }: { isVisible?: boolean }) {
  const dir = useScrollDirection()
  const pathname = usePathname()
  
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
      {navItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link 
            key={item.path} 
            href={item.path} 
            className={`text-sm transition-colors relative ${isActive ? 'text-[#55E6C1] font-medium' : 'text-zinc-300 hover:text-[#55E6C1]'}`}
          >
            {item.name}
            {isActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#55E6C1] rounded-full"></span>
            )}
          </Link>
        )
      })}
    </nav>
  )
}
