import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function GoldenSunIcon({
  size = 24,
  className = '',
  spinning = false,
}: {
  size?: number;
  className?: string;
  spinning?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${spinning ? 'animate-solar-rotate' : ''} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="22" y="2" width="4" height="44" fill="#D4AF37" />
      <rect x="18" y="6" width="4" height="36" fill="#FCF6B5" />
      <rect x="26" y="6" width="4" height="36" fill="#B8860B" />
      <rect x="14" y="10" width="4" height="28" fill="#D4AF37" />
      <rect x="30" y="10" width="4" height="28" fill="#12110E" />
      <rect x="10" y="16" width="4" height="16" fill="#B8860B" />
      <rect x="34" y="16" width="4" height="16" fill="#D4AF37" />
      <rect x="2" y="22" width="44" height="4" fill="#12110E" />
      <rect x="6" y="18" width="36" height="4" fill="#D4AF37" />
      <rect x="6" y="26" width="36" height="4" fill="#FCF6B5" />
      <rect
        x="20"
        y="20"
        width="8"
        height="8"
        fill="#FFFFFF"
        stroke="#12110E"
        strokeWidth="2"
      />
    </svg>
  );
}

const HISTOGRAM_HEIGHTS = [
  24, 48, 72, 92, 64, 42, 88, 100, 72, 48, 60, 84, 96, 56, 70, 92, 62, 82,
];

export function GoldDiamondDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-end justify-center gap-[3px] h-4 ${className}`}
      aria-hidden="true"
    >
      {HISTOGRAM_HEIGHTS.map((h, idx) => (
        <span
          key={idx}
          style={{
            height: `${h}%`,
            backgroundColor:
              idx % 5 === 0
                ? '#12110e'
                : idx % 3 === 0
                ? '#b8860b'
                : idx % 2 === 0
                ? '#d4af37'
                : '#fcf6b5',
          }}
          className="w-1.5 shrink-0 border-t border-[#12110e]"
        />
      ))}
    </div>
  );
}

export function LuxurySectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
  tone = 'dark',
  className = '',
}: {
  kicker: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: 'dark' | 'light';
  className?: string;
}) {
  const isCenter = align === 'center';
  const isLight = tone === 'light';

  return (
    <div
      className={`relative z-10 ${
        isCenter ? 'text-center' : 'text-left'
      } ${className}`}
    >
      <motion.div
        className={`inline-flex items-center gap-2 border border-[#12110e] bg-white px-2.5 py-0.5 shadow-[3px_3px_0px_#d4af37] ${
          isCenter ? 'mx-auto' : ''
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <span className="font-mono text-[10px] font-bold text-[#12110e]">
          █▓▒░
        </span>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#b8860b]">
          {kicker}
        </span>
        <span className="font-mono text-[10px] font-bold text-[#d4af37]">
          ░▒▓█
        </span>
      </motion.div>

      <motion.h2
        className={`font-display mt-2 text-2xl font-black leading-[1.08] tracking-tight sm:text-3xl md:text-4xl ${
          isLight ? 'text-white' : 'text-[#12110e]'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'linear' }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={`mt-1.5 max-w-2xl text-xs sm:text-sm leading-relaxed ${
            isLight ? 'text-white/75' : 'text-[#12110e]/75'
          } ${isCenter ? 'mx-auto' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {subtitle}
        </motion.p>
      )}

      <GoldDiamondDivider
        className={`mt-2.5 max-w-xs ${isCenter ? 'mx-auto' : ''}`}
      />
    </div>
  );
}

export function SolarSectionDivider({ label }: { label?: string }) {
  return (
    <div className="max-w-7xl mx-auto px-5 md:px-8 py-2" aria-hidden="true">
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 pixel-sort-bar-h border-y border-[#12110e]/30" />
        <div className="flex items-center gap-2 border border-[#12110e] bg-white px-3 py-0.5 shadow-[2px_2px_0px_#12110e]">
          <GoldenSunIcon size={14} spinning />
          {label && (
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-[#12110e] uppercase">
              {label}
            </span>
          )}
        </div>
        <div className="h-2 flex-1 pixel-sort-bar-h border-y border-[#12110e]/30" />
      </div>
    </div>
  );
}

export function SolarAtmosphere({
  solarBurstActive,
}: {
  solarBurstActive: boolean;
}) {
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        setCursorPos({
          x: Math.floor(e.clientX / 8) * 8,
          y: Math.floor(e.clientY / 8) * 8,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Global SVG Pixelation & Pixel-Sort Filter Definitions for Disappearing / Appearing Stages */}
      <svg className="pointer-events-none fixed h-0 w-0" aria-hidden="true">
        <defs>
          {[
            { id: 'pixelate-stage-1', size: 4, radius: 2 },
            { id: 'pixelate-stage-2', size: 8, radius: 4 },
            { id: 'pixelate-stage-3', size: 14, radius: 7 },
            { id: 'pixelate-stage-4', size: 22, radius: 11 },
            { id: 'pixelate-stage-5', size: 34, radius: 17 },
            { id: 'pixelate-stage-6', size: 52, radius: 26 },
          ].map((f) => (
            <filter
              key={f.id}
              id={f.id}
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feFlood x="1" y="1" height="2" width="2" />
              <feComposite width={f.size} height={f.size} />
              <feTile result="tile" />
              <feComposite in="SourceGraphic" in2="tile" operator="in" />
              <feMorphology operator="dilate" radius={f.radius} />
            </filter>
          ))}
        </defs>
      </svg>

      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {isDesktop && (
          <div
            className="fixed transition-transform duration-75"
            style={{
              transform: `translate3d(${cursorPos.x - 48}px, ${
                cursorPos.y - 48
              }px, 0)`,
            }}
          >
            <div className="h-24 w-24 border border-[#d4af37]/35 bg-[#d4af37]/[0.04] flex flex-col justify-between p-1">
              <div className="flex justify-between">
                <span className="h-1.5 w-1.5 bg-[#b8860b]" />
                <span className="font-mono text-[8px] text-[#b8860b]/70">
                  {cursorPos.x}:{cursorPos.y}
                </span>
                <span className="h-1.5 w-1.5 bg-[#12110e]" />
              </div>
              <div className="h-[2px] w-full pixel-sort-bar-h opacity-55" />
              <div className="flex justify-between">
                <span className="h-1.5 w-1.5 bg-[#12110e]" />
                <span className="h-1.5 w-1.5 bg-[#b8860b]" />
              </div>
            </div>
          </div>
        )}

        {solarBurstActive && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#12110e]/30 backdrop-blur-xs transition-opacity duration-300 z-50">
            <div className="bg-white border-2 border-[#12110e] px-6 py-5 shadow-[8px_8px_0px_#d4af37] flex items-center gap-4">
              <GoldenSunIcon size={36} spinning />
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#b8860b]">
                  █▓▒░ PIXEL-SORT OVERDRIVE ACTIVE ░▒▓█
                </p>
                <p className="font-display text-lg font-black text-[#12110e]">
                  Maximum Luminance Sorting Engaged
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
