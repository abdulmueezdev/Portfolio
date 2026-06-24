import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#2F3640] flex items-center justify-center p-8">
      <div className="max-w-xl w-full border border-[#FF7675]/30 bg-black/40 p-8 font-mono text-[#FF7675]">
        <p className="text-xl mb-4">&gt; ERROR_404: PAGE_NOT_FOUND</p>
        <div className="text-sm opacity-80 mb-8 leading-relaxed">
          <p>STACK_TRACE: [null]</p>
          <p>The requested memory sector could not be located.</p>
          <p>Initiating graceful fallback...</p>
        </div>
        <Link href="/" className="inline-block border border-[#FF7675] text-[#FF7675] px-6 py-3 hover:bg-[#FF7675] hover:text-[#2F3640] transition-colors text-sm">
          &gt; RETURN TO ROOT
        </Link>
      </div>
    </main>
  )
}
