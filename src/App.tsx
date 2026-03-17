import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Global scroll reveal
  useEffect(() => {
    let observer: IntersectionObserver

    const setup = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    }

    const raf = requestAnimationFrame(setup)
    return () => {
      cancelAnimationFrame(raf)
      observer?.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
