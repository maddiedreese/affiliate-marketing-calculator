// Whop App Configuration
export const whopConfig = {
  // API Configuration
  apiKey: process.env.WHOP_API_KEY || '',
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID || '',
  environment: (process.env.NODE_ENV as 'development' | 'production') || 'development',
  
  // App Information
  appName: 'Affiliate Marketing Calculator',
  appVersion: '1.0.0',
  appDescription: 'Calculate your potential earnings from affiliate marketing',
  
  // Features
  features: {
    earningsCalculator: true,
    reverseCalculator: true,
    analytics: true,
    payments: false, // Set to true if you want to add premium features
  },
  
  // UI Configuration
  ui: {
    theme: 'light', // 'light' | 'dark' | 'auto'
    primaryColor: '#3b82f6', // Indigo
    accentColor: '#8b5cf6', // Purple
  },
  
  // Analytics
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    trackingId: process.env.ANALYTICS_ID || '',
  },
};

export default whopConfig;
