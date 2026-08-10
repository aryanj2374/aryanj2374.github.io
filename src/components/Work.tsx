import type { Project } from '../data/portfolio'
import { PROJECTS } from '../data/portfolio'

function TicketVisual() {
  return (
    <div className="project-visual ticket-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-topline"><span>OPENTIX / LEDGER</span><span className="visual-status">● VERIFIED</span></div>
      <div className="ticket-shell">
        <div className="ticket-main">
          <span className="ticket-label">LIVE / BERKELEY</span>
          <strong>CAL NIGHT</strong>
          <span className="ticket-meta">NOV 08 · 08:30 PM</span>
          <div className="ticket-code">0 3 9 2 7 4 8</div>
        </div>
        <div className="ticket-stub"><span>SEC</span><strong>12</strong><span>SEAT 24</span></div>
      </div>
      <div className="ledger-flow">
        <div><i>01</i><span>MINT</span></div><b>→</b><div><i>02</i><span>OWN</span></div><b>→</b><div><i>03</i><span>RESALE</span></div>
      </div>
      <div className="cap-badge"><span>RESALE CAP</span><strong>1.20×</strong></div>
      <div className="scan-line" />
    </div>
  )
}

function ResearchVisual() {
  const agents = [
    ['01', 'Planner', 'Creates subquestions'],
    ['02', 'Retriever', 'Finds papers'],
    ['03', 'Extractor', 'Collects evidence'],
    ['04', 'Critic', 'Reviews quality'],
    ['05', 'Synthesizer', 'Builds conclusions'],
    ['06', 'Referee', 'Checks citations'],
  ]

  return (
    <div className="project-visual research-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-topline"><span>RESEARCH / PIPELINE</span><span className="visual-status amber">● ACTIVE</span></div>
      <div className="research-query">
        <div><span>RESEARCH QUESTION</span><p>How do multi-agent systems improve scientific discovery?</p></div>
        <strong>24 PAPERS</strong>
      </div>
      <div className="research-pipeline">
        <div className="pipeline-track"><i /></div>
        {agents.map(([number, name, task], index) => (
          <div
            className="research-step"
            style={{
              '--reveal-delay': `${index * 90 + 180}ms`,
              '--activity-delay': `${index * 1.15 + 1.1}s`,
            } as React.CSSProperties}
            key={name}
          >
            <div><span>{number}</span><i><b />READY</i></div>
            <strong>{name}</strong>
            <small>{task}</small>
          </div>
        ))}
      </div>
      <div className="research-output">
        <div><span>FINAL BRIEF</span><strong>8 citation-grounded findings</strong></div>
        <div className="output-bars"><i /><i /><i /><i /></div>
        <span>SCHEMA VALID</span>
      </div>
    </div>
  )
}

function CalendarVisual() {
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI']
  return (
    <div className="project-visual calendar-visual" aria-hidden="true">
      <div className="visual-topline"><span>CAL² / THIS WEEK</span><span className="visual-status">● SYNCED</span></div>
      <div className="calendar-shell">
        <div className="calendar-times"><span>9</span><span>11</span><span>1</span><span>3</span></div>
        {days.map((day, index) => (
          <div className="calendar-day" key={day}><strong>{day}</strong>{index === 0 && <i className="cal-event event-blue">DATA 100</i>}{index === 2 && <i className="cal-event event-green">LAB</i>}{index === 4 && <i className="cal-event event-purple">SYNC 3 PM</i>}</div>
        ))}
      </div>
      <div className="calendar-activity">
        <div className="email-stage">
          <div className="email-card email-arrival">
            <div className="email-icon">@</div>
            <div><span>NEW EMAIL</span><strong>Project sync details received</strong></div>
          </div>
          <div className="email-card email-detected">
            <div className="email-icon">✓</div>
            <div><span>EMAIL DETECTED</span><strong>Project sync · Friday 3 PM</strong></div>
          </div>
        </div>
        <i className="activity-arrow">→</i>
        <div className="created-toast"><span>✓</span><div><strong>Event created</strong><small>Google Calendar</small></div></div>
      </div>
    </div>
  )
}

const visualizations = [TicketVisual, ResearchVisual, CalendarVisual]

function ProjectStory({ project, index }: { project: Project; index: number }) {
  const Visual = visualizations[index]
  return (
    <article className={`project-story reveal project-${index + 1}`}>
      <div className="project-copy">
        <div className="project-index"><span>{project.num}</span><i /><span>{project.eyebrow}</span></div>
        <h3>{project.headline}</h3>
        <p>{project.description}</p>
        <div className="project-signals">
          {project.signals.map(signal => <div key={signal.label}><strong>{signal.value}</strong><span>{signal.label}</span></div>)}
        </div>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">
          View {project.title} on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <Visual />
    </article>
  )
}

export default function Work() {
  return (
    <section className="work-section" id="projects">
      <div className="page-shell">
        <header className="section-head reveal">
          <div><span className="eyebrow">PROJECTS</span></div>
          <h2>Selected projects.</h2>
          <p>A closer look at the products, system architecture, and technical decisions behind each project.</p>
        </header>
        <div className="project-list">
          {PROJECTS.map((project, index) => <ProjectStory project={project} index={index} key={project.title} />)}
        </div>
      </div>
    </section>
  )
}
