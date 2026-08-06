"use client";

type Variant = "gold" | "silver" | "participation";

const STYLES: Record<Variant, { ribbon: string; circle: string; star: string }> = {
  gold: { ribbon: "#b8860b", circle: "#d4af37", star: "#fff8dc" },
  silver: { ribbon: "#6f7a8a", circle: "#c0c8d4", star: "#ffffff" },
  participation: { ribbon: "#3f6ec9", circle: "#e8c15a", star: "#1a1a1a" },
};

/** Medal badge: circle with star + ribbon tails, gold/silver/participation variants. */
export default function MedalBadge({ variant, label }: { variant: Variant; label: string }) {
  const s = STYLES[variant];
  return (
    <div className="flex flex-col items-center" title={label}>
      <svg width="34" height="44" viewBox="0 0 34 44" aria-hidden="true" className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
        {/* Ribbon tails */}
        <path d="M6 18 L6 44 L17 36 L28 44 L28 18 Z" fill={s.ribbon} opacity="0.9" />
        {/* Circle */}
        <circle cx="17" cy="13" r="13" fill={s.circle} stroke="#fff" strokeWidth="1.5" />
        <circle cx="17" cy="13" r="9.5" fill="none" stroke="#ffffff" strokeOpacity="0.45" />
        {/* Star */}
        <path
          d="M17 6.2 L18.8 11.4 L24.2 11.4 L19.7 14.6 L21.5 19.8 L17 16.6 L12.5 19.8 L14.3 14.6 L9.8 11.4 L15.2 11.4 Z"
          fill={s.star}
        />
      </svg>
      <span
        className="mt-0.5 rounded-sm px-1.5 py-px text-[8px] font-bold uppercase tracking-widest text-white"
        style={{ background: s.ribbon }}
      >
        {label}
      </span>
    </div>
  );
}
