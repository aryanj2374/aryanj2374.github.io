import { useState } from 'react'
import { PERSONAL_INFO } from '../data/portfolio'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_INFO.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${PERSONAL_INFO.email}`
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-orbit orbit-a" aria-hidden="true" />
      <div className="contact-orbit orbit-b" aria-hidden="true" />
      <div className="page-shell contact-inner reveal">
        <span className="eyebrow">CONTACT</span>
        <h2>Get in touch.</h2>
        <p>I’m open to software engineering roles, research collaborations, and conversations about my work.</p>
        <div className="contact-actions">
          <a className="contact-email" href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}<span>↗</span></a>
          <button className="copy-button" onClick={copyEmail}>{copied ? 'COPIED ✓' : 'COPY EMAIL'}</button>
        </div>
        <div className="contact-links">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          <span>Berkeley, California</span>
        </div>
      </div>
    </section>
  )
}
