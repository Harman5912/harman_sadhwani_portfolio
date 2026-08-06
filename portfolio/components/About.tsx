"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "./SectionHeading";
import GoldParticleField from "./GoldParticleField";

const PARAGRAPHS = [
  "Harman Sadhwani is a passionate AI and Full Stack Developer focused on building intelligent software that solves real-world problems. As the Founder and Core Developer of Crown Pierce, he leads the development of innovative AI-powered products that combine modern design, automation, and practical functionality.",
  "His interests span Artificial Intelligence, Machine Learning, Full Stack Development, Software Architecture, UI/UX Engineering, and Developer Tools. Rather than simply creating applications, he focuses on building products that improve productivity and enhance the developer experience.",
  "Alongside software development, Harman actively participates in hackathons, technical conferences, research presentations, and innovation competitions. His work reflects a commitment to continuous learning, experimentation, and transforming ideas into polished, production-ready solutions.",
  "His goal is to create impactful technology that blends intelligence, elegant design, and usability.",
];

const FOCUS = [
  "Artificial Intelligence",
  "Machine Learning",
  "Full Stack Development",
  "Software Architecture",
  "UI/UX Engineering",
  "Developer Tools",
  "Automation",
  "Research",
];

const STATS = [
  { value: "8+", label: "Certificates" },
  { value: "2", label: "Trophies" },
  { value: "2", label: "Medals" },
  { value: "2+", label: "Research Conferences" },
];

const reveal = (delay: number) => ({
  hidden: { opacity: 0, y: 34, clipPath: "inset(0 100% 0 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const timeline = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-full items-center overflow-hidden bg-off-white py-8 md:py-12"
    >
      <GoldParticleField density={45} />
      <div className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="About"
          title={
            <>
              The Mind Behind <span className="gold-text">the Build</span>
            </>
          }
        />

        <div className="mt-4 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* ── Paragraphs with filling timeline ── */}
          <div className="relative">
            <div className="absolute bottom-4 left-[5px] top-4 w-px bg-gold/25">
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-[linear-gradient(180deg,#f4e5b2,#b8860b)]"
                style={{ scaleY: timeline }}
              />
            </div>
            <div className="space-y-6 pl-10">
              {PARAGRAPHS.map((p, i) => (
                <div key={i} className="relative">
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ type: "spring", stiffness: 320, damping: 20, delay: 0.15 }}
                    className="absolute -left-10 top-1.5 flex h-[11px] w-[11px] items-center justify-center"
                  >
                    <span className="h-2 w-2 rotate-45 border border-gold-deep bg-white shadow-[0_0_8px_rgba(212,175,55,0.7)]" />
                  </motion.span>
                  <motion.p
                    variants={reveal(i * 0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-12% 0px" }}
                    className="text-[15px] leading-[1.8] text-ink/75"
                  >
                    {p}
                  </motion.p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Focus + stats ── */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-6 shadow-[0_20px_60px_rgba(26,26,26,0.07)]"
            >
              <h3 className="font-display text-2xl font-bold text-ink">
                Areas of <span className="gold-text">Expertise</span>
              </h3>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {FOCUS.map((f, i) => (
                  <motion.span
                    key={f}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.45 }}
                    className="cursor-default rounded-full border border-gold/35 bg-white/70 px-4 py-2 text-[12.5px] font-medium text-ink/75 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold-deep hover:shadow-[0_6px_20px_rgba(212,175,55,0.25)]"
                  >
                    {f}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-8% 0px" }}
                  transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group rounded-2xl border border-gold/25 bg-white/80 p-5 text-center shadow-[0_10px_30px_rgba(26,26,26,0.05)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_16px_44px_rgba(212,175,55,0.22)]"
                >
                  <p className="font-display gold-text text-3xl font-bold">{s.value}</p>
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/55">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display hidden text-lg italic leading-relaxed text-ink/45 lg:block"
            >
              “Rather than simply creating applications, I build products.”
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
