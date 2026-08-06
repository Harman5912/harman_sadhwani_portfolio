"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import GoldDivider from "./GoldDivider";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  /** "dark" = dark text on light bg (default); "light" = white text on dark bg */
  tone?: "dark" | "light";
  className?: string;
}

/** Consistent premium heading block: kicker, big display title, subtitle and gold divider. */
export default function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const onDark = tone === "light";
  return (
    <div className={`relative z-10 ${centered ? "text-center" : "text-left"} ${className}`}>
      <motion.p
        className={`text-[11px] font-semibold uppercase tracking-[0.4em] ${
          onDark ? "text-gold-light" : "text-gold-deep"
        } ${centered ? "mx-auto" : ""}`}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6 }}
      >
        ✦&nbsp;{kicker}&nbsp;✦
      </motion.p>
      <motion.h2
        className={`font-display mt-3 text-4xl font-bold leading-[1.1] md:text-6xl ${
          onDark ? "text-white" : "text-ink"
        }`}
        initial={{ opacity: 0, y: 26, clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className={`mt-5 max-w-xl text-[15px] leading-relaxed ${
          onDark ? "text-white/60" : "text-ink/55"
        } ${centered ? "mx-auto" : ""}`}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {subtitle}
        </motion.p>
      )}
      <GoldDivider className={`mt-8 max-w-xs ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
