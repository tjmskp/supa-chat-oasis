
import React from 'react';
import { Facebook, Globe, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Accounts = () => {
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
              <Button className="bg-brand-blue hover:bg-brand-light-blue">
                <PlusCircle className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-40 mb-4">
              <p className="text-gray-500">No Meta Ads accounts connected</p>
            </div>

            <div className="text-sm text-gray-600">
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
              <Button className="bg-brand-blue hover:bg-brand-light-blue">
                <PlusCircle className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-center h-40 mb-4">
              <p className="text-gray-500">No Google Ads accounts connected</p>
            </div>

            <div className="text-sm text-gray-600">
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
