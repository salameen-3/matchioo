import { useEffect } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import AboutOverlap from './components/AboutOverlap.jsx'
import Signature from './components/Signature.jsx'
import Menu from './components/Menu.jsx'
import Testimonial from './components/Testimonial.jsx'
import Team from './components/Team.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  // lightweight buttery-wheel-scroll feel, matching the real site's Lenis
  useSmoothScroll()

  // ===== hero -> about hand-off =====
  // 1:1 with the real page, which does this with two viewport triggers and no
  // scroll listener at all:
  //   * the cups component (photo + both cursive lines + the two little
  //     bursts — one node) swaps to "desktop Variant 2", bottom:-127px ->
  //     bottom:-694px, i.e. dragged 567px straight down, as soon as the About
  //     paragraph is 50% on screen, and swaps back on the way up.
  //   * the spinning blue circle carries a scroll-target style transform
  //     ({opacity:0, scale:.5, y:40}) that fires once the About Section is
  //     FULLY on screen — so it vanishes right where it stands, without being
  //     dragged anywhere.
  // Both are class toggles; the motion itself is pure CSS on the compositor,
  // so scrolling never has to wait on JS.
  useEffect(() => {
    const hero = document.getElementById('hero')
    const about = document.querySelector('.about-overlap')
    const hands = hero?.querySelector('.hero-hands')
    const badge = hero?.querySelector('.spin-badge')
    if (!hero || !about || !hands) return

    const drag = new IntersectionObserver((entries) => {
      entries.forEach((e) => hands.classList.toggle('dragged', e.isIntersecting))
    }, { threshold: 0.5 })
    drag.observe(about)

    // the moment the pin releases, retire whatever is still inside the hero,
    // so nothing sails back up the screen behind the next section
    let endObs = null
    const endMark = document.querySelector('.hero-pin-end')
    if (endMark) {
      endObs = new IntersectionObserver((entries) => {
        entries.forEach((e) =>
          hero.classList.toggle('done', e.isIntersecting || e.boundingClientRect.top < 0)
        )
      }, { threshold: 0 })
      endObs.observe(endMark)
    }

    let fade = null
    let rt
    // "fully visible" as a threshold: if the paragraph is taller than the
    // window (phones), 1.0 could never fire, so cap it at whatever fraction
    // of it can physically be on screen at once.
    const arm = () => {
      if (!badge) return
      if (fade) fade.disconnect()
      const h = about.offsetHeight || 1
      const t = Math.max(0.35, Math.min(0.999, (window.innerHeight - 8) / h))
      fade = new IntersectionObserver((entries) => {
        entries.forEach((e) => badge.classList.toggle('gone', e.isIntersecting))
      }, { threshold: t })
      fade.observe(about)
    }
    arm()

    const onResize = () => { clearTimeout(rt); rt = setTimeout(arm, 200) }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      clearTimeout(rt)
      window.removeEventListener('resize', onResize)
      drag.disconnect()
      endObs?.disconnect()
      fade?.disconnect()
    }
  }, [])

  return (
    <>
      <div className="site-bg" aria-hidden="true">
        <img src="https://framerusercontent.com/images/zdyVgV3mHbefUxxXrdbjdNBKg1I.jpeg?width=2752&height=1383" alt="" />
      </div>
      <Nav />
      {/* Wrapping Hero + AboutOverlap bounds the sticky hero's containing
          block to just this pair — without it, the containing block is
          <body> itself and the sticky hero stays pinned (and, per CSS
          stacking rules, paints on top of and intercepts clicks on) almost
          the entire rest of the page instead of releasing once the About
          overlap has scrolled past. */}
      <div className="hero-pin-wrap">
        <Hero />
        <AboutOverlap />
        <div className="hero-pin-end" aria-hidden="true" />
      </div>
      <Signature />
      <Menu />
      <Testimonial />
      <Team />
      <FAQ />
      <Footer />
    </>
  )
}
