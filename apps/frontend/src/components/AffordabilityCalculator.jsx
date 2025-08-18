import React, { useState } from 'react';

// Credit score ranges for affordability calculator
const creditScoreRanges = [
  { value: 'excellent', label: 'Excellent (750+)', rate: 2.89 },
  { value: 'good', label: 'Good (700-749)', rate: 3.15 },
  { value: 'fair', label: 'Fair (650-699)', rate: 3.45 },
  { value: 'poor', label: 'Poor (600-649)', rate: 4.25 },
  { value: 'very-poor', label: 'Very Poor (<600)', rate: 5.50 }
];

// Stress test rate (static)
const STRESS_TEST_RATE = 5.25;

// --- parsing helpers (robust; keep numbers in canonical state) ---
const parsePercent = (v) => {
  if (typeof v === 'number') return v;
  if (!v) return 0;
  const n = parseFloat(String(v).replace(/[,%\s]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

const parseMoney = (v) => {
  if (typeof v === 'number') return v;
  if (!v) return 0;
  const n = parseFloat(String(v).replace(/[$,\s]/g, ''));
  return Number.isFinite(n) ? n : 0;
};

function AffordabilityCalculator() {
  // Input form state
  const [inputValues, setInputValues] = useState({
    annualIncome: '80,000',
    monthlyDebtPayments: '500',
    downPayment: '50,000',
    creditScore: 'good'
  });

  // Calculated results state
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Parse input values to numbers
  const parseInputs = () => {
    return {
      annualIncome: parseMoney(inputValues.annualIncome),
      monthlyDebtPayments: parseMoney(inputValues.monthlyDebtPayments),
      downPayment: parseMoney(inputValues.downPayment),
      creditScore: inputValues.creditScore
    };
  };

  const calculateAffordability = (formData) => {
    const monthlyIncome = formData.annualIncome / 12;
    const creditScoreRate = creditScoreRanges.find(c => c.value === formData.creditScore)?.rate || 3.15;
    
    // Canadian mortgage qualification rules
    const MAX_GDS_RATIO = 0.32; // 32% of gross monthly income
    const MAX_TDS_RATIO = 0.40; // 40% of gross monthly income
    const STRESS_TEST_RATE = Math.max(creditScoreRate + 2.0, 5.25); // Higher of rate+2% or 5.25%
    
    // We'll use an iterative approach to find the maximum home price
    let maxHomePrice = 0;
    let maxLoanAmount = 0;
    let maxMortgagePayment = 0;
    let actualGDS = 0;
    let actualTDS = 0;
    let monthlyPropertyTax = 0;
    let monthlyHeatingCost = 200; // Typical average
    
    // Start with a reasonable home price and iterate to find maximum
    let testHomePrice = formData.downPayment + 100000; // Start with down payment + 100k
    let iterations = 0;
    const maxIterations = 100;
    
    while (iterations < maxIterations) {
      const testLoanAmount = testHomePrice - formData.downPayment;
      if (testLoanAmount <= 0) break;
      
      // Calculate monthly mortgage payment using stress test rate
      const monthlyRate = STRESS_TEST_RATE / 100 / 12;
      const amortizationYears = 25;
      const totalPayments = amortizationYears * 12;
      const monthlyMortgagePayment = testLoanAmount * 
        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
      
      // Estimate monthly property tax (1% of home value annually)
      monthlyPropertyTax = (testHomePrice * 0.01) / 12;
      
      // Calculate GDS ratio
      const gdsRatio = (monthlyMortgagePayment + monthlyPropertyTax + monthlyHeatingCost) / monthlyIncome;
      
      // Calculate TDS ratio (includes other debts)
      const tdsRatio = (monthlyMortgagePayment + monthlyPropertyTax + monthlyHeatingCost + formData.monthlyDebtPayments) / monthlyIncome;
      
      // Check if ratios are within limits
      if (gdsRatio <= MAX_GDS_RATIO && tdsRatio <= MAX_TDS_RATIO) {
        maxHomePrice = testHomePrice;
        maxLoanAmount = testLoanAmount;
        maxMortgagePayment = monthlyMortgagePayment;
        actualGDS = gdsRatio * 100;
        actualTDS = tdsRatio * 100;
        testHomePrice += 10000; // Try 10k more
      } else {
        break;
      }
      iterations++;
    }
    
    if (maxHomePrice === 0) {
      maxHomePrice = formData.downPayment;
      maxLoanAmount = 0;
      maxMortgagePayment = 0;
      actualGDS = 0;
      actualTDS = 0;
    }

    return {
      maxHomePrice,
      maxLoanAmount,
      maxMortgagePayment,
      actualGDS,
      actualTDS,
      monthlyPropertyTax,
      monthlyHeatingCost,
      creditScoreRate,
      stressTestRate: STRESS_TEST_RATE
    };
  };

  // Handle calculate button click
  const handleCalculate = () => {
    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      const formData = parseInputs();
      const calculatedResults = calculateAffordability(formData);
      
      setResults({
        formData,
        calculations: calculatedResults
      });
      setHasCalculated(true);
      setIsCalculating(false);
    }, 500);
  };

  // Handle input changes
  const handleAffordabilityChange = (field, value) => {
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

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-[#1B5E20] mb-4">Affordability Calculator</h2>
      <p className="text-gray-600 mb-6">
        Calculate how much home you can afford based on your income, debt, and down payment.
      </p>

      {/* Input Form Section */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Enter Your Financial Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Annual Income */}
          <div>
            <label className="block text-sm font-medium text-[#1B5E20] mb-2">
              Annual Income
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={inputValues.annualIncome}
                onChange={(e) => handleAffordabilityChange('annualIncome', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                placeholder="80,000"
              />
            </div>
          </div>

          {/* Monthly Debt Payments */}
          <div>
            <label className="block text-sm font-medium text-[#1B5E20] mb-2">
              Monthly Debt Payments
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={inputValues.monthlyDebtPayments}
                onChange={(e) => handleAffordabilityChange('monthlyDebtPayments', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                placeholder="500"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-sm font-medium text-[#1B5E20] mb-2">
              Down Payment
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={inputValues.downPayment}
                onChange={(e) => handleAffordabilityChange('downPayment', e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                placeholder="50,000"
              />
            </div>
          </div>

          {/* Credit Score */}
          <div>
            <label className="block text-sm font-medium text-[#1B5E20] mb-2">
              Credit Score
            </label>
            <select
              value={inputValues.creditScore}
              onChange={(e) => handleAffordabilityChange('creditScore', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
            >
              {creditScoreRanges.map(score => (
                <option key={score.value} value={score.value}>
                  {score.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleCalculate}
            disabled={isCalculating || parseInputs().annualIncome <= 0}
            className={`px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isCalculating || parseInputs().annualIncome <= 0
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
              'Calculate Affordability'
            )}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {results && results.calculations && (
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Your Affordability Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Maximum Home Price */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#1B5E20] mb-2">Maximum Home Price</h4>
              <div className="text-2xl font-bold text-[#2E7D32]">
                {formatCurrency(results.calculations.maxHomePrice)}
              </div>
            </div>

            {/* Maximum Loan Amount */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#1B5E20] mb-2">Maximum Loan Amount</h4>
              <div className="text-2xl font-bold text-blue-600">
                {formatCurrency(results.calculations.maxLoanAmount)}
              </div>
            </div>

            {/* Monthly Mortgage Payment */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#1B5E20] mb-2">Monthly Mortgage Payment</h4>
              <div className="text-2xl font-bold text-purple-600">
                {formatCurrency(results.calculations.maxMortgagePayment)}
              </div>
            </div>

            {/* GDS Ratio */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-[#1B5E20] mb-2">GDS Ratio</h4>
              <div className="text-2xl font-bold text-orange-600">
                {results.calculations.actualGDS.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-600 mt-1">Max: 32%</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#1B5E20] mb-3">Calculation Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">TDS Ratio:</span>
                <span className="ml-2 font-semibold">{results.calculations.actualTDS.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-gray-600">Credit Score Rate:</span>
                <span className="ml-2 font-semibold">{results.calculations.creditScoreRate}%</span>
              </div>
              <div>
                <span className="text-gray-600">Stress Test Rate:</span>
                <span className="ml-2 font-semibold">{results.calculations.stressTestRate}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!results && hasCalculated && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">
            Please enter valid values for annual income to calculate affordability.
          </p>
        </div>
      )}
    </div>
  );
}

export default AffordabilityCalculator;
