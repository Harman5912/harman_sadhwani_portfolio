import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Sparkles, GraduationCap, Award, Box, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function AboutSection() {
  const { profile, education } = portfolioData;

  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>ORIGIN & ARCHITECTURE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
          About <span className="text-gold-gradient">Harman</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      {/* Main Grid: Left Portrait & Bio, Right Core Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Avatar Card & Education */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 relative overflow-hidden group">
            {/* Background Halo */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Real Avatar Photo */}
            <div className="relative w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-amber-400/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] mb-6">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-left">
                <span className="font-serif text-sm font-semibold text-[#FFFBF0] block">
                  {profile.name}
                </span>
                <span className="font-mono text-[10px] text-[#F5E4B5] tracking-wider block">
                  BCA Scholar · AI Systems Architect
                </span>
              </div>
            </div>

            {/* Academic Credential */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left">
              <div className="flex items-center gap-2.5 text-[#F5E4B5] mb-1.5">
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                <span className="font-serif text-xs font-semibold uppercase tracking-wider">
                  Academic Foundation
                </span>
              </div>
              <p className="text-sm font-medium text-white">{education.degree}</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{education.focus}</p>
              <div className="mt-3 inline-block px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono text-[10px] text-[#D4AF37]">
                {education.status}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {profile.stats.map((st, i) => (
              <div
                key={i}
                onMouseEnter={() => soundFx.playHoverChime()}
                className="glass-panel p-4 rounded-2xl border border-white/10 text-center glass-panel-hover"
              >
                <div className="font-serif text-2xl font-bold text-gold-gradient">{st.value}</div>
                <div className="font-mono text-[10px] text-gray-400 tracking-wider uppercase mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Bio Narrative & Pillars */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Narrative Statement */}
          <div className="glass-panel p-8 rounded-3xl border border-amber-500/20 relative">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFBF0] mb-4">
              Building at the Intersection of Real-Time 3D & Agentic Intelligence
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4 font-light">
              {profile.bio}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              {profile.secondaryBio}
            </p>
          </div>

          {/* 4 Architectural Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {profile.pillars.map((pillar, idx) => (
              <div
                key={idx}
                onMouseEnter={() => soundFx.playHoverChime()}
                className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-hover relative overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 border border-amber-400/30 flex items-center justify-center">
                    {idx === 0 && <Box className="w-4 h-4 text-[#F5E4B5]" />}
                    {idx === 1 && <Sparkles className="w-4 h-4 text-[#D4AF37]" />}
                    {idx === 2 && <Layers className="w-4 h-4 text-[#F5E4B5]" />}
                    {idx === 3 && <Award className="w-4 h-4 text-[#D4AF37]" />}
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-white tracking-wide">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
