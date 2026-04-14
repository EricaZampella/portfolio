import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/* ─── Canvas particle system ─────────────────────────────────── */
function initParticles(canvas) {
  const ctx  = canvas.getContext('2d')
  let W = canvas.width  = window.innerWidth
  let H = canvas.height = window.innerHeight
  let raf

  const COUNT = Math.min(Math.floor((W * H) / 14000), 80)
  const COLORS = ['#00d4ff', '#4f7cff', '#ffffff', '#00ff88']

  class P {
    constructor() { this.reset(true) }
    reset(initial) {
      this.x  = Math.random() * W
      this.y  = initial ? Math.random() * H : (Math.random() > 0.5 ? -6 : H + 6)
      this.vx = (Math.random() - 0.5) * 0.35
      this.vy = (Math.random() - 0.5) * 0.35
      this.r  = Math.random() * 2 + 0.8
      this.a  = Math.random() * 0.5 + 0.1
      this.c  = COLORS[Math.floor(Math.random() * COLORS.length)]
    }
    tick() {
      this.x += this.vx
      this.y += this.vy
      if (this.x < -10 || this.x > W + 10 || this.y < -10 || this.y > H + 10) this.reset(false)
    }
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      ctx.fillStyle = this.c
      ctx.globalAlpha = this.a
      ctx.fill()
    }
  }

  const particles = Array.from({ length: COUNT }, () => new P())

  function drawLines() {
    const MAX = 120
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x
        const dy   = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MAX) {
          const op = (1 - dist / MAX) * 0.25
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `rgba(0, 212, 255, ${op})`
          ctx.lineWidth   = 0.6
          ctx.globalAlpha = 1
          ctx.stroke()
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H)
    particles.forEach(p => { p.tick(); p.draw() })
    ctx.globalAlpha = 1
    drawLines()
    raf = requestAnimationFrame(loop)
  }

  function onResize() {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }

  window.addEventListener('resize', onResize)
  loop()

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', onResize)
  }
}

/* ─── Typing helper ──────────────────────────────────────────── */
function typeInto(el, text, delay, charDelay = 38) {
  return new Promise(resolve => {
    setTimeout(() => {
      let i = 0
      const id = setInterval(() => {
        el.textContent = text.slice(0, ++i)
        if (i >= text.length) { clearInterval(id); resolve() }
      }, charDelay)
    }, delay)
  })
}

/* ─── Component ──────────────────────────────────────────────── */
export default function Hero() {
  const canvasRef  = useRef(null)
  const termRef    = useRef(null)
  const heroRef    = useRef(null)
  const line1Ref   = useRef(null)
  const line2Ref   = useRef(null)
  const line3Ref   = useRef(null)
  const line4Ref   = useRef(null)
  const nameRef    = useRef(null)
  const subRef     = useRef(null)
  const ctaRef     = useRef(null)
  const scrollRef  = useRef(null)

  /* Canvas */
  useEffect(() => {
    const cleanup = initParticles(canvasRef.current)
    return cleanup
  }, [])

  /* GSAP timeline */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    /* 1. Terminal appears */
    tl.to(termRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    })

    /* 2. Typing lines — driven outside GSAP for letter-by-letter feel */
    tl.call(() => {
      const run = async () => {
        await typeInto(line1Ref.current, 'SELECT * FROM talent', 0)
        await typeInto(line2Ref.current, "WHERE analyst = 'Erica Zampella'", 60)
        await typeInto(line3Ref.current, 'ANALYZING 1,500,000+ records...', 140)
        await typeInto(line4Ref.current, '✓ Insights loaded successfully.', 200)
      }
      run()
    })

    /* 3. Hero main text after terminal finishes (~3.2s) */
    tl.to(heroRef.current, {
      opacity: 1,
      duration: 0.01,
    }, '+=0.05')

    /* Name lines clip reveal */
    tl.to('.hero-name .line span', {
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power4.out',
    }, '-=0.05')

    /* Subtitle */
    tl.to(subRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, '-=0.4')

    /* CTA */
    tl.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')

    /* Scroll indicator */
    tl.to(scrollRef.current, {
      opacity: 1,
      duration: 0.5,
    }, '-=0.2')

    return () => tl.kill()
  }, [])

  const handleScroll = e => {
    e.preventDefault()
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero">
      <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
      <div className="aurora aurora-1" aria-hidden="true" />
      <div className="aurora aurora-2" aria-hidden="true" />

      <div className="hero-content">
        {/* Terminal card */}
        <div ref={termRef} className="hero-terminal" role="presentation">
          <div className="terminal-bar">
            <span className="t-dot red"  />
            <span className="t-dot yellow" />
            <span className="t-dot green" />
            <span className="terminal-title">analyst.sql — query</span>
          </div>
          <div className="terminal-body">
            <div className="t-line">
              <span className="t-prompt">›</span>
              <span ref={line1Ref} className="t-text" />
            </div>
            <div className="t-line">
              <span className="t-prompt">›</span>
              <span ref={line2Ref} className="t-text cyan" />
            </div>
            <div className="t-line" style={{ marginTop: 12 }}>
              <span className="t-prompt">›</span>
              <span ref={line3Ref} className="t-text muted" />
            </div>
            <div className="t-line">
              <span className="t-prompt">›</span>
              <span ref={line4Ref} className="t-text green" />
            </div>
            <span className="t-cursor" aria-hidden="true" />
          </div>
        </div>

        {/* Main text */}
        <div ref={heroRef} className="hero-main">
          <p className="hero-eyebrow">Data Analyst</p>

          <h1 ref={nameRef} className="hero-name" aria-label="Erica Zampella">
            <span className="line"><span>ERICA</span></span>
            <span className="line"><span>ZAMPELLA</span></span>
          </h1>

          <p ref={subRef} className="hero-subtitle">
            Turning raw data into actionable insights — from&nbsp;SQL&nbsp;pipelines
            to Python-driven analytics and customer segmentation.
          </p>

          <div ref={ctaRef} className="hero-cta">
            <a
              href="#projects"
              className="btn-primary"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              <span>View Projects</span>
            </a>
            <a
              href="#contact"
              className="btn-secondary"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a ref={scrollRef} className="hero-scroll" href="#about" onClick={handleScroll} aria-label="Scroll to About section">
        <span>Scroll</span>
        <div className="scroll-line" />
      </a>
    </section>
  )
}
