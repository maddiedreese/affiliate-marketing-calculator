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
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'basic'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Calculator className="h-5 w-5 mr-2" />
          Basic Calculator
        </button>
        <button
          onClick={() => setActiveTab('target')}
          className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
            activeTab === 'target'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Target className="h-5 w-5 mr-2" />
          Target Income
        </button>
      </div>

      {/* Basic Calculator Tab */}
      {activeTab === 'basic' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Calculate Your Earnings</h2>
            <p className="text-gray-600">Enter your product details to see potential earnings</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                  Item Price
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:border-gray-300"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">$</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Percent className="h-4 w-4 mr-2 text-blue-600" />
                  Affiliate Commission
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={affiliatePercentage}
                    onChange={(e) => setAffiliatePercentage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:border-gray-300"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-orange-600" />
                  Quantity Sold
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:border-gray-300"
                  placeholder="1"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2 text-purple-600" />
                  Monthly Sales
                </label>
                <input
                  type="number"
                  value={monthlySales}
                  onChange={(e) => setMonthlySales(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 group-hover:border-gray-300"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Target Income Tab */}
      {activeTab === 'target' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Calculate Items Needed</h2>
            <p className="text-gray-600">Set your income goal and see how many sales you need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Target className="h-4 w-4 mr-2 text-purple-600" />
                Target Income
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={targetIncome}
                  onChange={(e) => setTargetIncome(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 group-hover:border-gray-300"
                  placeholder="0.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">$</span>
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2 text-blue-600" />
                Conversion Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 group-hover:border-gray-300"
                  placeholder="2.00"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm">%</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculateItemsNeeded}
            disabled={isCalculating || !targetIncome || !itemPrice || !affiliatePercentage}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isCalculating ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <Zap className="h-5 w-5" />
                <span>Calculate Items Needed</span>
              </>
            )}
          </button>
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
