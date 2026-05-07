import { PROJECTS } from '../data/portfolio'

export default function Work() {
  return (
    <section
      id="projects"
      style={{
        background: '#ffffff',
        padding: '120px clamp(32px, 6.5vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p className="section-label">// Work</p>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#1d1d1f',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Selected projects.
          </h2>
        </div>

        <div>
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-row reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="ghost-num" aria-hidden="true">{project.num}</span>

              <div style={{ flex: 1, paddingLeft: 80, paddingRight: 40, minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 32,
                    color: '#1d1d1f',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    color: '#6e6e73',
                    lineHeight: 1.6,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {project.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    justifyContent: 'flex-end',
                    maxWidth: 280,
                  }}
                >
                  {project.tags.map(tag => (
                    <span key={tag} className="tech-pill">{tag}</span>
                  ))}
                </div>
                <span className="view-link">View repo ↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .project-row { flex-direction: column; align-items: flex-start; gap: 16px; }
          .ghost-num { font-size: 120px !important; }
        }
      `}</style>
    </section>
  )
}
