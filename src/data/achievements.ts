export interface AchievementItem {
  id: string;
  title: string;
  result: string;
  dateOrContext: string;
  category: 'Award' | 'Conference' | 'Hackathon';
  highlight: string;
  description: string;
  badgeType: 'trophy' | 'medal' | 'ribbon' | 'star';
  badgeVariant: 'gold' | 'silver' | 'participation';
  badgeLabel: string;
  certificateRef: string;
}

export const achievementsData: AchievementItem[] = [
  {
    id: 'exuberance-26',
    title: "Exuberance'26 – Tech Expo",
    result: 'First Runner-Up',
    dateOrContext: '2026 · Technical Exhibition',
    category: 'Award',
    highlight: 'Trophy · Blue Ribbon Medal',
    description:
      "Awarded First Runner-Up at the Exuberance'26 Tech Expo with Trophy and Blue Ribbon Medal for live software demonstration and technical innovation.",
    badgeType: 'trophy',
    badgeVariant: 'gold',
    badgeLabel: '1st',
    certificateRef: '/c1.jpeg',
  },
  {
    id: 'ichis-2026-win',
    title: 'ICHIS-2026',
    result: 'Second Runner-Up – Poster Presentation',
    dateOrContext: '2026 · International Conference',
    category: 'Conference',
    highlight: 'Trophy · Poster: "Why AI Era Breaks Traditional Education?"',
    description:
      'Secured Second Runner-Up in the Poster Presentation track at ICHIS-2026 with research poster "Why AI Era Breaks Traditional Education?".',
    badgeType: 'medal',
    badgeVariant: 'silver',
    badgeLabel: '2nd',
    certificateRef: '/c2.jpeg',
  },
  {
    id: 'ichis-2026-part',
    title: 'ICHIS-2026 (International Conference)',
    result: 'Poster Presentation Participation',
    dateOrContext: '2026 · International Conference',
    category: 'Conference',
    highlight: 'International Conference Poster Track',
    description:
      'Official Poster Presentation certificate at the ICHIS-2026 International Conference.',
    badgeType: 'ribbon',
    badgeVariant: 'participation',
    badgeLabel: 'Paper',
    certificateRef: '/c3.jpeg',
  },
  {
    id: 'hackathon-2-0',
    title: 'Hackathon 2.0 (Mar 2026)',
    result: 'Second Position & Participation',
    dateOrContext: 'March 2026 · Competitive Hackathon',
    category: 'Hackathon',
    highlight: 'Blue Ribbon Medal',
    description:
      'Earned Second Position and Blue Ribbon Medal in Hackathon 2.0 (March 2026) through rapid prototyping and full-stack execution.',
    badgeType: 'trophy',
    badgeVariant: 'participation',
    badgeLabel: 'Hack',
    certificateRef: '/c4.jpeg',
  },
  {
    id: 'sih-2025',
    title: 'Internal Smart India Hackathon 2025',
    result: 'Participation (Qualified for Second Round)',
    dateOrContext: '2025 · SIH Internal Round',
    category: 'Hackathon',
    highlight: 'SIH Internal Round · Qualified for Second Round',
    description:
      'Qualified for the Second Round of Smart India Hackathon after competing in the Internal Smart India Hackathon 2025 evaluation.',
    badgeType: 'ribbon',
    badgeVariant: 'participation',
    badgeLabel: 'SIH',
    certificateRef: '/c5.jpeg',
  },
  {
    id: 'national-conference',
    title: 'National Conference (Women Skill Development)',
    result: 'Paper Presentation',
    dateOrContext: 'National Conference Track',
    category: 'Conference',
    highlight: 'Paper: "Enhancing Women\'s Safety Using Technology" · Conference ID',
    description:
      'Presented research paper titled "Enhancing Women\'s Safety Using Technology" at the National Conference on Women Skill Development.',
    badgeType: 'trophy',
    badgeVariant: 'participation',
    badgeLabel: 'Paper',
    certificateRef: '/c6.jpeg',
  },
  {
    id: 'hackathon-feb-2025',
    title: 'Hackathon (20–22 Feb 2025)',
    result: 'Participation',
    dateOrContext: '20–22 Feb 2025 · Competitive Sprint',
    category: 'Hackathon',
    highlight: 'Participant ID Card',
    description:
      'Competed in the 20–22 February 2025 Hackathon sprint building rapid software prototypes.',
    badgeType: 'ribbon',
    badgeVariant: 'participation',
    badgeLabel: 'Hack',
    certificateRef: '/c7.jpeg',
  },
  {
    id: 'hackofiesta-6',
    title: 'Hackofiesta 6.0 – AISpire UP Hackathon',
    result: 'Participation',
    dateOrContext: 'AISpire UP Hackathon',
    category: 'Hackathon',
    highlight: 'Yellow Ribbon Medal · Microsoft & Deloitte',
    description:
      'Participated in Hackofiesta 6.0 (AISpire UP Hackathon) supported by Microsoft & Deloitte, awarded Yellow Ribbon Medal.',
    badgeType: 'medal',
    badgeVariant: 'participation',
    badgeLabel: 'Hack',
    certificateRef: '/c8.jpeg',
  },
];
