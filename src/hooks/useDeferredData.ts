import { useEffect, useState } from 'react';

/**
 * Hook to defer non-critical data loading until after initial render
 */
export function useDeferredData<T>(
  fetchFn: () => Promise<T>,
  defaultValue: T,
  delay: number = 100
) {
  const [data, setData] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const result = await fetchFn();
        setData(result);
      } catch (error) {
        console.error('Deferred data fetch error:', error);
      } finally {
        setLoading(false);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [fetchFn, delay]);

  return { data, loading };
}