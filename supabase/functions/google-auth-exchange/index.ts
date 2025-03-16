
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID') || '1064857732339-6h58plgjmosj0kbekgo0maall6';
const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET') || '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';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the request body
    const { code, userId } = await req.json();

    if (!code || !userId) {
      return new Response(
        JSON.stringify({ error: "Code and userId are required" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Get the redirect URI from request or use default
    const redirectUri = `${new URL(req.url).origin.replace('functions', 'app')}/google-auth-callback`;

    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: googleClientId,
        client_secret: googleClientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error("Google token exchange error:", tokenData);
      return new Response(
        JSON.stringify({ error: "Failed to exchange code for token", details: tokenData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { access_token, refresh_token, expires_in } = tokenData;

    // Get user's info
    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userInfo = await userInfoResponse.json();

    // For this example, we'll create a dummy account since Google Ads API requires additional setup
    // In a real implementation, you would call the Google Ads API here
    
    // Check if account is already connected
    const { data: existingAccount, error: lookupError } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', userId)
      .eq('platform', 'google')
      .eq('account_id', userInfo.id);

    if (lookupError) {
      console.error("Database lookup error:", lookupError);
    }

    // If account doesn't exist, insert it
    if (!existingAccount?.length) {
      const { error: insertError } = await supabase
        .from('connected_accounts')
        .insert({
          user_id: userId,
          platform: 'google',
          name: userInfo.name || userInfo.email || 'Google Ads Account',
          account_id: userInfo.id,
          status: 'active',
          auth_token: access_token,
          refresh_token: refresh_token,
          token_expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
          connected_at: new Date().toISOString()
        });

      if (insertError) {
        console.error("Database insert error:", insertError);
      }
    } else {
      // If account exists, update it
      const { error: updateError } = await supabase
        .from('connected_accounts')
        .update({
          name: userInfo.name || userInfo.email || 'Google Ads Account',
          status: 'active',
          auth_token: access_token,
          refresh_token: refresh_token,
          token_expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
          connected_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('platform', 'google')
        .eq('account_id', userInfo.id);

      if (updateError) {
        console.error("Database update error:", updateError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        accountConnected: true
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
