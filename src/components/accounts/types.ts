
export interface ConnectedAccount {
  id: string;
  name: string;
  platform: 'meta' | 'google';
  status: 'active' | 'expired';
  connected_at: string;
  account_id: string;
}
