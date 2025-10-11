import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface Property {
  id: number;
  title_fr: string;
  city: string;
  postal_code: string | null;
  type: string;
  transaction: string;
  updated_at: string;
}

interface Post {
  id: number;
  slug: string;
  created_at: string;
  published_at: string | null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Generating dynamic sitemap...');

    // Fetch all properties except drafts
    const { data: properties, error: propsError } = await supabase
      .from('properties')
      .select('id, title_fr, city, postal_code, type, transaction, updated_at')
      .neq('status', 'draft')
      .order('updated_at', { ascending: false });

    if (propsError) {
      console.error('Error fetching properties:', propsError);
      throw propsError;
    }

    // Fetch published blog posts
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, slug, created_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
      throw postsError;
    }

    const baseUrl = Deno.env.get('SITE_URL') || 'https://yvelines-immo.fr';
    const currentDate = new Date().toISOString().split('T')[0];

    // Generate XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Sales -->
  <url>
    <loc>${baseUrl}/ventes</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Rentals -->
  <url>
    <loc>${baseUrl}/locations</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Valuation -->
  <url>
    <loc>${baseUrl}/estimation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Join Experience -->
  <url>
    <loc>${baseUrl}/rejoindre-exp</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Blog -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Contact -->
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

    // Add dynamic property pages
    if (properties && properties.length > 0) {
      properties.forEach((property: Property) => {
        const city = property.city?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'ville';
        const postalCode = property.postal_code || '';
        const type = property.type === 'apartment' ? 'appartement' : 
                     property.type === 'house' ? 'maison' : 
                     property.type === 'commercial' ? 'commercial' : 
                     property.type === 'land' ? 'terrain' : 
                     property.type === 'garage' ? 'garage' : 'bien';
        const transactionPath = property.transaction === 'sale' ? 'vente' : 'location';
        const slug = postalCode ? `${type}-${postalCode}-${city}-${property.id}` : `${type}-${city}-${property.id}`;
        const lastmod = new Date(property.updated_at).toISOString().split('T')[0];
        
        sitemap += `
  
  <!-- Property: ${property.title_fr} -->
  <url>
    <loc>${baseUrl}/${transactionPath}/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }

    // Add dynamic blog post pages
    if (posts && posts.length > 0) {
      posts.forEach((post: Post) => {
        const lastmod = new Date(post.published_at || post.created_at).toISOString().split('T')[0];
        
        sitemap += `
  
  <!-- Blog Post: ${post.slug} -->
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
      });
    }

    // Add static legal pages
    sitemap += `
  
  <!-- Legal pages -->
  <url>
    <loc>${baseUrl}/mentions-legales</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/rgpd</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/cookies</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
</urlset>`;

    console.log(`Generated sitemap with ${properties?.length || 0} properties and ${posts?.length || 0} blog posts`);

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400', // Cache for 30min, CDN 1h, serve stale for 24h
        'X-Robots-Tag': 'noindex', // Don't index the sitemap itself
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to generate sitemap' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});