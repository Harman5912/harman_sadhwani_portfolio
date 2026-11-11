import React from 'react';
import { X, Award, ExternalLink } from 'lucide-react';

interface CertificateModalProps {
  certificate: {
    title: string;
    image: string;
    result: string;
    description: string;
  } | null;
  onClose: () => void;
}

export default function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl border border-amber-500/30 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] max-h-[92vh] flex flex-col text-left">
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 border border-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Full Image Display */}
        <div className="relative w-full max-h-[58vh] bg-black/80 flex items-center justify-center p-4 overflow-hidden border-b border-white/10">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="max-h-full max-w-full object-contain rounded-lg shadow-2xl filter brightness-[1.02]"
          />
        </div>

        {/* Certificate Information */}
        <div className="p-6 overflow-y-auto">
          <div className="flex items-center gap-2 text-[#D4AF37] mb-1">
            <Award className="w-4 h-4" />
            <span className="font-mono text-xs uppercase tracking-wider font-semibold">
              Verified Credential
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
            {certificate.title}
          </h3>
          <p className="font-mono text-sm font-semibold text-[#F5E4B5] mb-3">
            {certificate.result}
          </p>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
            {certificate.description}
          </p>

          <div className="flex items-center justify-end">
            <a
              href={certificate.image}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E4B5] text-black font-semibold text-xs tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              <span>Open Full Resolution Image</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
