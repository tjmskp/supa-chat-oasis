
import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
}

const Feature = ({ icon, title, description, iconBgColor = 'bg-blue-100' }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className={`${iconBgColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Feature;
