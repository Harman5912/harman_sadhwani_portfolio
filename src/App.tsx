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
import FocalStageViewport, { StageConfig } from './components/FocalStageViewport';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentStage, setCurrentStage] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    image: string;
    result: string;
    description: string;
  } | null>(null);

  // 7 Viewport Stages anchored at the single focal point
  const stages: StageConfig[] = useMemo(
    () => [
      {
        id: 'hero',
        code: '00',
        label: 'INTRO',
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
        label: 'EXPERIENCE',
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

  // Compute normalized camera travel progress (0 to 1) based on current stage
  const scrollProgress = stages.length > 1 ? currentStage / (stages.length - 1) : 0;

  return (
    <div className="relative w-screen h-screen bg-[#07080B] text-[#F5F5F7] font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden select-none">
      {/* Introductory loader */}
      {loading && <IntroLoader onComplete={() => setLoading(false)} />}

      {/* 3D background scene */}
      <GrandKingdomScene scrollProgress={scrollProgress} />

      {/* Navigation */}
      <Navbar
        currentStage={currentStage}
        onNavigateStage={(idx) => setCurrentStage(idx)}
      />

      {/* Stage viewport with dust particle transition */}
      <FocalStageViewport
        stages={stages}
        currentStage={currentStage}
        onStageChange={(newIdx) => setCurrentStage(newIdx)}
      />

      {/* Modals */}
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
