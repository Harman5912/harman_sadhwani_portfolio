import React, { useState, useEffect, useRef, useCallback } from 'react';
import DustParticleTransition from './DustParticleTransition';
import { soundFx } from '../utils/audio';
import { ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export interface StageConfig {
  id: string;
  code: string;
  label: string;
  component: React.ReactNode;
}

interface FocalStageViewportProps {
  stages: StageConfig[];
  currentStage: number;
  onStageChange: (newIndex: number) => void;
}

export default function FocalStageViewport({
  stages,
  currentStage,
  onStageChange,
}: FocalStageViewportProps) {
  const [displayedStage, setDisplayedStage] = useState(currentStage);
  const [phase, setPhase] = useState<'idle' | 'disintegrating' | 'assembling'>('idle');
  const [isLocked, setIsLocked] = useState(false);

  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelAccumulator = useRef(0);
  const touchStartY = useRef<number | null>(null);

  // Transition to target stage with dust particle disintegration and assembly
  const triggerTransition = useCallback(
    (targetIndex: number) => {
      if (targetIndex === displayedStage || isLocked) return;
      if (targetIndex < 0 || targetIndex >= stages.length) return;

      setIsLocked(true);
      setPhase('disintegrating');
      soundFx.playClickPulse();
      soundFx.playHoverChime();

      // Midpoint: swap content and begin particle convergence
      setTimeout(() => {
        setDisplayedStage(targetIndex);
        onStageChange(targetIndex);
        setPhase('assembling');
      }, 340);

      // Finish: settle into crisp idle state
      setTimeout(() => {
        setPhase('idle');
        setIsLocked(false);
      }, 720);
    },
    [displayedStage, isLocked, stages.length, onStageChange]
  );

  // Sync external changes (e.g. from Navbar clicks)
  useEffect(() => {
    if (currentStage !== displayedStage && !isLocked) {
      triggerTransition(currentStage);
    }
  }, [currentStage, displayedStage, isLocked, triggerTransition]);

  // Handle Wheel Scroll (Fixed single-point stage stepped navigation)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Don't intercept if user is scrolling inside an internal scrollable element
      const target = e.target as HTMLElement | null;
      if (target && target.closest('.allow-inner-scroll')) {
        const el = target.closest('.allow-inner-scroll') as HTMLElement;
        const isAtTop = el.scrollTop <= 0 && e.deltaY < 0;
        const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2 && e.deltaY > 0;
        if (!isAtTop && !isAtBottom) {
          return;
        }
      }

      e.preventDefault();
      if (isLocked) return;

      wheelAccumulator.current += e.deltaY;

      if (Math.abs(wheelAccumulator.current) > 45) {
        if (wheelAccumulator.current > 0) {
          // Scroll Down -> Next Stage
          if (displayedStage < stages.length - 1) {
            triggerTransition(displayedStage + 1);
          }
        } else {
          // Scroll Up -> Previous Stage
          if (displayedStage > 0) {
            triggerTransition(displayedStage - 1);
          }
        }
        wheelAccumulator.current = 0;
      }

      // Reset wheel accumulator if user pauses
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        wheelAccumulator.current = 0;
      }, 250);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [displayedStage, isLocked, stages.length, triggerTransition]);

  // Handle Keyboard Arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (displayedStage < stages.length - 1) {
          triggerTransition(displayedStage + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (displayedStage > 0) {
          triggerTransition(displayedStage - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayedStage, isLocked, stages.length, triggerTransition]);

  // Handle Touch Swipe on Mobile
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null || isLocked) return;
      const deltaY = touchStartY.current - e.touches[0].clientY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && displayedStage < stages.length - 1) {
          triggerTransition(displayedStage + 1);
        } else if (deltaY < 0 && displayedStage > 0) {
          triggerTransition(displayedStage - 1);
        }
        touchStartY.current = null;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [displayedStage, isLocked, stages.length, triggerTransition]);

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-3 sm:p-6 overflow-hidden pointer-events-none">
      {/* 1. Dust Particle Disintegration & Materialization Canvas */}
      <DustParticleTransition
        isTransitioning={phase !== 'idle'}
        phase={phase}
      />

      {/* 2. Single Point Focal Stage Content Wrapper */}
      <div
        className={`w-full max-w-5xl mx-auto flex flex-col items-center justify-center pointer-events-auto transition-all duration-300 ease-out ${
          phase === 'disintegrating'
            ? 'opacity-0 scale-95 blur-md'
            : phase === 'assembling'
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        <div className="w-full max-h-[82vh] overflow-y-auto allow-inner-scroll pr-1 no-scrollbar flex flex-col items-center">
          {stages[displayedStage]?.component}
        </div>
      </div>

      {/* 3. Stage Telemetry Navigation Spine (Right Side) */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 pointer-events-auto z-30">
        <button
          onClick={() => displayedStage > 0 && triggerTransition(displayedStage - 1)}
          disabled={displayedStage === 0 || isLocked}
          className="p-2 rounded-full glass-panel hover:border-amber-400 disabled:opacity-30 disabled:hover:border-transparent transition-all"
          title="Previous Stage [↑]"
        >
          <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
        </button>

        <div className="flex flex-col gap-2 py-2">
          {stages.map((st, idx) => {
            const isActive = idx === displayedStage;
            return (
              <button
                key={st.id}
                onClick={() => triggerTransition(idx)}
                onMouseEnter={() => soundFx.playHoverChime()}
                className="group flex items-center gap-2.5 py-1 text-right focus:outline-none"
              >
                <span
                  className={`font-mono text-[9px] tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'text-[#F5E4B5] font-bold opacity-100 scale-105'
                      : 'text-gray-500 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  {st.code} {st.label}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
                      : 'bg-white/20 group-hover:bg-amber-400/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          onClick={() => displayedStage < stages.length - 1 && triggerTransition(displayedStage + 1)}
          disabled={displayedStage === stages.length - 1 || isLocked}
          className="p-2 rounded-full glass-panel hover:border-amber-400 disabled:opacity-30 disabled:hover:border-transparent transition-all"
          title="Next Stage [↓]"
        >
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </button>

        <div className="mt-2 text-[9px] font-mono text-gray-500 tracking-widest writing-vertical uppercase">
          SCROLL TO TRANSMUTE
        </div>
      </div>

      {/* 4. Mobile Stage Indicator Pill (Bottom Center) */}
      <div className="lg:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-[10px] font-mono text-[#F5E4B5]">
        <button
          onClick={() => displayedStage > 0 && triggerTransition(displayedStage - 1)}
          disabled={displayedStage === 0 || isLocked}
          className="disabled:opacity-30"
        >
          <ChevronUp className="w-4 h-4 text-[#D4AF37]" />
        </button>
        <span className="font-bold tracking-wider">
          {stages[displayedStage]?.code} · {stages[displayedStage]?.label}
        </span>
        <button
          onClick={() => displayedStage < stages.length - 1 && triggerTransition(displayedStage + 1)}
          disabled={displayedStage === stages.length - 1 || isLocked}
          className="disabled:opacity-30"
        >
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
