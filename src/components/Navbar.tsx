import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../data/portfolio'

const AJLogo = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" fill="#0a0a0a"/>
    {/* A */}
    <path d="M4,28 L10.5,8 L17,28" stroke="white" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" fill="none"/>
    <line x1="6.4" y1="21" x2="14.8" y2="21" stroke="white" strokeWidth="1.9" strokeLinecap="square"/>
    {/* J */}
    <line x1="21" y1="8" x2="31" y2="8" stroke="white" strokeWidth="1.9" strokeLinecap="square"/>
    <path d="M26,8 V27 H20" stroke="white" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter" fill="none"/>
  </svg>
)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        background: '#f5f4f0',
        borderBottom: scrolled ? '1px solid #e0deda' : '1px solid transparent',
        transition: 'border-color 300ms ease',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo mark */}
        <a href="#" aria-label="Aryan Jain" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <AJLogo />
        </a>

        {/* Nav links — always visible, gap tightens on mobile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)' }}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: '#9a9a9a',
                transition: 'color 150ms ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#0a0a0a' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#9a9a9a' }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
