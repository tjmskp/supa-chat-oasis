
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

const metaAppId = Deno.env.get('META_APP_ID') || '632549256232410';
const metaAppSecret = Deno.env.get('META_APP_SECRET') || 'e4e85d563c2937277530c4c8903531d2';

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
    const redirectUri = `${new URL(req.url).origin.replace('functions', 'app')}/meta-auth-callback`;

    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v18.0/oauth/access_token?client_id=${metaAppId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${metaAppSecret}&code=${code}`,
      { method: 'GET' }
    );

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      console.error("Facebook token exchange error:", tokenData);
      return new Response(
        JSON.stringify({ error: "Failed to exchange code for token", details: tokenData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const { access_token, expires_in } = tokenData;

    // Get user's ad accounts
    const adAccountsResponse = await fetch(
      `https://graph.facebook.com/v18.0/me/adaccounts?fields=name,account_id,account_status&access_token=${access_token}`,
      { method: 'GET' }
    );

    const adAccountsData = await adAccountsResponse.json();
    
    if (adAccountsData.error) {
      console.error("Facebook ad accounts fetch error:", adAccountsData);
      return new Response(
        JSON.stringify({ error: "Failed to fetch ad accounts", details: adAccountsData }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Process and save each ad account
    for (const account of adAccountsData.data) {
      // Check if account is already connected
      const { data: existingAccount, error: lookupError } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('platform', 'meta')
        .eq('account_id', account.account_id);

      if (lookupError) {
        console.error("Database lookup error:", lookupError);
      }

      // If account doesn't exist, insert it
      if (!existingAccount?.length) {
        const { error: insertError } = await supabase
          .from('connected_accounts')
          .insert({
            user_id: userId,
            platform: 'meta',
            name: account.name,
            account_id: account.account_id,
            status: account.account_status === 1 ? 'active' : 'expired',
            auth_token: access_token,
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
            name: account.name,
            status: account.account_status === 1 ? 'active' : 'expired',
            auth_token: access_token,
            token_expires_at: new Date(Date.now() + expires_in * 1000).toISOString(),
            connected_at: new Date().toISOString()
          })
          .eq('user_id', userId)
          .eq('platform', 'meta')
          .eq('account_id', account.account_id);

        if (updateError) {
          console.error("Database update error:", updateError);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        accountsConnected: adAccountsData.data.length
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
