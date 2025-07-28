import React, { useState, useEffect } from 'react';
import { generateDownPaymentOptions, formatCurrency } from '../utils/mortgageCalculations.js';
import MortgagePaymentChart from '../components/charts/MortgagePaymentChart.jsx';
import AffordabilityChart from '../components/charts/AffordabilityChart.jsx';
import LandTransferTaxChart from '../components/charts/LandTransferTaxChart.jsx';
import DownPaymentChart from '../components/charts/DownPaymentChart.jsx';
import AmortizationChart from '../components/charts/AmortizationChart.jsx';
import tooltipIcon from '../assets/ToolTip.png';

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

// Province data
const provinces = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland and Labrador' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'Northwest Territories' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'Prince Edward Island' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' }
];





// CMHC Insurance rate function
const getCMHCRate = (downPaymentPercent) => {
  if (downPaymentPercent >= 20) return 0;
  if (downPaymentPercent >= 15) return 2.8;
  if (downPaymentPercent >= 10) return 3.1;
  if (downPaymentPercent >= 5) return 4.0;
  return 4.0; // Default for anything below 5%
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

  // Mortgage payment calculator form state - Updated with realistic values
  const [formData, setFormData] = useState({
    homePrice: 500000, // Changed from 3000 to 500000
    downPayment: 100000, // Changed from 600 to 100000
    downPaymentPercent: 20,
    interestRate: 2.89,
    amortizationPeriod: 25,
    paymentFrequency: 'monthly',
    province: 'ON',
    propertyTax: 5000,
    insurance: 1200,
    condoFee: 0,
    cmhc: 0
  });

  // Input display values - Synchronized with formData
  const [inputValues, setInputValues] = useState({
    homePrice: '500000', // Match formData.homePrice
    downPayment: '100000', // Match formData.downPayment
    interestRate: '2.89', // Match formData.interestRate
    propertyTax: '5000', // Match formData.propertyTax
    insurance: '1200', // Match formData.insurance
    condoFee: '0' // Match formData.condoFee
  });

  // Calculate mortgage payments using the formula: P = L[c(1 + c)^n]/[(1 + c)^n – 1]
  const calculateMortgage = () => {
    const loanAmount = formData.homePrice - formData.downPayment;
    
    // Handle edge cases
    if (loanAmount <= 0 || formData.interestRate <= 0 || formData.amortizationPeriod <= 0) {
      return {
        loanAmount: 0,
        monthlyPayment: 0,
        frequencyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
        monthlyPropertyTax: 0,
        monthlyInsurance: 0,
        monthlyCondoFee: 0,
        monthlyCMHC: 0,
        totalMonthlyCost: 0,
        principalPortion: 0,
        interestPortion: 0,
        taxPortion: 0
      };
    }
    
    // Convert annual interest rate to monthly rate
    const monthlyRate = formData.interestRate / 100 / 12;
    const totalPayments = formData.amortizationPeriod * 12;
    
    // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n – 1]
    // Where: P = monthly payment, L = loan amount, c = monthly interest rate, n = total payments
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Calculate total interest over the life of the loan
    const totalInterest = (monthlyPayment * totalPayments) - loanAmount;
    
    // Calculate total payments over the life of the loan
    const totalPayment = monthlyPayment * totalPayments;
    
    // Calculate frequency-adjusted payment
    let frequencyPayment = monthlyPayment;
    if (formData.paymentFrequency === 'biweekly') {
      frequencyPayment = monthlyPayment / 2;
    } else if (formData.paymentFrequency === 'weekly') {
      frequencyPayment = monthlyPayment / 4;
    } else if (formData.paymentFrequency === 'accelerated') {
      // Accelerated bi-weekly: 26 payments per year instead of 24
      frequencyPayment = (monthlyPayment * 12) / 26;
    }
    
    // Calculate monthly additional costs
    const monthlyPropertyTax = formData.propertyTax / 12;
    const monthlyInsurance = formData.insurance / 12;
    const monthlyCondoFee = formData.condoFee; // Already monthly
    const monthlyCMHC = formData.cmhc / 12;
    
    // Calculate total monthly cost including all expenses
    const totalMonthlyCost = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyCondoFee + monthlyCMHC;
    
    // Calculate accurate principal and interest portions for the first payment
    const firstPaymentInterest = loanAmount * monthlyRate;
    const firstPaymentPrincipal = monthlyPayment - firstPaymentInterest;
    
    // Calculate portions for the breakdown chart
    const principalPortion = firstPaymentPrincipal;
    const interestPortion = firstPaymentInterest;
    const taxPortion = monthlyPropertyTax + monthlyInsurance + monthlyCondoFee + monthlyCMHC;
    
    return {
      loanAmount,
      monthlyPayment,
      frequencyPayment,
      totalInterest,
      totalPayment,
      monthlyPropertyTax,
      monthlyInsurance,
      monthlyCondoFee,
      monthlyCMHC,
      totalMonthlyCost,
      principalPortion,
      interestPortion,
      taxPortion
    };
  };

  // Affordability calculator form state
  const [affordabilityData, setAffordabilityData] = useState({
    annualIncome: 80000,
    monthlyDebtPayments: 500,
    downPayment: 50000,
    creditScore: 'good'
  });

  // Land transfer tax calculator form state
  const [landTransferData, setLandTransferData] = useState({
    province: 'ON',
    homePrice: 500000,
    isFirstTimeBuyer: false,
    city: 'Toronto' // For municipal surcharges
  });

  // Down payment calculator form state
  const [downPaymentData, setDownPaymentData] = useState({
    homePrice: 500000,
    downPayment: 100000,
    downPaymentType: 'amount', // 'amount' or 'percentage'
    cmhcInsurance: true
  });

  // Demo calculator form state
  const [demoData, setDemoData] = useState({
    amortizationPeriod: 25,
    mortgageRate: 3.84,
    paymentFrequency: 'monthly',
    isFirstTimeBuyer: false,
    cashToCloseExpanded: false,
    amortizationExpanded: false
  });

  const [scrollProgress, setScrollProgress] = useState(0);

  // Validation functions
  const validateHomePrice = (value) => {
    if (!value || value === '') {
      return 'Home price is required';
    }
    if (isNaN(value) || value <= 0) {
      return 'Home price must be a positive number';
    }
    if (value < 1000) {
      return 'Home price must be at least $1,000';
    }
    if (value > 10000000) {
      return 'Home price cannot exceed $10,000,000';
    }
    return null;
  };

  const validateInterestRate = (value) => {
    if (!value || value === '') {
      return 'Interest rate is required';
    }
    if (isNaN(value) || value <= 0) {
      return 'Interest rate must be a positive number';
    }
    if (value < 0.1) {
      return 'Interest rate must be at least 0.1%';
    }
    if (value > 25) {
      return 'Interest rate cannot exceed 25%';
    }
    return null;
  };

  const validateAmortizationPeriod = (value) => {
    if (!value || value === '') {
      return 'Amortization period is required';
    }
    if (isNaN(value) || value <= 0) {
      return 'Amortization period must be a positive number';
    }
    if (value < 1) {
      return 'Amortization period must be at least 1 year';
    }
    if (value > 50) {
      return 'Amortization period cannot exceed 50 years';
    }
    return null;
  };

  const validateDownPayment = (value, homePrice) => {
    if (!value || value === '') {
      return 'Down payment is required';
    }
    if (isNaN(value) || value < 0) {
      return 'Down payment must be a positive number';
    }
    if (value >= homePrice) {
      return 'Down payment cannot be greater than or equal to home price';
    }
    return null;
  };

  const validatePropertyTax = (value) => {
    if (!value || value === '') {
      return 'Property tax is required';
    }
    if (isNaN(value) || value < 0) {
      return 'Property tax must be a positive number';
    }
    if (value > 100000) {
      return 'Property tax cannot exceed $100,000';
    }
    return null;
  };

  const validateInsurance = (value) => {
    if (!value || value === '') {
      return 'Insurance is required';
    }
    if (isNaN(value) || value < 0) {
      return 'Insurance must be a positive number';
    }
    if (value > 50000) {
      return 'Insurance cannot exceed $50,000';
    }
    return null;
  };

  const validateCondoFee = (value) => {
    if (!value || value === '') {
      return 'Condo fee is required';
    }
    if (isNaN(value) || value < 0) {
      return 'Condo fee must be a positive number';
    }
    if (value > 10000) {
      return 'Condo fee cannot exceed $10,000';
    }
    return null;
  };

  // Calculate mortgage data whenever form data changes
  const mortgageData = calculateMortgage();

  // Calculate affordability using Canadian mortgage stress test rules
  const calculateAffordability = () => {
    const monthlyIncome = affordabilityData.annualIncome / 12;
    
    // Canadian mortgage qualification rules
    const MAX_GDS_RATIO = 0.32; // 32% of gross monthly income
    const MAX_TDS_RATIO = 0.40; // 40% of gross monthly income
    
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
      monthlyHeatingCost
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
    if (landTransferData.city && rule.cities?.[landTransferData.city]?.municipalRates) {
      const municipalResult = calculateTieredTax(rule.cities[landTransferData.city].municipalRates);
      municipalTax = municipalResult.tax;
      municipalBreakdown = municipalResult.breakdown.map(item => ({
        ...item,
        description: `${landTransferData.city} Municipal ${item.description}`
      }));
    }

    const totalBeforeRebate = baseTax + municipalTax;
    const rebate = landTransferData.isFirstTimeBuyer ? Math.min(baseTax, rule.firstTimeBuyerRebate || 0) : 0;
    const totalAfterRebate = totalBeforeRebate - rebate;

    // Handle special cases
    let additionalTaxes = [];
    if (landTransferData.province === 'AB' && baseTax === 0) {
      // Alberta has no provincial tax, only municipal (estimated)
      additionalTaxes.push({
        name: 'Municipal Transfer Tax (estimated)',
        amount: landTransferData.homePrice * 0.005,
        rate: 0.005
      });
    }

    // Quebec uses "Welcome Tax" terminology
    if (landTransferData.province === 'QC') {
      baseBreakdown.forEach(item => {
        item.description = item.description.replace('Tax', 'Welcome Tax');
      });
    }

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

  // Log calculation details for debugging
  useEffect(() => {
    console.log('Mortgage Calculation Updated:', {
      homePrice: formData.homePrice,
      downPayment: formData.downPayment,
      loanAmount: mortgageData.loanAmount,
      interestRate: formData.interestRate,
      monthlyPayment: mortgageData.monthlyPayment,
      totalInterest: mortgageData.totalInterest,
      totalPayment: mortgageData.totalPayment
    });
  }, [formData, mortgageData]);

  // Initialize CMHC calculation on component mount
  useEffect(() => {
    const cmhcRate = getCMHCRate(formData.downPaymentPercent);
    const loanAmount = formData.homePrice - formData.downPayment;
    const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
    
    if (formData.cmhc !== cmhcAmount) {
      setFormData(prev => ({
        ...prev,
        cmhc: cmhcAmount
      }));
    }
  }, []); // Only run on mount

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

  // Handle demo calculator input changes
  const handleDemoChange = (field, value) => {
    setDemoData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Update handleInputChange to properly sync inputValues and formData
  const handleInputChange = (field, value) => {
    // Update the display value immediately for better UX
    setInputValues(prev => ({
      ...prev,
      [field]: value
    }));

    // Parse the value for validation and calculation
    let parsedValue = value;
    if (typeof value === 'string') {
      // Remove currency symbols, commas, and spaces for numeric fields
      if (['homePrice', 'downPayment', 'propertyTax', 'insurance', 'condoFee'].includes(field)) {
        parsedValue = parseFloat(value.replace(/[$,]/g, '')) || 0;
      } else if (field === 'downPaymentPercent') {
        parsedValue = parseFloat(value.replace(/[%]/g, '')) || 0;
      } else if (['interestRate'].includes(field)) {
        parsedValue = parseFloat(value.replace(/[%]/g, '')) || 0;
      } else if (['amortizationPeriod'].includes(field)) {
        parsedValue = parseInt(value) || 0;
      }
    }

    // Validate input based on field type
    let error = null;
    
    switch (field) {
      case 'homePrice':
        error = validateHomePrice(parsedValue);
        break;
      case 'interestRate':
        error = validateInterestRate(parsedValue);
        break;
      case 'amortizationPeriod':
        error = validateAmortizationPeriod(parsedValue);
        break;
      case 'downPayment':
        error = validateDownPayment(parsedValue, formData.homePrice);
        break;
      case 'propertyTax':
        error = validatePropertyTax(parsedValue);
        break;
      case 'insurance':
        error = validateInsurance(parsedValue);
        break;
      case 'condoFee':
        error = validateCondoFee(parsedValue);
        break;
      default:
        break;
    }



    // Only update form data if validation passes or field is not numeric
    if (!error || ['paymentFrequency', 'province', 'city'].includes(field)) {
      setFormData(prev => {
        const newData = { ...prev, [field]: parsedValue };
        
        // Auto-calculate down payment percentage
        if (field === 'homePrice' || field === 'downPayment') {
          const newDownPaymentPercent = (newData.downPayment / newData.homePrice) * 100;
          newData.downPaymentPercent = Math.round(newDownPaymentPercent * 100) / 100;
        }
        
        // Auto-calculate down payment amount
        if (field === 'downPaymentPercent') {
          const newDownPayment = (newData.homePrice * parsedValue) / 100;
          newData.downPayment = Math.round(newDownPayment);
          // Also update inputValues for downPayment
          setInputValues(prev => ({
            ...prev,
            downPayment: newData.downPayment.toString()
          }));
        }
        
        // Calculate CMHC insurance based on down payment percentage
        if (field === 'homePrice' || field === 'downPayment' || field === 'downPaymentPercent') {
          const downPaymentPercent = field === 'downPaymentPercent' ? parsedValue : newData.downPaymentPercent;
          const cmhcRate = getCMHCRate(downPaymentPercent);
          const loanAmount = newData.homePrice - newData.downPayment;
          newData.cmhc = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
        }
        
        return newData;
      });
    }
  };

  // Handle input blur to format the display value
  const handleInputBlur = (field) => {
    const value = inputValues[field];
    let formattedValue = value;
    
    if (['homePrice', 'downPayment', 'propertyTax', 'insurance', 'condoFee'].includes(field)) {
      const numValue = parseFloat(value.replace(/[$,]/g, '')) || 0;
      formattedValue = numValue.toLocaleString();
    } else if (field === 'interestRate') {
      const numValue = parseFloat(value.replace(/[%]/g, '')) || 0;
      formattedValue = `${numValue}%`;
    }
    
    setInputValues(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  // Handle input focus to show raw value for editing
  const handleInputFocus = (field) => {
    const value = inputValues[field];
    let rawValue = value;
    
    if (['homePrice', 'downPayment', 'propertyTax', 'insurance', 'condoFee'].includes(field)) {
      const numValue = parseFloat(value.replace(/[$,]/g, '')) || 0;
      rawValue = numValue.toString();
    } else if (field === 'interestRate') {
      const numValue = parseFloat(value.replace(/[%]/g, '')) || 0;
      rawValue = numValue.toString();
    }
    
    setInputValues(prev => ({
      ...prev,
      [field]: rawValue
    }));
  };

  // Handle scroll progress
  const handleScroll = (e) => {
    const element = e.target;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
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
              
              {/* Province Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                  Province
                </label>
                <select
                  value={landTransferData.province}
                  onChange={(e) => handleLandTransferChange('province', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                >
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Selector for provinces with municipal taxes */}
              {landTransferData.province && landTransferTaxRules[landTransferData.province]?.cities && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    City (for municipal taxes)
                  </label>
                  <select
                    value={landTransferData.city}
                    onChange={(e) => handleLandTransferChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    <option value="">No municipal tax</option>
                    {Object.keys(landTransferTaxRules[landTransferData.province].cities).map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Some cities have additional municipal land transfer taxes
                  </p>
                </div>
              )}

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
                <div className="space-y-2">
                  {landTransferResults.breakdown.map((bracket, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        ${bracket.amount.toLocaleString()} @ {(bracket.rate * 100).toFixed(2)}%
                      </span>
                      <span className="font-medium">
                        ${bracket.tax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                  
                  {/* Additional Taxes */}
                  {landTransferResults.additionalTaxes.map((tax, idx) => (
                    <div key={`additional-${idx}`} className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                      <span className="text-gray-600">
                        {tax.name} ({(tax.rate * 100).toFixed(2)}%)
                      </span>
                      <span className="font-medium">
                        ${tax.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* First-time Buyer Information */}
              {landTransferResults.hasRebate && (
                <div className="mt-4 bg-green-50 rounded-lg p-4 border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">First-Time Buyer Information</h4>
                  <p className="text-sm text-green-800">
                    {landTransferResults.provinceName} offers a first-time home buyer rebate of up to ${
                      landTransferResults.rebate > 0 ? landTransferResults.rebate.toLocaleString() : 
                      landTransferTaxRules[landTransferData.province]?.firstTimeBuyerRebate.toLocaleString()
                    }.
                  </p>
                </div>
              )}

              {/* Additional Information */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Important Notes</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Tax rates vary by province</li>
                  <li>• First-time buyer rebates may apply</li>
                  <li>• Additional municipal taxes may apply</li>
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
              firstTimeBuyerRebate: landTransferResults.rebate
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
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#1B5E20] mb-3 sm:mb-4">Mortgage Payment Calculator</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Calculate your mortgage payments and explore different scenarios with our comprehensive calculator.</p>
              
              {/* Start Here Section */}
              <div className="mb-8">
                <div>
                  {/* Start Here - Price Input */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                      Start here
                      <Tooltip content="Enter the purchase price of the home you're interested in. This is the total amount you'll pay for the property.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" />
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
                </div>
              </div>



              {/* Additional Input Fields */}
              <div className="mb-6 sm:mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {/* Interest Rate */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                      Interest Rate
                      <Tooltip content="The annual interest rate on your mortgage loan. This determines how much interest you'll pay over the life of your loan.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={inputValues.interestRate}
                        onChange={(e) => handleInputChange('interestRate', e.target.value)}
                        onBlur={() => handleInputBlur('interestRate')}
                        onFocus={() => handleInputFocus('interestRate')}
                        className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                        placeholder="2.89%"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>

                  {/* Amortization Period */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                      Amortization Period
                      <Tooltip content="The total time it will take to pay off your mortgage completely. Longer periods mean lower monthly payments but more total interest paid.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </label>
                    <select
                      value={formData.amortizationPeriod}
                      onChange={(e) => handleInputChange('amortizationPeriod', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    >
                      <option value={20}>20 years</option>
                      <option value={25}>25 years</option>
                      <option value={30}>30 years</option>
                    </select>
                  </div>

                  {/* Payment Frequency */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                      Payment Frequency
                      <Tooltip content="How often you make mortgage payments. More frequent payments can help you pay off your mortgage faster and save on interest.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" />
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

                  {/* Province */}
                  <div>
                    <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                      Province
                      <Tooltip content="Select your province to calculate accurate land transfer taxes and other location-specific costs.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 w-4 h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </label>
                    <select
                      value={formData.province}
                      onChange={(e) => handleInputChange('province', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                    >
                      {provinces.map((province) => (
                        <option key={province.code} value={province.code}>
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>







              {/* Main Calculator Grid */}
              <div className="relative mt-12 sm:mt-0">
                {/* Scroll indicator for mobile */}
                <div className="sm:hidden absolute -top-10 right-0 z-10 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-gray-600 border border-gray-200 shadow-md">
                  <span className="flex items-center font-medium">
                    <svg className="w-3 h-3 mr-1.5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                    </svg>
                    Swipe to see all rates
                  </span>
                </div>
                
                {/* Scroll progress indicator */}
                <div className="sm:hidden absolute bottom-0 left-0 right-0 h-1 bg-gray-100 z-10">
                  <div 
                    className="h-full bg-[#1B5E20] transition-all duration-300" 
                    style={{ width: `${scrollProgress}%` }}
                  ></div>
                </div>
                
                <div 
                  className="overflow-x-auto -mx-4 sm:mx-0 border border-gray-200 rounded-lg" 
                  onScroll={handleScroll}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#d1d5db #f3f4f6'
                  }}
                >
                  <style jsx>{`
                    .overflow-x-auto::-webkit-scrollbar {
                      height: 8px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-track {
                      background: #f3f4f6;
                      border-radius: 4px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb {
                      background: #d1d5db;
                      border-radius: 4px;
                    }
                    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                      background: #9ca3af;
                    }
                  `}</style>
                                    <div className="min-w-[1200px] sm:min-w-full pb-4 sm:pb-0">
                    {/* Visual scroll hint */}
                    <div className="sm:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-5"></div>
                    <div className="sm:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-5"></div>
                    {/* Grid Header */}
                    <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 px-4 sm:px-0">
                    <div className="text-xs sm:text-sm font-medium text-gray-700"></div>
                    <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">5%</div>
                    <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">10%</div>
                    <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">15%</div>
                    <div className="text-center text-xs sm:text-sm font-semibold text-[#1B5E20]">20%</div>
                  </div>

                  {/* Down Payment Row */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
                      <span className="mr-1 sm:mr-2">−</span>
                      <span className="hidden sm:inline">Down payment</span>
                      <span className="sm:hidden">Down</span>
                      <Tooltip content="The amount of money you pay upfront when buying a home. A larger down payment means a smaller mortgage and lower monthly payments.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => (
                      <div key={`dp-${percent}`} className="text-center">
                        <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">{percent}%</div>
                        <div 
                          className="text-xs sm:text-sm font-semibold text-[#1B5E20]"
                          aria-live="polite"
                          aria-label={`Down payment for ${percent} percent: $${Math.round((formData.homePrice * percent) / 100).toLocaleString()}`}
                        >
                          ${Math.round((formData.homePrice * percent) / 100).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CMHC Insurance Row */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
                      <span className="mr-1 sm:mr-2">+</span>
                      <span className="hidden sm:inline">CMHC insurance</span>
                      <span className="sm:hidden">CMHC</span>
                      <Tooltip content="Mortgage default insurance required when your down payment is less than 20%. This protects the lender and is added to your mortgage amount.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => {
                      const downPayment = (formData.homePrice * percent) / 100;
                      const loanAmount = formData.homePrice - downPayment;
                      const cmhcRate = getCMHCRate(percent);
                      const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                      
                      return (
                        <div key={`cmhc-${percent}`} className="text-center">
                          <div 
                            className="text-xs sm:text-sm font-semibold text-[#2E7D32]"
                            aria-live="polite"
                            aria-label={`CMHC insurance for ${percent} percent down payment: $${cmhcAmount.toLocaleString()}`}
                          >
                            ${cmhcAmount.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total Mortgage Row - Green Theme Highlighted */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                      <span className="mr-1 sm:mr-2">=</span>
                      <span className="hidden sm:inline">Total mortgage</span>
                      <span className="sm:hidden">Total</span>
                      <Tooltip content="The total amount you're borrowing, including the loan amount plus any CMHC insurance. This is what you'll pay interest on.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => {
                      const downPayment = (formData.homePrice * percent) / 100;
                      const loanAmount = formData.homePrice - downPayment;
                      const cmhcRate = getCMHCRate(percent);
                      const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                      const totalMortgage = loanAmount + cmhcAmount;
                      
                      return (
                        <div key={`total-${percent}`} className="text-center">
                          <div 
                            className="text-lg sm:text-2xl font-bold text-[#1B5E20]"
                            aria-live="polite"
                            aria-label={`Total mortgage for ${percent} percent down payment: $${totalMortgage.toLocaleString()}`}
                          >
                            ${totalMortgage.toLocaleString()}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Amortization Row */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
                      <span className="hidden sm:inline">Amortization</span>
                      <span className="sm:hidden">Amort</span>
                      <Tooltip content="The total time to pay off your mortgage. Longer amortization means lower monthly payments but more total interest paid over time.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => (
                      <div key={`amort-${percent}`} className="text-center">
                        <select 
                          value={demoData.amortizationPeriod}
                          onChange={(e) => handleDemoChange('amortizationPeriod', parseInt(e.target.value))}
                          className="w-full px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                        >
                          <option value={25}>25 years</option>
                          <option value={29}>29 years</option>
                          <option value={30}>30 years</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  {/* Mortgage Rate Row */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50 px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                      <span className="hidden sm:inline">Mortgage rate</span>
                      <span className="sm:hidden">Rate</span>
                      <Tooltip content="The interest rate on your mortgage loan. This rate determines how much interest you'll pay each month and over the life of your loan.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => (
                      <div key={`rate-${percent}`} className="text-center">
                        <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow duration-200 min-w-[160px]">
                          <div className="font-semibold text-[#1B5E20] text-xs sm:text-sm mb-2 sm:mb-3 break-words leading-tight">
                            {demoData.mortgageRate}% 5-yr/fix
                          </div>
                          <div className="flex items-center justify-center mb-3 sm:mb-4">
                            <span className="text-gray-500 mr-1">🏠</span>
                            <span className="text-gray-600 text-xs hidden sm:inline">Canadian Lender</span>
                            <span className="text-gray-600 text-xs sm:hidden">Lender</span>
                          </div>
                          <select 
                            value={demoData.mortgageRate}
                            onChange={(e) => handleDemoChange('mortgageRate', parseFloat(e.target.value))}
                            className="w-full text-[#2E7D32] text-xs border border-gray-200 rounded px-2 sm:px-3 py-1.5 bg-white focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent mb-3 sm:mb-4"
                          >
                            <option value={3.84}>3.84% (5-yr fixed)</option>
                            <option value={4.09}>4.09% (5-yr fixed)</option>
                          </select>
                          <button 
                            onClick={() => window.location.href = '/rates'}
                            className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-xs font-medium py-2 sm:py-2.5 px-3 sm:px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 shadow-sm hover:shadow-md whitespace-nowrap"
                          >
                            <span className="hidden sm:inline">Mortgage Rate</span>
                            <span className="sm:hidden">Rate</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Frequency Row */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-2 sm:p-3 border border-gray-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-medium text-gray-700">
                      <span className="hidden sm:inline">Payment frequency</span>
                      <span className="sm:hidden">Frequency</span>
                      <Tooltip content="How often you make mortgage payments. More frequent payments can help you pay off your mortgage faster and save on interest.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => (
                      <div key={`freq-${percent}`} className="text-center">
                        <select 
                          value={demoData.paymentFrequency}
                          onChange={(e) => handleDemoChange('paymentFrequency', e.target.value)}
                          className="w-full px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="biweekly">Bi-weekly</option>
                          <option value="weekly">Weekly</option>
                        </select>
                      </div>
                    ))}
                  </div>  {/* Add the missing closing angle bracket here */}

                  {/* Mortgage Payment Row - Green Theme Highlighted */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                      <span className="mr-1 sm:mr-2">=</span>
                      <span className="hidden sm:inline">Mortgage payment</span>
                      <span className="sm:hidden">Payment</span>
                      <Tooltip content="Your regular payment amount based on the mortgage amount, interest rate, and payment frequency. This is what you'll pay each period.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => {
                      const downPayment = (formData.homePrice * percent) / 100;
                      const loanAmount = formData.homePrice - downPayment;
                      const cmhcRate = getCMHCRate(percent);
                      const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                      const totalMortgage = loanAmount + cmhcAmount;
                      const monthlyRate = demoData.mortgageRate / 100 / 12;
                      const totalPayments = demoData.amortizationPeriod * 12;
                      const monthlyPayment = totalMortgage * 
                        (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                        (Math.pow(1 + monthlyRate, totalPayments) - 1);
                      
                      // Adjust payment based on frequency
                      let adjustedPayment = monthlyPayment;
                      if (demoData.paymentFrequency === 'biweekly') {
                        adjustedPayment = monthlyPayment / 2;
                      } else if (demoData.paymentFrequency === 'weekly') {
                        adjustedPayment = monthlyPayment / 4;
                      }
                      
                      return (
                        <div key={`payment-${percent}`} className="text-center">
                          <div 
                            className="text-lg sm:text-2xl font-bold text-[#1B5E20]"
                            aria-live="polite"
                            aria-label={`Mortgage payment for ${percent} percent down payment: $${Math.round(adjustedPayment).toLocaleString()} ${demoData.paymentFrequency}`}
                          >
                            ${Math.round(adjustedPayment).toLocaleString()}
                          </div>
                          <div className="text-xs text-[#2E7D32] mt-1">
                            {demoData.paymentFrequency.charAt(0).toUpperCase() + demoData.paymentFrequency.slice(1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

              {/* Monthly Mortgage Payment Calculation */}
              <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200">
                <h3 className="text-lg sm:text-xl font-semibold text-[#1B5E20] mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">Monthly Mortgage Payment Calculation</h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Calculation Parameters */}
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200">
                    <h4 className="text-base sm:text-lg font-semibold text-[#1B5E20] mb-3 sm:mb-4">Calculation Parameters</h4>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-700 font-medium">Total Mortgage (P):</span>
                        <span className="font-semibold text-[#1B5E20] text-lg">${(() => {
                          const downPayment = (formData.homePrice * 20) / 100;
                          const loanAmount = formData.homePrice - downPayment;
                          const cmhcRate = getCMHCRate(20);
                          const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                          return (loanAmount + cmhcAmount).toLocaleString();
                        })()}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-700 font-medium">Annual Rate:</span>
                        <span className="font-semibold text-[#1B5E20]">{demoData.mortgageRate}%</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-700 font-medium">Monthly Rate (r):</span>
                        <span className="font-semibold text-[#1B5E20]">{(demoData.mortgageRate / 12 / 100).toFixed(6)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-700 font-medium">Amortization:</span>
                        <span className="font-semibold text-[#1B5E20]">{demoData.amortizationPeriod} years</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-700 font-medium">Total Payments (n):</span>
                        <span className="font-semibold text-[#1B5E20]">{demoData.amortizationPeriod * 12}</span>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Payment Result */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 sm:p-6 lg:p-8 border-2 border-green-200 shadow-lg">
                    <h4 className="text-base sm:text-lg font-semibold text-[#1B5E20] mb-4 sm:mb-6 text-center">Monthly Mortgage Payment</h4>
                    <div className="text-center">
                      <div className="bg-white rounded-lg p-4 sm:p-6 border border-green-200 shadow-md">
                        <p 
                          className="text-2xl sm:text-3xl font-bold text-[#1B5E20] mb-2"
                          aria-live="assertive"
                          aria-label={`Monthly mortgage payment: $${(() => {
                            const downPayment = (formData.homePrice * 20) / 100;
                            const loanAmount = formData.homePrice - downPayment;
                            const cmhcRate = getCMHCRate(20);
                            const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                            const totalMortgage = loanAmount + cmhcAmount;
                            
                            const monthlyRate = demoData.mortgageRate / 100 / 12;
                            const totalPayments = demoData.amortizationPeriod * 12;
                            const monthlyPayment = totalMortgage * 
                              (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);
                            
                            return Math.round(monthlyPayment).toLocaleString();
                          })()} per month`}
                        >
                          ${(() => {
                            const downPayment = (formData.homePrice * 20) / 100;
                            const loanAmount = formData.homePrice - downPayment;
                            const cmhcRate = getCMHCRate(20);
                            const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                            const totalMortgage = loanAmount + cmhcAmount;
                            
                            const monthlyRate = demoData.mortgageRate / 100 / 12;
                            const totalPayments = demoData.amortizationPeriod * 12;
                            const monthlyPayment = totalMortgage * 
                              (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);
                            
                            return Math.round(monthlyPayment).toLocaleString();
                          })()}
                        </p>
                        <p className="text-sm text-gray-600">per month</p>
                      </div>
                      <div className="mt-6">
                        <button 
                          onClick={() => window.location.href = '/rates'}
                          className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 shadow-md hover:shadow-lg"
                        >
                          View Current Mortgage Rates
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* First-Time Homebuyer Toggle */}
              <div className="mb-8 border p-4 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-medium text-[#1B5E20]">
                    Are you a first-time homebuyer?
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDemoChange('isFirstTimeBuyer', true)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        demoData.isFirstTimeBuyer
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleDemoChange('isFirstTimeBuyer', false)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        !demoData.isFirstTimeBuyer
                          ? 'bg-[#2E7D32] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>

                {/* Land Transfer Tax Calculation */}
                {!demoData.isFirstTimeBuyer && (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Land Transfer Tax Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Provincial Land Transfer Tax:</span>
                        <span className="font-medium">$15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Municipal:</span>
                        <span className="font-medium">$0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rebate:</span>
                        <span className="font-medium">$0</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-2">
                        <span className="font-semibold text-gray-900">Final Transfer Tax:</span>
                        <span className="font-semibold text-[#1B5E20]">$15</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Summary - After Calculator Grid */}
              <div className="mb-8 bg-[#E8F5E8] rounded-lg p-6 border border-[#C8E6C9]">
                <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Payment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-[#2E7D32] mb-1">Monthly Payment</p>
                    <p className="text-2xl font-bold text-[#1B5E20]">
                      ${(() => {
                        const downPayment = (formData.homePrice * 20) / 100;
                        const loanAmount = formData.homePrice - downPayment;
                        const cmhcRate = getCMHCRate(20);
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                        const totalMortgage = loanAmount + cmhcAmount;
                        const monthlyRate = demoData.mortgageRate / 100 / 12;
                        const totalPayments = demoData.amortizationPeriod * 12;
                        const monthlyPayment = totalMortgage * 
                          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
                        return Math.round(monthlyPayment).toLocaleString();
                      })()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#2E7D32] mb-1">Total Interest</p>
                    <p className="text-2xl font-bold text-[#1B5E20]">
                      ${(() => {
                        const downPayment = (formData.homePrice * 20) / 100;
                        const loanAmount = formData.homePrice - downPayment;
                        const cmhcRate = getCMHCRate(20);
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                        const totalMortgage = loanAmount + cmhcAmount;
                        const monthlyRate = demoData.mortgageRate / 100 / 12;
                        const totalPayments = demoData.amortizationPeriod * 12;
                        const monthlyPayment = totalMortgage * 
                          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
                        const totalPayment = monthlyPayment * totalPayments;
                        const totalInterest = totalPayment - totalMortgage;
                        return Math.round(totalInterest).toLocaleString();
                      })()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-[#2E7D32] mb-1">Total Payment</p>
                    <p className="text-2xl font-bold text-[#1B5E20]">
                      ${(() => {
                        const downPayment = (formData.homePrice * 20) / 100;
                        const loanAmount = formData.homePrice - downPayment;
                        const cmhcRate = getCMHCRate(20);
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                        const totalMortgage = loanAmount + cmhcAmount;
                        const monthlyRate = demoData.mortgageRate / 100 / 12;
                        const totalPayments = demoData.amortizationPeriod * 12;
                        const monthlyPayment = totalMortgage * 
                          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
                        const totalPayment = monthlyPayment * totalPayments;
                        return Math.round(totalPayment).toLocaleString();
                      })()}
                    </p>
                  </div>
                </div>
              </div>



              {/* Cash Needed to Close Section */}
              <div className="mt-8 border p-4 rounded-lg bg-white">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleDemoChange('cashToCloseExpanded', !demoData.cashToCloseExpanded)}
                >
                  <h3 className="text-lg font-medium text-[#1B5E20]">
                    Cash Needed to Close
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      ${(() => {
                        const downPayment = (formData.homePrice * 20) / 100; // Using 20% as default
                        const landTransferTax = demoData.isFirstTimeBuyer ? 0 : 15; // First-time buyers get rebate
                        const cmhcAmount = 0; // 20% down payment = no CMHC
                        const pstOnCMHC = cmhcAmount * 0.08;
                        const lawyerFees = 1000;
                        const titleInsurance = 900;
                        const homeInspection = 500;
                        const appraisalFees = 300;
                        
                        return (downPayment + landTransferTax + pstOnCMHC + lawyerFees + titleInsurance + homeInspection + appraisalFees).toLocaleString();
                      })()}
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${demoData.cashToCloseExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {demoData.cashToCloseExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-3">
                      {/* Down Payment */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Down payment</span>
                        <span className="font-medium text-right">
                          ${((formData.homePrice * 20) / 100).toLocaleString()}
                        </span>
                      </div>

                      {/* Land Transfer Tax */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Land transfer tax</span>
                        <span className="font-medium text-right">
                          ${demoData.isFirstTimeBuyer ? 0 : 15}
                        </span>
                      </div>

                      {/* PST on CMHC */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">PST on CMHC</span>
                        <span className="font-medium text-right">
                          ${(() => {
                            const downPayment = (formData.homePrice * 20) / 100;
                            const loanAmount = formData.homePrice - downPayment;
                            const cmhcRate = getCMHCRate(20);
                            const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                            return (cmhcAmount * 0.08).toLocaleString();
                          })()}
                        </span>
                      </div>

                      {/* Lawyer Fees */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Lawyer fees</span>
                        <span className="font-medium text-right">$1,000</span>
                      </div>

                      {/* Title Insurance */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Title insurance</span>
                        <span className="font-medium text-right">$900</span>
                      </div>

                      {/* Home Inspection */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Home inspection</span>
                        <span className="font-medium text-right">$500</span>
                      </div>

                      {/* Appraisal Fees */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Appraisal fees</span>
                        <span className="font-medium text-right">$300</span>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="font-semibold text-[#1B5E20]">Total Cash to Close</span>
                        <span className="font-semibold text-[#1B5E20] text-right">
                          ${(() => {
                            const downPayment = (formData.homePrice * 20) / 100;
                            const landTransferTax = 15;
                            const loanAmount = formData.homePrice - downPayment;
                            const cmhcRate = getCMHCRate(20);
                            const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                            const pstOnCMHC = cmhcAmount * 0.08;
                            const lawyerFees = 1000;
                            const titleInsurance = 900;
                            const homeInspection = 500;
                            const appraisalFees = 300;
                            
                            return (downPayment + landTransferTax + pstOnCMHC + lawyerFees + titleInsurance + homeInspection + appraisalFees).toLocaleString();
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Amortization Schedule Section */}
              <div className="mt-8 border p-4 rounded-lg bg-white">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => handleDemoChange('amortizationExpanded', !demoData.amortizationExpanded)}
                >
                  <h3 className="text-lg font-medium text-[#1B5E20]">
                    Amortization Schedule
                  </h3>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-2">
                      {demoData.amortizationPeriod} years • {demoData.mortgageRate}% rate
                    </span>
                    <svg 
                      className={`w-5 h-5 text-gray-500 transition-transform ${demoData.amortizationExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {demoData.amortizationExpanded && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <AmortizationChart 
                      totalMortgage={(() => {
                        const downPayment = (formData.homePrice * 20) / 100;
                        const loanAmount = formData.homePrice - downPayment;
                        const cmhcRate = getCMHCRate(20);
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                        return loanAmount + cmhcAmount;
                      })()}
                      mortgageRate={demoData.mortgageRate}
                      amortizationYears={demoData.amortizationPeriod}
                    />
                  </div>
                )}
            </div>

          {/* Fixed Call-to-Action Bar */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <p 
                      className="text-sm sm:text-base lg:text-lg font-medium text-gray-900"
                      aria-live="polite"
                      aria-label={`Summary: Based on your selections, your monthly payment is $${(() => {
                        const downPayment = (formData.homePrice * 20) / 100;
                        const loanAmount = formData.homePrice - downPayment;
                        const cmhcRate = getCMHCRate(20);
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                        const totalMortgage = loanAmount + cmhcAmount;
                        const monthlyRate = demoData.mortgageRate / 100 / 12;
                        const totalPayments = demoData.amortizationPeriod * 12;
                        const monthlyPayment = totalMortgage * 
                          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
                        return Math.round(monthlyPayment).toLocaleString();
                      })()} and you'll need $${(() => {
                        const downPayment = (formData.homePrice * 20) / 100;
                        const landTransferTax = demoData.isFirstTimeBuyer ? 0 : 15;
                        const loanAmount = formData.homePrice - downPayment;
                        const cmhcRate = getCMHCRate(20);
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                        const pstOnCMHC = cmhcAmount * 0.08;
                        const lawyerFees = 1000;
                        const titleInsurance = 900;
                        const homeInspection = 500;
                        const appraisalFees = 300;
                        
                        return (downPayment + landTransferTax + pstOnCMHC + lawyerFees + titleInsurance + homeInspection + appraisalFees).toLocaleString();
                      })()} to close`}
                    >
                      Based on your selections, your monthly payment is{' '}
                      <span className="text-[#1B5E20] font-semibold">
                        ${(() => {
                          const downPayment = (formData.homePrice * 20) / 100;
                          const loanAmount = formData.homePrice - downPayment;
                          const cmhcRate = getCMHCRate(20);
                          const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                          const totalMortgage = loanAmount + cmhcAmount;
                          const monthlyRate = demoData.mortgageRate / 100 / 12;
                          const totalPayments = demoData.amortizationPeriod * 12;
                          const monthlyPayment = totalMortgage * 
                            (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                            (Math.pow(1 + monthlyRate, totalPayments) - 1);
                          return Math.round(monthlyPayment).toLocaleString();
                        })()}
                      </span>{' '}
                      and you'll need{' '}
                      <span className="text-[#1B5E20] font-semibold">
                        ${(() => {
                          const downPayment = (formData.homePrice * 20) / 100;
                          const landTransferTax = demoData.isFirstTimeBuyer ? 0 : 15; // First-time buyers get rebate
                          const loanAmount = formData.homePrice - downPayment;
                          const cmhcRate = getCMHCRate(20);
                          const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * (cmhcRate / 100)) : 0;
                          const pstOnCMHC = cmhcAmount * 0.08;
                          const lawyerFees = 1000;
                          const titleInsurance = 900;
                          const homeInspection = 500;
                          const appraisalFees = 300;
                          
                          return (downPayment + landTransferTax + pstOnCMHC + lawyerFees + titleInsurance + homeInspection + appraisalFees).toLocaleString();
                        })()}
                      </span>{' '}
                      to close.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <button className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 lg:px-8 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 shadow-lg text-sm sm:text-base">
                      Get This Rate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
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