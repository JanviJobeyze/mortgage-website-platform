import { calculateEligibility, getEligibilityStatus, formatCurrency } from './eligibilityEngine';

// Test cases for the eligibility engine
describe('Eligibility Engine Tests', () => {
  
  test('should calculate eligibility for excellent credit profile', () => {
    const formData = {
      annualIncome: '100000',
      employmentStatus: 'fullTime',
      creditScore: 'excellent',
      downPayment: '50000',
      monthlyDebts: '1000'
    };
    
    const result = calculateEligibility(formData);
    
    expect(result.eligible).toBe(true);
    expect(result.confidence).toBe('high');
    expect(result.maxLoanAmount).toBeGreaterThan(0);
    expect(result.maxPurchasePrice).toBeGreaterThan(result.maxLoanAmount);
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.dtiRatio).toBe(0.12); // 1000 / (100000/12) = 0.12
    expect(result.recommendations).toHaveLength(5);
  });
  
  test('should reject application with high debt-to-income ratio', () => {
    const formData = {
      annualIncome: '50000',
      employmentStatus: 'fullTime',
      creditScore: 'good',
      downPayment: '10000',
      monthlyDebts: '3000' // 72% DTI ratio
    };
    
    const result = calculateEligibility(formData);
    
    expect(result.eligible).toBe(false);
    expect(result.reason).toContain('Debt-to-income ratio');
    expect(result.recommendations).toContain('Reduce monthly debt payments');
  });
  
  test('should reject application with insufficient down payment', () => {
    const formData = {
      annualIncome: '80000',
      employmentStatus: 'fullTime',
      creditScore: 'fair',
      downPayment: '5000', // Too low for fair credit
      monthlyDebts: '500'
    };
    
    const result = calculateEligibility(formData);
    
    expect(result.eligible).toBe(false);
    expect(result.reason).toContain('Down payment');
    expect(result.reason).toContain('below minimum required');
  });
  
  test('should handle invalid income', () => {
    const formData = {
      annualIncome: '0',
      employmentStatus: 'fullTime',
      creditScore: 'good',
      downPayment: '20000',
      monthlyDebts: '500'
    };
    
    const result = calculateEligibility(formData);
    
    expect(result.eligible).toBe(false);
    expect(result.reason).toBe('Invalid income amount');
  });
  
  test('should calculate different loan amounts based on credit score', () => {
    const baseFormData = {
      annualIncome: '75000',
      employmentStatus: 'fullTime',
      downPayment: '25000',
      monthlyDebts: '800'
    };
    
    const excellentResult = calculateEligibility({
      ...baseFormData,
      creditScore: 'excellent'
    });
    
    const poorResult = calculateEligibility({
      ...baseFormData,
      creditScore: 'poor'
    });
    
    expect(excellentResult.eligible).toBe(true);
    expect(poorResult.eligible).toBe(true);
    expect(excellentResult.maxLoanAmount).toBeGreaterThan(poorResult.maxLoanAmount);
  });
  
  test('should handle different employment statuses', () => {
    const baseFormData = {
      annualIncome: '60000',
      creditScore: 'good',
      downPayment: '15000',
      monthlyDebts: '600'
    };
    
    const fullTimeResult = calculateEligibility({
      ...baseFormData,
      employmentStatus: 'fullTime'
    });
    
    const partTimeResult = calculateEligibility({
      ...baseFormData,
      employmentStatus: 'partTime'
    });
    
    expect(fullTimeResult.eligible).toBe(true);
    expect(partTimeResult.eligible).toBe(true);
    expect(fullTimeResult.maxLoanAmount).toBeGreaterThan(partTimeResult.maxLoanAmount);
  });
  
  test('should format currency correctly', () => {
    expect(formatCurrency(100000)).toBe('$100,000');
    expect(formatCurrency(1500000)).toBe('$1,500,000');
    expect(formatCurrency(0)).toBe('$0');
  });
  
  test('should return correct eligibility status', () => {
    const eligibleHigh = { eligible: true, confidence: 'high' };
    const eligibleMedium = { eligible: true, confidence: 'medium' };
    const eligibleLow = { eligible: true, confidence: 'low' };
    const notEligible = { eligible: false };
    
    expect(getEligibilityStatus(eligibleHigh)).toBe('Highly Eligible');
    expect(getEligibilityStatus(eligibleMedium)).toBe('Likely Eligible');
    expect(getEligibilityStatus(eligibleLow)).toBe('Conditionally Eligible');
    expect(getEligibilityStatus(notEligible)).toBe('Not Eligible');
  });
  
  test('should provide personalized recommendations', () => {
    const poorCreditFormData = {
      annualIncome: '70000',
      employmentStatus: 'partTime',
      creditScore: 'poor',
      downPayment: '20000',
      monthlyDebts: '1500'
    };
    
    const result = calculateEligibility(poorCreditFormData);
    
    expect(result.recommendations).toContain('Work on improving your credit score');
    expect(result.recommendations).toContain('Consider full-time employment');
    expect(result.recommendations).toHaveLength(5);
  });
  
  test('should calculate monthly payment correctly', () => {
    const formData = {
      annualIncome: '100000',
      employmentStatus: 'fullTime',
      creditScore: 'excellent',
      downPayment: '50000',
      monthlyDebts: '1000'
    };
    
    const result = calculateEligibility(formData);
    
    expect(result.monthlyPayment).toBeGreaterThan(0);
    expect(result.monthlyPayment).toBeLessThan(result.maxLoanAmount / 12); // Should be less than principal-only payment
  });
});

// Example usage scenarios
console.log('=== Example Scenarios ===');

// Scenario 1: Excellent borrower
const excellentBorrower = {
  annualIncome: '120000',
  employmentStatus: 'fullTime',
  creditScore: 'excellent',
  downPayment: '60000',
  monthlyDebts: '800'
};

console.log('Excellent Borrower:', calculateEligibility(excellentBorrower));

// Scenario 2: First-time buyer with fair credit
const firstTimeBuyer = {
  annualIncome: '65000',
  employmentStatus: 'fullTime',
  creditScore: 'fair',
  downPayment: '15000',
  monthlyDebts: '1200'
};

console.log('First-time Buyer:', calculateEligibility(firstTimeBuyer));

// Scenario 3: Self-employed with good credit
const selfEmployed = {
  annualIncome: '90000',
  employmentStatus: 'selfEmployed',
  creditScore: 'good',
  downPayment: '30000',
  monthlyDebts: '1000'
};

console.log('Self-employed:', calculateEligibility(selfEmployed)); 