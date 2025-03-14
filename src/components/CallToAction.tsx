
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CallToActionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonLink: string;
  secondaryButtonLink?: string;
  bgColor?: string;
}

const CallToAction = ({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  primaryButtonLink,
  secondaryButtonLink,
  bgColor = 'bg-brand-blue'
}: CallToActionProps) => {
  return (
    <div className={`${bgColor} rounded-xl p-8 md:p-12 text-white text-center`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto opacity-90">{subtitle}</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to={primaryButtonLink}>
          <Button className="bg-white text-brand-blue-text hover:bg-gray-100 px-6 py-2">
            {primaryButtonText}
          </Button>
        </Link>
        {secondaryButtonText && secondaryButtonLink && (
          <Link to={secondaryButtonLink}>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-2">
              {secondaryButtonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CallToAction;
