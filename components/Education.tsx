'use client'

import SectionReveal from './SectionReveal'

const COURSEWORK = [
  'Machine Learning', 'Computer Vision', 'Natural Language Processing',
  'Cognitive Computing & Applications', 'Big Data Technologies', 'Data Analytics',
  'Parallel Computing', 'Data Structures & Algorithms', 'Database Systems',
  'Operating Systems', 'Computer Networks', 'Principles of Software Engineering',
  'Human Computer Interaction', 'OOP', 'Advanced Programming',
]

export default function Education() {
  return (
    <section id="education" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <SectionReveal direction="left">
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
            academic background
          </p>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <h2 className="font-grotesk font-semibold text-3xl md:text-4xl gradient-text tracking-[-0.03em] leading-tight mb-10">
            Education
          </h2>
        </SectionReveal>

        <div className="flex flex-col gap-5">

          {/* Taylor's University — primary card */}
          <SectionReveal delay={0.12}>
            <div className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-7 shadow-[0_0_30px_var(--card-glow)]">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-grotesk font-semibold text-lg text-[var(--text-primary)]">
                    Taylor&apos;s University
                  </h3>
                  <p className="text-sm text-[var(--accent)] font-grotesk mt-0.5">
                    Bachelor of Computer Science — AI Specialization
                  </p>
                </div>
                <div className="flex flex-col sm:items-end gap-1 shrink-0">
                  <span className="text-xs font-grotesk text-[var(--text-muted)] tracking-wide">2024 – 2027</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-grotesk text-[var(--text-secondary)]">
                      CGPA <span className="text-[var(--accent)] font-semibold">3.75</span>
                    </span>
                    <span className="text-xs font-grotesk text-[var(--text-muted)]">·</span>
                    <span className="text-xs font-grotesk text-[var(--text-secondary)]">
                      Dean&apos;s List — <span className="text-[var(--accent)]">Sem 1, 3, 4, 5, 6</span>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-grotesk font-medium tracking-[0.14em] uppercase text-[var(--text-muted)] mb-3">
                  Relevant Coursework
                </p>
                <div className="flex flex-wrap gap-2">
                  {COURSEWORK.map((course) => (
                    <span
                      key={course}
                      className="text-xs font-grotesk text-[var(--text-secondary)] bg-[var(--bg-base)] border border-[var(--bg-border)] px-3 py-1 rounded-full"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* IAL + IGCSE — side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <SectionReveal delay={0.18}>
              <div className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-6 h-full">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-grotesk font-semibold text-base text-[var(--text-primary)]">
                      Earth House School
                    </h3>
                    <p className="text-xs text-[var(--accent)] font-grotesk mt-0.5">
                      International A-Levels (IAL)
                    </p>
                  </div>
                  <span className="text-xs font-grotesk text-[var(--text-muted)] tracking-wide shrink-0">
                    2022 – 2023
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    { subject: 'Physics',     grade: 'A*' },
                    { subject: 'Mathematics', grade: 'A'  },
                    { subject: 'Economics',   grade: 'B'  },
                  ].map(({ subject, grade }) => (
                    <li key={subject} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)] font-grotesk">{subject}</span>
                      <span
                        className={`text-xs font-grotesk font-semibold px-2 py-0.5 rounded-md ${
                          grade === 'A*'
                            ? 'text-[var(--accent)] bg-[var(--accent-glow)]'
                            : 'text-[var(--text-secondary)] bg-[var(--bg-base)]'
                        }`}
                      >
                        {grade}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.24}>
              <div className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-6 h-full">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-grotesk font-semibold text-base text-[var(--text-primary)]">
                      Earth House School
                    </h3>
                    <p className="text-xs text-[var(--accent)] font-grotesk mt-0.5">
                      IGCSE
                    </p>
                  </div>
                  <span className="text-xs font-grotesk text-[var(--text-muted)] tracking-wide shrink-0">
                    2022 – 2023
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {[
                    { subject: 'Chemistry',              grade: '9 (A*)' },
                    { subject: 'Bengali',                grade: '8 (A*)' },
                    { subject: 'Mathematics',            grade: 'B'      },
                    { subject: 'Further Pure Maths',     grade: null     },
                    { subject: 'Physics',                grade: null     },
                    { subject: 'Economics',              grade: null     },
                    { subject: 'English Language',       grade: 'B'      },
                  ].map(({ subject, grade }) => (
                    <li key={subject} className="flex items-center justify-between">
                      <span className="text-sm text-[var(--text-secondary)] font-grotesk">{subject}</span>
                      {grade && (
                        <span
                          className={`text-xs font-grotesk font-semibold px-2 py-0.5 rounded-md ${
                            grade.includes('A*')
                              ? 'text-[var(--accent)] bg-[var(--accent-glow)]'
                              : 'text-[var(--text-secondary)] bg-[var(--bg-base)]'
                          }`}
                        >
                          {grade}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

          </div>
        </div>
      </div>
    </section>
  )
}
