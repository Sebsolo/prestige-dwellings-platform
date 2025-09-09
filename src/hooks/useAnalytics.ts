import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsConfig {
  provider: 'matomo' | 'ga4';
  trackingId: string;
  siteUrl?: string;
}

interface TrackEventParams {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

declare global {
  interface Window {
    _paq?: any[];
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const useAnalytics = (config?: AnalyticsConfig) => {
  const location = useLocation();

  // Initialize analytics
  useEffect(() => {
    if (!config) return;

    if (config.provider === 'matomo') {
      initMatomo(config.trackingId, config.siteUrl);
    } else if (config.provider === 'ga4') {
      initGA4(config.trackingId);
    }
  }, [config]);

  // Track page views
  useEffect(() => {
    if (!config) return;

    if (config.provider === 'matomo') {
      trackMatomoPageView();
    } else if (config.provider === 'ga4') {
      trackGA4PageView();
    }
  }, [location.pathname, config]);

  const trackEvent = ({ action, category = 'General', label, value }: TrackEventParams) => {
    if (!config) return;

    if (config.provider === 'matomo') {
      trackMatomoEvent(category, action, label, value);
    } else if (config.provider === 'ga4') {
      trackGA4Event(action, { category, label, value });
    }
  };

  return { trackEvent };
};

// Matomo functions
const initMatomo = (siteId: string, matomoUrl = 'https://matomo.sebastien-pons-immobilier.fr/') => {
  window._paq = window._paq || [];
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.src = `${matomoUrl}matomo.js`;
  
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode?.insertBefore(script, firstScript);

  window._paq.push(['setTrackerUrl', `${matomoUrl}matomo.php`]);
  window._paq.push(['setSiteId', siteId]);
};

const trackMatomoPageView = () => {
  if (window._paq) {
    window._paq.push(['setCustomUrl', window.location.href]);
    window._paq.push(['setDocumentTitle', document.title]);
    window._paq.push(['trackPageView']);
  }
};

const trackMatomoEvent = (category: string, action: string, label?: string, value?: number) => {
  if (window._paq) {
    window._paq.push(['trackEvent', category, action, label, value]);
  }
};

// Google Analytics 4 functions
const initGA4 = (measurementId: string) => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);

  window.gtag = window.gtag || function() {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(arguments);
  };
};

const trackGA4PageView = () => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: window.location.pathname + window.location.search,
      page_title: document.title,
    });
  }
};

const trackGA4Event = (action: string, parameters: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('event', action, parameters);
  }
};