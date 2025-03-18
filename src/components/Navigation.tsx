import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Settings, LogOut, BarChart } from 'lucide-react';

const Navigation = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate('/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center space-x-8">
        <Link to="/dashboard" className="text-xl font-bold">
          Supa Chat Oasis
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </Link>
          
          <Link to="/ad-manager">
            <Button variant="ghost" className="flex items-center">
              <BarChart className="h-4 w-4 mr-2" />
              Ad Manager
            </Button>
          </Link>
          
          <Link to="/settings">
            <Button variant="ghost" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      <Button variant="ghost" onClick={handleSignOut} className="flex items-center">
        <LogOut className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </nav>
  );
};

export default Navigation; 