"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import type { Project } from "./ProjectShowcase";

interface Props {
  project: Project;
  index: number;
  total: number;
  /** "carousel" = horizontal snap swipe; "flow" = vertical stack */
  variant: "carousel" | "flow";
  /** For the carousel: only the snapped card's video plays. */
  active: boolean;
}

/** Compact light card — the mobile/tablet face of a project, distinct from the desktop showcase. */
export default function ProjectCard({ project, index, total, variant, active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const wantPlayRef = useRef(false);
  const [selfInView, setSelfInView] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setSelfInView(entry.isIntersecting), {
      threshold: 0.25,
      rootMargin: "120px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Lazy playback: snapped card in the carousel, or any card in view in the stack.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const should = variant === "carousel" ? active && selfInView : selfInView;
    wantPlayRef.current = should;
    if (should) {
      v.play()
        .then(() => {
          if (!wantPlayRef.current) v.pause();
        })
        .catch(() => {});
    } else {
      v.pause();
    }
  }, [active, variant, selfInView]);

  return (
    <motion.div
      ref={rootRef}
      data-pcard
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.65,
        delay: variant === "flow" ? index * 0.08 : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white shadow-[0_24px_70px_rgba(0,0,0,0.4)]"
      aria-label={`${project.title} — project ${project.num}`}
    >
      {/* Video header */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden">
        <video
          ref={videoRef}
          src={project.video}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(23,19,16,0.35)_0%,transparent_45%,rgba(23,19,16,0.6)_100%)]" />
        <span className="absolute right-3 top-3 rounded-full border border-gold/50 bg-[#171310]/65 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light backdrop-blur">
          0{index + 1}
          <span className="text-white/50"> / 0{total}</span>
        </span>
        {!active && variant === "carousel" && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3" aria-hidden="true">
              <path d="M7 5.5v13l11-6.5-11-6.5Z" />
            </svg>
            Swipe
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col px-6 pb-7 pt-11">
        {/* Overlapping logo medallion */}
        <div className="absolute -top-8 left-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-white shadow-[0_10px_28px_rgba(212,175,55,0.45)]">
          <Image
            src={project.logo}
            alt={`${project.title} logo`}
            width={64}
            height={64}
            className="h-10 w-10 object-contain"
          />
        </div>

        <h3 className="font-display text-[26px] font-black leading-tight text-ink">
          {project.title.split(" ").map((w, i) => (
            <span key={i} className={i % 2 === 1 ? "gold-text" : ""}>
              {w}{" "}
            </span>
          ))}
        </h3>
        <p className="mt-2.5 line-clamp-4 text-[13.5px] leading-relaxed text-ink/65">
          {project.desc}
        </p>

        <div className="mt-auto pt-6">
          {project.comingSoon ? (
            <div className="animate-pulse-glow inline-flex items-center gap-2.5 rounded-full border border-gold/60 bg-gold/10 px-5 py-2.5">
              <span className="relative overflow-hidden text-[11px] font-bold uppercase tracking-[0.25em] text-gold-deep">
                Coming Soon
                <span
                  aria-hidden="true"
                  className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)]"
                />
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold-deep" />
            </div>
          ) : (
            <MagneticButton
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold sheen rounded-full px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.18em]"
            >
              {project.buttonLabel}
              <span aria-hidden="true">→</span>
            </MagneticButton>
          )}
        </div>
      </div>
    </motion.div>
  );
}
