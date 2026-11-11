import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import GrandKingdomScene from './components/canvas/GrandKingdomScene';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ExperienceEducationSection from './components/ExperienceEducationSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import IntroLoader from './components/IntroLoader';
import ProjectModal from './components/ProjectModal';
import CertificateModal from './components/CertificateModal';
import SpatialHUD from './components/SpatialHUD';
import CyberCursor from './components/CyberCursor';
import { ProjectItem } from './data/portfolioData';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneMode, setSceneMode] = useState<'cinematic' | 'wireframe' | 'quantum'>('cinematic');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    image: string;
    result: string;
    description: string;
  } | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalScroll));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -20, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07080B] text-[#F5F5F7] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Interactive Cyber Reticle Cursor */}
      <CyberCursor />

      {/* Introductory Cinematic Loader */}
      {loading && <IntroLoader onComplete={() => setLoading(false)} />}

      {/* Persistent 3D WebGL Digital Kingdom Scene with Custom Shaders & Unreal Bloom */}
      <GrandKingdomScene scrollProgress={scrollProgress} sceneMode={sceneMode} />

      {/* Floating Glass Navigation Header */}
      <Navbar onNavigate={scrollToSection} />

      {/* Spatial HUD with 3D Mode Switcher & Telemetry */}
      <SpatialHUD
        scrollProgress={scrollProgress}
        activeMode={sceneMode}
        onChangeMode={(m) => setSceneMode(m)}
      />

      {/* Foreground Content Stack */}
      <main className="relative z-10 flex flex-col pointer-events-auto">
        <Hero
          onExplore={() => scrollToSection('about')}
          onViewProjects={() => scrollToSection('projects')}
        />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <AchievementsSection onSelectCertificate={(c) => setSelectedCertificate(c)} />
        <ExperienceEducationSection />
        <ContactSection />
        <Footer />
      </main>

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
