# Mortgage Eligibility Rules Engine

## Overview
The Eligibility Rules Engine is a JavaScript module that calculates mortgage eligibility and maximum loan amounts based on user inputs from the PreQualQuiz. It uses a comprehensive set of rules and multipliers to provide accurate estimates.

## Features

### ✅ **Core Functionality**
- **Eligibility Assessment**: Determines if a user qualifies for a mortgage
- **Maximum Loan Calculation**: Calculates the maximum loan amount based on financial profile
- **Monthly Payment Estimation**: Provides estimated monthly mortgage payments
- **Debt-to-Income Analysis**: Evaluates debt-to-income ratios against thresholds
- **Personalized Recommendations**: Generates actionable recommendations for improvement

### ✅ **Input Validation**
- Validates all required fields
- Handles edge cases and invalid inputs
- Provides clear error messages and reasons for rejection

### ✅ **Multi-Factor Analysis**
- **Credit Score Impact**: Different multipliers based on credit score ranges
- **Employment Stability**: Considers employment type and stability
- **Income Analysis**: Evaluates annual income and debt ratios
- **Down Payment Requirements**: Checks minimum down payment based on credit score

## Algorithm Details

### Credit Score Multipliers
```javascript
const CREDIT_SCORE_MULTIPLIERS = {
  'excellent': 1.0,    // 750+ - Best rates and highest approval
  'good': 0.95,        // 700-749 - Good rates, high approval
  'fair': 0.85,        // 650-699 - Moderate rates, medium approval
  'poor': 0.70,        // 600-649 - Higher rates, lower approval
  'veryPoor': 0.50     // <600 - Highest rates, lowest approval
};
```

### Employment Status Multipliers
```javascript
const EMPLOYMENT_MULTIPLIERS = {
  'fullTime': 1.0,     // Most stable
  'partTime': 0.85,    // Less stable but still reliable
  'selfEmployed': 0.90, // Good but requires more documentation
  'contractor': 0.80,  // Less stable income
  'retired': 0.75      // Fixed income, may have limitations
};
```

### Debt-to-Income Thresholds
```javascript
const DTI_THRESHOLDS = {
  'excellent': 0.28,   // 28% - Conservative
  'good': 0.32,        // 32% - Standard
  'fair': 0.36,        // 36% - Moderate
  'poor': 0.40,        // 40% - Higher risk
  'veryPoor': 0.43     // 43% - Maximum allowed
};
```

### Base Loan-to-Income Ratios
```javascript
const BASE_LOAN_TO_INCOME_RATIOS = {
  'excellent': 4.5,    // $4.50 loan per $1 income
  'good': 4.0,         // $4.00 loan per $1 income
  'fair': 3.5,         // $3.50 loan per $1 income
  'poor': 3.0,         // $3.00 loan per $1 income
  'veryPoor': 2.5      // $2.50 loan per $1 income
};
```

## Usage

### Basic Usage
```javascript
import { calculateEligibility, getEligibilityStatus, formatCurrency } from './eligibilityEngine';

const formData = {
  annualIncome: '100000',
  employmentStatus: 'fullTime',
  creditScore: 'excellent',
  downPayment: '50000',
  monthlyDebts: '1000'
};

const results = calculateEligibility(formData);
console.log(results);
```

### Example Output
```javascript
{
  eligible: true,
  maxLoanAmount: 450000,
  maxPurchasePrice: 500000,
  downPaymentRequired: 22500,
  monthlyPayment: 2250,
  confidence: 'high',
  dtiRatio: 0.12,
  recommendations: [
    'Get pre-approved before house hunting',
    'Keep your financial situation stable during the application process',
    // ... more recommendations
  ]
}
```

## Calculation Logic

### 1. **Base Loan Amount**
```
Base Loan = Annual Income × Base Loan-to-Income Ratio
```

### 2. **Apply Multipliers**
```
Adjusted Loan = Base Loan × Credit Multiplier × Employment Multiplier
```

### 3. **Debt-to-Income Adjustment**
```
DTI Adjustment = 1 - (Current DTI / Max DTI) × 0.2
Final Loan = Adjusted Loan × DTI Adjustment
```

### 4. **Down Payment Validation**
```
Min Down Payment = Final Loan × (Min Down Payment %)
Required Down Payment %:
- Excellent: 5%
- Good: 10%
- Fair: 15%
- Poor: 20%
- Very Poor: 25%
```

### 5. **Monthly Payment Calculation**
```
Monthly Payment = P × (r(1+r)^n) / ((1+r)^n - 1)
Where:
P = Loan Amount
r = Monthly Interest Rate
n = Total Number of Payments (25 years × 12 months)
```

## Interest Rates by Credit Score
```javascript
const interestRates = {
  'excellent': 0.045, // 4.5%
  'good': 0.052,      // 5.2%
  'fair': 0.058,      // 5.8%
  'poor': 0.065,      // 6.5%
  'veryPoor': 0.075   // 7.5%
};
```

## Validation Rules

### ✅ **Eligibility Checks**
1. **Income Validation**: Must be greater than 0
2. **Debt-to-Income Ratio**: Must be below threshold for credit score
3. **Down Payment**: Must meet minimum requirements
4. **Credit Score**: Must be a valid category

### ❌ **Rejection Reasons**
- Invalid income amount
- Debt-to-income ratio too high
- Insufficient down payment
- Missing required fields

## Confidence Levels

### 🟢 **High Confidence**
- Excellent credit score (750+)
- Full-time employment
- Low debt-to-income ratio (<25%)

### 🟡 **Medium Confidence**
- Good to fair credit score
- Stable employment
- Moderate debt-to-income ratio (25-35%)

### 🟠 **Low Confidence**
- Poor to very poor credit score
- Part-time or contractor employment
- High debt-to-income ratio (>35%)

## Recommendations Engine

The system generates personalized recommendations based on:

### **Credit Score Based**
- Improve credit score for better rates
- Pay off outstanding debts
- Avoid new credit applications

### **Employment Based**
- Consider full-time employment
- Ensure 2+ years of tax returns (self-employed)
- Maintain stable employment

### **Financial Based**
- Reduce monthly debt payments
- Increase down payment to 20%
- Improve debt-to-income ratio

### **General**
- Get pre-approved before house hunting
- Keep financial situation stable
- Consider smaller home purchase

## Testing

Run the test suite to validate calculations:
```bash
npm test eligibilityEngine.test.js
```

### Test Scenarios
- ✅ Excellent borrower profile
- ✅ High debt-to-income rejection
- ✅ Insufficient down payment rejection
- ✅ Invalid income handling
- ✅ Credit score impact analysis
- ✅ Employment status impact
- ✅ Currency formatting
- ✅ Status descriptions
- ✅ Personalized recommendations
- ✅ Monthly payment calculations

## Integration

### In PreQualQuiz Component
```javascript
import { calculateEligibility } from '../utils/eligibilityEngine';

const handleGetResults = () => {
  const results = calculateEligibility(formData);
  setEligibilityResults(results);
};
```

### Display Results
```javascript
{eligibilityResults && (
  <div>
    <h3>Your Eligibility Results</h3>
    {eligibilityResults.eligible ? (
      <div>
        <p>Status: {getEligibilityStatus(eligibilityResults)}</p>
        <p>Max Loan: {formatCurrency(eligibilityResults.maxLoanAmount)}</p>
        <p>Monthly Payment: {formatCurrency(eligibilityResults.monthlyPayment)}</p>
      </div>
    ) : (
      <div>
        <p>Not Eligible: {eligibilityResults.reason}</p>
      </div>
    )}
  </div>
)}
```

## Performance

- **Fast Calculation**: O(1) time complexity
- **Memory Efficient**: Minimal memory usage
- **Scalable**: Handles multiple concurrent calculations
- **Cached Results**: Results can be cached for repeated calculations

## Future Enhancements

### Planned Features
- [ ] Property tax and insurance calculations
- [ ] CMHC insurance premium calculations
- [ ] Stress test rate compliance
- [ ] Multiple property type support
- [ ] Investment property calculations
- [ ] Refinancing scenarios
- [ ] Rate comparison integration

### Potential Improvements
- [ ] Machine learning model integration
- [ ] Real-time rate updates
- [ ] Regional market adjustments
- [ ] Seasonal factor considerations
- [ ] Economic indicator integration

## Support

For questions or issues with the eligibility engine:
1. Check the test cases for examples
2. Review the calculation logic documentation
3. Validate input data format
4. Test with known scenarios

---

**Note**: This engine provides estimates for educational purposes. Actual mortgage approval and terms are subject to lender-specific criteria and market conditions. 