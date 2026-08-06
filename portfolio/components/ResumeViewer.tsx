"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

export default function ResumeViewer() {
  return (
    <section className="relative flex min-h-full items-center overflow-hidden bg-white py-8 md:py-10">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 md:px-8">
        <SectionHeading
          kicker="Resume"
          title={
            <>
              My Journey, <span className="gold-text">On Paper</span>
            </>
          }
          subtitle="The full story of what I build, learn and ship — one page at a time."
        />

        {/* Unfolding document */}
        <div className="mt-4" style={{ perspective: 1400 }}>
          <motion.div
            initial={{ rotateX: 78, y: 70, opacity: 0.25 }}
            whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
            className="relative"
          >
            {/* Page stack edges */}
            <div className="absolute inset-x-2 inset-y-0 translate-y-3 rotate-[0.5deg] rounded-xl border border-gold/15 bg-white shadow-sm" aria-hidden="true" />
            <div className="absolute inset-x-1 inset-y-0 translate-y-1.5 rotate-[-0.4deg] rounded-xl border border-gold/25 bg-white shadow-sm" aria-hidden="true" />

            <div className="relative overflow-hidden rounded-2xl border border-gold/45 bg-white shadow-[0_40px_110px_rgba(26,26,26,0.16)]">
              <div className="paper-texture relative">
                <embed
                  src="/35747.pdf"
                  type="application/pdf"
                  title="Harman Sadhwani — Resume"
                  className="block h-[50vh] min-h-[320px] w-full"
                />
                {/* Bottom bar */}
                <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-gold/25 bg-white/95 px-6 py-4 backdrop-blur">
                  <p className="font-display text-sm font-semibold text-ink">
                    Harman Sadhwani — <span className="gold-text">Resume</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <MagneticButton
                      href="/35747.pdf"
                      download
                      className="btn-gold sheen rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em]"
                    >
                      Download Resume
                      <span aria-hidden="true">↓</span>
                    </MagneticButton>
                    <MagneticButton
                      href="/35747.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em]"
                    >
                      Open in tab
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
