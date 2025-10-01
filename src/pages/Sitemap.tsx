import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Sitemap = () => {
  const [sitemapXml, setSitemapXml] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const generateAndServeSitemap = async () => {
      try {
        // Call the generateSitemap edge function
        const { data, error } = await supabase.functions.invoke('generateSitemap');
        
        if (error) {
          console.error('Error generating sitemap:', error);
          setError('Failed to generate sitemap');
          return;
        }

        // Set the sitemap XML content
        setSitemapXml(data);
      } catch (error) {
        console.error('Failed to generate sitemap:', error);
        setError('Failed to generate sitemap');
      }
    };

    generateAndServeSitemap();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!sitemapXml) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
          <p className="text-muted-foreground">Please wait while we generate the latest sitemap.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <pre className="p-4 overflow-auto text-xs font-mono">{sitemapXml}</pre>
    </div>
  );
};

export default Sitemap;