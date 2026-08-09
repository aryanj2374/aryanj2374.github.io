import { useEffect, useRef } from 'react'
import { PERSONAL_INFO } from '../data/portfolio'

const SYSTEM_NODES = [
  { label: 'reason', className: 'node-reason' },
  { label: 'build', className: 'node-build' },
  { label: 'verify', className: 'node-verify' },
  { label: 'ship', className: 'node-ship' },
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
            <span className="status-dot" aria-hidden="true" />
            <span>Data Science @ UC Berkeley</span>
            <span className="kicker-divider" />
            <span>Building now</span>
          </div>

          <h1 className="hero-title" aria-label="I build intelligent systems that ship">
            <span className="title-line title-line-one">I build</span>
            <span className="title-line title-line-two">intelligent</span>
            <span className="title-line title-line-three">
              systems that <span className="title-accent">ship.</span>
            </span>
          </h1>

          <div className="hero-bottom intro-enter intro-enter-late">
            <p>{PERSONAL_INFO.tagline}</p>
            <div className="hero-actions">
              <a className="button button-bright" href="#projects">
                Explore the work <span aria-hidden="true">↘</span>
              </a>
              <a className="text-link" href={`mailto:${PERSONAL_INFO.email}`}>
                Start a conversation <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="system-stage intro-enter intro-enter-visual" aria-hidden="true">
          <div className="stage-chrome">
            <span>AJ / SYSTEMS LAB</span>
            <span className="stage-live"><i /> LIVE</span>
          </div>
          <div className="orbit orbit-outer" />
          <div className="orbit orbit-middle" />
          <div className="orbit orbit-inner" />
          <div className="system-core">
            <span>idea</span>
            <strong>→</strong>
            <span>system</span>
          </div>
          {SYSTEM_NODES.map((node, index) => (
            <div className={`system-node ${node.className}`} key={node.label}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {node.label}
            </div>
          ))}
          <div className="signal-trace trace-one" />
          <div className="signal-trace trace-two" />
          <div className="stage-readout readout-top">latency / 42ms</div>
          <div className="stage-readout readout-bottom">confidence / 98.4%</div>
        </div>
      </div>

      <div className="hero-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map(copy => (
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
