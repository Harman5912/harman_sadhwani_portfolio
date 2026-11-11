import React from 'react';
import { achievementsList, AchievementItem } from '../data/portfolioData';
import { Award, Trophy, Medal, Star, ExternalLink, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface AchievementsSectionProps {
  onSelectCertificate: (cert: { title: string; image: string; result: string; description: string }) => void;
}

export default function AchievementsSection({ onSelectCertificate }: AchievementsSectionProps) {
  const getBadgeIcon = (category: string) => {
    switch (category) {
      case 'Award':
        return <Trophy className="w-4 h-4 text-[#D4AF37]" />;
      case 'Conference':
        return <Medal className="w-4 h-4 text-[#F5E4B5]" />;
      case 'Hackathon':
        return <Award className="w-4 h-4 text-[#D4AF37]" />;
      default:
        return <Star className="w-4 h-4 text-[#F5E4B5]" />;
    }
  };

  return (
    <section id="achievements" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-3">
          <Trophy className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>HONORS & RECOGNITION</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
          Trophies & <span className="text-gold-gradient">Credentials</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        <p className="mt-4 text-xs sm:text-sm text-gray-300 font-light">
          Verified competitive placements, research conference accolades, and hackathon medals with authentic certificates.
        </p>
      </div>

      {/* Grid of Verified Certificate Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
            className="glass-panel rounded-2xl border border-white/10 glass-panel-hover p-4 cursor-pointer text-left flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Certificate Real Image Preview */}
            <div>
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-3.5 border border-white/15 bg-black/50">
                <img
                  src={item.certificateRef}
                  alt={item.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Badge Tag */}
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 flex items-center gap-1.5 text-[9px] font-mono text-[#F5E4B5]">
                  {getBadgeIcon(item.category)}
                  <span>{item.badgeLabel}</span>
                </div>
              </div>

              {/* Title & Result */}
              <div className="font-mono text-[9px] text-[#D4AF37] tracking-wider uppercase mb-1">
                {item.dateOrContext}
              </div>
              <h3 className="font-serif text-sm font-semibold text-white group-hover:text-[#F5E4B5] transition-colors mb-1.5 leading-snug">
                {item.title}
              </h3>
              <p className="font-mono text-[11px] text-[#D4AF37] font-medium mb-2">
                {item.result}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 font-light">
                {item.description}
              </p>
            </div>

            {/* Click to Zoom Certificate */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-300 group-hover:text-[#F5E4B5] transition-colors">
              <span>View Certificate</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Hackathon & Open Source Honors */}
      <div className="mt-14 glass-panel p-8 rounded-3xl border border-amber-500/20 text-left">
        <div className="flex items-center gap-2.5 mb-4">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wide">
            Hacktober & Innovation Sprint Accolades
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-gray-300 font-light mb-6">
          Further competitive wins, open-source distinctions, and hackathon advancements from regional and university championships:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'AI Club Hacktober', award: 'Winner', context: 'University AI Sprint' },
            { title: 'Allen House Hacktober', award: 'Best Open Source Project', context: 'Developer Track' },
            { title: 'GOS Hacktober', award: '1st Position', context: 'Open-Source Hackathon' },
            { title: 'MSME Idea Hackathon 6.0', award: 'Round 2 Qualified', context: 'National Enterprise Round' },
          ].map((h, i) => (
            <div
              key={i}
              onMouseEnter={() => soundFx.playHoverChime()}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 glass-panel-hover"
            >
              <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-wider block mb-1">
                {h.context}
              </span>
              <h4 className="font-serif text-sm font-semibold text-white mb-1">
                {h.title}
              </h4>
              <span className="font-mono text-xs text-[#F5E4B5] font-medium block">
                {h.award}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
