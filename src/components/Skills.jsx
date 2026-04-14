import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

/* PascalCase display names + static tags (not translatable) */
const SKILL_META = [
  { key: 'sql',        icon: '🗄️', name: 'SQL',         tags: ['MySQL', 'CTEs', 'Stored Procs', 'Window Fns'] },
  { key: 'python',     icon: '🐍', name: 'Python',       tags: ['Pandas', 'Sklearn', 'Jupyter'] },
  { key: 'excel',      icon: '📊', name: 'Excel',        tags: ['PivotTables', 'Power Query'] },
  { key: 'pandas',     icon: '🐼', name: 'Pandas',       tags: ['DataFrames', 'GroupBy'] },
  { key: 'matplotlib', icon: '📈', name: 'Matplotlib',   tags: ['Subplots', 'Custom Styles'] },
  { key: 'seaborn',    icon: '🎨', name: 'Seaborn',      tags: ['Heatmaps', 'Pair Plots'] },
]

export default function Skills() {
  const { t }      = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      })

      gsap.to('.skill-cell', {
        scrollTrigger: { trigger: '.skills-bento', start: 'top 80%' },
        y: 0, opacity: 1,
        duration: 0.65,
        stagger: { each: 0.08, from: 'start' },
        ease: 'back.out(1.4)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header skills-section-header">
          <span className="section-tag">{t.skills.tag}</span>
          <h2>{t.skills.title}</h2>
        </div>

        <div className="skills-bento" role="list">
          {SKILL_META.map(({ key, icon, name, tags }) => (
            <div className="skill-cell" key={key} role="listitem">
              <div className="skill-icon" aria-hidden="true">{icon}</div>
              <div className="skill-name">{name}</div>
              <div className="skill-desc">{t.skills[key].desc}</div>
              <div className="skill-tag-row" aria-label={`${name} subtopics`}>
                {tags.map(tag => (
                  <span className="skill-tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
