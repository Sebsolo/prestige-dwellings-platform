import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/i18n'
import { ImageKitProvider } from '@imagekit/react'

// TODO: remplace par ton endpoint ImageKit (ex: https://ik.imagekit.io/TON_ID)
const IK_ENDPOINT = import.meta.env.VITE_IMAGEKIT_ENDPOINT || 'https://ik.imagekit.io/hqhxxhjdvy/';

createRoot(document.getElementById("root")!).render(
  <ImageKitProvider urlEndpoint={IK_ENDPOINT}>
    <App />
  </ImageKitProvider>
);
