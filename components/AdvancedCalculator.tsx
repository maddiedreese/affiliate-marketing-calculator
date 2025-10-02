import { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Target, TrendingUp, BarChart3 } from 'lucide-react';

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

  // Auto-calculate when inputs change
  useEffect(() => {
    if (itemPrice && affiliatePercentage) {
      calculateEarnings();
    }
  }, [itemPrice, affiliatePercentage, quantity, monthlySales, conversionRate]);

  const calculateEarnings = () => {
    const price = parseFloat(itemPrice);
    const percentage = parseFloat(affiliatePercentage);
    const qty = parseInt(quantity) || 1;
    const monthly = parseInt(monthlySales) || 0;
    const conversion = parseFloat(conversionRate) || 2;

    if (isNaN(price) || isNaN(percentage) || price <= 0 || percentage <= 0) {
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
  };

  const calculateItemsNeeded = () => {
    const income = parseFloat(targetIncome);
    const percentage = parseFloat(affiliatePercentage);
    const price = parseFloat(itemPrice);

    if (isNaN(income) || isNaN(percentage) || isNaN(price) || income <= 0 || percentage <= 0 || price <= 0) {
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
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Basic Calculator */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Calculator className="h-6 w-6 text-indigo-600 mr-2" />
          Basic Calculator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Item Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter item price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Affiliate Percentage (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={affiliatePercentage}
              onChange={(e) => setAffiliatePercentage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter affiliate percentage"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity Sold
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter quantity (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Sales (for projections)
            </label>
            <input
              type="number"
              value={monthlySales}
              onChange={(e) => setMonthlySales(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter monthly sales"
            />
          </div>
        </div>
      </div>

      {/* Reverse Calculator */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <Target className="h-6 w-6 text-purple-600 mr-2" />
          Target Income Calculator
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Income ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={targetIncome}
              onChange={(e) => setTargetIncome(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter target income"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conversion Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter conversion rate"
            />
          </div>
        </div>

        <button
          onClick={calculateItemsNeeded}
          className="mt-4 w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
        >
          Calculate Items Needed
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="h-6 w-6 text-green-600 mr-2" />
            Calculation Results
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(results.singleItemEarning)}
              </div>
              <div className="text-sm text-gray-600">Per Item Earnings</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(results.totalEarnings)}
              </div>
              <div className="text-sm text-gray-600">Total Earnings</div>
            </div>
            
            {results.monthlyEarnings > 0 && (
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(results.monthlyEarnings)}
                </div>
                <div className="text-sm text-gray-600">Monthly Projection</div>
              </div>
            )}
            
            {results.yearlyEarnings > 0 && (
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {formatCurrency(results.yearlyEarnings)}
                </div>
                <div className="text-sm text-gray-600">Yearly Projection</div>
              </div>
            )}
            
            {results.itemsNeeded > 0 && (
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {results.itemsNeeded}
                </div>
                <div className="text-sm text-gray-600">Items Needed</div>
              </div>
            )}
          </div>

          {/* Additional Insights */}
          {results.singleItemEarning > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Insights</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p>• You earn {formatCurrency(results.singleItemEarning)} per sale</p>
                <p>• At {results.conversionRate}% conversion rate, you need {Math.ceil(100 / results.conversionRate)} visitors per sale</p>
                {results.monthlyEarnings > 0 && (
                  <p>• Monthly potential: {formatCurrency(results.monthlyEarnings)}</p>
                )}
                {results.yearlyEarnings > 0 && (
                  <p>• Yearly potential: {formatCurrency(results.yearlyEarnings)}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
