'use client'
import SectionReveal from './SectionReveal'

const timelineItems = [
  {
    date: '2025 — 2026',
    title: 'Final Year Project Research',
    subtitle: "Taylor's University · Computer Science Dept",
    description:
      'Building MedSeg AI: a Deep Reinforcement Learning system for medical image segmentation with LLM diagnostic assistance. Supervised research combining DRL agents with clinical MRI/CT imaging datasets.',
    dotColor: 'accent' as const,
  },
  {
    date: '2022 — 2026',
    title: 'B.Sc. Computer Science',
    subtitle: "Taylor's University · Subang Jaya, Malaysia",
    description:
      "CGPA: 3.75 / 4.00. Focus areas: AI & Machine Learning, Software Engineering, Data Structures & Algorithms. Dean's List recipient.",
    dotColor: 'green' as const,
  },
  {
    date: '2023 — Present',
    title: 'Hackathons & Tech Communities',
    subtitle: 'Malaysian Student Developer Scene',
    description:
      'Active participant in university hackathons and tech competitions. Member of AI/ML special interest groups and open-source contributor across multiple repositories.',
    dotColor: 'muted' as const,
  },
]

type DotColor = 'accent' | 'green' | 'muted'

function TimelineDot({ color }: { color: DotColor }) {
  if (color === 'accent') {
    return (
      <span className="absolute -left-[21px] top-1.5 flex items-center justify-center">
        <span className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] block relative z-10" />
          <span
            className="w-5 h-5 rounded-full border border-[var(--accent)] absolute opacity-30"
            style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }}
          />
        </span>
      </span>
    )
  }

  if (color === 'green') {
    return (
      <span className="absolute -left-[21px] top-1.5 flex items-center justify-center">
        <span className="relative flex items-center justify-center">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)] block relative z-10" />
          <span
            className="w-5 h-5 rounded-full border border-[var(--success)] absolute opacity-25"
            style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }}
          />
        </span>
      </span>
    )
  }

  return (
    <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]" />
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
            Background
          </p>
          <h2 className="font-grotesk font-semibold text-4xl md:text-5xl tracking-[-0.03em] gradient-text">
            Experience &amp; Education
          </h2>
        </SectionReveal>

        <div className="max-w-2xl mx-auto mt-16 relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-dim), transparent)' }}
          />

          {timelineItems.map(({ date, title, subtitle, description, dotColor }, index) => (
            <SectionReveal key={title} delay={index * 0.15}>
              <div className="ml-10 relative mb-12 last:mb-0">
                <TimelineDot color={dotColor} />

                <p className="text-[11px] font-grotesk font-medium tracking-[0.14em] uppercase text-[var(--accent)] mb-2">
                  {date}
                </p>
                <p className="font-grotesk font-semibold text-[18px] text-[var(--text-primary)] leading-snug">
                  {title}
                </p>
                <p className="font-inter text-[14px] text-[var(--text-secondary)] mt-1">
                  {subtitle}
                </p>
                <p className="font-inter text-[14px] text-[var(--text-muted)] mt-2.5 leading-[1.7]">
                  {description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
