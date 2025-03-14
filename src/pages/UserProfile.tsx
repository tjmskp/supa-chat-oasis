
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Building, Calendar } from 'lucide-react';

const UserProfile = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [userMetadata, setUserMetadata] = useState<any>({});

  useEffect(() => {
    if (user) {
      // Get user metadata from Supabase
      const fetchUserData = async () => {
        try {
          const { data: userData } = await supabase.auth.getUser();
          if (userData.user) {
            const metadata = userData.user.user_metadata || {};
            setUserMetadata(metadata);
            setFullName(metadata.full_name || '');
            setCompany(metadata.company || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            title: 'Error',
            description: 'Failed to load user profile data',
            variant: 'destructive',
          });
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          company: company,
        },
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update failed',
        description: error.message || 'An error occurred while updating your profile.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A';

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-brand-blue rounded-full p-3 text-white">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-base font-medium text-gray-900 flex items-center">
                  <Mail className="h-4 w-4 mr-1 text-gray-400" />
                  {user.email}
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 rounded-full p-3 text-white">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="text-base font-medium text-gray-900">{createdAt}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-semibold mb-6">Update Profile</h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-gray-400 mr-2" />
                  <input
                    id="company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-brand-blue hover:bg-brand-light-blue text-white"
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
