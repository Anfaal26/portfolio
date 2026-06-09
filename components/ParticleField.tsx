'use client'
import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleField() {
  const [engineReady, setEngineReady] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isMobile = window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) < 4
    if (isMobile) { setDisabled(true); return }
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setEngineReady(true))
  }, [])

  if (disabled || !engineReady) return null

  return (
    <Particles
      id="tsparticles"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      options={{
        background: { color: { value: 'transparent' } },
        fpsLimit: 60,
        interactivity: { events: { resize: { enable: true } } },
        particles: {
          color: { value: ['#E8E8F0', '#C8D0D8'] },
          links: { enable: false },
          move: {
            enable: true,
            speed: 0.28,
            direction: 'none',
            random: true,
            straight: false,
            outModes: { default: 'out' },
          },
          number: { density: { enable: true, width: 1000 }, value: 55 },
          opacity: { value: { min: 0.05, max: 0.22 } },
          shape: { type: 'circle' },
          size: { value: { min: 0.4, max: 1.2 } },
        },
        detectRetina: true,
      }}
    />
  )
}
