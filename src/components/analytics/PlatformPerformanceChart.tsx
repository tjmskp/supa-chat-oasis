
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface PlatformDataPoint {
  platform: string;
  spend: number;
  conversions: number;
}

interface PlatformPerformanceChartProps {
  data: PlatformDataPoint[];
}

const PlatformPerformanceChart = ({ data }: PlatformPerformanceChartProps) => {
  return (
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
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  );
};

export default PlatformPerformanceChart;
