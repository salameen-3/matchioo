# Matchioo

A pixel-faithful rebuild of the Matchioo matcha-cafe site — sticky hero with a
drag-away cups photo, a scroll-linked signature-cup handoff, a hand-drawn
ticker, hover/tap team cards, and a footer wordmark that rises on every visit.

Built with **React 18 + Vite**, with **Lenis** for the smooth scroll. All motion
runs on CSS transitions driven by `IntersectionObserver` class toggles — nothing
recalculates per scroll frame, so it stays smooth on a phone.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # -> dist/
npm run preview    # serve the production build locally
```

## Deploy (Vercel)

Import the repo at [vercel.com/new](https://vercel.com/new). Vercel detects Vite
automatically:

| Setting | Value |
| --- | --- |
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

`vercel.json` adds an SPA rewrite so deep links keep working if a router is ever
added.

## Layout

```
src/
  App.jsx                  page composition + the hero -> about hand-off
  index.css                the whole stylesheet, one file, commented by section
  hooks/
    useReveal.js           the shared scroll-appear observer
    useSmoothScroll.js     Lenis setup
  components/
    Nav.jsx                floating pill nav, hamburger sheet on phones
    Hero.jsx               cups photo, cursive lines, spinning badge
    AboutOverlap.jsx       the big paragraph + the moving-words ticker
    Signature.jsx          the big cup that settles into the three-cup row
    Menu.jsx               nine blends, hover/scroll card flip, Load More
    Testimonial.jsx        four reviews that land one after another
    Team.jsx               four cards — hover on desktop, tap on phone
    FAQ.jsx                single-open accordion
    Footer.jsx             links, socials, the rising wordmark
standalone/
  index.html               the same site as ONE self-contained HTML file
```

## Breakpoints

Desktop `≥1200px` · tablet `810–1199px` · phone `≤809px`.

## A note on the images

Photos and doodles are loaded straight from the original Framer CDN
(`framerusercontent.com`). They work as-is, but if you want the site to be fully
self-contained, download them into `public/images/` and swap the URLs.
