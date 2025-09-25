import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    console.log('Fetching home bootstrap data...');

    // Fetch all critical data in parallel
    const [settingsResult, slidesResult, propertiesResult, postsResult] = await Promise.all([
      supabase
        .from('site_settings')
        .select('primary_color, secondary_color, site_name, site_description')
        .single(),
      
      supabase
        .from('home_carousel_images')
        .select('id, title, alt_text, image_path, sort_order')
        .eq('active', true)
        .order('sort_order')
        .limit(5),
      
      supabase
        .from('properties')
        .select(`
          id, title_fr, title_en, excerpt_fr, excerpt_en, price, rent_cc, 
          city, transaction, status, youtube_url, featured,
          media(id, path, alt_fr, alt_en, sort_order)
        `)
        .in('status', ['published', 'under_offer', 'sold', 'rented'])
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(3),
      
      supabase
        .from('posts')
        .select('id, title_fr, title_en, slug, cover_path, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3)
    ]);

    console.log('Settings result:', settingsResult.error || 'OK');
    console.log('Slides result:', slidesResult.error || 'OK');
    console.log('Properties result:', propertiesResult.error || 'OK');
    console.log('Posts result:', postsResult.error || 'OK');

    // Check for any errors
    if (settingsResult.error) {
      console.error('Settings error:', settingsResult.error);
    }
    if (slidesResult.error) {
      console.error('Slides error:', slidesResult.error);
    }
    if (propertiesResult.error) {
      console.error('Properties error:', propertiesResult.error);
    }
    if (postsResult.error) {
      console.error('Posts error:', postsResult.error);
    }

    const response = {
      settings: settingsResult.data,
      slides: slidesResult.data || [],
      properties: propertiesResult.data || [],
      posts: postsResult.data || []
    };

    console.log('Returning bootstrap data:', {
      settings: !!response.settings,
      slides: response.slides.length,
      properties: response.properties.length,
      posts: response.posts.length
    });

    return new Response(JSON.stringify(response), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600'
      }
    });

  } catch (error) {
    console.error('Error in bootstrapHome function:', error);
    
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      settings: null,
      slides: [],
      properties: [],
      posts: []
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  }
});