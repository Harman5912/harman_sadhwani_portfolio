"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { MINOR_CATEGORIES, TOTAL_MINOR_PROJECTS } from "./minorProjectsData";

/** Emblem per domain, shown on each sidebar entry. */
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
  /** The domain shown in the detail panel — the first one is open by default. */
  const [activeId, setActiveId] = useState<string>(MINOR_CATEGORIES[0].id);
  const active =
    MINOR_CATEGORIES.find((c) => c.id === activeId) ?? MINOR_CATEGORIES[0];

  return (
    <section className="relative flex min-h-full flex-col overflow-hidden bg-[linear-gradient(180deg,#f7f1e0_0%,#fbf9f4_100%)] py-6 md:py-8">
      {/* Texture + ambient gold accents */}
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute -left-28 top-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.13),transparent_70%)]" />
      <div className="pointer-events-none absolute -right-28 bottom-32 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.65),transparent)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 md:px-8">
        <SectionHeading
          kicker="Minor Projects"
          title={
            <>
              The <span className="gold-text">Catalogue</span>
            </>
          }
          subtitle={`${TOTAL_MINOR_PROJECTS} focused builds across ${MINOR_CATEGORIES.length} domains — pick a domain to browse its collection.`}
        />

        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4 md:flex-row md:gap-6">
          {/* ── Sidebar (desktop) — one entry per domain ── */}
          <aside
            data-scrollable
            className="no-scrollbar hidden w-60 shrink-0 flex-col overflow-y-auto overscroll-contain rounded-2xl border border-gold/25 bg-white/85 p-2 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur md:flex"
            aria-label="Minor project categories"
          >
            {MINOR_CATEGORIES.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  aria-pressed={isActive}
                  className={`group flex items-center gap-2 rounded-xl px-2 py-1 text-left transition-all duration-300 active:scale-[0.98] ${
                    isActive
                      ? "bg-[linear-gradient(135deg,#d4af37,#b8860b)] text-white shadow-[0_8px_20px_rgba(212,175,55,0.4)]"
                      : "text-ink/70 hover:bg-gold/10 hover:text-gold-deep"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-sm transition-colors duration-300 ${
                      isActive
                        ? "bg-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                        : "bg-gold/10 group-hover:bg-gold/20"
                    }`}
                  >
                    {CATEGORY_ICONS[c.id]}
                  </span>

                  <span
                    className={`min-w-0 flex-1 truncate text-[11px] font-bold leading-tight ${
                      isActive ? "text-white" : "text-ink/80 group-hover:text-gold-deep"
                    }`}
                  >
                    {c.label}
                  </span>

                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums tracking-wide ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gold/10 text-gold-deep group-hover:bg-gold/20"
                    }`}
                  >
                    {c.projects.length}
                  </span>
                </button>
              );
            })}
          </aside>

          {/* ── Mobile: horizontal chip rail instead of the sidebar ── */}
          <div className="no-scrollbar -mx-5 flex shrink-0 gap-2 overflow-x-auto px-5 pb-1 md:hidden">
            {MINOR_CATEGORIES.map((c) => {
              const isActive = c.id === activeId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveId(c.id)}
                  aria-pressed={isActive}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all duration-300 active:scale-95 ${
                    isActive
                      ? "border-gold bg-[linear-gradient(135deg,#d4af37,#b8860b)] text-white shadow-[0_6px_16px_rgba(212,175,55,0.4)]"
                      : "border-gold/25 bg-white/85 text-ink/70"
                  }`}
                >
                  <span>{CATEGORY_ICONS[c.id]}</span>
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* ── Detail panel — swaps in place as domains are selected ── */}
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-gold/25 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={panelTween}
                data-scrollable
                className="absolute inset-0 overflow-y-auto overscroll-contain p-4 md:p-5"
              >
                {/* Panel header */}
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-xl">
                    {CATEGORY_ICONS[active.id]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-gold-deep">
                      ✦ {active.code} · {active.projects.length} builds
                    </p>
                    <h3 className="font-display mt-0.5 truncate text-lg font-bold text-ink md:text-xl">
                      {active.label}
                    </h3>
                  </div>
                </div>

                {/* Compact project grid */}
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
                  {active.projects.map((title, i) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        ...panelTween,
                        delay: Math.min(i, 9) * 0.03,
                      }}
                      className="group relative overflow-hidden rounded-xl border border-gold/20 bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/70 hover:shadow-[0_14px_30px_rgba(212,175,55,0.18)]"
                    >
                      {/* Gold sweep line on hover */}
                      <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[linear-gradient(90deg,#b8860b,#f4e5b2,#d4af37)] transition-transform duration-500 group-hover:scale-x-100" />

                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[8px] font-black tracking-[0.28em] text-gold-deep">
                          {active.code}
                        </span>
                        <span className="font-display text-[9px] font-bold tabular-nums text-ink/30">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h4 className="font-display mt-1 text-[12.5px] font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-gold-deep">
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
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
