import React from 'react';
import { portfolioData, certifications } from '../data/portfolioData';
import { Briefcase, GraduationCap, ShieldCheck, CheckCircle, Calendar, Building2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ExperienceEducationSection() {
  const { experience, education } = portfolioData;

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/30 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2">
          <Briefcase className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>JOURNEY & CREDENTIALS // 05</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Experience & <span className="text-gold-gradient">Education</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
        {/* Left Column: Experience Timeline & BCA */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {experience.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-5 rounded-2xl border border-amber-500/25 glass-panel-hover"
            >
              <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  {exp.track}
                </span>
                <span className="flex items-center gap-1 font-mono text-[10px] text-gray-400">
                  <Calendar className="w-3 h-3 text-[#D4AF37]" />
                  <span>{exp.duration}</span>
                </span>
              </div>

              <h4 className="font-serif text-xl font-bold text-white mb-0.5">{exp.role}</h4>
              <div className="flex items-center gap-1.5 text-xs text-[#F5E4B5] mb-3 font-medium">
                <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{exp.organization}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300 font-light">
                    <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Academic Foundation Box */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#F5E4B5]" />
                <h4 className="font-serif text-base font-bold text-white">{education.degree}</h4>
              </div>
              <span className="font-mono text-[9px] text-[#D4AF37] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Active
              </span>
            </div>
            <p className="text-xs text-gray-300 mb-2 leading-relaxed font-light">
              {education.focus}
            </p>
            <div className="font-mono text-[10px] text-gray-400">
              {education.status}
            </div>
          </div>
        </div>

        {/* Right Column: Industry Certifications */}
        <div className="md:col-span-5 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 px-1 mb-1">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Industry Certifications & Training
            </h4>
          </div>

          {certifications.map((cert) => (
            <div
              key={cert.id}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-3.5 rounded-xl border border-white/10 glass-panel-hover"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9px] text-[#D4AF37] uppercase">
                  {cert.domain}
                </span>
                <span className="font-mono text-[8px] text-gray-400 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/10">
                  {cert.provider}
                </span>
              </div>
              <h5 className="font-serif text-xs font-semibold text-white mb-0.5">
                {cert.title}
              </h5>
              <p className="text-[10px] text-gray-400 font-light leading-snug">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
