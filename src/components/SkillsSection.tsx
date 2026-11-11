import React, { useState } from 'react';
import { skillsCategories, SkillNode } from '../data/portfolioData';
import { Sparkles, Code2, Cpu, Globe, Database, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  const categories = [
    { id: 'all', label: 'All Disciplines', icon: Sparkles },
    { id: 'core-languages', label: 'Languages', icon: Code2 },
    { id: 'ai-agents', label: 'AI & Agentic', icon: Cpu },
    { id: 'frontend-3d', label: '3D & Frontend', icon: Globe },
    { id: 'backend-cloud', label: 'Backend & Cloud', icon: Database },
  ];

  const displayedSkills =
    activeCategory === 'all'
      ? skillsCategories.flatMap((c) => c.skills)
      : skillsCategories.find((c) => c.id === activeCategory)?.skills || [];

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-3">
          <Cpu className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>TECHNICAL ARSENAL</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
          Engineered <span className="text-gold-gradient">Capabilities</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        <p className="mt-4 text-xs sm:text-sm text-gray-300 font-light">
          A high-precision matrix spanning real-time WebGL spatial graphics, autonomous LLM agent frameworks, and resilient cloud architectures.
        </p>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClickPulse();
                setActiveCategory(cat.id);
              }}
              onMouseEnter={() => soundFx.playHoverChime()}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'glass-panel text-gray-300 hover:text-white hover:border-amber-400/40'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#D4AF37]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Skills Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedSkills.map((skill, index) => {
          const isSelected = selectedSkill?.name === skill.name;
          return (
            <div
              key={`${skill.name}-${index}`}
              onClick={() => {
                soundFx.playClickPulse();
                setSelectedSkill(isSelected ? null : skill);
              }}
              onMouseEnter={() => soundFx.playHoverChime()}
              className={`glass-panel p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/[0.08] shadow-[0_0_30px_rgba(212,175,55,0.2)] -translate-y-1'
                  : 'border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 font-mono text-[11px] font-bold text-[#F5E4B5] flex items-center justify-center">
                    {skill.iconTag}
                  </span>
                  <div>
                    <h3 className="font-serif text-sm font-semibold text-white tracking-wide">
                      {skill.name}
                    </h3>
                  </div>
                </div>
                <span className="font-mono text-xs font-semibold text-[#D4AF37]">
                  {skill.level}%
                </span>
              </div>

              {/* Level Progress Line */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-[#F5E4B5] rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Context Description */}
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                {skill.context}
              </p>
            </div>
          );
        })}
      </div>

      {/* Highlighted Core Competencies Ribbon */}
      <div className="mt-14 p-6 glass-panel rounded-3xl border border-amber-500/20 text-center">
        <p className="font-serif text-xs sm:text-sm font-semibold text-[#F5E4B5] uppercase tracking-widest mb-4">
          Core Masteries Required by the Architecture
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {[
            'Python',
            'Java',
            'JavaScript',
            'TypeScript',
            'React',
            'Angular',
            'HTML',
            'CSS',
            'SQL',
            'Firebase',
            'Node.js',
            'AI/ML',
            'Agentic AI',
            'RAG',
            'MCP',
            'API Integration',
          ].map((tag, idx) => (
            <span
              key={idx}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-amber-400/25 text-[11px] font-mono text-gray-200 hover:border-amber-400 hover:text-[#FFFBF0] transition-colors"
            >
              <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
