'use client'
import PillNav from '@/components/layout/PillNav'
import Footer from '@/components/layout/Footer'
import { OrbitCardStack } from '@/components/ui/OrbitCardStack'

const featuredProjects = [
  {
    name: 'Alucard',
    role: 'RAG-Powered AI Chatbot',
    description: 'A Franz Kafka persona chatbot grounded in the complete Kafka corpus. Built with Supabase pgvector, Groq inference, and Gemini embeddings.',
    image: '/images/alucard-preview.png',
    accent: '#6C5CE7',
    stat: 'Live on Vercel',
  }
]

const otherProjects = [
  {
    title: 'Cloud Deployment Pipeline',
    description: 'Automated CI/CD pipeline using GitHub Actions, Docker, and AWS EKS.',
    tech: ['AWS', 'Docker', 'GitHub Actions']
  },
  {
    title: 'E-commerce API',
    description: 'High-performance RESTful API with Node.js, Express, and PostgreSQL.',
    tech: ['Node.js', 'Express', 'PostgreSQL']
  },
  {
    title: 'OS Process Scheduler',
    description: 'Simulation of multi-level feedback queue scheduling in C++.',
    tech: ['C++', 'Operating Systems']
  }
]

export default function Portfolio() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-8">
      <PillNav isVisible={true} />
      
      <div className="max-w-6xl mx-auto mb-24">
        <p className="font-mono text-xs text-[#55E6C1] mb-4">/ PORTFOLIO</p>
        <h1 className="font-display text-5xl mb-8">Selected Works.</h1>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-16">
          A collection of my best projects across web development, AI integration, and systems programming.
        </p>

        {/* OrbitCardStack Section */}
        <div className="mb-32">
          <h2 className="font-mono text-sm text-zinc-500 mb-12 border-b border-white/10 pb-4">FEATURED</h2>
          <div className="flex justify-center items-center py-12">
            <OrbitCardStack items={featuredProjects} defaultActiveIndex={0} spread={168} lift={34} />
          </div>
        </div>

        {/* Other Projects Grid */}
        <div>
          <h2 className="font-mono text-sm text-zinc-500 mb-8 border-b border-white/10 pb-4">OTHER PROJECTS</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => (
              <div key={i} className="border border-white/10 bg-white/5 p-6 rounded-xl hover:border-[#6C5CE7]/50 transition-colors group cursor-pointer flex flex-col">
                <h3 className="text-xl mb-3 group-hover:text-[#6C5CE7] transition-colors">{project.title}</h3>
                <p className="text-zinc-400 text-sm mb-6 flex-1">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
