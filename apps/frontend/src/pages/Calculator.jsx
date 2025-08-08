import React, { useState, useEffect } from 'react';
import { generateDownPaymentOptions, formatCurrency } from '../utils/mortgageCalculations.js';
import { 
  LazyMortgagePaymentChart as MortgagePaymentChart,
  LazyAffordabilityChart as AffordabilityChart,
  LazyLandTransferTaxChart as LandTransferTaxChart,
  LazyDownPaymentChart as DownPaymentChart,
  LazyAmortizationChart as AmortizationChart
} from '../components/charts/LazyChartWrapper.jsx';
import { trackUserEngagement } from '../utils/analytics';
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



// CMHC Insurance rate function
const getCMHCRate = (downPaymentPercent) => {
  if (downPaymentPercent >= 20) return 0;
  if (downPaymentPercent >= 15 && downPaymentPercent < 20) return 0.028;
  if (downPaymentPercent >= 10 && downPaymentPercent < 15) return 0.031;
  if (downPaymentPercent >= 5 && downPaymentPercent < 10) return 0.04;
  return 0.04; // Default for anything below 5%
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

// Pure JS helper function for calculating cash needed to close
const calcCashToClose = (homePrice, downPaymentPercent, isFirstTimeBuyer = false, province = 'ON') => {
  // Calculate down payment
  const downPayment = (homePrice * downPaymentPercent) / 100;
  
  // Calculate loan amount
  const loanAmount = homePrice - downPayment;
  
  // Calculate CMHC insurance
  const cmhcRate = downPaymentPercent >= 20 ? 0 : 
                   downPaymentPercent >= 15 ? 0.028 :
                   downPaymentPercent >= 10 ? 0.031 :
                   downPaymentPercent >= 5 ? 0.04 : 0.04;
  const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * cmhcRate) : 0;
  
  // Calculate PST on CMHC (8% of CMHC amount)
  const pstOnCMHC = cmhcAmount * 0.08;
  
  // Calculate land transfer tax based on province
  let landTransferTax = 0;
  
  // Use the existing landTransferTaxRules for province-specific calculations
  const rule = landTransferTaxRules[province];
  if (rule) {
    const calculateTieredTax = (tiers) => {
      let tax = 0;
      let remaining = homePrice;
      let previous = 0;

      for (const tier of tiers) {
        if (remaining <= 0) break;
        const taxable = Math.min(tier.upTo - previous, remaining);
        const tierTax = taxable * tier.rate;
        tax += tierTax;
        remaining -= taxable;
        previous = tier.upTo;
      }
      return tax;
    };

    // Calculate base provincial tax
    const baseTax = calculateTieredTax(rule.baseRates || []);
    
    // Calculate municipal tax if applicable
    let municipalTax = 0;
    if (province === 'ON' && rule.cities?.['Toronto']?.municipalRates) {
      municipalTax = calculateTieredTax(rule.cities['Toronto'].municipalRates);
    } else if (province === 'QC' && rule.cities?.['Montreal']?.municipalRates) {
      municipalTax = calculateTieredTax(rule.cities['Montreal'].municipalRates);
    }

    landTransferTax = baseTax + municipalTax;
    
    // Apply first-time buyer rebate
    if (isFirstTimeBuyer && rule.firstTimeBuyerRebate) {
      landTransferTax = Math.max(0, landTransferTax - rule.firstTimeBuyerRebate);
    }
  }
  
  // Fixed fees
  const lawyerFees = 1000;
  const titleInsurance = 900;
  const homeInspection = 500;
  const appraisalFees = 300;
  
  // Calculate total (including land transfer tax, excluding PST on CMHC)
  let total = downPayment + landTransferTax + lawyerFees + titleInsurance + homeInspection + appraisalFees;
  
  // Apply first-time buyer $100 deduction
  if (isFirstTimeBuyer) {
    total -= 100;
  }
  
  return {
    downPayment,
    landTransferTax,
    cmhcAmount,
    pstOnCMHC,
    lawyerFees,
    titleInsurance,
    homeInspection,
    appraisalFees,
    total,
    breakdown: [
      { name: 'Down payment', amount: downPayment },
      { name: 'Land transfer tax', amount: landTransferTax },
      { name: 'PST on CMHC', amount: pstOnCMHC },
      { name: 'Lawyer fees', amount: lawyerFees },
      { name: 'Title insurance', amount: titleInsurance },
      { name: 'Home inspection', amount: homeInspection },
      { name: 'Appraisal fees', amount: appraisalFees }
    ]
  };
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
    const cmhcRate = getCMHCRate(formData.downPaymentPercent);
    const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * cmhcRate) : 0;
    const totalMortgage = loanAmount + cmhcAmount;
    
    // Handle edge cases
    if (totalMortgage <= 0 || formData.interestRate <= 0 || formData.amortizationPeriod <= 0) {
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
    // Where: P = monthly payment, L = total mortgage amount, c = monthly interest rate, n = total payments
    const monthlyPayment = totalMortgage * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    // Calculate total interest over the life of the loan
    const totalInterest = (monthlyPayment * totalPayments) - totalMortgage;
    
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
    } else if (formData.paymentFrequency === 'accelerated-weekly') {
      // Accelerated weekly: 52 payments per year instead of 48
      frequencyPayment = (monthlyPayment * 12) / 52;
    }
    
    // Calculate monthly additional costs
    const monthlyPropertyTax = formData.propertyTax / 12;
    const monthlyInsurance = formData.insurance / 12;
    const monthlyCondoFee = formData.condoFee; // Already monthly
    const monthlyCMHC = cmhcAmount / 12;
    
    // Calculate total monthly cost including all expenses
    const totalMonthlyCost = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyCondoFee + monthlyCMHC;
    
    // Calculate accurate principal and interest portions for the first payment
    const firstPaymentInterest = totalMortgage * monthlyRate;
    const firstPaymentPrincipal = monthlyPayment - firstPaymentInterest;
    
    // Calculate portions for the breakdown chart
    const principalPortion = firstPaymentPrincipal;
    const interestPortion = firstPaymentInterest;
    const taxPortion = monthlyPropertyTax + monthlyInsurance + monthlyCondoFee + monthlyCMHC;
    
    return {
      loanAmount,
      totalMortgage,
      cmhcAmount,
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
    homePrice: 500000,
    isFirstTimeBuyer: false
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
    amortizationExpanded: true,
    selectedDownPaymentPercent: 20,
    selectedProvince: 'ON'
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
    // Use Ontario as default province since we removed province selector
    const rule = landTransferTaxRules['ON'];
    if (!rule) {
      return { 
        total: 0, 
        breakdown: [], 
        rebate: 0, 
        additionalTaxes: [],
        provinceName: 'Ontario',
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

    // Calculate municipal tax if applicable (using Toronto as default for Ontario)
    let municipalTax = 0;
    let municipalBreakdown = [];
    if (rule.cities?.['Toronto']?.municipalRates) {
      const municipalResult = calculateTieredTax(rule.cities['Toronto'].municipalRates);
      municipalTax = municipalResult.tax;
      municipalBreakdown = municipalResult.breakdown.map(item => ({
        ...item,
        description: `Toronto Municipal ${item.description}`
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

    // Track calculator interaction
    trackUserEngagement('calculator_field_changed', {
      field_name: field,
      field_value: parsedValue,
      calculator_type: 'mortgage_payment'
    });



    // Only update form data if validation passes or field is not numeric
    if (!error || ['paymentFrequency'].includes(field)) {
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
                  Ontario Tax Breakdown
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
                    Ontario offers a first-time home buyer rebate of up to ${
                      landTransferResults.rebate > 0 ? landTransferResults.rebate.toLocaleString() : 
                      landTransferTaxRules['ON']?.firstTimeBuyerRebate.toLocaleString()
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
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
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
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
                      </Tooltip>
                    </div>
                    {[5, 10, 15, 20].map((percent) => {
                      const downPayment = (formData.homePrice * percent) / 100;
                      const loanAmount = formData.homePrice - downPayment;
                      const cmhcRate = getCMHCRate(percent);
                      const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * cmhcRate) : 0;
                      
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
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
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



                  {/* Interest Rate Indicator */}
                  <div className="text-center mb-2">
                    <div className="text-xs text-[#2E7D32] bg-green-100 px-3 py-1 rounded-full inline-block">
                      Based on {formData.interestRate}% interest rate • {formData.amortizationPeriod} year amortization
                    </div>
                  </div>
                  
                  {/* Mortgage Payment Row - Green Theme Highlighted */}
                  <div className="grid grid-cols-5 gap-6 sm:gap-8 mb-3 sm:mb-4 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg px-4 sm:px-0">
                    <div className="flex items-center text-xs sm:text-sm font-semibold text-[#1B5E20]">
                      <span className="mr-1 sm:mr-2">=</span>
                      <span className="hidden sm:inline">Mortgage payment</span>
                      <span className="sm:hidden">Payment</span>
                      <Tooltip content="Your regular payment amount based on the mortgage amount, interest rate, and payment frequency. This is what you'll pay each period.">
                        <img src={tooltipIcon} alt="Info" className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4 cursor-help hover:opacity-80 transition-opacity" loading="lazy" />
                      </Tooltip>
                    </div>
                                          {[5, 10, 15, 20].map((percent) => {
                      const downPayment = (formData.homePrice * percent) / 100;
                      const loanAmount = formData.homePrice - downPayment;
                      const cmhcRate = getCMHCRate(percent);
                      const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * cmhcRate) : 0;
                      const totalMortgage = loanAmount + cmhcAmount;
                      
                      // Use dynamic interest rate from formData
                      const monthlyRate = formData.interestRate / 100 / 12;
                      const totalPayments = formData.amortizationPeriod * 12;
                      
                      // Handle edge cases for calculation
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
                        // Accelerated bi-weekly: 26 payments per year instead of 24
                        frequencyPayment = (monthlyPayment * 12) / 26;
                      } else if (formData.paymentFrequency === 'accelerated-weekly') {
                        // Accelerated weekly: 52 payments per year instead of 48
                        frequencyPayment = (monthlyPayment * 12) / 52;
                      }

                      // Get frequency label
                      const getFrequencyLabel = () => {
                        switch (formData.paymentFrequency) {
                          case 'biweekly': return 'Bi-weekly';
                          case 'weekly': return 'Weekly';
                          case 'accelerated': return 'Acc. Bi-weekly';
                          case 'accelerated-weekly': return 'Acc. Weekly';
                          default: return 'Monthly';
                        }
                      };
                      
                      return (
                        <div key={`payment-${percent}`} className="text-center">
                          <div 
                            className="text-lg sm:text-2xl font-bold text-[#1B5E20]"
                            aria-live="polite"
                            aria-label={`${getFrequencyLabel()} mortgage payment for ${percent} percent down payment: $${Math.round(frequencyPayment).toLocaleString()}`}
                          >
                            ${Math.round(frequencyPayment).toLocaleString()}
                          </div>
                          <div className="text-xs text-[#2E7D32] mt-1">
                            {getFrequencyLabel()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>









              {/* Cash Needed to Close Section - Always Visible */}
              <div className="mt-8 border p-4 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-[#1B5E20]">
                    Cash Needed to Close
                  </h3>
                  <div className="text-xs text-[#2E7D32] bg-green-100 px-2 py-1 rounded-full">
                    Based on ${formData.homePrice.toLocaleString()} home price
                  </div>
                </div>
                
                {/* Down Payment Percentage Selector */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Down Payment Percentage
                  </label>
                  <select
                    value={demoData.selectedDownPaymentPercent}
                    onChange={(e) => handleDemoChange('selectedDownPaymentPercent', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                  >
                    <option value={5}>5%</option>
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                    <option value={25}>25%</option>
                    <option value={30}>30%</option>
                    <option value={35}>35%</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {demoData.selectedDownPaymentPercent >= 20 
                      ? "✅ No CMHC insurance required (20%+ down payment)" 
                      : "⚠️ CMHC insurance required (under 20% down payment)"
                    }
                  </p>
                </div>

                {/* Province Selector for Land Transfer Tax */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Province (for Land Transfer Tax)
                  </label>
                  <select
                    value={demoData.selectedProvince || 'ON'}
                    onChange={(e) => handleDemoChange('selectedProvince', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
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
                    Land transfer tax rates vary by province. Current selection: {landTransferTaxRules[demoData.selectedProvince]?.name || 'Ontario'}
                  </p>
                </div>





                    <div className="space-y-3">
                                      {(() => {
                    const cashToClose = calcCashToClose(formData.homePrice, demoData.selectedDownPaymentPercent, demoData.isFirstTimeBuyer, demoData.selectedProvince);
                    return (
                      <>
                      {/* Down Payment */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Down payment</span>
                        <span className="font-medium text-right">
                            ${cashToClose.downPayment.toLocaleString()}
                        </span>
                      </div>

                      {/* Land Transfer Tax */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">
                          Land transfer tax 
                          <span className="text-xs text-[#2E7D32] ml-1">
                            ({landTransferTaxRules[demoData.selectedProvince]?.name || 'Ontario'})
                          </span>
                        </span>
                        <span className="font-medium text-right">
                          ${cashToClose.landTransferTax.toLocaleString()}
                        </span>
                      </div>

                      

                      {/* Lawyer Fees */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Lawyer fees</span>
                          <span className="font-medium text-right">${cashToClose.lawyerFees.toLocaleString()}</span>
                      </div>

                      {/* Title Insurance */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Title insurance</span>
                          <span className="font-medium text-right">${cashToClose.titleInsurance.toLocaleString()}</span>
                      </div>

                      {/* Home Inspection */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Home inspection</span>
                          <span className="font-medium text-right">${cashToClose.homeInspection.toLocaleString()}</span>
                      </div>

                      {/* Appraisal Fees */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Appraisal fees</span>
                          <span className="font-medium text-right">${cashToClose.appraisalFees.toLocaleString()}</span>
                      </div>

                      {/* Total */}
                      <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                        <span className="font-semibold text-[#1B5E20]">Total Cash to Close</span>
                        <span className="font-semibold text-[#1B5E20] text-right">
                            ${cashToClose.total.toLocaleString()}
                        </span>
                      </div>
                      </>
                    );
                  })()}
                    </div>
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
                        const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * cmhcRate) : 0;
                        const totalMortgage = loanAmount + cmhcAmount;
                        const monthlyRate = formData.interestRate / 100 / 12;
                        const totalPayments = formData.amortizationPeriod * 12;
                        const monthlyPayment = totalMortgage * 
                          (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
                        
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
                        
                        return Math.round(frequencyPayment).toLocaleString();
                      })()} and you'll need $${(() => {
                        const cashToClose = calcCashToClose(formData.homePrice, demoData.selectedDownPaymentPercent, demoData.isFirstTimeBuyer, demoData.selectedProvince);
                        return cashToClose.total.toLocaleString();
                      })()} to close`}
                    >
                      Based on your selections, your monthly payment is{' '}
                      <span className="text-[#1B5E20] font-semibold">
                        ${(() => {
                          const downPayment = (formData.homePrice * demoData.selectedDownPaymentPercent) / 100;
                          const loanAmount = formData.homePrice - downPayment;
                          const cmhcRate = getCMHCRate(demoData.selectedDownPaymentPercent);
                          const cmhcAmount = cmhcRate > 0 ? Math.round(loanAmount * cmhcRate) : 0;
                          const totalMortgage = loanAmount + cmhcAmount;
                          
                          // Use dynamic interest rate with edge case handling
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
                          
                          return Math.round(frequencyPayment).toLocaleString();
                        })()}
                      </span>{' '}
                      and you'll need{' '}
                      <span className="text-[#1B5E20] font-semibold">
                        ${(() => {
                          const cashToClose = calcCashToClose(formData.homePrice, demoData.selectedDownPaymentPercent, demoData.isFirstTimeBuyer, demoData.selectedProvince);
                          return cashToClose.total.toLocaleString();
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