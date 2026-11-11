import React from 'react';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeroProps {
  onExplore: () => void;
  onViewProjects: () => void;
}

export default function Hero({ onExplore, onViewProjects }: HeroProps) {
  const { profile } = portfolioData;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center py-6 sm:py-10 select-none">
      {/* Availability */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-amber-400/40 text-[10px] font-mono text-[#F5E4B5] tracking-widest uppercase mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        <span>{profile.status}</span>
      </div>

      <p className="font-mono text-[11px] sm:text-xs tracking-[0.35em] text-[#D4AF37] uppercase font-semibold mb-3 flex items-center gap-2">
        <MapPin className="w-3.5 h-3.5" />
        <span>{profile.location} · Creative Developer</span>
      </p>

      <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-bold tracking-[0.06em] text-white uppercase leading-[0.95] heading-shadow">
        <span className="text-gold-gradient">HARMAN</span>
        <br />
        <span className="text-[#FFFBF0]">SADHWANI</span>
      </h1>

      {/* Roles */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs sm:text-sm font-light text-gray-100 tracking-[0.15em] uppercase">
        <span className="text-[#F5E4B5] font-semibold">Creative Developer</span>
        <span className="text-[#D4AF37] opacity-70">•</span>
        <span className="text-white font-semibold">Full-Stack Engineer</span>
        <span className="text-[#D4AF37] opacity-70">•</span>
        <span className="text-[#F5E4B5] font-semibold">AI Systems Builder</span>
      </div>

      <p className="mt-6 max-w-2xl mx-auto text-xs sm:text-sm text-gray-200 leading-relaxed font-light">
        {profile.bio}
      </p>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onViewProjects}
          className="group px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF6DB] to-[#D4AF37] text-black font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_35px_rgba(212,175,55,0.45)] hover:shadow-[0_0_55px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2.5">
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </button>

        <button
          onClick={onExplore}
          className="px-6 py-3 rounded-full glass-panel glass-panel-hover text-xs font-semibold text-[#FFFBF0] tracking-widest uppercase border border-amber-400/40 hover:border-amber-400/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        >
          <span className="flex items-center gap-2">
            <span>About Me</span>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </span>
        </button>
      </div>

      {/* Core disciplines */}
      <div className="mt-10 hidden sm:flex items-center justify-center gap-5 text-[10px] font-mono text-gray-400 tracking-widest uppercase">
        <span>Full-Stack Development</span>
        <span className="w-px h-3 bg-white/15" />
        <span>AI &amp; Agentic Systems</span>
        <span className="w-px h-3 bg-white/15" />
        <span>3D Web Interfaces</span>
      </div>
    </div>
  );
}
