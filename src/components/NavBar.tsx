
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth';
import { LogOut, User } from 'lucide-react';

const NavBar = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="w-full py-4 px-6 bg-white border-b border-gray-100">
      <div className="container max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-brand-blue">AdSmartCreator</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">Dashboard</Link>
              <Link to="/create-ad" className="text-gray-700 hover:text-gray-900">Create Ad</Link>
              <Link to="/accounts" className="text-gray-700 hover:text-gray-900">Accounts</Link>
              <Link to="/analytics" className="text-gray-700 hover:text-gray-900">Analytics</Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-gray-900">
                <User className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <Button 
                onClick={() => signOut()} 
                variant="outline" 
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <LogOut className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin" className="text-gray-700 hover:text-gray-900">Sign In</Link>
              <Link to="/try-free">
                <Button className="bg-brand-blue hover:bg-brand-light-blue text-white rounded-md">
                  Try Free
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
