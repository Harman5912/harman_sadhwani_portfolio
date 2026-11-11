import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Linkedin, Github, Instagram, Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';
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
    <section id="contact" className="relative py-28 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill border-amber-500/30 text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>CONNECT & COLLABORATE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
          Enter The <span className="text-gold-gradient">Kingdom</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
        <p className="mt-4 text-xs sm:text-sm text-gray-300 font-light">
          Whether you want to discuss full-stack architectures, agentic developer systems, or world-class digital experiences — my inbox is open.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
        {/* Left Column: Direct Verified Channels */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Email Primary Card */}
          <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5 text-[#D4AF37]">
                <Mail className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-wider font-semibold">Direct Email</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[11px] font-mono text-[#F5E4B5] hover:border-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="font-serif text-lg sm:text-xl font-bold text-white hover:text-[#F5E4B5] transition-colors break-all"
            >
              {contact.email}
            </a>
            <p className="text-xs text-gray-400 mt-2 font-light">
              Available for full-time roles, creative engineering sprints, and technical consultations.
            </p>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-4 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div>
                <span className="font-serif text-xs font-semibold text-white block">LinkedIn</span>
                <span className="font-mono text-[9px] text-gray-400">Connect</span>
              </div>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-4 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <Github className="w-5 h-5 text-white" />
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div>
                <span className="font-serif text-xs font-semibold text-white block">GitHub</span>
                <span className="font-mono text-[9px] text-gray-400">Repositories</span>
              </div>
            </a>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => soundFx.playHoverChime()}
              className="glass-panel p-4 rounded-2xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <Instagram className="w-5 h-5 text-[#E1306C]" />
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </div>
              <div>
                <span className="font-serif text-xs font-semibold text-white block">Instagram</span>
                <span className="font-mono text-[9px] text-gray-400">Personal</span>
              </div>
            </a>
          </div>

          {/* Download Resume Card */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClickPulse()}
            onMouseEnter={() => soundFx.playHoverChime()}
            className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/5 border border-amber-500/30 flex items-center justify-between glass-panel-hover"
          >
            <div>
              <span className="font-serif text-sm font-semibold text-[#FFFBF0] block">
                Download Official Resume
              </span>
              <span className="font-mono text-[10px] text-[#D4AF37]">
                Harman_Sadhwani_Resume.pdf
              </span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[#D4AF37]" />
          </a>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/15 relative">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
            Transmit an Encrypted Dispatch
          </h3>
          <p className="text-xs text-gray-400 mb-6 font-light">
            Send a direct query or invitation. All dispatches route directly to my personal developer inbox.
          </p>

          {formSent ? (
            <div className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-center animate-fadeIn">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-3 animate-spin" />
              <h4 className="font-serif text-lg font-bold text-white mb-1">
                Dispatch Transmitted Successfully
              </h4>
              <p className="text-xs text-gray-300">
                Thank you, {formData.name || 'Friend'}. I will review your message and respond promptly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-gray-300 uppercase tracking-wider mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-gray-300 uppercase tracking-wider mb-1.5">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your project scope, inquiry, or collaborative vision..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={() => soundFx.playHoverChime()}
                className="mt-2 w-full sm:w-auto self-start px-8 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F2E2BA] to-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Dispatch</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
