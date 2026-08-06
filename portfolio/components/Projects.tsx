"use client";

import { FullpageSection, useSectionActive } from "./Fullpage";
import SectionHeading from "./SectionHeading";
import ProjectShowcase, { type Project } from "./ProjectShowcase";

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "Keys.AI",
    video: "/p1.mp4",
    logo: "/p1.jpeg",
    desc: "Keys.AI is an advanced AI desktop assistant developed to provide a unified experience across multiple AI providers. Instead of being limited to a single model, it allows users to connect APIs from OpenAI, Anthropic, Google Gemini, OpenRouter, and other providers within one elegant application. The platform focuses on productivity, intelligent conversations, document generation, coding assistance, automation, and extensibility while maintaining a clean user experience. It is designed as a next-generation AI workspace that evolves with new models and capabilities.",
    buttonLabel: "View Releases",
    href: "https://github.com/Harman5912/KEYS.AI/releases",
  },
  {
    num: "02",
    title: "ReviewBOT",
    video: "/p2.mp4",
    logo: "/p2.jpeg",
    desc: "ReviewBOT is an AI-powered code review platform built to help developers improve code quality through automated analysis. It provides intelligent feedback, identifies potential issues, highlights best practices, and streamlines the software review process. The project emphasizes speed, accuracy, and developer productivity while offering a clean and modern interface suitable for individual developers and collaborative teams.",
    buttonLabel: "Open ReviewBOT",
    href: "https://reviewbot-web.onrender.com/",
  },
  {
    num: "03",
    title: "True Blade",
    video: "/p3.mp4",
    logo: "/p3.jpeg",
    desc: "True Blade is a premium software project developed under Crown Pierce — a cinematic, futuristic showcase of what a master-crafted product looks like. Precision, speed and complete control, forged like a blade.",
    comingSoon: true,
  },
];

/** One full-screen project — playback only runs while its screen is the active one. */
function ProjectSlide({ project, index, total }: { project: Project; index: number; total: number }) {
  const active = useSectionActive();
  return (
    <ProjectShowcase project={project} index={index} total={total} active={active} />
  );
}

export default function Projects() {
  return (
    <>
      {/* Intro / heading screen */}
      <FullpageSection id="projects" className="bg-[#171310]">
        <div className="flex min-h-full flex-col items-center justify-center px-5 py-10 md:px-8">
          <SectionHeading
            tone="light"
            kicker="Major Projects"
            title={
              <>
                Work in <span className="gold-text">Motion</span>
              </>
            }
            subtitle="Three flagship products, three stories — built end-to-end with AI, design and engineering. Scroll to move between them."
          />
          <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/40">
            ✦ Scroll to explore ✦
          </p>
        </div>
      </FullpageSection>

      {/* One full screen per project */}
      {PROJECTS.map((p, i) => (
        <FullpageSection key={p.num} id={`project-${i + 1}`} className="bg-[#171310]">
          <ProjectSlide project={p} index={i} total={PROJECTS.length} />
        </FullpageSection>
      ))}
    </>
  );
}
