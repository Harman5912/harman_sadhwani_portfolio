export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  technologies: string[];
  year: string;
  status: 'Completed' | 'In Progress' | 'Experimental' | 'Coming Soon';
  type: 'Flagship' | 'Minor' | 'Academic' | 'Hackathon';
  image: string;
  video?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
  organization?: string;
  highlights: string[];
  filterTags: string[];
  modelType: 'monolith' | 'crystal' | 'prism' | 'sphere' | 'torus';
}

export interface AchievementItem {
  id: string;
  title: string;
  result: string;
  dateOrContext: string;
  category: 'Award' | 'Conference' | 'Hackathon';
  highlight: string;
  description: string;
  badgeLabel: string;
  certificateRef: string;
  color: string;
}

export interface SkillNode {
  name: string;
  context: string;
  level: number; // 1-100
  iconTag: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillNode[];
}

export const portfolioData = {
  profile: {
    name: 'Harman Sadhwani',
    title: 'Creative Developer | Full-Stack Developer | AI Systems Builder',
    tagline: 'BUILD. INNOVATE. ENGINEER THE FUTURE.',
    bio: 'BCA Scholar, Creative Developer, and AI Systems Architect crafting immersive WebGL 3D experiences, autonomous agentic workflows, and high-performance digital architectures.',
    secondaryBio: 'Specializing in the intersection of real-time 3D graphics, LLM agent ecosystems, and distributed cloud engineering. Building digital kingdoms where computational precision meets cinematic storytelling.',
    status: 'Available for World-Class Engineering Opportunities',
    location: 'India',
    avatar: '/Harman.jpg',
    resumeUrl: '/Harman_Sadhwani_Resume.pdf',
    stats: [
      { label: 'Major Flagships', value: '3+' },
      { label: 'Hackathons & Awards', value: '8+' },
      { label: 'Interactive Prototypes', value: '25+' },
      { label: 'Target Frame Rate', value: '60 FPS' },
    ],
    pillars: [
      {
        title: 'Creative WebGL & 3D',
        description: 'Building cinematic, high-performance 3D spatial experiences with Three.js, React Three Fiber, custom shaders, and instanced particles.',
        accent: 'from-amber-400 to-yellow-600',
      },
      {
        title: 'Agentic AI Systems',
        description: 'Engineering autonomous agents, local model orchestration (Ollama), multi-tool execution pipelines, and RAG architectures.',
        accent: 'from-blue-400 to-indigo-600',
      },
      {
        title: 'Full-Stack Architecture',
        description: 'End-to-end web applications with React, TypeScript, Python microservices, REST APIs, and scalable database backends.',
        accent: 'from-emerald-400 to-teal-600',
      },
      {
        title: 'Competitive Prototyping',
        description: 'Proven track record across national hackathons, technical conferences, and rapid innovation sprint showcases.',
        accent: 'from-purple-400 to-pink-600',
      },
    ],
  },
  education: {
    degree: 'Bachelor of Computer Applications (BCA)',
    focus: 'Software Engineering, 3D Web Graphics, Database Architecture, & Autonomous AI Experimentation',
    status: 'Active BCA Developer & Technical Project Architect',
    institution: 'University Technical Program',
  },
  experience: [
    {
      id: 'exp-fullstack-ai-ml',
      role: 'Full Stack AI/ML Intern',
      organization: 'Technical Department',
      duration: '4 Months (Starting 8 June)',
      track: 'Full-Stack & AI/ML Engineering Track',
      highlights: [
        'Architected full-stack application modules and integrated deep AI/ML model reasoning pipelines into daily development workflows.',
        'Engineered responsive interfaces, backend API services, and exploratory agentic automation protocols.',
        'Collaborated on real-world technical systems synthesizing high-performance web standards with intelligent agent runtimes.',
      ],
    },
  ],
  contact: {
    email: 'sadhwaniharman@gmail.com',
    whatsapp: 'https://wa.me/918318952798',
    whatsappNumber: '+91 8318952798',
    linkedin: 'https://www.linkedin.com/in/harman-sadhwani-a659a6225/',
    github: 'https://github.com/Harman5912',
    instagram: 'https://www.instagram.com/harmansadhwani.07/',
  },
};

export const skillsCategories: SkillCategory[] = [
  {
    id: 'core-languages',
    title: 'Languages & Core Systems',
    subtitle: 'Primary languages powering systems, scripting, and spatial computing',
    skills: [
      { name: 'Python', context: 'AI systems, backend services, agent orchestration & automation scripts', level: 95, iconTag: 'PY' },
      { name: 'TypeScript', context: 'Type-safe full-stack architectures, 3D graphics & UI component systems', level: 92, iconTag: 'TS' },
      { name: 'JavaScript', context: 'Interactive WebGL, asynchronous event loops & modern browser DOM', level: 94, iconTag: 'JS' },
      { name: 'Java', context: 'Object-oriented application architecture & data structures', level: 86, iconTag: 'JV' },
      { name: 'SQL', context: 'Complex queries, schema normalization & cloud relational databases', level: 88, iconTag: 'SQL' },
      { name: 'C', context: 'Low-level computing foundations, pointers & algorithmic optimization', level: 82, iconTag: 'C' },
    ],
  },
  {
    id: 'ai-agents',
    title: 'AI & Agentic Systems',
    subtitle: 'Autonomous agents, local inference, and hybrid LLM orchestration',
    skills: [
      { name: 'Agentic AI', context: 'Goal-driven multi-step execution, tool-use loops & autonomous code agents', level: 96, iconTag: 'AGT' },
      { name: 'AI/ML & RAG', context: 'Retrieval augmented generation, vector search & semantic synthesis', level: 90, iconTag: 'RAG' },
      { name: 'MCP (Model Context Protocol)', context: 'Standardized tool integration and server-agent communication', level: 92, iconTag: 'MCP' },
      { name: 'Local AI & Ollama', context: 'On-device private inference & multi-model local routing', level: 94, iconTag: 'LOC' },
      { name: 'LLM APIs & Cloud Models', context: 'Claude, OpenAI, Gemini integrations with streaming pipelines', level: 95, iconTag: 'API' },
      { name: 'Desktop & Browser Automation', context: 'DOM inspection, OS-level application hooks & VS Code interaction', level: 90, iconTag: 'AUT' },
    ],
  },
  {
    id: 'frontend-3d',
    title: 'Creative 3D & Frontend',
    subtitle: 'Immersive spatial WebGL, component architecture, and responsive UX',
    skills: [
      { name: 'Three.js & WebGL', context: 'Custom geometries, PBR materials, instancing & shader techniques', level: 92, iconTag: '3D' },
      { name: 'React & React Three Fiber', context: 'Declarative 3D scene graphs, hooks, state & virtual DOM', level: 94, iconTag: 'R3F' },
      { name: 'GSAP & ScrollTrigger', context: 'Cinematic timelines, choreographed camera travel & scroll physics', level: 93, iconTag: 'GSAP' },
      { name: 'Angular', context: 'Structured single-page application architecture & reactive templates', level: 84, iconTag: 'NG' },
      { name: 'Tailwind CSS & Modern Styling', context: 'High-fashion glassmorphism, fluid typography & micro-interactions', level: 96, iconTag: 'CSS' },
      { name: 'HTML5 & Canvas APIs', context: 'Semantic markup, accessible structures & 2D/3D canvas rendering', level: 95, iconTag: 'HTML' },
    ],
  },
  {
    id: 'backend-cloud',
    title: 'Backend, Cloud & Databases',
    subtitle: 'Resilient APIs, real-time data persistence, and cloud hosting',
    skills: [
      { name: 'Node.js & Express', context: 'Scalable REST APIs, websocket streaming & backend services', level: 90, iconTag: 'NODE' },
      { name: 'Firebase', context: 'Real-time database, authentication flows & cloud storage', level: 88, iconTag: 'FB' },
      { name: 'Oracle Cloud & Hosted SQL', context: 'Cloud relational databases, enterprise querying & schemas', level: 85, iconTag: 'ORA' },
      { name: 'REST APIs & Webhooks', context: 'API contract design, payload validation & external integrations', level: 94, iconTag: 'REST' },
      { name: 'Git & GitHub Workflows', context: 'Version control, automated CI/CD, and release management', level: 92, iconTag: 'GIT' },
      { name: 'Netlify & Render Deployment', context: 'Production edge deployments, environment secrets & builds', level: 90, iconTag: 'DEP' },
    ],
  },
];

export const flagshipProjects: ProjectItem[] = [
  {
    id: 'keys-ai',
    name: 'Keys.AI',
    tagline: 'Autonomous AI Assistant & Agentic Computing Ecosystem',
    category: 'AI Ecosystem & Agentic OS',
    description:
      'Keys.AI is an advanced AI assistant ecosystem engineered for natural computer interaction, intelligent OS-level automation, direct application control, and local/cloud model orchestration. Features deep integration with VS Code, browser automation, and local Ollama inference.',
    technologies: ['Python', 'Agentic AI', 'Local Ollama', 'LLM APIs', 'VS Code Integration', 'Browser Automation', 'Crown Code'],
    year: '2026',
    status: 'Completed',
    type: 'Flagship',
    image: '/p1.jpeg',
    video: '/p1.mp4',
    github: 'https://github.com/Harman5912/KEYS.AI/releases',
    featured: true,
    organization: 'Crown Pierce',
    highlights: [
      'Autonomous agentic task execution and multi-step computer automation',
      'Unified inference engine routing dynamically across local Ollama & cloud LLMs',
      'Direct VS Code workspace control and real-time terminal interaction',
      'Native OS process manipulation and browser workflow orchestration',
    ],
    filterTags: ['AI', 'Python', 'Agentic', 'Automation', 'Flagship'],
    modelType: 'monolith',
  },
  {
    id: 'crown-code',
    name: 'Crown Code Terminal Agent',
    tagline: 'Autonomous CLI & Agentic Developer Environment',
    category: 'Autonomous Developer Tooling',
    description:
      'A flagship agentic engineering system developed under Crown Pierce designed to bring autonomous code reasoning, multi-file architectural refactoring, terminal execution, and developer workflow orchestration into the developer CLI.',
    technologies: ['Python', 'AI Agents', 'Agentic Architecture', 'Ollama', 'CLI Automation', 'AST Parsing', 'Crown Pierce'],
    year: '2026',
    status: 'Coming Soon',
    type: 'Flagship',
    image: '/p3.jpeg',
    video: '/p3.mp4',
    featured: true,
    organization: 'Crown Pierce',
    highlights: [
      'Multi-file codebase indexing, dependency graph tracking & architectural refactoring',
      'Autonomous command generation with safety sandboxing and validation',
      'Hybrid local & cloud reasoning model fallback architecture',
      'Core developer infrastructure for the Crown Pierce ecosystem',
    ],
    filterTags: ['AI', 'CLI', 'Agentic', 'Python', 'Flagship'],
    modelType: 'crystal',
  },
  {
    id: 'reviewbot',
    name: 'ReviewBOT',
    tagline: 'AI-Assisted Intelligent Code Review & Analysis Platform',
    category: 'AI Developer Platform',
    description:
      'ReviewBOT is an AI-assisted code review platform that connects seamlessly to GitHub repositories to inspect pull requests, perform AST-level code diagnostics, identify architectural vulnerabilities, and generate intelligent suggestions.',
    technologies: ['Python', 'JavaScript', 'GitHub API', 'Firebase', 'REST APIs', 'LLMs', 'Render'],
    year: '2026',
    status: 'Completed',
    type: 'Flagship',
    image: '/p2.jpeg',
    video: '/p2.mp4',
    demo: 'https://reviewbot-web.onrender.com/',
    github: 'https://github.com/Harman5912',
    featured: true,
    highlights: [
      'GitHub repository synchronization and automated PR diff extraction',
      'Multi-model code analysis for algorithmic complexity and security flaws',
      'Firebase cloud persistence for analysis history and user review sessions',
      'Live deployed production system hosted on Render cloud infrastructure',
    ],
    filterTags: ['AI', 'Web', 'Python', 'GitHub', 'Flagship'],
    modelType: 'prism',
  },
];

export const additionalProjects: ProjectItem[] = [
  {
    id: 'exuberance-tech-expo-system',
    name: "Exuberance'26 Tech Expo Showcase",
    tagline: '1st Runner-Up Award Winning Live Technical Demonstration',
    category: 'Competition System',
    description: 'Interactive technical prototype demonstrating real-time software orchestration and AI integration, securing First Runner-Up trophy at Exuberance 26.',
    technologies: ['Python', 'React', 'AI Integration', 'Interactive UI'],
    year: '2026',
    status: 'Completed',
    type: 'Hackathon',
    image: '/c1.jpeg',
    highlights: ['First Runner-Up Trophy & Blue Ribbon Medal', 'Live software demonstration before technical judges'],
    filterTags: ['Hackathon', 'AI', 'Award'],
    modelType: 'sphere',
  },
  {
    id: 'hackathon-2-0-solution',
    name: 'Hackathon 2.0 Runner-Up Solution',
    tagline: '2nd Position Competitive Full-Stack Software Prototype',
    category: 'Competitive Hackathon',
    description: 'High-speed 48-hour competitive prototype combining responsive UI and backend API pipelines, earning 2nd Position in Hackathon 2.0.',
    technologies: ['JavaScript', 'Python', 'REST APIs', 'Tailwind CSS'],
    year: '2026',
    status: 'Completed',
    type: 'Hackathon',
    image: '/c4.jpeg',
    highlights: ['2nd Position Medalist', 'Full-stack delivery under rapid sprint conditions'],
    filterTags: ['Hackathon', 'Full-Stack'],
    modelType: 'torus',
  },
  {
    id: 'ai-era-education-poster',
    name: 'Why AI Era Breaks Traditional Education?',
    tagline: 'ICHIS-2026 International Conference 2nd Runner-Up Research',
    category: 'Academic Research',
    description: 'Analytical research poster examining the paradigm shift from traditional memorization to agentic AI-assisted exploratory education.',
    technologies: ['Generative AI', 'Agentic Systems', 'Data Analysis'],
    year: '2026',
    status: 'Completed',
    type: 'Academic',
    image: '/c2.jpeg',
    highlights: ['International Conference 2nd Runner-Up', 'Presented at ICHIS-2026'],
    filterTags: ['Academic', 'AI', 'Research'],
    modelType: 'crystal',
  },
  {
    id: 'womens-safety-tech',
    name: "Enhancing Women's Safety Using Technology",
    tagline: 'National Conference 1st Position Paper Presentation',
    category: 'Academic Research',
    description: 'First-place research framework and connected emergency response application architecture designed for rapid alerts and safety tracking.',
    technologies: ['Application Design', 'Emergency APIs', 'Database Architecture'],
    year: '2025',
    status: 'Completed',
    type: 'Academic',
    image: '/c6.jpeg',
    highlights: ['National Conference 1st Position Paper', 'Real-time emergency signaling model'],
    filterTags: ['Academic', 'Research', 'Security'],
    modelType: 'prism',
  },
  {
    id: 'sih-2025-prototype',
    name: 'Smart India Hackathon 2025 Solution',
    tagline: 'National SIH Evaluation - Qualified for Round 2',
    category: 'National Hackathon',
    description: 'Architected software solution addressing real-world problem statements, successfully advancing through competitive national SIH rounds.',
    technologies: ['Python', 'JavaScript', 'REST APIs', 'SQL'],
    year: '2025',
    status: 'Completed',
    type: 'Hackathon',
    image: '/c5.jpeg',
    highlights: ['Qualified for Round 2 in SIH 2025', 'Scalable architecture evaluated by panel'],
    filterTags: ['Hackathon', 'National'],
    modelType: 'sphere',
  },
  {
    id: 'msme-idea-hackathon',
    name: 'MSME Idea Hackathon 6.0 Innovation',
    tagline: 'Second Round Qualified Enterprise Solution',
    category: 'Enterprise Innovation',
    description: 'Software innovation prototype tailored for MSME enterprise automation, advancing into the second competitive stage of MSME Idea Hackathon 6.0.',
    technologies: ['Web Architecture', 'Python', 'Relational DB', 'Automation'],
    year: '2026',
    status: 'Completed',
    type: 'Hackathon',
    image: '/c7.jpeg',
    highlights: ['Second Round Qualification', 'Enterprise workflow optimization'],
    filterTags: ['Hackathon', 'Enterprise'],
    modelType: 'monolith',
  },
  {
    id: 'hackofiesta-6',
    name: 'Hackofiesta 6.0 — AISpire UP Build',
    tagline: 'AISpire UP Hackathon (Supported by Microsoft & Deloitte)',
    category: 'AI Hackathon',
    description: 'Competitive AI application developed during Hackofiesta 6.0 AISpire UP Hackathon supported by Microsoft and Deloitte.',
    technologies: ['Generative AI', 'Python', 'React', 'AI APIs'],
    year: '2025',
    status: 'Completed',
    type: 'Hackathon',
    image: '/c8.jpeg',
    highlights: ['Yellow Ribbon Medalist', 'Microsoft & Deloitte sponsored hackathon'],
    filterTags: ['Hackathon', 'AI'],
    modelType: 'torus',
  },
];

export const achievementsList: AchievementItem[] = [
  {
    id: 'exuberance-26',
    title: "Exuberance'26 – Tech Expo",
    result: 'First Runner-Up',
    dateOrContext: '2026 · Technical Exhibition',
    category: 'Award',
    highlight: 'Trophy · Blue Ribbon Medal',
    description: "Awarded First Runner-Up at the Exuberance'26 Tech Expo with Trophy and Blue Ribbon Medal for live software demonstration and technical innovation.",
    badgeLabel: '1st Runner-Up',
    certificateRef: '/c1.jpeg',
    color: '#D4AF37',
  },
  {
    id: 'ichis-2026-win',
    title: 'ICHIS-2026 International Conference',
    result: 'Second Runner-Up – Research Poster',
    dateOrContext: '2026 · International Conference',
    category: 'Conference',
    highlight: 'Trophy · "Why AI Era Breaks Traditional Education?"',
    description: 'Secured Second Runner-Up in the Poster Presentation track at ICHIS-2026 with research analyzing the cognitive and pedagogical disruption of AI agents.',
    badgeLabel: '2nd Runner-Up',
    certificateRef: '/c2.jpeg',
    color: '#EAD7A1',
  },
  {
    id: 'ichis-2026-part',
    title: 'ICHIS-2026 (International Conference)',
    result: 'Poster Presentation Delegate',
    dateOrContext: '2026 · International Conference',
    category: 'Conference',
    highlight: 'International Conference Poster Track',
    description: 'Official Poster Presentation certificate at the ICHIS-2026 International Conference.',
    badgeLabel: 'Research Paper',
    certificateRef: '/c3.jpeg',
    color: '#C5A059',
  },
  {
    id: 'hackathon-2-0',
    title: 'Hackathon 2.0 (Mar 2026)',
    result: 'Second Position & Medalist',
    dateOrContext: 'March 2026 · Competitive Hackathon',
    category: 'Hackathon',
    highlight: 'Blue Ribbon Medal · 2nd Position',
    description: 'Earned Second Position and Blue Ribbon Medal in Hackathon 2.0 through rapid prototyping and robust full-stack execution.',
    badgeLabel: '2nd Position',
    certificateRef: '/c4.jpeg',
    color: '#D4AF37',
  },
  {
    id: 'sih-2025',
    title: 'Smart India Hackathon 2025',
    result: 'Qualified for Round 2',
    dateOrContext: '2025 · SIH Internal & Zonal Round',
    category: 'Hackathon',
    highlight: 'National SIH Evaluation · Round 2 Qualified',
    description: 'Qualified for the Second Round of Smart India Hackathon after competing in the rigorous Internal SIH 2025 evaluation.',
    badgeLabel: 'Round 2 Qualified',
    certificateRef: '/c5.jpeg',
    color: '#F5E4B5',
  },
  {
    id: 'national-conference',
    title: 'National Conference (Women Skill Development)',
    result: 'First Position / Paper Presentation',
    dateOrContext: 'National Conference Track',
    category: 'Conference',
    highlight: '"Enhancing Women\'s Safety Using Technology"',
    description: 'Presented research paper exploring digital protective networks and real-time safety automation at the National Conference.',
    badgeLabel: '1st Position Paper',
    certificateRef: '/c6.jpeg',
    color: '#D4AF37',
  },
  {
    id: 'hackathon-feb-2025',
    title: 'Hackathon (20–22 Feb 2025)',
    result: 'Sprint Finalist',
    dateOrContext: '20–22 Feb 2025 · Competitive Sprint',
    category: 'Hackathon',
    highlight: 'Participant ID Card · 48h Sprint',
    description: 'Competed in the 20–22 February 2025 Hackathon sprint building rapid software prototypes under tight time constraints.',
    badgeLabel: 'Hackathon Sprint',
    certificateRef: '/c7.jpeg',
    color: '#C5A059',
  },
  {
    id: 'hackofiesta-6',
    title: 'Hackofiesta 6.0 – AISpire UP Hackathon',
    result: 'Yellow Ribbon Medalist',
    dateOrContext: 'AISpire UP Hackathon',
    category: 'Hackathon',
    highlight: 'Yellow Ribbon Medal · Microsoft & Deloitte',
    description: 'Participated in Hackofiesta 6.0 (AISpire UP Hackathon) supported by Microsoft & Deloitte, awarded Yellow Ribbon Medal.',
    badgeLabel: 'Yellow Ribbon Medal',
    certificateRef: '/c8.jpeg',
    color: '#F5E4B5',
  },
];

export const certifications = [
  {
    id: 'cred-agentic-ai',
    title: 'Agentic AI Development',
    provider: 'Claude / Anthropic Architecture',
    domain: 'AI & Autonomous Systems',
    description: 'Agentic workflows, tool-use execution loops, and autonomous developer systems.',
  },
  {
    id: 'cred-ms-backend',
    title: 'Full Stack Backend Engineering',
    provider: 'Microsoft',
    domain: 'Backend Architecture',
    description: 'Server architecture, RESTful API development, authentication flows, and scalable endpoints.',
  },
  {
    id: 'cred-oracle-sql',
    title: 'Cloud Hosting Database SQL',
    provider: 'Oracle',
    domain: 'Cloud Databases',
    description: 'Cloud-hosted relational schemas, query optimization, and enterprise database management.',
  },
  {
    id: 'cred-python',
    title: 'Python Programming Masterclass',
    provider: 'Technical Credential',
    domain: 'Systems & AI',
    description: 'Object-oriented Python, scripting automation, and mathematical model algorithms.',
  },
  {
    id: 'cred-java',
    title: 'Java Application Engineering',
    provider: 'Technical Credential',
    domain: 'Object-Oriented Programming',
    description: 'Core OOP design patterns, collections, multi-threading, and enterprise application logic.',
  },
  {
    id: 'cred-angular',
    title: 'Angular Frontend Architecture',
    provider: 'Frontend Track',
    domain: 'Web Architecture',
    description: 'Reactive single-page architecture with TypeScript, services, and modular components.',
  },
];
