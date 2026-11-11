import React from 'react';
import { ArrowDown, Sparkles, Terminal, Cpu, ShieldCheck, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeroProps {
  onExplore: () => void;
  onViewProjects: () => void;
}

export default function Hero({ onExplore, onViewProjects }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-20 px-4 sm:px-8 text-center select-none"
    >
      {/* Top Telemetry Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between text-[10px] font-mono text-gray-400 tracking-widest uppercase mb-4 px-2">
        <span className="hidden sm:flex items-center gap-1.5 text-[#D4AF37]">
          <Compass className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>REALM SECTOR: 01 // ZENITH SANCTUARY</span>
        </span>
        <div className="mx-auto sm:mx-0 flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-amber-400/40 text-[10px] font-mono text-[#F5E4B5] tracking-widest uppercase shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 -ml-3" />
          <span>HARMAN SADHWANI · ACTIVE BCA ARCHITECT</span>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>60 FPS HARDWARE ACCELERATED</span>
        </span>
      </div>

      {/* Main Center Cinematic Typography */}
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center my-auto relative">
        {/* Subtle decorative crosshairs */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#D4AF37]/50 tracking-[0.5em] uppercase">
          + + + GEOMETRIC DOMAIN + + +
        </div>

        <p className="font-mono text-xs sm:text-sm tracking-[0.4em] text-[#D4AF37] uppercase font-semibold mb-3 drop-shadow">
          ENTER THE IMMERSIVE REALM
        </p>

        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.06em] text-white uppercase leading-[0.95] drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]">
          <span className="text-gold-gradient">HARMAN</span>
          <br />
          <span className="text-[#FFFBF0] drop-shadow-[0_0_40px_rgba(255,251,240,0.25)]">SADHWANI</span>
        </h1>

        {/* Subtitle Roles with High-Fashion Spacing */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-base font-light text-gray-200 tracking-[0.15em] uppercase">
          <span className="text-[#F5E4B5] font-semibold drop-shadow">Creative Developer</span>
          <span className="text-[#D4AF37] opacity-60">✦</span>
          <span className="text-white font-semibold drop-shadow">Full-Stack Engineer</span>
          <span className="text-[#D4AF37] opacity-60">✦</span>
          <span className="text-[#F5E4B5] font-semibold drop-shadow">AI Systems Builder</span>
        </div>

        {/* Motifs & Tagline */}
        <div className="mt-5 inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10 border border-amber-400/40">
          <p className="font-mono text-xs sm:text-sm tracking-[0.25em] text-[#FFFBF0] font-bold uppercase drop-shadow">
            BUILD. INNOVATE. ENGINEER THE FUTURE.
          </p>
        </div>

        <p className="mt-6 max-w-2xl text-xs sm:text-sm text-gray-300 leading-relaxed font-light drop-shadow">
          Sculpting high-performance WebGL 3D spatial environments, autonomous agentic developer ecosystems, and resilient digital architectures where mathematical precision meets crystalline cinematic beauty.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              soundFx.playClickPulse();
              onExplore();
            }}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF6DB] to-[#D4AF37] text-black font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_55px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-500" />
              <span>Explore Realm</span>
            </span>
          </button>

          <button
            onClick={() => {
              soundFx.playClickPulse();
              onViewProjects();
            }}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="px-7 py-3.5 rounded-full glass-panel glass-panel-hover text-xs font-semibold text-[#FFFBF0] tracking-widest uppercase border border-amber-400/30 hover:border-amber-400/70 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#D4AF37]" />
              <span>View Flagships</span>
            </span>
          </button>
        </div>
      </div>

      {/* Bottom Scroll Indicator & Pillar Tags */}
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-4 mt-6">
        <div className="hidden sm:flex items-center justify-center gap-8 text-[10px] font-mono text-gray-400 tracking-widest">
          <span className="flex items-center gap-1.5 text-[#F5E4B5]">
            <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>THREE.JS SHADERS & UNREAL BLOOM</span>
          </span>
          <span>✦</span>
          <span>AGENTIC LLM ARCHITECTURES</span>
          <span>✦</span>
          <span>AUTONOMOUS WORKFLOWS</span>
        </div>

        {/* Scroll Pill Indicator */}
        <button
          onClick={() => {
            soundFx.playClickPulse();
            onExplore();
          }}
          className="group flex flex-col items-center gap-1.5 text-gray-400 hover:text-[#F5E4B5] transition-colors"
        >
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase">SCROLL TO ASCEND</span>
          <div className="w-6 h-10 rounded-full border border-amber-400/30 group-hover:border-amber-400 flex items-start justify-center p-1.5 transition-colors">
            <span className="w-1.5 h-2.5 bg-[#D4AF37] rounded-full animate-bounce shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
          </div>
          <ArrowDown className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>
    </section>
  );
}
