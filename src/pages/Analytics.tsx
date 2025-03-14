import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, DownloadCloud, BarChart2, TrendingUp, Users, DollarSign, Target, MousePointer } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const performanceData = [
  { date: 'Jan', impressions: 3000, clicks: 1400, conversions: 240 },
  { date: 'Feb', impressions: 4000, clicks: 1800, conversions: 320 },
  { date: 'Mar', impressions: 5000, clicks: 2200, conversions: 380 },
  { date: 'Apr', impressions: 7000, clicks: 2600, conversions: 420 },
  { date: 'May', impressions: 6000, clicks: 2400, conversions: 380 },
  { date: 'Jun', impressions: 8000, clicks: 3000, conversions: 500 },
  { date: 'Jul', impressions: 9000, clicks: 3500, conversions: 600 },
];

const platformData = [
  { platform: 'Facebook', spend: 4200, conversions: 380 },
  { platform: 'Instagram', spend: 3800, conversions: 280 },
  { platform: 'Google Search', spend: 5100, conversions: 420 },
  { platform: 'Google Display', spend: 2900, conversions: 180 },
  { platform: 'YouTube', spend: 1800, conversions: 120 },
];

const Analytics = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [timeframe, setTimeframe] = useState('30d');

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('profiles').select('count');
        
        if (error) throw error;
        
        console.log('Connected to Supabase successfully');
        toast({
          title: "Analytics Ready",
          description: "Connected to data sources successfully",
        });
      } catch (error) {
        console.error('Supabase connection error:', error);
        toast({
          title: "Connection Issue",
          description: "Could not connect to analytics data source",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkSupabaseConnection();
  }, [toast]);

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    toast({
      title: "Timeframe Updated",
      description: `Showing data for the last ${newTimeframe === '7d' ? '7 days' : newTimeframe === '30d' ? '30 days' : '90 days'}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Track and optimize your ad performance</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl py-6 px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="space-x-2">
                <Button 
                  variant={timeframe === '7d' ? "default" : "outline"} 
                  size="sm" 
                  className={timeframe !== '7d' ? "border-gray-300 text-sm" : "text-sm"}
                  onClick={() => handleTimeframeChange('7d')}
                >
                  Last 7 Days
                </Button>
                <Button 
                  variant={timeframe === '30d' ? "default" : "outline"} 
                  size="sm" 
                  className={timeframe !== '30d' ? "border-gray-300 text-sm" : "text-sm"}
                  onClick={() => handleTimeframeChange('30d')}
                >
                  Last 30 Days
                </Button>
                <Button 
                  variant={timeframe === '90d' ? "default" : "outline"} 
                  size="sm" 
                  className={timeframe !== '90d' ? "border-gray-300 text-sm" : "text-sm"}
                  onClick={() => handleTimeframeChange('90d')}
                >
                  Last 90 Days
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" className="border-gray-300 text-sm">Meta Ads</Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-sm">Google Ads</Button>
                <Button variant="outline" size="sm" className="border-gray-300 text-sm">All Campaigns</Button>
              </div>
            </div>
            <Button variant="outline" className="flex items-center border-gray-300">
              <DownloadCloud className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Impressions</span>
              <div className="bg-blue-100 p-2 rounded-full">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">2.4M</span>
              <span className="ml-2 text-sm text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Click-through Rate</span>
              <div className="bg-purple-100 p-2 rounded-full">
                <MousePointer className="h-4 w-4 text-purple-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">3.2%</span>
              <span className="ml-2 text-sm text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.8%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Conversions</span>
              <div className="bg-green-100 p-2 rounded-full">
                <Target className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">1,840</span>
              <span className="ml-2 text-sm text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +18.2%
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Cost per Conversion</span>
              <div className="bg-amber-100 p-2 rounded-full">
                <DollarSign className="h-4 w-4 text-amber-600" />
              </div>
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold">$12.86</span>
              <span className="ml-2 text-sm text-red-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
                -3.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Performance Trends</h2>
                <p className="text-sm text-gray-600">Impressions, clicks and conversions over time</p>
              </div>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="impressions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="clicks" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="conversions" stackId="3" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold">Platform Performance</h2>
                <p className="text-sm text-gray-600">Comparing spend and results across platforms</p>
              </div>
              <BarChart2 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="spend" fill="#8884d8" name="Ad Spend ($)" />
                  <Bar yAxisId="right" dataKey="conversions" fill="#82ca9d" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">Campaign Performance</h2>
              <p className="text-sm text-gray-600">Detailed metrics for all active campaigns</p>
            </div>
            <Button variant="outline" className="border-gray-300 text-sm">
              View All Campaigns
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impressions</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conv.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost/Conv.</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Summer Sale 2023</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Facebook</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">485,291</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3.8%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">423</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$12.32</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$5,211.36</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">New Product Launch</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Google</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">328,582</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">4.2%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">312</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$14.87</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$4,639.44</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Brand Awareness Q3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Instagram</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Active</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">642,104</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">2.9%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">287</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$11.58</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$3,323.46</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Holiday Special</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">YouTube</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Scheduled</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$0.00</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Spring Collection</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Google</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Ended</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">582,943</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">3.4%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">498</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$10.24</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$5,099.52</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
