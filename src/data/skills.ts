export interface SkillNode {
  name: string;
  context: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  skills: SkillNode[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    subtitle: 'Core languages for systems, scripting, and application engineering',
    skills: [
      { name: 'Python', context: 'AI systems, backend services, automation scripts & data analysis' },
      { name: 'Java', context: 'Object-oriented application development & core software architecture' },
      { name: 'JavaScript', context: 'Interactive web applications, asynchronous logic & DOM systems' },
      { name: 'TypeScript', context: 'Type-safe full-stack applications & modular frontend architecture' },
      { name: 'C', context: 'Foundational programming, memory concepts & algorithmic problem solving' },
      { name: 'SQL', context: 'Relational querying, schema management & analytical data extraction' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agentic Systems',
    subtitle: 'Intelligent workflows, autonomous agents, and local/cloud model orchestration',
    skills: [
      { name: 'Generative AI', context: 'Building intelligent user-facing features & synthesis tools' },
      { name: 'AI Agents', context: 'Goal-driven autonomous software agents such as Crown Code Agent' },
      { name: 'Agentic Development', context: 'Multi-step reasoning, tool use & environment interaction' },
      { name: 'AI Automation', context: 'OS-level application control, browser workflows & VS Code integration' },
      { name: 'LLM Integration', context: 'Orchestrating foundation models inside production applications' },
      { name: 'Local AI Models', context: 'On-device inference & privacy-preserving local model execution' },
      { name: 'Ollama', context: 'Local model serving and integration for Keys.AI & ReviewBOT' },
      { name: 'AI APIs', context: 'Cloud model provider integrations & hybrid inference pipelines' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'Modern web interfaces, responsive layouts, and component systems',
    skills: [
      { name: 'HTML', context: 'Semantic document structure & accessible web foundations' },
      { name: 'CSS', context: 'Fluid layouts, glassmorphism & responsive design systems' },
      { name: 'JavaScript', context: 'Dynamic client-side state & interactive UI behavior' },
      { name: 'Angular', context: 'Structured single-page application architecture & TypeScript templates' },
      { name: 'React', context: 'Component-driven interfaces, hooks & interactive digital laboratories' },
      { name: 'Responsive UI', context: 'Cross-device adaptability across desktop, tablet & mobile viewports' },
      { name: 'Modern Web Development', context: 'Performance-focused web standards & progressive interfaces' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Server-side architecture, API design, and secure data pipelines',
    skills: [
      { name: 'Python', context: 'Backend logic, AI orchestration endpoints & service integration' },
      { name: 'APIs', context: 'Service-to-service communication & external platform webhooks' },
      { name: 'REST APIs', context: 'Structured HTTP endpoints, payload validation & resource routing' },
      { name: 'Backend Development', context: 'Application servers, business logic & background processing' },
      { name: 'Authentication', context: 'User identity management, session flows & access control' },
      { name: 'Database Integration', context: 'Connecting server runtimes to SQL and cloud document stores' },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    subtitle: 'Persistent storage, relational modeling, and cloud data systems',
    skills: [
      { name: 'SQL', context: 'Relational tables, joins, indexing & structured queries' },
      { name: 'Firebase', context: 'Real-time user data persistence & cloud application backend' },
      { name: 'Database Design', context: 'Entity modeling, normalization & data integrity' },
      { name: 'Cloud Databases', context: 'Hosted database provisioning & remote storage access' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools / Platforms',
    subtitle: 'Developer environment, version control, and cloud deployment platforms',
    skills: [
      { name: 'Git', context: 'Distributed version control, branching workflows & code history' },
      { name: 'GitHub', context: 'Repository hosting, release management & ReviewBOT integration' },
      { name: 'VS Code', context: 'Primary development environment & agentic extension target' },
      { name: 'Cloud Hosting', context: 'Deploying full-stack web applications & backend services' },
      { name: 'Netlify', context: 'Frontend web deployment & continuous delivery' },
      { name: 'Render', context: 'Full-stack web service hosting (including ReviewBOT live deployment)' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    subtitle: 'Data querying, spreadsheet modeling, and analytical workflows',
    skills: [
      { name: 'Excel', context: 'Spreadsheet modeling, tabular organization & data reporting' },
      { name: 'SQL', context: 'Structured data querying & aggregation pipelines' },
      { name: 'Python', context: 'Data processing scripts & programmatic analysis' },
      { name: 'Data Analysis', context: 'Synthesizing insights across Excel, SQL, and Python workflows' },
    ],
  },
];
