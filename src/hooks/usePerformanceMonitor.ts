import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

export const usePerformanceMonitor = () => {
  useEffect(() => {
    const metrics: PerformanceMetrics = {};

    // Web Vitals monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            break;
          case 'first-input':
            metrics.fid = (entry as any).processingStart - entry.startTime;
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + (entry as any).value;
            }
            break;
          case 'paint':
            if (entry.name === 'first-contentful-paint') {
              metrics.fcp = entry.startTime;
            }
            break;
          case 'navigation':
            metrics.ttfb = (entry as any).responseStart;
            break;
        }
      });
    });

    // Observe various performance metrics
    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      observer.observe({ entryTypes: ['first-input'] });
      observer.observe({ entryTypes: ['layout-shift'] });
      observer.observe({ entryTypes: ['paint'] });
      observer.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.warn('Performance Observer not supported:', e);
    }

    // Report metrics after page load
    const reportMetrics = () => {
      if (typeof window !== 'undefined' && window.gtag) {
        Object.entries(metrics).forEach(([metric, value]) => {
          if (value !== undefined) {
            window.gtag('event', 'web_vitals', {
              metric_name: metric,
              metric_value: Math.round(value),
              metric_id: Math.random().toString(36).substr(2, 9)
            });
          }
        });
      }
    };

    // Report metrics when the page is about to be unloaded
    window.addEventListener('beforeunload', reportMetrics);
    
    // Also report after 5 seconds as a fallback
    const timer = setTimeout(reportMetrics, 5000);

    return () => {
      observer.disconnect();
      window.removeEventListener('beforeunload', reportMetrics);
      clearTimeout(timer);
    };
  }, []);
};

export default usePerformanceMonitor;