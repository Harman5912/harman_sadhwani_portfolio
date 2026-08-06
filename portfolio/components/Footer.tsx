"use client";

import Image from "next/image";
import MagneticButton from "./MagneticButton";
import { useFullpage } from "./Fullpage";

export default function Footer() {
  const { navigate } = useFullpage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-gold/25 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
        {/* Logo */}
        <button
          onClick={() => navigate("home")}
          aria-label="Back to top"
          className="group flex items-center gap-3"
        >
          <span className="relative h-9 w-9">
            <span className="gold-halo absolute -inset-2 rounded-full opacity-60 blur-md transition-opacity duration-500 group-hover:opacity-100" />
            <Image
              src="/logo.png"
              alt="Crown Pierce logo"
              width={36}
              height={36}
              className="animate-floaty relative h-9 w-9 object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.45)]"
            />
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em] text-ink">
            Harman<span className="text-gold-deep">.</span>dev
          </span>
        </button>

        {/* Copyright */}
        <p className="text-center text-[12.5px] tracking-wide text-ink/50">
          © {year} Harman Sadhwani · Crafted with <span className="text-gold-deep">gold</span>,
          code &amp; curiosity
        </p>

        {/* Back to top */}
        <MagneticButton
          onClick={() => navigate("home")}
          ariaLabel="Back to top"
          className="animate-floaty-slow h-12 w-12 rounded-full border border-gold/50 bg-white/80 text-gold-deep shadow-[0_8px_24px_rgba(212,175,55,0.2)] transition-all duration-500 hover:border-gold hover:shadow-[0_0_0_1px_rgba(212,175,55,0.55),0_14px_40px_rgba(212,175,55,0.35)]"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
            <path d="M12 19V5m0 0-6 6m6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </MagneticButton>
      </div>
    </footer>
  );
}
