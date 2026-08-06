"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  base: number;
  phase: number;
  color: string;
}

const COLORS = ["#D4AF37", "#F4E5B2", "#B8860B", "#E8C15A"];

/** Ambient gold dust drifting upward. Custom lightweight canvas — no external particle lib. */
export default function GoldParticleField({
  density = 55,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = () => {
      particles = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(0.08 + Math.random() * 0.35),
        base: 0.12 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t + p.phase) * 0.12;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = p.base * (0.55 + 0.45 * Math.sin(t * 1.3 + p.phase));
        ctx.globalAlpha = Math.max(0.04, Math.min(0.85, alpha));
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    spawn();

    if (reduce) {
      // Static single frame
      draw();
      cancelAnimationFrame(raf);
      raf = 0;
    } else {
      start();
    }

    const obs = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "160px" }
    );
    obs.observe(canvas);
    window.addEventListener("resize", resize);

    return () => {
      stop();
      obs.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
