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
  return (
    <div className="project-visual research-visual" aria-hidden="true">
      <div className="visual-grid" />
      <div className="visual-topline"><span>RESEARCH / RUN_028</span><span className="visual-status amber">● SYNTHESIZING</span></div>
      <div className="query-card"><span>QUERY</span><p>How do multi-agent systems improve scientific discovery?</p></div>
      <div className="agent-network">
        <div className="agent-node agent-center"><span>ORCHESTRATOR</span><strong>01</strong></div>
        <div className="agent-node agent-search"><span>SEARCH</span><strong>02</strong></div>
        <div className="agent-node agent-read"><span>ANALYZE</span><strong>03</strong></div>
        <div className="agent-node agent-check"><span>VERIFY</span><strong>04</strong></div>
        <div className="network-line line-a"><i /></div>
        <div className="network-line line-b"><i /></div>
        <div className="network-line line-c"><i /></div>
      </div>
      <div className="source-stack"><span>SOURCES</span><i /><i /><i /><strong>24</strong></div>
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
          <div className="calendar-day" key={day}><strong>{day}</strong>{index === 0 && <i className="cal-event event-blue">DATA 100</i>}{index === 2 && <i className="cal-event event-green">LAB</i>}{index === 4 && <i className="cal-event event-purple">DEMO</i>}</div>
        ))}
      </div>
      <div className="email-card">
        <div className="email-icon">@</div>
        <div><span>NEW EMAIL DETECTED</span><strong>Project sync · Friday 3 PM</strong></div>
        <i>→</i>
      </div>
      <div className="created-toast"><span>✓</span><div><strong>Event created</strong><small>Google Calendar</small></div></div>
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
          <div><span className="eyebrow">SELECTED SYSTEMS</span><span className="section-count">/ 03</span></div>
          <h2>Projects, explained<br />by how they move.</h2>
          <p>Not just repository cards. These are small windows into the products, pipelines, and decisions behind the code.</p>
        </header>
        <div className="project-list">
          {PROJECTS.map((project, index) => <ProjectStory project={project} index={index} key={project.title} />)}
        </div>
      </div>
    </section>
  )
}
