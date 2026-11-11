import React, { useEffect, useState } from 'react';

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFading(true), 300);
          setTimeout(() => onComplete(), 900);
          return 100;
        }
        const step = Math.floor(Math.random() * 12) + 6;
        return Math.min(100, prev + step);
      });
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080B] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Radial Glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Monogram Emblem */}
        <div className="relative mb-6 flex items-center justify-center w-16 h-16 rounded-full border border-amber-500/30 bg-amber-500/5 backdrop-blur-md">
          <span className="font-serif text-xl font-bold tracking-widest text-[#F5E4B5]">HS</span>
          <div className="absolute inset-0 rounded-full border border-amber-400/20 animate-ping opacity-25" />
        </div>

        {/* Identity */}
        <h1 className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#FFFBF0] font-semibold uppercase mb-2">
          HARMAN SADHWANI
        </h1>
        <p className="font-mono text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-8">
          CREATIVE DEVELOPER · AI SYSTEMS
        </p>

        {/* Hairline Gold Progress Bar */}
        <div className="w-56 sm:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#FFFBF0] to-[#D4AF37] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(212,175,55,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter & Status */}
        <div className="flex items-center justify-between w-56 sm:w-72 text-[10px] font-mono text-gray-400 tracking-wider">
          <span>LOADING</span>
          <span className="text-[#F5E4B5] font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
