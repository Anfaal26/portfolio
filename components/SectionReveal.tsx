'use client'
import { motion, useReducedMotion } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left'
}

export default function SectionReveal({ children, delay = 0, className = '', direction = 'up' }: SectionRevealProps) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return <div className={className}>{children}</div>

  const initial = direction === 'left'
    ? { opacity: 0, x: -28, filter: 'blur(5px)' }
    : { opacity: 0, y: 36, filter: 'blur(5px)' }

  const animate = direction === 'left'
    ? { opacity: 1, x: 0, filter: 'blur(0px)' }
    : { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.72, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
