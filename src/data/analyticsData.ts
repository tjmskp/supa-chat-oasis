
export const performanceData = [
  { date: 'Jan', impressions: 3000, clicks: 1400, conversions: 240 },
  { date: 'Feb', impressions: 4000, clicks: 1800, conversions: 320 },
  { date: 'Mar', impressions: 5000, clicks: 2200, conversions: 380 },
  { date: 'Apr', impressions: 7000, clicks: 2600, conversions: 420 },
  { date: 'May', impressions: 6000, clicks: 2400, conversions: 380 },
  { date: 'Jun', impressions: 8000, clicks: 3000, conversions: 500 },
  { date: 'Jul', impressions: 9000, clicks: 3500, conversions: 600 },
];

export const platformData = [
  { platform: 'Facebook', spend: 4200, conversions: 380 },
  { platform: 'Instagram', spend: 3800, conversions: 280 },
  { platform: 'Google Search', spend: 5100, conversions: 420 },
  { platform: 'Google Display', spend: 2900, conversions: 180 },
  { platform: 'YouTube', spend: 1800, conversions: 120 },
];

export const campaignData = [
  {
    name: 'Summer Sale 2023',
    platform: 'Facebook',
    status: 'Active' as const,
    impressions: 485291,
    ctr: '3.8%',
    conversions: 423,
    costPerConversion: '$12.32',
    spend: '$5,211.36',
  },
  {
    name: 'New Product Launch',
    platform: 'Google',
    status: 'Active' as const,
    impressions: 328582,
    ctr: '4.2%',
    conversions: 312,
    costPerConversion: '$14.87',
    spend: '$4,639.44',
  },
  {
    name: 'Brand Awareness Q3',
    platform: 'Instagram',
    status: 'Active' as const,
    impressions: 642104,
    ctr: '2.9%',
    conversions: 287,
    costPerConversion: '$11.58',
    spend: '$3,323.46',
  },
  {
    name: 'Holiday Special',
    platform: 'YouTube',
    status: 'Scheduled' as const,
    impressions: 0,
    ctr: '-',
    conversions: '-',
    costPerConversion: '-',
    spend: '$0.00',
  },
  {
    name: 'Spring Collection',
    platform: 'Google',
    status: 'Ended' as const,
    impressions: 582943,
    ctr: '3.4%',
    conversions: 498,
    costPerConversion: '$10.24',
    spend: '$5,099.52',
  },
];
