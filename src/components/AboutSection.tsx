import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Sparkles, GraduationCap, Award, Box, Layers } from 'lucide-react';

export default function AboutSection() {
  const { profile, education } = portfolioData;

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6 select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/40 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>ABOUT // 01</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase heading-shadow">
          About <span className="text-gold-gradient">Harman</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      {/* Main Grid: Left Portrait & Bio, Right Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Avatar Card & Education */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/30 relative overflow-hidden group shadow-2xl">
            <div className="flex items-center gap-4 mb-4">
              {/* Avatar Photo */}
              <div className="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border border-amber-400/50 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top filter brightness-[1.03]"
                />
              </div>

              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-[#FFFBF0]">
                  {profile.name}
                </h3>
                <span className="font-mono text-[10px] text-[#F5E4B5] tracking-wider block">
                  BCA Scholar · AI Systems Developer
                </span>
                <div className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-400/40 font-mono text-[9px] text-emerald-300">
                  {profile.status}
                </div>
              </div>
            </div>

            {/* Academic Credential */}
            <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-left">
              <div className="flex items-center gap-2 text-[#F5E4B5] mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-serif text-[11px] font-semibold uppercase tracking-wider">
                  Academic Foundation
                </span>
              </div>
              <p className="text-xs font-medium text-white">{education.degree}</p>
              <p className="text-[11px] text-gray-300 mt-0.5 leading-snug">{education.focus}</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2.5">
            {profile.stats.map((st, i) => (
              <div
                key={i}
                className="glass-panel p-3 rounded-xl border border-white/10 text-center glass-panel-hover"
              >
                <div className="font-serif text-xl font-bold text-gold-gradient">{st.value}</div>
                <div className="font-mono text-[9px] text-gray-300 tracking-wider uppercase mt-0.5">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Bio Narrative & Pillars */}
        <div className="md:col-span-7 flex flex-col gap-4 text-left">
          {/* Narrative Statement */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/25 relative shadow-2xl">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#FFFBF0] mb-2 heading-shadow">
              Intersection of Real-Time 3D & Agentic Intelligence
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-light mb-2">
              {profile.bio}
            </p>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              {profile.secondaryBio}
            </p>
          </div>

          {/* 4 Architectural Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {profile.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="glass-panel p-4 rounded-xl border border-white/10 glass-panel-hover"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-400/40 flex items-center justify-center">
                    {idx === 0 && <Box className="w-3.5 h-3.5 text-[#F5E4B5]" />}
                    {idx === 1 && <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />}
                    {idx === 2 && <Layers className="w-3.5 h-3.5 text-[#F5E4B5]" />}
                    {idx === 3 && <Award className="w-3.5 h-3.5 text-[#D4AF37]" />}
                  </div>
                  <h4 className="font-serif text-xs font-semibold text-white tracking-wide">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
