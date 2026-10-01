import React, { useState } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  MessageCircle,
  Check,
  Copy,
} from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { LuxurySectionHeading } from './GoldenSunMotif';
import { PixelScrambleText } from './GlassEffects';

export default function Contact() {
  const { contact, profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [hoveredChannelIdx, setHoveredChannelIdx] = useState<number>(0);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const channels = [
    {
      label: 'Email',
      code: 'CH_01',
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: Mail,
      bars: [92, 100, 78, 96, 84],
    },
    {
      label: 'LinkedIn',
      code: 'CH_02',
      value: 'in/harman-sadhwani',
      href: contact.linkedin,
      Icon: Linkedin,
      bars: [84, 96, 100, 80, 90],
    },
    {
      label: 'GitHub',
      code: 'CH_03',
      value: 'github.com/Harman5912',
      href: contact.github,
      Icon: Github,
      bars: [100, 88, 94, 98, 86],
    },
    {
      label: 'Instagram',
      code: 'CH_04',
      value: '@harmansadhwani.07',
      href: contact.instagram,
      Icon: Instagram,
      bars: [76, 92, 86, 100, 88],
    },
    {
      label: 'WhatsApp',
      code: 'CH_05',
      value: '+91 83189 52798',
      href: 'https://wa.me/918318952798',
      Icon: MessageCircle,
      bars: [88, 82, 96, 90, 100],
    },
  ];

  return (
    <div className="w-full space-y-6">
      <LuxurySectionHeading
        kicker="09. Contact Transceiver"
        title={
          <>
            Let&apos;s <span className="gold-text">Connect</span>
          </>
        }
        subtitle="Have a project in mind, a research idea, an internship opportunity, or just want to say hello? My inbox is always open."
      />

      {/* 5-Channel Pixel-Sorted Transceiver Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {channels.map((ch, idx) => {
          const IconComp = ch.Icon;
          const isHovered = hoveredChannelIdx === idx;
          return (
            <a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={
                ch.href.startsWith('http') ? 'noopener noreferrer' : undefined
              }
              onMouseEnter={() => setHoveredChannelIdx(idx)}
              className={`group flex flex-col justify-between border-2 border-[#12110e] p-4 text-left transition-colors pixel-hover-streak ${
                isHovered
                  ? 'bg-[#12110e] text-[#fcf6b5] shadow-[6px_6px_0px_#d4af37]'
                  : 'bg-white text-[#12110e] shadow-[4px_4px_0px_#12110e]'
              }`}
            >
              <div className="relative z-10 space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                  <span className="text-[#d4af37]">{ch.code}</span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center border border-current ${
                      isHovered
                        ? 'bg-[#d4af37] text-[#12110e]'
                        : 'bg-[#f8f5ec] text-[#12110e]'
                    }`}
                  >
                    <IconComp className="h-4 w-4" />
                  </span>
                </div>

                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-[#b8860b]">
                    {ch.label}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs font-bold break-all">
                    {ch.value}
                  </span>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-2 border-t border-current/20 flex items-end justify-between">
                <span className="font-mono text-[9px] uppercase">
                  SIGNAL_LOCKED
                </span>
                <div className="flex items-end gap-0.5 h-4">
                  {ch.bars.map((h, bIdx) => (
                    <span
                      key={bIdx}
                      style={{ height: `${h}%` }}
                      className={`w-1 ${
                        isHovered ? 'bg-[#d4af37]' : 'bg-[#12110e]'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Primary Action Strip + Architectural Footer Bar */}
      <div className="border-2 border-[#12110e] bg-white p-4 shadow-[6px_6px_0px_#d4af37] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Crown Pierce logo"
            width={28}
            height={28}
            referrerPolicy="no-referrer"
            className="h-7 w-7 border border-[#12110e] bg-[#f8f5ec] p-0.5 object-contain"
          />
          <div className="text-left">
            <span className="block font-display text-xs font-black uppercase tracking-wider text-[#12110e]">
              <PixelScrambleText text={profile.name} /> · CROWN PIERCE
            </span>
            <span className="block font-mono text-[10px] text-[#12110e]/70">
              © {new Date().getFullYear()} All rights reserved · Pixel-Sorted Steady Viewport Engine
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={`mailto:${contact.email}`}
            className="btn-gold sheen px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="btn-outline px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
