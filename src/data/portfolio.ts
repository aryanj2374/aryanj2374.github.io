export const PERSONAL_INFO = {
  name: 'Aryan Jain',
  nameShort: 'AJ',
  title: 'Data Science @ UC Berkeley',
  tagline: 'Building intelligent systems at the intersection of AI and software engineering.',
  email: 'aryanj@berkeley.edu',
  github: 'https://github.com/aryanj2374',
  linkedin: 'https://linkedin.com/in/aryanjain0',
} as const

export const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export interface Project {
  num: string
  title: string
  tags: string[]
  description: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'OpenTix',
    tags: ['React', 'Vite', 'Express.js', 'MongoDB', 'XRPL', 'xrpl.js', 'JWT'],
    description:
      "Full-stack NFT ticketing platform on the XRP Ledger. Tickets mint as XLS-20 NFTs with native XRP payments, enforced resale price caps, and automatic creator royalties settled at the protocol level via XRPL's TransferFee.",
    link: 'https://github.com/aryanj2374/babhacks',
  },
  {
    num: '02',
    title: 'Multi-Agent Research Assistant',
    tags: ['Python', 'FastAPI', 'asyncio', 'HuggingFace', 'React', 'TypeScript'],
    description:
      'Multi-agent system using Semantic Scholar API to generate comprehensive research overviews with key insights, bias analysis, and source tracking.',
    link: 'https://github.com/aryanj2374/MultiAgentResearcher',
  },
  {
    num: '03',
    title: 'Calsquared',
    tags: ['Python', 'FastAPI', 'React', 'Google Calendar API', 'Gmail API', 'LLM'],
    description:
      'Agentic calendar assistant that ingests course schedules, syncs to Google Calendar, and scans Gmail for events. Natural-language chat interface for scheduling, with automatic email-to-event extraction and a FastAPI backend.',
    link: 'https://github.com/aryanj2374/Calhacks12.0',
  },
]

export interface Experience {
  id: number
  company: string
  role: string
  date: string
  tags: string[]
  bullets: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    company: 'Chipchop',
    role: 'Software Engineering Intern',
    date: 'Jan 2026 – Present',
    tags: ['Python', 'FastAPI', 'WebSockets', 'React', 'TypeScript'],
    bullets: [
      'Built backend features for an FPGA debugging platform with a multi-agent system to analyze and troubleshoot Verilog/VHDL projects.',
      'Enhanced evaluation and debugging tooling in the React + TypeScript IDE to surface agent outputs and project context in real time.',
      'Stabilized multi-agent execution with validation, diagnostics-based error handling, and pytest test coverage.',
    ],
  },
  {
    id: 2,
    company: 'Undergraduate Lab at Berkeley',
    role: 'Undergraduate Researcher',
    date: 'Sep 2025 – Present',
    tags: ['Python', 'CARTA', 'CASSIS', 'Spectral Modeling'],
    bullets: [
      'Exploring protoplanetary disk chemistry to predict exoplanet habitability using datacube spectral analysis.',
      'Modeling spectra and making predictions with CARTA, CASSIS, Python.',
      'Presented research at a symposium to graduate students and professors.',
    ],
  },
  {
    id: 3,
    company: 'Quantum Materials Research Group',
    role: 'Undergraduate Researcher',
    date: 'Jul – Dec 2024',
    tags: ['Python', 'Materials Screening', 'Energy Research'],
    bullets: [
      'Screened 200k+ materials to identify efficient PV cell candidates under Prof. Sobhit Singh at University of Rochester.',
      'Presented findings to 20+ graduate researchers in a Materials Science seminar.',
    ],
  },
  {
    id: 4,
    company: 'Independent Research – AstroGEN-NSSEA',
    role: 'Lead Developer',
    date: 'Nov 2023 – Jan 2024',
    tags: ['Python', 'PSO', 'Swarm Robotics'],
    bullets: [
      'Modified Particle Swarm Optimization to improve convergence in swarm robotics for search and rescue contexts.',
      'Won Best Research Paper (1st out of 150+) at AstroGEN Think Tank.',
    ],
  },
]

export const SKILLS: Record<string, string[]> = {
  Programming: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java'],
  'Machine Learning': ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'HuggingFace', 'LangChain'],
  'Tools & Frameworks': ['React', 'Vite', 'FastAPI', 'Git', 'Jupyter', 'FAISS', 'Pandas', 'NumPy', 'Matplotlib'],
}
