import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: Request) {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const groupSlug = url.searchParams.get('group_slug') || 'default';

    console.log(`Fetching showcase items for group: ${groupSlug}`);

    // Fetch published showcase items
    const { data: items, error } = await supabase
      .from('showcase_items')
      .select('*')
      .eq('published', true)
      .eq('group_slug', groupSlug)
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Error fetching showcase items:', error);
      throw error;
    }

    // Generate signed URLs for videos and public URLs for posters
    const itemsWithUrls = await Promise.all(
      items.map(async (item) => {
        // Public poster URL
        const posterUrl = item.poster_path 
          ? `${supabaseUrl}/storage/v1/object/public/${item.poster_bucket}/${item.poster_path}`
          : null;

        // Generate signed URLs for videos (if they exist)
        const videoMp4Url = item.video_mp4_path
          ? await generateSignedUrl(item.video_bucket, item.video_mp4_path)
          : null;

        const videoWebmUrl = item.video_webm_path
          ? await generateSignedUrl(item.video_bucket, item.video_webm_path)
          : null;

        return {
          ...item,
          poster_url: posterUrl,
          video_mp4_url: videoMp4Url,
          video_webm_url: videoWebmUrl,
        };
      })
    );

    console.log(`Successfully processed ${itemsWithUrls.length} showcase items`);

    return new Response(JSON.stringify(itemsWithUrls), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in getShowcaseItems function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
}

async function generateSignedUrl(bucket: string, path: string): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, 3600); // 1 hour expiry

    if (error) {
      console.error(`Error generating signed URL for ${bucket}/${path}:`, error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error(`Error generating signed URL for ${bucket}/${path}:`, error);
    return null;
  }
}