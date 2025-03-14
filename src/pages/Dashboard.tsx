
import React from 'react';
import { ArrowLeft, BarChart, Upload, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
              </Link>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <Button className="bg-brand-blue hover:bg-brand-light-blue text-white">
              Create Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto max-w-7xl py-6 px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center space-x-1 md:space-x-4">
            <Link to="/dashboard" className="flex items-center px-4 py-2 rounded-md bg-white shadow-sm border border-gray-200">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              <span>Create Ads</span>
            </Link>
            <Link to="/dashboard/media" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 rounded-md">
              <Upload className="h-5 w-5 mr-2" />
              <span>Media</span>
            </Link>
            <Link to="/dashboard/accounts" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 rounded-md">
              <Users className="h-5 w-5 mr-2" />
              <span>Accounts</span>
            </Link>
            <Link to="/dashboard/analytics" className="flex items-center px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm hover:border hover:border-gray-200 rounded-md">
              <BarChart className="h-5 w-5 mr-2" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Create Ad Content */}
      <div className="container mx-auto max-w-7xl px-4 pb-10">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Create Ad Content</h2>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-gray-300 text-gray-600">
                Meta Ads
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-600">
                Google Ads
              </Button>
              <Button variant="ghost" className="text-gray-600">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Headline Field */}
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="font-medium text-gray-700">Headline</label>
                <div className="ml-2 text-gray-400 cursor-help">ⓘ</div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" 
                  placeholder="Transform Your Digital Ads Today"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-blue">
                  ✨ Generate
                </button>
              </div>
              <p className="text-sm text-gray-500">32/40 characters</p>
            </div>

            {/* Primary Text Field */}
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="font-medium text-gray-700">Primary Text</label>
                <div className="ml-2 text-gray-400 cursor-help">ⓘ</div>
              </div>
              <div className="relative">
                <textarea 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue h-24" 
                  placeholder="Our AI-powered platform analyzes your business and target audience to create optimized ads that convert. Connect your accounts and let our technology do the work."
                ></textarea>
                <button className="absolute right-3 top-6 text-brand-blue">
                  ✨ Generate
                </button>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                162/125 characters
                <span className="ml-2 text-red-500 text-xs">
                  ⚠️ Exceeds limit
                </span>
              </p>
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="font-medium text-gray-700">Description</label>
                <div className="ml-2 text-gray-400 cursor-help">ⓘ</div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" 
                  placeholder="AI-optimized for better targeting and conversions"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-blue">
                  ✨ Generate
                </button>
              </div>
              <p className="text-sm text-gray-500 flex items-center">
                49/30 characters
                <span className="ml-2 text-red-500 text-xs">
                  ⚠️ Exceeds limit
                </span>
              </p>
            </div>

            {/* Platform Guidelines */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold mb-2">Platform Guidelines</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Headlines should be 40 characters or less</li>
                <li>Primary text works best at 125 characters or less</li>
                <li>Avoid using excessive capital letters and punctuation</li>
                <li>Ensure your content complies with Meta's advertising policies</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-4">
              <Button variant="outline" className="border-gray-300 text-gray-600">
                Reset All
              </Button>
              <Button className="bg-brand-blue hover:bg-brand-light-blue text-white">
                Save Ad Content
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
