import { SKILLS } from '../data/portfolio'

const PRINCIPLES = [
  ['01', 'Make it legible', 'Complex systems should still be easy to reason about.'],
  ['02', 'Build for failure', 'Edge cases, observability, and safety belong in the first draft.'],
  ['03', 'Measure the real thing', 'Benchmarks matter when they reflect actual users and constraints.'],
]

export default function About() {
  return (
    <section className="about-section" id="skills">
      <div className="page-shell">
        <div className="about-layout">
          <div className="about-statement reveal">
            <span className="eyebrow">HOW I WORK</span>
            <h2>Curious enough to explore.<br /><em>Rigorous enough to ship.</em></h2>
            <p>I’m a UC Berkeley Data Science student working across AI, software engineering, and scientific research. I like projects where the model is only one piece of the puzzle — and the surrounding system has to be fast, safe, clear, and useful.</p>
          </div>

          <div className="principles reveal">
            {PRINCIPLES.map(([number, title, copy]) => (
              <div className="principle" key={number}>
                <span>{number}</span><div><strong>{title}</strong><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </div>

        <div className="toolbox reveal">
          <div className="toolbox-head"><span>CAPABILITY INDEX</span><span>SELECTED TOOLS / {Object.values(SKILLS).flat().length}</span></div>
          <div className="toolbox-grid">
            {Object.entries(SKILLS).map(([category, skills], index) => (
              <div className="tool-group" key={category}>
                <span>0{index + 1} / {category}</span>
                <div>{skills.map(skill => <strong key={skill}>{skill}</strong>)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
