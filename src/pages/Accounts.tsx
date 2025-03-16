
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import AccountLayout from '@/components/accounts/AccountLayout';
import MetaAccountsSection from '@/components/accounts/MetaAccountsSection';
import GoogleAccountsSection from '@/components/accounts/GoogleAccountsSection';
import ApiConnectionSettings from '@/components/accounts/ApiConnectionSettings';
import { useAccountsManagement } from '@/hooks/useAccountsManagement';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Accounts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    metaAccounts,
    googleAccounts,
    isLoadingMeta,
    isLoadingGoogle,
    connectMetaAccount,
    connectGoogleAccount,
    disconnectAccount
  } = useAccountsManagement(user?.id);

  useEffect(() => {
    // Check for redirect after auth from localStorage
    const redirectAfterAuth = localStorage.getItem('redirectAfterAuth');
    if (redirectAfterAuth) {
      // Clear the redirect flag
      localStorage.removeItem('redirectAfterAuth');
      
      // Show success message
      toast({
        title: 'Authentication Successful',
        description: 'You have been redirected back to your accounts page.',
      });
    }
  }, []);

  // Redirect to sign in if not authenticated
  useEffect(() => {
    if (user === null) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to manage your ad accounts.',
        variant: 'destructive',
      });
      navigate('/signin');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <AccountLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Meta Accounts Section */}
        <MetaAccountsSection
          accounts={metaAccounts}
          isLoading={isLoadingMeta}
          onConnect={connectMetaAccount}
          onDisconnect={disconnectAccount}
        />

        {/* Google Accounts Section */}
        <GoogleAccountsSection
          accounts={googleAccounts}
          isLoading={isLoadingGoogle}
          onConnect={connectGoogleAccount}
          onDisconnect={disconnectAccount}
        />
      </div>

      {/* API Connection Settings Section */}
      <ApiConnectionSettings />
    </AccountLayout>
  );
};

export default Accounts;
