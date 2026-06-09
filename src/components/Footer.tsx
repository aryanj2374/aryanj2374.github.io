import { PERSONAL_INFO } from '../data/portfolio'

const LINKS = [
  { label: 'GitHub', href: PERSONAL_INFO.github },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}` },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid #1c1c1e',
        height: 80,
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(32px, 6.5vw, 100px)',
        justifyContent: 'space-between',
      }}
    >
      <p
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: 12,
          color: '#8e8e93',
        }}
      >
        © {new Date().getFullYear()} Aryan Jain
      </p>

      <div style={{ display: 'flex', gap: 24 }}>
        {LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="footer-link"
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
