/**
 * JSON-LD structured data describing the content of this portfolio so search
 * engines (Google, Bing, etc.) and AI crawlers can identify the person behind
 * the site, their achievements, certificates and projects.
 */

import { SITE_URL } from "./site";

const BASE_URL = SITE_URL;

const PERSON_ID = `${BASE_URL}/#person`;
const ORG_ID = `${BASE_URL}/#organization`;
const WEBSITE_ID = `${BASE_URL}/#website`;

/** Certificates & achievements shown on the site (AchievementsGallery). */
const CREDENTIALS = [
  {
    id: `${BASE_URL}/#credential-exuberance-26`,
    name: "First Runner-Up — Exuberance'26 Tech Expo",
    description: "Trophy · Blue Ribbon Medal",
    category: "Technology Expo Competition",
  },
  {
    id: `${BASE_URL}/#credential-ichis-poster-2nd`,
    name: "Second Runner-Up — Poster Presentation, ICHIS-2026",
    description: 'Poster: "Why AI Era Breaks Traditional Education?" · Trophy',
    category: "International Conference",
  },
  {
    id: `${BASE_URL}/#credential-ichis-participation`,
    name: "Poster Presentation Participation — ICHIS-2026",
    description: "International Conference",
    category: "International Conference",
  },
  {
    id: `${BASE_URL}/#credential-hackathon-2-0`,
    name: "Hackathon 2.0 (Mar 2026) — Participation",
    description: "Blue Ribbon Medal",
    category: "Hackathon",
  },
  {
    id: `${BASE_URL}/#credential-sih-2025`,
    name: "Internal Smart India Hackathon 2025 — Participation",
    description: "SIH Internal Round",
    category: "Hackathon",
  },
  {
    id: `${BASE_URL}/#credential-national-conference`,
    name: "Paper Presentation — National Conference (Women Skill Development)",
    description: 'Paper: "Enhancing Women\'s Safety Using Technology" · Conference ID',
    category: "National Conference",
  },
  {
    id: `${BASE_URL}/#credential-hackathon-feb-2025`,
    name: "Hackathon (20–22 Feb 2025) — Participation",
    description: "Participant ID Card",
    category: "Hackathon",
  },
  {
    id: `${BASE_URL}/#credential-hackofiesta-6`,
    name: "Hackofiesta 6.0 — AISpire UP Hackathon, Participation",
    description: "Yellow Ribbon Medal · Microsoft & Deloitte",
    category: "Hackathon",
  },
];

/** Flagship projects shown on the site (Projects). */
const PROJECTS = [
  {
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#project-keys-ai`,
    name: "Keys.AI",
    description:
      "Advanced AI desktop assistant providing a unified experience across multiple AI providers (OpenAI, Anthropic, Google Gemini, OpenRouter and more) — with document generation, coding assistance, automation and extensibility in one elegant application.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Desktop",
    url: "https://github.com/Harman5912/KEYS.AI/releases",
    author: { "@id": PERSON_ID },
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#project-reviewbot`,
    name: "ReviewBOT",
    description:
      "AI-powered code review platform that helps developers improve code quality through automated analysis, intelligent feedback, issue detection and best-practice highlighting.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: "https://reviewbot-web.onrender.com/",
    author: { "@id": PERSON_ID },
  },
  {
    "@type": "SoftwareApplication",
    "@id": `${BASE_URL}/#project-true-blade`,
    name: "True Blade",
    description:
      "Premium software project developed under Crown Pierce — a cinematic, futuristic showcase of a master-crafted product. Precision, speed and complete control, forged like a blade.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@id": PERSON_ID },
  },
];

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Harman Sadhwani",
      url: BASE_URL,
      image: `${BASE_URL}/pro.png`,
      jobTitle: "AI/ML Full Stack Developer",
      description:
        "Harman Sadhwani is a passionate AI and Full Stack Developer, Founder and Core Developer of Crown Pierce, focused on building intelligent software that solves real-world problems. He actively participates in hackathons, technical conferences, research presentations and innovation competitions.",
      email: "mailto:sadhwaniharman@gmail.com",
      telephone: "+91-83189-52798",
      sameAs: [
        "https://www.linkedin.com/in/harman-sadhwani-a659a6225",
        "https://github.com/Harman5912",
        "https://www.instagram.com/harmansadhwani.07",
        "https://wa.me/918318952798",
      ],
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Full Stack Development",
        "Software Architecture",
        "UI/UX Engineering",
        "Developer Tools",
        "Automation",
        "Research",
      ],
      worksFor: { "@id": ORG_ID },
      award: [
        "First Runner-Up — Exuberance'26 Tech Expo",
        "Second Runner-Up — Poster Presentation, ICHIS-2026",
        "Poster Presentation Participation — ICHIS-2026",
        "Hackathon 2.0 (Mar 2026) — Participation",
        "Internal Smart India Hackathon 2025 — Participation",
        "Paper Presentation — National Conference (Women Skill Development)",
        "Hackathon (20–22 Feb 2025) — Participation",
        "Hackofiesta 6.0 — AISpire UP Hackathon — Participation",
      ],
      hasCredential: CREDENTIALS.map((c) => ({ "@id": c.id })),
    },
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Crown Pierce",
      description:
        "Independent software studio founded by Harman Sadhwani, focused on intelligent software, AI-powered applications, developer tools, automation platforms and innovative digital experiences combining functionality with premium design.",
      url: "https://crown-pierce-co.netlify.app/",
      logo: `${BASE_URL}/logo.png`,
      founder: { "@id": PERSON_ID },
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: "Harman Sadhwani — AI/ML Full Stack Developer",
      url: BASE_URL,
      inLanguage: "en",
      publisher: { "@id": PERSON_ID },
    },
    ...CREDENTIALS.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      "@id": c.id,
      name: c.name,
      description: c.description,
      credentialCategory: c.category,
    })),
    ...PROJECTS,
  ],
};
