
import React from 'react';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
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
        {children}
      </div>
    </div>
  );
};

export default AccountLayout;
