import React, { useState } from 'react';
import { generateDownPaymentOptions, formatCurrency } from '../utils/mortgageCalculations.js';
import MortgageCalculator from '../components/MortgageCalculator.jsx';


import { 
  LazyMortgagePaymentChart as MortgagePaymentChart,
  LazyAffordabilityChart as AffordabilityChart,
  LazyLandTransferTaxChart as LandTransferTaxChart,
  LazyDownPaymentChart as DownPaymentChart,
  LazyAmortizationChart as AmortizationChart
} from '../components/charts/LazyChartWrapper.jsx';


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

// 🏦 Land Transfer Tax Rules System
// Province + city specific tax rule system with baseRates, municipalRates, and rebate info
const landTransferTaxRules = {
  ON: {
    name: 'Ontario',
    baseRates: [
      { upTo: 55000, rate: 0.005 },
      { upTo: 250000, rate: 0.01 },
      { upTo: 400000, rate: 0.015 },
      { upTo: 2000000, rate: 0.02 },
      { upTo: Infinity, rate: 0.025 },
    ],
    cities: {
      Toronto: {
        municipalRates: [
          { upTo: 55000, rate: 0.005 },
          { upTo: 250000, rate: 0.01 },
          { upTo: 400000, rate: 0.015 },
          { upTo: 2000000, rate: 0.02 },
          { upTo: Infinity, rate: 0.025 },
        ],
      },
    },
    firstTimeBuyerRebate: 4000,
  },
  BC: {
    name: 'British Columbia',
    baseRates: [
      { upTo: 200000, rate: 0.01 },
      { upTo: 2000000, rate: 0.02 },
      { upTo: 3000000, rate: 0.03 },
      { upTo: Infinity, rate: 0.05 },
    ],
    firstTimeBuyerRebate: 8000,
  },
  AB: {
    name: 'Alberta',
    baseRates: [], // No provincial tax
    firstTimeBuyerRebate: 0,
  },
  QC: {
    name: 'Quebec',
    baseRates: [
      { upTo: 50000, rate: 0.005 },
      { upTo: 250000, rate: 0.01 },
      { upTo: 500000, rate: 0.015 },
      { upTo: Infinity, rate: 0.025 },
    ],
    cities: {
      Montreal: {
        municipalRates: [
          { upTo: 500000, rate: 0.01 },
          { upTo: Infinity, rate: 0.015 },
        ],
      },
    },
    firstTimeBuyerRebate: 0,
  },
  MB: {
    name: 'Manitoba',
    baseRates: [
      { upTo: 30000, rate: 0 },
      { upTo: 200000, rate: 0.005 },
      { upTo: 1500000, rate: 0.01 },
      { upTo: 2000000, rate: 0.015 },
      { upTo: Infinity, rate: 0.02 },
    ],
    firstTimeBuyerRebate: 0,
  },
  NB: {
    name: 'New Brunswick',
    baseRates: [
      { upTo: 15000, rate: 0 },
      { upTo: 25000, rate: 0.005 },
      { upTo: 150000, rate: 0.01 },
      { upTo: 200000, rate: 0.015 },
      { upTo: Infinity, rate: 0.02 },
    ],
    firstTimeBuyerRebate: 0,
  },
  NL: {
    name: 'Newfoundland and Labrador',
    baseRates: [
      { upTo: 500, rate: 0 },
      { upTo: 25000, rate: 0.005 },
      { upTo: 40000, rate: 0.01 },
      { upTo: 60000, rate: 0.015 },
      { upTo: 200000, rate: 0.02 },
      { upTo: Infinity, rate: 0.025 },
    ],
    firstTimeBuyerRebate: 0,
  },
  NS: {
    name: 'Nova Scotia',
    baseRates: [
      { upTo: 50000, rate: 0.005 },
      { upTo: 150000, rate: 0.01 },
      { upTo: 200000, rate: 0.015 },
      { upTo: 300000, rate: 0.02 },
      { upTo: 500000, rate: 0.025 },
      { upTo: Infinity, rate: 0.03 },
    ],
    firstTimeBuyerRebate: 0,
  },
  PE: {
    name: 'Prince Edward Island',
    baseRates: [
      { upTo: 30000, rate: 0.01 },
      { upTo: 100000, rate: 0.015 },
      { upTo: 200000, rate: 0.02 },
      { upTo: Infinity, rate: 0.025 },
    ],
    firstTimeBuyerRebate: 0,
  },
  SK: {
    name: 'Saskatchewan',
    baseRates: [
      { upTo: 30000, rate: 0 },
      { upTo: 35000, rate: 0.005 },
      { upTo: 100000, rate: 0.01 },
      { upTo: 150000, rate: 0.015 },
      { upTo: 200000, rate: 0.02 },
      { upTo: Infinity, rate: 0.025 },
    ],
    firstTimeBuyerRebate: 0,
  },
  NT: {
    name: 'Northwest Territories',
    baseRates: [
      { upTo: 50000, rate: 0.005 },
      { upTo: 100000, rate: 0.01 },
      { upTo: 200000, rate: 0.015 },
      { upTo: Infinity, rate: 0.02 },
    ],
    firstTimeBuyerRebate: 0,
  },
  NU: {
    name: 'Nunavut',
    baseRates: [
      { upTo: 50000, rate: 0.005 },
      { upTo: 100000, rate: 0.01 },
      { upTo: 200000, rate: 0.015 },
      { upTo: Infinity, rate: 0.02 },
    ],
    firstTimeBuyerRebate: 0,
  },
  YT: {
    name: 'Yukon',
    baseRates: [
      { upTo: 50000, rate: 0.005 },
      { upTo: 100000, rate: 0.01 },
      { upTo: 200000, rate: 0.015 },
      { upTo: Infinity, rate: 0.02 },
    ],
    firstTimeBuyerRebate: 0,
  },
};





// Custom Tooltip Component
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
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          className="fixed z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg max-w-xs pointer-events-none transition-opacity duration-200"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
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



function Calculator() {
  // Tab state
  const [activeTab, setActiveTab] = useState('demo');





  // Affordability calculator form state
  const [affordabilityData, setAffordabilityData] = useState({
    annualIncome: 80000,
    monthlyDebtPayments: 500,
    downPayment: 50000,
    creditScore: 'good'
  });

  // Land transfer tax calculator form state
  const [landTransferData, setLandTransferData] = useState({
    homePrice: 500000,
    province: 'ON',
    isFirstTimeBuyer: false
  });

  // Down payment calculator form state
  const [downPaymentData, setDownPaymentData] = useState({
    homePrice: 500000,
    downPayment: 100000,
    downPaymentType: 'amount', // 'amount' or 'percentage'
    cmhcInsurance: true
  });





  // Calculate affordability using Canadian mortgage stress test rules
  const calculateAffordability = () => {
    const monthlyIncome = affordabilityData.annualIncome / 12;
    const creditScoreRate = creditScoreRanges.find(c => c.value === affordabilityData.creditScore)?.rate || 3.15;
    
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
    let testHomePrice = affordabilityData.downPayment + 100000; // Start with down payment + 100k
    let iterations = 0;
    const maxIterations = 100;
    
    while (iterations < maxIterations) {
      const testLoanAmount = testHomePrice - affordabilityData.downPayment;
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
      const tdsRatio = (monthlyMortgagePayment + monthlyPropertyTax + monthlyHeatingCost + affordabilityData.monthlyDebtPayments) / monthlyIncome;
      
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
      maxHomePrice = affordabilityData.downPayment;
      maxLoanAmount = 0;
      maxMortgagePayment = 0;
      actualGDS = 0;
      actualTDS = (affordabilityData.monthlyDebtPayments / monthlyIncome) * 100;
    }
    
    return {
      maxHomePrice,
      maxLoanAmount,
      maxMortgagePayment,
      actualGDS,
      actualTDS,
      monthlyIncome,
      monthlyPropertyTax,
      monthlyHeatingCost,
      stressTestRate: STRESS_TEST_RATE
    };
  };

  const affordabilityResults = calculateAffordability();

  // 🧠 Tax Calculation Function
  // Calculates land transfer tax for given province, city, price, and first-time buyer status
  const calculateLandTransferTax = () => {
    const rule = landTransferTaxRules[landTransferData.province];
    if (!rule) {
      return { 
        total: 0, 
        breakdown: [], 
        rebate: 0, 
        additionalTaxes: [],
        provinceName: 'Unknown Province',
        hasRebate: false
      };
    }

    const calculateTieredTax = (tiers) => {
      let tax = 0;
      let remaining = landTransferData.homePrice;
      let previous = 0;
      let breakdown = [];

      for (const tier of tiers) {
        if (remaining <= 0) break;
        const taxable = Math.min(tier.upTo - previous, remaining);
        const tierTax = taxable * tier.rate;
        
        if (tierTax > 0) {
          breakdown.push({
            amount: taxable,
            rate: tier.rate,
            tax: tierTax,
            description: `Tax (${(tier.rate * 100).toFixed(2)}%)`
          });
        }
        
        tax += tierTax;
        remaining -= taxable;
        previous = tier.upTo;
      }

      return { tax, breakdown };
    };

    // Calculate base provincial tax
    const baseResult = calculateTieredTax(rule.baseRates || []);
    const baseTax = baseResult.tax;
    const baseBreakdown = baseResult.breakdown;

    // Calculate municipal tax if applicable
    let municipalTax = 0;
    let municipalBreakdown = [];
    if (landTransferData.province === 'ON' && rule.cities?.['Toronto']?.municipalRates) {
      const municipalResult = calculateTieredTax(rule.cities['Toronto'].municipalRates);
      municipalTax = municipalResult.tax;
      municipalBreakdown = municipalResult.breakdown.map(item => ({
        ...item,
        description: `Toronto Municipal ${item.description}`
      }));
    } else if (landTransferData.province === 'QC' && rule.cities?.['Montreal']?.municipalRates) {
      const municipalResult = calculateTieredTax(rule.cities['Montreal'].municipalRates);
      municipalTax = municipalResult.tax;
      municipalBreakdown = municipalResult.breakdown.map(item => ({
        ...item,
        description: `Montreal Municipal ${item.description}`
      }));
    }

    const totalBeforeRebate = baseTax + municipalTax;
    const rebate = landTransferData.isFirstTimeBuyer ? Math.min(baseTax, rule.firstTimeBuyerRebate || 0) : 0;
    const totalAfterRebate = totalBeforeRebate - rebate;

    // Handle special cases (removed since we're using Ontario as default)
    let additionalTaxes = [];

    return {
      total: totalAfterRebate,
      breakdown: [...baseBreakdown, ...municipalBreakdown],
      rebate,
      additionalTaxes,
      provinceName: rule.name,
      hasRebate: rule.firstTimeBuyerRebate > 0,
      baseTax,
      municipalTax,
      totalBeforeRebate
    };
  };

  const landTransferResults = calculateLandTransferTax();

  // Calculate down payment details
  // const calculateDownPayment = () => {
  //   // This function is now replaced by generateDownPaymentOptions from the utility
  //   // Keeping commented for reference
  // };

  // const downPaymentResults = calculateDownPayment(); // Removed as we're using generateDownPaymentOptions now



  // Handle affordability input changes
  const handleAffordabilityChange = (field, value) => {
    setAffordabilityData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle land transfer tax input changes
  const handleLandTransferChange = (field, value) => {
    setLandTransferData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle down payment input changes
  const handleDownPaymentChange = (field, value) => {
    setDownPaymentData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Auto-calculate down payment amount/percentage
      if (field === 'homePrice' || field === 'downPayment') {
        if (newData.downPaymentType === 'percentage') {
          // Enforce minimum down payment based on home price
          let minPercentage = 5;
          if (newData.homePrice >= 500000 && newData.homePrice < 1000000) {
            minPercentage = 10;
          }
          newData.downPayment = Math.min(100, Math.max(minPercentage, newData.downPayment));
        } else {
          // For dollar amount, ensure it doesn't exceed home price
          newData.downPayment = Math.min(newData.homePrice, Math.max(0, newData.downPayment));
        }
      }
      
      // Auto-enable CMHC insurance if down payment is less than 20%
      if (field === 'homePrice' || field === 'downPayment') {
        const downPaymentPercent = newData.downPaymentType === 'percentage' 
          ? newData.downPayment 
          : (newData.downPayment / newData.homePrice) * 100;
        
        if (downPaymentPercent < 20 && newData.homePrice <= 1000000) {
          newData.cmhcInsurance = true;
        }
      }
      
      return newData;
    });
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="bg-[#C8E6C9] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1B5E20] mb-4">
              Mortgage Calculator
            </h1>
            <p className="text-lg sm:text-xl text-[#2E7D32] max-w-3xl mx-auto">
              Calculate your mortgage payments, explore amortization schedules, and determine your home affordability with our comprehensive Canadian mortgage calculator.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('demo')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'demo'
                  ? 'bg-white text-[#1B5E20] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Mortgage Calculator
            </button>
            <button
              onClick={() => setActiveTab('affordability')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'affordability'
                  ? 'bg-white text-[#1B5E20] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Affordability Calculator
            </button>
            <button
              onClick={() => setActiveTab('landTransfer')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'landTransfer'
                  ? 'bg-white text-[#1B5E20] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Land Transfer Tax
            </button>
            <button
              onClick={() => setActiveTab('downPayment')}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                activeTab === 'downPayment'
                  ? 'bg-white text-[#1B5E20] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Down Payment
            </button>

          </div>
        </div>



        {/* Affordability Calculator Tab */}
        {activeTab === 'affordability' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Section - Input Form */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-[#1B5E20] mb-6">Your Financial Information</h2>
                
                {/* Annual Gross Income */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Annual Gross Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={affordabilityData.annualIncome.toLocaleString()}
                      onChange={(e) => handleAffordabilityChange('annualIncome', parseInt(e.target.value.replace(/[,]/g, '')) || 0)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                      placeholder="80,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Your total annual income before taxes</p>
                </div>

                {/* Monthly Debt Payments */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Monthly Debt Payments
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={affordabilityData.monthlyDebtPayments.toLocaleString()}
                      onChange={(e) => handleAffordabilityChange('monthlyDebtPayments', parseInt(e.target.value.replace(/[,]/g, '')) || 0)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      placeholder="500"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Car loans, credit cards, student loans, etc.</p>
                </div>

                {/* Available Down Payment */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Available Down Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={affordabilityData.downPayment.toLocaleString()}
                      onChange={(e) => handleAffordabilityChange('downPayment', parseInt(e.target.value.replace(/[,]/g, '')) || 0)}
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                      placeholder="50,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Cash you have available for down payment</p>
                </div>

                {/* Credit Score Range */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Credit Score Range
                  </label>
                  <select
                    value={affordabilityData.creditScore}
                    onChange={(e) => handleAffordabilityChange('creditScore', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    {creditScoreRanges.map((score) => (
                      <option key={score.value} value={score.value}>
                        {score.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Your credit score affects your mortgage rate</p>
                </div>

                {/* Calculate Button */}
                <button className="w-full bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-[#2E7D32] hover:to-[#388E3C] transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2">
                  Calculate Affordability
                </button>
              </div>

              {/* Right Section - Result Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-[#1B5E20] mb-6">Affordability Results</h2>
                
                {/* Maximum Home Price Highlight */}
                <div className="bg-gradient-to-r from-[#C8E6C9] to-[#E8F5E8] rounded-lg p-6 text-center mb-8">
                  <p className="text-sm text-[#1B5E20] mb-2 font-medium">Maximum Home Price</p>
                  <p className="text-4xl font-bold text-[#1B5E20]">
                    ${affordabilityResults.maxHomePrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#2E7D32] mt-2">
                    Based on your income and debt ratio
                  </p>
                </div>

                {/* GDS Ratio */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">GDS Ratio</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {affordabilityResults.actualGDS.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        affordabilityResults.actualGDS <= 32 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(affordabilityResults.actualGDS, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span className={affordabilityResults.actualGDS <= 32 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      Max: 32%
                    </span>
                  </div>
                </div>

                {/* TDS Ratio */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">TDS Ratio</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {affordabilityResults.actualTDS.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-300 ${
                        affordabilityResults.actualTDS <= 40 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        width: `${Math.min(affordabilityResults.actualTDS, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span className={affordabilityResults.actualTDS <= 40 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                      Max: 40%
                    </span>
                  </div>
                </div>

                {/* Stress Test Rate */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Stress Test Rate</span>
                    <span className="text-lg font-bold text-[#1B5E20]">{STRESS_TEST_RATE}%</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Government requirement for mortgage qualification
                  </p>
                </div>

                {/* Loan Details */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Loan Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maximum Loan Amount:</span>
                      <span className="font-medium">${affordabilityResults.maxLoanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Payment:</span>
                      <span className="font-medium">${affordabilityResults.maxMortgagePayment.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Down Payment:</span>
                      <span className="font-medium">${affordabilityData.downPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section for Affordability Calculator */}
            <div className="mt-8">
              <AffordabilityChart affordabilityData={{
                gdsRatio: affordabilityResults.actualGDS,
                tdsRatio: affordabilityResults.actualTDS
              }} />
            </div>
          </>
        )}

        {/* Land Transfer Tax Calculator Tab */}
        {activeTab === 'landTransfer' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Input Form */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#1B5E20] mb-6">Land Transfer Tax Calculator</h2>
              
              {/* Province Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                  Province/Territory
                </label>
                <select
                  value={landTransferData.province}
                  onChange={(e) => handleLandTransferChange('province', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                >
                  <option value="ON">Ontario</option>
                  <option value="BC">British Columbia</option>
                  <option value="AB">Alberta</option>
                  <option value="QC">Quebec</option>
                  <option value="MB">Manitoba</option>
                  <option value="NB">New Brunswick</option>
                  <option value="NL">Newfoundland and Labrador</option>
                  <option value="NS">Nova Scotia</option>
                  <option value="PE">Prince Edward Island</option>
                  <option value="SK">Saskatchewan</option>
                  <option value="NT">Northwest Territories</option>
                  <option value="NU">Nunavut</option>
                  <option value="YT">Yukon</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Tax rates vary significantly by province
                </p>
              </div>

              {/* Home Price Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={landTransferData.homePrice.toLocaleString()}
                    onChange={(e) => handleLandTransferChange('homePrice', parseInt(e.target.value.replace(/[,]/g, '')) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                    placeholder="500,000"
                  />
                </div>
              </div>

              {/* First-Time Home Buyer Checkbox */}
              <div className="mb-8">
                <div className="flex items-center">
                  <input
                    id="firstTimeBuyer"
                    type="checkbox"
                    checked={landTransferData.isFirstTimeBuyer}
                    onChange={(e) => handleLandTransferChange('isFirstTimeBuyer', e.target.checked)}
                    className="h-5 w-5 text-[#2E7D32] border-gray-300 rounded focus:ring-[#2E7D32]"
                  />
                  <label htmlFor="firstTimeBuyer" className="ml-3 block text-sm text-gray-700">
                    I am a first-time home buyer
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  First-time buyers may be eligible for rebates
                </p>
              </div>

              {/* Calculate Button */}
              <button className="w-full bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-[#2E7D32] hover:to-[#388E3C] transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2">
                Calculate Land Transfer Tax
              </button>
            </div>

            {/* Right Section - Result Summary */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#1B5E20] mb-6">Tax Results</h2>
              
              {/* Total Tax Owed Highlight */}
              <div className="bg-gradient-to-r from-[#C8E6C9] to-[#E8F5E8] rounded-lg p-6 text-center mb-8">
                <p className="text-sm text-[#1B5E20] mb-2 font-medium">Total Land Transfer Tax Owed</p>
                <p className="text-4xl font-bold text-[#1B5E20]">
                  ${landTransferResults.total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                {landTransferResults.rebate > 0 && (
                  <p className="text-sm text-[#2E7D32] mt-2">
                    First-time buyer rebate: -${landTransferResults.rebate.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                )}
              </div>

              {/* Tax Breakdown */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#1B5E20] mb-3">
                  {landTransferResults.provinceName} Tax Breakdown
                </h3>
                
                {/* Provincial Tax */}
                {landTransferResults.baseTax > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Provincial Tax</h4>
                    <div className="space-y-2">
                      {landTransferResults.breakdown.filter(item => !item.description.includes('Municipal')).map((bracket, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            ${bracket.amount.toLocaleString()} @ {(bracket.rate * 100).toFixed(2)}%
                          </span>
                          <span className="font-medium">
                            ${bracket.tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
                        <span className="text-gray-900">Provincial Total:</span>
                        <span className="text-[#1B5E20]">
                          ${landTransferResults.baseTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Municipal Tax */}
                {landTransferResults.municipalTax > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Municipal Tax</h4>
                    <div className="space-y-2">
                      {landTransferResults.breakdown.filter(item => item.description.includes('Municipal')).map((bracket, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            ${bracket.amount.toLocaleString()} @ {(bracket.rate * 100).toFixed(2)}%
                          </span>
                          <span className="font-medium">
                            ${bracket.tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-2">
                        <span className="text-gray-900">Municipal Total:</span>
                        <span className="text-[#1B5E20]">
                          ${landTransferResults.municipalTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Before Rebate */}
                <div className="border-t border-gray-300 pt-3 mb-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-gray-900">Total Before Rebate:</span>
                    <span className="text-[#1B5E20]">
                      ${landTransferResults.totalBeforeRebate.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* First-Time Buyer Rebate */}
                {landTransferResults.rebate > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm font-semibold text-green-600">
                      <span>First-Time Buyer Rebate:</span>
                      <span>-${landTransferResults.rebate.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                )}

                {/* Additional Taxes */}
                {landTransferResults.additionalTaxes.length > 0 && (
                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Taxes</h4>
                    {landTransferResults.additionalTaxes.map((tax, idx) => (
                      <div key={`additional-${idx}`} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {tax.name} ({(tax.rate * 100).toFixed(2)}%)
                        </span>
                        <span className="font-medium">
                          ${tax.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* First-time Buyer Information */}
              {landTransferResults.hasRebate && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">First-Time Buyer Information</h4>
                  <p className="text-sm text-green-800">
                    {landTransferResults.provinceName} offers a first-time home buyer rebate of up to ${
                      landTransferTaxRules[landTransferData.province]?.firstTimeBuyerRebate.toLocaleString()
                    }.
                  </p>
                </div>
              )}

              {/* No Rebate Information */}
              {!landTransferResults.hasRebate && landTransferData.isFirstTimeBuyer && (
                <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">First-Time Buyer Information</h4>
                  <p className="text-sm text-yellow-800">
                    {landTransferResults.provinceName} does not currently offer a first-time home buyer rebate for land transfer tax.
                  </p>
                </div>
              )}

              {/* Additional Information */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Tax rates vary significantly by province</li>
                  <li>• Alberta has no provincial land transfer tax</li>
                  <li>• Municipal taxes apply in Toronto (ON) and Montreal (QC)</li>
                  <li>• First-time buyer rebates may apply</li>
                  <li>• Consult with a legal professional for accuracy</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Charts Section for Land Transfer Tax Calculator */}
          <div className="mt-8">
            <LandTransferTaxChart landTransferData={{
              provincialTax: landTransferResults.baseTax,
              municipalTax: landTransferResults.municipalTax,
              totalTax: landTransferResults.total,
              homePrice: landTransferData.homePrice,
              firstTimeBuyerRebate: landTransferResults.rebate,
              province: landTransferData.province,
              provinceName: landTransferResults.provinceName
            }} />
          </div>
        </>
        )}

        {/* Down Payment Calculator Tab */}
        {activeTab === 'downPayment' && (
          <>
            <div className="space-y-8">
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#1B5E20] mb-6">Down Payment Calculator</h2>
              
              {/* Home Price Input */}
              <div className="max-w-md">
                <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={downPaymentData.homePrice.toLocaleString()}
                    onChange={(e) => handleDownPaymentChange('homePrice', parseInt(e.target.value.replace(/[,]/g, '')) || 0)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent text-lg font-medium"
                    placeholder="500,000"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter the asking price of the home
                </p>
              </div>
            </div>

            {/* Results Section - All Tiers */}
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-[#1B5E20] mb-6">Down Payment Options</h2>
              
              {/* Generate down payment options for all tiers */}
              {(() => {
                const downPaymentOptions = generateDownPaymentOptions(downPaymentData.homePrice);
                
                return (
                  <div className="space-y-3">
                    {/* Compact Table Header */}
                    <div className="grid grid-cols-5 gap-3 p-3 bg-gray-50 rounded-lg font-semibold text-[#1B5E20] text-sm">
                      <div className="text-left">Down Payment</div>
                      <div className="text-center">5%</div>
                      <div className="text-center">10%</div>
                      <div className="text-center">15%</div>
                      <div className="text-center">20%</div>
                    </div>

                    {/* Down Payment Row */}
                    <div className="grid grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center text-sm font-medium text-gray-700">
                        <span className="mr-2">−</span>
                        Down payment
                      </div>
                      {downPaymentOptions.map((option) => (
                        <div key={`dp-${option.percent}`} className="text-center">
                          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-sm font-medium text-gray-900 mb-1">
                            {option.percent}%
                          </div>
                          <div className="bg-white border border-gray-300 rounded px-2 py-1 text-sm font-medium text-gray-900">
                            {formatCurrency(option.downPayment)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CMHC Insurance Row */}
                    <div className="grid grid-cols-5 gap-3 p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center text-sm font-medium text-gray-700">
                        <span className="mr-2">+</span>
                        CMHC insurance
                      </div>
                      {downPaymentOptions.map((option) => (
                        <div key={`insurance-${option.percent}`} className="text-center">
                          <div className={`px-2 py-1 text-sm font-medium ${
                            option.insurancePremium > 0 ? 'text-[#2E7D32]' : 'text-gray-500'
                          }`}>
                            {option.insurancePremium > 0 ? formatCurrency(option.insurancePremium) : '$0'}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total Mortgage Row */}
                    <div className="grid grid-cols-5 gap-3 p-3 bg-[#E8F5E8] border border-[#C8E6C9] rounded-lg">
                      <div className="flex items-center text-sm font-semibold text-[#1B5E20]">
                        <span className="mr-2">=</span>
                        Total mortgage
                      </div>
                      {downPaymentOptions.map((option) => (
                        <div key={`total-${option.percent}`} className="text-center">
                          <div className={`px-2 py-1 text-sm font-semibold ${
                            option.isEligible ? 'text-[#1B5E20]' : 'text-red-600'
                          }`}>
                            {formatCurrency(option.totalMortgage)}
                          </div>
                          {!option.isEligible && (
                            <div className="text-xs text-red-600 mt-1">
                              Not eligible
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Warning Messages */}
                    {downPaymentOptions.some(option => !option.isEligible) && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-red-900 mb-2">⚠️ Eligibility Warnings</h4>
                        <div className="space-y-1">
                          {downPaymentOptions
                            .filter(option => !option.isEligible)
                            .map((option) => (
                              <p key={`warning-${option.percent}`} className="text-xs text-red-800">
                                <strong>{option.percent}%:</strong> {option.warningMessage}
                              </p>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            {/* Summary Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* CMHC Insurance Information */}
              <div className="bg-[#E8F5E8] rounded-lg p-6 border border-[#C8E6C9]">
                <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">CMHC Insurance Tiers</h3>
                <div className="space-y-2 text-sm text-[#2E7D32]">
                  <div className="flex justify-between">
                    <span>5-9.99% down payment:</span>
                    <span className="font-medium">4.00% premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>10-14.99% down payment:</span>
                    <span className="font-medium">3.10% premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>15-19.99% down payment:</span>
                    <span className="font-medium">2.80% premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span>20%+ down payment:</span>
                    <span className="font-medium">No insurance required</span>
                  </div>
                </div>
              </div>

              {/* Down Payment Guidelines */}
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">Down Payment Rules</h3>
                <ul className="text-sm text-yellow-800 space-y-2">
                  <li>• <strong>Under $500K:</strong> Minimum 5% down payment</li>
                  <li>• <strong>$500K-$999K:</strong> Minimum 10% down payment</li>
                  <li>• <strong>$1M+:</strong> CMHC insurance not available (20%+ required)</li>
                  <li>• Higher down payment = lower monthly payments</li>
                  <li>• 20%+ down payment avoids CMHC insurance costs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Charts Section for Down Payment Calculator */}
          <div className="mt-8">
            <DownPaymentChart downPaymentOptions={generateDownPaymentOptions(downPaymentData.homePrice)} />
          </div>
        </>
        )}

                {/* Demo Calculator Tab */}
        {activeTab === 'demo' && (
          <>
            <MortgageCalculator />
            
            
          </>
        )}

        {/* Additional Information */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Important Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">About This Calculator</h4>
              <ul className="space-y-1">
                <li>• Results are estimates only</li>
                <li>• Actual rates may vary by lender</li>
                <li>• Property taxes vary by location</li>
                <li>• Insurance costs depend on coverage</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
              <ul className="space-y-1">
                <li>• Get pre-approved for accurate rates</li>
                <li>• Compare multiple lenders</li>
                <li>• Consider closing costs</li>
                <li>• Consult with a mortgage broker</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Calculator; 