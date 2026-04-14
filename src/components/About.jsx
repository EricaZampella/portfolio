import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { number: '1.5M+', label: 'Records Analyzed' },
  { number: '2',     label: 'Projects Completed' },
  { number: '4+',    label: 'Core Technologies' },
]

export default function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Section tag + heading */
      gsap.from('.about-section-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
      })

      /* Bio paragraphs stagger */
      gsap.from('.about-bio p', {
        scrollTrigger: {
          trigger: '.about-bio',
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
      })

      /* Stat cards stagger */
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.4)',
      })

      /* Animated counter */
      const counterEls = sectionRef.current.querySelectorAll('.stat-number[data-target]')
      counterEls.forEach(el => {
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
                if (isM)    el.textContent = v.toFixed(1) + 'M+'
                else if (isPlus) el.textContent = Math.round(v) + '+'
                else        el.textContent = Math.round(v)
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
          <span className="section-tag">01. about</span>
          <h2>About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-bio">
            <p>
              Passionate <strong>Data Analyst</strong> with hands-on experience
              transforming complex, multi-source datasets into clear, actionable
              business intelligence.
            </p>
            <p>
              I combine <strong>SQL</strong> and <strong>Python</strong> to handle
              every stage of the data pipeline — from raw data ingestion and cleaning
              to exploratory analysis, statistical modelling, and storytelling through
              visualization. My projects cover the full spectrum: building a structured
              data warehouse by integrating CRM and ERP sources, and performing
              deep e-commerce analytics on 1.5&nbsp;million+ transaction records
              using segmentation algorithms (RFM + K-Means).
            </p>
            <p>
              I enjoy finding the patterns hidden in data and translating them
              into decisions that matter — whether that's spotting seasonal revenue
              trends, profiling high-value customer clusters, or optimising
              logistics accuracy.
            </p>
          </div>

          <div className="about-stats">
            {STATS.map(({ number, label }) => {
              const raw = parseFloat(number)
              return (
                <div className="stat-card" key={label}>
                  <span
                    className="stat-number"
                    data-target={number}
                  >
                    {number}
                  </span>
                  <span className="stat-label">{label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
