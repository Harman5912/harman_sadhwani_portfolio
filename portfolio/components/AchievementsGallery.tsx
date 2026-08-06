"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MedalBadge from "./MedalBadge";

export interface Achievement {
  file: string;
  event: string;
  achievement: string;
  extras: string;
  badge: "gold" | "silver" | "participation";
  badgeLabel: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    file: "/c1.jpeg",
    event: "Exuberance'26 – Tech Expo",
    achievement: "First Runner-Up",
    extras: "Trophy · Blue Ribbon Medal",
    badge: "gold",
    badgeLabel: "1st",
  },
  {
    file: "/c2.jpeg",
    event: "ICHIS-2026",
    achievement: "Second Runner-Up – Poster Presentation",
    extras: 'Trophy · Poster: "Why AI Era Breaks Traditional Education?"',
    badge: "silver",
    badgeLabel: "2nd",
  },
  {
    file: "/c3.jpeg",
    event: "ICHIS-2026",
    achievement: "Poster Presentation Participation",
    extras: "International Conference",
    badge: "participation",
    badgeLabel: "Paper",
  },
  {
    file: "/c4.jpeg",
    event: "Hackathon 2.0 (Mar 2026)",
    achievement: "Participation",
    extras: "Blue Ribbon Medal",
    badge: "participation",
    badgeLabel: "Hack",
  },
  {
    file: "/c5.jpeg",
    event: "Internal Smart India Hackathon 2025",
    achievement: "Participation",
    extras: "SIH Internal Round",
    badge: "participation",
    badgeLabel: "SIH",
  },
  {
    file: "/c6.jpeg",
    event: "National Conference (Women Skill Development)",
    achievement: "Paper Presentation",
    extras: 'Paper: "Enhancing Women\'s Safety Using Technology" · Conference ID',
    badge: "participation",
    badgeLabel: "Paper",
  },
  {
    file: "/c7.jpeg",
    event: "Hackathon (20–22 Feb 2025)",
    achievement: "Participation",
    extras: "Participant ID Card",
    badge: "participation",
    badgeLabel: "Hack",
  },
  {
    file: "/c8.jpeg",
    event: "Hackofiesta 6.0 – AISpire UP Hackathon",
    achievement: "Participation",
    extras: "Yellow Ribbon Medal · Microsoft & Deloitte",
    badge: "participation",
    badgeLabel: "Hack",
  },
];

/** Ring rotation speed (deg per frame at 60fps ≈ 15°/s). */
const ROTATE_SPEED = 0.25;

const panelTween = { duration: 0.4, ease: "easeOut" as const };

export default function AchievementsGallery() {
  const count = ACHIEVEMENTS.length;
  const reduce = useReducedMotion();

  const [rotation, setRotation] = useState(0);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<Achievement | null>(null);
  const [stageW, setStageW] = useState(0);

  const stageRef = useRef<HTMLDivElement>(null);
  const base = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Measure the stage so the ring radius can adapt to the viewport.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageW(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Gentle autoplay — the ring turns while nothing is hovered.
  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      if (hoverId === null) {
        base.current = (base.current - ROTATE_SPEED + 360) % 360;
        setRotation(base.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, hoverId]);

  /** Rotate the ring so a neighbouring certificate faces the viewer. */
  const advance = useCallback(
    (delta: number) => {
      base.current = (base.current - delta * (360 / count) + 360) % 360;
      setRotation(base.current);
      setHoverId(null);
    },
    [count]
  );

  // Keyboard navigation.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't hijack arrow keys while the user is typing (chat widget, search…).
      const t = e.target as HTMLElement;
      if (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable) {
        return;
      }
      if (lightbox) {
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (e.key === "ArrowRight") advance(1);
      if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance, lightbox]);

  const radius = Math.min(Math.max(stageW * 0.32, 200), 340);
  const step = 360 / count;

  // Certificate currently facing the viewer, derived from the ring rotation.
  const frontIndex =
    Math.round((((-rotation % 360) + 360) % 360) / step) % count;
  const activeIndex = hoverId ?? frontIndex;
  const active = ACHIEVEMENTS[activeIndex];

  return (
    <section
      className="relative flex min-h-full items-center overflow-hidden bg-[linear-gradient(180deg,#faf9f6_0%,#f7f1e3_100%)] py-6 md:py-8"
    >
      <div className="pointer-events-none absolute -left-32 top-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-32 bottom-40 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Trophy Case"
          title={
            <>
              Achievements & <span className="gold-text">Certificates</span>
            </>
          }
          subtitle="A rotating ring of credentials — hover a certificate to focus it, or click it to view up close."
        />

        <div className="mt-5 grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10">
          {/* ── 3D rotating ring ── */}
          <div
            ref={stageRef}
            className="relative col-span-1 flex h-[300px] select-none items-center justify-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_45%,rgba(212,175,55,0.14),transparent_65%)] sm:h-[360px] lg:col-span-7"
            style={{ perspective: 1000 }}
          >
            <div
              className="relative h-[210px] w-[150px] sm:h-[260px] sm:w-[190px]"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${rotation}deg)`,
                transition:
                  hoverId !== null
                    ? "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
                    : "none",
              }}
            >
              {ACHIEVEMENTS.map((a, i) => {
                const angle = i * step;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={a.file}
                    type="button"
                    onMouseEnter={() => setHoverId(i)}
                    onMouseLeave={() => setHoverId(null)}
                    onClick={() => setLightbox(a)}
                    aria-label={`${a.event} — ${a.achievement}`}
                    className="absolute inset-0 cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-gold"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                      backfaceVisibility: "visible",
                      WebkitBackfaceVisibility: "visible",
                      zIndex: isActive ? 100 : 10,
                    }}
                  >
                    <div
                      className={`flex h-full w-full flex-col overflow-hidden rounded-xl border bg-white p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.16)] transition-all duration-500 sm:p-4 ${
                        isActive
                          ? "scale-110 border-gold shadow-[0_18px_40px_rgba(212,175,55,0.4)]"
                          : "border-gold/25 hover:border-gold/60"
                      }`}
                      style={{ transform: isActive ? "translateY(-10px)" : "none" }}
                    >
                      {isActive && (
                        <div className="pointer-events-none absolute inset-0 animate-pulse rounded-xl bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.18),transparent_70%)]" />
                      )}

                      {/* Card header */}
                      <div className="relative flex items-center justify-between gap-2">
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[9px] font-black tracking-wider ${
                            isActive
                              ? "border-gold/40 bg-gold/15 text-gold-deep"
                              : "border-gold/20 bg-gold/5 text-ink/45"
                          }`}
                        >
                          {a.badgeLabel}
                        </span>
                        <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-ink/40">
                          Verified ✦
                        </span>
                      </div>

                      {/* Certificate image */}
                      <div className="mt-2.5 flex-1 overflow-hidden rounded-lg border border-gold/15 bg-[#faf7ef]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- plain <img> inside the 3D ring */}
                        <img
                          src={a.file}
                          alt={`${a.event} certificate`}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      {/* Card footer */}
                      <div className="relative mt-2.5 flex items-center justify-between gap-2 border-t border-gold/20 pt-2">
                        <span className="truncate text-[9px] font-semibold text-gold-deep">
                          {a.event}
                        </span>
                        <span className="shrink-0 text-[8px] font-bold uppercase tracking-widest text-ink/35">
                          Certified
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Ambient glow behind the ring */}
            <div className="pointer-events-none absolute h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
          </div>

          {/* ── Info panel ── */}
          <div className="col-span-1 lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-2xl border border-gold/25 bg-white/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur md:p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -26 }}
                  transition={panelTween}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-deep">
                      ✦ {active.achievement}
                    </span>
                    <MedalBadge variant={active.badge} label={active.badgeLabel} />
                  </div>

                  <h3 className="font-display mt-4 text-xl font-bold leading-tight text-ink md:text-2xl">
                    {active.event}
                  </h3>

                  <div className="my-3 h-px w-14 bg-[linear-gradient(90deg,#d4af37,transparent)]" />

                  <p className="text-sm leading-relaxed text-ink/60 md:text-[15px]">
                    {active.extras}
                  </p>

                  {/* Quick navigation dots */}
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {ACHIEVEMENTS.map((a, i) => (
                        <button
                          key={a.file}
                          type="button"
                          onClick={() => advance(i - activeIndex)}
                          aria-label={`Show ${a.event}`}
                          className={`h-2 rounded-full transition-all duration-[400ms] ${
                            i === activeIndex
                              ? "w-7 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]"
                              : "w-2 bg-gold/30 hover:bg-gold/60"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-display text-sm font-bold tabular-nums tracking-[0.25em] text-ink/60">
                      {String(activeIndex + 1).padStart(2, "0")}
                      <span className="text-ink/30"> / {String(count).padStart(2, "0")}</span>
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-4 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-ink/40">
              Hover the ring to pause · Click a certificate to enlarge
            </p>
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.event} certificate`}
            data-fullpage-ignore
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm md:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, y: 26, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 26, opacity: 0 }}
              transition={panelTween}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border-2 border-gold/60 bg-white shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            >
              <div className="paper-texture max-h-[68vh] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element -- plain <img> inside the lightbox */}
                <img
                  src={lightbox.file}
                  alt={`${lightbox.event} certificate`}
                  className="mx-auto max-h-[68vh] w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gold/30 bg-white/95 px-6 py-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                    ✦ {lightbox.achievement}
                  </p>
                  <h3 className="font-display mt-1 text-xl font-bold text-ink">
                    {lightbox.event}
                  </h3>
                  <p className="mt-1 text-xs text-ink/55">{lightbox.extras}</p>
                </div>
                <MedalBadge variant={lightbox.badge} label={lightbox.badgeLabel} />
              </div>
              <button
                type="button"
                onClick={() => setLightbox(null)}
                aria-label="Close certificate"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-lg text-white backdrop-blur transition-all duration-300 hover:bg-black/75 active:scale-90"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
