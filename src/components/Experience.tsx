import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { GlassSectionReveal, PixelScrambleText } from './GlassEffects';

export default function Experience() {
  const { experience } = portfolioData;
  const [activePointIdx, setActivePointIdx] = useState<number>(0);

  return (
    <section id="experience" className="py-16 max-w-7xl mx-auto px-5 md:px-8">
      <GlassSectionReveal>
        <div className="space-y-2 mb-10">
          <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#b8860b]">
            06E. Professional &amp; Technical Experience
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-black text-[#12110e] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Experience <span className="gold-text">Log</span>
          </h2>
          <p className="text-sm sm:text-base text-[#12110e]/75 max-w-2xl">
            Applied industry experience in full-stack software engineering and
            AI/ML integration.
          </p>
        </div>

        <div className="space-y-8">
          {experience.map((exp) => (
            <article
              key={exp.id}
              className="relative border-2 border-[#12110e] bg-white shadow-[8px_8px_0px_#d4af37] overflow-hidden"
            >
              <div className="h-2 w-full pixel-sort-bar-h border-b-2 border-[#12110e]" />

              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#12110e] bg-[#12110e] px-6 py-3 font-mono text-xs font-bold text-[#fcf6b5]">
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[#d4af37]" />
                  <span>{exp.department}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#d4af37]">{exp.statusNote}</span>
                </div>
                <span className="bg-[#d4af37] text-[#12110e] px-2.5 py-0.5">
                  Duration: {exp.duration}
                </span>
              </div>

              <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pixel-matrix-bg">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-[#12110e]">
                    <PixelScrambleText text={exp.role} />
                  </h3>

                  <p className="text-xs font-mono text-[#12110e]/75 leading-relaxed">
                    Interactive Engineering Strata — hover or click any
                    milestone on the right to inspect its pixel-sorted signal
                    band.
                  </p>

                  {/* Quantized 4-Month Sprint Bar */}
                  <div className="border-2 border-[#12110e] bg-[#f8f5ec] p-4 space-y-2 shadow-[4px_4px_0px_#12110e]">
                    <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#12110e]">
                      <span>4-MONTH SPRINT TELEMETRY</span>
                      <span className="text-[#b8860b]">100% VERIFIED</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5" aria-hidden="true">
                      {['M.01', 'M.02', 'M.03', 'M.04'].map((m, i) => (
                        <div
                          key={m}
                          className="border border-[#12110e] bg-white p-1.5 text-center"
                        >
                          <div className="h-2 w-full bg-[#d4af37] mb-1" />
                          <span className="font-mono text-[10px] font-bold text-[#12110e]">
                            {m}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-2.5">
                  {exp.highlights.map((point, idx) => {
                    const isActive = activePointIdx === idx;
                    return (
                      <motion.div
                        key={point}
                        onMouseEnter={() => setActivePointIdx(idx)}
                        onClick={() => setActivePointIdx(idx)}
                        className={`p-4 border-2 border-[#12110e] transition-all cursor-pointer flex items-start gap-3.5 ${
                          isActive
                            ? 'bg-[#12110e] text-[#fcf6b5] shadow-[5px_5px_0px_#d4af37]'
                            : 'bg-white text-[#12110e] hover:bg-[#fcf6b5]'
                        }`}
                      >
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 border ${
                            isActive
                              ? 'border-[#d4af37] bg-[#d4af37] text-[#12110e]'
                              : 'border-[#12110e] bg-[#f8f5ec] text-[#12110e]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span className="text-sm leading-relaxed">{point}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </GlassSectionReveal>
    </section>
  );
}
