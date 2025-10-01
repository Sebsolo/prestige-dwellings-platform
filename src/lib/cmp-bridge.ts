import { grantAnalyticsConsent } from './gtm';

declare global { interface Window { axeptioSDK?: any } }

const DEBUG_MODE = !import.meta.env.PROD || window.location.search.includes('gtm_debug=1');

const debugLog = (...args: any[]) => {
  if (DEBUG_MODE) {
    console.log('[CMP Bridge]', ...args);
  }
};

export function bindCMPToGTM() {
  if (!window.axeptioSDK) {
    debugLog('Axeptio SDK not found, retrying...');
    // Retry after a delay if SDK not loaded yet
    setTimeout(bindCMPToGTM, 500);
    return;
  }

  try {
    // Check if consent was already given in a previous session
    window.axeptioSDK.on('ready', () => {
      debugLog('Axeptio SDK ready, checking existing consent');
      
      const cookies = window.axeptioSDK?.getCookies?.() || {};
      debugLog('Current consent state:', cookies);
      
      // Check if analytics is already consented
      if (cookies.google_analytics || cookies['google-analytics']) {
        debugLog('Analytics consent already granted from previous session');
        grantAnalyticsConsent();
      }
    });

    // Listen for new consent choices
    window.axeptioSDK.on('cookies:complete', (choices: any) => {
      debugLog('Consent choices received:', choices);
      debugLog('Accepted vendors:', choices?.acceptedVendors);
      
      const accepted = Array.isArray(choices?.acceptedVendors)
        ? choices.acceptedVendors.includes('google-analytics') || 
          choices.acceptedVendors.includes('google_analytics') ||
          choices.acceptedVendors.includes('ga')
        : false;
      
      debugLog('Analytics consent:', accepted ? 'granted' : 'denied');
      
      if (accepted) {
        grantAnalyticsConsent();
      }
    });
    
    debugLog('CMP to GTM bridge initialized');
  } catch (error) {
    console.error('[CMP Bridge] Error binding CMP:', error);
  }
}