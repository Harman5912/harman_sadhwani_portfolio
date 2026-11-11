import React, { useState, useEffect } from 'react';
import { ArrowUp, Sparkles, Heart } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function Footer() {
  const [indiaTime, setIndiaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setIndiaTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClickPulse();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 pt-16 pb-12 px-4 sm:px-8 max-w-6xl mx-auto text-left">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="font-serif text-lg font-bold tracking-widest text-[#FFFBF0]">
              HARMAN SADHWANI
            </span>
          </div>
          <p className="font-mono text-xs text-[#F5E4B5] tracking-wider uppercase">
            BUILDING TECHNOLOGY WHERE INTELLIGENCE MEETS CREATIVITY.
          </p>
          <p className="text-xs text-gray-400 mt-2 font-light max-w-md">
            Engineered with React, Three.js, React Three Fiber, GSAP, and Tailwind CSS.
          </p>
        </div>

        {/* Real-time India Time & Back To Top */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="px-4 py-2 rounded-2xl glass-panel text-left">
            <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest">
              LOCAL TIME · INDIA (IST)
            </span>
            <span className="font-mono text-xs font-semibold text-[#D4AF37]">
              {indiaTime || 'CALCULATING...'}
            </span>
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="p-3 rounded-2xl glass-panel glass-panel-hover text-gray-300 hover:text-white"
            title="Return to Zenith"
          >
            <ArrowUp className="w-5 h-5 text-[#D4AF37]" />
          </button>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
        <p>© {new Date().getFullYear()} Harman Sadhwani. All Rights Reserved.</p>
        <p className="flex items-center gap-1">
          <span>Crafted for high performance & cinematic immersion</span>
        </p>
      </div>
    </footer>
  );
}
