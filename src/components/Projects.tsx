import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'motion/react';
import {
  ExternalLink,
  Play,
  X,
  GitBranch,
  Sliders,
  Film,
  Image as ImageIcon,
} from 'lucide-react';
import { projectsData, Project } from '../data/projects';
import { LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText } from './GlassEffects';

const PIXEL_SLAT_COLUMNS = Array.from({ length: 16 }, (_, i) => i);

export function FlagshipMediaCard({
  project,
  numStr,
  totalStr = '03',
  onInspect,
}: {
  project: Project;
  numStr: string;
  totalStr?: string;
  onInspect: (p: Project) => void;
}) {
  const [logoFailed, setLogoFailed] = useState(!project.image);
  const [videoFailed, setVideoFailed] = useState(!project.video);
  const [isHovered, setIsHovered] = useState(false);
  const [pixelOverlayMode, setPixelOverlayMode] = useState<'sorted' | 'raw'>(
    'sorted'
  );
  const [cursorCol, setCursorCol] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setLogoFailed(!project.image);
    setVideoFailed(!project.video);
  }, [project]);

  // Normalized cursor coordinates (-0.5 to 0.5) for Framer Motion magnetic pull & gentle 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 220, damping: 22, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  const smoothGlareX = useSpring(glareX, springConfig);
  const smoothGlareY = useSpring(glareY, springConfig);

  // Subtle magnetic pull translation toward cursor (px)
  const pullX = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const pullY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  // Gentle 3D tilt toward the cursor on hover (deg)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

  const spotlightBackground = useMotionTemplate`radial-gradient(520px circle at ${smoothGlareX}% ${smoothGlareY}%, rgba(252, 246, 181, 0.38) 0%, rgba(212, 175, 55, 0.12) 45%, transparent 75%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    mouseX.set(relX - 0.5);
    mouseY.set(relY - 0.5);
    glareX.set(relX * 100);
    glareY.set(relY * 100);
    setCursorCol(Math.floor(relX * PIXEL_SLAT_COLUMNS.length));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCursorCol(null);
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || videoFailed || !project.video) return;
    vid.play().catch(() => {});
  }, [project, videoFailed]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: pullX,
        y: pullY,
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="will-change-transform"
    >
      <article className="group relative overflow-hidden border-2 border-[#12110e] bg-white shadow-[8px_8px_0px_#d4af37] transition-shadow duration-300 hover:shadow-[12px_12px_0px_#12110e]">
        {/* Dynamic Cursor-Following Golden Specular Glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: spotlightBackground,
            opacity: isHovered ? 1 : 0,
          }}
          aria-hidden="true"
        />

        {/* Top Animated Pixel-Sorted Luminance Ribbon */}
        <div className="h-2 w-full pixel-sort-bar-h border-b-2 border-[#12110e]" />

        {/* Top Architectural Telemetry Strip */}
        <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#12110e] bg-[#12110e] px-5 py-2 font-mono text-xs font-bold text-[#fcf6b5]">
          <div className="flex items-center gap-3">
            <span className="bg-[#d4af37] px-2 py-0.5 text-[#12110e]">
              MAJOR_PROJECT.{numStr}
            </span>
            <span className="tracking-widest uppercase">{project.name}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-[#d4af37]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-300">{project.status}</span>
          </div>
        </div>

        <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column (7 Cols): Dedicated Background Video Slot + Logo Slot */}
          <div className="relative overflow-hidden bg-[#12110e] lg:col-span-7 border-b-2 lg:border-b-0 lg:border-r-2 border-[#12110e]">
            <div className="relative aspect-video w-full overflow-hidden bg-[#12110e] flex items-center justify-center">
              {project.video && !videoFailed ? (
                <video
                  ref={videoRef}
                  src={project.video}
                  poster={project.image || project.fallbackImage}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={() => setVideoFailed(true)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              ) : (
                /* Dedicated Background Video Placeholder Slot (for videos to be added later) */
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#12110e] pixel-matrix-bg">
                  <div className="border-2 border-dashed border-[#d4af37]/70 bg-black/60 px-6 py-5 max-w-md w-full space-y-2.5 shadow-[6px_6px_0px_rgba(212,175,55,0.25)]">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center border-2 border-[#d4af37] bg-[#12110e] text-[#fcf6b5]">
                      <Film className="h-5 w-5 text-[#d4af37]" />
                    </div>
                    <div className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      BACKGROUND VIDEO SLOT
                    </div>
                    <p className="font-display text-base font-black text-white">
                      {project.name} — Background Video Area
                    </p>
                    <p className="font-mono text-[10px] text-[#fcf6b5]/70">
                      Reserved 16:9 background video canvas (to be added later)
                    </p>
                  </div>
                </div>
              )}

              {/* Abstract 16-Column Pixel-Sort Slat Curtain Overlay */}
              {pixelOverlayMode === 'sorted' && (
                <div
                  className="pointer-events-none absolute inset-0 grid grid-cols-16"
                  aria-hidden="true"
                >
                  {PIXEL_SLAT_COLUMNS.map((colIdx) => {
                    const dist =
                      cursorCol !== null ? Math.abs(colIdx - cursorCol) : 99;
                    const isNearCursor = dist <= 2;
                    const barHeight = isNearCursor
                      ? 8
                      : 16 + ((colIdx * 17) % 32);

                    return (
                      <div
                        key={colIdx}
                        className="relative flex flex-col justify-between border-r border-[#d4af37]/15"
                      >
                        <motion.div
                          animate={{
                            height: isHovered
                              ? `${barHeight}%`
                              : `${Math.min(24, barHeight)}%`,
                          }}
                          transition={{ duration: 0.25, ease: 'linear' }}
                          style={{
                            backgroundColor:
                              colIdx % 3 === 0
                                ? 'rgba(212, 175, 55, 0.42)'
                                : colIdx % 2 === 0
                                ? 'rgba(18, 17, 14, 0.5)'
                                : 'rgba(252, 246, 181, 0.32)',
                          }}
                          className="w-full border-b-2 border-[#d4af37]"
                        />
                        <motion.div
                          animate={{
                            height: isNearCursor
                              ? '5%'
                              : `${10 + ((colIdx * 13) % 20)}%`,
                          }}
                          transition={{ duration: 0.25, ease: 'linear' }}
                          className="w-full bg-[#12110e]/65 border-t-2 border-[#fcf6b5]/60"
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Top-Left Dedicated Project Logo Slot + Index Plate */}
              <div className="absolute left-3 top-3 z-20 flex items-center gap-2.5 border-2 border-[#12110e] bg-white px-2.5 py-1.5 shadow-[4px_4px_0px_#d4af37]">
                <div className="flex h-8 w-8 items-center justify-center border border-[#12110e] bg-[#f8f5ec] overflow-hidden shrink-0">
                  {project.image && !logoFailed ? (
                    <img
                      src={project.image}
                      alt={`${project.name} logo`}
                      width={32}
                      height={32}
                      referrerPolicy="no-referrer"
                      onError={() => setLogoFailed(true)}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span
                      title="Logo Slot (To be added later)"
                      className="flex flex-col items-center justify-center font-mono text-[8px] font-bold text-[#b8860b] leading-none"
                    >
                      <ImageIcon className="h-3.5 w-3.5 text-[#12110e]" />
                      <span>LOGO</span>
                    </span>
                  )}
                </div>
                <div className="text-left leading-tight">
                  <span className="block font-mono text-[9px] font-bold uppercase text-[#b8860b]">
                    LOGO SLOT · {numStr}/{totalStr}
                  </span>
                  <span className="block font-mono text-[11px] font-black text-[#12110e]">
                    {project.name}
                  </span>
                </div>
              </div>

              {/* Top-Right Pixel-Sort Filter Mode Toggle */}
              <div className="absolute right-3 top-3 z-20 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setPixelOverlayMode((m) =>
                      m === 'sorted' ? 'raw' : 'sorted'
                    )
                  }
                  className="inline-flex items-center gap-1.5 border-2 border-[#12110e] bg-[#12110e] px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37] hover:bg-[#d4af37] hover:text-[#12110e] transition-colors cursor-pointer"
                >
                  <Sliders className="h-3 w-3" />
                  <span>
                    {pixelOverlayMode === 'sorted'
                      ? 'SORT_CURTAIN: ON'
                      : 'RAW_VIDEO'}
                  </span>
                </button>
              </div>

              {/* Bottom-Left Background Video Slot Indicator */}
              <div className="absolute bottom-3 left-3 z-20 hidden sm:inline-flex items-center gap-1.5 border border-[#d4af37] bg-[#12110e]/90 px-2.5 py-1 font-mono text-[10px] font-bold text-[#fcf6b5]">
                <Film className="h-3 w-3 text-[#d4af37]" />
                <span>
                  {project.video && !videoFailed
                    ? 'BG VIDEO ACTIVE · SLOT READY'
                    : 'BG VIDEO SLOT · READY FOR UPLOAD'}
                </span>
              </div>

              {/* Bottom-Right Inspect Blueprint Trigger */}
              <button
                type="button"
                onClick={() => onInspect(project)}
                className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 border-2 border-[#12110e] bg-[#fcf6b5] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-[#12110e] shadow-[4px_4px_0px_#12110e] transition-transform hover:-translate-y-0.5 hover:bg-[#d4af37] cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Inspect Blueprint</span>
              </button>
            </div>
          </div>

          {/* Right Column (5 Cols): Dedicated Logo Header + Pixel-Sorted Editorial Dossier */}
          <div className="flex flex-col justify-between p-5 md:p-6 lg:col-span-5 bg-white pixel-matrix-bg">
            <div className="space-y-3">
              {/* Top Dossier Bar with Dedicated Logo Frame */}
              <div className="flex items-center justify-between gap-3 border-b-2 border-[#12110e] pb-3">
                <div className="flex items-center gap-3">
                  {/* Dedicated Project Logo Slot Box */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border-2 border-[#12110e] bg-[#f8f5ec] shadow-[3px_3px_0px_#d4af37] overflow-hidden">
                    {project.image && !logoFailed ? (
                      <img
                        src={project.image}
                        alt={`${project.name} logo`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-1">
                        <ImageIcon className="h-4 w-4 text-[#b8860b]" />
                        <span className="font-mono text-[8px] font-bold text-[#12110e] leading-tight">
                          LOGO
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#b8860b]">
                      MAJOR PROJECT {numStr} / {totalStr}
                    </div>
                    <h3 className="font-display text-2xl font-black tracking-tight text-[#12110e]">
                      <PixelScrambleText text={project.name} />
                    </h3>
                  </div>
                </div>

                <span className="border border-[#12110e] bg-[#fcf6b5] px-2 py-0.5 font-mono text-[10px] font-bold text-[#12110e]">
                  {project.year || '2026'}
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-[#12110e]/80">
                {project.description}
              </p>

              {/* Key Highlights as Sorted Luminance Rows */}
              <div className="space-y-1.5 pt-1">
                <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#b8860b]">
                  System Capabilities &amp; Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {(project.highlights || []).slice(0, 4).map((feat, fIdx) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 border border-[#12110e] bg-[#f8f5ec] px-2 py-1 text-[11px] font-medium text-[#12110e]"
                    >
                      <span
                        className="h-2.5 w-1.5 shrink-0"
                        style={{
                          backgroundColor:
                            fIdx % 2 === 0 ? '#12110e' : '#d4af37',
                        }}
                        aria-hidden="true"
                      />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer: Clean Unboxed Tech Stack + Primary CTAs */}
            <div className="mt-4 space-y-3 border-t-2 border-[#12110e] pt-3">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-[#12110e]/75">
                <span className="font-bold text-[#12110e]">Stack:</span>
                {project.technologies.map((tech, tIdx) => (
                  <React.Fragment key={tech}>
                    <span>{tech}</span>
                    {tIdx < project.technologies.length - 1 && (
                      <span className="text-[#b8860b]" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold sheen inline-flex items-center gap-2 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Live Platform</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center gap-2 px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    <span>Releases &amp; Code</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}

                {project.demo || project.github ? (
                  <button
                    type="button"
                    onClick={() => onInspect(project)}
                    className="btn-outline px-3.5 py-2 font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Blueprint &amp; Media
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-2 border-2 border-[#12110e] bg-[#fcf6b5] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#12110e] shadow-[4px_4px_0px_#d4af37]">
                    <span className="h-2 w-2 animate-pulse bg-[#d4af37]" aria-hidden="true" />
                    <span>Releasing Soon</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export function FlagshipStageSwitcher({
  activeStage,
}: {
  activeStage: 'keys-ai' | 'reviewbot' | 'crown';
}) {
  const scrollToStage = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const tabs = [
    { id: 'projects', key: 'keys-ai', code: '01', label: 'Keys.AI' },
    { id: 'reviewbot', key: 'reviewbot', code: '02', label: 'ReviewBOT' },
    { id: 'crown-pierce', key: 'crown', code: '03', label: 'Crown' },
  ] as const;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tabs.map((tab) => {
        const isActive = activeStage === tab.key;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => scrollToStage(tab.id)}
            className={`px-3.5 py-1.5 border-2 border-[#12110e] font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
              isActive
                ? 'bg-[#12110e] text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]'
                : 'bg-white text-[#12110e]/75 hover:bg-[#fcf6b5] hover:text-[#12110e]'
            }`}
          >
            <span className="text-[#d4af37] mr-1.5">{tab.code}/</span>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Projects({
  stageMode = 'keys-ai',
  externalSelectedProject,
  onClearExternalProject,
}: {
  stageMode?: 'keys-ai' | 'reviewbot' | 'crown';
  externalSelectedProject?: Project | null;
  onClearExternalProject?: () => void;
}) {
  const keysAiProject =
    projectsData.find((p) => p.id === 'keys-ai') || projectsData[0];
  const reviewBotProject =
    projectsData.find((p) => p.id === 'reviewbot') || projectsData[1];
  const crownProject =
    projectsData.find((p) => p.id === 'crown-code-terminal-agent') ||
    projectsData[2];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    if (externalSelectedProject) {
      setSelectedProject(externalSelectedProject);
    }
  }, [externalSelectedProject]);

  const closeModal = () => {
    setSelectedProject(null);
    if (onClearExternalProject) onClearExternalProject();
  };

  return (
    <>
      <div className="w-full space-y-4">
        {stageMode === 'keys-ai' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <LuxurySectionHeading
                align="left"
                kicker="03A. Major Project Showcase · 01 / 03"
                title={
                  <>
                    Keys<span className="gold-text">.AI</span> Ecosystem
                  </>
                }
                subtitle="Unified AI desktop assistant & agentic workspace — with dedicated logo and background video showcase slots."
              />
              <FlagshipStageSwitcher activeStage="keys-ai" />
            </div>

            <FlagshipMediaCard
              project={keysAiProject}
              numStr="01"
              totalStr="03"
              onInspect={(p) => setSelectedProject(p)}
            />
          </div>
        )}

        {stageMode === 'reviewbot' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <LuxurySectionHeading
                align="left"
                kicker="03B. Major Project Showcase · 02 / 03"
                title={
                  <>
                    Review<span className="gold-text">BOT</span> Platform
                  </>
                }
                subtitle="AI-powered GitHub repository and code review platform — with dedicated logo and background video showcase slots."
              />
              <FlagshipStageSwitcher activeStage="reviewbot" />
            </div>

            <FlagshipMediaCard
              project={reviewBotProject}
              numStr="02"
              totalStr="03"
              onInspect={(p) => setSelectedProject(p)}
            />
          </div>
        )}

        {stageMode === 'crown' && (
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
              <LuxurySectionHeading
                align="left"
                kicker="03C. Major Project Showcase · 03 / 03"
                title={
                  <>
                    Crown <span className="gold-text">Code Agent</span>
                  </>
                }
                subtitle="Autonomous CLI & agentic developer system under Crown Pierce — lined up with dedicated logo and background video slots."
              />
              <FlagshipStageSwitcher activeStage="crown" />
            </div>

            <FlagshipMediaCard
              project={crownProject}
              numStr="03"
              totalStr="03"
              onInspect={(p) => setSelectedProject(p)}
            />
          </div>
        )}
      </div>

      {/* ================= ARCHITECTURE & VIDEO BLUEPRINT MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#12110e]/75 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
          >
            <motion.div
              initial={{ opacity: 0, filter: 'blur(4px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto border-2 border-[#12110e] bg-white shadow-[12px_12px_0px_#d4af37]"
            >
              <div className="h-2 w-full pixel-sort-bar-h border-b-2 border-[#12110e]" />

              <div className="sticky top-0 z-20 flex items-center justify-between border-b-2 border-[#12110e] bg-[#12110e] px-6 py-4 text-[#fcf6b5]">
                <div>
                  <div className="font-mono text-[11px] text-[#d4af37]">
                    {selectedProject.category} · {selectedProject.status}
                  </div>
                  <h3
                    id="modal-project-title"
                    className="font-display text-2xl font-black text-white"
                  >
                    {selectedProject.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="border border-[#fcf6b5] bg-[#12110e] p-2 text-[#fcf6b5] hover:bg-[#d4af37] hover:text-[#12110e] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6 pixel-matrix-bg">
                {selectedProject.video ? (
                  <div className="border-2 border-[#12110e] bg-[#12110e] overflow-hidden shadow-[6px_6px_0px_#12110e]">
                    <video
                      src={selectedProject.video}
                      poster={
                        selectedProject.fallbackImage || selectedProject.image
                      }
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full max-h-[340px] object-cover"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-[#12110e] bg-[#f8f5ec] p-6 text-center font-mono text-xs text-[#12110e]/70">
                    Background video slot reserved for {selectedProject.name} (to be added later).
                  </div>
                )}

                <p className="text-sm sm:text-base text-[#12110e]/85 leading-relaxed">
                  {selectedProject.description}
                </p>

                {selectedProject.highlights &&
                  selectedProject.highlights.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#b8860b] flex items-center gap-2">
                        <GitBranch className="w-4 h-4" />
                        <span>
                          System Workflow &amp; Capabilities Pipeline
                        </span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedProject.highlights.map(
                          (step: string, i: number) => (
                            <div
                              key={step}
                              className="p-3.5 border-2 border-[#12110e] bg-[#f8f5ec] flex items-start gap-3 shadow-[4px_4px_0px_#d4af37]"
                            >
                              <span className="font-mono text-xs font-bold bg-[#12110e] text-[#fcf6b5] px-2 py-0.5">
                                0{i + 1}
                              </span>
                              <span className="text-xs font-medium text-[#12110e]">
                                {step}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                <div className="pt-4 border-t-2 border-[#12110e] flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#12110e]/80">
                    <span className="font-bold text-[#12110e]">Tech:</span>
                    <span>{selectedProject.technologies.join(' · ')}</span>
                  </div>

                  {(selectedProject.demo || selectedProject.github) && (
                    <a
                      href={selectedProject.demo || selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-gold sheen inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider"
                    >
                      <span>
                        {selectedProject.demo
                          ? 'Open Live Platform'
                          : 'Explore Releases'}
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
