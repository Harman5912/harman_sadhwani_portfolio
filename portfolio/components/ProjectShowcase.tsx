"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

export interface Project {
  num: string;
  title: string;
  video: string;
  logo: string;
  desc: string;
  buttonLabel?: string;
  href?: string;
  comingSoon?: boolean;
}

interface Props {
  project: Project;
  index: number;
  total: number;
  active: boolean;
}

const settle = (delay: number) => ({
  off: {
    opacity: 0,
    y: 34,
    scale: 0.97,
    transition: { duration: 0.4, ease: "easeIn" as const },
  },
  on: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

/** One full-screen project section — video background, logo medallion, title, description, CTA. */
export default function ProjectShowcase({ project, index, total, active }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const wantPlayRef = useRef(false);
  const [selfInView, setSelfInView] = useState(false);

  // Lazy playback: only play when the slide is near the viewport (and active when stacked).
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setSelfInView(entry.isIntersecting), {
      threshold: 0.12,
      rootMargin: "120px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const shouldPlay = active && selfInView;
    wantPlayRef.current = shouldPlay;
    if (shouldPlay) {
      // Guard against the play() promise resolving after a pause() was issued.
      v.play()
        .then(() => {
          if (!wantPlayRef.current) v.pause();
        })
        .catch(() => {});
    } else {
      v.pause();
    }
  }, [active, selfInView]);

  const animProps = (variants: ReturnType<typeof settle>) => ({
    variants,
    initial: "off" as const,
    animate: active ? ("on" as const) : ("off" as const),
  });

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full overflow-hidden bg-[#171310]"
      aria-label={`${project.title} — project ${project.num}`}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src={project.video}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gold-tinted overlays for readability */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,14,9,0.8)_0%,rgba(17,14,9,0.4)_45%,rgba(212,175,55,0.16)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(17,14,9,0.42)_100%)]" />

      {/* Giant watermark number */}
      <span
        aria-hidden="true"
        className="font-display pointer-events-none absolute -right-4 bottom-2 select-none text-[24vh] font-black leading-none text-white/[0.05]"
      >
        {project.num}
      </span>

      {/* Content — scrolls internally on short screens while the video stays pinned */}
      <div data-scrollable className="relative z-10 h-full overflow-y-auto">
        <div className="flex min-h-full flex-col items-center justify-center px-6 py-8 text-center md:px-14">
        <motion.p
          {...animProps(settle(0.1))}
          className="text-[11px] font-semibold uppercase tracking-[0.45em] text-gold-light"
        >
          ✦ Project {project.num} ✦
        </motion.p>

        {/* Logo medallion */}
        <motion.div {...animProps(settle(0.22))} className="relative mt-6">
          <div className="gold-halo absolute -inset-5 rounded-full blur-xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-gold/60 bg-white/10 shadow-[0_0_60px_rgba(212,175,55,0.35)] ring-1 ring-white/25 backdrop-blur-md md:h-28 md:w-28">
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              width={128}
              height={128}
              className="h-12 w-12 object-contain drop-shadow-[0_4px_14px_rgba(212,175,55,0.5)] md:h-16 md:w-16"
            />
          </div>
        </motion.div>

        <motion.h3
          {...animProps(settle(0.34))}
          className="font-display mt-6 text-4xl font-black tracking-tight text-white md:text-6xl"
        >
          {project.title.split(" ").map((w, i) => (
            <span key={i} className={i % 2 === 1 ? "gold-text" : ""}>
              {w}{" "}
            </span>
          ))}
        </motion.h3>

        <motion.p
          {...animProps(settle(0.46))}
          className="mt-5 max-w-2xl text-sm leading-[1.8] text-white/75"
        >
          {project.desc}
        </motion.p>

        <motion.div {...animProps(settle(0.6))} className="mt-7">
          {project.comingSoon ? (
            <div className="animate-pulse-glow inline-flex items-center gap-3 rounded-full border border-gold/60 bg-gold/10 px-7 py-3.5 backdrop-blur-md">
              <span className="relative flex items-center overflow-hidden text-[12px] font-bold uppercase tracking-[0.3em] text-gold-light">
                Coming Soon
                <span
                  aria-hidden="true"
                  className="animate-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)]"
                />
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
            </div>
          ) : (
            <MagneticButton
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold sheen rounded-full px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.2em]"
            >
              {project.buttonLabel}
              <span aria-hidden="true">→</span>
            </MagneticButton>
          )}
        </motion.div>
        </div>
      </div>

      {/* Progress footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selfInView ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-7 right-8 z-10 flex flex-col items-center gap-3"
      >
        <span className="font-display text-sm tracking-widest text-white/60">
          0{index + 1} <span className="text-white/30">/ 0{total}</span>
        </span>
        <span className="relative h-16 w-px overflow-hidden bg-white/20">
          <span
            className={`absolute inset-x-0 top-0 bg-gold transition-all duration-700 ${
              active ? "h-full" : "h-0"
            }`}
          />
        </span>
      </motion.div>
    </div>
  );
}
