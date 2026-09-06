import { useEffect } from 'react'
import Lenis from 'lenis'

// The real Lenis library — the exact smooth-scroll engine the live
// Matchioo site itself uses — rather than a hand-rolled approximation.
export function useSmoothScroll() {
  useEffect(() => {
    // Smooth scroll is a mouse-wheel nicety. On a touch screen the browser's
    // own scrolling is already frame-perfect, and Lenis only puts a rAF loop
    // between the finger and the pixels — which reads as lag. So it is simply
    // never started there, nor when the visitor asked for reduced motion.
    const coarse = window.matchMedia('(hover: none), (pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarse || reduced) return

    const lenis = new Lenis({
      duration: 0.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.35,
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
