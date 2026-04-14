import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINKS = [
  {
    icon: '✉️',
    label: 'Email',
    value: 'erizampa@gmail.com',
    href: 'mailto:erizampa@gmail.com',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: 'Erica Zampella',
    href: 'https://www.linkedin.com/in/erica-zampella-83267739b/',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: 'EricaZampella',
    href: 'https://github.com/EricaZampella?tab=repositories',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.from('.contact-intro', {
        scrollTrigger: { trigger: '.contact-intro', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.to('.contact-link', {
        scrollTrigger: {
          trigger: '.contact-links',
          start: 'top 85%',
        },
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })

      gsap.from('.footer-bar', {
        scrollTrigger: { trigger: '.footer-bar', start: 'top 95%' },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header contact-section-header">
          <span className="section-tag">04. contact</span>
          <h2>Get in Touch</h2>
        </div>

        <div className="contact-wrapper">
          <p className="contact-intro">
            I'm <strong>open to new opportunities</strong> — whether it's a
            full-time role, freelance project, or just a chat about data.
            Feel free to reach out through any of the channels below.
          </p>

          <nav className="contact-links" aria-label="Contact links">
            {LINKS.map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="contact-link"
                aria-label={`${label}: ${value}`}
              >
                <div className="contact-link-icon" aria-hidden="true">{icon}</div>
                <div className="contact-link-info">
                  <div className="contact-link-label">{label}</div>
                  <div className="contact-link-value">{value}</div>
                </div>
                <span className="contact-link-arrow" aria-hidden="true">→</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-bar">
          <p className="footer-copy">
            © 2025 <span>Erica Zampella</span> — Built with React + GSAP
          </p>
          <p className="footer-copy" style={{ color: 'var(--text-muted)' }}>
            Deployed on Vercel
          </p>
        </div>
      </div>
    </section>
  )
}
