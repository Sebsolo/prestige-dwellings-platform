import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const error = url.searchParams.get('error')

    if (error) {
      console.error('OAuth error:', error)
      return new Response(
        `<!DOCTYPE html>
        <html>
          <body>
            <script>
              window.opener.postMessage({ type: 'oauth-error', error: '${error}' }, '*');
              window.close();
            </script>
          </body>
        </html>`,
        { headers: { ...corsHeaders, 'Content-Type': 'text/html' } }
      )
    }

    if (!code) {
      throw new Error('No authorization code received')
    }

    const clientId = Deno.env.get('GOOGLE_OAUTH_CLIENT_ID')
    const clientSecret = Deno.env.get('GOOGLE_OAUTH_CLIENT_SECRET')
    const redirectUri = `${url.origin}/functions/v1/googleOAuthCallback`

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId!,
        client_secret: clientSecret!,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    const tokens = await tokenResponse.json()
    console.log('Token exchange successful')

    // Store tokens in database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const authHeader = req.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')
    const { data: { user } } = await supabase.auth.getUser(token)

    if (!user) {
      throw new Error('User not authenticated')
    }

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000)

    // Delete existing tokens for this user
    await supabase
      .from('google_oauth_tokens')
      .delete()
      .eq('user_id', user.id)

    // Insert new tokens
    const { error: insertError } = await supabase
      .from('google_oauth_tokens')
      .insert({
        user_id: user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: expiresAt.toISOString(),
      })

    if (insertError) {
      console.error('Error storing tokens:', insertError)
      throw insertError
    }

    console.log('Tokens stored successfully')

    // Close the popup and notify the parent window
    return new Response(
      `<!DOCTYPE html>
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'oauth-success' }, '*');
            window.close();
          </script>
        </body>
      </html>`,
      { headers: { ...corsHeaders, 'Content-Type': 'text/html' } }
    )
  } catch (error) {
    console.error('Error in OAuth callback:', error)
    return new Response(
      `<!DOCTYPE html>
      <html>
        <body>
          <script>
            window.opener.postMessage({ type: 'oauth-error', error: '${error.message}' }, '*');
            window.close();
          </script>
        </body>
      </html>`,
      { headers: { ...corsHeaders, 'Content-Type': 'text/html' } }
    )
  }
})
