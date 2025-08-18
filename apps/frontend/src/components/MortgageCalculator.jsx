import React, { useState } from 'react';
import { formatCurrency } from '../utils/mortgageCalculations.js';
import tooltipIcon from '../assets/ToolTip.png';

// CMHC insurance rates (percent)
const getCMHCRate = (downPaymentPercent) => {
  if (downPaymentPercent >= 20) return 0.0;   // 20%+ → no premium
  if (downPaymentPercent >= 15) return 2.8;   // 15–19.99%
  if (downPaymentPercent >= 10) return 3.1;   // 10–14.99%
  if (downPaymentPercent >= 5)  return 4.0;   // 5–9.99%
  return 4.0;
};

// Tooltip component
const Tooltip = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let x, y;

    switch (position) {
      case "top":
        x = rect.left + rect.width / 2;
        y = rect.top - 10;
        break;
      case "bottom":
        x = rect.left + rect.width / 2;
        y = rect.bottom + 10;
        break;
      case "left":
        x = rect.left - 10;
        y = rect.top + rect.height / 2;
        break;
      case "right":
        x = rect.right + 10;
        y = rect.top + rect.height / 2;
        break;
      default:
        x = rect.left + rect.width / 2;
        y = rect.top - 10;
    }

    setTooltipPosition({ x, y });
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-flex items-center"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

function MortgageCalculator({ isCompact = false }) {
  // Input form state
  const [inputValues, setInputValues] = useState({
    homePrice: '500000',
    interestRate: '3.84',
    amortizationPeriod: '25',
    paymentFrequency: 'monthly'
  });

  // Calculated results state
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Parse input values to numbers
  const parseInputs = () => {
    return {
      homePrice: parseInt(inputValues.homePrice.replace(/[$,]/g, '')) || 0,
      interestRate: parseFloat(inputValues.interestRate.replace(/[%]/g, '')) || 0,
      amortizationPeriod: parseInt(inputValues.amortizationPeriod) || 25,
      paymentFrequency: inputValues.paymentFrequency
    };
  };

  // Calculate mortgage payments
  const calculateMortgage = (formData) => {
    const { homePrice, interestRate, amortizationPeriod, paymentFrequency } = formData;
    
    if (homePrice <= 0 || interestRate <= 0) {
      return null;
    }

    const results = [];
    
    // Calculate for different down payment percentages
    [5, 10, 15, 20].forEach(percent => {
      const downPayment = (homePrice * percent) / 100;
      const loanAmount = homePrice - downPayment;
      const cmhcRate = getCMHCRate(percent);
      const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
      const totalMortgage = loanAmount + cmhcAmount;
      
      // Calculate monthly payment
      const monthlyRate = interestRate / 100 / 12;
      const totalPayments = amortizationPeriod * 12;
      
      let monthlyPayment = 0;
      if (totalMortgage > 0 && interestRate > 0 && amortizationPeriod > 0) {
        monthlyPayment = totalMortgage * 
          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
          (Math.pow(1 + monthlyRate, totalPayments) - 1);
      }
      
      // Calculate frequency-adjusted payment
      let frequencyPayment = monthlyPayment;
      if (paymentFrequency === 'biweekly') {
        frequencyPayment = monthlyPayment / 2;
      } else if (paymentFrequency === 'weekly') {
        frequencyPayment = monthlyPayment / 4;
      } else if (paymentFrequency === 'accelerated') {
        frequencyPayment = (monthlyPayment * 12) / 26;
      } else if (paymentFrequency === 'accelerated-weekly') {
        frequencyPayment = (monthlyPayment * 12) / 52;
      }

      results.push({
        downPaymentPercent: percent,
        downPayment,
        loanAmount,
        cmhcRate,
        cmhcAmount,
        totalMortgage,
        monthlyPayment,
        frequencyPayment
      });
    });

    return results;
  };

  // Handle calculate button click
  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      const formData = parseInputs();
      const calculatedResults = calculateMortgage(formData);
      
      setResults({
        formData,
        calculations: calculatedResults
      });
      setHasCalculated(true);
      setIsCalculating(false);
    }, 500);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setInputValues(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset results when inputs change
    if (hasCalculated) {
      setResults(null);
      setHasCalculated(false);
    }
  };

  // Handle input blur (formatting)
  const handleInputBlur = (field) => {
    let rawValue = inputValues[field];
    
    if (field === 'homePrice') {
      rawValue = rawValue.replace(/[$,]/g, '');
      const numValue = parseInt(rawValue) || 0;
      const formattedValue = formatCurrency(numValue);
      setInputValues(prev => ({
        ...prev,
        [field]: formattedValue
      }));
    } else if (field === 'interestRate') {
      rawValue = rawValue.replace(/[%]/g, '');
      const numValue = parseFloat(rawValue) || 0;
      setInputValues(prev => ({
        ...prev,
        [field]: numValue.toFixed(2)
      }));
    }
  };

  // Handle input focus (remove formatting)
  const handleInputFocus = (field) => {
    let rawValue = inputValues[field];
    
    if (field === 'homePrice') {
      rawValue = rawValue.replace(/[$,]/g, '');
      setInputValues(prev => ({
        ...prev,
        [field]: rawValue
      }));
    } else if (field === 'interestRate') {
      rawValue = rawValue.replace(/[%]/g, '');
      setInputValues(prev => ({
        ...prev,
        [field]: rawValue
      }));
    }
  };

  // Get frequency label
  const getFrequencyLabel = (frequency) => {
    switch (frequency) {
      case 'biweekly': return '/bi-week';
      case 'weekly': return '/week';
      case 'accelerated': return '/bi-week*';
      case 'accelerated-weekly': return '/week*';
      default: return '/month';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200 ${isCompact ? 'max-w-2xl mx-auto' : ''}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1B5E20] mb-3 sm:mb-4">
        {isCompact ? 'Quick Mortgage Calculator' : 'Mortgage Payment Calculator'}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        {isCompact ? 'Calculate your mortgage payments quickly.' : 'Calculate your mortgage payments and explore different scenarios with our comprehensive calculator.'}
      </p>
      
      {/* Input Form Section */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Enter Your Details</h3>
        
        {/* Start Here Section */}
        <div className="mb-6">
          {/* Start Here - Price Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#1B5E20] mb-2">
              Start here
              <Tooltip content="Enter the purchase price of the home you're interested in. This is the total amount you'll pay for the property.">
                <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
              </Tooltip>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={inputValues.homePrice}
                onChange={(e) => handleInputChange('homePrice', e.target.value)}
                onBlur={() => handleInputBlur('homePrice')}
                onFocus={() => handleInputFocus('homePrice')}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                placeholder="500,000"
              />
            </div>
          </div>

          {/* Additional Input Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Interest Rate Input */}
            <div>
              <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                Annual Interest Rate
                <Tooltip content="The annual interest rate on your mortgage. This affects your monthly payment amount.">
                  <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
                </Tooltip>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValues.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  onBlur={() => handleInputBlur('interestRate')}
                  onFocus={() => handleInputFocus('interestRate')}
                  className="w-full pl-4 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  placeholder="3.84"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
              </div>
            </div>

            {/* Amortization Period Input */}
            <div>
              <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                Amortization Period
                <Tooltip content="The total time to pay off your mortgage. Longer periods mean lower monthly payments but more total interest.">
                  <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
                </Tooltip>
              </label>
              <select
                value={inputValues.amortizationPeriod}
                onChange={(e) => handleInputChange('amortizationPeriod', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-sm sm:text-base"
              >
                {Array.from({ length: 30 }, (_, i) => 30 - i).map(year => (
                  <option key={year} value={year}>{year} years</option>
                ))}
              </select>
            </div>

            {/* Payment Frequency Input */}
            <div>
              <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                Payment Frequency
                <Tooltip content="How often you make mortgage payments. More frequent payments can reduce total interest paid.">
                  <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
                </Tooltip>
              </label>
              <select
                value={inputValues.paymentFrequency}
                onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
              >
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="weekly">Weekly</option>
                <option value="accelerated">Accelerated Bi-weekly</option>
                <option value="accelerated-weekly">Accelerated Weekly</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="text-center">
          <button
            onClick={handleCalculate}
            disabled={isCalculating || parseInputs().homePrice <= 0 || parseInputs().interestRate <= 0}
            className={`px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isCalculating || parseInputs().homePrice <= 0 || parseInputs().interestRate <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#2E7D32] hover:bg-[#1B5E20] shadow-lg hover:shadow-xl'
            }`}
          >
            {isCalculating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Calculating...</span>
              </div>
            ) : (
              'Calculate Mortgage Payments'
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && results.calculations && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-xl font-semibold text-[#1B5E20] mb-6">Payment Breakdown</h3>
          
          {/* Interest Rate and Amortization Info */}
          <div className="text-center mb-6">
            <div className="text-sm text-[#2E7D32] bg-green-100 px-4 py-2 rounded-full inline-block">
              Based on {results.formData.interestRate}% interest rate • {results.formData.amortizationPeriod} year amortization
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
              {/* Table Header */}
              <thead className="bg-[#1B5E20] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base border-b border-gray-200">
                    Details
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-sm sm:text-base border-b border-gray-200">
                    5% Down
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-sm sm:text-base border-b border-gray-200">
                    10% Down
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-sm sm:text-base border-b border-gray-200">
                    15% Down
                  </th>
                  <th className="px-4 py-3 text-center font-semibold text-sm sm:text-base border-b border-gray-200">
                    20% Down
                  </th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody>
                {/* Down Payment Row */}
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm sm:text-base">
                    Down Payment
                  </td>
                  {results.calculations.map((calc) => (
                    <td key={`down-${calc.downPaymentPercent}`} className="px-4 py-3 text-center">
                      <div className="font-semibold text-[#2E7D32] text-sm sm:text-base">
                        {calc.downPaymentPercent}%
                      </div>
                      <div className="text-gray-600 text-sm">
                        {formatCurrency(calc.downPayment)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Base Loan Row */}
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm sm:text-base">
                    Base Loan
                  </td>
                  {results.calculations.map((calc) => (
                    <td key={`loan-${calc.downPaymentPercent}`} className="px-4 py-3 text-center">
                      <div className="font-semibold text-[#2E7D32] text-sm sm:text-base">
                        {formatCurrency(calc.loanAmount)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* CMHC Rate Row */}
                <tr className="border-b border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm sm:text-base">
                    CMHC Rate
                  </td>
                  {results.calculations.map((calc) => (
                    <td key={`cmhc-rate-${calc.downPaymentPercent}`} className="px-4 py-3 text-center">
                      <div className="font-semibold text-[#2E7D32] text-sm sm:text-base">
                        {calc.cmhcRate > 0 ? `${calc.cmhcRate}%` : 'N/A'}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* CMHC Premium Row */}
                <tr className="border-b border-gray-100 bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900 text-sm sm:text-base">
                    CMHC Premium
                  </td>
                  {results.calculations.map((calc) => (
                    <td key={`cmhc-${calc.downPaymentPercent}`} className="px-4 py-3 text-center">
                      <div className="font-semibold text-[#2E7D32] text-sm sm:text-base">
                        {formatCurrency(calc.cmhcAmount)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Total Mortgage Row */}
                <tr className="border-b-2 border-[#1B5E20] bg-green-50">
                  <td className="px-4 py-4 font-bold text-[#1B5E20] text-sm sm:text-base">
                    Total Mortgage (Loan + CMHC)
                  </td>
                  {results.calculations.map((calc) => (
                    <td key={`total-${calc.downPaymentPercent}`} className="px-4 py-4 text-center">
                      <div className="font-bold text-[#1B5E20] text-lg sm:text-xl">
                        {formatCurrency(calc.totalMortgage)}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Payment Row */}
                <tr className="bg-green-100 border-b-2 border-[#1B5E20]">
                  <td className="px-4 py-4 font-bold text-[#1B5E20] text-sm sm:text-base">
                    Payment {getFrequencyLabel(results.formData.paymentFrequency)}
                  </td>
                  {results.calculations.map((calc) => (
                    <td key={`payment-${calc.downPaymentPercent}`} className="px-4 py-4 text-center">
                      <div className="font-bold text-[#1B5E20] text-lg sm:text-xl">
                        {formatCurrency(calc.frequencyPayment)}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Accelerated Payment Note */}
          {(results.formData.paymentFrequency === 'accelerated' || results.formData.paymentFrequency === 'accelerated-weekly') && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                <strong>Note:</strong> Accelerated payments reduce total interest and amortization period
              </p>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-[#1B5E20] mb-2 text-sm sm:text-base">CMHC Insurance Tiers</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• 5-9.99% down: 4.00% premium</li>
                <li>• 10-14.99% down: 3.10% premium</li>
                <li>• 15-19.99% down: 2.80% premium</li>
                <li>• 20%+ down: No insurance required</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-[#1B5E20] mb-2 text-sm sm:text-base">Payment Frequency</h4>
              <p className="text-sm text-gray-700">
                {results.formData.paymentFrequency === 'monthly' && 'Monthly payments are the standard option.'}
                {results.formData.paymentFrequency === 'biweekly' && 'Bi-weekly payments (26 payments per year).'}
                {results.formData.paymentFrequency === 'weekly' && 'Weekly payments (52 payments per year).'}
                {results.formData.paymentFrequency === 'accelerated' && 'Accelerated bi-weekly payments reduce total interest.'}
                {results.formData.paymentFrequency === 'accelerated-weekly' && 'Accelerated weekly payments reduce total interest.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!results && hasCalculated && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">
            Please enter valid values for home price and interest rate to calculate mortgage payments.
          </p>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator; 