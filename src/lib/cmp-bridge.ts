import { grantAnalyticsConsent } from './gtm';

declare global { interface Window { axeptioSDK?: any } }

export function bindCMPToGTM() {
  if (!window.axeptioSDK) return;
  window.axeptioSDK.on('cookies:complete', (choices:any) => {
    const accepted = Array.isArray(choices?.acceptedVendors)
      ? choices.acceptedVendors.includes('google-analytics') || choices.acceptedVendors.includes('ga')
      : false;
    if (accepted) grantAnalyticsConsent();
  });
}