'use client'
import { Sparkles, Code2, Database, GitBranch, GraduationCap, Award } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'

const skillCategories = [
  {
    icon: Sparkles,
    title: 'AI & Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'LangChain', 'HuggingFace', 'OpenAI API', 'RAG Pipelines', 'Computer Vision', 'NLP', 'Deep RL', 'scikit-learn'],
  },
  {
    icon: Code2,
    title: 'Languages & Frameworks',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'C++', 'SQL', 'R', 'Next.js', 'React', 'FastAPI', 'Node.js'],
  },
  {
    icon: Database,
    title: 'Data & Infrastructure',
    skills: ['PostgreSQL', 'MongoDB', 'Pinecone', 'Redis', 'Docker', 'Pandas', 'NumPy', 'Streamlit', 'Vercel'],
  },
  {
    icon: GitBranch,
    title: 'Dev & Tooling',
    skills: ['Git', 'GitHub Actions', 'REST APIs', 'Jupyter', 'Linux', 'VS Code', 'Agile', 'Technical Writing'],
  },
]

const education = [
  {
    icon: GraduationCap,
    degree: 'B.Sc. Computer Science',
    institution: "Taylor's University",
    location: 'Subang Jaya, Malaysia',
    period: '2022 — 2026',
    detail: 'CGPA 3.75 / 4.00 · Focus: AI & Machine Learning, Software Engineering',
    highlight: "Dean's List — 5 consecutive semesters",
  },
]

const certifications = [
  { icon: Award, title: 'Psychology (Minor)', body: "Taylor's University · in progress" },
]

export default function SkillsEducation() {
  return (
    <section id="skills" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ── Skills ── */}
        <SectionReveal>
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
            Skills
          </p>
          <h2 className="font-grotesk font-semibold text-4xl md:text-5xl tracking-[-0.03em] gradient-text">
            Tools of the trade
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {skillCategories.map(({ icon: Icon, title, skills }, index) => (
            <SectionReveal key={title} delay={index * 0.07}>
              <motion.div
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(200,208,216,0.18)',
                  boxShadow: '0 0 0 1px rgba(200,208,216,0.18), 0 10px 36px rgba(0,0,0,0.45)',
                }}
                transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-6 h-full cursor-default"
                style={{ boxShadow: '0 0 0 1px var(--card-border), 0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <Icon className="w-[17px] h-[17px] text-[var(--accent)]" />
                <p className="mt-3.5 font-grotesk font-semibold text-[14px] text-[var(--text-primary)]">{title}</p>
                <div className="my-3.5 h-px bg-[var(--bg-border)]" />
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-inter bg-[var(--bg-raised)] text-[var(--text-muted)] border border-[var(--bg-border)] rounded-full px-2.5 py-0.5 cursor-default transition-all duration-150 hover:text-[var(--text-secondary)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>

        {/* ── Education ── */}
        <SectionReveal delay={0.1}>
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5 mt-24">
            Education
          </p>
          <h2 className="font-grotesk font-semibold text-4xl md:text-5xl tracking-[-0.03em] gradient-text">
            Academic background
          </h2>
        </SectionReveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Main degree card */}
          {education.map(({ icon: Icon, degree, institution, location, period, detail, highlight }) => (
            <SectionReveal key={degree} delay={0.15} className="lg:col-span-2">
              <div
                className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-7 h-full"
                style={{ boxShadow: '0 0 0 1px var(--card-border), 0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg-raised)] border border-[var(--bg-border)] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="font-grotesk font-semibold text-[17px] text-[var(--text-primary)] leading-snug">{degree}</p>
                    <p className="font-inter text-[14px] text-[var(--accent)] mt-0.5">{institution}</p>
                    <p className="font-inter text-[13px] text-[var(--text-muted)] mt-0.5">{location} · {period}</p>
                  </div>
                </div>
                <div className="mt-5 h-px bg-[var(--bg-border)]" />
                <p className="mt-4 font-inter text-[14px] text-[var(--text-secondary)] leading-[1.7]">{detail}</p>
                <div className="mt-3 inline-flex items-center gap-2 bg-[var(--accent-glow)] border border-[var(--card-border)] rounded-full px-3 py-1">
                  <Award className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span className="text-[12px] font-grotesk font-medium text-[var(--accent)]">{highlight}</span>
                </div>
              </div>
            </SectionReveal>
          ))}

          {/* Side cards */}
          <div className="flex flex-col gap-4">
            {certifications.map(({ icon: Icon, title, body }) => (
              <SectionReveal key={title} delay={0.22}>
                <div
                  className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-6"
                  style={{ boxShadow: '0 0 0 1px var(--card-border), 0 4px 20px rgba(0,0,0,0.3)' }}
                >
                  <Icon className="w-[17px] h-[17px] text-[var(--accent)]" />
                  <p className="mt-3 font-grotesk font-semibold text-[14px] text-[var(--text-primary)]">{title}</p>
                  <p className="mt-1 font-inter text-[13px] text-[var(--text-muted)]">{body}</p>
                </div>
              </SectionReveal>
            ))}

            <SectionReveal delay={0.28}>
              <div
                className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-6"
                style={{ boxShadow: '0 0 0 1px var(--card-border), 0 4px 20px rgba(0,0,0,0.3)' }}
              >
                <Sparkles className="w-[17px] h-[17px] text-[var(--accent)]" />
                <p className="mt-3 font-grotesk font-semibold text-[14px] text-[var(--text-primary)]">Hackathons & Community</p>
                <p className="mt-1 font-inter text-[13px] text-[var(--text-muted)] leading-[1.65]">
                  Active in university hackathons, AI/ML interest groups, and open-source contributions.
                </p>
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
