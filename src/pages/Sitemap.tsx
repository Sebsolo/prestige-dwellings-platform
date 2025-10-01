import { useEffect } from 'react';

const Sitemap = () => {
  useEffect(() => {
    // Redirect to the edge function that serves proper XML
    const projectId = 'gxzifrexmsouvfnriyym';
    window.location.href = `https://${projectId}.supabase.co/functions/v1/generateSitemap`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to sitemap...</h1>
      </div>
    </div>
  );
};

export default Sitemap;