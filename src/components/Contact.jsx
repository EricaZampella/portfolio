import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

/* ─── Real brand SVG icons ───────────────────────────────────── */
function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

const LINKS = [
  {
    Icon:  EmailIcon,
    label: 'Email',
    value: 'erizampa@gmail.com',
    href:  'mailto:erizampa@gmail.com',
  },
  {
    Icon:  LinkedInIcon,
    label: 'LinkedIn',
    value: 'Erica Zampella',
    href:  'https://www.linkedin.com/in/erica-zampella-83267739b/',
  },
  {
    Icon:  GitHubIcon,
    label: 'GitHub',
    value: 'EricaZampella',
    href:  'https://github.com/EricaZampella?tab=repositories',
  },
]

export default function Contact() {
  const { t }      = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      })

      gsap.from('.contact-intro', {
        scrollTrigger: { trigger: '.contact-intro', start: 'top 85%' },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      })

      gsap.to('.contact-link', {
        scrollTrigger: { trigger: '.contact-links', start: 'top 85%' },
        opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
      })

      gsap.from('.footer-bar', {
        scrollTrigger: { trigger: '.footer-bar', start: 'top 95%' },
        opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header contact-section-header">
          <span className="section-tag">{t.contact.tag}</span>
          <h2>{t.contact.title}</h2>
        </div>

        <div className="contact-wrapper">
          <p className="contact-intro">{t.contact.intro}</p>

          <nav className="contact-links" aria-label="Contact links">
            {LINKS.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="contact-link"
                aria-label={`${label}: ${value}`}
              >
                <div className="contact-link-icon">
                  <Icon />
                </div>
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
            © 2025 <span>Erica Zampella</span> — {t.contact.footerBuilt}
          </p>
          <p className="footer-copy" style={{ color: 'var(--text-muted)' }}>
            {t.contact.footerDeployed}
          </p>
        </div>
      </div>
    </section>
  )
}
