import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'

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
          <button className="bg-[#55E6C1] text-[#2F3640] px-4 py-2 font-mono text-sm hover:bg-white transition-colors">
            + ADD PROJECT
          </button>
        </div>

        <div className="border border-white/10 bg-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 font-mono text-xs text-zinc-500">
                <th className="p-4 font-normal">TITLE</th>
                <th className="p-4 font-normal">CATEGORY</th>
                <th className="p-4 font-normal">LIVE URL</th>
                <th className="p-4 font-normal">GITHUB</th>
                <th className="p-4 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white">Alucard</td>
                <td className="p-4 text-zinc-400">AI</td>
                <td className="p-4 text-[#55E6C1] text-sm"><a href="https://ai-bot-psi-three.vercel.app" target="_blank" rel="noreferrer">vercel.app</a></td>
                <td className="p-4 text-zinc-400 text-sm"><a href="https://github.com/abdulmueezdev" target="_blank" rel="noreferrer">github.com</a></td>
                <td className="p-4 text-right">
                  <button className="text-zinc-500 hover:text-white mr-4 transition-colors text-sm">Edit</button>
                  <button className="text-[#FF7675] hover:text-red-400 transition-colors text-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
