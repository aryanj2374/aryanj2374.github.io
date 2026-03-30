import { EXPERIENCE } from '../data/portfolio'

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        background: '#ffffff',
        padding: '120px clamp(32px, 6.5vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 64 }}>
          <p className="section-label">// Experience</p>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#0a0a0a',
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
              color: '#6b6b6b',
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            Experience building production ML systems and conducting research.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: 'clamp(100px, 14vw, 180px)' }}>
          {/* Vertical line */}
          <div className="timeline-line" />

          {EXPERIENCE.map((entry, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                transitionDelay: `${i * 0.12}s`,
                display: 'flex',
                gap: 40,
                marginBottom: i < EXPERIENCE.length - 1 ? 64 : 0,
                position: 'relative',
              }}
            >
              {/* Dot on timeline */}
              <div
                style={{
                  position: 'absolute',
                  left: 'calc(-1 * clamp(100px, 14vw, 180px) + 0px)',
                  top: 6,
                  width: 7,
                  height: 7,
                  background: '#0a0a0a',
                  borderRadius: '50%',
                  transform: 'translateX(-3px)',
                }}
              />

              {/* Date — floated far left */}
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
                    fontSize: 12,
                    color: '#9a9a9a',
                    lineHeight: 1.5,
                    display: 'block',
                  }}
                >
                  {entry.date}
                </span>
              </div>

              {/* Content */}
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: 18,
                    color: '#0a0a0a',
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
                    color: '#9a9a9a',
                    marginBottom: 16,
                  }}
                >
                  {entry.role}
                </p>

                {/* Tags */}
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 11,
                    color: '#0a0a0a',
                    letterSpacing: '0.02em',
                    marginBottom: 16,
                  }}
                >
                  {entry.tags.join(' · ')}
                </p>

                {/* Bullets */}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {entry.bullets.map((b, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 14,
                        color: '#6b6b6b',
                        lineHeight: 1.7,
                        paddingLeft: 20,
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: 0,
                          color: '#9a9a9a',
                          fontFamily: 'Space Mono, monospace',
                        }}
                      >
                        —
                      </span>
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
