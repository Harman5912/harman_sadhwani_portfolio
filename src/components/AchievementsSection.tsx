import React, { useState, useEffect, useRef, useCallback } from 'react';
import { achievementsList } from '../data/portfolioData';
import { Trophy, ChevronLeft, ChevronRight, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AchievementsSectionProps {
  onSelectCertificate: (cert: { title: string; image: string; result: string; description: string }) => void;
}

export default function AchievementsSection({ onSelectCertificate }: AchievementsSectionProps) {
  const [ringAngle, setRingAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const count = achievementsList.length; // 8 certificates
  const stepDeg = 360 / count; // 45 deg per certificate

  // 60 FPS Auto-Rotation Loop (pauses when hovering)
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
  const frontIndex = Math.round(((-ringAngle % 360) + 360) % 360 / stepDeg) % count;
  const activeIndex = hoveredIndex ?? frontIndex;
  const activeCert = achievementsList[activeIndex] || achievementsList[0];

  const stepRing = useCallback(
    (direction: number) => {
      soundFx.playClickPulse();
      angleRef.current = (angleRef.current - stepDeg * direction + 360) % 360;
      setRingAngle(angleRef.current);
      setHoveredIndex(null);
    },
    [stepDeg]
  );

  return (
    <div className="w-full max-w-5xl mx-auto py-3 sm:py-5 select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/40 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-1.5 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
          <Trophy className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>CREDENTIAL VAULT // 04</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Honors & <span className="text-gold-gradient">Certificates</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-1.5" />
        <p className="text-xs text-gray-400 mt-2">
          Interactive 3D rotating cylinder — hover to focus, click to zoom full certificate proof.
        </p>
      </div>

      {/* Main 12-Column Layout: Left 7-Col 3D Rotating Cylinder + Right 5-Col Active Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left: 3D Rotating Ring of 8 Certificates */}
        <div
          className="lg:col-span-7 relative h-[270px] sm:h-[310px] flex items-center justify-center overflow-hidden rounded-2xl glass-panel border border-amber-500/25 p-2"
          style={{ perspective: 1100 }}
        >
          {/* Subtle Ambient Radial Light */}
          <div className="absolute w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Rotating 3D Cylinder Container */}
          <div
            className="relative w-[150px] h-[190px] sm:w-[170px] sm:h-[220px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${ringAngle}deg)`,
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
                    soundFx.playHoverChime();
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => {
                    soundFx.playClickPulse();
                    onSelectCertificate({
                      title: item.title,
                      image: item.certificateRef,
                      result: item.result,
                      description: item.description,
                    });
                  }}
                  className="absolute inset-0 cursor-pointer outline-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${theta}deg) translateZ(240px)`,
                    backfaceVisibility: 'visible',
                    WebkitBackfaceVisibility: 'visible',
                    zIndex: isFocused ? 50 : 10,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-xl overflow-hidden p-2 flex flex-col justify-between transition-all duration-300 ${
                      isFocused
                        ? 'border-2 border-amber-400 bg-[#0E1017]/95 shadow-[0_0_30px_rgba(212,175,55,0.6)] scale-110'
                        : 'border border-white/20 bg-[#07080B]/85 opacity-75 hover:opacity-100'
                    }`}
                  >
                    {/* Top Ribbon */}
                    <div className="flex items-center justify-between text-[8px] font-mono pb-1 border-b border-white/10">
                      <span className="text-[#F5E4B5] font-bold">
                        {item.badgeLabel}
                      </span>
                      <span className="text-[#D4AF37]">✦ VERIFIED</span>
                    </div>

                    {/* Certificate Thumbnail */}
                    <div className="relative flex-1 my-1 rounded overflow-hidden border border-white/15 bg-black">
                      <img
                        src={item.certificateRef}
                        alt={item.title}
                        className="w-full h-full object-cover filter brightness-[1.02]"
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
              className="pointer-events-auto p-1.5 rounded-full glass-panel hover:border-amber-400 text-gray-300 hover:text-white transition-colors"
              title="Previous Certificate"
            >
              <ChevronLeft className="w-4 h-4 text-[#D4AF37]" />
            </button>
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-[9px] font-mono text-[#F5E4B5]">
              {activeIndex + 1} / {count} · ROTATING RING
            </div>
            <button
              onClick={() => stepRing(1)}
              className="pointer-events-auto p-1.5 rounded-full glass-panel hover:border-amber-400 text-gray-300 hover:text-white transition-colors"
              title="Next Certificate"
            >
              <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>

        {/* Right: Active Focused Certificate Details Plate */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl border border-amber-500/30 text-left flex flex-col justify-between h-[270px] sm:h-[310px] relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-[#D4AF37] uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                {activeCert.dateOrContext}
              </span>
              <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                <span>OFFICIAL ACCREDITATION</span>
              </div>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1 leading-snug">
              {activeCert.title}
            </h3>

            <p className="font-mono text-xs font-semibold text-[#F5E4B5] mb-3">
              {activeCert.result}
            </p>

            <p className="text-xs text-gray-300 leading-relaxed font-light mb-4 line-clamp-4">
              {activeCert.description}
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClickPulse();
              onSelectCertificate({
                title: activeCert.title,
                image: activeCert.certificateRef,
                result: activeCert.result,
                description: activeCert.description,
              });
            }}
            className="self-start px-5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
          >
            <span>Zoom High-Res Proof</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
