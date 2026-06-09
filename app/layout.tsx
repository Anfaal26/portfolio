import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import ParticleField from '@/components/ParticleField'
import GlowCursor from '@/components/GlowCursor'
import NoiseOverlay from '@/components/NoiseOverlay'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  preload: true,
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  preload: true,
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anfaal26.vercel.app'),
  title: 'Mohammad Anfaal Hossain — AI Engineer & Full-Stack Developer',
  description: "Portfolio of Mohammad Anfaal Hossain, a final-year CS student from Malaysia at Taylor's University specialising in AI/ML, LLM applications, and full-stack development. Open to internships in 2026.",
  keywords: ['AI engineer Malaysia','machine learning portfolio','LLM developer','computer vision','Next.js developer Malaysia','internship 2026','deep reinforcement learning','RAG',"Taylor's University"],
  openGraph: {
    title: 'Mohammad Anfaal Hossain — AI Engineer & Full-Stack Developer',
    description: "Portfolio of Mohammad Anfaal Hossain, CS student at Taylor's University Malaysia.",
    url: 'https://anfaal.dev',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'en_MY',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={spaceGrotesk.variable + ' ' + inter.variable}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#8AAFC8] focus:text-[#06061A] focus:px-4 focus:py-2 focus:rounded focus:text-sm"
        >
          Skip to content
        </a>
        <div className="ambient-orbs" aria-hidden="true">
          <div className="orb-tl" />
          <div className="orb-br" />
        </div>
        <ParticleField />
        <GlowCursor />
        <NoiseOverlay />
        <SmoothScroll>
          <main id="main-content">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  )
}
