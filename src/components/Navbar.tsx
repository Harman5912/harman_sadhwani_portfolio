import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PixelScrambleText } from './GlassEffects';

const navItems = [
  { label: 'About', id: 'about', code: '01' },
  { label: 'Skills', id: 'skills', code: '02' },
  { label: 'Keys.AI', id: 'projects', code: '03A' },
  { label: 'ReviewBOT', id: 'reviewbot', code: '03B' },
  { label: 'Crown', id: 'crown-pierce', code: '03C' },
  { label: 'Minor Projects', id: 'minor-projects', code: '04' },
  { label: 'Certificates', id: 'certificates', code: '05' },
  { label: 'Resume', id: 'resume', code: '06' },
  { label: 'AI Agent', id: 'ai-agent', code: '07' },
  { label: 'Contact', id: 'contact', code: '08' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onStageChange = (e: Event) => {
      const custom = e as CustomEvent<{
        index: number;
        id: string;
        progress: number;
      }>;
      if (custom.detail) {
        setActiveId(custom.detail.id);
        setScrolled(custom.detail.index > 0);
      }
    };
    window.addEventListener('steady-stage-change', onStageChange);
    return () =>
      window.removeEventListener('steady-stage-change', onStageChange);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    if (id === 'ai-agent') {
      window.dispatchEvent(new CustomEvent('open-ai-agent'));
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 max-w-dvw overflow-hidden transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 border-b-2 border-[#12110e] shadow-[0_3px_0_rgba(212,175,55,0.35)] backdrop-blur-xl'
            : 'bg-[#f8f5ec]/90 backdrop-blur-md border-b-2 border-[#12110e]'
        }`}
      >
        <nav
          className="mx-auto flex w-full max-w-7xl items-center justify-between px-3 h-11 sm:h-13 md:px-6 overflow-hidden"
          aria-label="Primary Navigation"
        >
          {/* Zone 1: Pixel-Sorted Brand Identity */}
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            aria-label="Back to top — Harman Sadhwani"
            className="group relative flex items-center gap-2 cursor-pointer shrink-0 min-w-0"
          >
            <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border border-[#12110e] bg-white shadow-[2px_2px_0px_#d4af37] shrink-0">
              <img
                src="/logo.png"
                alt="Crown Pierce logo"
                width={22}
                height={22}
                referrerPolicy="no-referrer"
                className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
              />
            </span>
            <div className="text-left truncate">
              <span className="block font-display text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] text-[#12110e] whitespace-nowrap">
                <PixelScrambleText text="HARMAN.DEV" />
              </span>
              <span className="hidden sm:block font-mono text-[8px] font-bold tracking-[0.14em] text-[#b8860b]">
                █▓▒░ STEADY_VIEWPORT
              </span>
            </div>
          </button>

          {/* Zone 2: Quantized Pixel-Sorted Stage Matrix */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id} className="relative">
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#12110e] text-[#fcf6b5] shadow-[2px_2px_0px_#d4af37]'
                        : 'text-[#12110e]/75 hover:bg-[#fcf6b5] hover:text-[#12110e]'
                    }`}
                  >
                    <span className="text-[8px] text-[#d4af37] mr-0.5">
                      {item.code}/
                    </span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Zone 3: Command Trigger + Resume CTA + Mobile Menu */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent('open-command-palette'))
              }
              title="Open Command Matrix (⌘K)"
              className="flex items-center gap-1 border border-[#12110e] bg-white px-2 py-1 font-mono text-[10px] font-bold text-[#12110e] shadow-[2px_2px_0px_#d4af37] hover:bg-[#fcf6b5] cursor-pointer"
            >
              <span>⌘K</span>
            </button>

            <a
              href="/Harman_Sadhwani_Resume.pdf"
              download="Harman_Sadhwani_Resume.pdf"
              className="hidden sm:inline-flex btn-gold sheen px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
            >
              Resume ↓
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center border border-[#12110e] bg-white text-[#12110e] shadow-[2px_2px_0px_#d4af37] xl:hidden cursor-pointer"
            >
              <span className="font-mono text-xs font-bold">
                {mobileOpen ? '✕' : '≡'}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile / Compact Quantized Drawer (Strictly bounded inside viewport) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-2 top-12 z-50 max-h-[78dvh] overflow-y-auto border-2 border-[#12110e] bg-white/95 p-3 shadow-[6px_6px_0_#d4af37] backdrop-blur-xl xl:hidden"
          >
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full border border-[#12110e] px-2 py-1.5 text-left font-mono text-[10px] font-bold uppercase truncate cursor-pointer ${
                      activeId === item.id
                        ? 'bg-[#12110e] text-[#fcf6b5]'
                        : 'bg-[#f8f5ec] text-[#12110e]'
                    }`}
                  >
                    <span className="text-[#b8860b] mr-1">{item.code}/</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
