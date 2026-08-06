"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "./hooks";

interface SectionInfo {
  id: string;
  el: HTMLElement;
}

interface FullpageContextValue {
  activeId: string | null;
  register: (id: string, el: HTMLElement) => void;
  unregister: (id: string) => void;
  /** Jump straight to the screen with this id (used by nav links / CTA buttons). */
  navigate: (id: string) => void;
}

const FullpageContext = createContext<FullpageContextValue | null>(null);

/** Whether THIS section (the nearest <FullpageSection> ancestor) is the active screen. */
const SectionActiveContext = createContext(false);

export function useFullpage(): FullpageContextValue {
  const ctx = useContext(FullpageContext);
  if (!ctx) throw new Error("useFullpage must be used inside <Fullpage>");
  return ctx;
}

export function useSectionActive(): boolean {
  return useContext(SectionActiveContext);
}

/** How long to ignore further scroll gestures while the smooth step plays out. */
const LOCK_MS = 1150;

/**
 * Full-page presentation engine.
 *
 * - Every child rendered through <FullpageSection> becomes a full-viewport screen.
 * - Only the active screen is visible — every other screen disappears.
 * - A single scroll gesture (no matter how long or short) advances exactly one
 *   screen; the page never rests halfway between screens.
 * - Tall screens (marked with an inner [data-scrollable] area) scroll internally
 *   first, and only hand over to the next screen at their boundary.
 */
export default function Fullpage({ children }: { children: ReactNode }) {
  const reduce = usePrefersReducedMotion();
  const sectionsRef = useRef<SectionInfo[]>([]);
  const activeIdRef = useRef<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const lockRef = useRef(false);
  const rafRef = useRef(0);

  const register = useCallback((id: string, el: HTMLElement) => {
    if (sectionsRef.current.some((s) => s.id === id)) return;
    sectionsRef.current.push({ id, el });
    // The first screen (Hero) owns the initial position.
    setActiveId((prev) => prev ?? id);
  }, []);

  const unregister = useCallback((id: string) => {
    sectionsRef.current = sectionsRef.current.filter((s) => s.id !== id);
  }, []);

  const jumpTo = useCallback(
    (index: number) => {
      const sections = sectionsRef.current;
      if (sections.length === 0) return;
      const i = Math.min(sections.length - 1, Math.max(0, index));
      const target = sections[i];
      if (target.id === activeIdRef.current) return;
      lockRef.current = true;
      activeIdRef.current = target.id;
      setActiveId(target.id);
      target.el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => {
        lockRef.current = false;
      }, LOCK_MS);
    },
    [reduce]
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      if (lockRef.current) return;
      const sections = sectionsRef.current;
      if (sections.length === 0) return;
      const i = sections.findIndex((s) => s.id === activeIdRef.current);
      jumpTo(i + dir);
    },
    [jumpTo]
  );

  /** Jump to a screen by id — sets it active immediately and scrolls there. */
  const navigate = useCallback(
    (id: string) => {
      const i = sectionsRef.current.findIndex((s) => s.id === id);
      if (i === -1) return;
      jumpTo(i);
    },
    [jumpTo]
  );

  /* Wheel: one gesture = one screen. Sections with internal room scroll natively. */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // leave pinch-zoom alone
      const target = e.target as HTMLElement | null;
      if (!target || target.closest("[data-fullpage-ignore]")) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      const scroller = target.closest<HTMLElement>("[data-scrollable]");
      if (scroller) {
        const atTop = scroller.scrollTop <= 1;
        const atBottom =
          scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
        if ((dir > 0 && !atBottom) || (dir < 0 && !atTop)) return; // scroll inside this screen
      }
      e.preventDefault();
      step(dir);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  /* Keyboard: arrows / paging step one screen at a time. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable))
        return;
      if (t && t.closest("[data-fullpage-ignore]")) return;
      // Space activates focused buttons/links natively, so only use it to step
      // when nothing interactive is focused (target is the page itself).
      const isPage = !t || t === document.body;
      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && isPage)) {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        jumpTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        jumpTo(Number.MAX_SAFE_INTEGER);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, jumpTo]);

  /* Keep activeId in sync with wherever the page actually is (scrollbar drags, nav clicks). */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current || lockRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const sections = sectionsRef.current;
        if (!sections.length) return;
        const mid = window.innerHeight / 2;
        let best: string | null = null;
        let bestDist = Infinity;
        for (const s of sections) {
          const r = s.el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) continue;
          const d = Math.abs(r.top - mid);
          if (d < bestDist) {
            bestDist = d;
            best = s.id;
          }
        }
        if (best && best !== activeIdRef.current) {
          activeIdRef.current = best;
          setActiveId(best);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = 0; // otherwise the rAF id stays stuck and sync dies forever
      }
    };
  }, []);

  return (
    <FullpageContext.Provider value={{ activeId, register, unregister, navigate }}>
      {children}
    </FullpageContext.Provider>
  );
}

export function FullpageSection({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { activeId, register, unregister } = useFullpage();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    register(id, el);
    return () => unregister(id);
  }, [id, register, unregister]);

  const hidden = activeId !== null && activeId !== id;

  return (
    <section
      id={id}
      ref={ref}
      data-fullpage-section
      data-scrollable
      aria-hidden={hidden}
      className={`fullpage-section relative h-dvh w-full overflow-y-auto overflow-x-hidden ${
        hidden ? "is-hidden" : ""
      } ${className}`}
    >
      <SectionActiveContext.Provider value={!hidden}>{children}</SectionActiveContext.Provider>
    </section>
  );
}
