import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { number: '1.5M+', key: 'stat1' },
  { number: '2',     key: 'stat2' },
  { number: '4+',    key: 'stat3' },
]

export default function About() {
  const { t }      = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-section-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      })

      gsap.from('.about-bio p', {
        scrollTrigger: { trigger: '.about-bio', start: 'top 80%' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
      })

      gsap.from('.stat-card', {
        scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)',
      })

      /* Animated counters */
      sectionRef.current.querySelectorAll('.stat-number[data-target]').forEach(el => {
        const raw    = el.dataset.target
        const isM    = raw.endsWith('M+')
        const isPlus = raw.endsWith('+') && !isM
        const num    = parseFloat(raw)

        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: num,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate() {
                const v = this.targets()[0].val
                if (isM)         el.textContent = v.toFixed(1) + 'M+'
                else if (isPlus) el.textContent = Math.round(v) + '+'
                else             el.textContent = Math.round(v)
              },
            })
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header about-section-header">
          <span className="section-tag">{t.about.tag}</span>
          <h2>{t.about.title}</h2>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            <p>{t.about.p1}</p>
            <p dangerouslySetInnerHTML={{ __html:
              t.about.p2
                .replace('SQL',    '<strong>SQL</strong>')
                .replace('Python', '<strong>Python</strong>')
            }} />
            <p>{t.about.p3}</p>
          </div>

          <div className="about-stats">
            {STATS.map(({ number, key }) => (
              <div className="stat-card" key={key}>
                <span className="stat-number" data-target={number}>{number}</span>
                <span className="stat-label">{t.about[key]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
