'use client'
import { useState, useEffect } from 'react'

export default function SidePanel({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className="relative w-full max-w-[480px] h-full bg-[#2F3640] border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300"
        style={{ animation: 'slideIn 300ms ease-out forwards' }}
      >
        <div className="p-4 border-b border-white/10 flex justify-between items-center">
          <p className="font-mono text-sm text-[#55E6C1]">&gt; KAFKA_PROTOCOL_ACTIVE</p>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-2">
            ✕
          </button>
        </div>
        <div className="flex-1 bg-[#18181b]">
          {children}
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
