"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import NeuralNetworkCanvas from "./NeuralNetworkCanvas";
import { useFullpage } from "./Fullpage";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ROLES = [
  "Founder & Core Developer — Crown Pierce",
  "AI/ML Full Stack Developer",
  "Full Stack Developer",
  "Researcher",
  "Hackathon Enthusiast",
  "Open Source Developer",
];

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");

  useEffect(() => {
    let word = 0;
    let char = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = words[word % words.length];
      if (deleting) {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          word = (word + 1) % words.length;
          timeout = setTimeout(tick, 500);
        } else {
          timeout = setTimeout(tick, 28);
        }
      } else {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timeout = setTimeout(tick, 1900);
        } else {
          timeout = setTimeout(tick, 60);
        }
      }
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, [words]);

  return text;
}

const NAME_LINES = ["Harman", "Sadhwani"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const typed = useTypewriter(ROLES);
  const reduce = useReducedMotion();
  const { navigate } = useFullpage();

  useGSAP(
    () => {
      if (reduce) return;
      gsap.to(".hero-inner", {
        yPercent: -16,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduce] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-full items-center overflow-hidden bg-[radial-gradient(ellipse_120%_90%_at_50%_-20%,rgba(212,175,55,0.14)_0%,transparent_55%),radial-gradient(ellipse_90%_80%_at_90%_110%,rgba(212,175,55,0.08)_0%,transparent_55%)]"
    >
      <NeuralNetworkCanvas />

      <div className="hero-inner relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 pb-12 pt-20 md:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ── Copy ── */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-[11px] font-semibold uppercase tracking-[0.4em] text-gold-deep"
          >
            ✦ Crafting Intelligence, Shaping the Future ✦
          </motion.p>

          {/* Name — first name on line 1, last name stacked beneath in gold */}
          <h1 className="font-display mt-5 text-5xl font-black leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">
            {NAME_LINES.map((line, li) => (
              <span
                key={line}
                className={`block ${li === 1 ? "gold-text mt-1" : "text-ink"}`}
              >
                {line.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: 46, opacity: 0, rotate: 5 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    transition={{
                      delay: 0.25 + (li === 0 ? i : NAME_LINES[0].length + 1 + i) * 0.045,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>

          {/* Rotating titles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-6 flex h-8 items-center justify-center gap-2 text-lg font-medium text-gold-deep lg:justify-start md:text-xl"
            aria-live="polite"
          >
            <span className="text-ink/70">{typed}</span>
            <span className="animate-blink -ml-1 inline-block h-6 w-[2px] rounded bg-gold-deep" aria-hidden="true" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.25 }}
            className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink/60 lg:mx-0"
          >
            I build intelligent software that solves real-world problems — AI-powered
            products, developer tools and digital experiences where premium design meets
            practical functionality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton
              onClick={() => navigate("projects")}
              className="btn-gold sheen rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em]"
            >
              View Projects
              <span aria-hidden="true">→</span>
            </MagneticButton>
            <MagneticButton
              href="/35747.pdf"
              download
              className="btn-outline rounded-full px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em]"
            >
              Download Resume
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── Portrait — silhouette aura ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex h-[clamp(300px,46vh,540px)] w-72 flex-col items-center justify-end sm:w-80 md:w-[24rem]"
        >
          {/* Floating figure: cutout + golden silhouette aura + reflection */}
          <div className="animate-floaty relative w-64 sm:w-72 md:w-80">
            {/* Golden aura that breathes and traces the silhouette */}
            <div
              aria-hidden="true"
              className="animate-aura pointer-events-none absolute -inset-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- blurred gold twin of the cutout */}
              <img
                src="/pro.png"
                alt=""
                className="h-full w-full object-contain [filter:blur(26px)_saturate(1.7)_sepia(1)_hue-rotate(-12deg)_brightness(1.25)]"
              />
            </div>

            <Image
              src="/pro.png"
              alt="Harman Sadhwani"
              width={420}
              height={420}
              priority
              className="relative z-10 h-[clamp(196px,34vh,320px)] w-[clamp(196px,34vh,320px)] object-contain drop-shadow-[0_18px_42px_rgba(212,175,55,0.3)]"
            />

            {/* Soft reflection fading away below */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-full h-24 w-full -scale-y-100 opacity-25 [filter:blur(1px)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_70%)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- mirrored reflection of the cutout */}
              <img src="/pro.png" alt="" className="h-full w-full object-contain" />
            </div>

            {/* Floating role chip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
              className="glass-card animate-floaty-slow absolute -right-2 bottom-14 z-20 whitespace-nowrap rounded-full px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-deep shadow-lg sm:px-4 sm:text-[11px] md:right-0"
            >
              👑 Crown Pierce · Founder
            </motion.div>
          </div>

          {/* Golden pedestal with rising sparkles */}
          <div className="relative mt-3 flex flex-col items-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <span
                className="animate-rise absolute h-1 w-1 rounded-full bg-gold shadow-[0_0_8px_rgba(212,175,55,0.9)]"
                style={{ left: -70, animationDelay: "0.3s" }}
              />
              <span
                className="animate-rise absolute h-1 w-1 rounded-full bg-gold-light shadow-[0_0_8px_rgba(244,229,178,0.9)]"
                style={{ left: 72, animationDelay: "1.5s" }}
              />
              <span
                className="animate-rise absolute h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.9)]"
                style={{ left: -24, animationDelay: "2.6s" }}
              />
              <span
                className="animate-rise absolute h-1 w-1 rounded-full bg-gold-deep shadow-[0_0_8px_rgba(184,134,11,0.9)]"
                style={{ left: 28, animationDelay: "0.9s" }}
              />
            </div>

            <div className="h-3 w-52 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.95),rgba(184,134,11,0.3)_55%,transparent_78%)]" />
            <div className="-mt-1 h-2.5 w-64 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(244,229,178,0.9),rgba(212,175,55,0.35)_50%,transparent_75%)] shadow-[0_0_44px_rgba(212,175,55,0.5)]" />
            <div className="mt-1.5 h-1 w-40 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.75),transparent_75%)]" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink/45"
      >
        <span className="text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ink/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-full bg-gold"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
