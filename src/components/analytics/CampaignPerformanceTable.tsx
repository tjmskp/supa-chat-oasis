
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table';

interface Campaign {
  name: string;
  platform: string;
  status: 'Active' | 'Scheduled' | 'Ended';
  impressions: number;
  ctr: string;
  conversions: number | string;
  costPerConversion: string;
  spend: string;
}

interface CampaignPerformanceTableProps {
  campaigns: Campaign[];
}

const CampaignPerformanceTable = ({ campaigns }: CampaignPerformanceTableProps) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'Ended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>Conv.</TableHead>
              <TableHead>Cost/Conv.</TableHead>
              <TableHead>Spend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{campaign.platform}</TableCell>
                <TableCell>
                  <span className={`${getStatusBadgeClass(campaign.status)} text-xs font-medium px-2.5 py-0.5 rounded`}>
                    {campaign.status}
                  </span>
                </TableCell>
                <TableCell>{typeof campaign.impressions === 'number' ? campaign.impressions.toLocaleString() : campaign.impressions}</TableCell>
                <TableCell>{campaign.ctr}</TableCell>
                <TableCell>{campaign.conversions}</TableCell>
                <TableCell>{campaign.costPerConversion}</TableCell>
                <TableCell>{campaign.spend}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CampaignPerformanceTable;
