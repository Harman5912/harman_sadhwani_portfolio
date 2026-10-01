import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { portfolioData } from '../data/portfolio';
import { MagneticButton, PixelScrambleText } from './GlassEffects';

const TYPEWRITER_ROLES = [
  'FOUNDER & CORE DEVELOPER // CROWN PIERCE',
  'FULL-STACK DEVELOPER // AI BUILDER',
  'AGENTIC AI SYSTEMS ARCHITECT',
  'APPLICATION & DEVELOPER TOOLING ENGINEER',
  'RESEARCHER & HACKATHON PODIUM WINNER',
];

type PortraitSortMode = 'y-cascade' | 'x-drift' | 'voxel-matrix' | 'optical-raw';

function PixelSortedPortraitCanvas({
  fallbackSrc,
}: {
  fallbackSrc: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [sortMode, setSortMode] = useState<PortraitSortMode>('y-cascade');
  const [threshold, setThreshold] = useState<number>(0.42);
  const [cursorRel, setCursorRel] = useState<{ x: number; y: number } | null>(
    null
  );
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/pro.png';

    img.onload = () => {
      imgRef.current = img;
      setImageLoaded(true);
    };

    img.onerror = () => {
      const fallback1 = new Image();
      fallback1.crossOrigin = 'anonymous';
      fallback1.src = '/Harman.jpg';
      fallback1.onload = () => {
        imgRef.current = fallback1;
        setImageLoaded(true);
      };
      fallback1.onerror = () => {
        const fallback2 = new Image();
        fallback2.crossOrigin = 'anonymous';
        fallback2.src = fallbackSrc;
        fallback2.onload = () => {
          imgRef.current = fallback2;
          setImageLoaded(true);
        };
      };
    };
  }, [fallbackSrc]);

  useEffect(() => {
    if (!imageLoaded || !imgRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = (canvas.width = 340);
    const H = (canvas.height = 380);
    const img = imgRef.current;

    // Offscreen buffer for sampling portrait pixels
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;
    const offCtx = offscreen.getContext('2d');
    if (!offCtx) return;

    // Fit image centered
    const scale = Math.min(W / img.width, (H - 30) / img.height);
    const drawW = img.width * scale;
    const drawH = img.height * scale;
    const offsetX = (W - drawW) / 2;
    const offsetY = (H - 30 - drawH) / 2;
    offCtx.clearRect(0, 0, W, H);
    offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

    let baseData: ImageData | null = null;
    try {
      baseData = offCtx.getImageData(0, 0, W, H);
    } catch {
      baseData = null;
    }

    let animId: number;
    let tick = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      tick++;

      ctx.clearRect(0, 0, W, H);

      // Draw background quantized golden aura grid
      ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
      for (let gy = 16; gy < H - 20; gy += 16) {
        const barW =
          180 + Math.floor(Math.sin(tick * 0.04 + gy * 0.1) * 60 / 8) * 8;
        ctx.fillRect((W - barW) / 2, gy, barW, 6);
      }

      // Draw crisp portrait base
      ctx.drawImage(offscreen, 0, 0);

      if (!baseData) return;
      const data = baseData.data;
      const colStep = sortMode === 'voxel-matrix' ? 8 : 5;

      // Algorithmic Pixel-Sort Overlay Pass
      for (let x = 0; x < W; x += colStep) {
        const distFromCursor =
          cursorRel !== null ? Math.abs(x - cursorRel.x * W) : 999;
        const isCursorActive = distFromCursor < 56;

        if (sortMode === 'optical-raw' && !isCursorActive) continue;

        // Sample column luminance & find brightest/sorted pixel runs
        for (let y = 18; y < H - 28; y += 14) {
          const idx = (y * W + x) * 4;
          const a = data[idx + 3];
          if (a < 80) continue;

          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          const activeThresh = isCursorActive ? threshold * 0.55 : threshold;

          if (lum > activeThresh) {
            // Deterministic wave so only selected columns drip pixel-sorted ribbons
            const wave = Math.sin(x * 0.19 + y * 0.07 + tick * 0.06);
            if (wave > (isCursorActive ? -0.2 : 0.42)) {
              const streakLen = Math.floor(
                ((lum - activeThresh) * (isCursorActive ? 95 : 52) +
                  Math.sin(tick * 0.08 + x) * 12) /
                  4
              ) * 4;

              if (sortMode === 'y-cascade' || sortMode === 'optical-raw') {
                // Vertical cascading pixel-sort streak
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.88)`;
                ctx.fillRect(x, y, colStep - 1, Math.max(4, streakLen));

                // Golden quantized tip voxel
                ctx.fillStyle =
                  lum > 0.72 ? '#FCF6B5' : '#D4AF37';
                ctx.fillRect(
                  x,
                  y + Math.max(4, streakLen),
                  colStep - 1,
                  colStep - 1
                );
              } else if (sortMode === 'x-drift') {
                // Horizontal pixel-sort drift ribbon
                const dir = y % 28 === 0 ? 1 : -1;
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
                ctx.fillRect(
                  x,
                  y,
                  dir * Math.max(8, streakLen * 1.3),
                  4
                );
                ctx.fillStyle = '#D4AF37';
                ctx.fillRect(
                  x + dir * Math.max(8, streakLen * 1.3),
                  y,
                  5,
                  4
                );
              } else if (sortMode === 'voxel-matrix') {
                // Stepped Voxel Quantization
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, y, colStep - 1, colStep - 1);
                if (lum > 0.65) {
                  ctx.strokeStyle = '#D4AF37';
                  ctx.strokeRect(x, y, colStep - 1, colStep - 1);
                }
              }
            }
          }
        }
      }

      // Bottom Pixel-Sorted Energy Pedestal Bars
      for (let b = 0; b < 32; b++) {
        const bx = 20 + b * 9.5;
        const bh =
          4 +
          Math.floor(
            (Math.sin(tick * 0.09 + b * 0.45) + 1.2) * 7 / 3
          ) *
            3;
        ctx.fillStyle =
          b % 4 === 0
            ? '#12110E'
            : b % 2 === 0
            ? '#D4AF37'
            : '#FCF6B5';
        ctx.fillRect(bx, H - bh - 4, 6, bh);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [imageLoaded, sortMode, threshold, cursorRel]);

  return (
    <div className="w-full max-w-[380px] border-2 border-[#12110e] bg-white shadow-[10px_10px_0px_#d4af37] overflow-hidden">
      {/* Top Pixel-Sort Window Header */}
      <div className="flex items-center justify-between border-b-2 border-[#12110e] bg-[#12110e] px-3.5 py-2 text-[10px] font-mono font-bold text-[#fcf6b5]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 bg-[#d4af37]" />
          <span>PORTRAIT_SORTER.EXE</span>
        </div>
        <span className="text-[#d4af37]">THR:{threshold.toFixed(2)}</span>
      </div>

      {/* Interactive Canvas Stage */}
      <div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setCursorRel({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
          });
        }}
        onMouseLeave={() => setCursorRel(null)}
        className="relative bg-[#f8f5ec] pixel-matrix-bg flex items-center justify-center p-2 cursor-crosshair"
      >
        <canvas
          ref={canvasRef}
          width={340}
          height={380}
          className="h-[340px] w-[306px] sm:h-[370px] sm:w-[332px] block"
        />

        {/* Floating Crown Pierce Pixel Badge */}
        <div className="absolute right-3 top-3 border border-[#12110e] bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-[#12110e] shadow-[3px_3px_0px_#d4af37]">
          👑 CROWN PIERCE // FOUNDER
        </div>
      </div>

      {/* Interactive Pixel-Sort Mode Switcher & Threshold Control */}
      <div className="border-t-2 border-[#12110e] bg-white p-3 space-y-2.5">
        <div className="grid grid-cols-4 gap-1">
          {(
            [
              { id: 'y-cascade', label: 'Y-SORT' },
              { id: 'x-drift', label: 'X-DRIFT' },
              { id: 'voxel-matrix', label: 'VOXEL' },
              { id: 'optical-raw', label: 'HOVER' },
            ] as const
          ).map((m) => {
            const active = sortMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSortMode(m.id)}
                className={`py-1.5 font-mono text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                  active
                    ? 'border-[#12110e] bg-[#12110e] text-[#fcf6b5] shadow-[2px_2px_0px_#d4af37]'
                    : 'border-[#12110e]/30 bg-[#f8f5ec] text-[#12110e] hover:bg-[#fcf6b5]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5 font-mono text-[10px]">
          <label
            htmlFor="portrait-sort-threshold"
            className="font-bold text-[#12110e] uppercase shrink-0"
          >
            SORT_LIMIT:
          </label>
          <input
            id="portrait-sort-threshold"
            type="range"
            min={0.18}
            max={0.82}
            step={0.02}
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-[#b8860b] cursor-pointer"
          />
          <span className="font-bold text-[#b8860b] w-8 text-right">
            {Math.round(threshold * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const { profile } = portfolioData;
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % TYPEWRITER_ROLES.length);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative w-full space-y-5">
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        {/* Left Column: Abstract Pixel-Sorted Typography & Controls */}
        <div className="text-center lg:text-left">
          {/* Top Pixel-Sorted Telemetry Bar */}
          <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 border-2 border-[#12110e] bg-white px-3 py-1 shadow-[4px_4px_0px_#d4af37]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#12110e]">
              █▓▒░ PIXEL-SORTED STAGE
            </span>
            <span className="h-3 w-px bg-[#12110e]/30" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-700">
              ■ {profile.status}
            </span>
          </div>

          {/* Main Name with In-Place Pixel Scramble */}
          <h1 className="font-display mt-4 text-4xl font-black leading-[1.02] tracking-tight sm:text-5xl xl:text-6xl">
            <span className="block text-[#12110e]">
              <PixelScrambleText text="HARMAN" />
            </span>

            <span className="mt-1.5 inline-block border-y-2 border-[#12110e] bg-[#12110e] px-3 py-1 text-[#fcf6b5] shadow-[6px_6px_0px_#d4af37]">
              <PixelScrambleText text="SADHWANI" />
            </span>
          </h1>

          {/* Pixel-Scramble Role Decoder */}
          <div className="mt-4 flex min-h-[2.25rem] items-center justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 border border-[#12110e] bg-[#fcf6b5] px-3 py-1.5 font-mono text-xs font-bold text-[#12110e] shadow-[4px_4px_0px_#12110e]">
              <span className="text-[#b8860b]">►</span>
              <PixelScrambleText
                text={TYPEWRITER_ROLES[roleIdx]}
                triggerOnHover={false}
              />
              <span className="animate-blink inline-block h-3.5 w-2 bg-[#12110e]" />
            </div>
          </div>

          <p className="mx-auto mt-3.5 max-w-xl text-xs sm:text-sm leading-relaxed text-[#12110e]/80 lg:mx-0 font-medium">
            I architect intelligent software, agentic AI ecosystems, interactive
            full-stack web platforms, and developer tools — presented inside a
            steady{' '}
            <span className="font-mono font-bold text-[#b8860b] underline">
              pixel-materializing viewport engine
            </span>
            .
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <MagneticButton strength={0.22}>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="btn-gold sheen px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] inline-flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>█▓ EXPLORE WORK</span>
                <span aria-hidden="true">→</span>
              </button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <a
                href="/Harman_Sadhwani_Resume.pdf"
                download="Harman_Sadhwani_Resume.pdf"
                className="btn-outline px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] inline-flex items-center whitespace-nowrap"
              >
                DOWNLOAD RESUME ↓
              </a>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent('open-ai-agent'))
                }
                className="btn-outline px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] inline-flex items-center whitespace-nowrap cursor-pointer"
              >
                ASK MY AI
              </button>
            </MagneticButton>

            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="btn-outline px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] inline-flex items-center whitespace-nowrap cursor-pointer"
              >
                CONTACT
              </button>
            </MagneticButton>
          </div>

          {/* 4-Cell Pixel-Sorted Quick Readout Matrix */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl mx-auto lg:mx-0">
            {[
              { k: 'FLAGSHIPS', v: 'KEYS.AI · REVIEWBOT', target: 'projects' },
              { k: 'STUDIO', v: 'CROWN PIERCE', target: 'crown-pierce' },
              { k: 'CATALOGUE', v: '125+ BUILDS', target: 'minor-projects' },
              { k: 'SPOTLIGHT', v: 'PRESS ⌘K', target: 'cmd' },
            ].map((cell) => (
              <button
                key={cell.k}
                type="button"
                onClick={() => {
                  if (cell.target === 'cmd') {
                    window.dispatchEvent(
                      new CustomEvent('open-command-palette')
                    );
                  } else {
                    scrollToSection(cell.target);
                  }
                }}
                className="text-left border border-[#12110e] bg-white/90 p-2 shadow-[3px_3px_0px_rgba(212,175,55,0.5)] hover:bg-[#fcf6b5] transition-colors cursor-pointer"
              >
                <span className="block font-mono text-[9px] font-bold text-[#b8860b]">
                  {cell.k}
                </span>
                <span className="block font-mono text-[11px] font-black text-[#12110e] mt-0.5 truncate">
                  {cell.v}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Real-Time Pixel-Sort Portrait Sorter */}
        <div className="relative mx-auto flex flex-col items-center justify-center scale-95 xl:scale-100">
          <PixelSortedPortraitCanvas
            fallbackSrc={profile.fallbackProfileImage}
          />
        </div>
      </div>
    </div>
  );
}
