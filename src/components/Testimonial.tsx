
import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
}

const Testimonial = ({ quote, author, role, company }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <p className="text-gray-600 italic mb-4">"{quote}"</p>
      <div className="mt-4">
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-gray-500">{role}, {company}</p>
      </div>
    </div>
  );
};

export default Testimonial;
