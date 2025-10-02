import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Calculator, DollarSign, Percent, Target } from 'lucide-react';
import AdvancedCalculator from '../components/AdvancedCalculator';
import { whopApp, WhopUser } from '../lib/whop-integration';
import '../styles/globals.css';

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
        
        // For static export, we'll allow access to the calculator
        // In a real Whop app, authentication would be handled by Whop's iframe
        setHasAccess(true);
        
        // For demo purposes, create a mock user
        setUser({
          id: 'demo-user',
          username: 'Demo User',
          name: 'Demo User'
        });
        
        // Track app usage
        await whopApp.trackUsage('app_opened', { 
          userId: 'demo-user', 
          timestamp: new Date().toISOString() 
        });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Head>
        <title>Affiliate Marketing Calculator</title>
        <meta name="description" content="Calculate your affiliate marketing earnings" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl mr-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Affiliate Marketing Calculator
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
              🚀 Calculate your potential earnings from affiliate marketing with our advanced calculator
            </p>
            {user && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Welcome, {user.name || user.username}!
              </div>
            )}
          </div>

          {/* Enhanced Calculator Component */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
            <AdvancedCalculator onResultsChange={setResults} />
          </div>

          {/* Enhanced Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* How to Use */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <Target className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">How to Use</h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                    <DollarSign className="h-4 w-4 mr-2 text-blue-600" />
                    Basic Calculator
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Enter the price of the item you're promoting</li>
                    <li>• Enter your affiliate commission percentage</li>
                    <li>• Enter how many items you've sold (optional)</li>
                    <li>• Enter monthly sales for projections (optional)</li>
                    <li>• See your per-item, total, monthly, and yearly earnings</li>
                  </ul>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                    <Percent className="h-4 w-4 mr-2 text-purple-600" />
                    Target Income Calculator
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Enter your target income goal</li>
                    <li>• Set your conversion rate percentage</li>
                    <li>• See how many items you need to sell</li>
                    <li>• Get insights on visitors needed per sale</li>
                    <li>• Plan your marketing strategy accordingly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                  <Calculator className="h-5 w-5 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Pro Tips</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-orange-800">💡 Conversion Rates:</span> Use realistic rates (1-5% is typical for most niches)
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-green-800">📊 Audience Size:</span> Consider your audience size when setting monthly sales goals
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-blue-800">📈 Track Results:</span> Monitor your actual results to improve projections
                  </p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-purple-800">🎯 High ROI:</span> Focus on high-converting products for better returns
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
