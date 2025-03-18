import { useEffect, useState } from 'react';
import { googleAdsService } from '../services/googleAdsService';
import { useToast } from '../hooks/useToast';

interface AdSenseStats {
  earnings: number;
  clicks: number;
  impressions: number;
  ctr: number;
  pageViews: number;
}

interface AdSenseAccount {
  id: string;
  name: string;
  timeZone: string;
}

export const AdSenseOverview = () => {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<AdSenseAccount | null>(null);
  const [stats, setStats] = useState<AdSenseStats | null>(null);
  const [shouldUpgrade, setShouldUpgrade] = useState(false);
  const [hasAdManager, setHasAdManager] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get access token from your auth system
        const accessToken = localStorage.getItem('google_access_token');
        if (!accessToken) {
          toast({
            title: 'Authentication Required',
            description: 'Please sign in with Google to view your AdSense data.',
            type: 'error',
          });
          return;
        }

        // Check if Ad Manager is already available
        const adManagerAccess = await googleAdsService.checkAdManagerAccess(accessToken);
        setHasAdManager(adManagerAccess);

        // Fetch AdSense account
        const accountData = await googleAdsService.getAdSenseAccount(accessToken);
        setAccount(accountData);

        // Get last 30 days of data
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        const reports = await googleAdsService.getAdSenseReport(
          accessToken,
          accountData.id,
          { startDate, endDate }
        );

        // Calculate averages
        const averageStats = reports.reduce(
          (acc, curr) => ({
            earnings: acc.earnings + curr.earnings,
            clicks: acc.clicks + curr.clicks,
            impressions: acc.impressions + curr.impressions,
            ctr: acc.ctr + curr.ctr,
            pageViews: acc.pageViews + curr.pageViews,
          }),
          { earnings: 0, clicks: 0, impressions: 0, ctr: 0, pageViews: 0 }
        );

        Object.keys(averageStats).forEach((key) => {
          averageStats[key as keyof AdSenseStats] /= reports.length;
        });

        setStats(averageStats);

        // Check if should upgrade
        const upgradeRecommended = await googleAdsService.suggestAdManagerUpgrade(reports);
        setShouldUpgrade(upgradeRecommended);
      } catch (error) {
        console.error('Error fetching AdSense data:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch AdSense data. Please try again later.',
          type: 'error',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading AdSense data...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">AdSense Overview</h2>
      
      {account && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2">Account Information</h3>
          <p>Name: {account.name}</p>
          <p>Time Zone: {account.timeZone}</p>
        </div>
      )}

      {stats && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-4">30-Day Average Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Earnings</p>
              <p className="text-xl font-bold">${stats.earnings.toFixed(2)}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Impressions</p>
              <p className="text-xl font-bold">{stats.impressions.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Clicks</p>
              <p className="text-xl font-bold">{stats.clicks.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">CTR</p>
              <p className="text-xl font-bold">{(stats.ctr * 100).toFixed(2)}%</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-sm text-gray-600">Page Views</p>
              <p className="text-xl font-bold">{stats.pageViews.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {!hasAdManager && shouldUpgrade && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Upgrade Recommendation
          </h3>
          <p className="text-blue-700 mb-4">
            Based on your current AdSense performance, you may benefit from upgrading to
            Google Ad Manager. Ad Manager offers advanced features like:
          </p>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            <li>Direct deals management</li>
            <li>Advanced reporting</li>
            <li>Multiple ad networks support</li>
            <li>Granular targeting options</li>
          </ul>
          <a
            href="https://admanager.google.com/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Learn More About Ad Manager
          </a>
        </div>
      )}

      {hasAdManager && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-800">
            Ad Manager Access Available
          </h3>
          <p className="text-green-700">
            You already have access to Google Ad Manager. Please contact your account
            manager or Google support if you're having trouble accessing it.
          </p>
        </div>
      )}
    </div>
  );
}; 