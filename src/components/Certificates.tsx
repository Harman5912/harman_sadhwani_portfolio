import React, { useState } from 'react';
import { motion } from 'motion/react';
import { certificationsAndTrainingData } from '../data/certificates';
import {
  GlassSectionReveal,
  Interactive3DTiltCard,
  PixelScrambleText,
} from './GlassEffects';

export default function Certificates() {
  const [filterKind, setFilterKind] = useState<
    'All' | 'Certification' | 'Training'
  >('All');

  const filteredItems = certificationsAndTrainingData.filter((item) =>
    filterKind === 'All' ? true : item.kind === filterKind
  );

  return (
    <section className="py-16 max-w-7xl mx-auto px-5 md:px-8">
      <GlassSectionReveal>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="font-mono text-xs font-bold uppercase tracking-widest text-[#b8860b]">
              06D. Verified Credentials &amp; Specialized Coursework
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-black text-[#12110e] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Certifications &amp; <span className="gold-text">Training</span>
            </h2>
            <p className="text-sm sm:text-base text-[#12110e]/75 max-w-2xl">
              Clearly distinguishing formal technical certifications from
              structured domain training programs.
            </p>
          </div>

          <div
            className="flex items-center gap-1.5 border-2 border-[#12110e] bg-white p-1.5 shadow-[5px_5px_0px_#d4af37] self-start"
            role="group"
            aria-label="Filter by Certification or Training"
          >
            {(['All', 'Certification', 'Training'] as const).map((tab) => {
              const active = filterKind === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilterKind(tab)}
                  className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#12110e] text-[#fcf6b5] shadow-[2px_2px_0px_#d4af37]'
                      : 'text-[#12110e]/75 hover:bg-[#fcf6b5] hover:text-[#12110e]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, idx) => {
            const isCertification = item.kind === 'Certification';
            const barFill = isCertification ? 92 : 78;

            return (
              <Interactive3DTiltCard key={item.id} intensity={4}>
                <article className="h-full p-6 border-2 border-[#12110e] bg-white shadow-[6px_6px_0px_#12110e] hover:shadow-[8px_8px_0px_#d4af37] transition-all flex flex-col justify-between pixel-hover-streak">
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#12110e]/20 pb-2 font-mono text-xs">
                      <span
                        className={`font-bold ${
                          isCertification ? 'text-[#b8860b]' : 'text-[#12110e]'
                        }`}
                      >
                        {item.kind}
                      </span>
                      <span className="text-[#12110e]/70 tabular-nums">
                        0{idx + 1} · {item.domain}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-bold text-[#12110e]">
                      <PixelScrambleText text={item.title} />
                    </h3>

                    {item.provider && (
                      <p className="font-mono text-xs font-bold text-[#b8860b]">
                        Issued / Guided by: {item.provider}
                      </p>
                    )}

                    <p className="text-xs text-[#12110e]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative z-10 pt-4 mt-4 border-t-2 border-[#12110e] space-y-2">
                    <div
                      className="h-1.5 w-full border border-[#12110e] bg-[#f8f5ec] overflow-hidden"
                      aria-hidden="true"
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${barFill}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.04 }}
                        className="h-full pixel-sort-bar-h"
                      />
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px] text-[#12110e]/75">
                      <span>Track: {item.domain}</span>
                      <span className="font-bold text-[#12110e]">
                        {item.kind.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </article>
              </Interactive3DTiltCard>
            );
          })}
        </div>
      </GlassSectionReveal>
    </section>
  );
}
