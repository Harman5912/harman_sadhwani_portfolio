import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Linkedin, Github, Instagram, MessageCircle, Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export default function ContactSection() {
  const { contact, profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    soundFx.playClickPulse();
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playClickPulse();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/30 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>TRANSMIT DISPATCH // 06</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Enter The <span className="text-gold-gradient">Kingdom</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left items-start">
        {/* Left Column: Direct Verified Channels */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {/* Email Primary Card */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Mail className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Direct Email</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-[#F5E4B5] hover:border-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="font-serif text-base sm:text-lg font-bold text-white hover:text-[#F5E4B5] transition-colors break-all"
            >
              {contact.email}
            </a>
            <p className="text-[11px] text-gray-400 mt-1 font-light">
              Available for full-time engineering roles, AI systems, and technical partnerships.
            </p>
          </div>

          {/* WhatsApp Direct Card */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClickPulse()}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="glass-panel p-4 rounded-2xl border border-emerald-500/30 glass-panel-hover flex items-center justify-between group shadow-[0_0_20px_rgba(37,211,102,0.1)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    WhatsApp Chat
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <span className="font-mono text-xs text-[#F5E4B5]">
                  {contact.whatsappNumber}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform">
              <span>Message</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </a>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-3 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </div>
              <span className="font-serif text-[11px] font-semibold text-white block">LinkedIn</span>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-3 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <Github className="w-4 h-4 text-white" />
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </div>
              <span className="font-serif text-[11px] font-semibold text-white block">GitHub</span>
            </a>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-3 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <ArrowUpRight className="w-3 h-3 text-gray-400" />
              </div>
              <span className="font-serif text-[11px] font-semibold text-white block">Instagram</span>
            </a>
          </div>

          {/* Download Resume Card */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClickPulse()}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 flex items-center justify-between glass-panel-hover"
          >
            <div>
              <span className="font-serif text-xs font-semibold text-[#FFFBF0] block">
                Official Resume
              </span>
              <span className="font-mono text-[9px] text-[#D4AF37]">
                Harman_Sadhwani_Resume.pdf
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </a>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="md:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl border border-white/15">
          <h3 className="font-serif text-lg font-bold text-white mb-1">
            Transmit an Encrypted Dispatch
          </h3>
          <p className="text-[11px] text-gray-400 mb-4 font-light">
            All dispatches route directly to my personal developer inbox.
          </p>

          {formSent ? (
            <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/40 text-center animate-fadeIn">
              <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto mb-2 animate-spin" />
              <h4 className="font-serif text-base font-bold text-white mb-0.5">
                Dispatch Transmitted
              </h4>
              <p className="text-xs text-gray-300">
                Thank you, {formData.name || 'Friend'}. I will review your message promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope or inquiry..."
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => soundFx.playHoverChime()}
                className="self-start px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F2E2BA] to-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Dispatch</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
