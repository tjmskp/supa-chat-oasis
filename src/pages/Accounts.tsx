
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AccountLayout from '@/components/accounts/AccountLayout';
import MetaAccountsSection from '@/components/accounts/MetaAccountsSection';
import GoogleAccountsSection from '@/components/accounts/GoogleAccountsSection';
import ApiConnectionSettings from '@/components/accounts/ApiConnectionSettings';
import { useAccountsManagement } from '@/hooks/useAccountsManagement';

const Accounts = () => {
  const { user } = useAuth();
  const {
    metaAccounts,
    googleAccounts,
    isLoadingMeta,
    isLoadingGoogle,
    connectMetaAccount,
    connectGoogleAccount,
    disconnectAccount
  } = useAccountsManagement(user?.id);

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
