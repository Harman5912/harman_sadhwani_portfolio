import React, { useState } from 'react';
import { Download, ExternalLink, FileText, Layers } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText, PixelTransitionPanel } from './GlassEffects';

type ResumeStageMode = 'pdf' | 'dossier';

export default function Resume() {
  const {
    profile,
    education,
    skills,
    experience,
    projects,
    achievements,
    certifications,
  } = portfolioData;

  const [viewMode, setViewMode] = useState<ResumeStageMode>('dossier');

  const flagshipProjects = projects.filter((p) => p.featured);
  const formalCerts = certifications.filter((c) => c.kind === 'Certification');
  const trainingList = certifications.filter((c) => c.kind === 'Training');

  return (
    <div className="w-full space-y-4">
      {/* Header + Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
        <LuxurySectionHeading
          align="left"
          kicker="07. Curriculum Vitae"
          title={
            <>
              My Journey, <span className="gold-text">Pixel-Sorted</span>
            </>
          }
          subtitle="Switch between the multi-channel executive dossier and the embedded official PDF resume."
        />

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center border-2 border-[#12110e] bg-white p-1 shadow-[4px_4px_0px_#d4af37]">
            <button
              type="button"
              onClick={() => setViewMode('dossier')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase cursor-pointer ${
                viewMode === 'dossier'
                  ? 'bg-[#12110e] text-[#fcf6b5]'
                  : 'text-[#12110e]/70 hover:text-[#12110e]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Executive Dossier</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('pdf')}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase cursor-pointer ${
                viewMode === 'pdf'
                  ? 'bg-[#12110e] text-[#fcf6b5]'
                  : 'text-[#12110e]/70 hover:text-[#12110e]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Live PDF Viewer</span>
            </button>
          </div>

          <a
            href={profile.resumeUrl}
            download="Harman_Sadhwani_Resume.pdf"
            className="btn-gold sheen px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      {/* In-Place Pixelating Content Panel */}
      <PixelTransitionPanel activeKey={viewMode}>
        {viewMode === 'dossier' ? (
          <div className="border-2 border-[#12110e] bg-white p-5 shadow-[6px_6px_0px_#12110e] space-y-4">
            {/* Top Executive Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-[#12110e]">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-black text-[#12110e]">
                  <PixelScrambleText text={profile.name} />
                </h3>
                <p className="font-mono text-xs font-bold text-[#b8860b]">
                  {profile.headline}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <a
                  href={`mailto:${portfolioData.contact.email}`}
                  className="border border-[#12110e] bg-[#f8f5ec] px-2.5 py-1 hover:bg-[#fcf6b5]"
                >
                  {portfolioData.contact.email}
                </a>
                <a
                  href={portfolioData.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#12110e] bg-[#f8f5ec] px-2.5 py-1 hover:bg-[#fcf6b5]"
                >
                  GitHub
                </a>
                <a
                  href={portfolioData.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-[#12110e] bg-[#f8f5ec] px-2.5 py-1 hover:bg-[#fcf6b5]"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* 3-Column Compact Executive Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Column 1: Education & Internship */}
              <div className="space-y-3">
                <div className="p-3.5 border-2 border-[#12110e] bg-[#f8f5ec] shadow-[3px_3px_0px_#d4af37]">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#b8860b]">
                    EDUCATION
                  </div>
                  <div className="font-display text-sm font-black text-[#12110e] mt-0.5">
                    {education.degree}
                  </div>
                  <p className="text-xs text-[#12110e]/75 mt-1 leading-relaxed">
                    {education.focus}
                  </p>
                </div>

                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-3.5 border-2 border-[#12110e] bg-white shadow-[3px_3px_0px_#12110e]"
                  >
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] font-bold text-[#b8860b]">
                      <span>EXPERIENCE</span>
                      <span>{exp.duration}</span>
                    </div>
                    <div className="font-display text-sm font-black text-[#12110e] mt-0.5">
                      {exp.role} · {exp.department}
                    </div>
                    <p className="text-xs text-[#12110e]/75 mt-1 leading-relaxed">
                      {exp.highlights[0]}
                    </p>
                  </div>
                ))}
              </div>

              {/* Column 2: Flagships & Verified Awards */}
              <div className="space-y-3">
                <div className="p-3.5 border-2 border-[#12110e] bg-[#f8f5ec] shadow-[3px_3px_0px_#12110e]">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#b8860b] mb-1.5">
                    FLAGSHIP ECOSYSTEMS ({flagshipProjects.length})
                  </div>
                  <div className="space-y-1.5">
                    {flagshipProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className="border border-[#12110e] bg-white px-2.5 py-1.5 flex items-center justify-between"
                      >
                        <span className="font-display text-xs font-black text-[#12110e]">
                          {proj.name}
                        </span>
                        <span className="font-mono text-[9px] font-bold text-[#b8860b]">
                          {proj.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 border-2 border-[#12110e] bg-white shadow-[3px_3px_0px_#d4af37]">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#b8860b] mb-1.5">
                    VERIFIED HONOURS ({achievements.length})
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {achievements.slice(0, 6).map((ach) => (
                      <div
                        key={ach.id}
                        className="text-[11px] flex items-center justify-between gap-2 border-b border-[#12110e]/15 pb-0.5"
                      >
                        <span className="font-bold text-[#12110e] truncate">
                          {ach.title}
                        </span>
                        <span className="font-mono text-[8px] font-bold bg-[#fcf6b5] px-1 py-px border border-[#12110e] shrink-0">
                          {ach.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Column 3: Technical Stack & Credentials */}
              <div className="space-y-3">
                <div className="p-3.5 border-2 border-[#12110e] bg-[#12110e] text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#d4af37] mb-1.5">
                    CERTIFICATIONS &amp; TRAINING
                  </div>
                  <p className="text-xs text-[#fcf6b5]/90 leading-relaxed">
                    <strong className="text-[#d4af37]">Certs:</strong>{' '}
                    {formalCerts.map((c) => c.title).join(' · ')}
                  </p>
                  <p className="text-xs text-[#fcf6b5]/80 leading-relaxed mt-1.5">
                    <strong className="text-[#d4af37]">Training:</strong>{' '}
                    {trainingList.map((t) => t.title).join(' · ')}
                  </p>
                </div>

                <div className="p-3.5 border-2 border-[#12110e] bg-[#f8f5ec]">
                  <div className="font-mono text-[10px] font-bold uppercase text-[#b8860b] mb-1.5">
                    CORE DOMAINS ({skills.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((cat) => (
                      <span
                        key={cat.id}
                        className="border border-[#12110e] bg-white px-2 py-0.5 font-mono text-[10px] font-bold text-[#12110e]"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden border-2 border-[#12110e] bg-white shadow-[8px_8px_0px_#d4af37]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#12110e] bg-[#12110e] px-4 py-2.5 font-mono text-xs font-bold text-[#fcf6b5]">
              <span>DOCUMENT // HARMAN_SADHWANI_RESUME.PDF</span>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#d4af37] hover:underline"
              >
                <span>Open Full Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <embed
              src={profile.resumeUrl}
              type="application/pdf"
              title="Harman Sadhwani — Resume"
              className="block h-[54vh] w-full"
            />
          </div>
        )}
      </PixelTransitionPanel>
    </div>
  );
}
