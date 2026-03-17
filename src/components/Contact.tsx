import { useState } from 'react'
import { PERSONAL_INFO } from '../data/portfolio'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 6L12 13L2 6" />
  </svg>
)

const SOCIALS = [
  { label: 'GitHub', icon: GitHubIcon, href: 'https://github.com/aryanj2374' },
  { label: 'LinkedIn', icon: LinkedInIcon, href: 'https://linkedin.com/in/aryanjain0' },
  { label: 'Email', icon: MailIcon, href: `mailto:${PERSONAL_INFO.email}` },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback — do nothing
    }
  }

  return (
    <section
      id="contact"
      style={{
        background: '#f5f4f0',
        padding: '140px clamp(32px, 6.5vw, 100px)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Label */}
        <div className="reveal" style={{ marginBottom: 32 }}>
          <p className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>
            // Contact
          </p>
        </div>

        {/* Big headline */}
        <div className="reveal" style={{ transitionDelay: '0.05s', marginBottom: 24 }}>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(40px, 5.5vw, 72px)',
              color: '#0a0a0a',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
            }}
          >
            Let's ship something.
          </h2>
        </div>

        {/* Subtext */}
        <div className="reveal" style={{ transitionDelay: '0.1s', marginBottom: 56 }}>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 17,
              color: '#6b6b6b',
              lineHeight: 1.65,
              maxWidth: 520,
              margin: '0 auto',
            }}
          >
            Open to research collaborations, engineering roles, and interesting problems.
          </p>
        </div>

        {/* Email copy */}
        <div className="reveal" style={{ transitionDelay: '0.15s', marginBottom: 56 }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              onClick={copyEmail}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 18,
                color: '#0a0a0a',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #e0deda',
                paddingBottom: 2,
                cursor: 'pointer',
                transition: 'border-color 200ms ease',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#e0deda' }}
            >
              {PERSONAL_INFO.email}
            </button>

            {/* Copied tooltip */}
            <span
              style={{
                position: 'absolute',
                top: -36,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Space Mono, monospace',
                fontSize: 11,
                color: '#ffffff',
                background: '#0a0a0a',
                padding: '4px 10px',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                opacity: copied ? 1 : 0,
                transition: 'opacity 200ms ease',
                pointerEvents: 'none',
              }}
            >
              Copied!
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className="reveal"
          style={{
            transitionDelay: '0.18s',
            width: 40,
            height: 1,
            background: '#e0deda',
            margin: '0 auto 40px',
          }}
        />

        {/* Social links */}
        <div
          className="reveal"
          style={{
            transitionDelay: '0.2s',
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {SOCIALS.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                color: '#9a9a9a',
                transition: 'color 150ms ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9a9a9a' }}
            >
              <Icon />
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
