import { SKILLS } from '../data/portfolio'

export default function About() {
  return (
    <section className="about-section" id="skills">
      <div className="page-shell">
        <header className="skills-heading reveal">
          <span className="eyebrow">SKILLS</span>
          <h2>Technical skills.</h2>
          <p>Languages, frameworks, and tools I use across software engineering, machine learning, and research.</p>
        </header>

        <div className="toolbox reveal">
          <div className="toolbox-head"><span>SKILLS</span><span>SELECTED TOOLS / {Object.values(SKILLS).flat().length}</span></div>
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
