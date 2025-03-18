import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AdAccountTest = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);

  const testAdAccounts = async () => {
    try {
      setLoading(true);
      
      // First, ensure FB SDK is initialized
      await new Promise<void>((resolve) => {
        if (window.FB) {
          resolve();
        } else {
          window.fbAsyncInit = function() {
            resolve();
          };
        }
      });

      // Get user access token
      const response = await new Promise<fb.AuthResponse>((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject(new Error('User cancelled login or did not fully authorize.'));
          }
        }, { scope: 'ads_management,ads_read' });
      });

      // Fetch ad accounts
      const result = await new Promise((resolve, reject) => {
        window.FB.api(
          '/me/adaccounts',
          'GET',
          { 
            access_token: response.accessToken,
            fields: 'name,account_id,account_status,amount_spent,balance,currency,timezone_name'
          },
          (response) => {
            if (!response || response.error) {
              reject(response?.error || new Error('Failed to fetch ad accounts'));
            } else {
              resolve(response);
            }
          }
        );
      });

      setAccounts(result.data || []);
      
      toast({
        title: 'Success',
        description: `Found ${result.data.length} ad accounts`,
      });
    } catch (error) {
      console.error('Error testing ad accounts:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to test ad accounts',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Meta Ads API Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={testAdAccounts}
              disabled={loading}
            >
              {loading ? 'Testing...' : 'Test Ad Accounts Access'}
            </Button>

            {accounts.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Found Ad Accounts:</h3>
                <div className="space-y-2">
                  {accounts.map((account: any) => (
                    <Card key={account.account_id}>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="font-medium">Name:</p>
                            <p>{account.name}</p>
                          </div>
                          <div>
                            <p className="font-medium">Account ID:</p>
                            <p>{account.account_id}</p>
                          </div>
                          <div>
                            <p className="font-medium">Status:</p>
                            <p>{account.account_status}</p>
                          </div>
                          <div>
                            <p className="font-medium">Currency:</p>
                            <p>{account.currency}</p>
                          </div>
                          <div>
                            <p className="font-medium">Balance:</p>
                            <p>{account.balance}</p>
                          </div>
                          <div>
                            <p className="font-medium">Amount Spent:</p>
                            <p>{account.amount_spent}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdAccountTest; 