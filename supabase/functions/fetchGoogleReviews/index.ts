import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { placeId } = await req.json()
    
    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'Place ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Google Places API key from Supabase secrets
    const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY')
    
    if (!googleApiKey) {
      console.log('Google Places API key not found in environment variables')
      // Return mock data if no API key is configured
      const mockReviews = [
        {
          id: '1',
          author_name: 'Marie Dubois',
          rating: 5,
          relative_time_description: 'il y a 2 semaines',
          text: 'Service exceptionnel ! Sebastien a su nous accompagner avec professionnalisme dans notre projet d\'achat. Très à l\'écoute et de bons conseils.',
          time: Date.now() - 1209600000,
          profile_photo_url: '/placeholder.svg'
        },
        {
          id: '2',
          author_name: 'Jean-Pierre Martin',
          rating: 5,
          relative_time_description: 'il y a 1 mois',
          text: 'Agent immobilier de confiance, très professionnel. La vente de notre maison s\'est déroulée sans encombre grâce à son expertise.',
          time: Date.now() - 2419200000,
          profile_photo_url: '/placeholder.svg'
        },
        {
          id: '3',
          author_name: 'Sophie Laurent',
          rating: 5,
          relative_time_description: 'il y a 3 semaines',
          text: 'Excellent accompagnement pour notre premier achat immobilier. Sebastien a pris le temps de nous expliquer chaque étape.',
          time: Date.now() - 1814400000,
          profile_photo_url: '/placeholder.svg'
        }
      ]
      
      return new Response(
        JSON.stringify({ reviews: mockReviews, source: 'mock' }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Construct Google Places API URL
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews&key=${googleApiKey}`
    
    const response = await fetch(apiUrl)
    const data = await response.json()
    
    if (data.status !== 'OK') {
      console.log('Google Places API error:', data.status)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch reviews from Google Places API' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const reviews = data.result.reviews || []
    
    // Transform Google reviews to our format
    const transformedReviews = reviews.map((review: any, index: number) => ({
      id: `google_${index}`,
      author_name: review.author_name,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time,
      profile_photo_url: review.profile_photo_url || '/placeholder.svg'
    }))

    return new Response(
      JSON.stringify({ 
        reviews: transformedReviews, 
        source: 'google_places_api',
        rating: data.result.rating 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in fetchGoogleReviews function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})