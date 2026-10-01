/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Home,
  Sparkles,
  Crown,
  Layers,
  Award,
  FileText,
  Bot,
  Command,
  Sun,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ProjectExplorer from './components/ProjectExplorer';
import AchievementsGallery from './components/AchievementsGallery';
import Resume from './components/Resume';
import FloatingAgent from './components/FloatingAgent';
import Contact from './components/Contact';
import Solarpunk3DBackground from './components/Solarpunk3DBackground';
import CommandPalette from './components/CommandPalette';
import PixelStageViewport, {
  ViewportStageConfig,
} from './components/PixelStageViewport';
import { ScrollProgressRibbon } from './components/GlassEffects';
import { SolarAtmosphere } from './components/GoldenSunMotif';
import { Project } from './data/projects';

export default function App() {
  const [easterEggProject, setEasterEggProject] = useState<Project | null>(
    null
  );
  const [solarBurstActive, setSolarBurstActive] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleOpenCmd = () => setCommandOpen(true);
    window.addEventListener('open-command-palette', handleOpenCmd);
    return () =>
      window.removeEventListener('open-command-palette', handleOpenCmd);
  }, []);

  const handleTriggerSolarEasterEgg = () => {
    setSolarBurstActive(true);
    setTimeout(() => {
      setSolarBurstActive(false);
    }, 4500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 11 Steady Viewport Stages — each fills the viewport without overflowing,
  // and pixelates into disappearance / appearance in-place on scroll!
  const stages: ViewportStageConfig[] = useMemo(
    () => [
      {
        id: 'home',
        code: '00',
        label: 'Hero',
        render: () => <Hero />,
      },
      {
        id: 'about',
        code: '01',
        label: 'About',
        render: () => <About />,
      },
      {
        id: 'skills',
        code: '02',
        label: 'Skills',
        render: () => <Skills />,
      },
      {
        id: 'projects',
        code: '03A',
        label: 'Keys.AI',
        render: () => (
          <Projects
            stageMode="keys-ai"
            externalSelectedProject={easterEggProject}
            onClearExternalProject={() => setEasterEggProject(null)}
          />
        ),
      },
      {
        id: 'reviewbot',
        code: '03B',
        label: 'ReviewBOT',
        render: () => (
          <Projects
            stageMode="reviewbot"
            externalSelectedProject={easterEggProject}
            onClearExternalProject={() => setEasterEggProject(null)}
          />
        ),
      },
      {
        id: 'crown-pierce',
        code: '03C',
        label: 'Crown',
        render: () => (
          <Projects
            stageMode="crown"
            externalSelectedProject={easterEggProject}
            onClearExternalProject={() => setEasterEggProject(null)}
          />
        ),
      },
      {
        id: 'minor-projects',
        code: '04',
        label: 'Minor Projects',
        render: () => (
          <ProjectExplorer
            onTriggerKeysAiEasterEgg={(project) => {
              setEasterEggProject(project);
              scrollToSection('projects');
            }}
            onTriggerSolarEasterEgg={handleTriggerSolarEasterEgg}
          />
        ),
      },
      {
        id: 'certificates',
        code: '05',
        label: 'Achievements & Certificates',
        render: () => <AchievementsGallery />,
      },
      {
        id: 'resume',
        code: '06',
        label: 'Resume',
        render: () => <Resume />,
      },
      {
        id: 'contact',
        code: '08',
        label: 'Contact',
        render: () => <Contact />,
      },
    ],
    [easterEggProject]
  );

  return (
    <div className="h-dvh w-dvw overflow-hidden bg-[#f8f5ec] text-[#12110e] relative">
      {/* Top Pixel-Sorted Scroll Progress Ribbon */}
      <ScrollProgressRibbon />

      {/* Universal ⌘K Pixel-Sort Command Palette */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onInspectProject={(proj) => {
          setEasterEggProject(proj);
        }}
        onTriggerSolarZenith={handleTriggerSolarEasterEgg}
      />

      {/* Falling Golden Pixel-Sorted Columns & Voxels in the Background (Steady in Viewport) */}
      <Solarpunk3DBackground solarBurstActive={solarBurstActive} />

      {/* Ambient Pixel-Sort Light, SVG Pixelation Filters & Interactive Cursor Scanner */}
      <SolarAtmosphere solarBurstActive={solarBurstActive} />

      {/* Fixed Pixel-Sorted Top Navigation Bar */}
      <Navbar />

      {/* Floating Voice-Enabled AI Agent pinned to the right edge */}
      <FloatingAgent />

      {/* Steady Viewport Pixelation Stage Engine */}
      <main className="relative z-10 h-full w-full overflow-hidden">
        <PixelStageViewport stages={stages} />
      </main>

      {/* Quantized Voxel Floating Dock (Universal Viewport-Fitted for Desktop, Mobile, TV & Round Screens) */}
      <div className="fixed bottom-1.5 sm:bottom-2.5 left-1/2 z-40 flex max-w-[92dvw] -translate-x-1/2 items-center gap-0.5 sm:gap-1 border-2 border-[#12110e] bg-white px-1.5 sm:px-2 py-1 shadow-[4px_4px_0px_#d4af37] overflow-x-auto no-scrollbar">
        {[
          { label: 'Home', id: 'home', Icon: Home },
          { label: 'Keys.AI', id: 'projects', Icon: Sparkles },
          { label: 'ReviewBOT', id: 'reviewbot', Icon: Sparkles },
          { label: 'Crown', id: 'crown-pierce', Icon: Crown },
          { label: 'Minor Projects', id: 'minor-projects', Icon: Layers },
          { label: 'Certificates', id: 'certificates', Icon: Award },
          { label: 'Resume', id: 'resume', Icon: FileText },
          { label: 'AI Agent', id: 'ai-agent', Icon: Bot },
        ].map((item) => {
          const IconComp = item.Icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (item.id === 'ai-agent') {
                  window.dispatchEvent(new CustomEvent('open-ai-agent'));
                } else {
                  scrollToSection(item.id);
                }
              }}
              title={item.label}
              aria-label={`Materialize ${item.label}`}
              className="group relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center border border-transparent text-[#12110e] transition-colors hover:border-[#12110e] hover:bg-[#fcf6b5] cursor-pointer"
            >
              <IconComp className="h-3.5 w-3.5" />
            </button>
          );
        })}

        <div className="mx-0.5 h-4 w-0.5 bg-[#12110e] shrink-0" aria-hidden="true" />

        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          title="Spotlight Command (⌘K)"
          aria-label="Open Universal Command Palette"
          className="flex h-7 sm:h-8 shrink-0 items-center gap-1 border border-[#12110e] bg-[#12110e] px-1.5 sm:px-2 font-mono text-[9px] sm:text-[10px] font-bold text-[#fcf6b5] transition-colors hover:bg-[#d4af37] hover:text-[#12110e] cursor-pointer"
        >
          <Command className="h-3 w-3" />
          <span className="hidden sm:inline">⌘K</span>
        </button>

        <button
          type="button"
          onClick={handleTriggerSolarEasterEgg}
          title="Trigger Pixel-Sort Overdrive"
          aria-label="Trigger Pixel-Sort Overdrive"
          className="group relative flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center border border-[#12110e] bg-[#fcf6b5] text-[#12110e] transition-colors hover:bg-[#d4af37] cursor-pointer"
        >
          <Sun className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
