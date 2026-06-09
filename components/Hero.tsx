'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Github } from 'lucide-react'
import PortraitParticles from './PortraitParticles'

const FULL_NAME = 'Mohammad Anfaal Hossain'
const ROLE = 'AI Engineer & Full-Stack Developer'

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const words = FULL_NAME.split(' ')
  const animate = mounted && !shouldReduceMotion

  const fadeUp = (delay: number) => ({
    initial: animate ? { opacity: 0, y: 18, filter: 'blur(6px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: animate ? { delay, duration: 0.75, ease: [0.23, 1, 0.32, 1] } : { duration: 0 },
  })

  return (
    <section style={{ minHeight: '100vh', background: 'transparent' }} className="flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-24 w-full">

        {/* LEFT COLUMN */}
        <div>

          {/* Status badge */}
          <motion.div
            suppressHydrationWarning
            className="mb-8 inline-flex items-center gap-2 border border-[var(--bg-border)] bg-[var(--bg-elevated)] rounded-full px-4 py-1.5"
            {...fadeUp(0.1)}
          >
            <span
              className="w-2 h-2 rounded-full bg-[var(--success)] shrink-0"
              style={{ animation: 'pulse-dot 2.5s ease-in-out infinite' }}
            />
            <span className="text-xs font-grotesk font-medium text-[var(--text-secondary)]">
              Open to Internships · 2026
            </span>
          </motion.div>

          {/* Name — word-by-word mask reveal */}
          <h1
            className="font-grotesk font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] tracking-[-0.04em] leading-[1.05]"
            aria-label={FULL_NAME}
          >
            {words.map((word, wi) => (
              <span key={wi} className="block overflow-hidden">
                <motion.span
                  key={animate ? `w-a-${wi}` : `w-s-${wi}`}
                  style={{ display: 'block' }}
                  initial={animate ? { y: '105%', opacity: 0 } : { y: '0%', opacity: 1 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={animate ? {
                    delay: 0.2 + wi * 0.12,
                    duration: 0.78,
                    ease: [0.16, 1, 0.3, 1],
                  } : { duration: 0 }}
                  className="gradient-text"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Role */}
          <motion.p
            suppressHydrationWarning
            className="mt-6 font-grotesk font-medium text-lg md:text-xl text-[var(--text-secondary)] tracking-[-0.01em]"
            {...fadeUp(0.65)}
          >
            {ROLE}
          </motion.p>

          {/* Bio */}
          <motion.p
            suppressHydrationWarning
            className="mt-5 font-inter text-base md:text-[17px] text-[var(--text-secondary)] max-w-[480px] leading-[1.75]"
            {...fadeUp(0.8)}
          >
            Final-year CS student from Malaysia building AI systems and full-stack products at the intersection of research and reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            suppressHydrationWarning
            className="mt-8 flex items-center gap-4 flex-wrap"
            {...fadeUp(0.95)}
          >
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-[var(--accent)] text-[var(--accent)] px-7 py-3 rounded-lg text-sm font-grotesk font-medium uppercase tracking-[0.08em] cursor-pointer transition-all duration-200 hover:bg-[var(--accent-glow)]"
            >
              View Work
            </button>

            {/* TODO: Add your CV PDF to /public/cv.pdf -later */}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[var(--bg-border)] text-[var(--text-secondary)] px-7 py-3 rounded-lg text-sm font-grotesk font-medium cursor-pointer transition-all duration-200 hover:border-white/15 hover:text-[var(--text-primary)]"
            >
              Download CV
            </a>

            {/* TODO: Anfaal26: Replace with your GitHub username */}
            <a
              href="https://github.com/Anfaal26"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 border border-[var(--bg-border)] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[var(--accent)]"
              aria-label="GitHub"
            >
              <Github size={17} className="text-[var(--text-secondary)]" />
            </a>
          </motion.div>

        </div>

        {/* RIGHT COLUMN — particle portrait */}
        <motion.div
          className="hidden lg:block h-[480px] w-full"
          suppressHydrationWarning
          initial={animate ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1.4 }}
        >
          <PortraitParticles className="w-full h-full" />
        </motion.div>

      </div>
    </section>
  )
}
