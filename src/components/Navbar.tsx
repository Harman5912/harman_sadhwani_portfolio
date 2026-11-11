import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleToggleSound = () => {
    const isNowActive = soundFx.toggleMute();
    setIsAudioActive(isNowActive);
    if (isNowActive) {
      soundFx.playHoverChime();
    }
  };

  const handleItemClick = (id: string) => {
    soundFx.playClickPulse();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-4 pb-2 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Monogram Brand */}
        <button
          onClick={() => handleItemClick('hero')}
          className="group flex items-center gap-3 px-3.5 py-2 rounded-full glass-panel glass-panel-hover"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-300/30 border border-amber-400/40 flex items-center justify-center">
            <span className="font-serif text-xs font-bold text-[#F5E4B5] tracking-wider">HS</span>
          </div>
          <div className="text-left hidden sm:block">
            <span className="block font-serif text-xs font-semibold tracking-widest text-[#FFFBF0] group-hover:text-[#F5E4B5] transition-colors">
              HARMAN SADHWANI
            </span>
            <span className="block font-mono text-[9px] text-[#D4AF37]/80 tracking-wider">
              3D PORTFOLIO
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full glass-panel">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-[#FFFBF0] hover:bg-white/[0.06] transition-all tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Utility Controls (Sound, Resume, Mobile Toggle) */}
        <div className="flex items-center gap-2">
          {/* Audio Synthesizer Toggle */}
          <button
            onClick={handleToggleSound}
            title={isAudioActive ? 'Mute Celestial Audio' : 'Unmute Celestial Audio'}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-panel glass-panel-hover text-xs font-mono text-gray-300"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#F5E4B5]" />
                <span className="hidden sm:inline text-[10px] text-[#F5E4B5]">SOUND ON</span>
                <span className="flex items-center gap-0.5 ml-1">
                  <span className="w-0.5 h-2.5 bg-[#D4AF37] animate-pulse" />
                  <span className="w-0.5 h-4 bg-[#F5E4B5] animate-pulse delay-75" />
                  <span className="w-0.5 h-1.5 bg-[#D4AF37] animate-pulse delay-150" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                <span className="hidden sm:inline text-[10px] text-gray-400">SOUND OFF</span>
              </>
            )}
          </button>

          {/* Resume Quick Access */}
          <a
            href="/Harman_Sadhwani_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClickPulse()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-400/40 text-xs font-medium text-[#FFFBF0] hover:border-amber-400/70 hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] transition-all"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full glass-panel text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-sm mx-auto glass-panel p-4 rounded-2xl pointer-events-auto border border-amber-500/25 animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium text-gray-200 hover:bg-white/[0.08] hover:text-[#F5E4B5] transition-all"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Harman_Sadhwani_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-sm font-medium text-[#F5E4B5]"
            >
              <span>Download Resume</span>
              <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
