"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";
import GoldParticleField from "./GoldParticleField";

export default function CrownPierce() {
  return (
    <section
      id="crown-pierce"
      className="relative overflow-hidden bg-white py-20 md:py-36"
    >
      <GoldParticleField density={38} className="opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8">
        {/* Emblem */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex h-72 w-72 items-center justify-center md:h-96 md:w-96"
        >
          <div className="gold-halo absolute inset-0 rounded-full opacity-80 blur-3xl" />
          {/* Rotating rings with orbiting dots */}
          <div className="animate-spin-slower absolute inset-0 rounded-full border border-dashed border-gold/45">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
            <span className="absolute bottom-[12%] right-[8%] h-1.5 w-1.5 rounded-full bg-gold-light" />
          </div>
          <div className="animate-spin-slow absolute inset-8 rounded-full border border-gold/30">
            <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-gold-deep shadow-[0_0_10px_rgba(184,134,11,0.9)]" />
          </div>
          <div className="absolute inset-16 rounded-full border border-gold/40 bg-white/60 shadow-[0_0_90px_rgba(212,175,55,0.3)] backdrop-blur-sm" />
          <Image
            src="/logo.png"
            alt="Crown Pierce logo"
            width={320}
            height={320}
            className="animate-floaty relative z-10 h-40 w-40 object-contain drop-shadow-[0_16px_40px_rgba(212,175,55,0.4)] md:h-56 md:w-56"
          />
        </motion.div>

        <SectionHeading
          kicker="The Studio"
          title={
            <>
              Crown <span className="gold-text">Pierce</span>
            </>
          }
          className="mt-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-2 max-w-2xl text-[15.5px] leading-[1.9] text-ink/70"
        >
          Crown Pierce is an independent software studio founded by Harman Sadhwani. The
          company focuses on developing intelligent software, AI-powered applications,
          developer tools, automation platforms, and innovative digital experiences that
          combine functionality with premium design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton
            href="https://crown-pierce-co.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold sheen rounded-full px-9 py-4 text-[13px] font-semibold uppercase tracking-[0.2em]"
          >
            Visit Crown Pierce
            <span aria-hidden="true">→</span>
          </MagneticButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-6 text-[12px] uppercase tracking-[0.3em] text-ink/40"
        >
          Independent Software Studio · Est. by Harman
        </motion.p>
      </div>
    </section>
  );
}
