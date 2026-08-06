"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook built on useSyncExternalStore.
 * Returns `false` on the server / during hydration, then live-updates.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export type DeviceTier = "low" | "high";

/** Detect low-power devices (small viewport or few CPU cores) to scale down 3D. */
export function useDeviceTier(): DeviceTier {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const cores =
    typeof navigator !== "undefined" ? (navigator.hardwareConcurrency ?? 4) : 4;
  return isDesktop && cores >= 4 ? "high" : "low";
}

/** Whether the user prefers reduced motion (SSR-safe). */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}
