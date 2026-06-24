'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string
  if (password !== (process.env.ADMIN_PASSWORD || 'admin')) {
    return { error: 'Access denied.' }
  }
  const cookieStore = await cookies()
  cookieStore.set('admin_session', process.env.ADMIN_SECRET || 'secret', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,  // 8 hours
    path: '/'
  })
  redirect('/admin/dashboard')
}
