import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
//import './index.css'
import { ThemeProvider } from "theme";
import { RouteProvider } from "router.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RouteProvider>
        <App />
      </RouteProvider>
    </ThemeProvider>
  </StrictMode>,
)
