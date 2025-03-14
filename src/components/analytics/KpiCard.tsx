
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBgColor: string;
  isPositiveChange?: boolean;
}

const KpiCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  iconBgColor, 
  isPositiveChange = true 
}: KpiCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`${iconBgColor} p-2 rounded-full`}>
          {icon}
        </div>
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold">{value}</span>
        <span className={`ml-2 text-sm ${isPositiveChange ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          <TrendingUp className={`h-3 w-3 mr-1 ${!isPositiveChange ? 'transform rotate-180' : ''}`} />
          {change}
        </span>
      </div>
    </div>
  );
};

export default KpiCard;
