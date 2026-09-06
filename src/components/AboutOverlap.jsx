import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

// The three words of the real "Ticker Text" slot, in the order they actually
// appear on screen, each followed by its own hand-drawn green doodle — the
// exact SVG paths off the live site (a teacup, a verified badge and a
// sprout), all in the site's matcha green token #0e780c.
const GREEN = '#0e780c'

function IconCup() {
  return (
    <svg className="tick-ico" width="20" height="17" viewBox="0 0 20 16.364" aria-hidden="true">
      <g fill="transparent" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 0 6.364 C 0 11.886 2.727 16.364 8.182 16.364 C 13.636 16.364 16.364 11.886 16.364 6.364 Z" />
        <path d="M 8.182 3.636 L 8.182 0 M 12.727 3.636 L 12.727 1.818 M 3.636 3.636 L 3.636 1.818 M 15.541 11.192 C 15.991 10.018 16.256 8.699 16.337 7.296 C 16.494 7.28 16.655 7.273 16.818 7.273 C 18.575 7.273 20 8.189 20 9.318 C 20 10.448 18.575 11.364 16.818 11.364 C 16.364 11.364 15.932 11.302 15.541 11.192" />
      </g>
    </svg>
  )
}

function IconBadge() {
  return (
    <svg className="tick-ico" width="20" height="20" viewBox="0 0 19.982 19.984" aria-hidden="true">
      <path fill={GREEN} d="M 8.136 0.891 C 8.799 0.401 9.134 0.156 9.499 0.061 C 9.822 -0.02 10.16 -0.02 10.483 0.061 C 10.844 0.156 11.178 0.401 11.845 0.891 L 12.691 1.513 C 12.841 1.632 12.998 1.739 13.164 1.834 C 13.275 1.894 13.392 1.942 13.513 1.979 C 13.697 2.029 13.884 2.064 14.074 2.085 L 15.111 2.244 C 15.926 2.37 16.336 2.433 16.661 2.624 C 16.948 2.794 17.187 3.034 17.358 3.32 C 17.549 3.641 17.613 4.051 17.738 4.87 L 17.896 5.908 C 17.918 6.097 17.953 6.285 18.003 6.469 C 18.04 6.589 18.088 6.706 18.148 6.818 C 18.243 6.983 18.35 7.141 18.469 7.29 L 19.09 8.136 C 19.58 8.799 19.826 9.134 19.92 9.499 C 20.002 9.822 20.002 10.16 19.92 10.483 C 19.825 10.845 19.58 11.178 19.09 11.845 L 18.469 12.691 C 18.299 12.923 18.215 13.039 18.148 13.164 C 18.089 13.276 18.04 13.392 18.003 13.513 C 17.961 13.649 17.94 13.79 17.896 14.074 L 17.738 15.111 C 17.611 15.926 17.549 16.336 17.358 16.661 C 17.189 16.949 16.949 17.189 16.661 17.358 C 16.339 17.55 15.93 17.613 15.111 17.738 L 14.074 17.896 C 13.79 17.941 13.649 17.963 13.513 18.004 C 13.392 18.041 13.276 18.089 13.164 18.149 C 13.039 18.215 12.923 18.3 12.691 18.47 L 11.845 19.091 C 11.183 19.581 10.848 19.826 10.483 19.921 C 10.16 20.005 9.821 20.005 9.499 19.921 C 9.138 19.826 8.804 19.581 8.136 19.091 L 7.29 18.47 C 7.059 18.299 6.943 18.215 6.818 18.149 C 6.706 18.089 6.59 18.041 6.469 18.004 C 6.334 17.963 6.191 17.94 5.908 17.896 L 4.87 17.738 C 4.055 17.611 3.645 17.549 3.32 17.358 C 3.033 17.189 2.793 16.949 2.624 16.661 C 2.433 16.339 2.369 15.93 2.244 15.111 L 2.085 14.074 C 2.041 13.79 2.02 13.649 1.979 13.514 C 1.941 13.392 1.892 13.276 1.834 13.164 C 1.768 13.039 1.683 12.923 1.513 12.691 L 0.891 11.845 C 0.401 11.183 0.155 10.848 0.061 10.483 C -0.02 10.16 -0.02 9.822 0.061 9.499 C 0.156 9.138 0.401 8.804 0.891 8.136 L 1.513 7.29 C 1.683 7.059 1.766 6.943 1.834 6.818 C 1.893 6.707 1.941 6.591 1.979 6.47 C 2.02 6.334 2.041 6.191 2.085 5.908 L 2.244 4.87 C 2.37 4.055 2.433 3.645 2.624 3.32 C 2.794 3.033 3.033 2.793 3.32 2.624 C 3.641 2.433 4.051 2.369 4.87 2.244 L 5.908 2.085 C 6.191 2.041 6.333 2.02 6.469 1.979 C 6.589 1.942 6.706 1.893 6.818 1.834 C 6.983 1.739 7.141 1.632 7.29 1.513 Z M 14.799 7.654 C 14.945 7.476 15.013 7.246 14.987 7.017 C 14.961 6.788 14.844 6.579 14.661 6.438 C 14.28 6.139 13.73 6.199 13.421 6.573 L 9.284 11.648 L 7.071 9.948 C 6.696 9.642 6.144 9.691 5.829 10.059 C 5.679 10.234 5.607 10.463 5.628 10.692 C 5.649 10.922 5.762 11.133 5.941 11.278 L 8.841 13.54 C 9.223 13.85 9.783 13.794 10.095 13.415 L 14.795 7.64 Z" />
    </svg>
  )
}

function IconSprout() {
  return (
    <svg className="tick-ico" width="20" height="20" viewBox="0 0 20 19.954" aria-hidden="true">
      <g fill="transparent" stroke={GREEN} strokeWidth="4">
        <path d="M 3.5 18.454 C 5.583 17.558 7.546 17.075 9.388 17.005 C 11.229 16.934 13.599 17.25 16.5 17.954" strokeLinecap="round" strokeMiterlimit="10" />
        <path d="M 9.523 19.954 C 9.139 15.234 9.298 11.567 10 8.954" strokeLinecap="round" strokeMiterlimit="10" />
        <path d="M 10 9.542 C 10.795 6.533 12.195 4.738 14.2 4.159 C 16.205 3.579 18.138 3.844 20 4.956 C 20.009 7.402 18.948 9.194 16.815 10.331 C 14.682 11.469 12.41 11.206 10 9.542 Z M 9.896 9.011 C 10.313 5.417 9.478 2.887 7.391 1.418 C 5.304 -0.05 2.888 -0.378 0.142 0.434 C -0.337 3.749 0.396 6.256 2.342 7.954 C 4.288 9.652 6.806 10.004 9.896 9.011 Z" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

// the single repeating unit — 40px of padding on each side, exactly like the
// original "Ticker Text" slot
function TickGroup() {
  return (
    <div className="tick-group">
      <span className="tick-word">Ceremonial</span>
      <IconCup />
      <span className="tick-word">Authentic</span>
      <IconBadge />
      <span className="tick-word">Pure</span>
      <IconSprout />
    </div>
  )
}

export default function AboutOverlap() {
  const titleRef = useReveal()
  const tickerRef = useReveal()
  const trackRef = useRef(null)

  // The live component renders ONE group and animates it from translateX(0)
  // to translateX(H) at 60px/s, where H = groupWidth + groupWidth *
  // round(bandWidth / groupWidth) — Framer's own formula. Because the page is
  // RTL the group is pinned to the right edge and travels further right,
  // which is why most of the band is empty most of the time. Same maths here,
  // so the timing and the gaps match the original exactly.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const band = track.parentElement

    const setDur = () => {
      const g = track.scrollWidth
      const c = band ? band.clientWidth : 0
      if (!g || !c) return
      const dist = g + g * Math.round(c / g)
      track.style.setProperty('--tick-dist', dist.toFixed(1) + 'px')
      track.style.setProperty('--tick-dur', (dist / 60).toFixed(2) + 's')
    }
    setDur()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setDur)

    let rt
    const onResize = () => { clearTimeout(rt); rt = setTimeout(setDur, 250) }
    window.addEventListener('resize', onResize, { passive: true })
    return () => { clearTimeout(rt); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section className="about-overlap" id="about-section">
      <div className="wrap">

        <h2 ref={titleRef} className="about-overlap-title reveal">
          <span className="aot-line">
            we believe <span>matcha</span> is more than a drink — it's a
          </span>
          <span className="aot-line">
            ritual. From sourcing ceremonial-grade leaves
          </span>
          <span className="aot-line">
            to perfecting each blend for your life on the
          </span>
          <span className="aot-line">
            move.
          </span>
        </h2>

        <div ref={tickerRef} className="chip-ticker reveal" style={{ transitionDelay: '.15s' }}>
          <div ref={trackRef} className="chip-ticker-track">
            <TickGroup />
          </div>
        </div>

      </div>
    </section>
  )
}
