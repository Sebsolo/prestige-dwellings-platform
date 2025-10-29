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
    const clientId = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    
    const redirectUri = `${supabaseUrl}/functions/v1/googleOAuthCallback`
    
    console.log('OAuth Configuration:')
    console.log('- Client ID:', clientId?.substring(0, 20) + '...')
    console.log('- Redirect URI:', redirectUri)
    
    // Google My Business API scopes
    const scopes = [
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/plus.business.manage',
    ].join(' ')

    const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
    authUrl.searchParams.set('client_id', clientId!)
    authUrl.searchParams.set('redirect_uri', redirectUri)
    authUrl.searchParams.set('response_type', 'code')
    authUrl.searchParams.set('scope', scopes)
    authUrl.searchParams.set('access_type', 'offline')
    authUrl.searchParams.set('prompt', 'consent')

    console.log('Generated auth URL:', authUrl.toString())

    return new Response(
      JSON.stringify({ authUrl: authUrl.toString(), redirectUri }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  } catch (error) {
    console.error('Error initiating OAuth:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
