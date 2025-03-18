
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { adAccountsService, AdAccountData } from '@/services/adAccountsService';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

// Ensure Google SDK types are available
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initCodeClient: (config: any) => {
            requestCode: () => void;
          };
        };
      };
    };
  }
}

const AdAccountsConnection = () => {
  const [loading, setLoading] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState<AdAccountData>({ meta: [], google: [] });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserAndAccounts = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
          const accounts = await adAccountsService.getConnectedAccounts(user.id);
          setConnectedAccounts(accounts);
        }
      } catch (error) {
        console.error('Error fetching user and accounts:', error);
        toast({
          title: 'Error',
          description: 'Failed to load connected accounts',
          variant: 'destructive',
        });
      }
    };

    fetchUserAndAccounts();
  }, []);

  const handleMetaConnect = async () => {
    try {
      setLoading(true);
      // Initialize Facebook SDK and trigger login
      if (window.FB) {
        window.FB.login(async (response: any) => {
          if (response.authResponse) {
            const { accessToken } = response.authResponse;
            const accounts = await adAccountsService.fetchMetaAdAccounts(accessToken);
            
            if (userId) {
              await adAccountsService.storeConnectedAccount(userId, 'meta', accounts);
              setConnectedAccounts(prev => ({ ...prev, meta: accounts }));
              
              toast({
                title: 'Success',
                description: 'Meta ad accounts connected successfully',
              });
            }
          } else {
            throw new Error('Meta authentication failed');
          }
        }, { scope: 'ads_management,ads_read' });
      } else {
        throw new Error('Facebook SDK not loaded');
      }
    } catch (error: any) {
      console.error('Error connecting Meta account:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect Meta ad accounts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleConnect = async () => {
    try {
      setLoading(true);
      // Initialize Google OAuth client
      if (window.google && window.google.accounts) {
        const client = window.google.accounts.oauth2.initCodeClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
          scope: 'https://www.googleapis.com/auth/adwords',
          callback: async (response: { code: string }) => {
            if (response.code) {
              // Exchange code for access token (implement token exchange in backend)
              const accessToken = await exchangeCodeForToken(response.code);
              const accounts = await adAccountsService.fetchGoogleAdAccounts(accessToken);
              
              if (userId) {
                await adAccountsService.storeConnectedAccount(userId, 'google', accounts);
                setConnectedAccounts(prev => ({ ...prev, google: accounts }));
                
                toast({
                  title: 'Success',
                  description: 'Google Ads accounts connected successfully',
                });
              }
            }
          },
        });
        
        client.requestCode();
      } else {
        throw new Error('Google SDK not loaded');
      }
    } catch (error: any) {
      console.error('Error connecting Google account:', error);
      toast({
        title: 'Error',
        description: 'Failed to connect Google Ads accounts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async (platform: 'meta' | 'google') => {
    try {
      setLoading(true);
      if (userId) {
        await adAccountsService.disconnectAccount(userId, platform);
        setConnectedAccounts(prev => ({
          ...prev,
          [platform]: [],
        }));
        
        toast({
          title: 'Success',
          description: `${platform === 'meta' ? 'Meta' : 'Google Ads'} account disconnected`,
        });
      }
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect account',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meta (Facebook) Ads</CardTitle>
          <CardDescription>
            Connect your Meta ad accounts to analyze performance and get AI-powered suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectedAccounts.meta.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {connectedAccounts.meta.length} account(s) connected
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDisconnect('meta')}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Disconnect Meta Accounts
              </Button>
            </div>
          ) : (
            <Button onClick={handleMetaConnect} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Connect Meta Accounts
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Google Ads</CardTitle>
          <CardDescription>
            Connect your Google Ads accounts to analyze performance and get AI-powered suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {connectedAccounts.google.length > 0 ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {connectedAccounts.google.length} account(s) connected
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDisconnect('google')}
                disabled={loading}
              >
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Disconnect Google Ads
              </Button>
            </div>
          ) : (
            <Button onClick={handleGoogleConnect} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Connect Google Ads
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper function to exchange OAuth code for access token
const exchangeCodeForToken = async (code: string): Promise<string> => {
  // Implement token exchange with your backend
  const response = await fetch('/api/google/exchange-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();
  return data.access_token;
};

export default AdAccountsConnection;
