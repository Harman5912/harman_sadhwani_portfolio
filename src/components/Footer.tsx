import React from 'react';
import { portfolioData } from '../data/portfolio';
import { PixelScrambleText } from './GlassEffects';

export default function Footer() {
  const { profile } = portfolioData;
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative z-10 w-full border-t-2 border-[#12110e] bg-white"
    >
      {/* Top Animated Pixel-Sort Luminance Ribbon */}
      <div className="h-2 w-full pixel-sort-bar-h border-b-2 border-[#12110e]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        {/* Left: Crown Pierce Logo + Harman.dev */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group flex items-center gap-3 cursor-pointer"
        >
          <span className="relative flex h-10 w-10 items-center justify-center border-2 border-[#12110e] bg-[#f8f5ec] shadow-[3px_3px_0px_#d4af37] transition-transform group-hover:-translate-y-0.5">
            <img
              src="/logo.png"
              alt="Crown Pierce logo"
              width={32}
              height={32}
              referrerPolicy="no-referrer"
              className="h-7 w-7 object-contain"
            />
          </span>
          <span className="font-display text-sm font-black uppercase tracking-[0.25em] text-[#12110e]">
            <PixelScrambleText text="HARMAN.DEV" />
          </span>
        </button>

        {/* Center: Signature Tagline & Copyright */}
        <div className="text-center space-y-1">
          <p className="text-xs tracking-wide text-[#12110e]/75">
            © {year} {profile.name} · Crafted with{' '}
            <span className="text-[#b8860b] font-bold">gold</span>, code &amp;
            curiosity
          </p>
          <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#b8860b]">
            {profile.tagline}
          </p>
        </div>

        {/* Right: Quantized Voxel Back-to-Top Launcher */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-11 w-11 items-center justify-center border-2 border-[#12110e] bg-[#fcf6b5] text-[#12110e] shadow-[4px_4px_0px_#12110e] transition-all hover:-translate-y-1 hover:bg-[#d4af37] cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              d="M12 19V5m0 0-6 6m6-6 6 6"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
