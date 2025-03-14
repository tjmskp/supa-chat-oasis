
import React, { useState } from 'react';
import { ArrowLeft, Image, Upload, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

const CreateAd = () => {
  const [adTitle, setAdTitle] = useState('');
  const [adPlatform, setAdPlatform] = useState('meta');
  const [adObjective, setAdObjective] = useState('');
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center text-gray-500 hover:text-gray-700 mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-2xl font-bold ml-4">Create New Ad</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-7xl py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Ad Setup Form */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6">Ad Setup</h2>
            
            <div className="space-y-6 max-w-3xl">
              {/* Ad Title */}
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Ad Title</label>
                <input 
                  type="text" 
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" 
                  placeholder="Summer Sale Campaign"
                />
              </div>
              
              {/* Platform Selection */}
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Platform</label>
                <div className="flex space-x-4">
                  <Button 
                    variant={adPlatform === 'meta' ? 'default' : 'outline'} 
                    className={adPlatform === 'meta' ? 'bg-brand-blue hover:bg-brand-light-blue' : 'border-gray-300'} 
                    onClick={() => setAdPlatform('meta')}
                  >
                    Meta Ads
                  </Button>
                  <Button 
                    variant={adPlatform === 'google' ? 'default' : 'outline'} 
                    className={adPlatform === 'google' ? 'bg-brand-blue hover:bg-brand-light-blue' : 'border-gray-300'} 
                    onClick={() => setAdPlatform('google')}
                  >
                    Google Ads
                  </Button>
                </div>
              </div>
              
              {/* Ad Objective */}
              <div className="space-y-2">
                <label className="block font-medium text-gray-700">Campaign Objective</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-md p-4 cursor-pointer hover:border-brand-blue hover:shadow-sm ${adObjective === 'awareness' ? 'border-brand-blue ring-2 ring-brand-blue ring-opacity-50' : 'border-gray-200'}`} 
                    onClick={() => setAdObjective('awareness')}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">Brand Awareness</h3>
                      {adObjective === 'awareness' && (
                        <div className="bg-brand-blue text-white p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Increase recognition for your brand</p>
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer hover:border-brand-blue hover:shadow-sm ${adObjective === 'traffic' ? 'border-brand-blue ring-2 ring-brand-blue ring-opacity-50' : 'border-gray-200'}`} 
                    onClick={() => setAdObjective('traffic')}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">Traffic</h3>
                      {adObjective === 'traffic' && (
                        <div className="bg-brand-blue text-white p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Drive visits to your website or app</p>
                  </div>
                  
                  <div 
                    className={`border rounded-md p-4 cursor-pointer hover:border-brand-blue hover:shadow-sm ${adObjective === 'conversion' ? 'border-brand-blue ring-2 ring-brand-blue ring-opacity-50' : 'border-gray-200'}`} 
                    onClick={() => setAdObjective('conversion')}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">Conversions</h3>
                      {adObjective === 'conversion' && (
                        <div className="bg-brand-blue text-white p-1 rounded-full">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Get people to take action on your site</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ad Content Tabs */}
          <Tabs defaultValue="creative" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="creative">Ad Creative</TabsTrigger>
              <TabsTrigger value="audience">Audience</TabsTrigger>
              <TabsTrigger value="budget">Budget & Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="creative" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Text Content */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Ad Text</h3>
                  
                  {/* Headline */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-medium text-gray-700">Headline</label>
                      <Button size="sm" variant="ghost" className="text-brand-blue text-sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" 
                      placeholder="Enter a compelling headline"
                    />
                    <p className="text-xs text-gray-500">0/40 characters</p>
                  </div>
                  
                  {/* Primary Text */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-medium text-gray-700">Primary Text</label>
                      <Button size="sm" variant="ghost" className="text-brand-blue text-sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                    <textarea 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue h-24" 
                      placeholder="Describe your offer clearly"
                    ></textarea>
                    <p className="text-xs text-gray-500">0/125 characters</p>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-medium text-gray-700">Description</label>
                      <Button size="sm" variant="ghost" className="text-brand-blue text-sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Generate
                      </Button>
                    </div>
                    <input 
                      type="text" 
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-blue focus:border-brand-blue" 
                      placeholder="Additional information"
                    />
                    <p className="text-xs text-gray-500">0/30 characters</p>
                  </div>
                </div>
                
                {/* Right Column - Media */}
                <div className="space-y-6">
                  <h3 className="font-semibold text-lg">Ad Media</h3>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-100 p-3 rounded-full mb-4">
                        <Image className="h-6 w-6 text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                      <Button className="bg-brand-blue hover:bg-brand-light-blue flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Media
                      </Button>
                      <p className="mt-2 text-xs text-gray-500">Supported formats: JPG, PNG, MP4</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="font-medium mb-2">Media Guidelines</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Images: 1080 x 1080px recommended (1:1 ratio)</li>
                      <li>• Text should occupy less than
                      20% of the image</li>
                      <li>• Videos: 15-30 seconds for best engagement</li>
                      <li>• Maximum file size: 30MB</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="audience" className="space-y-6">
              <h3 className="font-semibold text-lg">Audience Targeting</h3>
              <p className="text-gray-600 mb-6">Define who you want to see your ad</p>
              
              {/* Audience content would go here */}
              <div className="border border-gray-200 rounded-md p-6 bg-gray-50 flex items-center justify-center h-64">
                <p className="text-gray-400">Audience targeting options will appear here</p>
              </div>
            </TabsContent>
            
            <TabsContent value="budget" className="space-y-6">
              <h3 className="font-semibold text-lg">Budget & Schedule</h3>
              <p className="text-gray-600 mb-6">Set your spending limits and campaign duration</p>
              
              {/* Budget content would go here */}
              <div className="border border-gray-200 rounded-md p-6 bg-gray-50 flex items-center justify-center h-64">
                <p className="text-gray-400">Budget and schedule options will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Action Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200 mt-8">
            <Button variant="outline" className="border-gray-300">
              Save as Draft
            </Button>
            <div className="space-x-4">
              <Button variant="outline" className="border-gray-300">
                Preview
              </Button>
              <Button className="bg-brand-blue hover:bg-brand-light-blue">
                Create Ad
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAd;
