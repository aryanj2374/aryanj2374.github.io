import { useEffect, useRef } from 'react'
import { EXPERIENCE } from '../data/portfolio'

export default function Experience() {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])
  const gutterRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Trace the blue path down the line as the section scrolls past an
  // activation point (~55% of the viewport); light up nodes it has reached.
  useEffect(() => {
    const gutter = gutterRef.current
    const progress = progressRef.current
    if (!gutter || !progress) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.style.transform = 'scaleY(1)'
      entryRefs.current.forEach(el => el?.classList.add('passed'))
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const rect = gutter.getBoundingClientRect()
      const focus = window.innerHeight * 0.55
      const p = Math.min(1, Math.max(0, (focus - rect.top) / rect.height))
      progress.style.transform = `scaleY(${p})`
      const reach = p * rect.height
      entryRefs.current.forEach(el => {
        if (!el) return
        const dotY = el.getBoundingClientRect().top - rect.top + 10
        el.classList.toggle('passed', dotY <= reach)
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    let observer: IntersectionObserver
    let lineObserver: IntersectionObserver
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('entry-visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
      )
      entryRefs.current.forEach(el => { if (el) observer.observe(el) })

      // Draw the timeline line once the section enters the viewport
      lineObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('drawn')
            lineObserver.unobserve(entry.target)
          }
        },
        { threshold: 0.1 }
      )
      if (gutterRef.current) lineObserver.observe(gutterRef.current)
    })
    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
      lineObserver?.disconnect()
    }
  }, [])

  return (
    <section
      id="experience"
      style={{
        background: '#f5f5f7',
        padding: '120px clamp(32px, 6.5vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <p className="section-label">// Experience</p>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Where I've worked.
          </h2>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 16,
              color: '#6e6e73',
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            Experience building production ML systems and conducting research.
          </p>
        </div>

        <div ref={gutterRef} className="timeline-gutter">
          <div className="timeline-line" />
          <div ref={progressRef} className="timeline-progress" aria-hidden="true" />

          {EXPERIENCE.map((entry, i) => (
            <div
              key={i}
              ref={el => { entryRefs.current[i] = el }}
              className="timeline-entry"
              style={{
                '--stagger': `${i * 0.1}s`,
                display: 'flex',
                gap: 40,
                marginBottom: i < EXPERIENCE.length - 1 ? 64 : 0,
                position: 'relative',
              } as React.CSSProperties}
            >
              <div
                className={entry.date.includes('Present') ? 'timeline-node-dot live' : 'timeline-node-dot'}
              />

              <div style={{ flex: 1 }}>
                <span className="timeline-date">{entry.date}</span>
                <span className="entry-index">{String(i + 1).padStart(2, '0')}</span>
                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#1d1d1f',
                    marginBottom: 4,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {entry.company}
                </h3>
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 13,
                    color: '#6e6e73',
                    marginBottom: 16,
                  }}
                >
                  {entry.role}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {entry.tags.map(tag => (
                    <span key={tag} className="tech-pill">{tag}</span>
                  ))}
                </div>

                <ul
                  style={{
                    borderLeft: '1px solid #d2d2d7',
                    paddingLeft: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  {entry.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        color: '#6e6e73',
                        lineHeight: 1.7,
                      }}
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
