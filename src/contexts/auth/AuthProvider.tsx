
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';
import AuthContext from './AuthContext';
import * as authService from './authService';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const sessionUser = await authService.checkSession();
        setUser(sessionUser);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state listener
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setUser(session?.user ?? null);

      // Handle sign-in and sign-out events with toast notifications
      if (event === 'SIGNED_IN') {
        toast({
          title: 'Signed in successfully',
          description: 'Welcome to AdSmartCreator!',
        });
        navigate('/dashboard');
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: 'Signed out',
          description: 'You have been signed out successfully.',
        });
        navigate('/');
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSignIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      await authService.signIn(email, password);
      // Auth state change listener will handle navigation
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (email: string, password: string, fullName: string, company: string) => {
    try {
      setLoading(true);
      await authService.signUp(email, password, fullName, company);
      navigate('/signin');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await authService.signOut();
      // Auth state change listener will handle navigation
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authService.googleSignIn();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await authService.facebookSignIn();
    } catch (error) {
      console.error('Facebook sign in error:', error);
    }
  };

  const value = {
    user,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    googleSignIn: handleGoogleSignIn,
    facebookSignIn: handleFacebookSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
