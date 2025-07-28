/**
 * Mortgage Eligibility Rules Engine
 * Calculates maximum loan amount based on user's financial profile
 */

// Credit score multipliers (affects interest rate and approval likelihood)
const CREDIT_SCORE_MULTIPLIERS = {
  'excellent': 1.0,    // 750+ - Best rates and highest approval
  'good': 0.95,        // 700-749 - Good rates, high approval
  'fair': 0.85,        // 650-699 - Moderate rates, medium approval
  'poor': 0.70,        // 600-649 - Higher rates, lower approval
  'veryPoor': 0.50     // <600 - Highest rates, lowest approval
};

// Employment status multipliers (affects income stability)
const EMPLOYMENT_MULTIPLIERS = {
  'fullTime': 1.0,     // Most stable
  'partTime': 0.85,    // Less stable but still reliable
  'selfEmployed': 0.90, // Good but requires more documentation
  'contractor': 0.80,  // Less stable income
  'retired': 0.75      // Fixed income, may have limitations
};

// Debt-to-income ratio thresholds
const DTI_THRESHOLDS = {
  'excellent': 0.28,   // 28% - Conservative
  'good': 0.32,        // 32% - Standard
  'fair': 0.36,        // 36% - Moderate
  'poor': 0.40,        // 40% - Higher risk
  'veryPoor': 0.43     // 43% - Maximum allowed
};

// Base loan-to-income ratios (how much loan you can get per dollar of income)
const BASE_LOAN_TO_INCOME_RATIOS = {
  'excellent': 4.5,    // $4.50 loan per $1 income
  'good': 4.0,         // $4.00 loan per $1 income
  'fair': 3.5,         // $3.50 loan per $1 income
  'poor': 3.0,         // $3.00 loan per $1 income
  'veryPoor': 2.5      // $2.50 loan per $1 income
};

/**
 * Calculate mortgage eligibility and maximum loan amount
 * @param {Object} formData - User's quiz responses
 * @returns {Object} Eligibility results
 */
export const calculateEligibility = (formData) => {
  const {
    annualIncome,
    employmentStatus,
    creditScore,
    downPayment,
    monthlyDebts
  } = formData;

  // Convert string values to numbers
  const income = parseFloat(annualIncome) || 0;
  const downPaymentAmount = parseFloat(downPayment) || 0;
  const monthlyDebtPayments = parseFloat(monthlyDebts) || 0;

  // Validate inputs
  if (income <= 0) {
    return {
      eligible: false,
      maxLoanAmount: 0,
      reason: 'Invalid income amount',
      confidence: 'low',
      recommendations: ['Please provide a valid annual income']
    };
  }

  // Calculate monthly income
  const monthlyIncome = income / 12;

  // Calculate debt-to-income ratio
  const dtiRatio = monthlyDebtPayments / monthlyIncome;

  // Get multipliers based on credit score
  const creditMultiplier = CREDIT_SCORE_MULTIPLIERS[creditScore] || 0.5;
  const employmentMultiplier = EMPLOYMENT_MULTIPLIERS[employmentStatus] || 0.5;
  const dtiThreshold = DTI_THRESHOLDS[creditScore] || 0.43;
  const baseLoanToIncome = BASE_LOAN_TO_INCOME_RATIOS[creditScore] || 2.5;

  // Check if debt-to-income ratio is acceptable
  if (dtiRatio > dtiThreshold) {
    return {
      eligible: false,
      maxLoanAmount: 0,
      reason: `Debt-to-income ratio (${(dtiRatio * 100).toFixed(1)}%) exceeds maximum allowed (${(dtiThreshold * 100).toFixed(1)}%)`,
      confidence: 'high',
      recommendations: [
        'Reduce monthly debt payments',
        'Increase your income',
        'Consider a smaller loan amount'
      ]
    };
  }

  // Calculate base loan amount
  let baseLoanAmount = income * baseLoanToIncome;

  // Apply credit score multiplier
  baseLoanAmount *= creditMultiplier;

  // Apply employment stability multiplier
  baseLoanAmount *= employmentMultiplier;

  // Adjust for debt-to-income ratio (higher DTI = lower loan amount)
  const dtiAdjustment = 1 - (dtiRatio / dtiThreshold) * 0.2;
  baseLoanAmount *= dtiAdjustment;

  // Ensure minimum down payment requirements
  const minDownPaymentPercent = creditScore === 'excellent' ? 5 : 
                               creditScore === 'good' ? 10 :
                               creditScore === 'fair' ? 15 :
                               creditScore === 'poor' ? 20 : 25;

  const minDownPaymentAmount = baseLoanAmount * (minDownPaymentPercent / 100);

  if (downPaymentAmount < minDownPaymentAmount) {
    return {
      eligible: false,
      maxLoanAmount: 0,
      reason: `Down payment ($${downPaymentAmount.toLocaleString()}) is below minimum required ($${minDownPaymentAmount.toLocaleString()})`,
      confidence: 'high',
      recommendations: [
        `Increase down payment to at least $${minDownPaymentAmount.toLocaleString()}`,
        'Consider a smaller home purchase',
        'Improve your credit score for lower down payment requirements'
      ]
    };
  }

  // Calculate final loan amount (purchase price - down payment)
  const maxPurchasePrice = baseLoanAmount + downPaymentAmount;
  const maxLoanAmount = maxPurchasePrice - downPaymentAmount;

  // Determine confidence level
  let confidence = 'medium';
  if (creditScore === 'excellent' && employmentStatus === 'fullTime' && dtiRatio < 0.25) {
    confidence = 'high';
  } else if (creditScore === 'veryPoor' || dtiRatio > 0.35) {
    confidence = 'low';
  }

  // Generate recommendations
  const recommendations = generateRecommendations(creditScore, employmentStatus, dtiRatio, downPaymentAmount, maxLoanAmount);

  return {
    eligible: true,
    maxLoanAmount: Math.round(maxLoanAmount),
    maxPurchasePrice: Math.round(maxPurchasePrice),
    downPaymentRequired: Math.round(minDownPaymentAmount),
    monthlyPayment: calculateMonthlyPayment(maxLoanAmount, creditScore),
    confidence,
    dtiRatio: dtiRatio,
    recommendations
  };
};

/**
 * Calculate estimated monthly mortgage payment
 * @param {number} loanAmount - Loan amount
 * @param {string} creditScore - Credit score category
 * @returns {number} Monthly payment
 */
const calculateMonthlyPayment = (loanAmount, creditScore) => {
  // Estimated interest rates based on credit score
  const interestRates = {
    'excellent': 0.045, // 4.5%
    'good': 0.052,      // 5.2%
    'fair': 0.058,      // 5.8%
    'poor': 0.065,      // 6.5%
    'veryPoor': 0.075   // 7.5%
  };

  const rate = interestRates[creditScore] || 0.065;
  const term = 25; // 25-year amortization
  const monthlyRate = rate / 12;
  const numberOfPayments = term * 12;

  if (monthlyRate === 0) return loanAmount / numberOfPayments;

  const monthlyPayment = loanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  return Math.round(monthlyPayment);
};

/**
 * Generate personalized recommendations
 * @param {string} creditScore - Credit score category
 * @param {string} employmentStatus - Employment status
 * @param {number} dtiRatio - Debt-to-income ratio
 * @param {number} downPayment - Down payment amount
 * @param {number} maxLoanAmount - Maximum loan amount
 * @returns {Array} List of recommendations
 */
const generateRecommendations = (creditScore, employmentStatus, dtiRatio, downPayment, maxLoanAmount) => {
  const recommendations = [];

  // Credit score recommendations
  if (creditScore === 'veryPoor' || creditScore === 'poor') {
    recommendations.push('Work on improving your credit score to get better rates');
    recommendations.push('Pay off outstanding debts and avoid new credit applications');
  } else if (creditScore === 'fair') {
    recommendations.push('Consider improving your credit score for better rates');
  }

  // Employment recommendations
  if (employmentStatus === 'partTime' || employmentStatus === 'contractor') {
    recommendations.push('Consider full-time employment for better approval chances');
  } else if (employmentStatus === 'selfEmployed') {
    recommendations.push('Ensure you have 2+ years of tax returns for self-employed income');
  }

  // Debt-to-income recommendations
  if (dtiRatio > 0.30) {
    recommendations.push('Consider reducing monthly debt payments to improve approval odds');
  }

  // Down payment recommendations
  if (downPayment < maxLoanAmount * 0.20) {
    recommendations.push('A 20% down payment will help avoid mortgage insurance');
  }

  // General recommendations
  recommendations.push('Get pre-approved before house hunting');
  recommendations.push('Keep your financial situation stable during the application process');

  return recommendations.slice(0, 5); // Limit to 5 recommendations
};

/**
 * Get eligibility status description
 * @param {Object} eligibility - Eligibility results
 * @returns {string} Status description
 */
export const getEligibilityStatus = (eligibility) => {
  if (!eligibility.eligible) {
    return 'Not Eligible';
  }

  if (eligibility.confidence === 'high') {
    return 'Highly Eligible';
  } else if (eligibility.confidence === 'medium') {
    return 'Likely Eligible';
  } else {
    return 'Conditionally Eligible';
  }
};

/**
 * Format currency for display
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export default {
  calculateEligibility,
  getEligibilityStatus,
  formatCurrency
}; 