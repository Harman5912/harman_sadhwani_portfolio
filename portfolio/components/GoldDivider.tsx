"use client";

import { motion } from "framer-motion";

/** Animated gold divider: lines draw themselves in from both sides, diamond settles in the center. */
export default function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <motion.span
        className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.85))]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "left center" }}
      />
      <motion.span
        className="h-2 w-2 shrink-0 border border-gold bg-gold/20 shadow-[0_0_12px_rgba(212,175,55,0.6)]"
        initial={{ scale: 0, rotate: 45 }}
        whileInView={{ scale: 1, rotate: 45 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 18 }}
      />
      <motion.span
        className="h-px flex-1 bg-[linear-gradient(270deg,transparent,rgba(212,175,55,0.85))]"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ transformOrigin: "right center" }}
      />
    </div>
  );
}
