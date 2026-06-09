'use client'
import { Sparkles, Code2, Database, GitBranch } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionReveal from './SectionReveal'

const categories = [
  {
    icon: Sparkles,
    title: 'AI & Machine Learning',
    skills: ['PyTorch', 'TensorFlow', 'LangChain', 'HuggingFace', 'OpenAI API', 'RAG Pipelines', 'Computer Vision', 'NLP', 'Deep RL', 'scikit-learn'],
  },
  {
    icon: Code2,
    title: 'Languages & Frameworks',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Next.js', 'React', 'FastAPI', 'Node.js', 'Tailwind CSS'],
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

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <SectionReveal>
          <p className="text-[11px] font-grotesk font-medium tracking-[0.18em] uppercase text-[var(--accent)] mb-5">
            Skills
          </p>
          <h2 className="font-grotesk font-semibold text-4xl md:text-5xl tracking-[-0.03em] gradient-text">
            Tools of the trade
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          {categories.map(({ icon: Icon, title, skills }, index) => (
            <SectionReveal key={title} delay={index * 0.08}>
              <motion.div
                whileHover={{
                  y: -4,
                  borderColor: 'rgba(138,175,200,0.18)',
                  boxShadow: '0 0 0 1px rgba(138,175,200,0.18), 0 10px 36px rgba(0,0,0,0.4), 0 0 40px rgba(138,175,200,0.04)',
                }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl p-6 cursor-default h-full"
                style={{
                  boxShadow: '0 0 0 1px var(--card-border), 0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                <Icon className="w-[18px] h-[18px] text-[var(--accent)]" />
                <p className="mt-3.5 font-grotesk font-semibold text-[15px] text-[var(--text-primary)]">
                  {title}
                </p>
                <div className="my-4 h-px bg-[var(--bg-border)]" />
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11.5px] font-inter bg-[var(--bg-raised)] text-[var(--text-muted)] border border-[var(--bg-border)] rounded-full px-2.5 py-1 cursor-default transition-all duration-150 hover:text-[var(--text-secondary)] hover:border-[var(--card-border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
