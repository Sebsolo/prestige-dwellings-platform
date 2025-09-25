import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n'
import { RevShareSettingsProvider } from './contexts/RevShareSettingsContext'
import { ThemeProvider } from './components/ThemeProvider'
import { ImageKitProvider } from '@imagekit/react'

// Performance monitoring
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor'

// ImageKit endpoint
const IK_ENDPOINT = import.meta.env.VITE_IMAGEKIT_ENDPOINT || 'https://ik.imagekit.io/hqhxxhjdvy/';

// Performance-optimized root render
const AppWithPerformanceMonitoring = () => {
  usePerformanceMonitor();
  
  return (
    <ImageKitProvider urlEndpoint={IK_ENDPOINT}>
      <ThemeProvider>
        <RevShareSettingsProvider>
          <App />
        </RevShareSettingsProvider>
      </ThemeProvider>
    </ImageKitProvider>
  );
};

// Remove initial loader once React app is ready
const rootElement = document.getElementById("root")!;
const loader = document.getElementById("initial-loader");

createRoot(rootElement).render(<AppWithPerformanceMonitoring />);

// Hide loader after React renders
setTimeout(() => {
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader?.remove(), 300);
  }
}, 100);
