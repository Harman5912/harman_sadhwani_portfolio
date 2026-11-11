import React, { useState, Suspense } from 'react';
import { flagshipProjects, additionalProjects, ProjectItem } from '../data/portfolioData';
import { Canvas } from '@react-three/fiber';
import InteractiveProjectModel from './canvas/InteractiveProjectModel';
import { Sparkles, ExternalLink, Github, Terminal, ArrowUpRight, Check, Eye } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export default function ProjectsSection({ onSelectProject }: ProjectsSectionProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-3">
          <Terminal className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>FLAGSHIPS & INNOVATIONS</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
          Featured <span className="text-gold-gradient">Architectures</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        <p className="mt-4 text-xs sm:text-sm text-gray-300 font-light">
          Autonomous developer environments, multi-agent AI ecosystems, and production web platforms built with real-world precision.
        </p>
      </div>

      {/* 3 FLAGSHIP PROJECTS */}
      <div className="flex flex-col gap-14 mb-24">
        {flagshipProjects.map((project, idx) => {
          const isHovered = hoveredProjectId === project.id;
          return (
            <div
              key={project.id}
              onMouseEnter={() => {
                setHoveredProjectId(project.id);
                soundFx.playHoverChime();
              }}
              onMouseLeave={() => setHoveredProjectId(null)}
              className="glass-panel rounded-3xl border border-amber-500/25 p-6 sm:p-10 relative overflow-hidden transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_20px_70px_rgba(212,175,55,0.12)] text-left"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Side: Media + 3D Micro Stage */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video bg-black/60 group">
                    {project.video ? (
                      <video
                        src={project.video}
                        poster={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover filter brightness-[0.95] group-hover:brightness-105 transition-all duration-700"
                      />
                    ) : (
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/40 font-mono text-[10px] text-[#F5E4B5] tracking-wider uppercase">
                      FLAGSHIP · 0{idx + 1}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/40 font-mono text-[10px] text-emerald-300 tracking-wider">
                      {project.status}
                    </div>

                    {/* Floating 3D Micro Model in bottom right corner */}
                    <div className="absolute bottom-2 right-2 w-24 h-24 pointer-events-none">
                      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[2, 4, 3]} intensity={2.5} color="#FFF2D1" />
                        <Suspense fallback={null}>
                          <InteractiveProjectModel type={project.modelType} isHovered={isHovered} />
                        </Suspense>
                      </Canvas>
                    </div>
                  </div>
                </div>

                {/* Right Side: Information & Actions */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    {/* Organization Tag */}
                    {project.organization && (
                      <span className="inline-block font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest mb-1">
                        BY {project.organization}
                      </span>
                    )}
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 tracking-wide">
                      {project.name}
                    </h3>
                    <p className="font-serif text-xs sm:text-sm text-[#F5E4B5] mb-4">
                      {project.tagline}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-col gap-2 mb-6">
                      {project.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Stack Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClickPulse()}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-semibold text-xs tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Live Deployment</span>
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFx.playClickPulse()}
                        className="px-4 py-2 rounded-full glass-panel glass-panel-hover text-xs font-semibold text-white tracking-wider flex items-center gap-1.5 border border-white/20"
                      >
                        <Github className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Source / Releases</span>
                      </a>
                    )}

                    <button
                      onClick={() => {
                        soundFx.playClickPulse();
                        onSelectProject(project);
                      }}
                      className="px-4 py-2 rounded-full glass-panel glass-panel-hover text-xs font-medium text-gray-300 hover:text-white flex items-center gap-1.5 border border-white/10"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#F5E4B5]" />
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADDITIONAL VERIFIED INNOVATIONS */}
      <div>
        <div className="text-center mb-10">
          <h3 className="font-serif text-2xl font-bold text-white uppercase tracking-wide">
            Additional <span className="text-gold-gradient">Competitive Systems</span>
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Academic research papers, national hackathons, and applied engineering prototypes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundFx.playClickPulse();
                onSelectProject(project);
              }}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-6 rounded-2xl border border-white/10 glass-panel-hover cursor-pointer text-left flex flex-col justify-between group"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-video mb-4 border border-white/10 bg-black/40">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-mono text-[#F5E4B5] border border-amber-400/30">
                    {project.year}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-[#D4AF37] tracking-wider uppercase mb-1">
                  {project.category}
                </div>
                <h4 className="font-serif text-base font-semibold text-white group-hover:text-[#F5E4B5] transition-colors mb-2">
                  {project.name}
                </h4>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/[0.04] text-[9px] font-mono text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono text-gray-400">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-[#D4AF37] font-medium pt-3 border-t border-white/10">
                  <span>View Prototype</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
