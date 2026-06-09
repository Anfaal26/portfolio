'use client'
import { useEffect, useRef, useState } from 'react'

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const isHoveringRef = useRef(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      isHoveringRef.current = !!target.closest('a, button, [role="button"], input, textarea, select')
    }

    let raf: number
    const lerp = (a: number, b: number, n: number) => a + (b - a) * n
    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.07)
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.07)
      if (cursorRef.current) {
        const size = isHoveringRef.current ? 260 : 180
        const half = size / 2
        cursorRef.current.style.transform = `translate(${currentPos.current.x - half}px, ${currentPos.current.y - half}px)`
        cursorRef.current.style.width = `${size}px`
        cursorRef.current.style.height = `${size}px`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  if (isTouchDevice) return null
  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: 'none',
        borderRadius: '50%',
        transition: 'width 0.35s ease, height 0.35s ease',
        background: 'radial-gradient(circle, rgba(138,175,200,0.085) 0%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}
