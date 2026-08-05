"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "@/components/hooks";
import SectionHeading from "./SectionHeading";
import ProjectShowcase, { type Project } from "./ProjectShowcase";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Keys.AI",
    video: "/p1.mp4",
    logo: "/p1.jpeg",
    desc: "Keys.AI is an advanced AI desktop assistant developed to provide a unified experience across multiple AI providers. Instead of being limited to a single model, it allows users to connect APIs from OpenAI, Anthropic, Google Gemini, OpenRouter, and other providers within one elegant application. The platform focuses on productivity, intelligent conversations, document generation, coding assistance, automation, and extensibility while maintaining a clean user experience. It is designed as a next-generation AI workspace that evolves with new models and capabilities.",
    buttonLabel: "View Releases",
    href: "https://github.com/Harman5912/KEYS.AI/releases",
  },
  {
    num: "02",
    title: "ReviewBOT",
    video: "/p2.mp4",
    logo: "/p2.jpeg",
    desc: "ReviewBOT is an AI-powered code review platform built to help developers improve code quality through automated analysis. It provides intelligent feedback, identifies potential issues, highlights best practices, and streamlines the software review process. The project emphasizes speed, accuracy, and developer productivity while offering a clean and modern interface suitable for individual developers and collaborative teams.",
    buttonLabel: "Open ReviewBOT",
    href: "https://reviewbot-web.onrender.com/",
  },
  {
    num: "03",
    title: "True Blade",
    video: "/p3.mp4",
    logo: "/p3.jpeg",
    desc: "True Blade is a premium software project developed under Crown Pierce — a cinematic, futuristic showcase of what a master-crafted product looks like. Precision, speed and complete control, forged like a blade.",
    comingSoon: true,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPhone = useMediaQuery("(max-width: 767px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();

  // Three distinct experiences, one per device class (derived, no effect):
  //  - stacked : cinematic GSAP pinned gallery (desktop ≥1024px)
  //  - carousel: horizontal snap-swipe cards (phones <768px)
  //  - flow    : compact vertical card stack (tablets + reduced-motion users)
  const stacked = isDesktop && !reduce;
  const carousel = isPhone && !reduce;

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRaf = useRef(0);

  useGSAP(
    () => {
      if (!stacked) return;
      const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      slides.forEach((slide, i) => {
        if (i === 0) return;
        tl.fromTo(
          slide,
          { yPercent: 100, scale: 0.94, autoAlpha: 0.85 },
          { yPercent: 0, scale: 1, autoAlpha: 1, duration: 1 },
          i
        );
      });
      ScrollTrigger.create({
        trigger: spacerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 0.8,
        animation: tl,
        onUpdate: (self) => {
          const idx = Math.min(slides.length - 1, Math.floor(self.progress * slides.length));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [stacked] }
  );

  // rAF-throttled: picks the card whose center is nearest the viewport center of the track.
  // Uses viewport-relative rects so the math is immune to offsetParent / scroll-padding quirks.
  const updateCarouselIndex = () => {
    if (carouselRaf.current) return;
    carouselRaf.current = requestAnimationFrame(() => {
      carouselRaf.current = 0;
      const el = trackRef.current;
      if (!el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-pcard]"));
      const elRect = el.getBoundingClientRect();
      const mid = elRect.left + elRect.width / 2;
      let idx = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - mid);
        if (d < best) {
          best = d;
          idx = i;
        }
      });
      setCarouselIndex((prev) => (prev === idx ? prev : idx));
    });
  };

  // Cancel a pending rAF on unmount to avoid a setState after unmount.
  useEffect(() => {
    return () => {
      if (carouselRaf.current) cancelAnimationFrame(carouselRaf.current);
    };
  }, []);

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-pcard]")[i];
    if (!card) return;
    const elRect = el.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const target =
      el.scrollLeft + (cardRect.left - elRect.left) - (el.clientWidth - cardRect.width) / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  const arrowClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-gold/45 text-xl text-gold-light transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:text-gold-light active:scale-90";

  return (
    <section id="projects" ref={sectionRef} className="relative bg-[#171310]">
      {/* Heading block */}
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-36">
        <SectionHeading
          tone="light"
          kicker="Major Projects"
          title={
            <>
              Work in <span className="gold-text">Motion</span>
            </>
          }
          subtitle="Three flagship products, three stories — built end-to-end with AI, design and engineering. Explore them your way."
        />
      </div>

      {stacked ? (
        /* ── Desktop: pinned cinematic gallery ── */
        <div ref={spacerRef} className="relative h-[400vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {PROJECTS.map((p, i) => (
              <div key={p.num} data-slide={i} className="absolute inset-0">
                <ProjectShowcase
                  project={p}
                  index={i}
                  total={PROJECTS.length}
                  active={active === i}
                />
              </div>
            ))}
          </div>
        </div>
      ) : carousel ? (
        /* ── Phones: horizontal swipe carousel of compact cards ── */
        <div className="relative">
          <div
            ref={trackRef}
            onScroll={updateCarouselIndex}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 pt-8"
          >
            {PROJECTS.map((p, i) => (
              <div key={p.num} className="w-[84vw] max-w-[400px] shrink-0 snap-center">
                <ProjectCard
                  project={p}
                  index={i}
                  total={PROJECTS.length}
                  variant="carousel"
                  active={carouselIndex === i}
                />
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-7 pt-6">
            <button onClick={() => scrollToCard(Math.max(0, carouselIndex - 1))} aria-label="Previous project" className={arrowClass}>
              ‹
            </button>
            <div className="flex items-center gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.num}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to ${p.title}`}
                  className={`h-1.5 rounded-full transition-all duration-[400ms] ${
                    i === carouselIndex ? "w-7 bg-gold shadow-[0_0_10px_rgba(212,175,55,0.7)]" : "w-1.5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button onClick={() => scrollToCard(Math.min(PROJECTS.length - 1, carouselIndex + 1))} aria-label="Next project" className={arrowClass}>
              ›
            </button>
          </div>
          <p className="pb-10 pt-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
            Swipe to explore
          </p>
        </div>
      ) : (
        /* ── Tablets / reduced motion: compact vertical card stack ── */
        <div className="mx-auto flex max-w-2xl flex-col gap-8 px-5 pb-24 pt-6 md:px-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.num}
              project={p}
              index={i}
              total={PROJECTS.length}
              variant="flow"
              active={false}
            />
          ))}
        </div>
      )}
    </section>
  );
}
