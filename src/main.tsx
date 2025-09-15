import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n'
import { RevShareSettingsProvider } from './contexts/RevShareSettingsContext'

createRoot(document.getElementById("root")!).render(
  <RevShareSettingsProvider>
    <App />
  </RevShareSettingsProvider>
);
