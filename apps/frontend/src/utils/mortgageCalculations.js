/**
 * Mortgage Down Payment Calculator
 * Calculates down payment, CMHC insurance, and total mortgage amount
 * with Canadian mortgage insurance rules and validation
 */

/**
 * CMHC Insurance Rate Tiers (2024 rates)
 */
const CMHC_INSURANCE_TIERS = {
  TIER_1: { min: 5, max: 9.99, rate: 0.04, label: '5-9.99%' },
  TIER_2: { min: 10, max: 14.99, rate: 0.031, label: '10-14.99%' },
  TIER_3: { min: 15, max: 19.99, rate: 0.028, label: '15-19.99%' },
  NO_INSURANCE: { min: 20, max: 100, rate: 0, label: '20%+' }
};

/**
 * Validation Rules for Down Payment
 */
const DOWN_PAYMENT_RULES = {
  UNDER_500K: { maxPrice: 500000, minDownPayment: 5 },
  FIVE_HUNDRED_TO_MILLION: { minPrice: 500000, maxPrice: 999999, minDownPayment: 10 },
  MILLION_PLUS: { minPrice: 1000000, minDownPayment: 20 }
};

/**
 * Generate down payment options for all tiers (5%, 10%, 15%, 20%)
 * Following Ratehub.ca logic for Canadian mortgage calculations
 * @param {number} askingPrice - The asking price of the home
 * @returns {Array} Array of DownPaymentTierResult objects for each tier
 */
export function generateDownPaymentOptions(askingPrice) {
  const tiers = [5, 10, 15, 20];
  const results = [];

  tiers.forEach(percent => {
    // Calculate basic values
    const downPayment = askingPrice * (percent / 100);
    const mortgageBeforeInsurance = askingPrice - downPayment;
    
    // Determine CMHC insurance rate based on tier
    let insuranceRate = 0;
    if (percent >= 5 && percent < 10) {
      insuranceRate = 0.04; // 4.00%
    } else if (percent >= 10 && percent < 15) {
      insuranceRate = 0.031; // 3.10%
    } else if (percent >= 15 && percent < 20) {
      insuranceRate = 0.028; // 2.80%
    } else if (percent >= 20) {
      insuranceRate = 0; // No insurance required
    }

    // Calculate insurance premium and total mortgage
    const insurancePremium = mortgageBeforeInsurance * insuranceRate;
    const totalMortgage = mortgageBeforeInsurance + insurancePremium;

    // Determine eligibility and warnings
    let isEligible = true;
    let warningMessage = null;

    // Apply validation rules
    if (askingPrice < 500000) {
      // Homes under $500K - minimum 5% allowed
      if (percent < 5) {
        isEligible = false;
        warningMessage = 'Minimum 5% down payment required for homes under $500,000';
      }
    } else if (askingPrice >= 500000 && askingPrice < 1000000) {
      // Homes $500K-$999K - minimum 10% required
      if (percent < 10) {
        isEligible = false;
        warningMessage = 'Minimum 10% down payment required for homes $500,000-$999,999';
      }
    } else if (askingPrice >= 1000000) {
      // Homes $1M+ - CMHC insurance not allowed, minimum 20% required
      if (percent < 20) {
        isEligible = false;
        warningMessage = 'CMHC insurance not available for homes over $1,000,000. Minimum 20% down payment required.';
      }
    }

    results.push({
      percent,
      downPayment,
      insuranceRate,
      insurancePremium,
      totalMortgage,
      isEligible,
      warningMessage
    });
  });

  return results;
}

/**
 * Calculate mortgage down payment with CMHC insurance
 * @param {number} askingPrice - The asking price of the home
 * @param {number} downPaymentPercentage - Down payment percentage (5, 10, 15, 20, etc.)
 * @returns {Object} DownPaymentResult object with all calculations and validation
 */
export function calculateDownPayment(askingPrice, downPaymentPercentage) {
  // Initialize result object
  const result = {
    downPaymentAmount: 0,
    insurancePremium: 0,
    totalMortgage: 0,
    mortgageBeforeInsurance: 0,
    insuranceRate: 0,
    insuranceTier: '',
    error: null,
    isValid: true,
    validationMessages: []
  };

  try {
    // Input validation
    if (!askingPrice || askingPrice <= 0) {
      result.error = 'Asking price must be greater than $0';
      result.isValid = false;
      return result;
    }

    if (!downPaymentPercentage || downPaymentPercentage < 0 || downPaymentPercentage > 100) {
      result.error = 'Down payment percentage must be between 0% and 100%';
      result.isValid = false;
      return result;
    }

    // Calculate down payment amount
    result.downPaymentAmount = (askingPrice * downPaymentPercentage) / 100;

    // Calculate mortgage amount before insurance
    result.mortgageBeforeInsurance = askingPrice - result.downPaymentAmount;

    // Apply validation rules based on home price
    const validationResult = validateDownPayment(askingPrice, downPaymentPercentage);
    if (!validationResult.isValid) {
      result.error = validationResult.error;
      result.isValid = false;
      result.validationMessages = validationResult.messages;
      return result;
    }

    // Calculate CMHC insurance premium
    const insuranceResult = calculateCMHCInsurance(result.mortgageBeforeInsurance, downPaymentPercentage);
    result.insurancePremium = insuranceResult.premium;
    result.insuranceRate = insuranceResult.rate;
    result.insuranceTier = insuranceResult.tier;

    // Calculate total mortgage amount
    result.totalMortgage = result.mortgageBeforeInsurance + result.insurancePremium;

    return result;

  } catch (error) {
    result.error = `Calculation error: ${error.message}`;
    result.isValid = false;
    return result;
  }
}

/**
 * Validate down payment based on Canadian mortgage rules
 * @param {number} askingPrice - Home asking price
 * @param {number} downPaymentPercentage - Down payment percentage
 * @returns {Object} Validation result
 */
function validateDownPayment(askingPrice, downPaymentPercentage) {
  const result = {
    isValid: true,
    error: null,
    messages: []
  };

  // Rule 1: Home price < $500,000 → minimum 5% down
  if (askingPrice < DOWN_PAYMENT_RULES.UNDER_500K.maxPrice) {
    if (downPaymentPercentage < DOWN_PAYMENT_RULES.UNDER_500K.minDownPayment) {
      result.isValid = false;
      result.messages.push(`Minimum ${DOWN_PAYMENT_RULES.UNDER_500K.minDownPayment}% down payment required for homes under $${DOWN_PAYMENT_RULES.UNDER_500K.maxPrice.toLocaleString()}`);
    }
  }
  // Rule 2: $500,000 ≤ home price < $1,000,000 → minimum 10% down
  else if (askingPrice >= DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.minPrice && 
           askingPrice < DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.maxPrice) {
    if (downPaymentPercentage < DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.minDownPayment) {
      result.isValid = false;
      result.messages.push(`Minimum ${DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.minDownPayment}% down payment required for homes $${DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.minPrice.toLocaleString()}-$${(DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.maxPrice).toLocaleString()}`);
    }
  }
  // Rule 3: Home price ≥ $1,000,000 → insurance not available (must be ≥ 20% down)
  else if (askingPrice >= DOWN_PAYMENT_RULES.MILLION_PLUS.minPrice) {
    if (downPaymentPercentage < DOWN_PAYMENT_RULES.MILLION_PLUS.minDownPayment) {
      result.isValid = false;
      result.messages.push(`CMHC insurance not available for homes over $${DOWN_PAYMENT_RULES.MILLION_PLUS.minPrice.toLocaleString()}. Minimum ${DOWN_PAYMENT_RULES.MILLION_PLUS.minDownPayment}% down payment required.`);
    }
  }

  // Set error message if validation fails
  if (!result.isValid) {
    result.error = result.messages.join('; ');
  }

  return result;
}

/**
 * Calculate CMHC insurance premium based on down payment percentage
 * @param {number} mortgageAmount - Mortgage amount before insurance
 * @param {number} downPaymentPercentage - Down payment percentage
 * @returns {Object} Insurance calculation result
 */
function calculateCMHCInsurance(mortgageAmount, downPaymentPercentage) {
  let rate = 0;
  let tier = '';

  // Determine insurance tier and rate
  if (downPaymentPercentage >= CMHC_INSURANCE_TIERS.NO_INSURANCE.min) {
    rate = CMHC_INSURANCE_TIERS.NO_INSURANCE.rate;
    tier = CMHC_INSURANCE_TIERS.NO_INSURANCE.label;
  } else if (downPaymentPercentage >= CMHC_INSURANCE_TIERS.TIER_3.min && downPaymentPercentage <= CMHC_INSURANCE_TIERS.TIER_3.max) {
    rate = CMHC_INSURANCE_TIERS.TIER_3.rate;
    tier = CMHC_INSURANCE_TIERS.TIER_3.label;
  } else if (downPaymentPercentage >= CMHC_INSURANCE_TIERS.TIER_2.min && downPaymentPercentage <= CMHC_INSURANCE_TIERS.TIER_2.max) {
    rate = CMHC_INSURANCE_TIERS.TIER_2.rate;
    tier = CMHC_INSURANCE_TIERS.TIER_2.label;
  } else if (downPaymentPercentage >= CMHC_INSURANCE_TIERS.TIER_1.min && downPaymentPercentage <= CMHC_INSURANCE_TIERS.TIER_1.max) {
    rate = CMHC_INSURANCE_TIERS.TIER_1.rate;
    tier = CMHC_INSURANCE_TIERS.TIER_1.label;
  }

  const premium = mortgageAmount * rate;

  return {
    premium,
    rate,
    tier
  };
}

/**
 * Get available down payment percentages based on home price
 * @param {number} askingPrice - Home asking price
 * @returns {Array} Array of valid down payment percentages
 */
export function getAvailableDownPaymentPercentages(askingPrice) {
  const percentages = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  
  if (askingPrice < DOWN_PAYMENT_RULES.UNDER_500K.maxPrice) {
    // For homes under $500K, all percentages 5%+ are valid
    return percentages;
  } else if (askingPrice >= DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.minPrice && 
             askingPrice < DOWN_PAYMENT_RULES.FIVE_HUNDRED_TO_MILLION.maxPrice) {
    // For homes $500K-$999K, minimum 10%
    return percentages.filter(p => p >= 10);
  } else if (askingPrice >= DOWN_PAYMENT_RULES.MILLION_PLUS.minPrice) {
    // For homes $1M+, minimum 20%
    return percentages.filter(p => p >= 20);
  }
  
  return percentages;
}

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format percentage for display
 * @param {number} percentage - Percentage to format
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(percentage) {
  return `${percentage.toFixed(1)}%`;
}

/**
 * Calculate mortgage eligibility based on income and credit score
 * @param {Object} inputs - Object containing annualIncome and creditScore
 * @param {string|number} inputs.annualIncome - Annual income amount
 * @param {string|number} inputs.creditScore - Credit score
 * @returns {Object} Eligibility result with amount, formatted amount, tier, and description
 */
export const calculateEligibility = (inputs) => {
  const { annualIncome, creditScore } = inputs;
  
  // Convert income to number and remove any formatting
  const income = parseInt(String(annualIncome).replace(/[$,]/g, '')) || 0;
  
  // Convert credit score to number
  const score = parseInt(String(creditScore).replace(/[^0-9]/g, '')) || 0;
  
  // Determine loan amount based on income and credit score
  if (income < 40000) {
    return {
      amount: 250000,
      formatted: '$250,000',
      tier: 'Basic',
      description: 'Basic qualification tier - Income under $40,000',
      requirements: {
        income: '< $40,000',
        creditScore: 'Any score'
      }
    };
  } else if (income < 60000 && score > 600) {
    return {
      amount: 400000,
      formatted: '$400,000',
      tier: 'Standard',
      description: 'Standard qualification tier - Income under $60,000 with good credit',
      requirements: {
        income: '< $60,000',
        creditScore: '> 600'
      }
    };
  } else if (income >= 80000 && score > 700) {
    return {
      amount: 600000,
      formatted: '$600,000',
      tier: 'Premium',
      description: 'Premium qualification tier - High income with excellent credit',
      requirements: {
        income: '≥ $80,000',
        creditScore: '> 700'
      }
    };
  } else {
    // Default case for income between 60K-80K or other combinations
    return {
      amount: 350000,
      formatted: '$350,000',
      tier: 'Standard',
      description: 'Standard qualification tier - Moderate income and credit',
      requirements: {
        income: '$40,000 - $80,000',
        creditScore: '600+'
      }
    };
  }
};

/**
 * Calculate monthly mortgage payment using standard formula
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (as percentage)
 * @param {number} years - Loan term in years
 * @returns {number} Monthly payment amount
 */
export const calculateMonthlyPayment = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) {
    return principal / numberOfPayments;
  }
  
  const payment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return Math.round(payment * 100) / 100;
};

/**
 * Calculate maximum home price based on down payment percentage
 * @param {number} maxLoanAmount - Maximum loan amount
 * @param {number} downPaymentPercent - Down payment percentage (e.g., 20 for 20%)
 * @returns {number} Maximum home price
 */
export const calculateMaxHomePrice = (maxLoanAmount, downPaymentPercent) => {
  const downPaymentDecimal = downPaymentPercent / 100;
  return Math.round(maxLoanAmount / (1 - downPaymentDecimal));
};

/**
 * Format currency amount with commas
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount with dollar sign and commas
 */
export const formatCurrencyAmount = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Export constants for use in other components
export { CMHC_INSURANCE_TIERS, DOWN_PAYMENT_RULES }; 