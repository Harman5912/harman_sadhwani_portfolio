import React from 'react';
import { portfolioData, certifications } from '../data/portfolioData';
import { Briefcase, GraduationCap, ShieldCheck, CheckCircle, Calendar, Building2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ExperienceEducationSection() {
  const { experience, education } = portfolioData;

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-3">
          <Briefcase className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>JOURNEY & CREDENTIALS</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
          Experience & <span className="text-gold-gradient">Education</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        <p className="mt-4 text-xs sm:text-sm text-gray-300 font-light">
          A disciplined trajectory encompassing enterprise technical internships, academic computing excellence, and industry credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        {/* Left Column: Experience Timeline */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
              Professional Engineering
            </h3>
          </div>

          {experience.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-8 rounded-3xl border border-amber-500/25 glass-panel-hover relative overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  {exp.track}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{exp.duration}</span>
                </span>
              </div>

              <h4 className="font-serif text-2xl font-bold text-white mb-1">{exp.role}</h4>
              <div className="flex items-center gap-2 text-sm text-[#F5E4B5] mb-6 font-medium">
                <Building2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{exp.organization}</span>
              </div>

              <div className="flex flex-col gap-3">
                {exp.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300 font-light">
                    <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Academic Foundation Box */}
          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-[#F5E4B5]" />
              <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
                Higher Education
              </h3>
            </div>

            <div className="glass-panel p-8 rounded-3xl border border-white/10 glass-panel-hover">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif text-xl font-bold text-white">{education.degree}</h4>
                <span className="font-mono text-xs text-[#D4AF37] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 mb-4 leading-relaxed font-light">
                {education.focus}
              </p>
              <div className="font-mono text-[11px] text-gray-400">
                {education.status}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Industry Certifications & Training */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl font-bold text-white uppercase tracking-wide">
              Certifications & Training
            </h3>
          </div>

          {certifications.map((cert) => (
            <div
              key={cert.id}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-5 rounded-2xl border border-white/10 glass-panel-hover"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider">
                  {cert.domain}
                </span>
                <span className="font-mono text-[10px] text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                  {cert.provider}
                </span>
              </div>
              <h4 className="font-serif text-sm font-semibold text-white mb-1.5">
                {cert.title}
              </h4>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
