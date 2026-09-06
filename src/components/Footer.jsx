import { useEffect, useRef } from 'react'

// the real footer's four social links, with the site's own icon paths
const SOCIAL = [
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    svg: (
      <svg width="30" height="21" viewBox="0 0 30 21" aria-hidden="true">
        <path d="M 12 15 L 19.785 10.5 L 12 6 Z M 29.34 3.255 C 29.535 3.96 29.67 4.905 29.76 6.105 C 29.865 7.305 29.91 8.34 29.91 9.24 L 30 10.5 C 30 13.785 29.76 16.2 29.34 17.745 C 28.965 19.095 28.095 19.965 26.745 20.34 C 26.04 20.535 24.75 20.67 22.77 20.76 C 20.82 20.865 19.035 20.91 17.385 20.91 L 15 21 C 8.715 21 4.8 20.76 3.255 20.34 C 1.905 19.965 1.035 19.095 0.66 17.745 C 0.465 17.04 0.33 16.095 0.24 14.895 C 0.135 13.695 0.09 12.66 0.09 11.76 L 0 10.5 C 0 7.215 0.24 4.8 0.66 3.255 C 1.035 1.905 1.905 1.035 3.255 0.66 C 3.96 0.465 5.25 0.33 7.23 0.24 C 9.18 0.135 10.965 0.09 12.615 0.09 L 15 0 C 21.285 0 25.2 0.24 26.745 0.66 C 28.095 1.035 28.965 1.905 29.34 3.255" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sumoud-salamin-20aaa82b2',

    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <path d="M 23.111 0 C 24.707 0 26 1.293 26 2.889 L 26 23.111 C 26 24.707 24.707 26 23.111 26 L 2.889 26 C 1.293 26 0 24.707 0 23.111 L 0 2.889 C 0 1.293 1.293 0 2.889 0 Z M 22.389 22.389 L 22.389 14.733 C 22.389 12.133 20.281 10.024 17.68 10.024 C 16.452 10.024 15.022 10.776 14.329 11.902 L 14.329 10.299 L 10.299 10.299 L 10.299 22.389 L 14.329 22.389 L 14.329 15.268 C 14.329 14.156 15.224 13.246 16.337 13.246 C 17.454 13.246 18.359 14.151 18.359 15.268 L 18.359 22.389 Z M 5.604 8.031 C 6.945 8.031 8.031 6.945 8.031 5.604 C 8.031 4.261 6.948 3.163 5.604 3.163 C 4.256 3.163 3.163 4.256 3.163 5.604 C 3.163 6.948 4.261 8.031 5.604 8.031 M 7.612 22.389 L 7.612 10.299 L 3.611 10.299 L 3.611 22.389 Z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/',
    svg: (
      <svg width="26" height="30" viewBox="0 0 25.75 29.56" aria-hidden="true">
        <path d="M 20.429 4.631 C 20.429 4.631 21.267 5.452 20.429 4.631 C 19.307 3.349 18.689 1.704 18.689 0 L 13.614 0 L 13.614 20.364 C 13.535 22.655 11.653 24.471 9.361 24.469 C 7.029 24.469 5.091 22.564 5.091 20.2 C 5.091 17.375 7.817 15.256 10.625 16.127 L 10.625 10.937 C 4.96 10.182 0 14.583 0 20.2 C 0 25.668 4.533 29.56 9.344 29.56 C 14.501 29.56 18.689 25.373 18.689 20.2 L 18.689 9.87 C 20.746 11.348 23.217 12.141 25.75 12.136 L 25.75 7.062 C 25.75 7.062 22.663 7.209 20.429 4.631" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/salaminsumoud/',
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <path d="M 7.54 0 L 18.46 0 C 22.62 0 26 3.38 26 7.54 L 26 18.46 C 26 22.624 22.624 26 18.46 26 L 7.54 26 C 3.38 26 0 22.62 0 18.46 L 0 7.54 C 0 3.376 3.376 0 7.54 0 M 7.28 2.6 C 4.695 2.6 2.6 4.695 2.6 7.28 L 2.6 18.72 C 2.6 21.307 4.693 23.4 7.28 23.4 L 18.72 23.4 C 21.305 23.4 23.4 21.305 23.4 18.72 L 23.4 7.28 C 23.4 4.693 21.307 2.6 18.72 2.6 Z M 19.825 4.55 C 20.722 4.55 21.45 5.278 21.45 6.175 C 21.45 7.072 20.722 7.8 19.825 7.8 C 18.928 7.8 18.2 7.072 18.2 6.175 C 18.2 5.278 18.928 4.55 19.825 4.55 M 13 6.5 C 16.59 6.5 19.5 9.41 19.5 13 C 19.5 16.59 16.59 19.5 13 19.5 C 9.41 19.5 6.5 16.59 6.5 13 C 6.5 9.41 9.41 6.5 13 6.5 M 13 9.1 C 10.846 9.1 9.1 10.846 9.1 13 C 9.1 15.154 10.846 16.9 13 16.9 C 15.154 16.9 16.9 15.154 16.9 13 C 16.9 10.846 15.154 9.1 13 9.1" />
      </svg>
    ),
  },
]

export default function Footer() {
  // The wordmark box is clipped; adding `in-view` slides the word up out of
  // it, the way the real footer does. Unlike every other reveal on the page
  // this one is NOT one-shot — the class comes off again as soon as the word
  // leaves the screen, so scrolling up and coming back down replays it every
  // single time.
  const wordmarkRef = useRef(null)

  useEffect(() => {
    const el = wordmarkRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => el.classList.toggle('in-view', e.isIntersecting))
      },
      { threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const backToTop = (e) => {
    e.preventDefault()
    if (window.lenis) window.lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      {/* logo + headline, both right-aligned like the real block */}
      <div className="ft-top">
        <a className="ft-logo" href="#hero">Matchioo</a>
        <h4 className="ft-tagline">Make every matcha moment feel special</h4>
      </div>

      <div className="ft-links">
        <div className="ft-info">
          <h4>Matchioo &nbsp;Matcha Cafe</h4>
          <a href="https://share.google/3pqChHP5fBm2tGRvy" target="_blank" rel="noopener noreferrer">
            Delivery across the West Bank, Jerusalem and inside
          </a>
          <div className="ft-contact">
            <h4>Contact</h4>
            <a href="mailto:hello@matchioo.com">hello@matchioo.com</a>
            <a href="tel:+972 593 604 96">+972 593 604 96</a>
          </div>
        </div>

        <nav className="ft-pages">
          <a href="#hero">Home</a>
          <a href="#about-section">About</a>
          <a href="#menu">Menu</a>
          <a href="#reviews">Community</a>
          <a href="#hero">404</a>
        </nav>
      </div>

      {/* the four icons sit edge to edge across the full footer width */}
      <div className="ft-social">
        {SOCIAL.map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
            {s.svg}
          </a>
        ))}
      </div>

      <div className="ft-rule"></div>

      <div className="ft-credit">
        <p>© 2026 Matchioo Matcha Cafe. All rights reserved.</p>
        <a href="#hero">Privacy Policy</a>
        <a href="#hero" onClick={backToTop}>Back to top</a>
      </div>

      <div ref={wordmarkRef} className="ft-wordmark">
        <span className="ft-word">Matchioo</span>
        <p className="ft-built">
          Built by <span className="ft-built-name">Sumoud Salamin</span>
        </p>
      </div>
    </footer>
  )
}
