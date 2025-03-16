
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { ConnectedAccount } from '@/components/accounts/types';

export const useGoogleAuth = (userId: string | undefined) => {
  const [googleAccounts, setGoogleAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const fetchGoogleAccounts = useCallback(async () => {
    if (!userId) return;
    
    try {
      setIsLoadingGoogle(true);
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('platform', 'google');

      if (error) throw error;
      setGoogleAccounts(data as ConnectedAccount[] || []);
    } catch (error) {
      console.error('Error fetching Google accounts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch Google accounts',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  }, [userId]);

  // Load accounts when userId changes
  useEffect(() => {
    if (userId) {
      fetchGoogleAccounts();
    }
  }, [userId, fetchGoogleAccounts]);

  const connectGoogleAccount = async () => {
    if (!userId) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to connect your Google account',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingGoogle(true);
    try {
      // Store the current URL to redirect back after auth
      localStorage.setItem('redirectAfterAuth', window.location.pathname);
      
      // Google Ads API OAuth URL
      const clientId = '1064857732339-6h58plgjmosj0kbekgo0maall6';  // From your configuration
      const redirectUri = `${window.location.origin}/google-auth-callback`;
      const scope = 'https://www.googleapis.com/auth/adwords';
      
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code&access_type=offline&prompt=consent`;
      
      // Open popup for authentication
      const width = 600;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      const authWindow = window.open(
        authUrl,
        'Google Authentication',
        `width=${width},height=${height},top=${top},left=${left}`
      );
      
      if (!authWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // The rest will be handled by the callback page and event listeners
      window.addEventListener('message', handleGoogleAuthCallback, false);
    } catch (error) {
      console.error('Error connecting Google account:', error);
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect your Google Ads account',
        variant: 'destructive',
      });
      setIsLoadingGoogle(false);
    }
  };

  const handleGoogleAuthCallback = async (event: MessageEvent) => {
    // Only accept messages from our own domain
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
      try {
        // Process the successful authentication
        const { code } = event.data;
        
        // Call the edge function to exchange the code for tokens and account info
        const { data, error } = await supabase.functions.invoke('google-auth-exchange', {
          body: { code, userId }
        });
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Google Ads account connected successfully',
        });
        
        // Refresh the account list
        fetchGoogleAccounts();
      } catch (error) {
        console.error('Error processing Google auth callback:', error);
        toast({
          title: 'Connection Failed',
          description: 'Failed to process Google Ads account authentication',
          variant: 'destructive',
        });
      } finally {
        window.removeEventListener('message', handleGoogleAuthCallback);
        setIsLoadingGoogle(false);
      }
    } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
      toast({
        title: 'Connection Failed',
        description: event.data.message || 'Failed to connect your Google Ads account',
        variant: 'destructive',
      });
      window.removeEventListener('message', handleGoogleAuthCallback);
      setIsLoadingGoogle(false);
    }
  };

  return {
    googleAccounts,
    isLoadingGoogle,
    connectGoogleAccount,
    fetchGoogleAccounts
  };
};
