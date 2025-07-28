import React, { useState } from 'react';
import { 
  calculateDownPayment, 
  getAvailableDownPaymentPercentages,
  formatCurrency,
  formatPercentage 
} from '../utils/mortgageCalculations.js';

/**
 * Example component demonstrating the mortgage down payment calculator
 */
function DownPaymentExample() {
  const [askingPrice, setAskingPrice] = useState(500000);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(10);
  const [result, setResult] = useState(null);

  // Calculate when inputs change
  const handleCalculation = () => {
    const calculationResult = calculateDownPayment(askingPrice, downPaymentPercentage);
    setResult(calculationResult);
  };

  // Get available down payment percentages for current home price
  const availablePercentages = getAvailableDownPaymentPercentages(askingPrice);

  // Auto-calculate when inputs change
  React.useEffect(() => {
    handleCalculation();
  }, [askingPrice, downPaymentPercentage]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        🏠 Mortgage Down Payment Calculator Example
      </h2>
      
      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Asking Price
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={askingPrice}
              onChange={(e) => setAskingPrice(Number(e.target.value))}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="500000"
              min="0"
              step="1000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Down Payment Percentage
          </label>
          <select
            value={downPaymentPercentage}
            onChange={(e) => setDownPaymentPercentage(Number(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {availablePercentages.map(percentage => (
              <option key={percentage} value={percentage}>
                {percentage}%
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Available percentages based on home price
          </p>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Calculation Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-sm text-blue-700 mb-1">Down Payment</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(result.downPaymentAmount)}
                </p>
                <p className="text-sm text-blue-600">
                  {formatPercentage(downPaymentPercentage)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-blue-700 mb-1">Insurance Premium</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(result.insurancePremium)}
                </p>
                <p className="text-sm text-blue-600">
                  {formatPercentage(result.insuranceRate * 100)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-blue-700 mb-1">Total Mortgage</p>
                <p className="text-2xl font-bold text-blue-900">
                  {formatCurrency(result.totalMortgage)}
                </p>
                <p className="text-sm text-blue-600">
                  Including insurance
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Home Price:</span>
                <span className="font-medium">{formatCurrency(askingPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Down Payment ({formatPercentage(downPaymentPercentage)}):</span>
                <span className="font-medium text-green-600">-{formatCurrency(result.downPaymentAmount)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-gray-700 font-medium">Mortgage Before Insurance:</span>
                <span className="font-semibold">{formatCurrency(result.mortgageBeforeInsurance)}</span>
              </div>
              {result.insurancePremium > 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">CMHC Insurance Premium:</span>
                    <span className="font-medium text-orange-600">+{formatCurrency(result.insurancePremium)}</span>
                  </div>
                  <div className="bg-orange-50 rounded p-3">
                    <p className="text-sm text-orange-800">
                      <strong>Insurance Tier:</strong> {result.insuranceTier}
                    </p>
                  </div>
                </>
              )}
              <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                <span className="text-gray-900 font-semibold">Total Mortgage Required:</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(result.totalMortgage)}
                </span>
              </div>
            </div>
          </div>

          {/* Validation Status */}
          <div className={`rounded-lg p-4 ${
            result.isValid 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <h3 className={`text-lg font-semibold mb-2 ${
              result.isValid ? 'text-green-900' : 'text-red-900'
            }`}>
              {result.isValid ? '✅ Valid Configuration' : '❌ Validation Errors'}
            </h3>
            {result.isValid ? (
              <p className="text-green-800">
                This down payment configuration meets all Canadian mortgage insurance requirements.
              </p>
            ) : (
              <div>
                <p className="text-red-800 mb-2">This configuration has validation errors:</p>
                <ul className="text-red-700 space-y-1">
                  {result.validationMessages.map((message, index) => (
                    <li key={index}>• {message}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Code Usage Example</h3>
            <pre className="text-green-400 text-sm overflow-x-auto">
{`import { calculateDownPayment } from './utils/mortgageCalculations.js';

// Calculate down payment
const result = calculateDownPayment(${askingPrice}, ${downPaymentPercentage});

console.log('Down Payment:', result.downPaymentAmount);
console.log('Insurance Premium:', result.insurancePremium);
console.log('Total Mortgage:', result.totalMortgage);
console.log('Valid:', result.isValid);
console.log('Error:', result.error);`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default DownPaymentExample; 