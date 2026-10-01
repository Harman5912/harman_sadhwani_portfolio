import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Sparkles,
  Download,
  Copy,
  Check,
  ArrowRight,
  Crown,
  Sun,
  MessageSquare,
  Layers,
  Award,
  FileText,
  Mail,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { projectsData, Project } from '../data/projects';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category:
    | 'Quick Actions'
    | 'Three Major Projects'
    | 'Steady Viewport Stages'
    | 'Easter Eggs & Modes';
  icon: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onInspectProject,
  onTriggerSolarZenith,
}: {
  isOpen: boolean;
  onClose: () => void;
  onInspectProject: (project: Project) => void;
  onTriggerSolarZenith: () => void;
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          window.dispatchEvent(new CustomEvent('open-command-palette'));
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const commands: CommandItem[] = useMemo(() => {
    const keysAi = projectsData.find((p) => p.id === 'keys-ai');
    const reviewBot = projectsData.find((p) => p.id === 'reviewbot');
    const crownAgent = projectsData.find(
      (p) => p.id === 'crown-code-terminal-agent'
    );

    return [
      {
        id: 'act-ai',
        title: "Open Harman's AI Agent",
        subtitle: 'Launch the voice-enabled portfolio agent',
        category: 'Quick Actions',
        icon: <MessageSquare className="w-4 h-4 text-[#b8860b]" />,
        shortcut: '07',
        onSelect: () => {
          window.dispatchEvent(new CustomEvent('open-ai-agent'));
          onClose();
        },
      },
      {
        id: 'act-resume',
        title: 'Download Official Resume (PDF)',
        subtitle: 'Save Harman_Sadhwani_Resume.pdf directly to your device',
        category: 'Quick Actions',
        icon: <Download className="w-4 h-4 text-[#b8860b]" />,
        shortcut: 'PDF',
        onSelect: () => {
          const a = document.createElement('a');
          a.href = portfolioData.profile.resumeUrl;
          a.download = 'Harman_Sadhwani_Resume.pdf';
          a.click();
          onClose();
        },
      },
      {
        id: 'act-copy-email',
        title: copiedEmail
          ? 'Copied: sadhwaniharman@gmail.com'
          : 'Copy Email Address',
        subtitle: portfolioData.contact.email,
        category: 'Quick Actions',
        icon: copiedEmail ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : (
          <Copy className="w-4 h-4 text-[#b8860b]" />
        ),
        shortcut: 'COPY',
        onSelect: () => {
          navigator.clipboard?.writeText(portfolioData.contact.email);
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        },
      },
      {
        id: 'proj-keys-ai',
        title: 'Keys.AI — Major Project 01/03',
        subtitle:
          'View Keys.AI separately with logo & background video showcase',
        category: 'Three Major Projects',
        icon: <Sparkles className="w-4 h-4 text-[#b8860b]" />,
        shortcut: '03A',
        onSelect: () => {
          if (keysAi) onInspectProject(keysAi);
          scrollTo('projects');
        },
      },
      {
        id: 'proj-reviewbot',
        title: 'ReviewBOT — Major Project 02/03',
        subtitle:
          'View ReviewBOT separately with logo & background video showcase',
        category: 'Three Major Projects',
        icon: <Sparkles className="w-4 h-4 text-[#b8860b]" />,
        shortcut: '03B',
        onSelect: () => {
          if (reviewBot) onInspectProject(reviewBot);
          scrollTo('reviewbot');
        },
      },
      {
        id: 'proj-crown',
        title: 'Crown Code Terminal Agent — Major Project 03/03',
        subtitle:
          'View Crown separately with reserved logo & background video slots',
        category: 'Three Major Projects',
        icon: <Crown className="w-4 h-4 text-[#b8860b]" />,
        shortcut: '03C',
        onSelect: () => {
          if (crownAgent) onInspectProject(crownAgent);
          scrollTo('crown-pierce');
        },
      },
      {
        id: 'nav-minor',
        title: 'Minor Projects Catalogue (By Category Division)',
        subtitle:
          'Compact categorized division explorer for True Blade & all minor projects',
        category: 'Steady Viewport Stages',
        icon: <Layers className="w-4 h-4 text-[#12110e]" />,
        shortcut: '04',
        onSelect: () => scrollTo('minor-projects'),
      },
      {
        id: 'nav-certs',
        title: 'Achievements & Certificates (3D Trophy Case)',
        subtitle:
          'Inspect all 8 competition & conference certificates from the live portfolio',
        category: 'Steady Viewport Stages',
        icon: <Award className="w-4 h-4 text-[#b8860b]" />,
        shortcut: '05',
        onSelect: () => scrollTo('certificates'),
      },
      {
        id: 'nav-resume',
        title: 'Executive Dossier & Live Resume PDF',
        subtitle: 'Jump to the interactive CV stage',
        category: 'Steady Viewport Stages',
        icon: <FileText className="w-4 h-4 text-[#12110e]" />,
        shortcut: '06',
        onSelect: () => scrollTo('resume'),
      },
      {
        id: 'nav-contact',
        title: 'Contact Transceiver',
        subtitle: 'Email, LinkedIn, GitHub, Instagram, and WhatsApp channels',
        category: 'Steady Viewport Stages',
        icon: <Mail className="w-4 h-4 text-[#12110e]" />,
        shortcut: '08',
        onSelect: () => scrollTo('contact'),
      },
      {
        id: 'egg-solar',
        title: 'Trigger Pixel-Sort Overdrive',
        subtitle: 'Accelerate falling pixel-sorted luminance columns',
        category: 'Easter Eggs & Modes',
        icon: <Sun className="w-4 h-4 text-[#b8860b]" />,
        shortcut: 'BURST',
        onSelect: () => {
          onClose();
          onTriggerSolarZenith();
        },
      },
    ];
  }, [copiedEmail, onClose, onInspectProject, onTriggerSolarZenith]);

  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleListKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(
        (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredCommands[selectedIndex]?.onSelect();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#12110e]/70 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="Universal Command Palette"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleListKeyDown}
            className="w-full max-w-2xl overflow-hidden border-2 border-[#12110e] bg-white shadow-[12px_12px_0px_#d4af37]"
          >
            <div className="h-2 w-full pixel-sort-bar-h border-b-2 border-[#12110e]" />

            <div className="flex items-center gap-3 border-b-2 border-[#12110e] bg-[#12110e] px-5 py-3.5 text-[#fcf6b5]">
              <Search className="w-5 h-5 text-[#d4af37] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to Keys.AI, ReviewBOT, Crown, Minor Projects, Certificates..."
                className="w-full bg-transparent text-sm sm:text-base font-mono text-[#fcf6b5] placeholder:text-[#fcf6b5]/45 focus:outline-none"
              />
              <kbd className="hidden sm:inline-block border border-[#fcf6b5]/40 bg-black px-2 py-0.5 font-mono text-[10px] font-bold text-[#d4af37]">
                ESC
              </kbd>
            </div>

            <div className="max-h-[58vh] overflow-y-auto p-3 space-y-1.5 bg-[#f8f5ec] pixel-matrix-bg">
              {filteredCommands.map((item, idx) => {
                const active = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={item.onSelect}
                    className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors border cursor-pointer ${
                      active
                        ? 'bg-[#12110e] text-[#fcf6b5] border-[#12110e] shadow-[4px_4px_0px_#d4af37]'
                        : 'bg-white text-[#12110e] border-[#12110e]/30 hover:border-[#12110e]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center border ${
                          active
                            ? 'border-[#fcf6b5] bg-[#d4af37] text-[#12110e]'
                            : 'border-[#12110e] bg-[#f8f5ec]'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="font-display text-sm font-black truncate">
                          {item.title}
                        </div>
                        <div
                          className={`text-xs truncate ${
                            active ? 'text-[#fcf6b5]/75' : 'text-[#12110e]/65'
                          }`}
                        >
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.shortcut && (
                        <span
                          className={`px-2 py-0.5 font-mono text-[10px] font-bold border ${
                            active
                              ? 'border-[#d4af37] bg-[#d4af37] text-[#12110e]'
                              : 'border-[#12110e] bg-[#f8f5ec] text-[#12110e]'
                          }`}
                        >
                          {item.shortcut}
                        </span>
                      )}
                      <ArrowRight
                        className={`w-4 h-4 ${
                          active ? 'text-[#d4af37]' : 'text-[#12110e]/30'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
