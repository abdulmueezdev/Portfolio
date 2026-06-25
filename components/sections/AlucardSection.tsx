'use client'
import { useState } from 'react'
import Image from 'next/image'
import SidePanel from '@/components/ui/SidePanel'

export default function AlucardSection() {
  const [open, setOpen] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  return (
    <section className="py-24 px-8 border-t border-white/10 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Left Column (Sidebar) */}
        <div className="w-full lg:w-1/3 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="font-mono text-white text-sm uppercase tracking-widest">[ARCH_LOG]</h3>
            <div className="flex-grow h-px bg-white/10"></div>
          </div>
          
          {/* Stack List & Code Block */}
          <div className="border border-white/10 p-6 mb-6">
            <p className="font-mono text-[10px] text-zinc-500 mb-6 uppercase tracking-widest">STACK</p>
            <ul className="font-mono text-sm text-zinc-300 space-y-3">
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-sm"><span className="text-[#6C5CE7] text-xs">&gt;</span> Supabase_pgvector</li>
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-sm"><span className="text-[#6C5CE7] text-xs">&gt;</span> Groq_mixtral</li>
              <li className="flex items-center gap-3 bg-white/5 p-3 rounded-sm"><span className="text-[#6C5CE7] text-xs">&gt;</span> Gemini_embed</li>
            </ul>
            
            {/* Code Snippet */}
            <div className="mt-8 font-mono text-[11px] text-zinc-500 leading-relaxed">
              <div className="text-zinc-400 mb-1">const context =</div>
              <div className="mb-1 text-zinc-300">vectorSearch(emb, pgvector);</div>
              <div className="text-zinc-400 mb-1">return groq.completions({`{`}</div>
              <div className="pl-4 mb-1">messages:</div>
              <div className="pl-4 text-zinc-300 mb-1">buildPrompt(context)</div>
              <div className="text-zinc-400">{`});`}</div>
            </div>
          </div>

          {/* Latency Metric Card */}
          <div className="border border-white/10 p-6 relative">
            <p className="font-mono text-[10px] text-zinc-500 mb-4 tracking-widest">LATENCY_METRIC()</p>
            <div className="font-display text-5xl text-white mb-4 tracking-tighter">&lt;400MS</div>
            <p className="font-mono text-xs text-zinc-400">Avg TTFB for RAG pipeline.</p>
            <div className="absolute top-4 right-4 w-5 h-5 border border-zinc-600 rounded-full flex items-center justify-center text-[8px] text-zinc-500 italic">i</div>
          </div>
        </div>

        {/* Right Column (Main Content) */}
        <div className="w-full lg:w-2/3 flex flex-col">
          {/* Header with Title and Buttons */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
            <div>
              <p className="font-mono text-[10px] text-zinc-500 mb-2 tracking-widest">[FEATURED_PROJ_01]</p>
              <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight uppercase">ALUCARD AI</h2>
            </div>
            <div className="flex gap-4">
                <a
                  href="https://ai-bot-psi-three.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs px-6 py-4 border border-white/20 text-zinc-400 hover:text-white hover:border-white/40 transition-colors uppercase tracking-wider flex items-center justify-center h-full"
                >
                  Live Demo
                </a>
                <button
                  onClick={() => { setOpen(true); setIframeLoaded(false); }}
                  className="font-mono text-xs px-6 py-4 bg-[#6C5CE7] text-[#0a0a0a] hover:bg-[#5a4cdb] hover:text-white transition-colors uppercase font-bold tracking-wider"
                >
                  RUM_KAFKA.SH &gt;
                </button>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-8"></div>

          {/* Center Image/Preview */}
          <div 
            onClick={() => { setOpen(true); setIframeLoaded(false); }}
            className="w-full aspect-video border border-white/10 relative group overflow-hidden cursor-pointer bg-[#111111] mb-8 p-1 md:p-2"
          >
            <div className="relative w-full h-full border border-white/5">
              <Image 
                src="/images/alucard-preview.png"
                alt="Alucard Chatbot Preview"
                fill
                className="object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500 mix-blend-luminosity hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-[#6C5CE7]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="font-mono text-white text-xs bg-[#0a0a0a] px-6 py-3 border border-[#6C5CE7] shadow-[4px_4px_0px_0px_#6C5CE7]">INITIALIZE_CONNECTION</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <p className="font-mono text-zinc-400 max-w-3xl leading-loose text-sm">
            A RAG-powered Franz Kafka AI persona chatbot utilizing Supabase pgvector, Groq, and Gemini embeddings. Designed to simulate existential dread via natural language processing.
          </p>
        </div>
      </div>

      <SidePanel open={open} onClose={() => setOpen(false)}>
        <div className="relative w-full h-full bg-[#18181b]">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-[#55E6C1] border-t-transparent rounded-full animate-spin"></div>
                <p className="font-mono text-xs text-[#55E6C1]">LOADING KAFKA_PROTOCOL...</p>
              </div>
            </div>
          )}
          <iframe
            src="https://ai-bot-psi-three.vercel.app"
            className={`w-full h-full border-0 transition-opacity duration-500 bg-[#18181b] ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            title="Alucard — Kafka AI Chatbot"
            onLoad={() => setIframeLoaded(true)}
            allow="clipboard-write"
          />
        </div>
      </SidePanel>
    </section>
  )
}
