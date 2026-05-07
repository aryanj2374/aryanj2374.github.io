import { useEffect, useRef } from 'react'
import { EXPERIENCE } from '../data/portfolio'

export default function Experience() {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    let observer: IntersectionObserver
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
    })
    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
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

        <div style={{ position: 'relative', paddingLeft: 'clamp(100px, 14vw, 180px)' }}>
          <div className="timeline-line" />

          {EXPERIENCE.map((entry, i) => (
            <div
              key={i}
              ref={el => { entryRefs.current[i] = el }}
              className="timeline-entry"
              style={{
                transitionDelay: `${i * 0.1}s`,
                display: 'flex',
                gap: 40,
                marginBottom: i < EXPERIENCE.length - 1 ? 64 : 0,
                position: 'relative',
              }}
            >
              <div
                className="timeline-node-dot"
                style={{
                  transitionDelay: `${i * 0.1}s`,
                  position: 'absolute',
                  left: 'calc(-1 * clamp(100px, 14vw, 180px) + 0px)',
                  top: 6,
                  width: 8,
                  height: 8,
                  background: '#1d1d1f',
                  borderRadius: '50%',
                  transformOrigin: 'center',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  left: 'calc(-1 * clamp(100px, 14vw, 180px) + 24px)',
                  top: 0,
                  width: 'clamp(76px, 10vw, 140px)',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 11,
                    color: '#98989d',
                    lineHeight: 1.5,
                    display: 'block',
                    letterSpacing: '0.02em',
                  }}
                >
                  {entry.date}
                </span>
              </div>

              <div style={{ flex: 1 }}>
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
