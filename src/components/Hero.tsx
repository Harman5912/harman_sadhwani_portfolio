import React from 'react';
import { ArrowDown, Sparkles, Terminal, Cpu } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeroProps {
  onExplore: () => void;
  onViewProjects: () => void;
}

export default function Hero({ onExplore, onViewProjects }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-28 pb-12 px-4 sm:px-8 text-center select-none"
    >
      {/* Top Status & Atmospheric Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-amber-400/30 text-[11px] font-mono text-[#F5E4B5] tracking-widest uppercase mb-4 animate-float-slow">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3" />
        <span>AVAILABLE FOR OPPORTUNITIES · INDIA</span>
      </div>

      {/* Main Center Cinematic Typography */}
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        <p className="font-mono text-xs sm:text-sm tracking-[0.35em] text-[#D4AF37] uppercase font-semibold mb-3">
          IMMERSIVE 3D DIGITAL KINGDOM
        </p>

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.08em] text-white uppercase leading-[1.05] drop-shadow-2xl">
          <span className="text-gold-gradient">HARMAN</span>
          <br />
          <span className="text-[#FFFBF0]">SADHWANI</span>
        </h1>

        {/* Subtitle Roles */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-base font-light text-gray-200 tracking-wider">
          <span className="text-[#F5E4B5] font-medium">Creative Developer</span>
          <span className="text-[#D4AF37] opacity-60">|</span>
          <span className="text-white font-medium">Full-Stack Developer</span>
          <span className="text-[#D4AF37] opacity-60">|</span>
          <span className="text-[#F5E4B5] font-medium">AI Systems Builder</span>
        </div>

        {/* Motifs & Tagline */}
        <p className="mt-4 font-mono text-xs sm:text-sm tracking-[0.2em] text-[#D4AF37] font-semibold uppercase">
          BUILD. INNOVATE. ENGINEER THE FUTURE.
        </p>

        <p className="mt-4 max-w-xl text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
          Sculpting cinematic WebGL environments, autonomous agentic developer ecosystems, and high-performance applications where computational rigor meets architectural beauty.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundFx.playClickPulse();
              onExplore();
            }}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="group px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F2E2BA] to-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>Explore Kingdom</span>
            </span>
          </button>

          <button
            onClick={() => {
              soundFx.playClickPulse();
              onViewProjects();
            }}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="px-6 py-3 rounded-full glass-panel glass-panel-hover text-xs font-semibold text-[#FFFBF0] tracking-wider uppercase border border-white/20 hover:border-amber-400/50"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#D4AF37]" />
              <span>View Flagships</span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Pillar Tags */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 mt-8">
        {/* Quick Specs Micro Badges */}
        <div className="hidden sm:flex items-center justify-center gap-6 text-[10px] font-mono text-gray-400 tracking-wider">
          <span className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>THREE.JS & R3F</span>
          </span>
          <span>•</span>
          <span>AGENTIC LLM ARCHITECTURE</span>
          <span>•</span>
          <span>60 FPS PERFORMANCE TUNED</span>
        </div>

        {/* Scroll Pill Indicator */}
        <button
          onClick={() => {
            soundFx.playClickPulse();
            onExplore();
          }}
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-[#F5E4B5] transition-colors"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO TRAVEL</span>
          <div className="w-6 h-10 rounded-full border border-white/20 group-hover:border-amber-400/50 flex items-start justify-center p-1.5 transition-colors">
            <span className="w-1 h-2 bg-[#D4AF37] rounded-full animate-bounce" />
          </div>
          <ArrowDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
}
