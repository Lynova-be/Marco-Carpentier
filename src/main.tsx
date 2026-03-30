import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from '../App'
import './index.css'

const rootElement = document.getElementById('root')!

if (rootElement.hasChildNodes()) {
  // Prerendered HTML aanwezig — hydrate i.p.v. mount
  hydrateRoot(
    rootElement,
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
} else {
  // Dev-mode of niet-geprerenderde pagina — gewone mount
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}
