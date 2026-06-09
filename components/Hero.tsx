'use client'
import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Github } from 'lucide-react'
import PortraitParticles from './PortraitParticles'

const FULL_NAME  = 'Mohammad Anfaal Hossain'
const ROLE       = 'AI Engineer & Full-Stack Developer'
const BIO        = 'Final-year CS student from Malaysia building AI systems and full-stack products at the intersection of research and reality.'
const TYPE_SPEED = 68 // ms per character

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const [typed,       setTyped]       = useState('')
  const [showContent, setShowContent] = useState(false)
  const [cursorOn,    setCursorOn]    = useState(true)

  const nameRef    = useRef<HTMLHeadingElement>(null)
  const hasStarted = useRef(false)

  /* ── Trigger typewriter when name scrolls into view ── */
  useEffect(() => {
    const el = nameRef.current
    if (!el) return

    if (shouldReduceMotion) {
      setTyped(FULL_NAME)
      setShowContent(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return
        hasStarted.current = true
        observer.disconnect()

        let i = 0
        const id = setInterval(() => {
          i += 1
          setTyped(FULL_NAME.slice(0, i))
          if (i >= FULL_NAME.length) {
            clearInterval(id)
            setShowContent(true)
          }
        }, TYPE_SPEED)
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduceMotion])

  /* ── Cursor blink — stops a moment after typing finishes ── */
  useEffect(() => {
    if (typed.length >= FULL_NAME.length) {
      const t = setTimeout(() => setCursorOn(false), 1600)
      return () => clearTimeout(t)
    }
    const id = setInterval(() => setCursorOn(v => !v), 530)
    return () => clearInterval(id)
  }, [typed.length])

  const isTyping  = typed.length < FULL_NAME.length
  const showCursor = isTyping || cursorOn

  return (
    <section>

      {/* ── ABOVE FOLD: portrait centred, full viewport ── */}
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 relative">
        <div className="w-[300px] h-[400px] sm:w-[360px] sm:h-[460px]">
          <PortraitParticles className="w-full h-full" />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-25 pointer-events-none select-none">
          <span className="text-[10px] font-mono text-[var(--text-muted)] tracking-[0.2em] uppercase">scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-dim)] to-transparent" />
        </div>
      </div>

      {/* ── BELOW FOLD: name types in as you scroll ── */}
      <div className="max-w-3xl mx-auto px-6 md:px-10 pt-20 pb-32">

        {/* Status badge */}
        <div className="mb-10 inline-flex items-center gap-2 border border-[var(--bg-border)] bg-[var(--bg-elevated)] rounded-full px-4 py-1.5">
          <span
            className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0"
            style={{ animation: 'pulse-dot 2.5s ease-in-out infinite' }}
          />
          <span className="text-xs font-grotesk font-medium text-[var(--text-secondary)]">
            Open to Internships · 2026
          </span>
        </div>

        {/* Name — typewriter */}
        <h1
          ref={nameRef}
          aria-label={FULL_NAME}
          className="font-georgia text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] leading-[1.08] tracking-[-0.01em] text-[var(--text-primary)] min-h-[1.15em]"
        >
          {typed || '​'}{/* zero-width space keeps line height before typing starts */}
          {showCursor && (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '2px',
                height: '0.82em',
                background: 'var(--accent)',
                marginLeft: '4px',
                verticalAlign: 'middle',
                opacity: cursorOn ? 1 : 0,
                transition: isTyping ? 'none' : 'opacity 0.1s',
              }}
            />
          )}
        </h1>

        {/* Role */}
        <p
          className="mt-6 font-grotesk font-medium text-lg md:text-xl text-[var(--text-secondary)] tracking-[-0.01em]"
          style={{
            opacity:    showContent ? 1 : 0,
            transform:  showContent ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {ROLE}
        </p>

        {/* Bio */}
        <p
          className="mt-4 text-base md:text-[17px] text-[var(--text-secondary)] max-w-[520px] leading-[1.82]"
          style={{
            opacity:    showContent ? 1 : 0,
            transform:  showContent ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.12s, transform 0.6s ease 0.12s',
          }}
        >
          {BIO}
        </p>

        {/* CTAs */}
        <div
          className="mt-8 flex items-center gap-4 flex-wrap"
          style={{
            opacity:    showContent ? 1 : 0,
            transform:  showContent ? 'none' : 'translateY(10px)',
            transition: 'opacity 0.6s ease 0.24s, transform 0.6s ease 0.24s',
          }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-[var(--accent)] text-[var(--accent)] px-7 py-3 rounded-lg text-sm font-grotesk font-medium uppercase tracking-[0.08em] cursor-pointer transition-all duration-200 hover:bg-[var(--accent-glow)]"
          >
            View Work
          </button>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--bg-border)] text-[var(--text-secondary)] px-7 py-3 rounded-lg text-sm font-grotesk font-medium cursor-pointer transition-all duration-200 hover:border-white/10 hover:text-[var(--text-primary)]"
          >
            Download CV
          </a>
          <a
            href="https://github.com/Anfaal26"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 border border-[var(--bg-border)] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[var(--accent)]"
            aria-label="GitHub"
          >
            <Github size={17} className="text-[var(--text-secondary)]" />
          </a>
        </div>

      </div>
    </section>
  )
}
