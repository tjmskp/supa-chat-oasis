
import React, { useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const GoogleAuthCallback = () => {
  useEffect(() => {
    // Get the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    
    // Send a message to the parent window
    if (code) {
      window.opener.postMessage({ 
        type: 'GOOGLE_AUTH_SUCCESS', 
        code 
      }, window.location.origin);
      
      // Log success for debug purposes
      console.log('Google auth successful, sending code to parent window');
    } else {
      window.opener.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        message: error || 'Authentication failed'
      }, window.location.origin);
      
      // Log error for debug purposes
      console.error('Google auth failed:', error);
    }
    
    // Close this window after a short delay
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Processing Google Authentication</h1>
        <p className="text-gray-600 mb-4">Please wait while we complete the authentication process...</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
        </div>
        <p className="text-sm text-gray-500 mt-4">This window will close automatically.</p>
      </div>
    </div>
  );
};

export default GoogleAuthCallback;
