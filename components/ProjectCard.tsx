'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Github, Globe, ExternalLink } from 'lucide-react'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]), { stiffness: 280, damping: 32 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), { stiffness: 280, damping: 32 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  const cardBase = 'bg-[var(--bg-elevated)] border border-[var(--card-border)] rounded-2xl overflow-hidden cursor-pointer group'
  const restStyle = {
    boxShadow: '0 0 0 1px var(--card-border), 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)',
  }
  const hoverStyle = {
    borderColor: 'rgba(138,175,200,0.18)',
    boxShadow: '0 0 0 1px rgba(138,175,200,0.18), 0 14px 44px rgba(0,0,0,0.48), 0 0 50px rgba(138,175,200,0.05)',
  }

  const imageSlot = (
    <div className={['relative overflow-hidden', featured ? 'h-[220px] lg:h-[340px] lg:w-[55%] lg:shrink-0' : 'aspect-video'].join(' ')}>
      {project.image ? (
        <Image
          src={project.image}
          fill
          alt={project.title}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 55vw"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-elevated)] to-[var(--bg-raised)] flex items-center justify-center">
          <span className="font-grotesk font-bold text-7xl text-[var(--accent)] opacity-[0.07] select-none">
            {project.title.charAt(0)}
          </span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-elevated)] via-transparent to-transparent opacity-70" />
    </div>
  )

  const body = (
    <div className={featured ? 'flex-1 p-7 lg:p-8 flex flex-col justify-between' : 'p-6'}>
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span className="bg-[var(--accent-glow)] text-[var(--accent)] border border-[var(--card-border)] rounded-full text-[10px] font-grotesk uppercase tracking-[0.12em] px-3 py-1">
            {project.category}
          </span>
          {project.status === 'in-progress' && (
            <span
              className="rounded-full text-[10px] font-grotesk uppercase tracking-[0.1em] px-3 py-1"
              style={{ background: 'rgba(200,150,90,0.08)', color: 'var(--warning)', border: '1px solid rgba(200,150,90,0.2)' }}
            >
              In Progress
            </span>
          )}
        </div>

        <h3 className="font-grotesk font-semibold text-[19px] text-[var(--text-primary)] mt-2 leading-snug">
          {project.title}
        </h3>
        {project.tagline && (
          <p className="font-inter text-sm text-[var(--text-secondary)] mt-1.5 leading-snug">
            {project.tagline}
          </p>
        )}
        <p className={`font-inter text-[13.5px] text-[var(--text-muted)] leading-[1.65] mt-3 ${featured ? 'line-clamp-4' : 'line-clamp-3'}`}>
          {project.description}
        </p>

        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="bg-[var(--bg-raised)] text-[var(--text-muted)] border border-[var(--bg-border)] rounded-full text-[11.5px] px-2.5 py-1 font-inter cursor-default transition-all duration-150 hover:text-[var(--text-secondary)] hover:border-[var(--card-border)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-[var(--bg-border)] mt-5 pt-4 flex items-center justify-between">
        {project.links.github ? (
          <a
            href={project.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors duration-150 text-[13px] font-inter cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={15} /> Code
          </a>
        ) : <span />}
        <div className="flex items-center gap-4">
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--accent)] text-[13px] font-inter hover:opacity-75 transition-opacity cursor-pointer"
              onClick={(e) => e.stopPropagation()}>
              <Globe size={15} /> Demo
            </a>
          )}
          {project.links.huggingface && (
            <a href={project.links.huggingface} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[var(--accent)] text-[13px] font-inter hover:opacity-75 transition-opacity cursor-pointer"
              onClick={(e) => e.stopPropagation()}>
              <ExternalLink size={15} /> Space
            </a>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <motion.div
      ref={cardRef}
      whileHover={hoverStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      style={{
        ...restStyle,
        rotateX: featured ? 0 : rotateX,
        rotateY: featured ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      className={`${cardBase}${featured ? ' flex flex-col lg:flex-row lg:h-[340px]' : ''}`}
    >
      {imageSlot}
      {body}
    </motion.div>
  )
}
