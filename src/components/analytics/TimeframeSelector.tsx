
import React from 'react';
import { Button } from '@/components/ui/button';

interface TimeframeSelectorProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector = ({ timeframe, onTimeframeChange }: TimeframeSelectorProps) => {
  return (
    <div className="space-x-2">
      <Button 
        variant={timeframe === '7d' ? "default" : "outline"} 
        size="sm" 
        className={timeframe !== '7d' ? "border-gray-300 text-sm" : "text-sm"}
        onClick={() => onTimeframeChange('7d')}
      >
        Last 7 Days
      </Button>
      <Button 
        variant={timeframe === '30d' ? "default" : "outline"} 
        size="sm" 
        className={timeframe !== '30d' ? "border-gray-300 text-sm" : "text-sm"}
        onClick={() => onTimeframeChange('30d')}
      >
        Last 30 Days
      </Button>
      <Button 
        variant={timeframe === '90d' ? "default" : "outline"} 
        size="sm" 
        className={timeframe !== '90d' ? "border-gray-300 text-sm" : "text-sm"}
        onClick={() => onTimeframeChange('90d')}
      >
        Last 90 Days
      </Button>
    </div>
  );
};

export default TimeframeSelector;
