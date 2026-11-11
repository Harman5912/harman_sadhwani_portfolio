import React from 'react';
import { ProjectItem } from '../data/portfolioData';
import { X, ExternalLink, Github, Check, Calendar } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-3xl glass-panel rounded-3xl border border-amber-500/30 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.8)] max-h-[90vh] flex flex-col text-left">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Banner */}
        <div className="relative aspect-video w-full bg-black shrink-0 overflow-hidden">
          {project.video ? (
            <video
              src={project.video}
              poster={project.image}
              autoPlay
              controls
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1017] via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                {project.category}
              </span>
              <span className="font-mono text-[10px] text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#D4AF37]" />
                <span>{project.year}</span>
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              {project.name}
            </h3>
            <p className="font-serif text-xs sm:text-sm text-[#F5E4B5] mb-4">
              {project.tagline}
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-6">
                <h4 className="font-serif text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Key Technical Features
                </h4>
                <div className="flex flex-col gap-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="font-serif text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[10px] font-mono text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-semibold text-xs tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live Deployment</span>
              </a>
            )}

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full glass-panel glass-panel-hover text-xs font-semibold text-white tracking-wider flex items-center gap-2 border border-white/20"
              >
                <Github className="w-4 h-4 text-[#D4AF37]" />
                <span>Source Code / Releases</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
