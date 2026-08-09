export const PERSONAL_INFO = {
  name: 'Aryan Jain',
  nameShort: 'AJ',
  title: 'Data Science @ UC Berkeley',
  tagline: 'I turn ambitious AI ideas into systems you can actually use — from multi-agent research tools to production ML infrastructure.',
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
  eyebrow: string
  headline: string
  tags: string[]
  description: string
  signals: { value: string; label: string }[]
  link: string
}

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'OpenTix',
    eyebrow: 'On-chain ticketing',
    headline: 'A ticket you can verify, own, and resell — without the scalper tax.',
    tags: ['React', 'Vite', 'Express.js', 'MongoDB', 'XRPL', 'xrpl.js', 'JWT'],
    description:
      "Full-stack NFT ticketing platform on the XRP Ledger. Tickets mint as XLS-20 NFTs with native XRP payments, enforced resale price caps, and automatic creator royalties settled at the protocol level via XRPL's TransferFee.",
    signals: [
      { value: 'XLS-20', label: 'NFT standard' },
      { value: 'Native', label: 'XRP settlement' },
      { value: 'Capped', label: 'resale pricing' },
    ],
    link: 'https://github.com/aryanj2374/babhacks',
  },
  {
    num: '02',
    title: 'Multi-Agent Research Assistant',
    eyebrow: 'Agentic research',
    headline: 'One question in. A source-tracked research brief out.',
    tags: ['Python', 'FastAPI', 'asyncio', 'HuggingFace', 'React', 'TypeScript'],
    description:
      'Multi-agent system using Semantic Scholar API to generate comprehensive research overviews with key insights, bias analysis, and source tracking.',
    signals: [
      { value: '4', label: 'specialist agents' },
      { value: 'Async', label: 'parallel pipeline' },
      { value: 'Cited', label: 'every insight' },
    ],
    link: 'https://github.com/aryanj2374/MultiAgentResearcher',
  },
  {
    num: '03',
    title: 'Calsquared',
    eyebrow: 'Calendar intelligence',
    headline: 'The calendar that reads the emails you forgot to turn into events.',
    tags: ['Python', 'FastAPI', 'React', 'Google Calendar API', 'Gmail API', 'LLM'],
    description:
      'Agentic calendar assistant that ingests course schedules, syncs to Google Calendar, and scans Gmail for events. Natural-language chat interface for scheduling, with automatic email-to-event extraction and a FastAPI backend.',
    signals: [
      { value: '2-way', label: 'calendar sync' },
      { value: 'LLM', label: 'event extraction' },
      { value: 'Chat', label: 'scheduling UI' },
    ],
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
    company: 'ChipChop',
    role: 'Software Engineering Intern',
    date: 'Jan 2026 – Present',
    tags: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis'],
    bullets: [
      'Built the tooling and safety layer for an AI HDL agent — multi-file design indexes, scoped read/edit tools, structured tool calling, and post-edit validation across Verilog, SystemVerilog, and VHDL.',
      'Architected a distributed agent runtime that keeps reasoning in the cloud while enforcing file and EDA-tool access locally through capability policies, typed protocols, compatibility gates, and metadata-only audit logs.',
      "Implemented ChipChop's multi-user security layer with Google OAuth through Cognito, revocable server-side sessions, role-based workspace access, and separate Redis/PostgreSQL service identities.",
      'Earlier, built FastAPI/WebSocket services and React + TypeScript IDE features for multi-agent HDL analysis.',
    ],
  },
  {
    id: 2,
    company: 'Inka AI',
    role: 'Software Engineering Intern',
    date: 'May – Jun 2026',
    tags: ['Python', 'FastAPI', 'PyTorch', 'Computer Vision', 'Benchmarking'],
    bullets: [
      'Optimized a FastAPI inference service for a production lip-sync model using persistent loading, preprocessing caches, and generation-path profiling to cut latency without sacrificing visual quality.',
      'Engineered frame-level quality and occlusion gating that detects and skips degraded frames (e.g. hand-over-mouth), replacing coarser segment-level filtering and noticeably reducing visible artifacts on difficult clips.',
      'Built benchmarking and review tooling — regression harnesses, structured timing/quality reports, and side-by-side review pages — to evaluate lip-sync backends on real dubbing clips across latency, occlusion handling, and artifact patterns, supporting model-selection decisions.',
    ],
  },
  {
    id: 3,
    company: 'Undergraduate Lab at Berkeley — Astronomy Division',
    role: 'Researcher',
    date: 'Sep 2025 – May 2026',
    tags: ['Python', 'CARTA', 'CASSIS', 'ALMA', 'Radiative Transfer'],
    bullets: [
      'Modeled protoplanetary disk spectra using Python and ALMA datacubes (CARTA/CASSIS) to identify CS (2–1) emission signatures, estimate molecular abundances, and characterize disk chemistry.',
      'Computed column densities (~10¹³ cm⁻², consistent with existing literature) from observed spectra via radiative transfer equations and partition function interpolation across multiple temperature regimes.',
      'Presented research findings to graduate researchers, students, and professors at a department-wide symposium.',
    ],
  },
  {
    id: 4,
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
    id: 5,
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
