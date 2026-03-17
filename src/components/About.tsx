const SKILLS = {
  Programming: ['Python', 'JavaScript', 'TypeScript', 'SQL', 'Java'],
  ML: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'HuggingFace', 'LangChain'],
  Tools: ['React', 'Vite', 'FastAPI', 'Git', 'Jupyter', 'FAISS', 'Pandas', 'NumPy'],
}

export default function About() {
  const allSkills = Object.entries(SKILLS)

  return (
    <section
      id="skills"
      style={{
        background: '#ffffff',
        padding: '120px clamp(32px, 6.5vw, 100px)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Section label */}
        <div className="reveal" style={{ marginBottom: 64 }}>
          <p className="section-label">// About</p>
        </div>

        {/* 60/40 split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.6fr) minmax(0, 0.4fr)',
            gap: 'clamp(48px, 8vw, 120px)',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          {/* Left — Bio */}
          <div className="reveal">
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: '#0a0a0a',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 32,
              }}
            >
              AI, software engineering, and research.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                `I'm a Data Science student at UC Berkeley working at the intersection of AI, software engineering, and research. My experience spans both academic and applied settings, from analyzing ALMA data for protoplanetary disk chemistry to building agent-based systems and developer tools.`,
                `I focus on building systems that are practical and reliable. That means thinking beyond whether something works once and paying attention to performance, edge cases, and how tools behave under real conditions. A lot of my work involves designing workflows that make complex processes easier to understand, debug, and extend.`,
                `My background includes research in astrophysics at Berkeley and quantum materials at the University of Rochester, which shaped how I approach problem solving across different domains. I enjoy working on problems that combine data, systems, and real-world constraints, and I tend to gravitate toward projects where both the technical depth and the practical impact matter.`,
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 17,
                    color: '#6b6b6b',
                    lineHeight: 1.7,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Right — Skills */}
          <div
            className="reveal"
            style={{ transitionDelay: '0.12s' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
              {allSkills.map(([category, skills]) => (
                <div key={category}>
                  <p
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 11,
                      color: '#9a9a9a',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      marginBottom: 16,
                    }}
                  >
                    {category}
                  </p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '4px 0',
                    }}
                  >
                    {skills.map(skill => (
                      <div key={skill} className="skill-item">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
