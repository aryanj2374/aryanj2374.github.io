/**
 * Portfolio App - Main Application Component
 * 
 * A modern, premium portfolio website for Aryan Jain
 * Built with React + Vite, featuring glassmorphism design and smooth animations
 */

import { useState, useEffect, useRef } from 'react'
import './App.css'

// =============================================================================
// ICON COMPONENTS
// Clean SVG icons to avoid external dependencies
// =============================================================================

const Icons = {
  GitHub: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  LinkedIn: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  ),
  ExternalLink: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  ChevronDown: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  Code: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Database: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  Brain: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.96-3.08 3 3 0 01-.34-5.58 2.5 2.5 0 011.32-4.24 2.5 2.5 0 013.44-4.54A2.5 2.5 0 019.5 2z" />
      <path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.96-3.08 3 3 0 00.34-5.58 2.5 2.5 0 00-1.32-4.24 2.5 2.5 0 00-3.44-4.54A2.5 2.5 0 0014.5 2z" />
    </svg>
  ),
  Cpu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Globe: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
  Calendar: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

// =============================================================================
// DATA CONSTANTS
// Easily customizable portfolio content
// =============================================================================

const PERSONAL_INFO = {
  name: 'Aryan Jain',
  title: 'Data Science @ UC Berkeley',
  tagline: 'Building practical tools, agentic workflows, and software that solves real-world problems.',
  email: 'aryanj@berkeley.edu',
  github: 'https://github.com/aryanj2374',
  linkedin: 'https://linkedin.com/in/aryanjain0'
}

const PROJECTS = [
  {
    id: 1,
    title: 'Calsquared',
    description: 'Built an agentic AI calendar assistant that automates scheduling and task management, providing context-aware recommendations such as gym timing, meal suggestions based on user preference, and dynamic to-do list updates.',
    tech: ['Python', 'FastAPI', 'LangChain', 'React'],
    link: 'https://github.com/aryanj2374/Calhacks12.0',
    icon: 'Calendar'
  },
  {
    id: 2,
    title: 'Chatbot Assistant',
    description: 'Built a chatbot assistant that can answer questions about my high school using scraped documents.',
    tech: ['Python', 'LangChain', 'HuggingFace', 'FAISS'],
    link: 'https://github.com/aryanj2374/DHSChatbotProject',
    icon: 'Database'
  },
  {
    id: 3,
    title: 'Scholarship Probability Model',
    description: 'Built a model to predict a student\'s scholarship probabilities using regression.',
    tech: ['Python', 'Scikit-learn', 'Tensorflow', 'Keras', 'Pandas', 'NumPy', 'Matplotlib'],
    link: 'https://github.com/aryanj2374/ScholarshipProbabilityModel',
    icon: 'Cpu'
  }
]

const EXPERIENCE = [
  {
    id: 1,
    company: 'Tech Research Lab',
    role: 'Machine Learning Research Intern',
    date: 'Summer 2025',
    bullets: [
      'Developed novel neural architecture for multi-modal learning, improving baseline accuracy by 12%',
      'Implemented distributed training pipeline reducing model convergence time by 40%',
      'Co-authored research paper on attention mechanisms accepted to NeurIPS workshop'
    ]
  },
  {
    id: 2,
    company: 'UC Berkeley Data Lab',
    role: 'Undergraduate Researcher',
    date: '2024 — Present',
    bullets: [
      'Leading research on interpretable machine learning methods for healthcare applications',
      'Built automated data preprocessing pipeline handling 50+ medical imaging datasets',
      'Mentoring 3 junior researchers on deep learning fundamentals and best practices'
    ]
  },
  {
    id: 3,
    company: 'AI Startup',
    role: 'Data Science Intern',
    date: 'Summer 2024',
    bullets: [
      'Designed recommendation engine serving 100K+ daily active users with sub-50ms latency',
      'Optimized feature store reducing infrastructure costs by 30% while improving model freshness',
      'Developed A/B testing framework for evaluating ML model performance in production'
    ]
  }
]

const SKILLS = {
  'Programming': ['Python', 'JavaScript', 'SQL', 'Java'],
  'Machine Learning': ['PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'LangChain'],
  // 'Data & Cloud': ['PostgreSQL', 'MongoDB', 'Spark', 'AWS', 'GCP', 'Docker', 'Kubernetes'],
  'Tools & Frameworks': ['React', 'FastAPI', 'Git', 'Jupyter', 'FAISS', 'FastAPI', 'Pandas', 'NumPy', 'Matplotlib']
}

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]

// =============================================================================
// CUSTOM HOOKS
// Reusable logic for scroll animations and navigation
// =============================================================================

/**
 * Hook to track scroll position and apply styles when scrolled
 */
function useScrolled(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}

/**
 * Hook for intersection observer based reveal animations
 */
function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = ref.current?.querySelectorAll('.reveal')
    elements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

// =============================================================================
// NAVIGATION COMPONENT
// Sticky header with smooth scroll navigation
// =============================================================================

function Navigation() {
  const isScrolled = useScrolled()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__container">
        <a href="#" className="nav__logo gradient-text">AJ</a>

        <div className={`nav__links ${mobileMenuOpen ? 'nav__links--mobile' : ''}`}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav__socials">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__social-link"
            aria-label="GitHub Profile"
          >
            <Icons.GitHub />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__social-link"
            aria-label="LinkedIn Profile"
          >
            <Icons.LinkedIn />
          </a>
        </div>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

// =============================================================================
// HERO SECTION
// Landing section with name, title, and call-to-action
// =============================================================================

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <div className="hero__badge animate-fadeInUp">
          Open to Opportunities
        </div>

        <h1 className="hero__name animate-fadeInUp delay-100">
          {PERSONAL_INFO.name}
        </h1>

        <p className="hero__title animate-fadeInUp delay-200">
          {PERSONAL_INFO.title}
        </p>

        <p className="hero__tagline animate-fadeInUp delay-300">
          {PERSONAL_INFO.tagline}
        </p>

        <div className="hero__buttons animate-fadeInUp delay-400">
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in Touch
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <Icons.ChevronDown />
      </div>
    </section>
  )
}

// =============================================================================
// PROJECT CARD COMPONENT
// Individual project display with hover effects
// =============================================================================

function ProjectCard({ project, index }) {
  const IconComponent = Icons[project.icon] || Icons.Code

  return (
    <article
      className="glass-card project-card reveal"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="project-card__header">
        <div className="project-card__icon">
          <IconComponent />
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-card__link"
          aria-label={`View ${project.title} on GitHub`}
        >
          <Icons.ExternalLink />
        </a>
      </div>

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>

      <div className="project-card__tech">
        {project.tech.map(tech => (
          <span key={tech} className="tech-chip">{tech}</span>
        ))}
      </div>
    </article>
  )
}

// =============================================================================
// PROJECTS SECTION
// Grid of project cards
// =============================================================================

function Projects() {
  const sectionRef = useReveal()

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title reveal">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="section-subtitle reveal">
          A selection of research and engineering projects spanning machine learning,
          data infrastructure, and full-stack development.
        </p>

        <div className="projects__grid">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// EXPERIENCE SECTION
// Timeline of professional experience
// =============================================================================

function Experience() {
  const sectionRef = useReveal()

  return (
    <section className="section experience" id="experience" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title reveal">
          Experience
        </h2>
        <p className="section-subtitle reveal">
          Research and industry experience building production ML systems and conducting
          applied AI research.
        </p>

        <div className="experience__timeline">
          {EXPERIENCE.map((exp, index) => (
            <article
              key={exp.id}
              className="glass-card experience-card reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="experience-card__header">
                <h3 className="experience-card__company">{exp.company}</h3>
                <p className="experience-card__role">{exp.role}</p>
                <p className="experience-card__date">{exp.date}</p>
              </div>

              <ul className="experience-card__bullets">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// SKILLS SECTION
// Categorized skill chips
// =============================================================================

function Skills() {
  const sectionRef = useReveal()

  return (
    <section className="section skills" id="skills" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title reveal">
          Skills & <span className="gradient-text">Technologies</span>
        </h2>
        <p className="section-subtitle reveal">
          Technologies and tools I use to bring ideas to life.
        </p>

        <div className="skills__categories">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <div
              key={category}
              className="glass-card skills__category reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="skills__category-title">{category}</h3>
              <div className="skills__list">
                {skills.map(skill => (
                  <span key={skill} className="tech-chip">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// CONTACT SECTION
// Call-to-action with email and social links
// =============================================================================

function Contact() {
  const sectionRef = useReveal()

  return (
    <section className="section contact" id="contact" ref={sectionRef}>
      <div className="container">
        <div className="contact__content reveal">
          <h2 className="contact__title">
            Let&apos;s Build Something <span className="gradient-text">Together</span>
          </h2>
          <p className="contact__text">
            I&apos;m always interested in discussing new opportunities, research collaborations,
            or just chatting about machine learning and software engineering.
          </p>

          <a href={`mailto:${PERSONAL_INFO.email}`} className="contact__email gradient-text">
            {PERSONAL_INFO.email}
          </a>

          <div className="contact__socials">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
            >
              <Icons.GitHub />
              <span>GitHub</span>
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
            >
              <Icons.LinkedIn />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="contact__social-link"
            >
              <Icons.Mail />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// FOOTER COMPONENT
// =============================================================================

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">
          © {new Date().getFullYear()} Aryan Jain. Built with React & Vite.
        </p>
      </div>
    </footer>
  )
}

// =============================================================================
// MAIN APP COMPONENT
// =============================================================================

function App() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
