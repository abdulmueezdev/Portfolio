import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-8">
      <div className="font-mono text-[#55E6C1] text-xs mb-6">
        <p>MOV AH, 4Ch</p>
        <p>INT 21h</p>
        <p className="text-zinc-500 mt-1">// Terminating Program...</p>
      </div>
      
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <a href="https://github.com/abdulmueezdev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-zinc-400">GitHub</a>
          <a href="#" className="hover:text-white transition-colors text-zinc-400">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors text-zinc-400">Instagram</a>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-xs text-zinc-600">© 2025 Abdul-Mueez. Built with Logic & Design.</p>
          <Link href="/admin" className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors">
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
