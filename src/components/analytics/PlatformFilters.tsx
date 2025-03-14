
import React from 'react';
import { Button } from '@/components/ui/button';

const PlatformFilters = () => {
  return (
    <div className="space-x-2">
      <Button variant="outline" size="sm" className="border-gray-300 text-sm">Meta Ads</Button>
      <Button variant="outline" size="sm" className="border-gray-300 text-sm">Google Ads</Button>
      <Button variant="outline" size="sm" className="border-gray-300 text-sm">All Campaigns</Button>
    </div>
  );
};

export default PlatformFilters;
