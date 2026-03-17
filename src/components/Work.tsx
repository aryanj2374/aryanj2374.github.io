import { PROJECTS } from '../data/portfolio'

export default function Work() {
  return (
    <section
      id="projects"
      style={{
        background: '#f5f4f0',
        padding: '120px clamp(32px, 6.5vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section header */}
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p className="section-label">// Work</p>
          <h2
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(32px, 4vw, 48px)',
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            Selected projects.
          </h2>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 1,
            background: '#e0deda',
            border: '1px solid #e0deda',
          }}
        >
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card reveal"
              style={{ transitionDelay: `${i * 0.1}s`, paddingBottom: 64 }}
            >
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#9a9a9a', marginBottom: 24 }}>
                {project.num}
              </p>
              <h3
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  fontSize: 20,
                  color: '#0a0a0a',
                  letterSpacing: '-0.01em',
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 11,
                  color: '#9a9a9a',
                  marginBottom: 16,
                  letterSpacing: '0.02em',
                  lineHeight: 1.8,
                }}
              >
                {project.tags.join(' · ')}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  color: '#6b6b6b',
                  lineHeight: 1.7,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </p>
              <span className="view-link" style={{ fontFamily: 'Inter, sans-serif' }}>
                View project →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
