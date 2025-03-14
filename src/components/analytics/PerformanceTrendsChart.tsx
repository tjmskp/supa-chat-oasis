
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

interface PerformanceTrendsChartProps {
  data: ChartDataPoint[];
}

const PerformanceTrendsChart = ({ data }: PerformanceTrendsChartProps) => {
  return (
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
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  );
};

export default PerformanceTrendsChart;
