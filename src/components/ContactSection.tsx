import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Linkedin, Github, Instagram, MessageCircle, Copy, Check, Send, ArrowUpRight, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const { contact, profile } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-6 select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill border-amber-500/40 text-[10px] font-mono text-[#D4AF37] tracking-widest uppercase mb-2 shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          <Sparkles className="w-3.5 h-3.5 text-[#F5E4B5]" />
          <span>CONTACT // 06</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase heading-shadow">
          Get In <span className="text-gold-gradient">Touch</span>
        </h2>
        <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-left items-start">
        {/* Left Column: Direct Channels */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {/* Email Primary Card */}
          <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/35 shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Mail className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">Direct Email</span>
              </div>
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 text-[10px] font-mono text-[#F5E4B5] hover:border-amber-400 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="font-serif text-base sm:text-lg font-bold text-white hover:text-[#F5E4B5] transition-colors break-all heading-shadow"
            >
              {contact.email}
            </a>
            <p className="text-[11px] text-gray-300 mt-1 font-light">
              Available for full-time engineering roles, AI systems, and technical partnerships.
            </p>
          </div>

          {/* WhatsApp Direct Card */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-4 rounded-2xl border border-emerald-500/40 glass-panel-hover flex items-center justify-between group shadow-[0_0_25px_rgba(37,211,102,0.15)]"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-xs font-bold text-white group-hover:text-emerald-300 transition-colors heading-shadow">
                    WhatsApp Chat
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <span className="font-mono text-xs text-[#F5E4B5] font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                  {contact.whatsappNumber}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 group-hover:translate-x-0.5 transition-transform font-semibold">
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
              className="glass-panel p-3 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                <ArrowUpRight className="w-3 h-3 text-gray-300" />
              </div>
              <span className="font-serif text-[11px] font-semibold text-white block heading-shadow">LinkedIn</span>
            </a>

            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-3 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <Github className="w-4 h-4 text-white" />
                <ArrowUpRight className="w-3 h-3 text-gray-300" />
              </div>
              <span className="font-serif text-[11px] font-semibold text-white block heading-shadow">GitHub</span>
            </a>

            <a
              href={contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-3 rounded-xl border border-white/10 glass-panel-hover flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <Instagram className="w-4 h-4 text-[#E1306C]" />
                <ArrowUpRight className="w-3 h-3 text-gray-300" />
              </div>
              <span className="font-serif text-[11px] font-semibold text-white block heading-shadow">Instagram</span>
            </a>
          </div>

          {/* Download Resume Card */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/15 via-yellow-500/15 to-amber-500/10 border border-amber-500/40 flex items-center justify-between glass-panel-hover shadow-lg"
          >
            <div>
              <span className="font-serif text-xs font-semibold text-[#FFFBF0] block heading-shadow">
                Official Resume
              </span>
              <span className="font-mono text-[9px] text-[#D4AF37] font-semibold">
                Harman_Sadhwani_Resume.pdf
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#D4AF37]" />
          </a>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="md:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl border border-white/15 shadow-2xl">
          <h3 className="font-serif text-lg font-bold text-white mb-1 heading-shadow">
            Send a Message
          </h3>
          <p className="text-[11px] text-gray-300 mb-4 font-light">
            Messages go directly to my personal inbox.
          </p>

          {formSent ? (
            <div className="p-6 rounded-xl bg-amber-500/15 border border-amber-500/40 text-center animate-fadeIn">
              <Sparkles className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <h4 className="font-serif text-base font-bold text-white mb-0.5 heading-shadow">
                Message Sent
              </h4>
              <p className="text-xs text-gray-200">
                Thank you, {formData.name || 'Friend'}. I will get back to you shortly.
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
                    className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email"
                    className="w-full px-3 py-2.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400"
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
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="self-start px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F2E2BA] to-[#D4AF37] text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
