import { useEffect, useRef, useState } from 'react'

// All 9 blends of the real site's "Popular Blends" CMS collection, in the
// exact source order — names, prices, ratings, cup photos and descriptions
// are copied verbatim from the live page.
const ITEMS = [
  {
    key: 'strawberry',
    name: 'Strawberry Matcha',
    cup: 'https://framerusercontent.com/images/lCknPwilfl1LmzUKM4KYPxzVI.png?width=1536&height=2752',
    price: '17.00',
    rating: '0',
    desc: 'Sweet, juicy strawberry meets creamy, earthy matcha — a refreshing pink-and-green delight that’s fruity, smooth, and totally irresistible.',
  },
  {
    key: 'blueberry',
    name: 'Blueberry Matcha',
    cup: 'https://framerusercontent.com/images/ydBKKok7sfKGlMREnafLi9UXRnQ.png?width=1536&height=2752',
    price: '22.00',
    rating: '4.7',
    desc: 'Sweet blueberry meets smooth, earthy matcha in this creamy, refreshing blend — fruity, vibrant, and irresistibly delicious.',
  },
  {
    key: 'chocolate',
    name: 'Chocolate Matcha',
    cup: 'https://framerusercontent.com/images/YxKdWcr230jAfDlHyjoeVtu0.png?width=1536&height=2752',
    price: '24.00',
    rating: '5',
    desc: 'Chocolatey indulgence meets earthy matcha — creamy, rich, and perfectly balanced for a deliciously smooth sip',
  },
  {
    key: 'einspanner',
    name: 'Matcha Einspanner',
    cup: 'https://framerusercontent.com/images/cMMTsx90wPjegvCXjmvZxUajSMs.png?width=1378&height=1850',
    price: '8.50',
    rating: '4.6',
    desc: 'A smooth, vibrant matcha topped with a rich layer of lightly sweetened cream. Earthy matcha meets velvety indulgence in this elegant Japanese-inspired treat.',
    page: 2,
  },
  {
    key: 'biscoff',
    name: 'Biscoff Butter Matcha Dream',
    cup: 'https://framerusercontent.com/images/Pia3ledQpt4YalyyqZ4d2AXtT0.png?width=1528&height=2573',
    price: '8.50',
    rating: '4.2',
    desc: 'A dreamy blend of vibrant matcha and rich Biscoff butter, finished with a hint of caramelised sweetness. Creamy, indulgent, and irresistibly comforting.',
    page: 2,
  },
  {
    key: 'ube',
    name: 'Ube Cloud Matcha',
    cup: 'https://framerusercontent.com/images/hpSxgPbB9Cr3HxwaJKGH0T03yo0.png?width=1372&height=1929',
    price: '8.50',
    rating: '4.4',
    desc: 'Vibrant matcha meets creamy, subtly sweet ube, topped with a soft cloud of velvety cream. Earthy, smooth, and delightfully dreamy.',
    page: 2,
  },
  {
    key: 'latte',
    name: 'Matcha Latte',
    cup: 'https://framerusercontent.com/images/oS6LvLFacT89F94vXCoR4ZD1w.png?width=1149&height=2455',
    price: '8.00',
    rating: '4.4',
    desc: 'A smooth, creamy blend of vibrant matcha and velvety milk. Earthy, balanced, and gently sweet, with a rich matcha finish in every sip.',
    page: 3,
  },
  {
    key: 'strawberry-latte',
    name: 'Strawberry Matcha Latte',
    cup: 'https://framerusercontent.com/images/Ees6ep3IUKM6RpflA9QF7IX8RPA.png?width=768&height=1376',
    price: '8.00',
    rating: '4.4',
    desc: 'A refreshing blend of earthy matcha, juicy strawberry, and creamy milk. Fruity, smooth, and lightly sweet with a vibrant matcha finish.',
    page: 3,
  },
  {
    key: 'oreo',
    name: 'Oreo Matcha Dream',
    cup: 'https://framerusercontent.com/images/56eEZq5Rk1xWm6y4g9itbO9E.png?width=768&height=1376',
    price: '8.50',
    rating: '4.6',
    desc: 'A creamy blend of earthy matcha, crushed Oreo, and smooth milk. Rich, velvety, and lightly sweet with a delicious cookies-and-cream finish.',
    page: 3,
  },
]

// the soft backdrop cloud and the sharp front cloud the cup stands in —
// both are the same two photos the real component reuses on every card
const BACK_CLOUD = 'https://framerusercontent.com/images/JgWLzBRRGzlGuGW5DfWDF83dCb8.png?width=1864&height=1536'
const FRONT_CLOUD = 'https://framerusercontent.com/images/CkYg79IUAFJc2xBaBXFxfDaKE.png?width=2752&height=1536'

// the real site's own star / wheat / almond glyphs, path data copied from
// the live page's inline SVGs
function Star() {
  return (
    <svg className="mcard-star" viewBox="0 0 14 13.3" aria-hidden="true">
      <path d="M 2.678 13.3 L 3.815 8.383 L 0 5.075 L 5.04 4.637 L 7 0 L 8.96 4.637 L 14 5.075 L 10.185 8.383 L 11.322 13.3 L 7 10.692 Z" />
    </svg>
  )
}

function DietIcons() {
  return (
    <div className="mcard-icons">
      <svg width="14" height="16.15" viewBox="0 0 14 16.154" aria-hidden="true">
        <path d="M 12.391 0 C 12.235 0 12.069 0.012 11.894 0.034 C 11.55 0.634 11.24 1.208 11.159 1.762 L 10.602 1.658 C 10.68 1.126 10.89 0.64 11.137 0.18 C 11.109 0.186 11.084 0.192 11.055 0.2 C 9.923 0.502 8.574 1.126 7.223 1.946 C 7.054 2.048 6.885 2.154 6.719 2.262 C 6.694 2.438 6.663 2.65 6.622 2.883 C 6.522 3.458 6.378 4.126 6.096 4.581 C 5.737 5.153 5.077 5.655 4.495 6.05 C 3.913 6.446 3.409 6.718 3.409 6.718 L 3.165 6.146 C 3.165 6.146 3.647 5.884 4.204 5.506 C 4.761 5.125 5.386 4.61 5.633 4.214 C 5.809 3.935 5.974 3.303 6.071 2.759 C 6.075 2.735 6.081 2.71 6.084 2.685 C 3.791 4.271 1.663 6.333 0.723 8.151 C 0.251 9.069 -0.01 10.221 0 11.358 C 0.431 10.432 0.908 9.493 1.699 8.61 L 2.096 9.062 C 1.144 10.125 0.678 11.301 0.109 12.502 C 0.293 13.497 0.716 14.401 1.41 15.037 C 1.536 15.154 1.675 15.263 1.826 15.362 C 1.88 15.143 1.959 14.846 2.059 14.525 C 2.261 13.872 2.524 13.12 2.911 12.654 C 3.381 12.092 4.032 11.898 4.617 11.7 C 5.202 11.506 5.718 11.312 6.031 10.902 C 6.322 10.514 6.591 9.627 6.75 8.858 C 6.91 8.091 6.982 7.438 6.982 7.438 L 7.539 7.516 C 7.539 7.516 7.467 8.197 7.298 9.002 C 7.132 9.807 6.894 10.736 6.456 11.312 C 6.012 11.901 5.364 12.113 4.776 12.311 C 4.188 12.509 3.653 12.696 3.324 13.091 C 3.068 13.399 2.78 14.112 2.589 14.733 C 2.473 15.111 2.389 15.44 2.339 15.648 C 2.78 15.856 3.281 16.001 3.803 16.082 C 4.085 15.574 4.323 15.298 4.745 13.367 L 5.289 13.522 C 4.926 15.171 4.67 15.719 4.432 16.146 C 5.565 16.202 6.728 15.959 7.561 15.45 C 9.917 13.995 11.884 10.503 12.995 7.194 C 13.208 6.562 13.386 5.937 13.536 5.333 C 12.976 5.874 12.51 6.463 12.25 7.208 L 11.725 6.975 C 12.132 5.817 12.92 5.019 13.758 4.309 C 13.868 3.723 13.943 3.172 13.978 2.674 C 13.993 2.434 14.003 2.205 13.999 1.992 C 13.796 2.121 13.565 2.271 13.32 2.44 C 12.557 2.971 11.697 3.688 11.356 4.274 C 11.196 4.546 11.168 4.941 11.146 5.401 C 11.124 5.863 11.115 6.386 10.846 6.848 C 10.602 7.272 10.223 7.491 9.891 7.685 C 9.56 7.879 9.272 8.056 9.109 8.3 C 8.787 8.78 8.459 9.747 8.236 10.574 C 8.011 11.396 7.88 12.085 7.88 12.085 L 7.329 11.951 C 7.329 11.951 7.467 11.238 7.698 10.387 C 7.927 9.536 8.24 8.547 8.659 7.918 C 8.925 7.519 9.303 7.314 9.632 7.124 C 9.957 6.93 10.229 6.753 10.376 6.502 C 10.533 6.227 10.564 5.828 10.583 5.369 C 10.605 4.91 10.617 4.384 10.886 3.925 L 10.886 3.921 C 11.34 3.151 12.235 2.449 13.026 1.899 C 13.374 1.658 13.696 1.453 13.956 1.295 C 13.946 1.225 13.934 1.158 13.921 1.094 C 13.84 0.685 13.702 0.428 13.546 0.305 C 13.317 0.125 12.979 0.023 12.554 0.004 C 12.501 0 12.448 0 12.391 0 Z M 8.856 2.08 L 9.4 2.239 C 9.4 2.239 9.272 2.798 9.066 3.462 C 8.856 4.129 8.584 4.896 8.211 5.383 C 7.564 6.241 6.653 6.686 5.787 7.113 C 4.92 7.54 4.097 7.957 3.543 8.66 L 3.543 8.663 C 3.112 9.214 2.646 10.334 2.314 11.294 C 1.978 12.258 1.764 13.067 1.764 13.067 L 1.225 12.883 C 1.225 12.883 1.445 12.053 1.788 11.065 C 2.132 10.076 2.583 8.932 3.124 8.243 C 3.781 7.396 4.695 6.961 5.561 6.531 C 6.428 6.103 7.245 5.687 7.786 4.973 C 8.042 4.631 8.333 3.889 8.534 3.25 C 8.734 2.614 8.856 2.08 8.856 2.08 M 5.174 8.685 L 5.73 8.776 C 5.643 9.461 5.361 9.97 5.005 10.337 C 4.648 10.701 4.222 10.941 3.819 11.167 L 3.569 10.602 C 3.969 10.372 4.344 10.153 4.626 9.864 C 4.908 9.578 5.105 9.235 5.174 8.685 M 10.814 8.942 L 11.328 9.197 C 11.328 9.197 11.027 9.973 10.589 10.881 C 10.151 11.792 9.591 12.837 8.994 13.434 C 8.568 13.861 7.899 14.197 7.317 14.454 C 6.735 14.716 6.247 14.882 6.247 14.882 L 6.084 14.274 C 6.084 14.274 6.553 14.115 7.11 13.865 C 7.667 13.618 8.318 13.264 8.618 12.961 C 9.097 12.484 9.666 11.464 10.095 10.581 C 10.52 9.694 10.814 8.942 10.814 8.942" />
      </svg>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <path d="M 8.917 0 C 8.174 0.008 7.421 0.108 6.671 0.309 C 1.871 1.595 -0.977 6.529 0.309 11.329 C 1.309 15.063 4.517 17.615 8.152 17.96 C 8.039 16.374 8.113 14.775 8.301 13.159 L 9.009 13.241 C 8.821 14.856 8.751 16.44 8.869 17.999 C 9.68 18.01 10.506 17.912 11.329 17.691 C 16.129 16.405 18.977 11.471 17.691 6.671 C 16.606 2.621 12.924 -0.04 8.917 0 Z M 9.537 0.78 C 10.084 1.917 10.33 2.963 10.301 3.772 L 9.214 5.053 L 8.295 3.562 C 8.407 2.778 8.83 1.815 9.537 0.78 Z M 6.834 3.234 C 7.08 3.384 7.32 3.544 7.553 3.714 L 7.552 3.715 L 8.837 5.799 L 8.722 7.283 L 7.104 5.569 C 6.931 4.914 6.833 4.123 6.834 3.234 Z M 11.902 3.617 C 11.775 4.459 11.572 5.198 11.318 5.806 L 9.437 7.276 L 9.555 5.753 L 11.004 4.045 C 11.282 3.895 11.581 3.752 11.902 3.617 Z M 6.312 6.213 C 6.541 6.296 6.767 6.388 6.989 6.486 L 8.647 8.242 L 8.526 9.806 L 7.108 9.008 C 6.69 8.404 6.389 7.467 6.312 6.213 Z M 12.137 6.65 C 11.885 7.791 11.476 8.632 11.001 9.174 L 9.238 9.849 L 9.363 8.238 L 11.058 6.914 C 11.391 6.814 11.751 6.725 12.137 6.65 Z M 6.068 9.562 C 6.331 9.588 6.581 9.622 6.82 9.663 L 8.466 10.59 L 8.318 12.505 C 7.513 12.293 6.652 11.324 6.068 9.562 Z M 11.378 9.941 C 11.525 9.941 11.675 9.943 11.828 9.949 C 10.955 11.74 9.886 12.582 9.027 12.576 L 9.177 10.635 L 10.959 9.953 C 11.098 9.946 11.238 9.942 11.378 9.941 Z" />
      </svg>
    </div>
  )
}

// the description types itself in letter by letter, so every character
// gets its own span with an index the CSS turns into a transition-delay.
// Whole words are wrapped in a nowrap span so the text still wraps
// between words and never mid-word.
function Description({ text }) {
  const words = text.split(' ')
  let i = 0

  return (
    <p className="mcard-desc">
      {words.map((word, w) => (
        <span key={w}>
          <span className="mword">
            {Array.from(word).map((chr, c) => (
              <span key={c} className="ch" style={{ '--i': i++ }}>{chr}</span>
            ))}
          </span>
          {w < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}

function MenuCard({ item }) {
  const ref = useRef(null)

  // phone only: the card flips to its blue face once it reaches the middle
  // of the screen (desktop uses :hover instead, purely in CSS — the class
  // this adds simply has no rules above 820px)
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opened')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5, rootMargin: '-30% 0px -30% 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const meta = (priceFirst) => (
    <div className="mcard-meta">
      {priceFirst ? (
        <>
          <span className="price">{item.price} $</span>
          <span className="rating">{item.rating} <Star /></span>
        </>
      ) : (
        <>
          <span className="rating">{item.rating} <Star /></span>
          <span className="price">{item.price} $</span>
        </>
      )}
    </div>
  )

  return (
    <article ref={ref} className={`menu-card${item.page ? ` menu-card-p${item.page}` : ''}`}>
      <div className="mcard-face">
        <img className="mcard-backcloud" src={BACK_CLOUD} alt="" loading="lazy" />
        <img className="mcard-cup" src={item.cup} alt={item.name} loading="lazy" />
        <img className="mcard-cloud" src={FRONT_CLOUD} alt="" loading="lazy" />
        <div className="mcard-info">
          <h3>{item.name}</h3>
          {meta(false)}
        </div>
      </div>

      <div className="mcard-hover">
        <Description text={item.desc} />
        {meta(true)}
        <DietIcons />
        <p className="mcard-milk">Almond and oat milk options available</p>
      </div>
    </article>
  )
}

export default function Menu() {
  // the real collection is paginated: 6 blends on desktop / 3 on the phone,
  // then one press of "Load More" reveals the rest and the button goes away.
  // Which cards are still hidden is decided in CSS, so this single flag does
  // the right thing at either breakpoint.
  const [loaded, setLoaded] = useState(false)

  return (
    <section className="section" id="menu">
      <div className="wrap">
        <h2 className="menu-title">Explore the full menu</h2>

        <div className={`menu-grid${loaded ? ' loaded' : ''}`}>
          {ITEMS.map((item) => (
            <MenuCard key={item.key} item={item} />
          ))}
        </div>

        <div className={`menu-foot${loaded ? ' loaded' : ''}`}>
          <button className="menu-more" onClick={() => setLoaded(true)}>Load More</button>
        </div>
      </div>
    </section>
  )
}
