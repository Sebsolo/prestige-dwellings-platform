import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Sitemap = () => {
  useEffect(() => {
    const generateAndServeSitemap = async () => {
      try {
        // Call the generateSitemap edge function
        const { data, error } = await supabase.functions.invoke('generateSitemap');
        
        if (error) {
          console.error('Error generating sitemap:', error);
          return;
        }

        // Set the response as XML and replace the current page content
        const blob = new Blob([data], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        // Replace current page with the sitemap XML
        window.location.replace(url);
      } catch (error) {
        console.error('Failed to generate sitemap:', error);
      }
    };

    generateAndServeSitemap();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Generating Sitemap...</h1>
        <p className="text-muted-foreground">Please wait while we generate the latest sitemap.</p>
      </div>
    </div>
  );
};

export default Sitemap;