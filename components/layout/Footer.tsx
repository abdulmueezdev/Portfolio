import Link from 'next/link'
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/abdulmueezdev',
    icon: <FaGithub className="w-[18px] h-[18px] md:w-6 md:h-6" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abdulmueezdev/',
    icon: <FaLinkedinIn className="w-[18px] h-[18px] md:w-6 md:h-6" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/abdul.mueez.shahid/',
    icon: <FaInstagram className="w-[18px] h-[18px] md:w-6 md:h-6" />,
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-8 mt-24">
      {/* Top: Assembly motif */}
      <div className="font-mono text-xs mb-12 space-y-1">
        <p className="text-[#55E6C1]">MOV AH, 4Ch</p>
        <p className="text-[#55E6C1]">INT 21h</p>
        <p className="text-zinc-600 mt-2">// Terminating Program...</p>
      </div>

      {/* Bottom row: social icons left, copyright + admin right */}
      <div className="flex flex-wrap items-center justify-between gap-8">
        <div className="flex items-center gap-6 md:gap-8">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-zinc-500 hover:text-white transition-colors duration-200"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="flex flex-col items-end gap-3">
          <p className="text-xs text-zinc-600 text-right">
            © 2025 Abdul-Mueez. Built with Logic & Design.
          </p>
        </div>
      </div>
    </footer>
  )
}
