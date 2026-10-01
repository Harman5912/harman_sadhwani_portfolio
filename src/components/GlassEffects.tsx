import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValue,
  useTransform,
} from 'motion/react';
import { GoldenSunIcon } from './GoldenSunMotif';

// Reusable Pixel-Sort Text Decoder Hook
const PIXEL_GLYPHS = '█▓▒░▄▀■□▪▫01';

export function PixelScrambleText({
  text,
  className = '',
  triggerOnHover = true,
}: {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}) {
  const [display, setDisplay] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return PIXEL_GLYPHS[Math.floor(Math.random() * PIXEL_GLYPHS.length)];
          })
          .join('')
      );
      iteration += Math.max(0.55, text.length / 14);
      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 22);
  };

  useEffect(() => {
    runScramble();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span
      onMouseEnter={triggerOnHover ? runScramble : undefined}
      className={className}
    >
      {display}
    </span>
  );
}

export function ScrollProgressRibbon() {
  const progressValue = useMotionValue(0);
  const scaleX = useSpring(progressValue, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onStageChange = (e: Event) => {
      const custom = e as CustomEvent<{
        index: number;
        id: string;
        progress: number;
      }>;
      if (custom.detail && typeof custom.detail.progress === 'number') {
        progressValue.set(custom.detail.progress);
      }
    };
    window.addEventListener('steady-stage-change', onStageChange);
    return () =>
      window.removeEventListener('steady-stage-change', onStageChange);
  }, [progressValue]);

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 z-[70] h-1.5 pixel-sort-bar-h border-b border-[#12110e]"
      aria-hidden="true"
    />
  );
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.24,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 22, mass: 0.5 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

const MARQUEE_ITEMS = [
  '█▓▒░ PIXEL-SORTED ARCHITECTURE',
  'FULL-STACK DEVELOPER',
  'AGENTIC AI BUILDER',
  'CROWN PIERCE FOUNDER',
  'KEYS.AI // 01',
  'REVIEWBOT // 02',
  'CROWN CODE // 03',
  '125+ VERIFIED BUILDS',
];

export function KineticEditorialMarquee() {
  return (
    <div
      className="relative z-10 overflow-hidden border-y-2 border-[#12110e] bg-white py-2 select-none shadow-[0_4px_0_rgba(212,175,55,0.28)]"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[marquee-scroll_28s_linear_infinite] hover:[animation-play-state:paused] items-center gap-6">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => {
          const isInverted = idx % 2 === 1;
          return (
            <div key={idx} className="flex items-center gap-4">
              <span
                className={`font-mono text-xs font-black tracking-[0.18em] uppercase px-2.5 py-0.5 ${
                  isInverted
                    ? 'bg-[#12110e] text-[#fcf6b5] shadow-[2px_2px_0px_#d4af37]'
                    : 'bg-[#fcf6b5] text-[#12110e] border border-[#12110e]'
                }`}
              >
                {item}
              </span>
              <GoldenSunIcon size={14} spinning />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Smooth GPU-Composited In-Place Reveal (Zero vertical translation, zero SVG filter stutter)
export function GlassSectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.35,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Smooth In-Place Pixelating Switcher Wrapper: GPU-accelerated cross-dissolve + subtle voxel shimmer
const VOXEL_CELLS = Array.from({ length: 24 }, (_, i) => i);

export function PixelTransitionPanel({
  activeKey,
  children,
  className = '',
}: {
  activeKey: string | number;
  children: React.ReactNode;
  className?: string;
}) {
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    setBursting(true);
    const t = setTimeout(() => setBursting(false), 260);
    return () => clearTimeout(t);
  }, [activeKey]);

  return (
    <div className={`relative w-full ${className}`}>
      <motion.div
        key={activeKey}
        initial={{ opacity: 0.15, filter: 'blur(2px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full will-change-[opacity,filter]"
      >
        {children}
      </motion.div>

      {/* Smooth Voxel Shimmer Overlay during in-place state change */}
      <AnimatePresence>
        {bursting && (
          <motion.div
            initial={{ opacity: 0.45 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute inset-0 z-30 grid grid-cols-6 grid-rows-4 overflow-hidden"
            aria-hidden="true"
          >
            {VOXEL_CELLS.map((cellIdx) => {
              const isGold = (cellIdx * 7) % 3 === 0;
              const isDark = (cellIdx * 11) % 5 === 0;
              return (
                <motion.div
                  key={cellIdx}
                  initial={{ opacity: 0.55, scale: 0.92 }}
                  animate={{ opacity: 0, scale: 1 }}
                  transition={{
                    duration: 0.24,
                    delay: ((cellIdx * 3) % 8) * 0.014,
                    ease: 'easeOut',
                  }}
                  style={{
                    backgroundColor: isGold
                      ? 'rgba(212, 175, 55, 0.28)'
                      : isDark
                      ? 'rgba(18, 17, 14, 0.22)'
                      : 'rgba(252, 246, 181, 0.32)',
                  }}
                />
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Interactive3DTiltCard({
  children,
  className = '',
  intensity = 4,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 220, damping: 24, mass: 0.5 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [intensity, -intensity]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-intensity, intensity]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX);
    y.set(relY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
