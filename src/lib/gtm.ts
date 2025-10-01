const isProd = import.meta.env.PROD;
const GTM_ID = 'GTM-5Q3WMWCC';
const DEBUG_MODE = !isProd || window.location.search.includes('gtm_debug=1');

// Helper for debug logging
const debugLog = (...args: any[]) => {
  if (DEBUG_MODE) {
    console.log('[GTM Debug]', ...args);
  }
};

export function loadGTM() {
  if (!GTM_ID) {
    console.error('[GTM] No GTM ID configured');
    return;
  }

  // Allow testing in development with query param
  if (!isProd && !window.location.search.includes('gtm_debug=1')) {
    debugLog('GTM disabled in development. Add ?gtm_debug=1 to test.');
    return;
  }

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    s.onerror = () => console.error('[GTM] Failed to load GTM script');
    document.head.appendChild(s);
    
    debugLog('GTM loaded with ID:', GTM_ID);
  } catch (error) {
    console.error('[GTM] Error loading GTM:', error);
  }
}

export function pushPageView(path: string, title?: string) {
  if (!GTM_ID) return;

  try {
    window.dataLayer = window.dataLayer || [];
    
    const pageTitle = title ?? document.title;
    const pageLocation = `${window.location.origin}${path}`;
    
    // Send custom router-change event for GTM triggers
    window.dataLayer.push({
      event: 'router-change',
      page_path: path,
      page_title: pageTitle,
      page_location: pageLocation
    });
    
    // Also send standard page_view event for GA4
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: pageTitle,
      page_location: pageLocation
    });
    
    debugLog('Page view tracked:', { path, title: pageTitle });
  } catch (error) {
    console.error('[GTM] Error pushing page view:', error);
  }
}

export function grantAnalyticsConsent() {
  if (!GTM_ID) return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'consent_update',
      analytics_storage: 'granted'
    });
    
    debugLog('Analytics consent granted');
    
    // Track current page after consent
    const currentPath = window.location.pathname + window.location.search;
    pushPageView(currentPath);
  } catch (error) {
    console.error('[GTM] Error granting consent:', error);
  }
}