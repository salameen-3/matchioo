import { useEffect, useRef } from 'react'

// Mirrors Framer's scroll-triggered "appear" effect: adds an `in-view`
// class the first time the element crosses into the viewport, then stops
// watching it. Works for both `.reveal` (single element) and
// `.reveal-stagger` (parent whose children fade in one after another via
// the CSS `:nth-child` delays in index.css).
export function useReveal(threshold = 0.15, rootMargin = '0px 0px -60px 0px') {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

// Hero title reveals on load (above the fold, not scroll-triggered).
export function useRevealOnMount(delay = 200) {
  const ref = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => {
      ref.current?.classList.add('in-view')
    }, delay)
    return () => clearTimeout(t)
  }, [delay])

  return ref
}
