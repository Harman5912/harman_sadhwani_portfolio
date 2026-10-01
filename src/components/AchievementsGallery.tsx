import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Award,
} from 'lucide-react';
import { certificateGalleryData, CertificateAsset } from '../data/certificates';
import { GoldenSunIcon, LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText, PixelTransitionPanel } from './GlassEffects';

const BADGE_PALETTES = {
  gold: { ribbon: '#b8860b', circle: '#d4af37', star: '#12110e' },
  silver: { ribbon: '#475569', circle: '#cbd5e1', star: '#12110e' },
  participation: { ribbon: '#2563eb', circle: '#e8c15a', star: '#12110e' },
};

export function RibbonMedalSVG({
  variant,
  label,
}: {
  variant: 'gold' | 'silver' | 'participation';
  label: string;
}) {
  const pal = BADGE_PALETTES[variant];

  return (
    <div className="flex flex-col items-center shrink-0" title={label}>
      <svg
        width="36"
        height="46"
        viewBox="0 0 36 46"
        aria-hidden="true"
        shapeRendering="crispEdges"
      >
        <rect x="6" y="20" width="8" height="22" fill={pal.ribbon} />
        <rect x="22" y="20" width="8" height="22" fill={pal.ribbon} />
        <rect x="14" y="20" width="8" height="16" fill={pal.ribbon} />
        <rect
          x="4"
          y="2"
          width="28"
          height="24"
          fill={pal.circle}
          stroke="#12110e"
          strokeWidth="2"
        />
        <rect x="16" y="6" width="4" height="16" fill={pal.star} />
        <rect x="10" y="12" width="16" height="4" fill={pal.star} />
      </svg>
      <span
        className="mt-0.5 border border-[#12110e] px-1.5 py-px font-mono text-[8px] font-bold uppercase tracking-widest text-white"
        style={{ background: pal.ribbon }}
      >
        {label}
      </span>
    </div>
  );
}

function CertificateVisualPlate({
  cert,
  index,
  inModal = false,
}: {
  cert: CertificateAsset;
  index: number;
  inModal?: boolean;
}) {
  const [imageError, setImageError] = useState(false);

  if (!imageError) {
    return (
      <img
        src={cert.file}
        alt={`${cert.event} — ${cert.achievement}`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setImageError(true)}
        className={`w-full h-full ${
          inModal ? 'object-contain max-h-[66vh]' : 'object-contain'
        }`}
      />
    );
  }

  return (
    <div
      className={`w-full h-full ${
        inModal ? 'min-h-[340px] p-8' : 'p-4'
      } bg-[#f8f5ec] pixel-matrix-bg flex flex-col justify-between relative overflow-hidden`}
    >
      <div
        className="pointer-events-none absolute -right-6 -bottom-6 opacity-25"
        aria-hidden="true"
      >
        <GoldenSunIcon size={inModal ? 140 : 80} />
      </div>

      <div className="flex items-center justify-between border-b border-[#12110e] pb-2 z-10">
        <div className="flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-[#b8860b]" />
          <span className="font-mono text-[10px] font-bold uppercase text-[#12110e]">
            CERT_0{index + 1}
          </span>
        </div>
        <span className="font-mono text-[10px] font-bold text-[#b8860b]">
          {cert.badgeLabel}
        </span>
      </div>

      <div className="my-auto py-2 space-y-1 z-10">
        <div className="font-mono text-[10px] font-bold text-[#b8860b]">
          {cert.achievement}
        </div>
        <h4 className="font-display text-sm font-black text-[#12110e] leading-snug">
          {cert.event}
        </h4>
        <p className="text-[11px] text-[#12110e]/75">{cert.extra}</p>
      </div>
    </div>
  );
}

export default function AchievementsGallery() {
  const [ringAngle, setRingAngle] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxCert, setLightboxCert] = useState<CertificateAsset | null>(
    null
  );
  const angleRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const count = certificateGalleryData.length;
  const stepDeg = 360 / count;

  // Auto-rotate 3D ring when not hovered or in modal (exact live site behavior)
  useEffect(() => {
    if (hoveredIndex !== null || lightboxCert !== null) return;
    const tick = () => {
      angleRef.current = (angleRef.current - 0.22 + 360) % 360;
      setRingAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hoveredIndex, lightboxCert]);

  const frontIndex = Math.round(((-ringAngle % 360) + 360) % 360 / stepDeg) % count;
  const activeIndex = hoveredIndex ?? frontIndex;
  const activeCert = certificateGalleryData[activeIndex];

  const stepBy = useCallback(
    (delta: number) => {
      angleRef.current = (angleRef.current - stepDeg * delta + 360) % 360;
      setRingAngle(angleRef.current);
      setHoveredIndex(null);
    },
    [stepDeg]
  );

  return (
    <div className="w-full space-y-5">
      <LuxurySectionHeading
        kicker="05. Achievements & Certificates"
        title={
          <>
            Achievements &amp; <span className="gold-text">Certificates</span>
          </>
        }
        subtitle="A rotating ring of credentials from Harman's portfolio — hover a certificate to focus it, or click it to view up close."
      />

      {/* Exact Live Portfolio 12-Col Split: 7-Col 3D Rotating Ring + 5-Col Active Credential Card */}
      <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Left 7-Col: 3D Rotating Ring of 8 Certificates */}
        <div
          className="relative col-span-1 flex h-[290px] sm:h-[340px] select-none items-center justify-center overflow-hidden border-2 border-[#12110e] bg-white pixel-matrix-bg shadow-[8px_8px_0px_#12110e] lg:col-span-7"
          style={{ perspective: 1000 }}
        >
          <div
            className="relative h-[200px] w-[150px] sm:h-[235px] sm:w-[178px]"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${ringAngle}deg)`,
              transition:
                hoveredIndex !== null
                  ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'none',
            }}
          >
            {certificateGalleryData.map((cert, idx) => {
              const theta = idx * stepDeg;
              const isFocused = idx === activeIndex;
              return (
                <button
                  key={cert.id}
                  type="button"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setLightboxCert(cert)}
                  aria-label={`${cert.event} — ${cert.achievement}`}
                  className="absolute inset-0 cursor-pointer outline-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${theta}deg) translateZ(250px)`,
                    backfaceVisibility: 'visible',
                    WebkitBackfaceVisibility: 'visible',
                    zIndex: isFocused ? 100 : 10,
                  }}
                >
                  <div
                    className={`flex h-full w-full flex-col overflow-hidden border-2 bg-white p-2.5 transition-all duration-300 ${
                      isFocused
                        ? 'scale-108 border-[#12110e] shadow-[6px_6px_0px_#d4af37]'
                        : 'border-[#12110e]/60 shadow-[3px_3px_0px_#12110e]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 border-b border-[#12110e]/20 pb-1">
                      <span
                        className={`border px-1.5 py-0.5 font-mono text-[9px] font-black tracking-wider ${
                          isFocused
                            ? 'border-[#12110e] bg-[#d4af37] text-[#12110e]'
                            : 'border-[#12110e]/30 bg-[#f8f5ec] text-[#12110e]/70'
                        }`}
                      >
                        {cert.badgeLabel}
                      </span>
                      <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-[#b8860b]">
                        Verified ✦
                      </span>
                    </div>

                    <div className="mt-1.5 flex-1 overflow-hidden border border-[#12110e]/25 bg-[#f8f5ec]">
                      <CertificateVisualPlate cert={cert} index={idx} />
                    </div>

                    <div className="mt-1.5 flex items-center justify-between gap-1 border-t border-[#12110e]/20 pt-1">
                      <span className="truncate font-mono text-[9px] font-bold text-[#12110e]">
                        {cert.event}
                      </span>
                      <span className="shrink-0 font-mono text-[8px] font-bold uppercase text-[#b8860b]">
                        Certified
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Ring Controls Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              onClick={() => stepBy(-1)}
              className="pointer-events-auto border-2 border-[#12110e] bg-white p-1.5 text-[#12110e] shadow-[3px_3px_0px_#d4af37] hover:bg-[#fcf6b5] cursor-pointer"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="border border-[#12110e] bg-white/95 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#12110e]">
              Hover ring to focus · Click to enlarge
            </span>
            <button
              type="button"
              onClick={() => stepBy(1)}
              className="pointer-events-auto border-2 border-[#12110e] bg-white p-1.5 text-[#12110e] shadow-[3px_3px_0px_#d4af37] hover:bg-[#fcf6b5] cursor-pointer"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right 5-Col: Active Certificate Pixel-Sorted Detail Card */}
        <div className="col-span-1 lg:col-span-5">
          <div className="border-2 border-[#12110e] bg-white p-6 shadow-[8px_8px_0px_#d4af37]">
            <div className="h-2 w-full pixel-sort-bar-h mb-5 border border-[#12110e]" />

            <PixelTransitionPanel activeKey={activeCert.id}>
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center border-2 border-[#12110e] bg-[#fcf6b5] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#12110e] shadow-[3px_3px_0px_#12110e]">
                    ✦ {activeCert.achievement}
                  </span>
                  <RibbonMedalSVG
                    variant={activeCert.badge}
                    label={activeCert.badgeLabel}
                  />
                </div>

                <h3 className="font-display text-2xl font-black leading-tight text-[#12110e]">
                  <PixelScrambleText text={activeCert.event} />
                </h3>

                <div className="h-1 w-20 pixel-sort-bar-h border border-[#12110e]" />

                <p className="text-sm leading-relaxed text-[#12110e]/80 font-medium">
                  {activeCert.extra}
                </p>

                <div className="pt-3 border-t-2 border-[#12110e] flex items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {certificateGalleryData.map((cert, idx) => (
                      <button
                        key={cert.id}
                        type="button"
                        onClick={() => setHoveredIndex(idx)}
                        aria-label={`Show ${cert.event}`}
                        className={`h-2.5 border border-[#12110e] transition-all cursor-pointer ${
                          idx === activeIndex
                            ? 'w-7 bg-[#d4af37]'
                            : 'w-2.5 bg-[#f8f5ec] hover:bg-[#fcf6b5]'
                        }`}
                      />
                    ))}
                  </div>

                  <span className="font-mono text-xs font-bold tabular-nums tracking-widest text-[#12110e]">
                    {String(activeIndex + 1).padStart(2, '0')} /{' '}
                    {String(count).padStart(2, '0')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxCert(activeCert)}
                  className="btn-gold sheen w-full py-2.5 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Full Certificate</span>
                </button>
              </div>
            </PixelTransitionPanel>
          </div>
        </div>
      </div>

      {/* Fullscreen Certificate Modal */}
      <AnimatePresence>
        {lightboxCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightboxCert.event} certificate`}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-[#12110e]/85 p-4 backdrop-blur-md md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden border-2 border-[#12110e] bg-white shadow-[12px_12px_0px_#d4af37]"
            >
              <div className="h-2 w-full pixel-sort-bar-h border-b-2 border-[#12110e]" />

              <div className="paper-texture max-h-[62vh] overflow-hidden bg-[#f8f5ec] p-4 flex items-center justify-center">
                <img
                  src={lightboxCert.file}
                  alt={`${lightboxCert.event} certificate`}
                  className="mx-auto max-h-[58vh] w-full object-contain border border-[#12110e]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-[#12110e] bg-white px-6 py-4">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#b8860b]">
                    ✦ {lightboxCert.achievement}
                  </p>
                  <h3 className="font-display mt-0.5 text-xl font-black text-[#12110e]">
                    {lightboxCert.event}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#12110e]/75">
                    {lightboxCert.extra}
                  </p>
                </div>

                <RibbonMedalSVG
                  variant={lightboxCert.badge}
                  label={lightboxCert.badgeLabel}
                />
              </div>

              <button
                type="button"
                onClick={() => setLightboxCert(null)}
                aria-label="Close certificate"
                className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center border-2 border-[#12110e] bg-[#12110e] text-[#fcf6b5] hover:bg-[#d4af37] hover:text-[#12110e] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
