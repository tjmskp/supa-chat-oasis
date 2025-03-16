
import React, { useEffect } from 'react';

const MetaAuthCallback = () => {
  useEffect(() => {
    // Get the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    // Send a message to the parent window
    if (code) {
      window.opener.postMessage({ 
        type: 'META_AUTH_SUCCESS', 
        code 
      }, window.location.origin);
    } else {
      window.opener.postMessage({
        type: 'META_AUTH_ERROR',
        message: errorDescription || 'Authentication failed'
      }, window.location.origin);
    }
    
    // Close this window
    window.close();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">Processing Meta Authentication</h1>
        <p>Please wait while we complete the authentication process...</p>
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-blue mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default MetaAuthCallback;
