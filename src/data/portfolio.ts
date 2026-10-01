import { skillCategories } from './skills';
import { projectsData } from './projects';
import { achievementsData } from './achievements';
import { certificateGalleryData, certificationsAndTrainingData } from './certificates';

export const portfolioData = {
  profile: {
    name: 'Harman Sadhwani',
    headline: 'Full-Stack Developer · AI Builder · Application Developer · Agentic AI Developer',
    shortHeadline: 'Full-Stack Developer • AI Builder • Application Developer',
    tagline: 'BUILDING THE FUTURE, ONE SYSTEM AT A TIME.',
    heroDescription: 'Building intelligent applications, AI-powered systems and modern digital experiences.',
    secondaryDescription:
      'I build intelligent software, interactive web applications, AI-powered tools and experimental developer systems.',
    footerQuote: 'Building technology where intelligence meets creativity.',
    status: 'Available for Opportunities',
    profileImage: '/Harman.jpg',
    fallbackProfileImage: '/src/assets/images/solarpunk_hero_avatar_1790787491550.jpg',
    resumeUrl: '/Harman_Sadhwani_Resume.pdf',
    pillars: [
      {
        title: 'Developer',
        description: 'Building web applications, backend systems and software tools.',
      },
      {
        title: 'AI Builder',
        description: 'Experimenting with AI assistants, agents, automation and intelligent software.',
      },
      {
        title: 'Problem Solver',
        description: 'Hackathons, technical competitions and project-based development.',
      },
      {
        title: 'Product Builder',
        description: 'Turning ideas into functional prototypes and applications.',
      },
    ],
  },
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    focus: 'Software Development, Full-Stack Web Engineering, Application Development, Database Systems & AI Experimentation',
    status: 'Active BCA Developer & Technical Project Builder',
  },
  skills: skillCategories,
  experience: [
    {
      id: 'exp-fullstack-ai-ml',
      role: 'Full Stack AI/ML Intern',
      department: 'Technical Department',
      duration: '4 months starting 8 June',
      statusNote: 'Full-Stack & AI/ML Engineering Track',
      highlights: [
        'Working across full-stack application development and AI/ML model integration within the Technical Department.',
        'Building intelligent software interfaces, backend API pipelines, and agentic workflow experiments.',
        'Collaborating on real-world technical systems combining modern web frameworks with AI capabilities.',
      ],
    },
  ],
  projects: projectsData,
  achievements: achievementsData,
  certificates: certificateGalleryData,
  certifications: certificationsAndTrainingData,
  contact: {
    email: 'sadhwaniharman@gmail.com',
    linkedin: 'https://www.linkedin.com/in/harman-sadhwani-a659a6225/',
    github: 'https://github.com/Harman5912',
    instagram: 'https://www.instagram.com/harmansadhwani.07/',
  },
};
