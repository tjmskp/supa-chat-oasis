
import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Target, MousePointer } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { performanceData, platformData, campaignData } from '@/data/analyticsData';

// Import our new components
import KpiCard from '@/components/analytics/KpiCard';
import AnalyticsControls from '@/components/analytics/AnalyticsControls';
import PerformanceTrendsChart from '@/components/analytics/PerformanceTrendsChart';
import PlatformPerformanceChart from '@/components/analytics/PlatformPerformanceChart';
import CampaignPerformanceTable from '@/components/analytics/CampaignPerformanceTable';

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
        <AnalyticsControls 
          timeframe={timeframe} 
          onTimeframeChange={handleTimeframeChange} 
        />
      </div>

      <div className="container mx-auto max-w-7xl px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard 
            title="Impressions" 
            value="2.4M" 
            change="+12.5%" 
            icon={<Users className="h-4 w-4 text-blue-600" />} 
            iconBgColor="bg-blue-100"
          />
          
          <KpiCard 
            title="Click-through Rate" 
            value="3.2%" 
            change="+0.8%" 
            icon={<MousePointer className="h-4 w-4 text-purple-600" />} 
            iconBgColor="bg-purple-100"
          />
          
          <KpiCard 
            title="Conversions" 
            value="1,840" 
            change="+18.2%" 
            icon={<Target className="h-4 w-4 text-green-600" />} 
            iconBgColor="bg-green-100"
          />
          
          <KpiCard 
            title="Cost per Conversion" 
            value="$12.86" 
            change="-3.2%" 
            icon={<DollarSign className="h-4 w-4 text-amber-600" />} 
            iconBgColor="bg-amber-100"
            isPositiveChange={false}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PerformanceTrendsChart data={performanceData} />
          <PlatformPerformanceChart data={platformData} />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 pb-12">
        <CampaignPerformanceTable campaigns={campaignData} />
      </div>
    </div>
  );
};

export default Analytics;
