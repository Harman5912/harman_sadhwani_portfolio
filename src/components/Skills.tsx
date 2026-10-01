import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Layers } from 'lucide-react';
import { skillCategories, SkillCategory, SkillNode } from '../data/skills';
import { LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText, PixelTransitionPanel } from './GlassEffects';

export default function Skills() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('ai');
  const [sortMode, setSortMode] = useState<'luminance' | 'alpha' | 'density'>(
    'luminance'
  );
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(
    skillCategories.find((c) => c.id === 'ai')?.skills[0] || null
  );

  const activeCategory: SkillCategory =
    skillCategories.find((c) => c.id === activeCategoryId) ||
    skillCategories[0];

  const handleCategoryChange = (cat: SkillCategory) => {
    setActiveCategoryId(cat.id);
    setSelectedSkill(cat.skills[0] || null);
  };

  const sortedSkillsWithMetrics = useMemo(() => {
    const mapped = activeCategory.skills.map((skill, idx) => {
      const charSum = skill.name
        .split('')
        .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
      const lumScore = 58 + ((charSum * 7 + idx * 13) % 42);
      const voxelCount = 6 + (charSum % 7);
      return {
        skill,
        lumScore,
        voxelCount,
        originalIndex: idx,
      };
    });

    if (sortMode === 'alpha') {
      return [...mapped].sort((a, b) =>
        a.skill.name.localeCompare(b.skill.name)
      );
    }
    if (sortMode === 'luminance') {
      return [...mapped].sort((a, b) => b.lumScore - a.lumScore);
    }
    return [...mapped].sort((a, b) => b.voxelCount - a.voxelCount);
  }, [activeCategory, sortMode]);

  return (
    <div className="w-full space-y-3.5">
      {/* Header + Pixel-Sort Mode Switcher (Adjacent Row) */}
      <div className="flex flex-row items-end justify-between gap-3 flex-wrap">
        <LuxurySectionHeading
          align="left"
          kicker="02 // PIXEL_SORTED_EQUALIZER"
          title={
            <>
              Skill <span className="gold-text">Spectrum</span> Matrix
            </>
          }
          subtitle="Interactive pixel-sorted spectral equalizer & voxel heatmap across 7 core engineering domains."
        />

        {/* Pixel-Sort Order Switcher */}
        <div className="flex items-center gap-1.5 border-2 border-[#12110e] bg-white px-3 py-1.5 shadow-[4px_4px_0px_#12110e] shrink-0">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#b8860b]" />
          <span className="font-mono text-[10px] font-bold text-[#12110e] uppercase">
            SORT_BY:
          </span>
          {(
            [
              { id: 'luminance', label: 'LUMINANCE' },
              { id: 'density', label: 'DENSITY' },
              { id: 'alpha', label: 'LEXICAL' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSortMode(m.id)}
              className={`px-2 py-1 font-mono text-[10px] font-bold uppercase cursor-pointer transition-colors ${
                sortMode === m.id
                  ? 'bg-[#d4af37] text-[#12110e]'
                  : 'text-[#12110e]/65 hover:text-[#12110e]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 7-Domain Selector Bar (Adjacent Horizontal Strip) */}
      <div
        className="grid grid-cols-7 gap-1 border-2 border-[#12110e] bg-white p-1.5 shadow-[5px_5px_0px_#d4af37]"
        role="tablist"
        aria-label="Skill categories"
      >
        {skillCategories.map((category, idx) => {
          const active = category.id === activeCategoryId;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => handleCategoryChange(category)}
              className={`px-2 py-1.5 font-mono text-[10px] sm:text-xs font-bold uppercase transition-colors truncate text-center cursor-pointer ${
                active
                  ? 'bg-[#12110e] text-[#fcf6b5] shadow-[2px_2px_0px_#d4af37]'
                  : 'bg-[#f8f5ec] text-[#12110e]/80 hover:bg-[#fcf6b5] hover:text-[#12110e]'
              }`}
            >
              <span className="text-[#d4af37] mr-1">0{idx + 1}/</span>
              <span>{category.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Adjacent 12-Column Matrix: Left 8-Col Equalizer + Right 4-Col Inspector (Adjacent in EVERY Mode!) */}
      <PixelTransitionPanel
        activeKey={`${activeCategoryId}-${sortMode}`}
        className="w-full"
      >
        <div className="grid grid-cols-12 gap-4 items-stretch w-full">
          {/* Left 8 Columns: Vertical Pixel-Sorted Equalizer Columns & Voxel Matrix */}
          <div className="col-span-8 border-2 border-[#12110e] bg-white p-4 sm:p-5 shadow-[6px_6px_0px_#12110e] flex flex-col justify-between">
            <div>
              {/* Header Telemetry */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-3.5 border-b-2 border-[#12110e]">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#12110e] text-[#fcf6b5] font-mono text-[10px] font-bold uppercase">
                    CHANNEL // {activeCategory.id.toUpperCase()}
                  </span>
                  <h3 className="font-display text-base sm:text-lg font-black text-[#12110e]">
                    {activeCategory.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-bold text-[#b8860b]">
                  {sortedSkillsWithMetrics.length} SORTED VOXEL NODES · MODE:{' '}
                  {sortMode.toUpperCase()}
                </span>
              </div>

              {/* Interactive Adjacent Vertical Pixel-Sorted Columns (4 Columns per Row) */}
              <div className="grid grid-cols-4 gap-2.5 mb-3.5">
                {sortedSkillsWithMetrics.map(
                  ({ skill, lumScore, voxelCount }) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <button
                        key={skill.name}
                        type="button"
                        onClick={() => setSelectedSkill(skill)}
                        onMouseEnter={() => setSelectedSkill(skill)}
                        className={`group relative flex flex-col justify-between border-2 border-[#12110e] p-2.5 text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#12110e] text-[#fcf6b5] shadow-[4px_4px_0px_#d4af37]'
                            : 'bg-[#f8f5ec] text-[#12110e] hover:bg-[#fcf6b5]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-mono text-[9px] font-bold mb-1.5">
                          <span
                            className={
                              isSelected ? 'text-[#d4af37]' : 'text-[#b8860b]'
                            }
                          >
                            LUM:{lumScore}
                          </span>
                          <span>VX:{voxelCount}</span>
                        </div>

                        {/* Vertical Pixel-Sort Stack Bar */}
                        <div className="h-14 w-full border border-[#12110e] bg-white p-1 flex items-end gap-0.5 mb-2">
                          {Array.from({ length: 6 }).map((_, barIdx) => {
                            const barH = Math.max(
                              25,
                              (lumScore + barIdx * 11) % 100
                            );
                            return (
                              <div
                                key={barIdx}
                                style={{ height: `${barH}%` }}
                                className="flex-1 pixel-sort-bar-v border-t border-[#12110e]"
                              />
                            );
                          })}
                        </div>

                        <div>
                          <span className="block font-display text-xs font-black leading-tight truncate">
                            {skill.name}
                          </span>
                          <span
                            className={`mt-0.5 block font-mono text-[8px] uppercase truncate ${
                              isSelected
                                ? 'text-[#fcf6b5]/75'
                                : 'text-[#12110e]/60'
                            }`}
                          >
                            {skill.context}
                          </span>
                        </div>
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <p className="font-mono text-[11px] text-[#12110e]/75 border-t border-[#12110e]/20 pt-2">
              {activeCategory.subtitle}
            </p>
          </div>

          {/* Right 4 Columns: Active Voxel Node Telemetry Inspector (Always Adjacent to Spectrum Matrix) */}
          <div className="col-span-4 border-2 border-[#12110e] bg-[#12110e] text-[#fcf6b5] p-4 sm:p-5 shadow-[6px_6px_0px_#d4af37] flex flex-col justify-between">
            {selectedSkill ? (
              <PixelTransitionPanel
                activeKey={selectedSkill.name}
                className="h-full w-full"
              >
                <div className="space-y-3.5 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#fcf6b5]/20 pb-2 font-mono text-[10px]">
                      <span className="text-[#d4af37] font-bold">
                        █▓▒░ NODE_INSPECTOR
                      </span>
                      <span className="bg-[#d4af37] text-[#12110e] px-2 py-0.5 font-bold">
                        ACTIVE
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4af37]">
                        {activeCategory.title}
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-black text-white mt-0.5">
                        <PixelScrambleText text={selectedSkill.name} />
                      </h4>
                    </div>

                    <div className="inline-flex items-center gap-2 border border-[#d4af37] bg-[#fcf6b5]/10 px-2.5 py-1 font-mono text-[10px] font-bold text-[#fcf6b5]">
                      <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>{activeCategory.title}</span>
                    </div>

                    <div className="border border-[#fcf6b5]/25 bg-black/40 p-3.5 space-y-1.5">
                      <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">
                        PRODUCTION &amp; PROJECT APPLICATION
                      </div>
                      <p className="text-xs leading-relaxed text-[#fcf6b5]/90">
                        {selectedSkill.context}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Voxel Equalizer Strip */}
                  <div className="pt-3 border-t border-[#fcf6b5]/20">
                    <div className="flex items-center justify-between font-mono text-[9px] text-[#d4af37] mb-1.5">
                      <span>SIGNAL_INTEGRITY</span>
                      <span>98.4% LOCKED</span>
                    </div>
                    <div className="grid grid-cols-12 gap-1 h-4">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-full ${
                            i < 10 ? 'bg-[#d4af37]' : 'bg-[#fcf6b5]/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </PixelTransitionPanel>
            ) : null}
          </div>
        </div>
      </PixelTransitionPanel>
    </div>
  );
}
