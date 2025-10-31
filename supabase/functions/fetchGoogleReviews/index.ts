import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { placeId } = await req.json()

    if (!placeId) {
      throw new Error('Place ID is required')
    }

    console.log('Fetching reviews from Google Places API for:', placeId)
    
    const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY')
    
    if (!apiKey) {
      console.warn('No Google Places API key configured, returning mock data')
      
      const mockReviews = [
        {
          id: 'mock_1',
          author_name: 'John Doe',
          rating: 5,
          relative_time_description: 'a month ago',
          text: 'Excellent service! Highly recommended.',
          time: Date.now() / 1000,
          profile_photo_url: 'https://lh3.googleusercontent.com/a/default-user'
        }
      ]
      
      return new Response(
        JSON.stringify({ reviews: mockReviews, source: 'mock_data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}&language=fr&reviews_sort=newest`
    
    console.log('Fetching reviews from Google Places API...')
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`)
    }

    const data = await response.json()
    console.log('API Response status:', data.status)

    if (data.status !== 'OK') {
      throw new Error(`Google API returned status: ${data.status}`)
    }

    const reviews = data.result?.reviews || []
    console.log(`Fetched ${reviews.length} reviews from Google (total ratings: ${data.result?.user_ratings_total || 0})`)

    const transformedReviews = reviews.map((review: any, index: number) => ({
      id: `google_${index}`,
      author_name: review.author_name,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time,
      profile_photo_url: review.profile_photo_url
    }))

    return new Response(
      JSON.stringify({ 
        reviews: transformedReviews,
        source: 'google_places_api',
        rating: data.result?.rating
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error fetching reviews:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})