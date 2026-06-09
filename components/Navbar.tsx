'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setMenuOpen(false);
  }, [prefersReducedMotion]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    setMenuOpen(false);
  }, [prefersReducedMotion]);

  return (
    <>
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-[100] h-16 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-xl bg-[var(--glass)] border-b border-[var(--bg-border)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">

          {/* Monogram */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="w-9 h-9 border border-[var(--card-border)] rounded-lg flex items-center justify-center text-[var(--accent)] font-grotesk font-bold text-sm cursor-pointer select-none transition-all duration-200 hover:border-[var(--accent)] hover:shadow-[0_0_12px_var(--accent-glow)]"
          >
            AN
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, id }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={[
                    'relative text-[11px] font-grotesk font-medium tracking-[0.1em] uppercase transition-colors duration-200 cursor-pointer',
                    isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  ].join(' ')}
                >
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => scrollToSection('contact')}
              className="border border-[var(--accent)] text-[var(--accent)] text-[11px] font-grotesk font-medium px-4 py-1.5 rounded-md tracking-[0.1em] uppercase cursor-pointer transition-all duration-200 hover:bg-[var(--accent-glow)]"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[101] relative cursor-pointer"
          >
            <span className={['block w-5 h-px bg-[var(--text-primary)] transition-all duration-300 origin-center', menuOpen ? 'rotate-45 translate-y-[6px]' : ''].join(' ')} />
            <span className={['block w-5 h-px bg-[var(--text-primary)] transition-all duration-300', menuOpen ? 'opacity-0 scale-x-0' : ''].join(' ')} />
            <span className={['block w-5 h-px bg-[var(--text-primary)] transition-all duration-300 origin-center', menuOpen ? '-rotate-45 -translate-y-[6px]' : ''].join(' ')} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 bg-[var(--bg-void)] z-[99] flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map(({ label, id }, index) => (
              <motion.button
                key={id}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.05 * index, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => scrollToSection(id)}
                className={[
                  'text-4xl font-grotesk font-semibold transition-colors duration-200 cursor-pointer',
                  activeSection === id ? 'text-[var(--accent)]' : 'text-[var(--text-primary)] hover:text-[var(--accent)]',
                ].join(' ')}
              >
                {label}
              </motion.button>
            ))}

            <motion.button
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.05 * NAV_LINKS.length, ease: [0.23, 1, 0.32, 1] }}
              onClick={() => scrollToSection('contact')}
              className="mt-4 border border-[var(--accent)] text-[var(--accent)] text-sm font-grotesk font-medium px-8 py-3 rounded-md tracking-[0.1em] uppercase hover:bg-[var(--accent-glow)] transition-all duration-200 cursor-pointer"
            >
              Hire Me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
