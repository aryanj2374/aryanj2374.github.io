import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../data/portfolio'

const AJLogo = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" fill="#1d1d1f"/>
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
  const [activeSection, setActiveSection] = useState('')
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1))

    const onScroll = () => {
      setScrolled(window.scrollY > 80)
      const scrollY = window.scrollY + 100
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActiveSection(current)

      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
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
        background: scrolled ? 'rgba(255, 255, 255, 0.85)' : '#ffffff',
        backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid #e5e5e5' : '1px solid transparent',
        transition: 'border-color 300ms ease, background 300ms ease',
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
        <a href="#" aria-label="Aryan Jain" className="logo-mark" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <AJLogo />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 3vw, 32px)' }}>
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                className={isActive ? 'nav-link active' : 'nav-link'}
              >
                {link.label}
              </a>
            )
          })}
        </div>
      </div>

      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
    </nav>
  )
}
