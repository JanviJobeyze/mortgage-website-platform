/**
 * Mortgage Rate Terms and Definitions
 * Used for tooltips and help text throughout the application
 */

export const RATE_TERMS = {
  // Basic Rate Terms
  rate: {
    term: "Interest Rate",
    description: "The percentage of interest charged on your mortgage loan. This is the base rate before any additional fees or charges are added."
  },
  
  apr: {
    term: "APR (Annual Percentage Rate)",
    description: "The total cost of borrowing expressed as a yearly rate. APR includes the interest rate plus other loan costs such as broker fees, discount points, and some closing costs."
  },
  
  term: {
    term: "Term Length",
    description: "The length of time your mortgage rate is guaranteed. Common terms are 1, 2, 3, 4, 5, 7, or 10 years. After the term ends, you'll need to renew at current market rates."
  },
  
  type: {
    term: "Rate Type",
    description: "Fixed rates stay the same throughout your term, while variable rates can change based on market conditions. Variable rates often start lower but carry more risk."
  },
  
  // Loan Types
  fixed: {
    term: "Fixed Rate",
    description: "An interest rate that remains constant throughout your mortgage term. Your payment amount stays the same, providing predictable monthly payments and protection against rate increases."
  },
  
  variable: {
    term: "Variable Rate",
    description: "An interest rate that can fluctuate based on changes in the Bank of Canada's prime rate. Payments may change, but you can often lock in to a fixed rate later."
  },
  
  // Loan Purposes
  homePurchase: {
    term: "Home Purchase",
    description: "A mortgage used to buy a new home or property. This is the most common type of mortgage and typically offers the best rates."
  },
  
  refinancing: {
    term: "Refinancing",
    description: "Replacing your existing mortgage with a new one, often to get a better rate, change terms, or access equity. May involve additional fees and penalties."
  },
  
  homeEquity: {
    term: "Home Equity Loan",
    description: "A loan that uses your home's equity as collateral. You can borrow against the value you've built up in your home, often for renovations or other expenses."
  },
  
  firstTimeBuyer: {
    term: "First-Time Buyer",
    description: "Special mortgage programs designed for people buying their first home. May include lower down payment requirements, reduced fees, or special rate discounts."
  },
  
  // Lender Types
  majorBank: {
    term: "Major Bank",
    description: "Large, established banks like RBC, TD, Scotiabank, CIBC, and BMO. Offer comprehensive services but may have stricter qualification requirements."
  },
  
  creditUnion: {
    term: "Credit Union",
    description: "Member-owned financial institutions that often offer competitive rates and personalized service. May have membership requirements but typically lower fees."
  },
  
  monoline: {
    term: "Monoline Lender",
    description: "Specialized mortgage lenders that focus only on mortgages. Often offer competitive rates and flexible terms, but may have limited branch locations."
  },
  
  alternativeLender: {
    term: "Alternative Lender",
    description: "Non-traditional lenders that may offer more flexible qualification criteria. Rates are often higher but may be suitable for borrowers with unique circumstances."
  },
  
  // Rate Features
  change: {
    term: "Rate Change",
    description: "The difference between the current rate and the previous rate. A negative number means rates decreased, while a positive number means rates increased."
  },
  
  trending: {
    term: "Rate Trend",
    description: "The direction rates are moving in the market. 'Up' means rates are increasing, 'Down' means they're decreasing, and 'Stable' means little change."
  },
  
  features: {
    term: "Mortgage Features",
    description: "Additional benefits or options included with your mortgage, such as prepayment privileges, portability, or cashback offers."
  },
  
  // Payment Terms
  monthlyPayment: {
    term: "Monthly Payment",
    description: "Your regular mortgage payment amount. This typically includes principal, interest, property taxes, and mortgage insurance (if applicable)."
  },
  
  downPayment: {
    term: "Down Payment",
    description: "The initial payment you make when buying a home. A larger down payment (20%+) helps avoid mortgage insurance and may qualify you for better rates."
  },
  
  // Additional Terms
  prepaymentPenalty: {
    term: "Prepayment Penalty",
    description: "A fee charged if you pay off your mortgage early or make extra payments beyond what's allowed. Fixed-rate mortgages typically have higher penalties."
  },
  
  portability: {
    term: "Portable Mortgage",
    description: "Allows you to transfer your existing mortgage to a new property without penalties. Useful if you plan to move before your term ends."
  },
  
  cashback: {
    term: "Cashback",
    description: "A lump sum payment from the lender when you take out a mortgage. Often comes with slightly higher rates but provides immediate funds for closing costs."
  },
  
  rateGuarantee: {
    term: "Rate Guarantee",
    description: "A promise to hold a specific rate for a certain period (usually 90-120 days). Protects you if rates increase while you're house hunting."
  },
  
  // Provincial Terms
  province: {
    term: "Province",
    description: "Mortgage rates and terms can vary by province due to different regulations, market conditions, and lender availability. Select your province for the most accurate rates."
  },
  
  // Filter Terms
  loanPurpose: {
    term: "Loan Purpose",
    description: "The reason you're taking out a mortgage. Different purposes may have different rates, terms, and qualification requirements."
  },
  
  loanType: {
    term: "Loan Type",
    description: "Whether you want a fixed or variable rate mortgage. Fixed rates provide stability, while variable rates may offer lower initial rates."
  },
  
  termLength: {
    term: "Term Length",
    description: "How long you want to lock in your rate. Shorter terms (1-3 years) offer flexibility, while longer terms (5-10 years) provide rate security."
  },
  
  lenderType: {
    term: "Lender Type",
    description: "The category of financial institution offering the mortgage. Different lender types may offer different rates, services, and qualification criteria."
  }
};

/**
 * Get term definition by key
 */
export const getTermDefinition = (key) => {
  return RATE_TERMS[key] || {
    term: key,
    description: "No definition available for this term."
  };
};

/**
 * Get all terms for a specific category
 */
export const getTermsByCategory = (category) => {
  const categories = {
    basic: ['rate', 'apr', 'term', 'type'],
    loanTypes: ['fixed', 'variable'],
    purposes: ['homePurchase', 'refinancing', 'homeEquity', 'firstTimeBuyer'],
    lenders: ['majorBank', 'creditUnion', 'monoline', 'alternativeLender'],
    features: ['change', 'trending', 'features', 'prepaymentPenalty', 'portability', 'cashback', 'rateGuarantee'],
    payments: ['monthlyPayment', 'downPayment'],
    filters: ['province', 'loanPurpose', 'loanType', 'termLength', 'lenderType']
  };
  
  const categoryKeys = categories[category] || [];
  return categoryKeys.map(key => ({ key, ...RATE_TERMS[key] }));
};

export default RATE_TERMS; 