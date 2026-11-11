import React, { useState, useEffect } from 'react';
import { Layers, Activity, Eye, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SpatialHUDProps {
  scrollProgress: number;
  activeMode: 'cinematic' | 'wireframe' | 'quantum';
  onChangeMode: (mode: 'cinematic' | 'wireframe' | 'quantum') => void;
}

export default function SpatialHUD({ scrollProgress, activeMode, onChangeMode }: SpatialHUDProps) {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  const depthPercent = Math.round(scrollProgress * 100);

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 pointer-events-none flex flex-wrap items-center justify-between gap-3 text-left">
      {/* Left: 3D Visualization Mode Controls */}
      <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-full glass-panel border border-amber-500/25 shadow-2xl">
        <div className="px-2.5 py-1 flex items-center gap-1 text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider">
          <Layers className="w-3 h-3 text-[#F5E4B5]" />
          <span className="hidden sm:inline">REALM SHADER:</span>
        </div>

        {(['cinematic', 'wireframe', 'quantum'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              soundFx.playClickPulse();
              onChangeMode(mode);
            }}
            onMouseEnter={() => soundFx.playHoverChime()}
            className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-all ${
              activeMode === mode
                ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Right: Live Telemetry Indicator */}
      <div className="pointer-events-auto hidden sm:flex items-center gap-4 px-4 py-2 rounded-full glass-panel border border-white/10 text-[10px] font-mono text-gray-400 tracking-wider">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Activity className="w-3 h-3 animate-pulse" />
          <span>{fps} FPS</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5 text-[#F5E4B5]">
          <Compass className="w-3 h-3 text-[#D4AF37]" />
          <span>DEPTH: {depthPercent}%</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1 text-gray-300">
          <Eye className="w-3 h-3 text-[#D4AF37]" />
          <span>THREE.JS PBR</span>
        </div>
      </div>
    </div>
  );
}
