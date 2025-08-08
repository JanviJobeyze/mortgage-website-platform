import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../utils/mortgageCalculations.js';
import tooltipIcon from '../assets/ToolTip.png';

// CMHC insurance rates
const getCMHCRate = (downPaymentPercent) => {
  if (downPaymentPercent >= 20) return 0;
  if (downPaymentPercent >= 15) return 2.4;
  if (downPaymentPercent >= 10) return 2.8;
  if (downPaymentPercent >= 5) return 4.0;
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
  const [inputValues, setInputValues] = useState({
    homePrice: '500,000',
    interestRate: '3.84',
    amortizationPeriod: '25',
    paymentFrequency: 'monthly'
  });

  const [formData, setFormData] = useState({
    homePrice: 500000,
    interestRate: 3.84,
    amortizationPeriod: 25,
    paymentFrequency: 'monthly'
  });

  // Update form data when input values change
  useEffect(() => {
    const newFormData = {
      homePrice: parseInt(inputValues.homePrice.replace(/[,]/g, '')) || 0,
      interestRate: parseFloat(inputValues.interestRate.replace(/[%]/g, '')) || 0,
      amortizationPeriod: parseInt(inputValues.amortizationPeriod) || 25,
      paymentFrequency: inputValues.paymentFrequency
    };
    setFormData(newFormData);
  }, [inputValues]);

  const handleInputChange = (field, value) => {
    setInputValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInputBlur = (field) => {
    let rawValue = inputValues[field];
    
    if (field === 'homePrice') {
      rawValue = rawValue.replace(/[,]/g, '');
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

  const handleInputFocus = (field) => {
    let rawValue = inputValues[field];
    
    if (field === 'homePrice') {
      rawValue = rawValue.replace(/[,]/g, '');
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

  return (
    <div className={`bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200 ${isCompact ? 'max-w-2xl mx-auto' : ''}`}>
      <h2 className="text-xl sm:text-2xl font-semibold text-[#1B5E20] mb-3 sm:mb-4">
        {isCompact ? 'Quick Mortgage Calculator' : 'Mortgage Payment Calculator'}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
        {isCompact ? 'Calculate your mortgage payments quickly.' : 'Calculate your mortgage payments and explore different scenarios with our comprehensive calculator.'}
      </p>
      
      {/* Start Here Section */}
      <div className="mb-8">
        <div>
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
              <p className="text-xs text-gray-500 mt-1">
                Current rate: {formData.interestRate}% • Changes will update all calculations
                {formData.interestRate !== parseFloat(inputValues.interestRate.replace(/[%]/g, '') || 0) && (
                  <span className="ml-2 text-[#2E7D32] animate-pulse">🔄 Updating...</span>
                )}
              </p>
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
                value={formData.amortizationPeriod}
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
                value={formData.paymentFrequency}
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
      </div>

      {/* Results Section */}
      {formData.homePrice > 0 && formData.interestRate > 0 && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Payment Breakdown</h3>
          
          {/* Down Payment Options */}
          <div className="mb-6">
            <div className="grid grid-cols-5 gap-4 mb-3">
              <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                Down Payment
              </div>
              {[5, 10, 15, 20].map((percent) => (
                <div key={`down-${percent}`} className="text-center">
                  <div className="text-xs sm:text-sm font-semibold text-[#2E7D32]">
                    {percent}%
                  </div>
                  <div className="text-xs text-gray-600">
                    ${((formData.homePrice * percent) / 100).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Loan Amount Row */}
            <div className="grid grid-cols-5 gap-4 mb-3">
              <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                Loan Amount
              </div>
              {[5, 10, 15, 20].map((percent) => {
                const downPayment = (formData.homePrice * percent) / 100;
                const loanAmount = formData.homePrice - downPayment;
                return (
                  <div key={`loan-${percent}`} className="text-center">
                    <div className="text-xs sm:text-sm font-semibold text-[#2E7D32]">
                      ${loanAmount.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CMHC Insurance Row */}
            <div className="grid grid-cols-5 gap-4 mb-3">
              <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                CMHC Insurance
              </div>
              {[5, 10, 15, 20].map((percent) => {
                const downPayment = (formData.homePrice * percent) / 100;
                const loanAmount = formData.homePrice - downPayment;
                const cmhcRate = getCMHCRate(percent);
                const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                return (
                  <div key={`cmhc-${percent}`} className="text-center">
                    <div className="text-xs sm:text-sm font-semibold text-[#2E7D32]">
                      ${cmhcAmount.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Mortgage Row */}
            <div className="grid grid-cols-5 gap-4 mb-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                Total Mortgage
              </div>
              {[5, 10, 15, 20].map((percent) => {
                const downPayment = (formData.homePrice * percent) / 100;
                const loanAmount = formData.homePrice - downPayment;
                const cmhcRate = getCMHCRate(percent);
                const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                const totalMortgage = loanAmount + cmhcAmount;
                return (
                  <div key={`total-${percent}`} className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-[#1B5E20]">
                      ${totalMortgage.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interest Rate Indicator */}
            <div className="text-center mb-4">
              <div className="text-xs text-[#2E7D32] bg-green-100 px-3 py-1 rounded-full inline-block">
                Based on {formData.interestRate}% interest rate • {formData.amortizationPeriod} year amortization
              </div>
            </div>
            
            {/* Mortgage Payment Row */}
            <div className="grid grid-cols-5 gap-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                Payment
              </div>
              {[5, 10, 15, 20].map((percent) => {
                const downPayment = (formData.homePrice * percent) / 100;
                const loanAmount = formData.homePrice - downPayment;
                const cmhcRate = getCMHCRate(percent);
                const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                const totalMortgage = loanAmount + cmhcAmount;
                
                // Calculate monthly payment
                const monthlyRate = formData.interestRate / 100 / 12;
                const totalPayments = formData.amortizationPeriod * 12;
                
                let monthlyPayment = 0;
                if (totalMortgage > 0 && formData.interestRate > 0 && formData.amortizationPeriod > 0) {
                  monthlyPayment = totalMortgage * 
                    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                    (Math.pow(1 + monthlyRate, totalPayments) - 1);
                }
                
                // Calculate frequency-adjusted payment
                let frequencyPayment = monthlyPayment;
                if (formData.paymentFrequency === 'biweekly') {
                  frequencyPayment = monthlyPayment / 2;
                } else if (formData.paymentFrequency === 'weekly') {
                  frequencyPayment = monthlyPayment / 4;
                } else if (formData.paymentFrequency === 'accelerated') {
                  frequencyPayment = (monthlyPayment * 12) / 26;
                } else if (formData.paymentFrequency === 'accelerated-weekly') {
                  frequencyPayment = (monthlyPayment * 12) / 52;
                }

                // Get frequency label
                const getFrequencyLabel = () => {
                  switch (formData.paymentFrequency) {
                    case 'biweekly': return '/bi-week';
                    case 'weekly': return '/week';
                    case 'accelerated': return '/bi-week*';
                    case 'accelerated-weekly': return '/week*';
                    default: return '/month';
                  }
                };

                return (
                  <div key={`payment-${percent}`} className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-[#1B5E20]">
                      ${frequencyPayment.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-gray-600">
                      {getFrequencyLabel()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accelerated Payment Note */}
            {(formData.paymentFrequency === 'accelerated' || formData.paymentFrequency === 'accelerated-weekly') && (
              <div className="text-center mt-2">
                <p className="text-xs text-gray-600">
                  *Accelerated payments reduce total interest and amortization period
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MortgageCalculator; 