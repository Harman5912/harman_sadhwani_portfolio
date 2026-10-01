import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Award, Medal, Star, ShieldCheck, Briefcase } from 'lucide-react';
import { achievementsData, AchievementItem } from '../data/achievements';
import { certificationsAndTrainingData } from '../data/certificates';
import { portfolioData } from '../data/portfolio';
import { LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText, PixelTransitionPanel } from './GlassEffects';
import { RibbonMedalSVG } from './AchievementsGallery';

function BadgeEmblem({ type }: { type: AchievementItem['badgeType'] }) {
  if (type === 'trophy') return <Trophy className="w-4 h-4 text-[#b8860b]" />;
  if (type === 'medal') return <Medal className="w-4 h-4 text-[#b8860b]" />;
  if (type === 'ribbon') return <Award className="w-4 h-4 text-[#12110e]" />;
  return <Star className="w-4 h-4 text-[#d4af37]" />;
}

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<
    'honours' | 'credentials' | 'experience'
  >('honours');
  const [selectedHonourIdx, setSelectedHonourIdx] = useState<number>(0);

  const activeHonour =
    achievementsData[selectedHonourIdx] || achievementsData[0];
  const { experience } = portfolioData;

  return (
    <div className="w-full space-y-4">
      {/* Header + Separate Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
        <LuxurySectionHeading
          align="left"
          kicker="05. Honours, Awards & Credentials"
          title={
            <>
              Awards &amp; <span className="gold-text">Honour</span> Channels
            </>
          }
          subtitle="Verified competition awards, conference recognitions, technical certifications, and industry experience."
        />

        <div className="flex flex-wrap items-center gap-1.5 border-2 border-[#12110e] bg-white p-1.5 shadow-[4px_4px_0px_#d4af37]">
          {(
            [
              { id: 'honours', label: '01. Awards & Honours (08)' },
              { id: 'credentials', label: '02. Certifications & Training' },
              { id: 'experience', label: '03. Internship Experience' },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-colors cursor-pointer ${
                activeTab === t.id
                  ? 'bg-[#12110e] text-[#fcf6b5] shadow-[2px_2px_0px_#d4af37]'
                  : 'text-[#12110e]/75 hover:bg-[#fcf6b5] hover:text-[#12110e]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* In-Place Pixelating Panel */}
      <PixelTransitionPanel activeKey={activeTab}>
        {activeTab === 'honours' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Left 5-Col: 8 Certificate-Backed Honour Channels (Crown Code Terminal Agent removed) */}
            <div className="lg:col-span-5 border-2 border-[#12110e] bg-white p-3 shadow-[6px_6px_0px_#12110e] space-y-2">
              <div className="border-b-2 border-[#12110e] bg-[#12110e] px-3 py-1.5 font-mono text-xs font-bold text-[#fcf6b5] flex items-center justify-between">
                <span>HONOUR CHANNELS</span>
                <span className="text-[#d4af37]">
                  0{achievementsData.length} VERIFIED AWARDS
                </span>
              </div>

              <div className="space-y-1.5 max-h-[46vh] overflow-y-auto pr-1">
                {achievementsData.map((item, idx) => {
                  const isSelected = selectedHonourIdx === idx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedHonourIdx(idx)}
                      className={`w-full text-left p-2.5 border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        isSelected
                          ? 'border-2 border-[#12110e] bg-[#12110e] text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]'
                          : 'border-[#12110e]/30 bg-[#f8f5ec] text-[#12110e] hover:bg-[#fcf6b5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="inline-flex items-center justify-center w-6 h-6 border border-[#12110e] bg-[#fcf6b5] shrink-0">
                          <BadgeEmblem type={item.badgeType} />
                        </span>
                        <div className="min-w-0">
                          <p className="font-mono text-xs font-bold truncate">
                            0{idx + 1}. {item.title}
                          </p>
                          <p
                            className={`font-mono text-[10px] truncate ${
                              isSelected
                                ? 'text-[#d4af37]'
                                : 'text-[#12110e]/70'
                            }`}
                          >
                            {item.result} · {item.highlight}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 font-mono text-[10px] font-bold px-1.5 py-0.5 border ${
                          isSelected
                            ? 'border-[#d4af37] bg-[#d4af37] text-[#12110e]'
                            : 'border-[#12110e]/30 bg-white text-[#12110e]'
                        }`}
                      >
                        {item.badgeLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right 7-Col: Active Award & Certificate Dossier */}
            <div className="lg:col-span-7">
              <PixelTransitionPanel activeKey={activeHonour.id}>
                <div className="border-2 border-[#12110e] bg-white p-5 sm:p-6 shadow-[8px_8px_0px_#d4af37] space-y-4">
                  <div className="h-2 w-full pixel-sort-bar-h border border-[#12110e]" />

                  <div className="flex items-start justify-between gap-4 border-b-2 border-[#12110e] pb-3">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#b8860b]">
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {activeHonour.category} · {activeHonour.dateOrContext}
                        </span>
                      </div>
                      <h3 className="font-display mt-1 text-2xl font-black text-[#12110e]">
                        <PixelScrambleText text={activeHonour.title} />
                      </h3>
                    </div>

                    <RibbonMedalSVG
                      variant={activeHonour.badgeVariant}
                      label={activeHonour.badgeLabel}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-5 border-2 border-[#12110e] bg-[#f8f5ec] aspect-4/3 overflow-hidden shadow-[4px_4px_0px_#12110e]">
                      <img
                        src={activeHonour.certificateRef}
                        alt={activeHonour.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="sm:col-span-7 space-y-2.5">
                      <div className="inline-block border border-[#12110e] bg-[#fcf6b5] px-2.5 py-1 font-mono text-xs font-bold text-[#12110e]">
                        ✦ {activeHonour.result}
                      </div>
                      <p className="font-mono text-xs font-bold text-[#b8860b]">
                        {activeHonour.highlight}
                      </p>
                      <p className="text-xs sm:text-sm text-[#12110e]/80 leading-relaxed">
                        {activeHonour.description}
                      </p>
                    </div>
                  </div>
                </div>
              </PixelTransitionPanel>
            </div>
          </div>
        )}

        {activeTab === 'credentials' && (
          <div className="border-2 border-[#12110e] bg-white p-5 shadow-[8px_8px_0px_#d4af37]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto pr-1">
              {certificationsAndTrainingData.map((item, idx) => (
                <article
                  key={item.id}
                  className="p-4 border-2 border-[#12110e] bg-[#f8f5ec] shadow-[4px_4px_0px_#12110e] flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                      <span className="text-[#b8860b]">{item.kind}</span>
                      <span className="text-[#12110e]/70">
                        0{idx + 1} · {item.domain}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-bold text-[#12110e]">
                      {item.title}
                    </h3>
                    {item.provider && (
                      <p className="font-mono text-[11px] font-bold text-[#b8860b]">
                        {item.provider}
                      </p>
                    )}
                    <p className="text-xs text-[#12110e]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="border-2 border-[#12110e] bg-white p-6 shadow-[8px_8px_0px_#d4af37] space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#12110e] bg-[#12110e] px-5 py-3 font-mono text-xs font-bold text-[#fcf6b5]">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#d4af37]" />
                    <span>{exp.role}</span>
                    <span>·</span>
                    <span className="text-[#d4af37]">{exp.department}</span>
                  </div>
                  <span className="bg-[#d4af37] text-[#12110e] px-2.5 py-0.5">
                    {exp.duration}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {exp.highlights.map((pt, i) => (
                    <div
                      key={pt}
                      className="border-2 border-[#12110e] bg-[#f8f5ec] p-4 shadow-[4px_4px_0px_#12110e] space-y-2"
                    >
                      <span className="font-mono text-xs font-bold bg-[#12110e] text-[#fcf6b5] px-2 py-0.5">
                        STRATA 0{i + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-[#12110e] leading-relaxed">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </PixelTransitionPanel>
    </div>
  );
}
