import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Target, TrendingUp, BarChart3, Zap, Star, ArrowUpRight, Users, Calendar } from 'lucide-react';

interface CalculationResult {
  singleItemEarning: number;
  totalEarnings: number;
  itemsNeeded: number;
  monthlyEarnings: number;
  yearlyEarnings: number;
  conversionRate: number;
}

interface AdvancedCalculatorProps {
  onResultsChange?: (results: CalculationResult | null) => void;
}

export default function AdvancedCalculator({ onResultsChange }: AdvancedCalculatorProps) {
  const [itemPrice, setItemPrice] = useState<string>('');
  const [affiliatePercentage, setAffiliatePercentage] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [targetIncome, setTargetIncome] = useState<string>('');
  const [monthlySales, setMonthlySales] = useState<string>('');
  const [conversionRate, setConversionRate] = useState<string>('2'); // Default 2%
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'target'>('basic');

  // Auto-calculate when inputs change
  useEffect(() => {
    if (itemPrice && affiliatePercentage) {
      calculateEarnings();
    }
  }, [itemPrice, affiliatePercentage, quantity, monthlySales, conversionRate]);

  const calculateEarnings = async () => {
    setIsCalculating(true);
    
    // Add a small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const price = parseFloat(itemPrice);
    const percentage = parseFloat(affiliatePercentage);
    const qty = parseInt(quantity) || 1;
    const monthly = parseInt(monthlySales) || 0;
    const conversion = parseFloat(conversionRate) || 2;

    if (isNaN(price) || isNaN(percentage) || price <= 0 || percentage <= 0) {
      setIsCalculating(false);
      return;
    }

    const singleItemEarning = (price * percentage) / 100;
    const totalEarnings = singleItemEarning * qty;
    const monthlyEarnings = singleItemEarning * monthly;
    const yearlyEarnings = monthlyEarnings * 12;

    const newResults = {
      singleItemEarning,
      totalEarnings,
      itemsNeeded: 0,
      monthlyEarnings,
      yearlyEarnings,
      conversionRate: conversion
    };

    setResults(newResults);
    onResultsChange?.(newResults);
    setIsCalculating(false);
  };

  const calculateItemsNeeded = async () => {
    setIsCalculating(true);
    
    // Add a small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const income = parseFloat(targetIncome);
    const percentage = parseFloat(affiliatePercentage);
    const price = parseFloat(itemPrice);

    if (isNaN(income) || isNaN(percentage) || isNaN(price) || income <= 0 || percentage <= 0 || price <= 0) {
      setIsCalculating(false);
      return;
    }

    const singleItemEarning = (price * percentage) / 100;
    const itemsNeeded = Math.ceil(income / singleItemEarning);

    const newResults = {
      singleItemEarning,
      totalEarnings: income,
      itemsNeeded,
      monthlyEarnings: 0,
      yearlyEarnings: 0,
      conversionRate: parseFloat(conversionRate) || 2
    };

    setResults(newResults);
    onResultsChange?.(newResults);
    setIsCalculating(false);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Tab Navigation */}
      <div className="flex space-x-2 bg-gradient-to-r from-green-50 to-yellow-50 p-2 rounded-2xl border border-green-100">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === 'basic'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transform scale-105'
              : 'text-gray-600 hover:text-green-600 hover:bg-white/50'
          }`}
        >
          <Calculator className="h-5 w-5 mr-3" />
          Basic Calculator
        </button>
        <button
          onClick={() => setActiveTab('target')}
          className={`flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === 'target'
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg transform scale-105'
              : 'text-gray-600 hover:text-yellow-600 hover:bg-white/50'
          }`}
        >
          <Target className="h-5 w-5 mr-3" />
          Target Income
        </button>
      </div>

      {/* Basic Calculator Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl mb-4">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Calculate Your Earnings</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Enter your product details to see potential earnings and discover your affiliate marketing potential</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg mr-3">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                    Item Price
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={itemPrice}
                      onChange={(e) => setItemPrice(e.target.value)}
                      className="w-full px-6 py-4 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-green-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-green-600 text-lg font-semibold">$</span>
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                      <Percent className="h-5 w-5 text-yellow-600" />
                    </div>
                    Affiliate Commission
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={affiliatePercentage}
                      onChange={(e) => setAffiliatePercentage(e.target.value)}
                      className="w-full px-6 py-4 border-2 border-yellow-200 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 group-hover:border-yellow-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                      placeholder="0.00"
                    />
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <span className="text-yellow-600 text-lg font-semibold">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg mr-3">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                    </div>
                    Quantity Sold
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                    placeholder="1"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg mr-3">
                      <BarChart3 className="h-5 w-5 text-purple-600" />
                    </div>
                    Monthly Sales
                  </label>
                  <input
                    type="number"
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-purple-200 rounded-2xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-purple-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-8 text-center">
              <button
                onClick={calculateEarnings}
                disabled={isCalculating || !itemPrice || !affiliatePercentage}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6 mr-3" />
                    <span>Calculate Earnings</span>
                  </>
                )}
              </button>
              
              {(!itemPrice || !affiliatePercentage) && (
                <p className="text-sm text-gray-500 mt-3">
                  Please enter both item price and affiliate commission to calculate
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Target Income Tab */}
      {activeTab === 'target' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Calculate Items Needed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Set your income goal and discover exactly how many items you need to sell to reach your target</p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                    <Target className="h-5 w-5 text-yellow-600" />
                  </div>
                  Target Income
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={targetIncome}
                    onChange={(e) => setTargetIncome(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-yellow-200 rounded-2xl focus:ring-4 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all duration-300 group-hover:border-yellow-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-yellow-600 text-lg font-semibold">$</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg mr-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  Item Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-green-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-green-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-green-600 text-lg font-semibold">$</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <Percent className="h-5 w-5 text-blue-600" />
                  </div>
                  Affiliate Commission
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={affiliatePercentage}
                    onChange={(e) => setAffiliatePercentage(e.target.value)}
                    className="w-full px-6 py-4 border-2 border-blue-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-300 bg-white/80 backdrop-blur-sm text-lg font-medium"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <span className="text-blue-600 text-lg font-semibold">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-8 text-center">
              <button
                onClick={calculateItemsNeeded}
                disabled={isCalculating || !targetIncome || !itemPrice || !affiliatePercentage}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg font-semibold rounded-2xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Calculating...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-6 w-6 mr-3" />
                    <span>Calculate Items Needed</span>
                  </>
                )}
              </button>
              
              {(!targetIncome || !itemPrice || !affiliatePercentage) && (
                <p className="text-sm text-gray-500 mt-3">
                  Please enter target income, item price, and affiliate commission to calculate
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Results */}
      {results && (
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-100 p-8 animate-slideUp">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Your Results</h3>
            <p className="text-gray-600">Here's what your affiliate marketing could look like</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="group text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(results.singleItemEarning)}
              </div>
              <div className="text-sm font-medium text-gray-600">Per Item Earnings</div>
            </div>
            
            <div className="group text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {formatCurrency(results.totalEarnings)}
              </div>
              <div className="text-sm font-medium text-gray-600">Total Earnings</div>
            </div>
            
            {results.monthlyEarnings > 0 && (
              <div className="group text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {formatCurrency(results.monthlyEarnings)}
                </div>
                <div className="text-sm font-medium text-gray-600">Monthly Projection</div>
              </div>
            )}
            
            {results.yearlyEarnings > 0 && (
              <div className="group text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatCurrency(results.yearlyEarnings)}
                </div>
                <div className="text-sm font-medium text-gray-600">Yearly Projection</div>
              </div>
            )}
            
            {results.itemsNeeded > 0 && (
              <div className="group text-center p-6 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl border border-red-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {results.itemsNeeded}
                </div>
                <div className="text-sm font-medium text-gray-600">Items Needed</div>
              </div>
            )}
          </div>

          {/* Enhanced Insights */}
          {results.singleItemEarning > 0 && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-lg mr-3">
                  <ArrowUpRight className="h-5 w-5 text-indigo-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">Key Insights</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>You earn <span className="font-semibold text-green-600">{formatCurrency(results.singleItemEarning)}</span> per sale</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>At <span className="font-semibold text-blue-600">{results.conversionRate}%</span> conversion rate</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span>Need <span className="font-semibold text-purple-600">{Math.ceil(100 / results.conversionRate)}</span> visitors per sale</span>
                  </div>
                  {results.monthlyEarnings > 0 && (
                    <div className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                      <span>Monthly potential: <span className="font-semibold text-yellow-600">{formatCurrency(results.monthlyEarnings)}</span></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
