interface AdUnit {
  id: string;
  name: string;
  status: string;
  parentId: string | null;
}

interface LineItem {
  id: string;
  name: string;
  orderId: string;
  status: string;
  startDateTime: string;
  endDateTime: string;
}

interface Order {
  id: string;
  name: string;
  status: string;
  advertiserId: string;
}

class GoogleAdManagerService {
  private networkCode: string;
  private baseUrl: string;

  constructor() {
    this.networkCode = import.meta.env.VITE_GOOGLE_AD_MANAGER_NETWORK_CODE;
    this.baseUrl = `https://googleads.googleapis.com/v14/customers/${this.networkCode}`;
  }

  private async getAuthHeaders(accessToken: string) {
    return {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
  }

  async getAdUnits(accessToken: string): Promise<AdUnit[]> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrl}/adUnits`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch ad units');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching ad units:', error);
      throw error;
    }
  }

  async getLineItems(accessToken: string): Promise<LineItem[]> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrl}/lineItems`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch line items');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching line items:', error);
      throw error;
    }
  }

  async getOrders(accessToken: string): Promise<Order[]> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrl}/orders`, {
        headers,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  async createLineItem(accessToken: string, lineItemData: Partial<LineItem>): Promise<LineItem> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrl}/lineItems`, {
        method: 'POST',
        headers,
        body: JSON.stringify(lineItemData),
      });

      if (!response.ok) {
        throw new Error('Failed to create line item');
      }

      return response.json();
    } catch (error) {
      console.error('Error creating line item:', error);
      throw error;
    }
  }

  async updateLineItem(
    accessToken: string,
    lineItemId: string,
    lineItemData: Partial<LineItem>
  ): Promise<LineItem> {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrl}/lineItems/${lineItemId}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(lineItemData),
      });

      if (!response.ok) {
        throw new Error('Failed to update line item');
      }

      return response.json();
    } catch (error) {
      console.error('Error updating line item:', error);
      throw error;
    }
  }

  async getReports(accessToken: string, params: any) {
    try {
      const headers = await this.getAuthHeaders(accessToken);
      const response = await fetch(`${this.baseUrl}/reports`, {
        method: 'POST',
        headers,
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to get reports');
      }

      return response.json();
    } catch (error) {
      console.error('Error getting reports:', error);
      throw error;
    }
  }
}

export const googleAdManagerService = new GoogleAdManagerService(); 