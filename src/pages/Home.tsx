
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Globe, BarChart3, Layers, Image, Target, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Feature from '@/components/Feature';
import Testimonial from '@/components/Testimonial';
import PricingCard from '@/components/PricingCard';
import CallToAction from '@/components/CallToAction';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-brand-blue text-sm px-4 py-1 rounded-full mb-6">
              ✨ Experience digital ad creation reimagined
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Create better ads with<br />
              <span className="text-brand-blue">AI precision</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Revolutionize your digital marketing strategy with our AI-powered assistant. Connect your 
              accounts, upload media, and let our platform create optimized ads that convert - all with a 
              simple, intuitive workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/get-started-free">
                <Button className="bg-brand-blue hover:bg-brand-light-blue text-white px-8 py-6 text-lg rounded-md">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/how-it-works" className="flex items-center text-gray-600 hover:text-gray-900">
                <span>Take a Tour & Watch</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Feature 
              icon={<Zap className="h-6 w-6 text-blue-600" />} 
              title="AI-Powered Creation" 
              description="Generate high-converting ad copy and visuals with cutting-edge AI technology."
              iconBgColor="bg-blue-100"
            />
            <Feature 
              icon={<Globe className="h-6 w-6 text-purple-600" />} 
              title="Cross-Platform Management" 
              description="Manage Meta and Google Ads from a single dashboard."
              iconBgColor="bg-purple-100"
            />
            <Feature 
              icon={<BarChart3 className="h-6 w-6 text-green-600" />} 
              title="Smart Optimization" 
              description="Our intelligent algorithms continuously optimize ad performance in real-time."
              iconBgColor="bg-green-100"
            />
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Transform Your Digital<br />
              <span className="text-brand-blue">Advertising</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines AI intelligence with campaign-specific optimization to help you 
              create high-performing ads that reach your target audience effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              icon={<Zap className="h-6 w-6 text-blue-600" />} 
              title="AI-Powered Copy Generation" 
              description="Create compelling headlines, primary text, and descriptions with our advanced language processing that analyzes your products and audience."
              iconBgColor="bg-blue-100"
            />
            <Feature 
              icon={<Target className="h-6 w-6 text-purple-600" />} 
              title="Smart Audience Targeting" 
              description="Identify and target your ideal customers through intelligent audience analysis based on platform data and your business goals."
              iconBgColor="bg-purple-100"
            />
            <Feature 
              icon={<LineChart className="h-6 w-6 text-green-600" />} 
              title="Performance Analytics" 
              description="Track and analyze your ad performance in real-time with comprehensive reporting that helps you optimize your campaigns for better results."
              iconBgColor="bg-green-100"
            />
            <Feature 
              icon={<Globe className="h-6 w-6 text-cyan-600" />} 
              title="Cross-Platform Management" 
              description="Seamlessly manage campaigns across Meta and Google Ads from a unified dashboard, saving time and improving workflow efficiency."
              iconBgColor="bg-cyan-100"
            />
            <Feature 
              icon={<Image className="h-6 w-6 text-amber-600" />} 
              title="Asset Optimization" 
              description="Upload media files and get AI recommendations on how to optimize them for better engagement and conversion rates."
              iconBgColor="bg-amber-100"
            />
            <Feature 
              icon={<Layers className="h-6 w-6 text-rose-600" />} 
              title="Quick Ad Generation" 
              description="Receive optimized ad creatives in minutes, allowing your business to rapidly test and iterate with unique, high-converting ad variations."
              iconBgColor="bg-rose-100"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Are Saying</h2>
          <p className="text-center text-gray-600 mb-12">Join thousands of marketers who are creating better ads and seeing real results.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial 
              quote="This platform has completely transformed our ad creation process. We're getting better results with less effort." 
              author="Sarah J." 
              role="Marketing Director" 
              company="TechCo Inc."
            />
            <Testimonial 
              quote="The AI recommendations are spot on. Our conversion rates have increased by 27% since we started using this service." 
              author="Michael T." 
              role="Digital Marketing Analyst" 
              company="E-Commerce Solutions"
            />
            <Testimonial 
              quote="Managing ads across different platforms used to be a headache. Now it's all in one place and so much easier." 
              author="Alex P." 
              role="Marketing Manager" 
              company="Retail Group"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-center mb-3">Simple, Transparent Pricing</h2>
          <p className="text-center text-gray-600 mb-12">Choose the plan that's right for your business. All plans include a 14-day free trial.</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Starter" 
              price="29" 
              period="month"
              ctaText="Start Free Trial"
              features={[
                { text: "5 AI-generated ad campaigns per month", included: true },
                { text: "Meta & Google Ads account integration", included: true },
                { text: "Basic audience targeting capabilities", included: true },
                { text: "Essential analytics", included: true },
                { text: "Email support", included: true },
              ]}
            />
            
            <PricingCard 
              title="Professional" 
              price="79" 
              period="month"
              ctaText="Start Free Trial"
              popular={true}
              features={[
                { text: "20 AI-generated ad campaigns per month", included: true },
                { text: "All platform integrations", included: true },
                { text: "Advanced audience targeting", included: true },
                { text: "Comprehensive analytics", included: true },
                { text: "Asset optimization recommendations", included: true },
                { text: "Priority email support", included: true },
              ]}
            />
            
            <PricingCard 
              title="Enterprise" 
              price="Custom" 
              period="month"
              ctaText="Contact Sales"
              features={[
                { text: "Unlimited ad campaigns", included: true },
                { text: "All platform integrations plus API access", included: true },
                { text: "Custom audience segmentation", included: true },
                { text: "Advanced AI recommendations", included: true },
                { text: "Custom analytics dashboard", included: true },
                { text: "Dedicated account manager", included: true },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 mb-8">
        <div className="container mx-auto max-w-7xl">
          <CallToAction 
            title="Ready to transform your digital advertising?"
            subtitle="Start creating optimized, high-performing ads today with our AI-powered platform."
            primaryButtonText="Get Started Free"
            secondaryButtonText="Contact Sales"
            primaryButtonLink="/get-started-free"
            secondaryButtonLink="/contact-sales"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 px-4 border-t border-gray-100">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2023 AdSmartCreator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
