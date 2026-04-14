import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const navRef             = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [active,   setActive]   = useState('')
  const { lang, setLang, t }    = useLanguage()

  /* Scroll + active section tracking */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['about', 'skills', 'projects', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= 100) setActive(id)
      }
      if (window.scrollY < 100) setActive('')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* GSAP entrance */
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const NAV_ITEMS = [
    { label: t.nav.about,    href: '#about' },
    { label: t.nav.skills,   href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
  ]

  return (
    <nav ref={navRef} className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo" onClick={e => scrollTo(e, '#hero')}>
          EZ<span>.analyst()</span>
        </a>

        <ul className="nav-links">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={active === href.slice(1) ? 'active' : ''}
                onClick={e => scrollTo(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="nav-cta"
              onClick={e => scrollTo(e, '#contact')}
            >
              {t.nav.contact}
            </a>
          </li>
        </ul>

        {/* ── Language switcher ── */}
        <div className="lang-switcher" role="group" aria-label="Language selector">
          <button
            className={`lang-btn${lang === 'en' ? ' active' : ''}`}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
            title="Switch to English"
          >
            <span className="flag">🇬🇧</span>
            <span>EN</span>
          </button>
          <button
            className={`lang-btn${lang === 'it' ? ' active' : ''}`}
            onClick={() => setLang('it')}
            aria-pressed={lang === 'it'}
            title="Passa all'italiano"
          >
            <span className="flag">🇮🇹</span>
            <span>IT</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
