'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionReveal from './SectionReveal'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

type FilterType = 'ALL' | 'AI/ML' | 'Full-Stack' | 'Data'
const FILTERS: FilterType[] = ['ALL', 'AI/ML', 'Full-Stack', 'Data']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL')

  const filtered = activeFilter === 'ALL' ? projects : projects.filter((p) => p.category === activeFilter)
  const featured = filtered.filter((p) => p.featured)
  const standard = filtered.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
            Projects
          </p>
          <h2 className="font-grotesk font-bold text-4xl md:text-5xl text-[var(--text-primary)] gradient-text tracking-[-0.03em]">
            What I&apos;ve built
          </h2>
          <p className="font-inter text-[var(--text-secondary)] mt-4 text-[17px] leading-relaxed">
            Research-grade AI systems and shipped products.
          </p>
        </SectionReveal>

        {/* Filter tabs */}
        <div className="mt-10 flex items-center gap-2.5 flex-wrap">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={[
                'text-[11px] font-grotesk uppercase tracking-[0.1em] px-4 py-2 rounded-full transition-all duration-200 cursor-pointer',
                activeFilter === filter
                  ? 'bg-[var(--accent-glow)] border border-[var(--accent)] text-[var(--accent)]'
                  : 'border border-[var(--bg-border)] text-[var(--text-muted)] hover:border-[rgba(255,255,255,0.12)] hover:text-[var(--text-secondary)]',
              ].join(' ')}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {featured.map((p) => (
              <motion.div
                layout
                key={p.id}
                className="col-span-1 md:col-span-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <ProjectCard project={p} featured={true} />
              </motion.div>
            ))}
            {standard.map((p) => (
              <motion.div
                layout
                key={p.id}
                className="col-span-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
