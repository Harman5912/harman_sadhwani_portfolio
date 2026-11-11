import React, { useState } from 'react';
import { skillsCategories, SkillNode } from '../data/portfolioData';
import { Sparkles, Code2, Cpu, Globe, Database, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('core-languages');
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);

  const categories = [
    { id: 'core-languages', label: 'Languages', icon: Code2 },
    { id: 'ai-agents', label: 'AI & Agentic', icon: Cpu },
    { id: 'frontend-3d', label: '3D & Frontend', icon: Globe },
    { id: 'backend-cloud', label: 'Backend & Cloud', icon: Database },
  ];

  const displayedSkills =
    skillsCategories.find((c) => c.id === activeCategory)?.skills || skillsCategories[0].skills;

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/30 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2">
          <Cpu className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>TECHNICAL MATRIX // 02</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Engineered <span className="text-gold-gradient">Capabilities</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      {/* Category Navigation Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
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
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
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
              className={`glass-panel p-4 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/[0.1] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                  : 'border-white/10 hover:border-amber-500/40 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 font-mono text-[10px] font-bold text-[#F5E4B5] flex items-center justify-center">
                    {skill.iconTag}
                  </span>
                  <h3 className="font-serif text-xs font-semibold text-white tracking-wide">
                    {skill.name}
                  </h3>
                </div>
                <span className="font-mono text-xs font-semibold text-[#D4AF37]">
                  {skill.level}%
                </span>
              </div>

              {/* Level Progress Line */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-amber-600 via-[#D4AF37] to-[#F5E4B5] rounded-full transition-all duration-700"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                {skill.context}
              </p>
            </div>
          );
        })}
      </div>

      {/* Core Masteries Ribbon */}
      <div className="p-3.5 glass-panel rounded-2xl border border-amber-500/20 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
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
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-amber-400/20 text-[10px] font-mono text-gray-300"
            >
              <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
              <span>{tag}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
