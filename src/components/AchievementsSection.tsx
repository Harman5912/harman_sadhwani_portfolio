import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  achievementsList,
  achievementGroups,
  type AchievementGroup,
  type AchievementItem,
} from '../data/portfolioData';
import { Trophy, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Maximize2, Layers } from 'lucide-react';

interface AchievementsSectionProps {
  onSelectCertificate: (cert: {
    title: string;
    image: string;
    result: string;
    description: string;
  }) => void;
}

export default function AchievementsSection({ onSelectCertificate }: AchievementsSectionProps) {
  const [ringAngle, setRingAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeGroup, setActiveGroup] = useState<AchievementGroup | 'All'>('All');

  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const count = achievementsList.length; // 14 certificates
  const stepDeg = 360 / count;
  // Radius grows with the number of credentials so cards never intersect.
  const radius = Math.round(70 / Math.tan(Math.PI / count) + 18);

  // Auto-rotation loop (pauses while hovering)
  useEffect(() => {
    if (hoveredIndex !== null) return;

    const tick = () => {
      angleRef.current = (angleRef.current - 0.28 + 360) % 360;
      setRingAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredIndex]);

  // Determine which certificate is facing forward
  const frontIndex = Math.round((((-ringAngle % 360) + 360) % 360) / stepDeg) % count;
  const activeIndex = hoveredIndex ?? frontIndex;
  const activeCert = achievementsList[activeIndex] || achievementsList[0];

  const stepRing = useCallback(
    (direction: number) => {
      angleRef.current = (angleRef.current - stepDeg * direction + 360) % 360;
      setRingAngle(angleRef.current);
      setHoveredIndex(null);
    },
    [stepDeg]
  );

  const openCertificate = useCallback(
    (item: AchievementItem) => {
      onSelectCertificate({
        title: item.title,
        image: item.certificateRef,
        result: item.result,
        description: item.description,
      });
    },
    [onSelectCertificate]
  );

  const groupsToRender: AchievementGroup[] =
    activeGroup === 'All' ? achievementGroups : [activeGroup];

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-5 select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/40 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <Trophy className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>HONORS & AWARDS // 04</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase heading-shadow">
          Honors & <span className="text-gold-gradient">Certificates</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-1.5" />
        <p className="text-xs text-gray-300 mt-2">
          {count} verified certificates — hover to focus a credential, click any one to open the
          full-resolution view.
        </p>
      </div>

      {/* Main 12-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: 3D Rotating Ring of Certificates */}
        <div
          className="lg:col-span-7 relative h-[270px] sm:h-[310px] flex items-center justify-center overflow-hidden rounded-2xl glass-panel border border-amber-500/30 p-2 shadow-2xl"
          style={{ perspective: 1100 }}
        >
          {/* Rotating 3D Cylinder Container */}
          <div
            className="relative w-[128px] h-[168px] sm:w-[148px] sm:h-[192px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(-${radius}px) rotateY(${ringAngle}deg)`,
              transition:
                hoveredIndex !== null
                  ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'none',
            }}
          >
            {achievementsList.map((item, idx) => {
              const theta = idx * stepDeg;
              const isFocused = idx === activeIndex;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => {
                    setHoveredIndex(idx);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => openCertificate(item)}
                  className="absolute inset-0 cursor-pointer outline-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${theta}deg) translateZ(${radius}px)`,
                    backfaceVisibility: 'visible',
                    WebkitBackfaceVisibility: 'visible',
                    zIndex: isFocused ? 50 : 10,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-xl overflow-hidden p-2 flex flex-col justify-between transition-all duration-300 ${
                      isFocused
                        ? 'border-2 border-amber-400 bg-[#0E1017]/95 shadow-[0_0_30px_rgba(212,175,55,0.6)] scale-110'
                        : 'border border-white/20 bg-[#07080B]/90 opacity-80 hover:opacity-100'
                    }`}
                  >
                    {/* Top Ribbon */}
                    <div className="flex items-center justify-between text-[8px] font-mono pb-1 border-b border-white/10">
                      <span className="text-[#F5E4B5] font-bold">{item.badgeLabel}</span>
                      <span className="text-[#D4AF37]">CERTIFIED</span>
                    </div>

                    {/* Certificate Thumbnail */}
                    <div className="relative flex-1 my-1 rounded overflow-hidden border border-white/15 bg-black flex items-center justify-center">
                      <img
                        src={item.certificateRef}
                        alt={item.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain filter brightness-[1.02]"
                      />
                    </div>

                    {/* Footer Event */}
                    <div className="text-[8px] font-mono text-gray-300 truncate pt-1 border-t border-white/10">
                      {item.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls Overlay */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none">
            <button
              onClick={() => stepRing(-1)}
              className="pointer-events-auto p-1.5 rounded-full glass-panel hover:border-amber-400 text-gray-200 hover:text-white transition-colors"
              title="Previous Certificate"
            >
              <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
            </button>
            <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-amber-400/30 text-[9px] font-mono text-[#F5E4B5]">
              {activeIndex + 1} / {count}
            </div>
            <button
              onClick={() => stepRing(1)}
              className="pointer-events-auto p-1.5 rounded-full glass-panel hover:border-amber-400 text-gray-200 hover:text-white transition-colors"
              title="Next Certificate"
            >
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>

        {/* Right: Active Focused Certificate Details Plate */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/35 text-left flex flex-col justify-between h-[270px] sm:h-[310px] relative overflow-hidden shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-wider bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30 font-semibold">
                {activeCert.dateOrContext}
              </span>
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400 font-semibold">
                <ShieldCheck className="w-3 h-3" />
                <span>VERIFIED CREDENTIAL</span>
              </div>
            </div>

            <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-[#D4AF37]/80 mb-1">
              {activeCert.group}
            </span>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1 leading-snug heading-shadow">
              {activeCert.title}
            </h3>

            <p className="font-mono text-xs font-semibold text-[#F5E4B5] mb-3 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
              {activeCert.result}
            </p>

            <p className="text-xs text-gray-200 leading-relaxed font-light mb-4 line-clamp-4">
              {activeCert.description}
            </p>
          </div>

          <button
            onClick={() => openCertificate(activeCert)}
            className="self-start px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
          >
            <span>View Certificate</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Certificate Gallery — organized by achievement category */}
      <div className="mt-5">
        <div className="text-center max-w-xl mx-auto mb-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-white uppercase heading-shadow">
            Achievement <span className="text-gold-gradient">Archives</span>
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-1.5 mb-2.5" />
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <button
              onClick={() => {
                setActiveGroup('All');
              }}
              className={`px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider border transition-all ${
                activeGroup === 'All'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black border-[#F5E4B5] font-bold shadow-[0_0_14px_rgba(212,175,55,0.35)]'
                  : 'glass-pill border-amber-500/30 text-gray-300 hover:border-amber-400 hover:text-white'
              }`}
            >
              All · {count}
            </button>
            {achievementGroups.map((group) => {
              const groupCount = achievementsList.filter((a) => a.group === group).length;
              const isActive = activeGroup === group;
              return (
                <button
                  key={group}
                  onClick={() => {
                    setActiveGroup(group);
                  }}
                  className={`px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-wider border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black border-[#F5E4B5] font-bold shadow-[0_0_14px_rgba(212,175,55,0.35)]'
                      : 'glass-pill border-amber-500/30 text-gray-300 hover:border-amber-400 hover:text-white'
                  }`}
                >
                  {group} · {groupCount}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          {groupsToRender.map((group) => {
            const groupItems = achievementsList.filter((a) => a.group === group);
            if (!groupItems.length) return null;

            return (
              <div key={group}>
                <div className="flex items-center gap-2 mb-2 px-0.5">
                  <Layers className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <h4 className="font-serif text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] text-[#F5E4B5] whitespace-nowrap">
                    {group}
                  </h4>
                  <span className="font-mono text-[9px] text-gray-400 shrink-0">
                    {String(groupItems.length).padStart(2, '0')}
                  </span>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-400/40 via-amber-400/15 to-transparent" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {groupItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => openCertificate(item)}
                      className="group relative glass-panel rounded-xl border border-amber-500/25 hover:border-amber-400/70 overflow-hidden text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(0,0,0,0.75),0_0_22px_rgba(212,175,55,0.3)]"
                      title={`Open ${item.title}`}
                    >
                      <div className="relative aspect-[4/3] bg-black/70 flex items-center justify-center p-1">
                        <img
                          src={item.certificateRef}
                          alt={item.title}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain filter brightness-[1.02]"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Maximize2 className="w-4 h-4 text-[#F5E4B5]" />
                        </span>
                        <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-amber-400/40 font-mono text-[8px] text-[#F5E4B5] whitespace-nowrap">
                          {item.badgeLabel}
                        </span>
                      </div>
                      <div className="p-2 border-t border-white/10">
                        <p className="font-serif text-[11px] font-bold text-white leading-snug line-clamp-2">
                          {item.title}
                        </p>
                        <p className="font-mono text-[9px] text-[#F5E4B5] mt-1 truncate">{item.result}</p>
                        <p className="font-mono text-[8px] text-gray-400 mt-0.5 truncate">
                          {item.dateOrContext}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
