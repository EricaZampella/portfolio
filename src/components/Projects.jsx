import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

/* ─── SVG Icons ──────────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

/* ─── Static project data (non-translatable) ─────────────────── */
const PROJECT_STATIC = [
  {
    icon:   '🛒',
    rows:   '1,500,000+',
    tech:   ['Python', 'SQL', 'Pandas', 'Sklearn', 'Matplotlib', 'Seaborn', 'SqlAlchemy'],
    github: 'https://github.com/EricaZampella/portfolio_ecommerce',
  },
  {
    icon:   '🏗️',
    rows:   '3 sources',
    tech:   ['MySQL', 'SQL', 'Stored Procedures', 'Window Functions', 'CTEs'],
    github: 'https://github.com/EricaZampella/proj_sql',
  },
]

/* ─── 3D tilt card ───────────────────────────────────────────── */
function ProjectCard({ project, tx }) {
  const cardRef = useRef(null)

  const onMove = e => {
    const rect = cardRef.current.getBoundingClientRect()
    const rx   = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -10
    const ry   = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  10
    gsap.to(cardRef.current, { rotateX: rx, rotateY: ry, transformPerspective: 900, duration: 0.3, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="project-header">
        <div className="project-icon" aria-hidden="true">{project.icon}</div>
        <div className="project-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
            aria-label="View on GitHub"
            title="View on GitHub"
          >
            <GithubIcon />
          </a>
        </div>
      </div>

      <div className="project-body">
        <div className="project-meta">
          <span className="highlight">{project.rows}</span>
          <span className="dot" />
          <span>{tx.type}</span>
        </div>

        <h3 className="project-title">{tx.title}</h3>
        <p className="project-desc">{tx.desc}</p>

        <ul className="project-highlights" aria-label="Key features">
          {[tx.h1, tx.h2, tx.h3, tx.h4].map(h => (
            <li className="highlight-item" key={h}>{h}</li>
          ))}
        </ul>

        <div className="project-tech" aria-label="Technologies used">
          {project.tech.map(t => (
            <span className="tech-tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ─── Section ────────────────────────────────────────────────── */
export default function Projects() {
  const { t }      = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      })

      gsap.to('.project-card', {
        scrollTrigger: { trigger: '.projects-grid', start: 'top 82%' },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const TX = [t.projects.p1, t.projects.p2]

  return (
    <section id="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header projects-section-header">
          <span className="section-tag">{t.projects.tag}</span>
          <h2>{t.projects.title}</h2>
        </div>

        <div className="projects-grid">
          {PROJECT_STATIC.map((p, i) => (
            <ProjectCard key={p.github} project={p} tx={TX[i]} />
          ))}
        </div>
      </div>
    </section>
  )
}
