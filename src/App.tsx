import React, { useState, useMemo } from 'react';
import GrandKingdomScene from './components/canvas/GrandKingdomScene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceEducationSection from './components/ExperienceEducationSection';
import ContactSection from './components/ContactSection';
import IntroLoader from './components/IntroLoader';
import ProjectModal from './components/ProjectModal';
import CertificateModal from './components/CertificateModal';
import SpatialHUD from './components/SpatialHUD';
import CyberCursor from './components/CyberCursor';
import FocalStageViewport, { StageConfig } from './components/FocalStageViewport';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  // Fixed to Wireframe Shader as requested
  const [sceneMode, setSceneMode] = useState<'cinematic' | 'wireframe' | 'quantum'>('wireframe');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    image: string;
    result: string;
    description: string;
  } | null>(null);

  // 7 Steady Viewport Stages anchored at the single focal point
  const stages: StageConfig[] = useMemo(
    () => [
      {
        id: 'hero',
        code: '00',
        label: 'HERO',
        component: (
          <Hero
            onExplore={() => setCurrentStage(1)}
            onViewProjects={() => setCurrentStage(3)}
          />
        ),
      },
      {
        id: 'about',
        code: '01',
        label: 'ABOUT',
        component: <AboutSection />,
      },
      {
        id: 'skills',
        code: '02',
        label: 'SKILLS',
        component: <SkillsSection />,
      },
      {
        id: 'projects',
        code: '03',
        label: 'PROJECTS',
        component: <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />,
      },
      {
        id: 'achievements',
        code: '04',
        label: 'HONORS',
        component: (
          <AchievementsSection onSelectCertificate={(c) => setSelectedCertificate(c)} />
        ),
      },
      {
        id: 'experience',
        code: '05',
        label: 'JOURNEY',
        component: <ExperienceEducationSection />,
      },
      {
        id: 'contact',
        code: '06',
        label: 'CONTACT',
        component: <ContactSection />,
      },
    ],
    []
  );

  // Compute normalized 3D camera travel progress (0 to 1) based on current stage
  const scrollProgress = stages.length > 1 ? currentStage / (stages.length - 1) : 0;

  return (
    <div className="relative w-screen h-screen bg-[#07080B] text-[#F5F5F7] font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden select-none">
      {/* Interactive Cyber Reticle Cursor */}
      <CyberCursor />

      {/* Introductory Cinematic Loader */}
      {loading && <IntroLoader onComplete={() => setLoading(false)} />}

      {/* Persistent 3D WebGL Digital Kingdom Scene with Wireframe Shader & Unreal Bloom */}
      <GrandKingdomScene scrollProgress={scrollProgress} sceneMode={sceneMode} />

      {/* Floating Glass Navigation Header */}
      <Navbar
        currentStage={currentStage}
        onNavigateStage={(idx) => setCurrentStage(idx)}
      />

      {/* Single Point Focal Stage Viewport with Golden Dust Particle Dissolve / Assemble */}
      <FocalStageViewport
        stages={stages}
        currentStage={currentStage}
        onStageChange={(newIdx) => setCurrentStage(newIdx)}
      />

      {/* Spatial HUD with 3D Mode Switcher & Telemetry */}
      <SpatialHUD
        scrollProgress={scrollProgress}
        activeMode={sceneMode}
        onChangeMode={(m) => setSceneMode(m)}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
}
