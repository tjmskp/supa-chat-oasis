
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, company: string) => Promise<void>;
  signOut: () => Promise<void>;
  googleSignIn: () => Promise<void>;
  facebookSignIn: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setUser(data.session?.user ?? null);
      } catch (error) {
        console.error('Error checking auth session:', error);
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

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      // Auth state change listener will handle navigation
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, company: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName,
            company: company,
          },
        } 
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Account created',
        description: 'Your account has been created successfully. Please verify your email to continue.',
      });
      navigate('/signin');
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'An error occurred during sign up.',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      // Auth state change listener will handle navigation
    } catch (error: any) {
      toast({
        title: 'Sign out failed',
        description: error.message || 'An error occurred while signing out.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: 'Google sign in failed',
        description: error.message || 'An error occurred during Google sign in.',
        variant: 'destructive',
      });
    }
  };

  const facebookSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: 'Facebook sign in failed',
        description: error.message || 'An error occurred during Facebook sign in.',
        variant: 'destructive',
      });
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    googleSignIn,
    facebookSignIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
