import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/app/portfolio/page'

export default async function Dashboard() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')
  
  if (!session || session.value !== (process.env.ADMIN_SECRET || 'secret')) {
    redirect('/admin')
  }

  return (
    <main className="min-h-screen p-8 bg-[#2F3640]">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-6 mt-12">
          <div className="flex items-center gap-4">
             <Link href="/" className="text-zinc-500 hover:text-white transition-colors font-mono text-sm">← ROOT</Link>
             <h1 className="font-display text-3xl text-white ml-4 border-l border-white/10 pl-4">Dashboard</h1>
          </div>
          <form action={async () => {
            'use server'
            const cookieStore = await cookies()
            cookieStore.delete('admin_session')
            redirect('/admin')
          }}>
            <button type="submit" className="text-sm font-mono text-[#FF7675] hover:text-white transition-colors">
              LOGOUT
            </button>
          </form>
        </header>

        <div className="flex justify-between items-end mb-8">
          <h2 className="text-xl text-white font-display">Projects</h2>
        </div>

        <div className="border border-white/10 bg-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-zinc-500">
                <th className="p-4 font-normal">TITLE</th>
                <th className="p-4 font-normal">CATEGORY</th>
                <th className="p-4 font-normal">LIVE URL</th>
                <th className="p-4 font-normal">GITHUB</th>
                <th className="p-4 font-normal text-right">FEATURED</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white">{project.title}</td>
                  <td className="p-4 text-zinc-400">{project.category}</td>
                  <td className="p-4 text-[#55E6C1] text-sm">
                    {project.live_url ? <a href={project.live_url} target="_blank" rel="noreferrer">vercel.app</a> : <span className="text-zinc-600">-</span>}
                  </td>
                  <td className="p-4 text-zinc-400 text-sm">
                    {project.github_url ? <a href={project.github_url} target="_blank" rel="noreferrer">github.com</a> : <span className="text-zinc-600">-</span>}
                  </td>
                  <td className="p-4 text-right">
                    {project.featured ? <span className="text-[#55E6C1] text-sm font-mono">YES</span> : <span className="text-zinc-600 text-sm font-mono">NO</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
