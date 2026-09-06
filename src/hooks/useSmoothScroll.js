import { useEffect } from 'react'
import Lenis from 'lenis'

// The real Lenis library — the exact smooth-scroll engine the live
// Matchioo site itself uses — rather than a hand-rolled approximation.
export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.35,
      touchMultiplier: 1.6,
    })
    // exposed globally to match the real site / matchioo-clean.html, where
    // window.lenis is used by e.g. anchor-link scroll handlers
    window.lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      if (window.lenis === lenis) window.lenis = undefined
    }
  }, [])
}
