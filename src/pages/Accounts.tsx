
import React, { useState, useEffect } from 'react';
import { Facebook, Globe, PlusCircle, Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface ConnectedAccount {
  id: string;
  name: string;
  platform: 'meta' | 'google';
  status: 'active' | 'expired';
  connected_at: string;
  account_id: string;
}

const Accounts = () => {
  const { user } = useAuth();
  const [metaAccounts, setMetaAccounts] = useState<ConnectedAccount[]>([]);
  const [googleAccounts, setGoogleAccounts] = useState<ConnectedAccount[]>([]);
  const [isLoadingMeta, setIsLoadingMeta] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  useEffect(() => {
    if (user) {
      fetchConnectedAccounts();
    }
  }, [user]);

  const fetchConnectedAccounts = async () => {
    try {
      const { data: metaData, error: metaError } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('platform', 'meta');

      if (metaError) throw metaError;
      setMetaAccounts(metaData || []);

      const { data: googleData, error: googleError } = await supabase
        .from('connected_accounts')
        .select('*')
        .eq('user_id', user?.id)
        .eq('platform', 'google');

      if (googleError) throw googleError;
      setGoogleAccounts(googleData || []);
    } catch (error) {
      console.error('Error fetching connected accounts:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch connected accounts',
        variant: 'destructive',
      });
    }
  };

  const connectMetaAccount = async () => {
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
      
      window.open(
        authUrl,
        'Meta Authentication',
        `width=${width},height=${height},top=${top},left=${left}`
      );

      // The rest will be handled by the callback page and event listeners
      window.addEventListener('message', handleMetaAuthCallback, false);
    } catch (error) {
      console.error('Error connecting Meta account:', error);
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect your Meta account',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingMeta(false);
    }
  };

  const handleMetaAuthCallback = async (event: MessageEvent) => {
    // Only accept messages from our own domain
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'META_AUTH_SUCCESS') {
      window.removeEventListener('message', handleMetaAuthCallback);
      
      // Process the successful authentication
      const { code } = event.data;
      
      try {
        // Call the edge function to exchange the code for tokens and account info
        const { data, error } = await supabase.functions.invoke('meta-auth-exchange', {
          body: { code, userId: user?.id }
        });
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Meta Ads account connected successfully',
        });
        
        // Refresh the account list
        fetchConnectedAccounts();
      } catch (error) {
        console.error('Error processing Meta auth callback:', error);
        toast({
          title: 'Connection Failed',
          description: 'Failed to process Meta account authentication',
          variant: 'destructive',
        });
      }
    } else if (event.data.type === 'META_AUTH_ERROR') {
      window.removeEventListener('message', handleMetaAuthCallback);
      toast({
        title: 'Connection Failed',
        description: event.data.message || 'Failed to connect your Meta account',
        variant: 'destructive',
      });
    }
  };

  const connectGoogleAccount = async () => {
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
      
      window.open(
        authUrl,
        'Google Authentication',
        `width=${width},height=${height},top=${top},left=${left}`
      );

      // The rest will be handled by the callback page and event listeners
      window.addEventListener('message', handleGoogleAuthCallback, false);
    } catch (error) {
      console.error('Error connecting Google account:', error);
      toast({
        title: 'Connection Failed',
        description: 'Failed to connect your Google Ads account',
        variant: 'destructive',
      });
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleGoogleAuthCallback = async (event: MessageEvent) => {
    // Only accept messages from our own domain
    if (event.origin !== window.location.origin) return;
    
    if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
      window.removeEventListener('message', handleGoogleAuthCallback);
      
      // Process the successful authentication
      const { code } = event.data;
      
      try {
        // Call the edge function to exchange the code for tokens and account info
        const { data, error } = await supabase.functions.invoke('google-auth-exchange', {
          body: { code, userId: user?.id }
        });
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Google Ads account connected successfully',
        });
        
        // Refresh the account list
        fetchConnectedAccounts();
      } catch (error) {
        console.error('Error processing Google auth callback:', error);
        toast({
          title: 'Connection Failed',
          description: 'Failed to process Google Ads account authentication',
          variant: 'destructive',
        });
      }
    } else if (event.data.type === 'GOOGLE_AUTH_ERROR') {
      window.removeEventListener('message', handleGoogleAuthCallback);
      toast({
        title: 'Connection Failed',
        description: event.data.message || 'Failed to connect your Google Ads account',
        variant: 'destructive',
      });
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">Connected Accounts</h1>
          <p className="text-gray-600">Manage your ad platform connections</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Meta Accounts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <Facebook className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Meta Ads</h2>
                  <p className="text-sm text-gray-600">Facebook & Instagram Ads</p>
                </div>
              </div>
              <Button 
                className="bg-brand-blue hover:bg-brand-light-blue" 
                onClick={connectMetaAccount}
                disabled={isLoadingMeta}
              >
                {isLoadingMeta ? (
                  <span className="animate-spin mr-2">⟳</span>
                ) : (
                  <PlusCircle className="h-4 w-4 mr-2" />
                )}
                Connect
              </Button>
            </div>

            {metaAccounts.length > 0 ? (
              <div className="space-y-4">
                {metaAccounts.map(account => (
                  <div key={account.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{account.name}</span>
                          {account.status === 'active' ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Account ID: {account.account_id}</p>
                        <p className="text-xs text-gray-500">Connected on {new Date(account.connected_at).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => disconnectAccount(account.id, 'Meta')}>
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-40 mb-4">
                <p className="text-gray-500">No Meta Ads accounts connected</p>
              </div>
            )}

            <div className="text-sm text-gray-600 mt-4">
              <p>Connect your Meta Ads account to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Create and manage ads across Facebook, Instagram, and Messenger</li>
                <li>Import existing campaigns and assets</li>
                <li>Track performance metrics directly in your dashboard</li>
              </ul>
            </div>
          </div>

          {/* Google Ads Accounts */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-red-100 p-2 rounded-lg mr-4">
                  <Globe className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Google Ads</h2>
                  <p className="text-sm text-gray-600">Search, Display & YouTube Ads</p>
                </div>
              </div>
              <Button 
                className="bg-brand-blue hover:bg-brand-light-blue"
                onClick={connectGoogleAccount}
                disabled={isLoadingGoogle}
              >
                {isLoadingGoogle ? (
                  <span className="animate-spin mr-2">⟳</span>
                ) : (
                  <PlusCircle className="h-4 w-4 mr-2" />
                )}
                Connect
              </Button>
            </div>

            {googleAccounts.length > 0 ? (
              <div className="space-y-4">
                {googleAccounts.map(account => (
                  <div key={account.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium">{account.name}</span>
                          {account.status === 'active' ? (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Active
                            </span>
                          ) : (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Expired
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Account ID: {account.account_id}</p>
                        <p className="text-xs text-gray-500">Connected on {new Date(account.connected_at).toLocaleDateString()}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => disconnectAccount(account.id, 'Google')}>
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-40 mb-4">
                <p className="text-gray-500">No Google Ads accounts connected</p>
              </div>
            )}

            <div className="text-sm text-gray-600 mt-4">
              <p>Connect your Google Ads account to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Create and manage ads across Search, Display, and YouTube</li>
                <li>Import existing campaigns and keywords</li>
                <li>Track performance metrics directly in your dashboard</li>
              </ul>
            </div>
          </div>
        </div>

        {/* API Connection Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-lg font-bold mb-4">API Connection Settings</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta App ID</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-gray-50" 
                  value="632549256232410"
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta App Secret</label>
                <input 
                  type="password" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-gray-50" 
                  value="e4e85d563c2937277530c4c8903531d2"
                  readOnly
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Client ID</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-gray-50" 
                  value="1064857732339-6h58plgjmosj0kbekgo0maall6"
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Client Secret</label>
                <input 
                  type="password" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue bg-gray-50" 
                  value="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"
                  readOnly
                />
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 text-sm text-yellow-800 mt-4">
              <p className="font-medium mb-1">⚠️ Security Notice</p>
              <p>These API keys are displayed for demonstration purposes only. In a production environment, these would be securely stored and managed through server-side integrations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accounts;
