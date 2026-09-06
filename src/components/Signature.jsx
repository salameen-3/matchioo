import { useEffect, useRef } from 'react'
import { useReveal } from '../hooks/useReveal.js'

const CLOUD = 'https://framerusercontent.com/images/CkYg79IUAFJc2xBaBXFxfDaKE.png?width=700&height=390'
const BLUEBERRY = 'https://framerusercontent.com/images/ydBKKok7sfKGlMREnafLi9UXRnQ.png?width=1536&height=2752'
const STRAWBERRY = 'https://framerusercontent.com/images/lCknPwilfl1LmzUKM4KYPxzVI.png?width=1536&height=2752'
const CHOCOLATE = 'https://framerusercontent.com/images/YxKdWcr230jAfDlHyjoeVtu0.png?width=1536&height=2752'

function Item({ variant, cup, label, children }) {
  return (
    <div className={`sig-item sig-item-${variant}`}>
      <div className="sig-item-cloud"><img src={CLOUD} alt="" loading="lazy" decoding="async" /></div>
      <div className="sig-item-cup">
        <img src={cup} alt={label} loading="lazy" decoding="async" />
        {children}
      </div>
      <div className="sig-item-cloud-front"><img src={CLOUD} alt="" loading="lazy" decoding="async" /></div>
      <p className="sig-item-label">{label}</p>
    </div>
  )
}

// The real "Signature matchas" section has exactly two states and one
// trigger. While the lower 60% band of the panel is less than half on screen
// it shows "Desktop Variant 1" — the big Blueberry cup floating above the row
// with its three hand-drawn notes. The moment that band is 50% visible it
// swaps to "Desktop Variant 2": the same cup at scale(.6), sitting between
// the two other cups, over Framer's {bounce:.2, duration:2} spring.
//
// So here the big cup simply IS the row's middle cup, lifted and blown up by
// one transform — "landing" is just dropping that transform. No pinning, no
// scroll listener, nothing running per frame.
export default function Signature() {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const cupRef = useRef(null)
  const bandRef = useRef(null)

  const callout1Ref = useReveal()
  const callout2Ref = useReveal()
  const chipRef = useReveal()
  const titleRef = useReveal()

  useEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    const cup = cupRef.current
    const band = bandRef.current
    if (!section || !stage || !cup || !band) return

    // measure the resting geometry with the transform switched off for one
    // frame, so the lift always lands the cup dead-centre in the stage box
    const measure = () => {
      section.classList.add('measuring')
      const c = cup.getBoundingClientRect()
      const s = stage.getBoundingClientRect()
      section.classList.remove('measuring')
      section.style.setProperty('--sig-dy', ((s.top + s.height / 2) - (c.top + c.height / 2)).toFixed(1) + 'px')
      // the real phone variant keeps this cup at scale 1 — there it only
      // travels down into the column, it doesn't shrink
      // 1.45 x the row cup's 32vw puts the floating cup at ~46vw — the size
      // it reads at on the real phone layout. It used to sit at 1, i.e. no
      // bigger than the two cups it is meant to tower over.
      section.style.setProperty('--sig-scale', window.innerWidth < 810 ? '1.45' : '1.667')
    }
    measure()
    window.addEventListener('load', measure)

    let rt
    const onResize = () => { clearTimeout(rt); rt = setTimeout(measure, 200) }
    window.addEventListener('resize', onResize, { passive: true })

    // entrance: scale .5 -> 1, y 80 -> 0, at 50% of the section in view
    const wake = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) section.classList.add('awake') })
    }, { threshold: 0.25 })
    wake.observe(section)

    // The landing trigger. On desktop the real site watches a band starting
    // 41% down the panel and fires at 50% of it. On a phone that band is a
    // slice of a section three screens tall, so half of it only comes into
    // view long after the cup should already have settled — which is the lag.
    // There the row itself is the trigger instead: the moment its top passes
    // two thirds of the way up the screen, the cup drops. Same beat as the
    // pointer version, no waiting.
    const phone = window.innerWidth < 810
    const row = section.querySelector('.sig-row')
    const landTarget = phone && row ? row : band
    const land = new IntersectionObserver((entries) => {
      entries.forEach((e) => section.classList.toggle('landed', e.isIntersecting))
    }, phone ? { threshold: 0, rootMargin: '0px 0px -35% 0px' } : { threshold: 0.5 })
    land.observe(landTarget)

    return () => {
      clearTimeout(rt)
      window.removeEventListener('load', measure)
      window.removeEventListener('resize', onResize)
      wake.disconnect()
      land.disconnect()
    }
  }, [])

  return (
    <section ref={sectionRef} className="section signature" id="signature" style={{ position: 'relative' }}>
      <div
        ref={bandRef}
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, right: 0, top: '41%', height: '60%', pointerEvents: 'none' }}
      />

      <div className="wrap">
        {/* the empty stage the big cup rises into — the cup itself is the
            middle cup of the row below, lifted into the centre of this box */}
        <div ref={stageRef} className="sig-usecase">
          <div ref={callout1Ref} className="sig-callout sig-callout-1 reveal" style={{ transitionDelay: '.35s' }}>
            <span className="sig-callout-text">Calm Focus</span>
            <svg className="sig-arrow" viewBox="0 0 349 654" fill="none" style={{ transform: 'rotate(125deg)' }}>
              <path d="M199.902 0.143762C198.062 -0.0479208 196.207 -0.0479208 194.367 0.143762C190.931 0.400149 187.674 1.77969 185.099 4.06973C182.209 7.10328 180.517 11.0821 180.337 15.2683C180.015 17.4566 179.693 19.6448 179.436 21.7043C178.792 25.8877 178.213 30.0068 177.698 33.9971C176.668 42.1065 175.638 49.894 174.673 57.2954C172.935 72.0982 171.584 85.3564 170.683 96.555C168.945 118.888 169.138 132.725 171.648 133.047C174.158 133.369 178.599 120.175 183.748 98.2927C186.322 87.3515 189.09 74.2221 191.921 59.6768C193.209 52.3397 194.689 44.6165 196.105 36.5715C196.834 32.667 197.542 28.6767 198.229 24.6006C199.619 26.8221 201.122 28.9703 202.734 31.0366C208.719 39.9826 219.789 53.8844 235.944 77.6976C259.075 111.488 278.495 147.675 293.868 185.629C304.897 213.363 312.966 242.185 317.938 271.614C320.637 287.837 322.271 304.22 322.83 320.656C323.226 337.849 322.495 355.048 320.641 372.144C318.533 389.53 315.155 406.739 310.537 423.632C305.797 440.741 299.64 457.425 292.13 473.511C277.329 505.417 256.926 534.409 231.889 559.11C219.858 570.808 206.949 581.566 193.273 591.29C180.272 600.345 166.611 608.412 152.404 615.425C128.157 627.708 102.41 636.773 75.816 642.392C57.627 645.976 39.1849 648.128 20.6595 648.828C13.7594 648.303 6.82101 648.627 0 649.793C6.6382 651.936 13.5566 653.085 20.5308 653.205C39.5674 654.411 58.6777 653.635 77.5537 650.888C105.572 646.638 132.865 638.515 158.647 626.753C173.823 619.946 188.455 611.985 202.412 602.939C217.213 593.183 231.203 582.25 244.246 570.245C271.509 544.827 293.927 514.667 310.408 481.235C318.729 464.402 325.618 446.898 331.003 428.91C336.261 411.126 340.155 392.966 342.652 374.59C347.331 339.442 346.876 303.8 341.301 268.782C336.312 237.929 327.96 207.714 316.394 178.678C300.536 139.041 279.664 101.601 254.286 67.2712C242.637 51.2471 229.724 36.1816 215.67 22.2192L214.061 20.739C244.249 24.3937 274.679 25.6633 305.066 24.5362C331.776 23.5708 348.123 20.6102 348.059 18.1002C348.059 12.9514 282.669 12.3078 204.021 0.59428L199.902 0.143762Z" fill="#072333" />
            </svg>
          </div>

          <div ref={callout2Ref} className="sig-callout sig-callout-2 reveal" style={{ transitionDelay: '.45s' }}>
            <span className="sig-callout-text">Metabolism</span>
            <svg className="sig-arrow" viewBox="0 0 453 329" fill="none" style={{ transform: 'rotate(166deg)' }}>
              <path d="M232.35 155.994C270.644 131.795 308.488 110.427 339.445 93.951L361.07 82.4305L379.863 72.8409C391.384 66.7911 401.231 62.1572 409.34 57.9738L420.668 52.0526C418.029 55.2706 415.39 58.4886 413.009 61.6423C408.324 67.8067 404.025 74.255 400.137 80.9503C393.456 92.1545 387.997 104.043 383.854 116.413C377.032 137.458 377.032 151.167 379.477 151.618C385.141 152.776 397.884 101.417 444.545 53.5329C448.353 49.3656 450.976 44.2542 452.14 38.7301C452.685 35.2179 452.216 31.623 450.788 28.3681C449.325 25.2414 447.114 22.5228 444.352 20.4519C440.115 17.4134 435.328 15.2275 430.257 14.0159C426.074 12.8574 422.47 11.9564 418.673 10.991C403.741 7.3868 390.161 4.55497 378.641 2.94597C355.6 -0.593834 340.99 -0.786922 340.539 1.53004C340.089 3.847 353.411 8.54527 375.358 15.1743L413.588 26.7591C416.999 27.8533 420.861 28.9474 424.207 30.1059C417.771 32.2297 409.855 35.319 399.558 39.953C391.062 43.6858 380.829 48.0623 368.987 53.9191L349.679 63.38L327.603 74.9648C296.195 91.7627 258.094 114.031 219.864 139.325C181.794 164.602 145.08 191.864 109.873 220.998C81.7375 244.13 54.8203 268.705 29.23 294.625C9.92202 314.448 -1.01917 327.449 0.0749473 328.414C2.77807 330.731 52.271 284.07 121.007 232.775C155.247 207.032 194.12 180.129 232.543 155.994" fill="#072333" />
            </svg>
          </div>

          <div ref={chipRef} className="sig-more-chip reveal" style={{ transitionDelay: '.55s' }}>
            <span>&amp; much more...</span>
          </div>
        </div>

        <h2 ref={titleRef} className="sig-title reveal">Our Signature Matchas</h2>

        <div className="sig-row">
          <Item variant="straw" cup={STRAWBERRY} label="Strawberry Matcha" />
          <div className="sig-item sig-item-blue">
            <div className="sig-item-cloud"><img src={CLOUD} alt="" loading="lazy" decoding="async" /></div>
            <div ref={cupRef} className="sig-item-cup">
              <img src={BLUEBERRY} alt="Blueberry Matcha" decoding="async" />
            </div>
            <div className="sig-item-cloud-front"><img src={CLOUD} alt="" loading="lazy" decoding="async" /></div>
            <p className="sig-item-label">Blueberry Matcha</p>
          </div>
          <Item variant="choc" cup={CHOCOLATE} label="Chocolate Matcha" />
        </div>
      </div>
    </section>
  )
}


