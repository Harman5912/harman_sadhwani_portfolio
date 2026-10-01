import React, { useState, useEffect, useRef, useCallback } from 'react';

export interface ViewportStageConfig {
  id: string;
  code: string;
  label: string;
  render: () => React.ReactNode;
}

// 4x4 Ordered Bayer Matrix (normalized 0..15 / 16) for authentic pixel-by-pixel disappearance & appearance
const BAYER_4X4 = [
  [0 / 16, 8 / 16, 2 / 16, 10 / 16],
  [12 / 16, 4 / 16, 14 / 16, 6 / 16],
  [3 / 16, 11 / 16, 1 / 16, 9 / 16],
  [15 / 16, 7 / 16, 13 / 16, 5 / 16],
];

const TRANSITION_DURATION_MS = 640;

export default function PixelStageViewport({
  stages,
}: {
  stages: ViewportStageConfig[];
}) {
  const maxIndex = stages.length - 1;

  // Displayed stage index (swaps at the exact midpoint t = 0.5 of the pixelation transition)
  const [displayedIdx, setDisplayedIdx] = useState(0);
  // Active indicator index (updates immediately when transition starts so UI nav feels instant)
  const [activeIdx, setActiveIdx] = useState(0);

  // Universal Viewport Auto-Fit State (handles Portrait, Landscape, 4K Android TV, Desktop, Mobile, & Round Screens)
  const [viewportMetrics, setViewportMetrics] = useState<{
    vw: number;
    vh: number;
    availW: number;
    availH: number;
    topOffset: number;
    designWidth: number;
    isPortrait: boolean;
    scale: number;
  }>({
    vw: typeof window !== 'undefined' ? window.innerWidth : 1280,
    vh: typeof window !== 'undefined' ? window.innerHeight : 800,
    availW: 1140,
    availH: 660,
    topOffset: 56,
    designWidth: 1200,
    isPortrait: false,
    scale: 1,
  });

  const stageContentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasSizeRef = useRef({ w: 0, h: 0 });

  // Strict state refs for 1-slide-per-gesture locking & 60/120fps transition loop
  const currentIdxRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const gestureLockedRef = useRef(false);
  const lastGestureDirRef = useRef<number>(0);
  const wheelQuietTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  // Recalculate exact mathematical scale so 100% of the rendered stage fits inside the viewport
  // across ALL screen sizes, orientations (Portrait / Landscape), Android TVs, Desktops, and Round Screens
  const recalculateViewportFit = useCallback(() => {
    const vv = window.visualViewport;
    const vw = Math.max(200, Math.round(vv ? vv.width : window.innerWidth));
    const vh = Math.max(200, Math.round(vv ? vv.height : window.innerHeight));

    const aspect = vw / vh;
    const isRoundMedia =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(shape: round)').matches;
    const isNearSquareSmall =
      Math.min(vw, vh) <= 620 && Math.abs(vw - vh) / Math.max(vw, vh) < 0.15;
    const isRoundOrCircular = isRoundMedia || isNearSquareSmall;

    const isPortrait = !isRoundOrCircular && aspect < 0.78;
    const designWidth = isPortrait ? 660 : 1200;

    let topSafe: number;
    let bottomSafe: number;
    let availW: number;
    let availH: number;

    if (isRoundOrCircular) {
      // Inscribed safe box inside circular / round screen so corners are never clipped
      const diameter = Math.min(vw, vh);
      availW = Math.max(160, Math.floor(diameter * 0.76));
      availH = Math.max(150, Math.floor(diameter * 0.68));
      topSafe = Math.floor((vh - availH) * 0.5);
      bottomSafe = vh - availH - topSafe;
    } else {
      topSafe = vh < 460 ? 44 : 60;
      bottomSafe = vh < 460 ? 42 : 56;
      const sideSafe =
        vw >= 1280 ? 68 : Math.max(10, Math.round(vw * 0.025));
      availW = Math.max(160, vw - sideSafe * 2);
      availH = Math.max(140, vh - topSafe - bottomSafe);
    }

    const contentEl = stageContentRef.current;
    let naturalW = designWidth;
    let naturalH = isPortrait ? 860 : 580;

    if (contentEl) {
      naturalW = Math.max(
        designWidth,
        contentEl.scrollWidth || contentEl.offsetWidth || designWidth
      );
      naturalH = Math.max(
        100,
        contentEl.scrollHeight || contentEl.offsetHeight || naturalH
      );
    }

    // Mathematical fit scale (scales down on small/portrait/round screens, scales up on 4K Android TVs,
    // with a 0.985 safety factor so borders & drop-shadows never touch the viewport edge)
    const rawScale = Math.min(availW / naturalW, availH / naturalH) * 0.985;
    const clampedScale = Math.max(0.15, Math.min(3.2, rawScale));

    setViewportMetrics({
      vw,
      vh,
      availW,
      availH,
      topOffset: topSafe,
      designWidth,
      isPortrait,
      scale: clampedScale,
    });
  }, []);

  // Observe stage content size changes, orientation changes, and window resizes
  useEffect(() => {
    recalculateViewportFit();

    const contentEl = stageContentRef.current;
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && contentEl) {
      ro = new ResizeObserver(() => {
        recalculateViewportFit();
      });
      ro.observe(contentEl);
    }

    const handleResize = () => {
      recalculateViewportFit();
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, {
      passive: true,
    });
    window.visualViewport?.addEventListener('resize', handleResize, {
      passive: true,
    });

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [displayedIdx, recalculateViewportFit]);

  // Broadcast active stage index & progress to Navbar and ScrollProgressRibbon
  const broadcastStage = useCallback(
    (idx: number) => {
      const stageId = stages[idx]?.id || 'home';
      const progress = maxIndex > 0 ? idx / maxIndex : 0;
      window.dispatchEvent(
        new CustomEvent('steady-stage-change', {
          detail: { index: idx, id: stageId, progress },
        })
      );
    },
    [stages, maxIndex]
  );

  // Draw a single frame of the 2-Phase In-Place Pixelation Transition on <canvas>
  const drawPixelTransitionFrame = useCallback((t: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w: W, h: H } = canvasSizeRef.current;
    ctx.clearRect(0, 0, W, H);

    if (t <= 0.001 || t >= 0.999) return;

    const pixelSize = Math.max(16, Math.min(32, Math.round(Math.min(W, H) / 28)));
    const cols = Math.ceil(W / pixelSize);
    const rows = Math.ceil(H / pixelSize);

    const isDisappearing = t < 0.5;
    const phaseProgress = isDisappearing ? t * 2 : (1 - t) * 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bayer = BAYER_4X4[r & 3][c & 3];
        const hash = ((c * 17 + r * 31) & 15) / 16;
        const threshold = bayer * 0.72 + hash * 0.16;

        const delta = phaseProgress - threshold;

        if (delta > 0) {
          const x = c * pixelSize;
          const y = r * pixelSize;

          if (delta < 0.16) {
            const edgeRatio = delta / 0.16;
            const subSize = Math.max(
              6,
              Math.floor(pixelSize * (0.45 + edgeRatio * 0.55))
            );
            const offset = Math.floor((pixelSize - subSize) * 0.5);

            const colorPick = (c * 3 + r * 5 + Math.floor(t * 18)) & 3;
            if (colorPick === 0) {
              ctx.fillStyle = '#d4af37';
            } else if (colorPick === 1) {
              ctx.fillStyle = '#12110e';
            } else if (colorPick === 2) {
              ctx.fillStyle = '#fcf6b5';
            } else {
              ctx.fillStyle = '#b8860b';
            }

            ctx.fillRect(x + offset, y + offset, subSize, subSize);
          } else {
            ctx.fillStyle = '#f8f5ec';
            ctx.fillRect(x, y, pixelSize, pixelSize);

            if ((c + r) % 5 === 0 && delta < 0.34) {
              ctx.fillStyle = 'rgba(212, 175, 55, 0.28)';
              ctx.fillRect(x + 4, y + 4, pixelSize - 8, pixelSize - 8);
            }
          }
        }
      }
    }
  }, []);

  // Run a deterministic 60/120fps pixelation transition to `targetIdx`
  const transitionToStage = useCallback(
    (targetIdx: number) => {
      const clamped = Math.max(0, Math.min(maxIndex, targetIdx));
      if (clamped === currentIdxRef.current || isTransitioningRef.current) {
        return;
      }

      isTransitioningRef.current = true;
      setActiveIdx(clamped);
      broadcastStage(clamped);

      const startTime = performance.now();
      let swappedMidpoint = false;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const rawT = Math.min(1, elapsed / TRANSITION_DURATION_MS);
        const easedT = 0.5 - 0.5 * Math.cos(rawT * Math.PI);

        if (!swappedMidpoint && easedT >= 0.5) {
          swappedMidpoint = true;
          currentIdxRef.current = clamped;
          setDisplayedIdx(clamped);
        }

        drawPixelTransitionFrame(easedT);

        if (rawT < 1) {
          rafRef.current = requestAnimationFrame(step);
        } else {
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx?.clearRect(
              0,
              0,
              canvasSizeRef.current.w,
              canvasSizeRef.current.h
            );
          }
          currentIdxRef.current = clamped;
          setDisplayedIdx(clamped);
          isTransitioningRef.current = false;
        }
      };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(step);
    },
    [maxIndex, broadcastStage, drawPixelTransitionFrame]
  );

  // Trigger strictly +1 or -1 slide per scroll gesture (NEVER skips slides!)
  const stepByOneSlide = useCallback(
    (direction: 1 | -1) => {
      if (isTransitioningRef.current) return;
      const next = Math.max(
        0,
        Math.min(maxIndex, currentIdxRef.current + direction)
      );
      if (next === currentIdxRef.current) return;
      transitionToStage(next);
    },
    [maxIndex, transitionToStage]
  );

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvasSizeRef.current = { w, h };
    };

    updateCanvasSize();
    broadcastStage(currentIdxRef.current);
    window.addEventListener('resize', updateCanvasSize, { passive: true });

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[role="dialog"]')) {
        return;
      }

      e.preventDefault();

      const dy = e.deltaY;
      if (Math.abs(dy) < 6) return;

      const dir: 1 | -1 = dy > 0 ? 1 : -1;

      if (wheelQuietTimerRef.current) {
        clearTimeout(wheelQuietTimerRef.current);
      }
      wheelQuietTimerRef.current = setTimeout(() => {
        gestureLockedRef.current = false;
        lastGestureDirRef.current = 0;
      }, 240);

      if (
        gestureLockedRef.current &&
        !isTransitioningRef.current &&
        lastGestureDirRef.current !== 0 &&
        dir !== lastGestureDirRef.current
      ) {
        gestureLockedRef.current = false;
      }

      if (gestureLockedRef.current || isTransitioningRef.current) {
        return;
      }

      gestureLockedRef.current = true;
      lastGestureDirRef.current = dir;
      stepByOneSlide(dir);
    };

    let touchStartY = 0;
    let touchConsumed = false;

    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[role="dialog"]')) return;
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
        touchConsumed = false;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[role="dialog"]')) return;

      e.preventDefault();
      if (touchConsumed || isTransitioningRef.current) return;

      if (e.touches.length > 0) {
        const dy = touchStartY - e.touches[0].clientY;
        if (Math.abs(dy) > 30) {
          touchConsumed = true;
          stepByOneSlide(dy > 0 ? 1 : -1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.closest('[role="dialog"]'))
      ) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        stepByOneSlide(1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        stepByOneSlide(-1);
      }
    };

    const origScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function (
      arg?: boolean | ScrollIntoViewOptions
    ) {
      const elId = (this as HTMLElement).id;
      const stageIndex = stages.findIndex((s) => s.id === elId);
      if (stageIndex !== -1) {
        transitionToStage(stageIndex);
        return;
      }
      return origScrollIntoView.call(this, arg);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      Element.prototype.scrollIntoView = origScrollIntoView;
      if (wheelQuietTimerRef.current) clearTimeout(wheelQuietTimerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [stages, stepByOneSlide, transitionToStage, broadcastStage]);

  return (
    <>
      {/* 1. UNIVERSAL MATHEMATICALLY FITTED STEADY VIEWPORT STAGE */}
      <div className="fixed inset-0 z-10 h-dvh w-dvw overflow-hidden select-none">
        {/* Safe Viewport Stage Bounding Frame */}
        <div
          style={{
            position: 'absolute',
            top: `${viewportMetrics.topOffset}px`,
            left: `${Math.floor((viewportMetrics.vw - viewportMetrics.availW) * 0.5)}px`,
            width: `${viewportMetrics.availW}px`,
            height: `${viewportMetrics.availH}px`,
          }}
          className="flex items-center justify-center overflow-hidden"
        >
          {/* Mathematically Scaled Virtual Stage Canvas (Guaranteed 100% Inside Viewport on Every Device) */}
          <div
            ref={stageContentRef}
            style={{
              width: `${viewportMetrics.designWidth}px`,
              transform: `scale(${viewportMetrics.scale})`,
              transformOrigin: 'center center',
            }}
            className={`steady-stage-canvas shrink-0 select-text ${
              viewportMetrics.isPortrait
                ? 'force-portrait-grid'
                : 'force-desktop-grid'
            }`}
          >
            {stages[displayedIdx]?.render()}
          </div>
        </div>

        {/* 2-Phase Bayer-Dither Pixelation Disappearance / Appearance Canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-30 h-full w-full"
          aria-hidden="true"
        />
      </div>

      {/* 2. RIGHT-EDGE STEADY STAGE VOXEL TELEMETRY RAIL (Desktop & TV) */}
      <aside
        aria-label="Viewport Stage Navigator"
        className="fixed right-2.5 top-1/2 z-40 hidden xl:flex -translate-y-1/2 flex-col items-end gap-1.5 max-h-[80dvh]"
      >
        {stages.map((st, idx) => {
          const isCurrent = idx === activeIdx;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => transitionToStage(idx)}
              title={`${st.code} · ${st.label}`}
              aria-label={`Materialize ${st.label}`}
              className="group flex items-center gap-2 cursor-pointer"
            >
              <span
                className={`px-2 py-0.5 font-mono text-[10px] font-bold uppercase border border-[#12110e] transition-all duration-200 ${
                  isCurrent
                    ? 'bg-[#12110e] text-[#fcf6b5] opacity-100 shadow-[2px_2px_0px_#d4af37]'
                    : 'bg-white text-[#12110e] opacity-0 group-hover:opacity-100'
                }`}
              >
                {st.code} · {st.label}
              </span>
              <span
                className={`block border border-[#12110e] transition-all duration-200 ${
                  isCurrent
                    ? 'h-3.5 w-3.5 bg-[#d4af37] shadow-[2px_2px_0px_#12110e]'
                    : 'h-2.5 w-2.5 bg-white group-hover:bg-[#fcf6b5]'
                }`}
              />
            </button>
          );
        })}
      </aside>

      {/* 3. STAGE ANCHOR NODES FOR ID LOOKUPS */}
      <div className="sr-only" aria-hidden="true">
        {stages.map((st) => (
          <div key={st.id} id={st.id} />
        ))}
      </div>
    </>
  );
}
