import React, { useState } from 'react';
import { LuxurySectionHeading } from './GoldenSunMotif';
import {
  Interactive3DTiltCard,
  PixelScrambleText,
  PixelTransitionPanel,
} from './GlassEffects';

const BIO_BANDS = [
  {
    code: 'CH_01 // IDENTITY_CORE',
    title: 'Founder & Core Developer — Crown Pierce',
    density: 94,
    text: 'Harman Sadhwani is a passionate BCA developer, AI builder, and Full-Stack Developer focused on building intelligent software that solves real-world problems. As the Founder and Core Developer of Crown Pierce, he leads the development of innovative AI-powered products that combine modern design, automation, and practical functionality.',
  },
  {
    code: 'CH_02 // TECHNICAL_SPECTRUM',
    title: 'Agentic AI & Full-Stack Engineering',
    density: 88,
    text: 'His interests span Artificial Intelligence, Agentic AI Development, Machine Learning, Full-Stack Web Development, Application Development, Software Architecture, UI/UX Engineering, and Developer Tools. Rather than simply creating applications, he focuses on building products that improve productivity and enhance the developer experience.',
  },
  {
    code: 'CH_03 // COMPETITIVE_ARENA',
    title: 'Hackathons, Research & Rapid Execution',
    density: 91,
    text: 'Alongside software development, Harman actively participates in hackathons, technical conferences, research presentations, and innovation competitions. His work reflects a commitment to continuous learning, experimentation, and transforming ideas into polished, production-ready solutions.',
  },
  {
    code: 'CH_04 // NORTH_STAR',
    title: 'Where Intelligence Meets Design',
    density: 97,
    text: 'His goal is to create impactful technology that blends intelligence, elegant design, and usability.',
  },
];

const EXPERTISE_AREAS = [
  { name: 'Artificial Intelligence', band: '█▓▒' },
  { name: 'Agentic AI Systems', band: '██▓' },
  { name: 'Machine Learning', band: '█▓░' },
  { name: 'Full Stack Development', band: '██▒' },
  { name: 'Application Development', band: '█▓▒' },
  { name: 'Software Architecture', band: '██░' },
  { name: 'UI/UX Engineering', band: '█▓▒' },
  { name: 'Developer Tools', band: '██▓' },
  { name: 'Automation', band: '█▓▒' },
  { name: 'Applied Research', band: '█▒░' },
];

const STATS = [
  { value: '08+', label: 'Verified Certificates', bar: [85, 95, 70, 100, 80] },
  { value: '02', label: 'Podium Trophies', bar: [90, 100, 85, 75, 95] },
  { value: '02', label: 'Ribbon Medals', bar: [75, 90, 100, 80, 90] },
  { value: '02+', label: 'Research Conferences', bar: [80, 85, 95, 100, 88] },
];

const IDENTITY_PILLARS = [
  {
    title: 'Developer',
    code: 'MOD_01',
    bars: [65, 88, 100, 74, 92, 58],
    description:
      'Building web applications, backend systems and software tools.',
  },
  {
    title: 'AI Builder',
    code: 'MOD_02',
    bars: [92, 100, 84, 96, 78, 90],
    description:
      'Experimenting with AI assistants, agents, automation and intelligent software.',
  },
  {
    title: 'Problem Solver',
    code: 'MOD_03',
    bars: [78, 94, 82, 100, 86, 72],
    description:
      'Hackathons, technical competitions and project-based development.',
  },
  {
    title: 'Product Builder',
    code: 'MOD_04',
    bars: [88, 76, 98, 90, 100, 84],
    description: 'Turning ideas into functional prototypes and applications.',
  },
];

export default function About() {
  const [activePillar, setActivePillar] = useState(0);
  const [activeBand, setActiveBand] = useState<number>(0);

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <LuxurySectionHeading
          align="left"
          kicker="01 // ABOUT · PIXEL_STRATA"
          title={
            <>
              Architecting <span className="gold-text">Intelligence</span>
            </>
          }
          subtitle="BCA Developer · Full-Stack Engineer · Founder of Crown Pierce · Agentic AI Builder"
        />

        {/* Quick Philosophy Banner */}
        <div className="border-2 border-[#12110e] bg-[#12110e] px-3.5 py-2 text-[#fcf6b5] shadow-[4px_4px_0px_#d4af37]">
          <span className="block font-mono text-[9px] text-[#d4af37]">
            DOCTRINE // PIXEL_MANIFESTO
          </span>
          <span className="font-display text-xs sm:text-sm font-black tracking-wide">
            &ldquo;INNOVATION BEGINS WHERE CURIOSITY MEETS EXECUTION.&rdquo;
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: 4-Channel Pixel-Sort Narrative Strata + 4 Voxel Pillars */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="border-2 border-[#12110e] bg-white shadow-[6px_6px_0px_#d4af37] overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-[#12110e] bg-[#12110e] px-3.5 py-2 font-mono text-xs font-bold text-[#fcf6b5]">
              <span>█▓▒░ BIO_LUMINANCE_STRATA // 04 CHANNELS</span>
              <div className="flex items-center gap-1">
                {BIO_BANDS.map((b, i) => (
                  <button
                    key={b.code}
                    type="button"
                    onClick={() => setActiveBand(i)}
                    className={`px-2 py-0.5 font-mono text-[10px] font-bold border cursor-pointer ${
                      activeBand === i
                        ? 'border-[#fcf6b5] bg-[#d4af37] text-[#12110e]'
                        : 'border-[#fcf6b5]/30 text-[#fcf6b5]/75 hover:text-white'
                    }`}
                  >
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 border-b-2 border-[#12110e] bg-[#f8f5ec]">
              {BIO_BANDS.map((band, idx) => {
                const isSelected = activeBand === idx;
                return (
                  <button
                    key={band.code}
                    type="button"
                    onClick={() => setActiveBand(idx)}
                    className={`p-2.5 text-left border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#12110e] transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#12110e] text-[#fcf6b5]'
                        : 'bg-[#f8f5ec] text-[#12110e] hover:bg-[#fcf6b5]'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[9px] font-bold">
                      <span className="text-[#d4af37]">0{idx + 1}</span>
                      <span>LUM:{band.density}%</span>
                    </div>
                    <p className="font-display text-xs font-black truncate mt-0.5">
                      {band.title}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Narrative Channel — Pixelates In-Place when switched */}
            <PixelTransitionPanel activeKey={activeBand} className="p-4 bg-white">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold text-[#b8860b]">
                  {BIO_BANDS[activeBand].code}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-24 h-2 border border-[#12110e] bg-[#f8f5ec] p-px">
                    <div
                      className="h-full pixel-sort-bar-h"
                      style={{ width: `${BIO_BANDS[activeBand].density}%` }}
                    />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-base sm:text-lg font-black text-[#12110e] mb-1.5">
                {BIO_BANDS[activeBand].title}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-[#12110e]/85">
                {BIO_BANDS[activeBand].text}
              </p>
            </PixelTransitionPanel>
          </div>

          {/* 4 Quantized Identity Equalizer Modules */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {IDENTITY_PILLARS.map((item, idx) => {
              const isSelected = activePillar === idx;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActivePillar(idx)}
                  className={`text-left border-2 border-[#12110e] p-3 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#12110e] text-[#fcf6b5] shadow-[4px_4px_0px_#d4af37]'
                      : 'bg-white text-[#12110e] shadow-[3px_3px_0px_#12110e] hover:bg-[#fcf6b5]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-[9px] font-bold text-[#d4af37]">
                      {item.code}
                    </span>
                    <div className="flex items-end gap-0.5 h-3.5">
                      {item.bars.map((h, bIdx) => (
                        <span
                          key={bIdx}
                          style={{ height: `${h}%` }}
                          className={`w-1 ${
                            isSelected ? 'bg-[#d4af37]' : 'bg-[#12110e]'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <h4 className="font-display text-sm font-black">
                    {item.title}
                  </h4>
                  <p
                    className={`mt-1 text-[11px] leading-snug line-clamp-2 ${
                      isSelected ? 'text-[#fcf6b5]/85' : 'text-[#12110e]/75'
                    }`}
                  >
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Voxel Profile Telemetry Dossier */}
        <div className="lg:col-span-5">
          <Interactive3DTiltCard className="h-full border-2 border-[#12110e] bg-white p-4 sm:p-5 shadow-[6px_6px_0px_#12110e] flex flex-col justify-between">
            <div className="space-y-3.5">
              <div className="flex items-center justify-between border-b-2 border-[#12110e] pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-3 w-3 bg-[#d4af37] border border-[#12110e]" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#12110e]">
                    VOXEL_DOSSIER // 2026
                  </span>
                </div>
                <span className="border border-[#12110e] bg-emerald-600 px-2 py-0.5 font-mono text-[9px] font-bold uppercase text-white">
                  ONLINE
                </span>
              </div>

              {/* Education & Venture Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="border-2 border-[#12110e] bg-[#f8f5ec] p-2.5 shadow-[3px_3px_0px_#d4af37]">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#b8860b]">
                    ACADEMIC_TRACK
                  </p>
                  <p className="mt-0.5 font-display text-xs font-black text-[#12110e]">
                    BCA Student
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#12110e]/75">
                    Bachelor of Computer Applications
                  </p>
                </div>

                <div className="border-2 border-[#12110e] bg-[#12110e] p-2.5 text-[#fcf6b5] shadow-[3px_3px_0px_#d4af37]">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#d4af37]">
                    VENTURE_STUDIO
                  </p>
                  <p className="mt-0.5 font-display text-xs font-black text-white">
                    Founder · Crown Pierce
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-[#fcf6b5]/80">
                    Keys.AI · ReviewBOT · True Blade
                  </p>
                </div>
              </div>

              {/* 10 Core Areas of Expertise as Quantized Voxel Chips */}
              <div>
                <p className="mb-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#b8860b]">
                  CORE_FREQUENCY_BANDS (10)
                </p>
                <div className="flex flex-wrap gap-1">
                  {EXPERTISE_AREAS.map((area) => (
                    <span
                      key={area.name}
                      className="inline-flex items-center gap-1 border border-[#12110e] bg-[#f8f5ec] px-2 py-0.5 font-mono text-[10px] font-bold text-[#12110e] hover:bg-[#fcf6b5] transition-colors"
                    >
                      <span className="text-[#b8860b] text-[9px]">
                        {area.band}
                      </span>
                      <span>{area.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 4 Quantized Equalizer Stat Counters */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t-2 border-[#12110e] mt-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-[#12110e] bg-[#f8f5ec] p-2 flex items-center justify-between"
                >
                  <div>
                    <p className="font-display text-lg font-black text-[#12110e] leading-none">
                      <PixelScrambleText text={stat.value} />
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] font-bold uppercase text-[#12110e]/75">
                      {stat.label}
                    </p>
                  </div>
                  <div className="flex items-end gap-0.5 h-5">
                    {stat.bar.map((v, idx) => (
                      <span
                        key={idx}
                        style={{ height: `${v}%` }}
                        className="w-1 bg-[#d4af37] border-t border-[#12110e]"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Interactive3DTiltCard>
        </div>
      </div>
    </div>
  );
}
