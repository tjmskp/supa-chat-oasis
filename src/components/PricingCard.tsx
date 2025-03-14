
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: PricingFeature[];
  ctaText: string;
  popular?: boolean;
  onCtaClick?: () => void;
}

const PricingCard = ({
  title,
  price,
  period,
  features,
  ctaText,
  popular = false,
  onCtaClick
}: PricingCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${popular ? 'border-2 border-brand-blue' : 'border border-gray-200'}`}>
      {popular && (
        <div className="bg-brand-blue text-white text-center py-1 text-sm">
          MOST POPULAR
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <div className="mb-4">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-gray-500 ml-1">/{period}</span>
        </div>
        <Button 
          onClick={onCtaClick} 
          className={`w-full mb-6 ${popular ? 'bg-brand-blue hover:bg-brand-light-blue' : 'bg-gray-800 hover:bg-gray-700'}`}
        >
          {ctaText}
        </Button>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
              <span className={feature.included ? 'text-gray-700' : 'text-gray-400 line-through'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PricingCard;
