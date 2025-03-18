import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (!session) {
          // Store the current path for redirect after auth
          localStorage.setItem('redirectAfterAuth', location.pathname);
          toast({
            title: "Authentication Required",
            description: "Please sign in to access this page.",
            duration: 5000,
          });
        }

        setAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check error:', error);
        toast({
          title: "Authentication Error",
          description: "There was a problem checking your authentication status.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
