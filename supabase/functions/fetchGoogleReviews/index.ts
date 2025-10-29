import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface GoogleOAuthToken {
  access_token: string
  refresh_token: string | null
  expires_at: string
}

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
    const { placeId, useMyBusiness } = await req.json()
    
    if (!placeId) {
      return new Response(
        JSON.stringify({ error: 'Place ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Check if we should use Google My Business API
    if (useMyBusiness) {
      console.log('Using Google My Business API')
      
      // Get OAuth token for the current user
      const authHeader = req.headers.get('authorization')
      const token = authHeader?.replace('Bearer ', '')
      const { data: { user } } = await supabase.auth.getUser(token)

      if (!user) {
        return new Response(
          JSON.stringify({ error: 'User not authenticated' }),
          { 
            status: 401, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Get stored OAuth tokens
      const { data: tokenData, error: tokenError } = await supabase
        .from('google_oauth_tokens')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (tokenError || !tokenData) {
        console.log('No OAuth tokens found, user needs to authorize')
        return new Response(
          JSON.stringify({ needsAuth: true }),
          { 
            status: 200, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const tokens = tokenData as unknown as GoogleOAuthToken
      
      // Check if token is expired and refresh if needed
      let accessToken = tokens.access_token
      const expiresAt = new Date(tokens.expires_at)
      
      if (expiresAt < new Date()) {
        console.log('Access token expired, refreshing...')
        
        if (!tokens.refresh_token) {
          return new Response(
            JSON.stringify({ needsAuth: true }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        const clientId = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID')
        const clientSecret = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET')
        
        const refreshResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: clientId!,
            client_secret: clientSecret!,
            refresh_token: tokens.refresh_token,
            grant_type: 'refresh_token',
          }),
        })

        const refreshData = await refreshResponse.json()
        
        if (!refreshResponse.ok) {
          console.error('Token refresh failed:', refreshData)
          return new Response(
            JSON.stringify({ needsAuth: true }),
            { 
              status: 200, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          )
        }

        accessToken = refreshData.access_token
        const newExpiresAt = new Date(Date.now() + refreshData.expires_in * 1000)

        // Update stored token
        await supabase
          .from('google_oauth_tokens')
          .update({
            access_token: accessToken,
            expires_at: newExpiresAt.toISOString(),
          })
          .eq('user_id', user.id)

        console.log('Token refreshed successfully')
      }

      // Fetch reviews using Google My Business API
      console.log('Fetching reviews from Google My Business API...')
      
      // First, get account information
      const accountsResponse = await fetch(
        'https://mybusinessbusinessinformation.googleapis.com/v1/accounts',
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const accountsData = await accountsResponse.json()
      console.log('Accounts response:', JSON.stringify(accountsData).substring(0, 200))

      if (!accountsResponse.ok || !accountsData.accounts) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch accounts', details: accountsData }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Find the location matching the placeId
      // This is a simplified approach - you might need to iterate through accounts
      const accountName = accountsData.accounts[0]?.name

      // Get locations for the account
      const locationsResponse = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const locationsData = await locationsResponse.json()
      console.log('Locations response:', JSON.stringify(locationsData).substring(0, 200))

      const location = locationsData.locations?.find((loc: any) => 
        loc.metadata?.placeId === placeId
      )

      if (!location) {
        return new Response(
          JSON.stringify({ error: 'Location not found for this Place ID' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      // Fetch reviews for this location
      const reviewsResponse = await fetch(
        `https://mybusiness.googleapis.com/v4/${location.name}/reviews`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      const reviewsData = await reviewsResponse.json()
      console.log(`Fetched reviews from My Business API`)

      if (!reviewsResponse.ok) {
        return new Response(
          JSON.stringify({ error: 'Failed to fetch reviews from My Business API', details: reviewsData }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        )
      }

      const reviews = reviewsData.reviews || []
      
      // Transform My Business reviews to our format
      const transformedReviews = reviews.map((review: any, index: number) => ({
        id: `mybusiness_${index}`,
        author_name: review.reviewer?.displayName || 'Anonymous',
        rating: review.starRating === 'FIVE' ? 5 : 
                review.starRating === 'FOUR' ? 4 : 
                review.starRating === 'THREE' ? 3 : 
                review.starRating === 'TWO' ? 2 : 1,
        relative_time_description: new Date(review.createTime).toLocaleDateString('fr-FR'),
        text: review.comment || '',
        time: new Date(review.createTime).getTime() / 1000,
        profile_photo_url: review.reviewer?.profilePhotoUrl || '/placeholder.svg'
      }))

      return new Response(
        JSON.stringify({ 
          reviews: transformedReviews, 
          source: 'google_my_business_api',
          totalReviews: reviews.length 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Fall back to Google Places API
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

    // Construct Google Places API URL with French language parameter
    // Note: Google Places API returns maximum of 5 most helpful reviews by default
    // To get all reviews, we need to use reviews_sort parameter
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&language=fr&reviews_sort=newest&key=${googleApiKey}`
    
    console.log('Fetching reviews from Google Places API...')
    const response = await fetch(apiUrl)
    const data = await response.json()
    
    console.log('API Response status:', data.status)
    
    if (data.status !== 'OK') {
      console.log('Google Places API error:', data.status, data)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch reviews from Google Places API', details: data }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const reviews = data.result.reviews || []
    console.log(`Fetched ${reviews.length} reviews from Google (total ratings: ${data.result.user_ratings_total || 'unknown'})`)
    
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