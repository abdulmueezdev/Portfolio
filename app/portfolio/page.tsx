'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { OrbitCardStack } from '@/components/ui/OrbitCardStack'

export interface Project {
  id: string
  title: string
  description: string
  category: 'web' | 'systems' | 'ai'
  live_url?: string
  github_url?: string
  image_url?: string
  tech_stack: string[]
  featured: boolean
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Alucard',
    description: 'A RAG-powered Franz Kafka AI persona chatbot grounded in the complete Kafka corpus. Built with Supabase pgvector, Groq inference, and Gemini embeddings.',
    category: 'ai',
    live_url: 'https://ai-bot-psi-three.vercel.app',
    github_url: 'https://github.com/abdulmueezdev',
    image_url: '/images/alucard-preview.png',
    tech_stack: ['FastAPI', 'Supabase', 'Groq', 'Next.js'],
    featured: true,
  },
  {
    id: '2',
    title: 'EduIG-Pipeline',
    description: 'An authenticated Instagram data extraction pipeline built with Python, Playwright, and Supabase. Features anti-detection browser automation, session management, and authenticated content extraction with a frontend dashboard.',
    category: 'ai',
    tech_stack: ['Python', 'Automation', 'Playwright', 'Supabase'],
    featured: false,
  },
  {
    id: '3',
    title: 'Nabeel Photographic Moments',
    description: 'A photography portfolio showcasing memorable moments.',
    category: 'web',
    github_url: 'https://github.com/abdulmueezdev/nabeel-photographic-moments',
    tech_stack: ['Next.js', 'React'],
    featured: false,
  },
  {
    id: '4',
    title: 'LeadMap',
    description: 'Automated map scraping and lead scoring engine. Fetches leads from Google Places API, enriches contact details and tech stack, scores leads using customizable rule sets, and generates personalized outreach email drafts.',
    category: 'web',
    github_url: 'https://github.com/abdulmueezdev/leadmap',
    tech_stack: ['Python', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis'],
    featured: false,
  }
]

const featuredProjects = projects.filter(p => p.featured)
const otherProjects = projects.filter(p => !p.featured)

// Map featured projects to OrbitCardStack format
const orbitItems = featuredProjects.map(p => ({
  name: p.title,
  role: p.description.split('.')[0],
  description: p.description,
  image: p.image_url || '',
  accent: '#6C5CE7',
  stat: p.live_url ? 'Live on Vercel' : 'In Development',
}))

export default function Portfolio() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-8">
      <PillNav isVisible={true} />

      <div className="max-w-6xl mx-auto mb-24">
        <p className="font-mono text-xs text-[#55E6C1] mb-4">/ PORTFOLIO</p>
        <h1 className="font-display text-5xl mb-8">Selected Works.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-8">
          A collection of projects across web development, AI integration, and systems programming.
        </p>
        <div className="mb-16">
          <a
            href="/files/abdulmueez-cv.pdf"
            download="Abdul-Mueez-CV.pdf"
            className="inline-block font-mono text-sm px-6 py-3 border border-[#55E6C1] text-[#55E6C1] hover:bg-[#55E6C1] hover:text-[#2F3640] transition-all duration-200 rounded-sm"
          >
            ↓ Download CV
          </a>
        </div>

        {/* OrbitCardStack Section */}
        {featuredProjects.length > 0 && (
          <div className="mb-32">
            <h2 className="font-mono text-sm text-zinc-500 mb-12 border-b border-white/10 pb-4">FEATURED</h2>
            <div className="flex justify-center items-center py-12">
              <OrbitCardStack items={orbitItems} defaultActiveIndex={0} spread={168} lift={34} />
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div>
          <h2 className="font-mono text-sm text-zinc-500 mb-8 border-b border-white/10 pb-4">OTHER PROJECTS</h2>
          {otherProjects.length > 0 ? (
            <div className="flex justify-center items-center py-12">
              <OrbitCardStack items={otherProjects.map(p => ({
                name: p.title,
                role: p.description.split('.')[0] || 'Project',
                description: p.description,
                image: p.image_url || '',
                accent: '#55E6C1',
                stat: p.github_url ? 'View Source' : 'In Development',
              }))} defaultActiveIndex={0} spread={168} lift={34} />
            </div>
          ) : (
            <div className="font-mono text-center py-24 text-zinc-500">
              <p className="text-[#6C5CE7] mb-2">&gt; QUERY_RESULT: NULL</p>
              <p>No projects indexed. Check back soon.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
