'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';

/* Count-up number that animates when scrolled into view */
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return
      started.current = true
      const duration = 1400
      let startTime: number
      const step = (ts: number) => {
        if (!startTime) startTime = ts
        const elapsed = ts - startTime
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { value: 2, suffix: '', label: 'Projects shipped' },
  { value: 3, suffix: '+', label: 'Builds in progress' },
]

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT COLUMN */}
          <div>
            <SectionReveal direction="left">
              <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
                little bit about me...
              </p>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="font-grotesk font-semibold text-4xl md:text-5xl gradient-text tracking-[-0.03em] leading-tight">
                Where human curiosity meets machine intelligence
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="mt-6 font-inter text-[17px] text-[var(--text-secondary)] max-w-lg leading-[1.78]">
                I&apos;m a final-year Computer Science student at Taylor&apos;s University, specialising in Artificial Intelligence; genuinely obsessed with how intelligent systems are built, trained, and deployed. My interest sits at the crossroads of machine learning research and real-world engineering: from deep reinforcement learning and computer vision to RAG pipelines and LLM applications. I minor in psychology, which has shaped how I think about AI — I find myself constantly drawing parallels between how the human mind learns and how machines do, and how psychological concepts are already abstracted in the domain of machine intelligence. When I&apos;m not thinking about machines, I&apos;m thinking about the bigger questions: the cosmos, philosophy, and the nature of life &amp; intelligence itself. In the era of machines, to keep my humanity, I go for occasional hikes and keep my inner child busy with sports whenever time allows.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.27}>
              <p className="mt-4 font-inter text-[17px] text-[var(--text-secondary)] max-w-lg leading-[1.78]">
               Originally from Bangladesh, based in Subang Jaya. My core stack is PyTorch, Python, and FastAPI — building and deploying ML systems end-to-end, from training pipelines to production inference. That psychology lens feeds directly into my ML work: reinforcement learning, to me, isn&apos;t just an algorithm — it&apos;s a formalisation of how living systems learn through consequence, iteration and failure. I work across the full stack when needed — Next.js, React, PostgreSQL, Docker, MongoDB — but AI and ML is where I focus. I hold a current CGPA of 3.75 with Dean&apos;s List recognition across five semesters, and I&apos;m actively seeking an internship where I can contribute to meaningful AI work in a real engineering environment.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.35}>
              <div className="mt-10 flex gap-10">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="font-grotesk font-bold text-[38px] text-[var(--accent)] leading-none">
                      <CountUp target={stat.value} suffix={stat.suffix} />
                    </span>
                    <span className="font-inter text-[13px] text-[var(--text-muted)] mt-2 leading-snug">
                      {stat.label}
                    </span>
                  </div>
                ))}
                <div className="flex flex-col">
                  <span className="font-grotesk font-bold text-[28px] text-[var(--accent)] leading-none mt-1">
                    Final Year
                  </span>
                  <span className="font-inter text-[13px] text-[var(--text-muted)] mt-2 leading-snug">
                    CS Student
                  </span>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* RIGHT COLUMN — floating terminal card */}
          <SectionReveal delay={0.45}>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-7 shadow-[0_0_40px_var(--card-glow)]"
            >
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-auto text-[12px] font-mono text-[var(--text-muted)] tracking-wide">
                  profile.json
                </span>
              </div>

              {/* JSON content */}
              <pre className="font-mono text-[13px] leading-[1.85] overflow-x-auto">
                <code>
                  <span style={{ color: 'var(--text-muted)' }}>{'{'}</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;name&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--accent)' }}>&quot;Mohammad Anfaal Hossain&quot;</span><span style={{ color: 'var(--text-muted)' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;role&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--accent)' }}>&quot;AI Engineer&quot;</span><span style={{ color: 'var(--text-muted)' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;location&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--accent)' }}>&quot;Kuala Lumpur, MY 🇲🇾&quot;</span><span style={{ color: 'var(--text-muted)' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;university&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--accent)' }}>&quot;Taylor&apos;s University&quot;</span><span style={{ color: 'var(--text-muted)' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;focus&quot;</span><span style={{ color: 'var(--text-muted)' }}>: [</span><span style={{ color: 'var(--accent)' }}>&quot;LLMs &amp; RAG&quot;</span><span style={{ color: 'var(--text-muted)' }}>, </span><span style={{ color: 'var(--accent)' }}>&quot;Computer Vision&quot;</span><span style={{ color: 'var(--text-muted)' }}>, </span><span style={{ color: 'var(--accent)' }}>&quot;Full-Stack Dev&quot;</span><span style={{ color: 'var(--text-muted)' }}>],</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;available&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--success)' }}>true</span><span style={{ color: 'var(--text-muted)' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;cgpa&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--warning)' }}>3.75</span><span style={{ color: 'var(--text-muted)' }}>,</span>{'\n'}
                  {'  '}<span style={{ color: 'var(--text-secondary)' }}>&quot;currently_building&quot;</span><span style={{ color: 'var(--text-muted)' }}>: </span><span style={{ color: 'var(--accent)' }}>&quot;MedSeg AI&quot;</span>{'\n'}
                  <span style={{ color: 'var(--text-muted)' }}>{'}'}</span>
                </code>
              </pre>
            </motion.div>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
