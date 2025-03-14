
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Check, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TryFree = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accepted) {
      setError('You must accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    
    setError(null);
    setLoading(true);
    
    try {
      await signUp(email, password, fullName, company);
      // Navigation is handled by the signUp function
    } catch (error) {
      console.error('Sign up error:', error);
      // Error is handled in the Auth context with toast
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center md:text-left mb-8">
              <Link to="/" className="text-3xl font-bold text-brand-blue">AdSmartCreator</Link>
              <h1 className="mt-6 text-3xl font-bold text-gray-900">Start your 14-day free trial</h1>
              <p className="mt-3 text-gray-600">No credit card required. Cancel anytime.</p>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="full-name"
                  name="fullName"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                  placeholder="John Smith"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                  placeholder="john@company.com"
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                  placeholder="Acme Inc."
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                  placeholder="Create a strong password"
                  disabled={loading}
                />
              </div>
              
              <div className="flex items-start">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded mt-1"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  disabled={loading}
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-brand-blue hover:text-brand-light-blue">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-brand-blue hover:text-brand-light-blue">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <div>
                <Button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-light-blue py-3"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Free Account'}
                </Button>
              </div>
            </form>
            
            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/signin" className="text-brand-blue hover:text-brand-light-blue">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right Side - Info */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-12 lg:p-16">
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-6">Everything you need to create better ads</h2>
              <p className="text-white/80 mb-8">Start creating optimized ads that convert with our 14-day free trial. No credit card required.</p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="ml-3 text-white/90">AI-powered ad creation across platforms</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="ml-3 text-white/90">Smart audience targeting capabilities</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="ml-3 text-white/90">Performance tracking and analytics</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="ml-3 text-white/90">Facebook, Instagram and Google Ads integration</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <p className="ml-3 text-white/90">Dedicated customer support</p>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <blockquote>
                <p className="text-xl italic text-white/90">"This platform has completely transformed how we create and manage our digital ads. The results speak for themselves."</p>
                <footer className="mt-4">
                  <p className="text-white/80">Marketing Director, E-commerce Company</p>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryFree;
