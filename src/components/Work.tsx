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

        {/* Header */}
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

        {/* Card grid */}
        <div className="project-card-grid reveal" style={{ transitionDelay: '0.1s' }}>
          {PROJECTS.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-new"
            >
              {/* Number */}
              <span className="card-num">{project.num}</span>

              {/* Title */}
              <h3 className="card-title">{project.title}</h3>

              {/* Tech tags */}
              <div className="card-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tech-pill">{tag}</span>
                ))}
              </div>

              {/* Description */}
              <p className="card-desc">{project.description}</p>

              {/* CTA */}
              <div className="card-cta">View repo ↗</div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
