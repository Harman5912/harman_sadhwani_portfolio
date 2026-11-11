import React from 'react';
import { portfolioData, achievementsList } from '../data/portfolioData';
import { Briefcase, GraduationCap, CheckCircle, Calendar, Building2, Code2, Cpu, Trophy } from 'lucide-react';

export default function ExperienceEducationSection() {
  const { experience, education } = portfolioData;

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-5 text-left select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/40 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <Briefcase className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>EXPERIENCE & EDUCATION // 05</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase heading-shadow">
          Experience & <span className="text-gold-gradient">Education</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-1.5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Full-Stack AI/ML Engineering Internship */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <Briefcase className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider heading-shadow">
              Professional Engineering Internship
            </h3>
          </div>

          {experience.map((exp) => (
            <div
              key={exp.id}
              className="glass-panel p-6 rounded-2xl border border-amber-500/30 glass-panel-hover flex-1 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                  <span className="font-mono text-[9px] text-[#D4AF37] tracking-widest uppercase bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30 font-semibold">
                    {exp.track}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[10px] text-gray-300">
                    <Calendar className="w-3 h-3 text-[#D4AF37]" />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                <h4 className="font-serif text-2xl font-bold text-white mb-0.5 heading-shadow">{exp.role}</h4>
                <div className="flex items-center gap-1.5 text-xs text-[#F5E4B5] mb-4 font-medium drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{exp.organization}</span>
                </div>

                <div className="flex flex-col gap-2.5 mb-4">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-200 font-light">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-300">
                <span className="flex items-center gap-1.5 text-[#F5E4B5]">
                  <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>AI/ML PIPELINES & AGENTIC APIS</span>
                </span>
                <span className="text-emerald-400 font-semibold">VERIFIED TRACK</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: BCA Degree & Academic Architecture */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <GraduationCap className="w-4 h-4 text-[#F5E4B5]" />
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider heading-shadow">
              Academic Degree Program
            </h3>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-hover flex-1 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif text-lg font-bold text-white heading-shadow">{education.degree}</h4>
                <span className="font-mono text-[9px] text-[#D4AF37] bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 font-semibold">
                  Active Scholar
                </span>
              </div>

              <p className="text-xs text-gray-200 mb-4 leading-relaxed font-light">
                {education.focus}
              </p>

              <div className="space-y-2 mb-4">
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-gray-200">
                  <div className="font-mono text-[10px] text-[#D4AF37] uppercase font-semibold mb-0.5">
                    Core Specializations
                  </div>
                  <span>Full-Stack Web Architecture, Relational Databases & Modern Python AI Frameworks</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/50 border border-white/10 text-xs text-gray-200">
                  <div className="font-mono text-[10px] text-[#D4AF37] uppercase font-semibold mb-0.5">
                    Applied Research
                  </div>
                  <span>Autonomous Software Agents, Model Context Protocol & System-Level Automation</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 font-mono text-[10px] text-gray-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{education.status}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Honors & Awards Registry — resume-ready summary mirrored from the honors section */}
      <div className="mt-5 glass-panel p-5 rounded-2xl border border-amber-500/25 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#D4AF37]" />
            <h3 className="font-serif text-sm font-bold text-white uppercase tracking-wider heading-shadow">
              Honors & Awards Registry
            </h3>
          </div>
          <span className="font-mono text-[9px] text-[#D4AF37] bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30 font-semibold tracking-wider">
            {achievementsList.length} VERIFIED CREDENTIALS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {achievementsList.map((item) => (
            <div
              key={item.id}
              className="flex items-baseline justify-between gap-3 border-b border-white/5 pb-1"
            >
              <span className="text-[11px] text-gray-200 font-light leading-snug">{item.title}</span>
              <span className="font-mono text-[9px] text-[#F5E4B5] font-semibold shrink-0 text-right">
                {item.result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
