'use client'
import { useState } from 'react'
import { Mail, Linkedin, Github, MapPin, CheckCircle, AlertCircle } from 'lucide-react'
import SectionReveal from './SectionReveal'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const links = [
  { icon: Mail, text: 'anfaalhossain26@gmail.com', href: 'mailto:anfaalhossain26@gmail.com' },
  { icon: Linkedin, text: 'linkedin.com/in/mohammad-anfaal-hossain', href: 'https://linkedin.com/in/mohammad-anfaal-hossain' },
  { icon: Github, text: 'github.com/Anfaal26', href: 'https://github.com/Anfaal26' },
  { icon: MapPin, text: 'Kuala Lumpur, Malaysia', href: null },
]

const inputClass = [
  'w-full bg-[var(--bg-raised)] border border-[var(--bg-border)] rounded-xl px-4 py-3',
  'text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
  'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent-glow)]',
  'transition-colors duration-200 font-inter text-sm disabled:opacity-50',
].join(' ')

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) { setStatus('success'); form.reset() }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <SectionReveal>
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
            Contact
          </p>
          <h2 className="font-grotesk font-semibold text-4xl md:text-5xl tracking-[-0.03em] leading-tight">
            Let&apos;s build something
            <span className="gradient-text"> together</span>
          </h2>
          <p className="mt-6 font-inter text-[17px] text-[var(--text-secondary)] max-w-md leading-[1.75]">
            I&apos;m open to internship opportunities and AI/ML freelance projects. Whether you&apos;re building something new or exploring what&apos;s possible with AI, reach out.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {links.map(({ icon: Icon, text, href }) => {
              const inner = (
                <>
                  <Icon className="w-[17px] h-[17px] text-[var(--accent)] shrink-0" />
                  <span className="font-inter text-[14px] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-200 relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 group-hover:after:w-full after:h-px after:bg-[var(--accent)] after:transition-all after:duration-300">
                    {text}
                  </span>
                </>
              )
              return href ? (
                <a
                  key={text}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  {inner}
                </a>
              ) : (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="w-[17px] h-[17px] text-[var(--accent)] shrink-0" />
                  <span className="font-inter text-[14px] text-[var(--text-secondary)]">{text}</span>
                </div>
              )
            })}
          </div>
        </SectionReveal>

        {/* Right — form */}
        <SectionReveal delay={0.2}>
          <div
            className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-8"
            style={{ boxShadow: '0 0 0 1px var(--card-border), 0 4px 24px rgba(0,0,0,0.3)' }}
          >
            {/* TODO: Set up Formspree — replace FORMSPREE_ID in Contact form action URL */}
            <form
              action="https://formspree.io/f/mgobyznd"
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div>
                <label htmlFor="contact-name" className="block text-[11px] font-grotesk uppercase tracking-[0.12em] text-[var(--text-muted)] mb-2">
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  disabled={status === 'loading'}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-[11px] font-grotesk uppercase tracking-[0.12em] text-[var(--text-muted)] mb-2">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  disabled={status === 'loading'}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-[11px] font-grotesk uppercase tracking-[0.12em] text-[var(--text-muted)] mb-2">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell me about your project..."
                  disabled={status === 'loading'}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {(status === 'idle' || status === 'loading') && (
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={[
                    'mt-2 w-full border border-[var(--accent)] text-[var(--accent)] bg-transparent py-3 rounded-lg',
                    'font-grotesk font-medium uppercase tracking-[0.08em] text-sm cursor-pointer',
                    'flex items-center justify-center gap-2',
                    'transition-all duration-200 hover:bg-[var(--accent-glow)]',
                    status === 'loading' ? 'opacity-60 cursor-not-allowed' : '',
                  ].join(' ')}
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
              )}

              {status === 'success' && (
                <div className="mt-2 w-full rounded-lg py-3 font-grotesk font-medium uppercase tracking-[0.08em] text-sm flex items-center justify-center gap-2 text-[var(--success)]"
                  style={{ background: 'rgba(91,175,138,0.08)', border: '1px solid rgba(91,175,138,0.25)' }}>
                  <CheckCircle className="w-4 h-4" />
                  Sent! I&apos;ll reply within 24h.
                </div>
              )}

              {status === 'error' && (
                <div className="mt-2 w-full rounded-lg py-3 font-grotesk font-medium uppercase tracking-[0.08em] text-sm flex items-center justify-center gap-2 text-red-400"
                  style={{ border: '1px solid rgba(248,113,113,0.25)' }}>
                  <AlertCircle className="w-4 h-4" />
                  Failed. Email me directly.
                </div>
              )}
            </form>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
