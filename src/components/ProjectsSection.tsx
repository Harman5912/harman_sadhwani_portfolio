import React, { useState, Suspense } from 'react';
import { flagshipProjects, additionalProjects, ProjectItem } from '../data/portfolioData';
import { Canvas } from '@react-three/fiber';
import InteractiveProjectModel from './canvas/InteractiveProjectModel';
import { ExternalLink, Github, Terminal, Check, Eye, Sparkles, Layers, Grid } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [selectedFlagshipIndex, setSelectedFlagshipIndex] = useState(0);
  const [viewAllModal, setViewAllModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const currentProject = flagshipProjects[selectedFlagshipIndex];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/30 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2">
          <Terminal className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>FLAGSHIPS & INNOVATIONS // 03</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Featured <span className="text-gold-gradient">Architectures</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      {/* Flagship Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-1.5 p-1 rounded-full glass-panel border border-amber-400/25">
          {flagshipProjects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => {
                soundFx.playClickPulse();
                setSelectedFlagshipIndex(idx);
              }}
              onMouseEnter={() => soundFx.playHoverChime()}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                selectedFlagshipIndex === idx
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              0{idx + 1} {proj.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            soundFx.playClickPulse();
            setViewAllModal(true);
          }}
          onMouseEnter={() => soundFx.playHoverChime()}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 hover:border-amber-400 text-xs font-mono text-gray-300 hover:text-[#F5E4B5] transition-colors"
        >
          <Grid className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>All Prototypes (10)</span>
        </button>
      </div>

      {/* Active Flagship Interactive Showcase Card */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="glass-panel rounded-3xl border border-amber-500/30 p-5 sm:p-7 relative overflow-hidden transition-all duration-500 hover:border-amber-400 hover:shadow-[0_20px_80px_rgba(212,175,55,0.2)] text-left"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Media Stage */}
          <div className="md:col-span-6 relative rounded-2xl overflow-hidden border border-amber-400/30 aspect-video bg-black/80 shadow-2xl group">
            {currentProject.video ? (
              <video
                key={currentProject.video}
                src={currentProject.video}
                poster={currentProject.image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover filter brightness-[0.98] group-hover:brightness-105 transition-all duration-700"
              />
            ) : (
              <img
                src={currentProject.image}
                alt={currentProject.name}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-amber-400/50 font-mono text-[9px] text-[#F5E4B5] tracking-widest uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>FLAGSHIP // 0{selectedFlagshipIndex + 1}</span>
            </div>

            <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-400/50 font-mono text-[9px] text-emerald-300 tracking-wider">
              {currentProject.status}
            </div>

            {/* 3D Micro Stage */}
            <div className="absolute bottom-2 right-2 w-20 h-20 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
                <ambientLight intensity={1.8} />
                <directionalLight position={[2, 4, 3]} intensity={3.0} color="#FFF2D1" />
                <Suspense fallback={null}>
                  <InteractiveProjectModel type={currentProject.modelType} isHovered={isHovered} />
                </Suspense>
              </Canvas>
            </div>
          </div>

          {/* Right Info Details */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {currentProject.organization && (
                <div className="inline-flex items-center gap-1 font-mono text-[9px] text-[#D4AF37] uppercase tracking-widest mb-1 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <Layers className="w-3 h-3" />
                  <span>ECOSYSTEM: {currentProject.organization}</span>
                </div>
              )}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                {currentProject.name}
              </h3>
              <p className="font-serif text-xs text-[#F5E4B5] mb-2 font-medium">
                {currentProject.tagline}
              </p>
              <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                {currentProject.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-col gap-1.5 mb-4">
                {currentProject.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                    <Check className="w-3 h-3 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {currentProject.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white/[0.05] border border-amber-400/20 text-[9px] font-mono text-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
              {currentProject.demo && (
                <a
                  href={currentProject.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClickPulse()}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-bold text-xs tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Deployment</span>
                </a>
              )}

              {currentProject.github && (
                <a
                  href={currentProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClickPulse()}
                  className="px-4 py-2 rounded-full glass-panel glass-panel-hover text-xs font-semibold text-white tracking-wider flex items-center gap-1.5 border border-white/20 hover:border-amber-400"
                >
                  <Github className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Releases</span>
                </a>
              )}

              <button
                onClick={() => {
                  soundFx.playClickPulse();
                  onSelectProject(currentProject);
                }}
                className="px-3.5 py-2 rounded-full glass-panel glass-panel-hover text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 border border-white/10"
              >
                <Eye className="w-3.5 h-3.5 text-[#F5E4B5]" />
                <span>Deep Inspect</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for All Additional Competitive Prototypes */}
      {viewAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="glass-panel w-full max-w-4xl max-h-[85vh] rounded-3xl border border-amber-500/30 p-6 flex flex-col text-left overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Competitive Systems & Academic Prototypes
                </h3>
                <p className="text-xs text-gray-400">
                  National Hackathon solutions, research publications, and applied engineering systems.
                </p>
              </div>
              <button
                onClick={() => setViewAllModal(false)}
                className="p-2 rounded-full glass-panel text-gray-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {additionalProjects.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setViewAllModal(false);
                    onSelectProject(p);
                  }}
                  className="glass-panel p-4 rounded-xl border border-white/10 glass-panel-hover cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full aspect-video object-cover rounded-lg mb-2"
                  />
                  <span className="font-mono text-[9px] text-[#D4AF37] block uppercase">{p.category}</span>
                  <h4 className="font-serif text-sm font-semibold text-white mb-1">{p.name}</h4>
                  <p className="text-[11px] text-gray-400 line-clamp-2">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
