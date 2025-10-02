import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calculator, DollarSign, Percent, Target } from 'lucide-react';
import AdvancedCalculator from '../components/AdvancedCalculator';
import { whopApp, WhopUser } from '../lib/whop-integration';

interface CalculationResult {
  singleItemEarning: number;
  totalEarnings: number;
  itemsNeeded: number;
  monthlyEarnings: number;
  yearlyEarnings: number;
  conversionRate: number;
}

export default function AffiliateCalculator() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [user, setUser] = useState<WhopUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  // Initialize Whop SDK and check user access
  useEffect(() => {
    const initializeWhop = async () => {
      try {
        // Initialize the Whop SDK
        await whopApp.initialize();
        
        // For demo purposes, we'll simulate user authentication
        // In a real app, you'd get the user ID from Whop's authentication flow
        const userId = 'demo-user-id'; // Replace with actual user ID from Whop
        const accessPassId = 'demo-access-pass'; // Replace with your access pass ID
        
        // Check if user has access
        const userHasAccess = await whopApp.checkUserAccess(userId, accessPassId);
        setHasAccess(userHasAccess);
        
        if (userHasAccess) {
          // Get user information
          const userInfo = await whopApp.getUser(userId);
          setUser(userInfo);
          
          // Track app usage
          await whopApp.trackUsage('app_opened', { userId, timestamp: new Date().toISOString() });
        }
      } catch (error) {
        console.error('Error initializing Whop:', error);
        // For demo purposes, allow access even if there's an error
        setHasAccess(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWhop();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Calculator className="h-12 w-12 text-indigo-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Loading your calculator...</p>
        </div>
      </div>
    );
  }

  // Show access denied if user doesn't have access
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <Calculator className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h1>
          <p className="text-gray-600 mb-6">
            You need to have access to this app through Whop to use the Affiliate Marketing Calculator.
          </p>
          <button 
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Affiliate Marketing Calculator</title>
        <meta name="description" content="Calculate your affiliate marketing earnings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Calculator className="h-12 w-12 text-indigo-600 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900">Affiliate Marketing Calculator</h1>
            </div>
            <p className="text-xl text-gray-600">
              Calculate your potential earnings from affiliate marketing
            </p>
            {user && (
              <p className="text-sm text-gray-500 mt-2">
                Welcome, {user.username || user.email}!
              </p>
            )}
          </div>

          {/* Advanced Calculator Component */}
          <AdvancedCalculator onResultsChange={setResults} />

          {/* Instructions */}
          <div className="mt-8 bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Basic Calculator:</h4>
                <ul className="space-y-1">
                  <li>• Enter the price of the item you're promoting</li>
                  <li>• Enter your affiliate commission percentage</li>
                  <li>• Enter how many items you've sold (optional)</li>
                  <li>• Enter monthly sales for projections (optional)</li>
                  <li>• See your per-item, total, monthly, and yearly earnings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Target Income Calculator:</h4>
                <ul className="space-y-1">
                  <li>• Enter your target income goal</li>
                  <li>• Set your conversion rate percentage</li>
                  <li>• See how many items you need to sell</li>
                  <li>• Get insights on visitors needed per sale</li>
                  <li>• Plan your marketing strategy accordingly</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tips:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use realistic conversion rates (1-5% is typical for most niches)</li>
                <li>• Consider your audience size when setting monthly sales goals</li>
                <li>• Track your actual results to improve your projections</li>
                <li>• Focus on high-converting products for better ROI</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
