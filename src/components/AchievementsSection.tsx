import React from 'react';
import { achievementsList } from '../data/portfolioData';
import { Trophy, Medal, Award, Star, ExternalLink, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AchievementsSectionProps {
  onSelectCertificate: (cert: { title: string; image: string; result: string; description: string }) => void;
}

export default function AchievementsSection({ onSelectCertificate }: AchievementsSectionProps) {
  const getBadgeIcon = (category: string) => {
    switch (category) {
      case 'Award':
        return <Trophy className="w-3.5 h-3.5 text-[#D4AF37]" />;
      case 'Conference':
        return <Medal className="w-3.5 h-3.5 text-[#F5E4B5]" />;
      case 'Hackathon':
        return <Award className="w-3.5 h-3.5 text-[#D4AF37]" />;
      default:
        return <Star className="w-3.5 h-3.5 text-[#F5E4B5]" />;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/30 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2">
          <Trophy className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>HONORS & CREDENTIALS // 04</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Trophies & <span className="text-gold-gradient">Credentials</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      {/* Grid of Verified Certificate Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {achievementsList.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              soundFx.playClickPulse();
              onSelectCertificate({
                title: item.title,
                image: item.certificateRef,
                result: item.result,
                description: item.description,
              });
            }}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="glass-panel rounded-xl border border-white/10 glass-panel-hover p-3 cursor-pointer text-left flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="relative rounded-lg overflow-hidden aspect-[4/3] mb-2.5 border border-white/15 bg-black/50">
                <img
                  src={item.certificateRef}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 flex items-center gap-1 text-[8px] font-mono text-[#F5E4B5]">
                  {getBadgeIcon(item.category)}
                  <span>{item.badgeLabel}</span>
                </div>
              </div>

              <div className="font-mono text-[8px] text-[#D4AF37] tracking-wider uppercase mb-0.5">
                {item.dateOrContext}
              </div>
              <h3 className="font-serif text-xs font-semibold text-white group-hover:text-[#F5E4B5] transition-colors mb-1 line-clamp-1 leading-snug">
                {item.title}
              </h3>
              <p className="font-mono text-[10px] text-[#D4AF37] font-medium mb-1 line-clamp-1">
                {item.result}
              </p>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-300 group-hover:text-[#F5E4B5] transition-colors">
              <span>Zoom Proof</span>
              <ExternalLink className="w-3 h-3 text-[#D4AF37]" />
            </div>
          </div>
        ))}
      </div>

      {/* Hacktober Sprint Accolades Ribbon */}
      <div className="p-3.5 glass-panel rounded-2xl border border-amber-500/20 text-left">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <h4 className="font-serif text-xs font-bold text-white uppercase tracking-wider">
              Hacktober Sprint & Regional Honors
            </h4>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { title: 'AI Club Hacktober', award: 'Winner', context: 'AI Track' },
            { title: 'Allen House Hacktober', award: 'Best Open Source', context: 'Dev Sprint' },
            { title: 'GOS Hacktober', award: '1st Position', context: 'Open-Source' },
            { title: 'MSME Idea Hackathon', award: 'Round 2 Qualified', context: 'Enterprise 6.0' },
          ].map((h, i) => (
            <div key={i} className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10">
              <span className="font-mono text-[8px] text-[#D4AF37] uppercase block">{h.context}</span>
              <h5 className="font-serif text-[11px] font-semibold text-white truncate">{h.title}</h5>
              <span className="font-mono text-[10px] text-[#F5E4B5] font-medium">{h.award}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
