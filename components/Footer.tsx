import { Github, Linkedin, Mail } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--bg-border)] bg-[rgba(6,6,14,0.55)] backdrop-blur-sm">
      <div className="py-8 max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left */}
          <div>
            <span className="font-grotesk font-bold text-xl text-[var(--accent)]">AN</span>
            <p className="mt-3 font-inter text-sm text-[var(--text-muted)] leading-relaxed">
              Building AI systems, one commit at a time.
            </p>
            <p className="mt-1.5 font-inter text-[13px] text-[var(--text-muted)]">
              Kuala Lumpur, Malaysia 🇲🇾
            </p>
          </div>

          {/* Centre */}
          <div>
            <p className="text-[11px] font-grotesk uppercase tracking-[0.14em] text-[var(--text-muted)] mb-4">
              Navigation
            </p>
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="block font-inter text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150 mb-2.5"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right */}
          <div>
            <p className="text-[11px] font-grotesk uppercase tracking-[0.14em] text-[var(--text-muted)] mb-4">
              Get in touch
            </p>
            <a
              href="mailto:anfaalhossain26@gmail.com"
              className="font-inter text-[14px] text-[var(--accent)] hover:underline underline-offset-2 transition-all"
            >
              anfaalhossain26@gmail.com
            </a>
            <div className="flex gap-4 mt-5">
              <a
                href="https://github.com/Anfaal26"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-[17px] h-[17px]" />
              </a>
              <a
                href="https://linkedin.com/in/mohammad-anfaal-hossain"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-[17px] h-[17px]" />
              </a>
              <a
                href="mailto:anfaalhossain26@gmail.com"
                className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-[17px] h-[17px]" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--bg-border)] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="font-inter text-[12px] text-[var(--text-muted)]">
            © 2026 Mohammad Anfaal Hossain — Built with Next.js &amp; Tailwind
          </p>
          <p className="font-inter text-[12px] text-[var(--text-muted)]">
            Designed &amp; coded by me
          </p>
        </div>
      </div>
    </footer>
  )
}
