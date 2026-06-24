'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { OrbitCardStack } from '@/components/ui/OrbitCardStack'

interface Project {
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

const projects: Project[] = [
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
    description: 'An educational Instagram content generation pipeline.',
    category: 'ai',
    github_url: 'https://github.com/abdulmueezdev/EduIG-Pipeline',
    tech_stack: ['Python', 'Automation'],
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
            download="Abdul-Mueez-Shahid-CV.pdf"
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <div key={project.id} className="border border-white/10 bg-white/5 p-6 rounded-xl hover:border-[#6C5CE7]/50 transition-colors group cursor-pointer flex flex-col">
                  <h3 className="text-xl mb-3 group-hover:text-[#6C5CE7] transition-colors">{project.title}</h3>
                  <p className="text-zinc-400 text-sm mb-6 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((t, j) => (
                      <span key={j} className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
