export interface CertificateAsset {
  id: string;
  file: string;
  event: string;
  achievement: string;
  extra: string;
  badge: 'gold' | 'silver' | 'participation';
  badgeLabel: string;
  category: 'Award' | 'Hackathon' | 'Conference';
}

export interface CredentialItem {
  id: string;
  title: string;
  provider?: string;
  kind: 'Certification' | 'Training';
  domain: string;
  description: string;
}

export const certificateGalleryData: CertificateAsset[] = [
  {
    id: 'c1',
    file: '/c1.jpeg',
    event: "Exuberance'26 – Tech Expo",
    achievement: 'First Runner-Up',
    extra: 'Trophy · Blue Ribbon Medal',
    badge: 'gold',
    badgeLabel: '1st',
    category: 'Award',
  },
  {
    id: 'c2',
    file: '/c2.jpeg',
    event: 'ICHIS-2026',
    achievement: 'Second Runner-Up – Poster Presentation',
    extra: 'Trophy · Poster: "Why AI Era Breaks Traditional Education?"',
    badge: 'silver',
    badgeLabel: '2nd',
    category: 'Conference',
  },
  {
    id: 'c3',
    file: '/c3.jpeg',
    event: 'ICHIS-2026',
    achievement: 'Poster Presentation Participation',
    extra: 'International Conference',
    badge: 'participation',
    badgeLabel: 'Paper',
    category: 'Conference',
  },
  {
    id: 'c4',
    file: '/c4.jpeg',
    event: 'Hackathon 2.0 (Mar 2026)',
    achievement: 'Participation',
    extra: 'Blue Ribbon Medal',
    badge: 'participation',
    badgeLabel: 'Hack',
    category: 'Hackathon',
  },
  {
    id: 'c5',
    file: '/c5.jpeg',
    event: 'Internal Smart India Hackathon 2025',
    achievement: 'Participation',
    extra: 'SIH Internal Round',
    badge: 'participation',
    badgeLabel: 'SIH',
    category: 'Hackathon',
  },
  {
    id: 'c6',
    file: '/c6.jpeg',
    event: 'National Conference (Women Skill Development)',
    achievement: 'Paper Presentation',
    extra: 'Paper: "Enhancing Women\'s Safety Using Technology" · Conference ID',
    badge: 'participation',
    badgeLabel: 'Paper',
    category: 'Conference',
  },
  {
    id: 'c7',
    file: '/c7.jpeg',
    event: 'Hackathon (20–22 Feb 2025)',
    achievement: 'Participation',
    extra: 'Participant ID Card',
    badge: 'participation',
    badgeLabel: 'Hack',
    category: 'Hackathon',
  },
  {
    id: 'c8',
    file: '/c8.jpeg',
    event: 'Hackofiesta 6.0 – AISpire UP Hackathon',
    achievement: 'Participation',
    extra: 'Yellow Ribbon Medal · Microsoft & Deloitte',
    badge: 'participation',
    badgeLabel: 'Hack',
    category: 'Hackathon',
  },
];

export const certificationsAndTrainingData: CredentialItem[] = [
  {
    id: 'cred-agentic-ai',
    title: 'Agentic AI Development',
    provider: 'Claude / Anthropic',
    kind: 'Certification',
    domain: 'AI & Agentic Systems',
    description:
      'Focused on agentic AI workflows, tool orchestration, and building intelligent developer systems.',
  },
  {
    id: 'cred-ms-backend',
    title: 'Full Stack Backend',
    provider: 'Microsoft',
    kind: 'Certification',
    domain: 'Backend Engineering',
    description:
      'Server-side architecture, REST API development, authentication flows, and scalable backend patterns.',
  },
  {
    id: 'cred-oracle-sql',
    title: 'Cloud Hosting Database SQL',
    provider: 'Oracle',
    kind: 'Certification',
    domain: 'Database & Cloud',
    description:
      'Cloud-hosted relational databases, SQL query optimization, and enterprise schema administration.',
  },
  {
    id: 'cred-python',
    title: 'Python Programming',
    provider: 'Technical Credential',
    kind: 'Certification',
    domain: 'Programming',
    description:
      'Core Python programming, scripting, automation, and application logic.',
  },
  {
    id: 'cred-java',
    title: 'Java Development',
    provider: 'Technical Credential',
    kind: 'Certification',
    domain: 'Programming',
    description:
      'Object-oriented programming, data structures, and application development in Java.',
  },
  {
    id: 'cred-web-dev',
    title: 'Web Development',
    provider: 'Structured Coursework',
    kind: 'Training',
    domain: 'Frontend & Full-Stack',
    description:
      'Comprehensive training in HTML, CSS, JavaScript, responsive UI design, and modern web standards.',
  },
  {
    id: 'cred-db-sql',
    title: 'Database using SQL',
    provider: 'Structured Coursework',
    kind: 'Training',
    domain: 'Database Systems',
    description:
      'Practical training in relational database design, SQL queries, joins, and data persistence.',
  },
  {
    id: 'cred-data-analyst',
    title: 'Data Analyst — Excel + SQL + Python',
    provider: 'Analytical Track',
    kind: 'Training',
    domain: 'Data & Analytics',
    description:
      'Applied data analysis combining Excel modeling, SQL extraction, and Python analytical scripts.',
  },
  {
    id: 'cred-angular',
    title: 'Angular Frontend Architecture',
    provider: 'Frontend Track',
    kind: 'Training',
    domain: 'Frontend Engineering',
    description:
      'Building modular single-page web applications with Angular, TypeScript, and reactive components.',
  },
];
