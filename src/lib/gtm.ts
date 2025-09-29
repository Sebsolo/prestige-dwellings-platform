const isProd = import.meta.env.PROD;
const GTM_ID = 'GTM-5Q3WMWCC'; // Direct GTM ID for production
export function loadGTM() {
  if (!isProd || !GTM_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}
export function pushPageView(path: string, title?: string) {
  if (!isProd || !GTM_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'router-change',
    page_path: path,
    page_title: title ?? document.title,
    page_location: `${window.location.origin}${path}`
  });
}
export function grantAnalyticsConsent() {
  if (!isProd || !GTM_ID) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_update',
    analytics_storage: 'granted'
    // optionally:
    // , ad_storage:'granted', ad_user_data:'granted', ad_personalization:'granted'
  });
}