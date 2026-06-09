'use client'
import { useEffect, useRef } from 'react'

interface Particle {
  ox: number; oy: number
  x: number; y: number
  vx: number; vy: number
  size: number
  baseAlpha: number
  hue: number
}

const REPEL_R     = 88
const REPEL_FORCE = 95
const SPRING_K    = 0.052
const DAMPING     = 0.75
const AMBIENT_AMP = 1.4
const AMBIENT_SPD = 0.003

/* Sample the portrait image and return particle positions */
function buildParticlesFromImage(
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
): Particle[] {
  // Off-screen canvas to read pixel data
  const offscreen = document.createElement('canvas')
  const SAMPLE_W = 220
  const SAMPLE_H = 280
  offscreen.width  = SAMPLE_W
  offscreen.height = SAMPLE_H
  const octx = offscreen.getContext('2d')!
  octx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H)
  const { data } = octx.getImageData(0, 0, SAMPLE_W, SAMPLE_H)

  // Map sampled grid into canvas space — portrait sits centre-right
  const scaleX  = (canvasW * 0.88) / SAMPLE_W
  const scaleY  = (canvasH * 0.92) / SAMPLE_H
  const offsetX = canvasW * 0.06
  const offsetY = canvasH * 0.04

  const pts: Particle[] = []
  const step = 4 // sample every 4px

  for (let sy = 0; sy < SAMPLE_H; sy += step) {
    for (let sx = 0; sx < SAMPLE_W; sx += step) {
      const i = (sy * SAMPLE_W + sx) * 4
      const r = data[i], g = data[i + 1], b = data[i + 2]
      // Perceived luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b
      if (lum < 28) continue // skip dark background pixels

      const px = offsetX + sx * scaleX
      const py = offsetY + sy * scaleY

      // Normalised distance from canvas centre for colour/alpha variation
      const nx = (px - canvasW / 2) / (canvasW / 2)
      const ny = (py - canvasH / 2) / (canvasH / 2)
      const d  = Math.sqrt(nx * nx + ny * ny)

      // Brighter pixels → slightly more opaque
      const brightnessAlpha = Math.min(lum / 255, 1) * 0.45
      const baseAlpha = 0.18 + brightnessAlpha
      const hue  = 200 + d * 14        // cool blue → slightly warmer at edges
      const size = Math.max(0.5, 1.9 - d * 0.7)

      pts.push({ ox: px, oy: py, x: px, y: py, vx: 0, vy: 0, size, baseAlpha, hue })
    }
  }
  return pts
}

/* Fallback: concentric rings (used while image loads) */
function buildFallbackParticles(w: number, h: number): Particle[] {
  const pts: Particle[] = []
  const cx = w / 2, cy = h * 0.50
  const maxR = Math.min(w, h) * 0.42
  for (let ring = 1; ring <= 22; ring++) {
    const r   = (ring / 22) * maxR
    const gap = 5.5
    const count = Math.floor((2 * Math.PI * r) / gap)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const wave  = Math.sin(angle * 3 + ring * 0.9) * r * 0.018
      const px = cx + (r + wave) * Math.cos(angle)
      const py = cy + (r + wave) * 1.28 * Math.sin(angle)
      const nx = (px - cx) / (maxR * 1.02)
      const ny = (py - cy) / (maxR * 1.28 * 1.02)
      if (nx * nx + ny * ny > 1) continue
      const d  = Math.sqrt(nx * nx + ny * ny)
      pts.push({ ox: px, oy: py, x: px, y: py, vx: 0, vy: 0,
        size: Math.max(0.55, 2.0 - d * 1.3), baseAlpha: 0.2 + (1 - d) * 0.35, hue: 200 + d * 12 })
    }
  }
  return pts
}

export default function PortraitParticles({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let tick = 0
    const mouse = { x: -9999, y: -9999 }

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      return { w, h }
    }

    let { w, h } = setSize()
    let particles = buildFallbackParticles(w, h)

    // Load the portrait and rebuild particles
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      particles = buildParticlesFromImage(img, w, h)
    }
    img.src = '/portrait.png'

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      tick++

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Ambient breathing
        const ax = Math.sin(tick * AMBIENT_SPD + i * 0.31) * AMBIENT_AMP
        const ay = Math.cos(tick * AMBIENT_SPD * 1.25 + i * 0.22) * AMBIENT_AMP * 0.55

        // Cursor repulsion
        const dx   = p.x - mouse.x
        const dy   = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_R && dist > 0) {
          const force = Math.pow(1 - dist / REPEL_R, 2) * REPEL_FORCE
          p.vx += (dx / dist) * force * 0.2
          p.vy += (dy / dist) * force * 0.2
        }

        // Spring back to origin
        p.vx += (p.ox + ax - p.x) * SPRING_K
        p.vy += (p.oy + ay - p.y) * SPRING_K
        p.vx *= DAMPING
        p.vy *= DAMPING
        p.x  += p.vx
        p.y  += p.vy

        // Velocity glow
        const speed     = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        const glowBoost = Math.min(speed * 0.05, 0.28)
        const alpha     = Math.min(0.92, p.baseAlpha + glowBoost)
        const size      = p.size + speed * 0.07

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 44%, 68%, ${alpha})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const handleMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    const ro = new ResizeObserver(() => {
      const dims = setSize()
      w = dims.w; h = dims.h
      // Rebuild from image if loaded, else fallback
      if (img.complete && img.naturalWidth > 0) {
        particles = buildParticlesFromImage(img, w, h)
      } else {
        particles = buildFallbackParticles(w, h)
      }
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
