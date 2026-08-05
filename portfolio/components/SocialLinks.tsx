"use client";

import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.5 7 7.2 5.2a2 2 0 0 0 2.6 0L20.5 7" strokeLinecap="round" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6.94 8.5H4V20h2.94V8.5ZM5.47 7.13a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4ZM20 13.4c0-3.05-1.63-4.98-3.94-4.98-1.6 0-2.53.9-2.94 1.7V8.5H10.2V20h2.94v-6.1c0-1.27.55-2.04 1.72-2.04 1.1 0 1.66.77 1.66 2.04V20H20v-6.6Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.02c-.25.7-1.44 1.34-2.01 1.38-.54.05-1.2.24-4.02-.86-3.4-1.34-5.55-4.78-5.72-5-.17-.23-1.37-1.83-1.37-3.5 0-1.66.87-2.48 1.18-2.82.3-.34.67-.42.9-.42h.65c.2 0 .48-.08.76.57.28.67.96 2.33 1.04 2.5.09.17.14.37.03.6-.12.22-.18.36-.35.56-.17.2-.37.45-.53.6-.17.17-.36.36-.16.7.2.34.9 1.5 1.94 2.43 1.33 1.2 2.45 1.57 2.8 1.75.34.17.55.14.75-.08.2-.23.86-1 1.1-1.34.22-.34.45-.29.76-.17.3.12 1.94.92 2.28 1.08.33.17.55.25.63.4.09.14.09.85-.17 1.58Z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Email",
    value: "sadhwaniharman@gmail.com",
    href: "mailto:sadhwaniharman@gmail.com",
    Icon: MailIcon,
  },
  {
    label: "LinkedIn",
    value: "in/harman-sadhwani",
    href: "https://www.linkedin.com/in/harman-sadhwani-a659a6225?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    Icon: LinkedInIcon,
  },
  {
    label: "Instagram",
    value: "@harmansadhwani.07",
    href: "https://www.instagram.com/harmansadhwani.07?igsh=bTBsazVsNDZ0N2h2",
    Icon: InstagramIcon,
  },
  {
    label: "WhatsApp",
    value: "+91 83189 52798",
    href: "https://wa.me/918318952798",
    Icon: WhatsAppIcon,
  },
];

export default function SocialLinks() {
  return (
    <section id="contact" className="relative overflow-hidden bg-off-white py-20 md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.6),transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.09),transparent_70%)]" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center md:px-8">
        <SectionHeading
          kicker="Contact"
          title={
            <>
              Let&apos;s <span className="gold-text">Connect</span>
            </>
          }
          subtitle="Have a project in mind, a research idea, or just want to say hello? My inbox is always open."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {SOCIALS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 * i }}
              className="flex flex-col items-center gap-3"
            >
              <MagneticButton
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                ariaLabel={s.label}
                strength={0.55}
                className="animate-floaty-slow h-16 w-16 rounded-full border border-gold/50 bg-white/80 text-gold-deep shadow-[0_8px_24px_rgba(212,175,55,0.18)] backdrop-blur transition-all duration-500 hover:border-gold hover:text-gold-deep hover:shadow-[0_0_0_1px_rgba(212,175,55,0.55),0_14px_40px_rgba(212,175,55,0.35)] md:h-[4.5rem] md:w-[4.5rem]"
              >
                <s.Icon className="h-6 w-6 md:h-7 md:w-7" />
              </MagneticButton>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink/50">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-12 text-sm text-ink/50"
        >
          Open to internships, collaborations & freelance work —{" "}
          <a
            href="mailto:sadhwaniharman@gmail.com"
            className="font-semibold text-gold-deep underline decoration-gold/40 underline-offset-4 transition-colors hover:text-ink"
          >
            sadhwaniharman@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
