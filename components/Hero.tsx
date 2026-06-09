'use client'
import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Github } from 'lucide-react'
import PortraitParticles from './PortraitParticles'

const FULL_NAME  = 'Mohammad Anfaal Hossain'
const ROLE       = 'AI Engineer & Full-Stack Developer'
const BIO        = "Final-year CS student from Taylor's University, building AI systems and full-stack products at the intersection of research and reality. Currently seeking internships from September."
const TYPE_SPEED = 65 // ms per character

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const [typed,       setTyped]       = useState('')
  const [showContent, setShowContent] = useState(false)
  const [cursorOn,    setCursorOn]    = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  /* ── Start typewriter on mount (short delay so portrait renders first) ── */
  useEffect(() => {
    if (shouldReduceMotion) {
      setTyped(FULL_NAME)
      setShowContent(true)
      return
    }

    const start = setTimeout(() => {
      let i = 0
      timerRef.current = setInterval(() => {
        i += 1
        setTyped(FULL_NAME.slice(0, i))
        if (i >= FULL_NAME.length) {
          clearInterval(timerRef.current!)
          timerRef.current = null
          setShowContent(true)
        }
      }, TYPE_SPEED)
    }, 600) // 600ms after mount

    return () => {
      clearTimeout(start)
      if (timerRef.current) clearInterval(timerRef.current)
    }
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

  const isTyping   = typed.length < FULL_NAME.length
  const showCursor = isTyping || cursorOn

  return (
    <section className="min-h-screen flex flex-col items-center pt-12 pb-10 px-6">

      {/* Portrait — upper area */}
      <div className="w-[262px] h-[340px] sm:w-[302px] sm:h-[390px] mt-4">
        <PortraitParticles className="w-full h-full" />
      </div>

      {/* Name — directly below portrait */}
      <div className="mt-6 text-center max-w-2xl w-full">

        {/* Typewriter name */}
        <h1
          aria-label={FULL_NAME}
          className="font-georgia text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-[-0.01em] text-[var(--text-primary)] min-h-[1.15em]"
        >
          {typed || ' '}
          {showCursor && (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '2px',
                height: '0.8em',
                background: 'var(--accent)',
                marginLeft: '3px',
                verticalAlign: 'middle',
                opacity: cursorOn ? 1 : 0,
                transition: isTyping ? 'none' : 'opacity 0.15s',
              }}
            />
          )}
        </h1>

        {/* Role */}
        <p
          className="mt-4 font-grotesk font-medium text-base md:text-lg text-[var(--text-secondary)] tracking-[-0.01em]"
          style={{
            opacity:    showContent ? 1 : 0,
            transform:  showContent ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.55s ease, transform 0.55s ease',
          }}
        >
          {ROLE}
        </p>

        {/* Bio */}
        <p
          className="mt-3 text-sm md:text-base text-[var(--text-secondary)] max-w-md mx-auto leading-[1.8]"
          style={{
            opacity:    showContent ? 1 : 0,
            transform:  showContent ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s',
          }}
        >
          {BIO}
        </p>

        {/* CTAs */}
        <div
          className="mt-7 flex items-center justify-center gap-3 flex-wrap"
          style={{
            opacity:    showContent ? 1 : 0,
            transform:  showContent ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s',
          }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-[var(--accent)] text-[var(--accent)] px-6 py-2.5 rounded-lg text-sm font-grotesk font-medium uppercase tracking-[0.08em] cursor-pointer transition-all duration-200 hover:bg-[var(--accent-glow)]"
          >
            View Work
          </button>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[var(--bg-border)] text-[var(--text-secondary)] px-6 py-2.5 rounded-lg text-sm font-grotesk font-medium cursor-pointer transition-all duration-200 hover:border-white/10 hover:text-[var(--text-primary)]"
          >
            Download CV
          </a>
          <a
            href="https://github.com/Anfaal26"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[var(--bg-border)] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[var(--accent)]"
            aria-label="GitHub"
          >
            <Github size={16} className="text-[var(--text-secondary)]" />
          </a>
        </div>
      </div>

    </section>
  )
}
