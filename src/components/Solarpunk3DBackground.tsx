import React, { useEffect, useRef } from 'react';

export type SolarSceneMode = 'astrolabe' | 'lattice' | 'zenith';

interface SortedPixelSegment {
  yOffset: number;
  length: number;
  color: string;
  luminance: number;
  pixelStep: number;
}

interface PixelSortColumn {
  x: number;
  width: number;
  y: number;
  speedY: number;
  threshold: number;
  glitchPhase: number;
  segments: SortedPixelSegment[];
}

// Quantized palette ordered by luminance (from dark obsidian to brilliant white-gold)
const SORTED_PALETTE = [
  { color: 'rgba(18, 17, 14, 0.22)', lum: 0.08 },
  { color: 'rgba(120, 83, 9, 0.28)', lum: 0.25 },
  { color: 'rgba(184, 134, 11, 0.36)', lum: 0.45 },
  { color: 'rgba(217, 119, 6, 0.38)', lum: 0.58 },
  { color: 'rgba(212, 175, 55, 0.48)', lum: 0.74 },
  { color: 'rgba(252, 246, 181, 0.65)', lum: 0.90 },
  { color: 'rgba(255, 255, 255, 0.80)', lum: 1.0 },
];

export default function Solarpunk3DBackground({
  solarBurstActive,
}: {
  solarBurstActive: boolean;
  sceneMode?: SolarSceneMode;
  onChangeSceneMode?: (mode: SolarSceneMode) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef<boolean>(solarBurstActive);

  useEffect(() => {
    burstRef.current = solarBurstActive;
  }, [solarBurstActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const buildSortedSegments = (): SortedPixelSegment[] => {
      const count = 5 + Math.floor(Math.random() * 4);
      const raw: SortedPixelSegment[] = [];
      for (let i = 0; i < count; i++) {
        const pal =
          SORTED_PALETTE[Math.floor(Math.random() * SORTED_PALETTE.length)];
        raw.push({
          yOffset: 0,
          length: 12 + Math.floor(Math.random() * 64),
          color: pal.color,
          luminance: pal.lum,
          pixelStep: 4 + Math.floor(Math.random() * 3) * 2,
        });
      }
      // Algorithmically sort segments by luminance (authentic Pixel Sort)
      raw.sort((a, b) => a.luminance - b.luminance);

      let cursorY = 0;
      for (const seg of raw) {
        seg.yOffset = cursorY;
        cursorY += seg.length + 2;
      }
      return raw;
    };

    const initColumns = (): PixelSortColumn[] => {
      const colWidth = width < 768 ? 14 : 10;
      const numCols = Math.ceil(width / colWidth);
      const cols: PixelSortColumn[] = [];

      for (let i = 0; i < numCols; i++) {
        // Leave breathable negative space columns so it feels high-fashion & architectural
        if (Math.random() < 0.42) continue;
        cols.push({
          x: i * colWidth,
          width: colWidth - 2,
          y: Math.random() * height * 1.5 - height * 0.5,
          speedY: 0.65 + Math.random() * 1.85,
          threshold: 0.25 + Math.random() * 0.65,
          glitchPhase: Math.random() * Math.PI * 2,
          segments: buildSortedSegments(),
        });
      }
      return cols;
    };

    let columns = initColumns();
    let mouseX = -9999;
    let mouseY = -9999;
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = initColumns();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let tickCount = 0;

    const render = () => {
      animationFrameId = requestAnimationFrame(render);
      tickCount++;

      ctx.clearRect(0, 0, width, height);

      const speedMult = burstRef.current ? 3.4 : 1.0;

      // Occasional horizontal abstract pixel-sort scanline sweep
      const scanY = ((tickCount * 2.2) % (height + 240)) - 120;
      ctx.fillStyle = 'rgba(212, 175, 55, 0.06)';
      ctx.fillRect(0, Math.floor(scanY / 6) * 6, width, 6);

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];

        if (!prefersReducedMotion) {
          col.y += col.speedY * speedMult;

          const totalLen =
            col.segments[col.segments.length - 1]?.yOffset +
              col.segments[col.segments.length - 1]?.length || 220;

          if (col.y > height + 80) {
            col.y = -totalLen - Math.random() * 140;
          }
        }

        // Interactive Cursor Pixel-Sort Displacement:
        // When cursor is near a column, stretch and quantize its pixel blocks!
        const distX = Math.abs(col.x - mouseX);
        const cursorInfluence = distX < 130 ? (130 - distX) / 130 : 0;
        const stretchFactor = 1 + cursorInfluence * 1.65;
        const xJitter =
          cursorInfluence > 0.35
            ? Math.round(Math.sin(tickCount * 0.3 + i) * 4)
            : 0;

        for (let s = 0; s < col.segments.length; s++) {
          const seg = col.segments[s];
          const drawY = Math.floor(
            (col.y + seg.yOffset * stretchFactor) / 4
          ) * 4;
          const drawH = Math.floor((seg.length * stretchFactor) / 4) * 4;

          if (drawY + drawH < -20 || drawY > height + 20) continue;

          ctx.fillStyle = seg.color;

          // Draw sorted vertical streak + quantized pixel head/tail blocks
          ctx.fillRect(col.x + xJitter, drawY, col.width, drawH);

          // Quantized bright pixel cap at the leading edge of high-luminance segments
          if (seg.luminance >= 0.74) {
            ctx.fillStyle = 'rgba(212, 175, 55, 0.85)';
            ctx.fillRect(
              col.x + xJitter,
              drawY + drawH,
              col.width,
              col.width
            );
            ctx.fillStyle = 'rgba(18, 17, 14, 0.55)';
            ctx.fillRect(
              col.x + xJitter,
              drawY + drawH + col.width + 2,
              col.width,
              3
            );
          }
        }
      }

      // Cursor-centered horizontal pixel-sort slice bar
      if (mouseX > 0 && mouseY > 0 && !prefersReducedMotion) {
        const snapY = Math.floor(mouseY / 6) * 6;
        for (let b = -6; b <= 6; b++) {
          if (b === 0) continue;
          const sliceW = 14 + Math.abs(b) * 8;
          const offsetX =
            Math.floor(Math.sin(tickCount * 0.2 + b) * 28 / 4) * 4;
          ctx.fillStyle =
            b % 2 === 0
              ? 'rgba(212, 175, 55, 0.32)'
              : 'rgba(18, 17, 14, 0.18)';
          ctx.fillRect(
            mouseX + offsetX - sliceW / 2,
            snapY + b * 6,
            sliceW,
            3
          );
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
      aria-hidden="true"
    />
  );
}
