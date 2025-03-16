
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import NavBar from '@/components/NavBar';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold">Connected Accounts</h1>
          </div>
          <p className="text-gray-600 mt-1">Manage your ad platform connections</p>
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
