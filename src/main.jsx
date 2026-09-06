import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// index.html keeps #root hidden until this runs. Two frames puts us after
// React's first paint (so the webfonts have actually been requested), then we
// wait for them — capped at 1.5s, and index.html un-hides the page after 3s
// no matter what. Without this the page arrives in fallback fonts and every
// heading jumps a moment later as the display faces land.
requestAnimationFrame(() => requestAnimationFrame(() => {
  const reveal = () => document.documentElement.classList.add('app-ready')
  if (document.fonts && document.fonts.ready) {
    Promise.race([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 1500)),
    ]).then(reveal, reveal)
  } else {
    reveal()
  }
}))

