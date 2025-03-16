
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useMetaAuth } from './useMetaAuth';
import { useGoogleAuth } from './useGoogleAuth';

export const useAccountsManagement = (userId: string | undefined) => {
  const { 
    metaAccounts, 
    isLoadingMeta, 
    connectMetaAccount, 
    fetchMetaAccounts 
  } = useMetaAuth(userId);
  
  const { 
    googleAccounts, 
    isLoadingGoogle, 
    connectGoogleAccount, 
    fetchGoogleAccounts 
  } = useGoogleAuth(userId);

  useEffect(() => {
    if (userId) {
      fetchConnectedAccounts();
    }
  }, [userId]);

  const fetchConnectedAccounts = async () => {
    fetchMetaAccounts();
    fetchGoogleAccounts();
  };

  const disconnectAccount = async (id: string, platform: string) => {
    try {
      const { error } = await supabase
        .from('connected_accounts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({
        title: 'Account Disconnected',
        description: `${platform} account disconnected successfully`,
      });
      
      // Refresh the account list
      fetchConnectedAccounts();
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast({
        title: 'Error',
        description: 'Failed to disconnect account',
        variant: 'destructive',
      });
    }
  };

  return {
    metaAccounts,
    googleAccounts,
    isLoadingMeta,
    isLoadingGoogle,
    connectMetaAccount,
    connectGoogleAccount,
    disconnectAccount
  };
};
