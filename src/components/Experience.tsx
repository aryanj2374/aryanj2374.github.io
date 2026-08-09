import { useState } from 'react'
import { EXPERIENCE } from '../data/portfolio'

export default function Experience() {
  const [active, setActive] = useState(0)
  const current = EXPERIENCE[active]

  return (
    <section className="experience-section" id="experience">
      <div className="page-shell">
        <header className="section-head experience-head reveal">
          <div><span className="eyebrow">EXPERIENCE</span><span className="section-count">/ {String(EXPERIENCE.length).padStart(2, '0')}</span></div>
          <h2>Software engineering<br />and research.</h2>
        </header>

        <div className="experience-console reveal">
          <div className="experience-rail" role="tablist" aria-label="Experience timeline">
            {EXPERIENCE.map((entry, index) => (
              <button
                aria-controls={`experience-panel-${index}`}
                aria-selected={active === index}
                className={active === index ? 'experience-tab active' : 'experience-tab'}
                id={`experience-tab-${index}`}
                key={`${entry.company}-${entry.date}`}
                onClick={() => setActive(index)}
                role="tab"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{entry.company}</strong><small>{entry.date}</small></div>
                <i aria-hidden="true">↗</i>
              </button>
            ))}
          </div>

          <div
            aria-labelledby={`experience-tab-${active}`}
            className="experience-panel"
            id={`experience-panel-${active}`}
            key={current.company}
            role="tabpanel"
          >
            <div className="panel-meta">
              <span>{current.date.includes('Present') ? '● CURRENT ROLE' : '● PREVIOUS ROLE'}</span>
              <span>ENTRY {String(active + 1).padStart(2, '0')} / {String(EXPERIENCE.length).padStart(2, '0')}</span>
            </div>
            <h3>{current.role}</h3>
            <p className="panel-company">{current.company}</p>
            <ul>{current.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
            <div className="panel-tags">{current.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
