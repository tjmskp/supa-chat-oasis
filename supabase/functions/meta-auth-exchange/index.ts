
// Meta Auth Exchange Function
// This function exchanges an authorization code for access tokens
// and stores the connected account information in the database

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

console.log("Meta Auth Exchange Function: INITIALIZED");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get request body
    const { code, userId } = await req.json();
    
    // Validate inputs
    if (!code) {
      throw new Error("Missing authorization code");
    }

    if (!userId) {
      throw new Error("Missing user ID");
    }

    console.log(`Processing Meta auth for user: ${userId}`);
    console.log(`Received auth code: ${code.substring(0, 5)}...`);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get Meta app credentials
    const appId = "632549256232410";
    const appSecret = Deno.env.get("632549256232410") ?? "";
    const redirectUri = `${req.headers.get("origin")}/meta-auth-callback`;

    console.log(`Redirect URI: ${redirectUri}`);

    // Exchange code for access token
    const tokenUrl = "https://graph.facebook.com/v18.0/oauth/access_token";
    const tokenParams = new URLSearchParams({
      client_id: appId,
      client_secret: appSecret,
      redirect_uri: redirectUri,
      code: code,
    });

    console.log("Exchanging code for token...");
    const tokenResponse = await fetch(`${tokenUrl}?${tokenParams.toString()}`, {
      method: "GET",
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      console.error("Token exchange failed:", error);
      throw new Error(`Failed to exchange token: ${error}`);
    }

    const tokenData = await tokenResponse.json();
    console.log("Received token data");

    // Get account info using the token
    const graphUrl = "https://graph.facebook.com/v18.0/me/adaccounts";
    const graphParams = new URLSearchParams({
      access_token: tokenData.access_token,
      fields: "name,account_id,account_status",
    });

    console.log("Fetching ad accounts...");
    const accountsResponse = await fetch(`${graphUrl}?${graphParams.toString()}`, {
      method: "GET",
    });

    if (!accountsResponse.ok) {
      const error = await accountsResponse.text();
      console.error("Account fetch failed:", error);
      throw new Error(`Failed to fetch ad accounts: ${error}`);
    }

    const accountsData = await accountsResponse.json();
    console.log(`Found ${accountsData.data?.length || 0} ad accounts`);

    // Process and store each ad account
    if (accountsData.data && accountsData.data.length > 0) {
      for (const account of accountsData.data) {
        const accountId = account.account_id;
        const accountName = account.name;
        const status = account.account_status === 1 ? "active" : "inactive";

        console.log(`Processing account: ${accountName} (${accountId})`);

        // Store the account in the database
        const { error } = await supabase
          .from("connected_accounts")
          .upsert({
            user_id: userId,
            platform: "meta",
            name: accountName,
            account_id: accountId,
            status: status,
            auth_token: tokenData.access_token,
            token_expires_at: new Date(Date.now() + tokenData.expires_in * 1000).toISOString(),
            connected_at: new Date().toISOString(),
          }, { onConflict: "user_id, platform, account_id" });

        if (error) {
          console.error(`Error storing account ${accountId}:`, error);
        } else {
          console.log(`Successfully stored account ${accountId}`);
        }
      }
    } else {
      console.log("No ad accounts found");
    }

    return new Response(
      JSON.stringify({ success: true, accountsCount: accountsData.data?.length || 0 }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Function error:", error.message);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
