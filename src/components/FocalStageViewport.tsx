import React, { useState, useEffect, useRef, useCallback } from 'react';
import DustParticleTransition from './DustParticleTransition';
import { soundFx } from '../utils/audio';
import { ChevronLeft, ChevronRight, ArrowUpDown, ArrowLeftRight } from 'lucide-react';

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

  const contentContainerRef = useRef<HTMLDivElement>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const horizontalWheelAccumulator = useRef(0);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  // Transition to target stage with dust particle disintegration and assembly
  const triggerTransition = useCallback(
    (targetIndex: number) => {
      if (targetIndex === displayedStage || isLocked) return;
      if (targetIndex < 0 || targetIndex >= stages.length) return;

      setIsLocked(true);
      setPhase('disintegrating');
      soundFx.playClickPulse();
      soundFx.playHoverChime();

      // Reset internal scroll of the active container when transmuting
      if (contentContainerRef.current) {
        contentContainerRef.current.scrollTop = 0;
      }

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

  // Handle Horizontal vs Vertical Wheel Navigation:
  // - Vertical (deltaY): Smoothly scrolls the active section content up & down.
  // - Horizontal (deltaX, Shift+Wheel): Switches to Next/Previous section with Dust Particles!
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If user is holding Shift or using trackpad horizontal gesture (deltaX)
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;

      if (isHorizontalScroll) {
        e.preventDefault();
        if (isLocked) return;

        const delta = e.shiftKey ? e.deltaY : e.deltaX;
        horizontalWheelAccumulator.current += delta;

        if (Math.abs(horizontalWheelAccumulator.current) > 35) {
          if (horizontalWheelAccumulator.current > 0) {
            // Right -> Next Section
            if (displayedStage < stages.length - 1) {
              triggerTransition(displayedStage + 1);
            }
          } else {
            // Left -> Previous Section
            if (displayedStage > 0) {
              triggerTransition(displayedStage - 1);
            }
          }
          horizontalWheelAccumulator.current = 0;
        }

        if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
        lockTimerRef.current = setTimeout(() => {
          horizontalWheelAccumulator.current = 0;
        }, 220);
      }
      // If vertical (deltaY): let normal internal scrolling scroll UP and DOWN in the section!
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [displayedStage, isLocked, stages.length, triggerTransition]);

  // Handle Keyboard Arrows:
  // - ArrowLeft / ArrowRight: Switch section with dust particles!
  // - ArrowUp / ArrowDown: Scroll up & down in that section!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (displayedStage < stages.length - 1) {
          triggerTransition(displayedStage + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (displayedStage > 0) {
          triggerTransition(displayedStage - 1);
        }
      } else if (e.key === 'ArrowDown') {
        // Scroll down within the active section
        if (contentContainerRef.current) {
          contentContainerRef.current.scrollBy({ top: 140, behavior: 'smooth' });
        }
      } else if (e.key === 'ArrowUp') {
        // Scroll up within the active section
        if (contentContainerRef.current) {
          contentContainerRef.current.scrollBy({ top: -140, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [displayedStage, isLocked, stages.length, triggerTransition]);

  // Handle Touch Navigation on Mobile / Tablets:
  // - Horizontal Swipe: Switch section!
  // - Vertical Swipe: Scroll inside the active section!
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartPos.current || isLocked) return;
      const deltaX = touchStartPos.current.x - e.touches[0].clientX;
      const deltaY = touchStartPos.current.y - e.touches[0].clientY;

      // If horizontal swipe is dominant and exceeds threshold
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
        if (deltaX > 0 && displayedStage < stages.length - 1) {
          // Swipe Left -> Next Section
          triggerTransition(displayedStage + 1);
        } else if (deltaX < 0 && displayedStage > 0) {
          // Swipe Right -> Previous Section
          triggerTransition(displayedStage - 1);
        }
        touchStartPos.current = null;
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [displayedStage, isLocked, stages.length, triggerTransition]);

  const prevStage = displayedStage > 0 ? stages[displayedStage - 1] : null;
  const nextStage = displayedStage < stages.length - 1 ? stages[displayedStage + 1] : null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center p-2 sm:p-6 overflow-hidden pointer-events-none select-none">
      {/* 1. Dust Particle Disintegration & Materialization Canvas */}
      <DustParticleTransition
        isTransitioning={phase !== 'idle'}
        phase={phase}
      />

      {/* 2. Left Floating Section Switcher Wing (Horizontal Navigation) */}
      <div className="hidden md:flex fixed left-5 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <button
          onClick={() => prevStage && triggerTransition(displayedStage - 1)}
          disabled={!prevStage || isLocked}
          onMouseEnter={() => prevStage && soundFx.playHoverChime()}
          className={`group flex items-center gap-2 p-3 rounded-2xl glass-panel border transition-all duration-300 ${
            prevStage
              ? 'border-amber-400/30 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer'
              : 'border-white/5 opacity-20 cursor-not-allowed'
          }`}
          title="Previous Section [Left Arrow / Swipe Right]"
        >
          <ChevronLeft className="w-5 h-5 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
          {prevStage && (
            <div className="text-left hidden lg:block pr-1">
              <span className="block font-mono text-[8px] text-gray-400 tracking-wider">
                PREV [←]
              </span>
              <span className="block font-serif text-xs font-bold text-[#F5E4B5]">
                {prevStage.code} {prevStage.label}
              </span>
            </div>
          )}
        </button>
      </div>

      {/* 3. Right Floating Section Switcher Wing (Horizontal Navigation) */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 pointer-events-auto">
        <button
          onClick={() => nextStage && triggerTransition(displayedStage + 1)}
          disabled={!nextStage || isLocked}
          onMouseEnter={() => nextStage && soundFx.playHoverChime()}
          className={`group flex items-center gap-2 p-3 rounded-2xl glass-panel border transition-all duration-300 ${
            nextStage
              ? 'border-amber-400/30 hover:border-amber-400 hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer'
              : 'border-white/5 opacity-20 cursor-not-allowed'
          }`}
          title="Next Section [Right Arrow / Swipe Left]"
        >
          {nextStage && (
            <div className="text-right hidden lg:block pl-1">
              <span className="block font-mono text-[8px] text-gray-400 tracking-wider">
                NEXT [→]
              </span>
              <span className="block font-serif text-xs font-bold text-[#F5E4B5]">
                {nextStage.code} {nextStage.label}
              </span>
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* 4. Single Point Focal Stage Content Wrapper */}
      <div
        className={`w-full max-w-5xl mx-auto flex flex-col items-center justify-center pointer-events-auto transition-all duration-300 ease-out px-2 md:px-14 ${
          phase === 'disintegrating'
            ? 'opacity-0 scale-95 blur-md'
            : phase === 'assembling'
            ? 'opacity-100 scale-100 blur-0'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {/* Scrollable Container for exploring Up and Down in the active section */}
        <div
          ref={contentContainerRef}
          tabIndex={0}
          className="w-full max-h-[82vh] overflow-y-auto pr-1 no-scrollbar focus:outline-none flex flex-col items-center"
        >
          {stages[displayedStage]?.component}
        </div>
      </div>

      {/* 5. Bottom Navigation Telemetry Helper Pill */}
      <div className="fixed bottom-16 sm:bottom-14 left-1/2 -translate-x-1/2 z-30 pointer-events-auto flex items-center gap-4 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-[10px] font-mono text-gray-300 shadow-xl">
        {/* Mobile Left Arrow */}
        <button
          onClick={() => prevStage && triggerTransition(displayedStage - 1)}
          disabled={!prevStage || isLocked}
          className="md:hidden disabled:opacity-20"
        >
          <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
        </button>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[#F5E4B5] font-semibold">
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>[← / →] NEXT SECTION</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="flex items-center gap-1 text-gray-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#7AC7FF]" />
            <span>[↑ / ↓] EXPLORE SECTION</span>
          </span>
        </div>

        {/* Mobile Right Arrow */}
        <button
          onClick={() => nextStage && triggerTransition(displayedStage + 1)}
          disabled={!nextStage || isLocked}
          className="md:hidden disabled:opacity-20"
        >
          <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
        </button>
      </div>
    </div>
  );
}
