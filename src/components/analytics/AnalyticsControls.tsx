
import React from 'react';
import { Button } from '@/components/ui/button';
import { DownloadCloud } from 'lucide-react';
import TimeframeSelector from './TimeframeSelector';
import PlatformFilters from './PlatformFilters';

interface AnalyticsControlsProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const AnalyticsControls = ({ timeframe, onTimeframeChange }: AnalyticsControlsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <TimeframeSelector timeframe={timeframe} onTimeframeChange={onTimeframeChange} />
          <PlatformFilters />
        </div>
        <Button variant="outline" className="flex items-center border-gray-300">
          <DownloadCloud className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsControls;
