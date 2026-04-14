import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  {
    icon: '🗄️',
    name: 'SQL',
    desc: 'Advanced querying, stored procedures, window functions, CTEs, data warehouse design and ETL pipelines.',
    tags: ['MySQL', 'CTEs', 'Stored Procs', 'Window Fns'],
  },
  {
    icon: '🐍',
    name: 'Python',
    desc: 'Data wrangling, statistical analysis, machine learning pipelines and interactive visualizations.',
    tags: ['pandas', 'sklearn', 'jupyter'],
  },
  {
    icon: '📊',
    name: 'Excel',
    desc: 'PivotTables, dynamic dashboards, data modelling and advanced formula engineering.',
    tags: ['PivotTables', 'Power Query'],
  },
  {
    icon: '🐼',
    name: 'pandas',
    desc: 'DataFrame manipulation, group-by aggregations, merge/join strategies and time-series indexing.',
    tags: ['DataFrames', 'GroupBy'],
  },
  {
    icon: '📈',
    name: 'matplotlib',
    desc: 'Custom publication-quality charts: line, bar, scatter, histograms with full style control.',
    tags: ['Subplots', 'Custom Styles'],
  },
  {
    icon: '🎨',
    name: 'seaborn',
    desc: 'Statistical visualization: heatmaps, pair plots, distribution plots and categorical analysis.',
    tags: ['Heatmaps', 'Pair Plots'],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-section-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.to('.skill-cell', {
        scrollTrigger: {
          trigger: '.skills-bento',
          start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: {
          each: 0.08,
          from: 'start',
        },
        ease: 'back.out(1.4)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="container">
        <div className="section-header skills-section-header">
          <span className="section-tag">02. skills</span>
          <h2>Tech Stack</h2>
        </div>

        <div className="skills-bento" role="list">
          {SKILLS.map(({ icon, name, desc, tags }) => (
            <div className="skill-cell" key={name} role="listitem">
              <div className="skill-icon" aria-hidden="true">{icon}</div>
              <div className="skill-name">{name}</div>
              <div className="skill-desc">{desc}</div>
              <div className="skill-tag-row" aria-label={`${name} subtopics`}>
                {tags.map(t => (
                  <span className="skill-tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
