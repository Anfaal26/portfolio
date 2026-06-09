'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left'
}

export default function SectionReveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // useInView works correctly with Lenis (unlike whileInView)
  const isInView = useInView(ref, { once: true, amount: 0.05 })

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  const hidden = direction === 'left'
    ? { opacity: 0, x: -24, filter: 'blur(4px)' }
    : { opacity: 0, y: 28, filter: 'blur(4px)' }

  const visible = direction === 'left'
    ? { opacity: 1, x: 0, filter: 'blur(0px)' }
    : { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
