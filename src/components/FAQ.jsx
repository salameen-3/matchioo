import { useState } from 'react'

// The five questions and answers of the real site's FAQ component, copied
// verbatim.
const QA = [
  {
    q: 'What makes your matcha different from what I can get at a standard coffee shop?',
    a: 'We source authentic, high-grade matcha directly from Japan, focusing on a rich, vibrant flavor profile that is never bitter or watered down. Every drink is whisked to order with precision, ensuring you get the full health benefits and smooth texture of true, ceremonial-style green tea.',
  },
  {
    q: 'What are your signature drinks, and what do you recommend for a first-timer?',
    a: 'If you are new to us, you have to try our Ube Matcha Latte—it’s a crowd favorite that perfectly balances the earthy notes of our premium matcha with the sweet, nutty flavor of ube. If you prefer something classic, our traditional ceremonial matcha latte or an iced strawberry matcha are excellent places to start.',
  },
  {
    q: 'Do you offer dairy-free alternatives or vegan-friendly options?',
    a: 'Absolutely. We want everyone to enjoy our drinks, so we offer a variety of plant-based milks (including oat milk and almond milk) to customize your latte. Most of our signature flavors and syrups can easily be made completely vegan-friendly upon request.',
  },
  {
    q: 'Can I order ahead for pickup, or do you offer delivery?',
    a: "We love crafting your drinks fresh, but we know you're sometimes on the move. You can place an order directly through our website for quick in-store pickup so your drink is ready right when you arrive. For delivery options, check your favorite local delivery apps to see if we service your area.",
  },
  {
    q: 'Is there parking available near the cafe?',
    a: 'Yes, there is street parking available all along Garnet Avenue and the surrounding side streets. Depending on the spot, you will find both metered (paid) and free residential street parking options just a short walk from our front door.',
  },
]

// the real site's own glyph: a 20px circle with a plus, 2px black stroke.
// The vertical bar collapses away in CSS when the row opens, turning it
// into the circled minus.
function Icon() {
  return (
    <span className="faq-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <path className="faq-bar" d="M12 8 L12 16" />
        <path d="M8 12 L16 12" />
      </svg>
    </span>
  )
}

export default function FAQ() {
  // one row open at a time, like the real accordion
  const [open, setOpen] = useState(-1)

  return (
    <section className="section faq" id="FAQ">
      <h2 className="faq-title">FAQ</h2>

      <div className="faq-list">
        {QA.map((item, i) => (
          <button
            key={item.q}
            type="button"
            className={`faq-item${open === i ? ' open' : ''}`}
            onClick={() => setOpen(open === i ? -1 : i)}
          >
            <Icon />
            {/* the icon sits far left and this column far right — that
                space-between split is what gives the real rows their look */}
            <span className="faq-qa">
              <span className="faq-q">{item.q}</span>
              <span className="faq-a"><p>{item.a}</p></span>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
