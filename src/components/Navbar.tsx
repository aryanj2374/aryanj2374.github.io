import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '../data/portfolio'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.href.slice(1))
    let frame = 0
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 24)
      const current = sectionIds.reduce((active, id) => {
        const section = document.getElementById(id)
        return section && section.offsetTop <= window.scrollY + 160 ? id : active
      }, '')
      setActiveSection(current)
      const root = document.documentElement
      const max = root.scrollHeight - root.clientHeight
      progressRef.current?.style.setProperty('transform', `scaleX(${max > 0 ? window.scrollY / max : 0})`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <nav className={scrolled ? 'navbar is-scrolled' : 'navbar'} aria-label="Primary navigation">
      <div className="nav-inner page-shell">
        <a className="wordmark" href="#hero" aria-label="Aryan Jain, back to top"><span>AJ</span><i /></a>
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a className={activeSection === link.href.slice(1) ? 'active' : ''} href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <a className="nav-cta" href="#contact"><span>Let’s talk</span><i>↗</i></a>
      </div>
      <div ref={progressRef} className="nav-progress" aria-hidden="true" />
    </nav>
  )
}
