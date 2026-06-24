'use client'
import { useState } from 'react'
import SidePanel from '@/components/ui/SidePanel'

export default function AlucardSection() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-24 px-8 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <p className="font-mono text-xs text-[#55E6C1] mb-4">FEATURED PROJECT</p>
        
        {/* Heading */}
        <h2 className="font-display text-6xl text-white mb-6">Speak to Kafka.</h2>
        
        {/* Description */}
        <p className="text-zinc-400 max-w-xl mb-8 leading-relaxed text-lg">
          Alucard is a RAG-powered Franz Kafka AI persona chatbot — grounded in the complete
          Kafka corpus via Supabase pgvector, running inference on Groq (llama-4-scout), with
          embeddings from Gemini text-embedding-004.
        </p>

        <div className="flex gap-4">
          {/* Trigger button — terminal style */}
          <button
            onClick={() => setOpen(true)}
            className="font-mono text-sm px-6 py-3 border border-[#6C5CE7] text-[#6C5CE7]
                       hover:bg-[#6C5CE7] hover:text-white transition-all duration-200"
          >
            &gt; INITIALIZE KAFKA_PROTOCOL
          </button>
          <a
            href="https://ai-bot-psi-three.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-sm px-6 py-3 border border-white/20 text-zinc-400
                       hover:border-white/40 hover:text-white transition-all duration-200"
          >
            View Live Demo →
          </a>
        </div>
      </div>

      <SidePanel open={open} onClose={() => setOpen(false)}>
        <iframe
          src="https://ai-bot-psi-three.vercel.app"
          className="w-full h-full border-0"
          title="Alucard — Kafka AI Chatbot"
        />
      </SidePanel>
    </section>
  )
}
