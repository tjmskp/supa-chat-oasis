
import React, { useState } from 'react';
import { Facebook, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectedAccount } from './types';
import AccountCard from './AccountCard';

interface MetaAccountsSectionProps {
  accounts: ConnectedAccount[];
  isLoading: boolean;
  onConnect: () => void;
  onDisconnect: (id: string, platform: string) => void;
}

const MetaAccountsSection = ({ 
  accounts, 
  isLoading, 
  onConnect, 
  onDisconnect 
}: MetaAccountsSectionProps) => {
  return (
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
          onClick={onConnect}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin mr-2">⟳</span>
          ) : (
            <PlusCircle className="h-4 w-4 mr-2" />
          )}
          Connect
        </Button>
      </div>

      {accounts.length > 0 ? (
        <div className="space-y-4">
          {accounts.map(account => (
            <AccountCard 
              key={account.id} 
              account={account} 
              onDisconnect={onDisconnect} 
            />
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
  );
};

export default MetaAccountsSection;
