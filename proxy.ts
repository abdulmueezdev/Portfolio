import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const session = req.cookies.get('admin_session')
  if (req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (session?.value !== (process.env.ADMIN_SECRET || 'secret')) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }
  }
}

export const config = {
  matcher: ['/admin/dashboard/:path*']
}
