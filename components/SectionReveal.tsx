'use client'
import { useRef, useEffect, useState } from 'react'

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
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Skip animation for reduced-motion users
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      // threshold:0 = fire the moment even 1px enters the viewport
      { threshold: 0, rootMargin: '0px 0px -30px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const dx = direction === 'left' ? '-18px' : '0px'
  const dy = direction === 'up'   ? '22px'  : '0px'

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:   visible ? 1 : 0,
        transform: visible
          ? 'translate(0, 0)'
          : `translate(${dx}, ${dy})`,
        filter:    visible ? 'none' : 'blur(3px)',
        // No transition while invisible — prevents initial flash
        // Transition fires the moment 'visible' flips to true
        transition: visible
          ? `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s, filter 0.5s ease ${delay}s`
          : 'none',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
