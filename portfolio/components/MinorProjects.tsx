"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { MINOR_CATEGORIES, TOTAL_MINOR_PROJECTS } from "./minorProjectsData";

/** Emblem per domain, shown on each dropdown tile. */
const CATEGORY_ICONS: Record<string, string> = {
  auth: "🔐",
  productivity: "⚡",
  ai: "🤖",
  education: "🎓",
  finance: "💰",
  healthcare: "🏥",
  ecommerce: "🛒",
  social: "💬",
  business: "💼",
  realtime: "📡",
  utility: "🧰",
  devtools: "🛠️",
  misc: "✨",
};

const panelTween = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };

export default function MinorProjects() {
  /** Which domain menu is open; null = all closed. */
  const [openCat, setOpenCat] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close the open menu on outside click or Escape.
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenCat(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCat(null);
    };
    document.addEventListener("mousedown", onDoc);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const openCategory =
    MINOR_CATEGORIES.find((c) => c.id === openCat) ?? null;

  return (
    <section
      id="minor-projects"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#f7f1e0_0%,#fbf9f4_100%)] py-20 md:py-28"
    >
      {/* Texture + ambient gold accents */}
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -left-28 top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.13),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-28 bottom-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.65),transparent)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker="Minor Projects"
          title={
            <>
              The <span className="gold-text">Catalogue</span>
            </>
          }
          subtitle={`${TOTAL_MINOR_PROJECTS} focused builds across ${MINOR_CATEGORIES.length} domains — open a domain below to browse its collection.`}
        />

        {/* ── Eye-catching dropdown tiles — one menu per type of project ── */}
        <div ref={barRef} className="mt-12">
          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7"
            aria-label="Browse minor projects by category"
          >
            {MINOR_CATEGORIES.map((c) => {
              const open = openCat === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-expanded={open}
                  aria-controls={open ? "minor-projects-panel" : undefined}
                  onClick={() => setOpenCat(open ? null : c.id)}
                  className={`group relative flex flex-col items-center gap-2 rounded-2xl border px-2 py-4 text-center transition-all duration-300 active:scale-95 ${
                    open
                      ? "border-gold bg-[linear-gradient(160deg,#d4af37,#9a7410)] text-white shadow-[0_14px_36px_rgba(212,175,55,0.45)]"
                      : "border-gold/25 bg-white/85 text-ink shadow-[0_2px_14px_rgba(0,0,0,0.05)] backdrop-blur hover:-translate-y-1 hover:border-gold/70 hover:shadow-[0_18px_40px_rgba(212,175,55,0.25)]"
                  }`}
                >
                  {/* Rotating chevron */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`absolute right-2.5 top-2.5 h-3 w-3 transition-all duration-300 ${
                      open
                        ? "rotate-180 text-white/90"
                        : "rotate-0 text-gold-deep/50 group-hover:text-gold-deep"
                    }`}
                  >
                    <path d="m6 8 4 4 4-4" />
                  </svg>

                  {/* Domain emblem */}
                  <span
                    aria-hidden="true"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-all duration-300 ${
                      open
                        ? "bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                        : "bg-gold/10 group-hover:scale-110 group-hover:bg-gold/20"
                    }`}
                  >
                    {CATEGORY_ICONS[c.id]}
                  </span>

                  <span
                    className={`text-[10px] font-bold uppercase leading-tight tracking-[0.1em] line-clamp-2 ${
                      open ? "text-white" : "text-ink/70 group-hover:text-gold-deep"
                    }`}
                  >
                    {c.label}
                  </span>

                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold tabular-nums tracking-wide ${
                      open
                        ? "bg-white/20 text-white"
                        : "bg-gold/10 text-gold-deep group-hover:bg-gold/20"
                    }`}
                  >
                    {c.projects.length} builds
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Dropdown panel ── */}
          <AnimatePresence initial={false}>
            {openCategory && (
              <motion.div
                key={openCategory.id}
                id="minor-projects-panel"
                initial={{ opacity: 0, y: -12, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -12, height: 0 }}
                transition={panelTween}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-2xl border border-gold/25 bg-white/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur md:p-7">
                  {/* Panel header */}
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-2xl">
                      {CATEGORY_ICONS[openCategory.id]}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                        ✦ {openCategory.code} · {openCategory.projects.length} builds
                      </p>
                      <h3 className="font-display mt-0.5 truncate text-xl font-bold text-ink md:text-2xl">
                        {openCategory.label}
                      </h3>
                    </div>
                  </div>

                  {/* Compact project grid */}
                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {openCategory.projects.map((title, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          ...panelTween,
                          delay: Math.min(i, 9) * 0.03,
                        }}
                        className="group relative overflow-hidden rounded-xl border border-gold/20 bg-white p-3.5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-[0_14px_30px_rgba(212,175,55,0.18)]"
                      >
                        {/* Gold sweep line on hover */}
                        <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,#b8860b,#f4e5b2,#d4af37)] transition-transform duration-500 group-hover:scale-x-100" />

                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[8.5px] font-black tracking-[0.28em] text-gold-deep">
                            {openCategory.code}
                          </span>
                          <span className="font-display text-[9.5px] font-bold tabular-nums text-ink/30">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>

                        <h4 className="font-display mt-1.5 text-[13.5px] font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-gold-deep">
                          {title}
                        </h4>

                        <span
                          aria-hidden="true"
                          className="absolute right-2.5 top-2.5 text-gold/0 transition-colors duration-300 group-hover:text-gold/80"
                        >
                          ✦
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
