
import React from 'react';

const ApiConnectionSettings = () => {
  return (
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
  );
};

export default ApiConnectionSettings;
