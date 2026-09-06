import { useEffect, useRef } from 'react'

// The four reviews of the real site's Testimonials component, copied
// verbatim (names, ratings, text and avatars).
const REVIEWS = [
  {
    name: 'Aanya Menon',
    rating: '5.0',
    text: 'Absolutely loved this place! The matcha was smooth, creamy, and had such a rich flavor',
    avatar: 'https://framerusercontent.com/images/A7OKbQYHveT8SuIkaY7NOXUH9jI.jpg?scale-down-to=512&width=5054&height=3374',
  },
  {
    name: 'Alexander',
    rating: '4.5',
    text: 'Owner was super sweet checked on everyone waiting for their drinks & in line waiting to order.',
    avatar: 'https://framerusercontent.com/images/MFFsc4Fv2i909jbDtP9LkabMuXM.jpg?scale-down-to=512&width=588&height=883',
  },
  {
    name: 'Riya Sharma',
    rating: '4.8',
    text: 'One of the best matcha drinks I’ve had! Not overly sweet, and you can really taste the quality.',
    avatar: 'https://framerusercontent.com/images/vvVkbgp1lGrrPKQZ0tOebNsxrYU.jpg?scale-down-to=512&width=6000&height=3596',
  },
  {
    name: 'Arjun Nair',
    rating: '4.5',
    text: 'Finally found a matcha shop that gets it right! Rich, fresh, and not drowned in sugar',
    avatar: 'https://framerusercontent.com/images/oHBNPMrbSsz8xfDjq1XlFcBV8tM.jpg?scale-down-to=512&width=735&height=655',
  },
]

// the real card's own star glyph
function Star() {
  return (
    <svg viewBox="0 0 17.123 16.353" aria-hidden="true">
      <path d="M 8.561 13.7 L 4.411 16.2 C 4.228 16.317 4.036 16.367 3.836 16.35 C 3.636 16.333 3.461 16.267 3.311 16.15 C 3.161 16.033 3.044 15.888 2.961 15.713 C 2.878 15.538 2.861 15.342 2.911 15.125 L 4.011 10.4 L 0.336 7.225 C 0.169 7.075 0.065 6.904 0.024 6.712 C -0.017 6.52 -0.005 6.333 0.061 6.15 C 0.127 5.967 0.227 5.817 0.361 5.7 C 0.495 5.583 0.678 5.508 0.911 5.475 L 5.761 5.05 L 7.636 0.6 C 7.719 0.4 7.849 0.25 8.024 0.15 C 8.199 0.05 8.378 0 8.561 0 C 8.744 0 8.923 0.05 9.098 0.15 C 9.273 0.25 9.403 0.4 9.486 0.6 L 11.361 5.05 L 16.211 5.475 C 16.444 5.508 16.628 5.583 16.761 5.7 C 16.894 5.817 16.994 5.967 17.061 6.15 C 17.128 6.333 17.14 6.521 17.099 6.713 C 17.058 6.905 16.953 7.076 16.786 7.225 L 13.111 10.4 L 14.211 15.125 C 14.261 15.342 14.244 15.538 14.161 15.713 C 14.078 15.888 13.961 16.034 13.811 16.15 C 13.661 16.266 13.486 16.333 13.286 16.35 C 13.086 16.367 12.894 16.317 12.711 16.2 Z" />
    </svg>
  )
}

// The word "review" is scattered behind the cards as six huge Boldonse
// letters, each with the real site's own rotation, plus two blue quote
// marks and the two rotated hashtags. Positions are the measured element
// centres as a percentage of the panel.
function Letters() {
  return (
    <div className="rv-letters" aria-hidden="true">
      <span className="rv-l rv-l-r">r</span>
      <span className="rv-q rv-q1">&rdquo;</span>
      <span className="rv-l rv-l-e1">e</span>
      <span className="rv-l rv-l-v">v</span>
      <span className="rv-tag rv-tag-review">#review</span>
      <span className="rv-l rv-l-i">i</span>
      <span className="rv-tag rv-tag-testi">#testimonial</span>
      <span className="rv-l rv-l-e2">e</span>
      <span className="rv-l rv-l-w">w</span>
      <span className="rv-q rv-q2">&rdquo;</span>
    </div>
  )
}

export default function Testimonial() {
  const stackRef = useRef(null)

  // the real component steps through its four variants 700ms apart once
  // the panel is in view, so the cards land one after another — each one
  // springing up from opacity 0 / translateY(40px) / scale(.3)
  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    const cards = Array.from(stack.querySelectorAll('.rv-card'))
    const timers = []

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              timers.push(setTimeout(() => card.classList.add('in'), i * 700))
            })
            observer.disconnect()
          }
        })
      },
      { threshold: 0.25 }
    )

    observer.observe(stack)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [])

  return (
    <section className="section reviews" id="reviews">
      <Letters />

      <div ref={stackRef} className="rv-stack">
        {REVIEWS.map((r) => (
          <article className="rv-card" key={r.name}>
            <div className="rv-body">
              <div className="rv-top">
                <span className="rv-rating">{r.rating} <Star /></span>
                <p className="rv-name">{r.name}</p>
              </div>
              <p className="rv-text">{r.text}</p>
            </div>
            <div className="rv-avatar">
              <img src={r.avatar} alt={r.name} loading="lazy" />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
