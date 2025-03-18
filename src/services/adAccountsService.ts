import { supabase } from '@/integrations/supabase/client';

interface MetaAdAccount {
  id: string;
  name: string;
  status: string;
  currency: string;
}

interface GoogleAdAccount {
  id: string;
  name: string;
  status: string;
  currency: string;
}

export interface AdAccountData {
  meta: MetaAdAccount[];
  google: GoogleAdAccount[];
}

class AdAccountsService {
  // Store connected accounts in Supabase
  async storeConnectedAccount(userId: string, platform: 'meta' | 'google', accountData: any) {
    const { error } = await supabase
      .from('connected_accounts')
      .upsert({
        user_id: userId,
        platform,
        account_data: accountData,
        connected_at: new Date().toISOString(),
      });

    if (error) throw error;
  }

  // Get user's connected accounts
  async getConnectedAccounts(userId: string): Promise<AdAccountData> {
    const { data, error } = await supabase
      .from('connected_accounts')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    const accounts: AdAccountData = {
      meta: [],
      google: [],
    };

    data.forEach(account => {
      if (account.platform === 'meta') {
        accounts.meta = account.account_data;
      } else if (account.platform === 'google') {
        accounts.google = account.account_data;
      }
    });

    return accounts;
  }

  // Disconnect an ad account
  async disconnectAccount(userId: string, platform: 'meta' | 'google') {
    const { error } = await supabase
      .from('connected_accounts')
      .delete()
      .match({ user_id: userId, platform });

    if (error) throw error;
  }

  // Fetch Meta (Facebook) ad account data
  async fetchMetaAdAccounts(accessToken: string): Promise<MetaAdAccount[]> {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/me/adaccounts?fields=name,account_status,currency,balance`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch Meta ad accounts');

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching Meta ad accounts:', error);
      throw error;
    }
  }

  // Fetch Google Ads account data
  async fetchGoogleAdAccounts(accessToken: string): Promise<GoogleAdAccount[]> {
    try {
      const response = await fetch(
        'https://googleads.googleapis.com/v14/customers:listAccessibleCustomers',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to fetch Google ad accounts');

      const data = await response.json();
      return data.resourceNames.map((name: string) => ({
        id: name.split('/')[1],
        name: 'Google Ads Account', // You'll need to make additional API calls to get account details
        status: 'ACTIVE',
        currency: 'USD',
      }));
    } catch (error) {
      console.error('Error fetching Google ad accounts:', error);
      throw error;
    }
  }
}

export const adAccountsService = new AdAccountsService(); 