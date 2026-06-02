import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
//import './index.css'
import { ThemeProvider } from "theme";
import { RouteProvider } from "router.ts";
import { $lang } from "i18n";

// Path-based language: an /en/* URL must render English from the first frame so
// it matches the statically prerendered HTML (no FR→EN flash on hydration).
// Subsequent in-app changes are handled by the route-sync effect in Body.tsx.
if (/^\/en(\/|$)/.test(window.location.pathname)) {
    $lang.current = "en";
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </ThemeProvider>
  </StrictMode>,
)
