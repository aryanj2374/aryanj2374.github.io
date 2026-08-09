import { useEffect, useRef } from 'react'
import { PERSONAL_INFO } from '../data/portfolio'

const SYSTEM_NODES = [
  { label: 'research', className: 'node-reason' },
  { label: 'build', className: 'node-build' },
  { label: 'test', className: 'node-verify' },
  { label: 'deploy', className: 'node-ship' },
]

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const move = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        hero.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
        hero.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
        frame = 0
      })
    }
    hero.addEventListener('pointermove', move, { passive: true })
    return () => {
      hero.removeEventListener('pointermove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section ref={heroRef} className="hero" id="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-layout page-shell">
        <div className="hero-copy">
          <div className="hero-kicker intro-enter">
            <span>Data Science @ UC Berkeley</span>
          </div>

          <h1 className="hero-title" aria-label="Aryan Jain">
            <span className="title-line title-line-one">Aryan Jain</span>
          </h1>

          <div className="hero-bottom intro-enter intro-enter-late">
            <p>{PERSONAL_INFO.tagline}</p>
            <div className="hero-actions">
              <a className="button button-bright" href="#projects">
                View projects <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href={`mailto:${PERSONAL_INFO.email}`}>
                Email me <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="system-stage intro-enter intro-enter-visual" aria-hidden="true">
          <div className="orbit orbit-outer" />
          <div className="orbit orbit-middle" />
          <div className="orbit orbit-inner" />
          <div className="system-core">
            <span>data</span>
            <strong>→</strong>
            <span>software</span>
          </div>
          {SYSTEM_NODES.map((node, index) => (
            <div className={`system-node ${node.className}`} key={node.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {node.label}
            </div>
          ))}
          <div className="signal-trace trace-research" />
          <div className="signal-trace trace-build" />
          <div className="signal-trace trace-test" />
          <div className="signal-trace trace-deploy" />
          <div className="stage-readout readout-top">Berkeley, California</div>
          <div className="stage-readout readout-bottom">Python / TypeScript</div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1, 2].map(copy => (
            <div className="ticker-set" key={copy}>
              <span>AI AGENTS</span><i>✦</i>
              <span>PRODUCTION ML</span><i>✦</i>
              <span>RESEARCH SYSTEMS</span><i>✦</i>
              <span>DEVELOPER TOOLS</span><i>✦</i>
              <span>SCIENTIFIC COMPUTING</span><i>✦</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
