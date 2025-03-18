import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { AuthError } from '@supabase/supabase-js';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the auth code from the URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        const code = queryParams.get('code');
        const error = hashParams.get('error') || queryParams.get('error');
        const errorDescription = hashParams.get('error_description') || queryParams.get('error_description');

        if (error) {
          throw new Error(errorDescription || error);
        }

        if (!code) {
          throw new Error('No code received from authentication provider');
        }

        // First, try to exchange the code for a session
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        
        if (exchangeError) {
          console.error('Code exchange error:', exchangeError);
          throw exchangeError;
        }

        if (!data.session) {
          throw new Error('No session received after code exchange');
        }

        // Get the user details
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('User error:', userError);
          throw userError;
        }

        if (user) {
          // Check if there was a redirect path stored before auth
          const redirectPath = localStorage.getItem('redirectAfterAuth');
          localStorage.removeItem('redirectAfterAuth'); // Clean up

          toast({
            title: "Welcome!",
            description: `Successfully signed in as ${user.email}`,
            duration: 5000, // Show for 5 seconds
          });
          
          // Navigate to the stored path or default to dashboard
          navigate(redirectPath || '/dashboard', { replace: true });
        } else {
          throw new Error('No user found after authentication');
        }
      } catch (error: unknown) {
        console.error('Auth callback error:', error);
        const errorMessage = error instanceof Error ? error.message : 
                           error instanceof AuthError ? error.message :
                           'Failed to complete authentication';
        toast({
          title: "Authentication Error",
          description: errorMessage,
          variant: "destructive",
          duration: 5000, // Show for 5 seconds
        });
        navigate('/signin', { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue mb-4"></div>
        <p className="text-gray-600">Completing authentication...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we verify your credentials</p>
      </div>
    </div>
  );
};

export default AuthCallback; 