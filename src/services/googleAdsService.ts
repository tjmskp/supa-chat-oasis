interface AdSenseAccount {
  id: string;
  name: string;
  timeZone: string;
}

interface AdSenseReport {
  earnings: number;
  clicks: number;
  impressions: number;
  ctr: number;
  pageViews: number;
}

class GoogleAdsService {
  private baseUrlAdSense = 'https://adsense.googleapis.com/v2';
  private baseUrlAdManager = 'https://googleads.googleapis.com/v14';

  private async getAuthHeaders(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  // AdSense Methods
  async getAdSenseAccount(accessToken: string): Promise<AdSenseAccount> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrlAdSense}/accounts`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AdSense account');
      }

      const data = await response.json();
      return data.accounts[0]; // Returns the first account
    } catch (error) {
      console.error('Error fetching AdSense account:', error);
      throw error;
    }
  }

  async getAdSenseReport(
    accessToken: string,
    accountId: string,
    dateRange: { startDate: string; endDate: string }
  ): Promise<AdSenseReport[]> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(
        `${this.baseUrlAdSense}/accounts/${accountId}/reports`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            reportSpec: {
              dateRange: {
                startDate: {
                  year: parseInt(dateRange.startDate.split('-')[0]),
                  month: parseInt(dateRange.startDate.split('-')[1]),
                  day: parseInt(dateRange.startDate.split('-')[2]),
                },
                endDate: {
                  year: parseInt(dateRange.endDate.split('-')[0]),
                  month: parseInt(dateRange.endDate.split('-')[1]),
                  day: parseInt(dateRange.endDate.split('-')[2]),
                },
              },
              metrics: ['EARNINGS', 'CLICKS', 'IMPRESSIONS', 'CTR', 'PAGE_VIEWS'],
              dimensions: ['DATE'],
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch AdSense report');
      }

      const data = await response.json();
      return data.rows.map((row: any) => ({
        earnings: row.cells[0].value,
        clicks: row.cells[1].value,
        impressions: row.cells[2].value,
        ctr: row.cells[3].value,
        pageViews: row.cells[4].value,
        date: row.dimensionValues[0],
      }));
    } catch (error) {
      console.error('Error fetching AdSense report:', error);
      throw error;
    }
  }

  async getAdSenseAdUnits(accessToken: string, accountId: string) {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(
        `${this.baseUrlAdSense}/accounts/${accountId}/adclients/-/adunits`,
        {
          headers,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch AdSense ad units');
      }

      const data = await response.json();
      return data.adUnits || [];
    } catch (error) {
      console.error('Error fetching AdSense ad units:', error);
      throw error;
    }
  }

  // Helper method to check if Ad Manager is available
  async checkAdManagerAccess(accessToken: string): Promise<boolean> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrlAdManager}/networks`, {
        headers,
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  // Method to suggest upgrade to Ad Manager
  async suggestAdManagerUpgrade(adSenseMetrics: AdSenseReport[]): boolean {
    // Logic to determine if the publisher should upgrade to Ad Manager
    const averageImpressions = adSenseMetrics.reduce((acc, curr) => acc + curr.impressions, 0) / adSenseMetrics.length;
    const averageEarnings = adSenseMetrics.reduce((acc, curr) => acc + curr.earnings, 0) / adSenseMetrics.length;

    // These are example thresholds - adjust based on actual Google requirements
    return averageImpressions > 100000 || averageEarnings > 100;
  }
}

export const googleAdsService = new GoogleAdsService(); 