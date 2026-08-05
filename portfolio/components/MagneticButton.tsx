"use client";

import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent, type Ref } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How strongly the element is pulled toward the cursor. 0 = off, 1 = full. */
  strength?: number;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
  download?: boolean;
}

/**
 * Reusable magnetic wrapper — content is pulled toward the cursor with a spring
 * and snaps back on leave. Works as an <a> (when href is given) or <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.4,
  target,
  rel,
  ariaLabel,
  type = "button",
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.35 });
  const reduce = useReducedMotion();

  const handleMove = (e: ReactMouseEvent) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      style={{ x: springX, y: springY }}
      className="relative z-10 inline-flex items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <motion.a
        ref={ref as unknown as Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        aria-label={ariaLabel}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.95 }}
        className={`group relative inline-flex items-center justify-center ${className}`}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as unknown as Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center justify-center ${className}`}
    >
      {inner}
    </motion.button>
  );
}
