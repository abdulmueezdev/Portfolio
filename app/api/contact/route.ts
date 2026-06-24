import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// The RESEND_API_KEY environment variable should be set in .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789')

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: 'abdulmueezshahid550@gmail.com',
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Resend Error:', error)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
