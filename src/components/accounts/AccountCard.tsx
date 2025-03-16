
import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ConnectedAccount } from './types';

interface AccountCardProps {
  account: ConnectedAccount;
  onDisconnect: (id: string, platform: string) => void;
}

const AccountCard = ({ account, onDisconnect }: AccountCardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
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
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onDisconnect(account.id, account.platform === 'meta' ? 'Meta' : 'Google')}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default AccountCard;
