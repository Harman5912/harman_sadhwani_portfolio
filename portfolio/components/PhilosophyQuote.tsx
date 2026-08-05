"use client";

import { motion } from "framer-motion";

const QUOTE = "Innovation begins where curiosity meets execution.";

export default function PhilosophyQuote() {
  const words = QUOTE.split(" ");

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#faf6ea_50%,#f4ead0_100%)] py-20 md:py-28">
      {/* Decorative quote mark */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        aria-hidden="true"
        className="font-display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[62%] select-none text-[38vh] leading-none text-gold/10"
      >
        &ldquo;
      </motion.span>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(212,175,55,0.12),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Top gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="gold-line-h mx-auto mb-12 h-px w-40 md:w-64"
          style={{ transformOrigin: "left center" }}
        />

        <blockquote className="font-display text-[28px] font-bold leading-[1.25] tracking-tight text-ink sm:text-5xl md:text-6xl">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="mr-[0.28em] inline-block"
              initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-18% 0px" }}
              transition={{ duration: 0.7, delay: 0.14 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </blockquote>

        <motion.span
          initial={{ scale: 0, rotate: 45 }}
          whileInView={{ scale: 1, rotate: 45 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ delay: words.length * 0.14, type: "spring", stiffness: 300, damping: 18 }}
          className="mt-12 inline-block h-2 w-2 border border-gold bg-gold/25 shadow-[0_0_14px_rgba(212,175,55,0.7)]"
        />

        {/* Bottom gold rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
          className="gold-line-h mx-auto mt-12 h-px w-40 md:w-64"
          style={{ transformOrigin: "right center" }}
        />
      </div>
    </section>
  );
}
