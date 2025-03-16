
import { supabase } from "@/integrations/supabase/client";
import { toast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';

export async function checkSession(): Promise<User | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.user ?? null;
  } catch (error) {
    console.error('Error checking auth session:', error);
    return null;
  }
}

export async function signIn(email: string, password: string): Promise<User | null> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      throw error;
    }
    
    return data.user;
  } catch (error: any) {
    toast({
      title: 'Sign in failed',
      description: error.message || 'Please check your credentials and try again.',
      variant: 'destructive',
    });
    throw error;
  }
}

export async function signUp(
  email: string, 
  password: string, 
  fullName: string, 
  company: string
): Promise<void> {
  try {
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
  } catch (error: any) {
    toast({
      title: 'Sign up failed',
      description: error.message || 'An error occurred during sign up.',
      variant: 'destructive',
    });
    throw error;
  }
}

export async function signOut(): Promise<void> {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  } catch (error: any) {
    toast({
      title: 'Sign out failed',
      description: error.message || 'An error occurred while signing out.',
      variant: 'destructive',
    });
    throw error;
  }
}

export async function googleSignIn(): Promise<void> {
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
    throw error;
  }
}

export async function facebookSignIn(): Promise<void> {
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
    throw error;
  }
}
