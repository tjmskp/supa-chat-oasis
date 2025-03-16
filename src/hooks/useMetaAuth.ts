
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { ConnectedAccount } from '@/components/accounts/types';

export const useMetaAuth = (userId: string | undefined) => {
  const [metaAccounts, setMetaAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);

  const fetchMetaAccounts = useCallback(async () => {
    if (!userId) return;
    
    try {
      setIsLoadingMeta(true);
      const { data, error } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', userId)
        .eq('platform', 'meta');

      if (error) throw error;
      setMetaAccounts(data as ConnectedAccount[] || []);
    } catch (error) {
      console.error('Error fetching Meta accounts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch Meta accounts',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingMeta(false);
    }
  }, [userId]);

  // Load accounts when userId changes
  useEffect(() => {
    if (userId) {
      fetchMetaAccounts();
    }
  }, [userId, fetchMetaAccounts]);

  const connectMetaAccount = async () => {
    if (!userId) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to connect your Meta account',
        variant: 'destructive',
      });
      return;
    }

    setIsLoadingMeta(true);
    try {
      // Store the current URL to redirect back after auth
      localStorage.setItem('redirectAfterAuth', window.location.pathname);
      
      // Meta Ads API OAuth URL
      const appId = '632549256232410';  // From your configuration
      const redirectUri = `${window.location.origin}/meta-auth-callback`;
      const scope = 'ads_management,ads_read,business_management';
      
      const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&response_type=code`;
      
      // Open popup for authentication
      const width = 600;
      const height = 700;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      const authWindow = window.open(
        authUrl,
        'Meta Authentication',
        `width=${width},height=${height},top=${top},left=${left}`
      );
      
      if (!authWindow) {
        throw new Error('Popup blocked. Please allow popups for this site.');
      }

      // The rest will be handled by the callback page and event listeners
      window.addEventListener('message', handleMetaAuthCallback, false);
    } catch (error) {
      console.error('Error connecting Meta account:', error);
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect your Meta account',
        variant: 'destructive',
      });
      setIsLoadingMeta(false);
    }
  };

  const handleMetaAuthCallback = async (event: MessageEvent) => {
    // Only accept messages from our own domain
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'META_AUTH_SUCCESS') {
      try {
        // Process the successful authentication
        const { code } = event.data;
        
        // Call the edge function to exchange the code for tokens and account info
        const { data, error } = await supabase.functions.invoke('meta-auth-exchange', {
          body: { code, userId }
        });
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Meta Ads account connected successfully',
        });
        
        // Refresh the account list
        fetchMetaAccounts();
      } catch (error) {
        console.error('Error processing Meta auth callback:', error);
        toast({
          title: 'Connection Failed',
          description: 'Failed to process Meta account authentication',
          variant: 'destructive',
        });
      } finally {
        window.removeEventListener('message', handleMetaAuthCallback);
        setIsLoadingMeta(false);
      }
    } else if (event.data.type === 'META_AUTH_ERROR') {
      toast({
        title: 'Connection Failed',
        description: event.data.message || 'Failed to connect your Meta account',
        variant: 'destructive',
      });
      window.removeEventListener('message', handleMetaAuthCallback);
      setIsLoadingMeta(false);
    }
  };

  return {
    metaAccounts,
    isLoadingMeta,
    connectMetaAccount,
    fetchMetaAccounts
  };
};
