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
          color: '#9a9a9a',
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
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 12,
              color: '#9a9a9a',
              transition: 'color 150ms ease',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9a9a9a' }}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  )
}
