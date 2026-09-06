import { useState } from 'react'

export default function Nav() {
  const [open, setOpen] = useState(false)

  // Home goes back to the very top (the cups), About lands on the big
  // paragraph with the moving words, and the rest scroll to their own
  // section — all through Lenis so it glides instead of jumping.
  const go = (hash) => (e) => {
    let y = null
    if (hash === '#hero') {
      y = 0
    } else {
      const el = document.querySelector(hash)
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      y = hash === '#about-section'
        // centre the paragraph + ticker in the window instead of pinning
        // its top edge under the nav
        ? Math.max(0, top - Math.max(0, (window.innerHeight - el.offsetHeight) / 2))
        : top - 20
    }
    e.preventDefault()
    setOpen(false)
    if (window.lenis) window.lenis.scrollTo(y, { duration: 1.1 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="nav-outer">
      <div className="nav-pill">
        <a className="brand" href="#hero" onClick={go('#hero')}>Matchioo</a>
        <nav
          className={`nav-links${open ? ' open' : ''}`}
          style={
            open
              ? {
                  position: 'absolute',
                  top: 60,
                  left: 16,
                  right: 16,
                  background: 'var(--cream)',
                  flexDirection: 'column',
                  padding: 18,
                  borderRadius: 20,
                  boxShadow: '0 14px 34px -16px rgba(23,23,23,.35)',
                }
              : undefined
          }
        >
          <a href="#reviews" onClick={go('#reviews')}>Community</a>
          <a href="#menu" onClick={go('#menu')}>Menu</a>
          <a href="#about-section" onClick={go('#about-section')}>About</a>
          <a href="#hero" onClick={go('#hero')}>Home</a>
        </nav>
        <button className="nav-toggle" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  )
}
