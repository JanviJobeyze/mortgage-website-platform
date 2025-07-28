/**
 * Test file for mortgage down payment calculations
 * Demonstrates the function with various scenarios
 */

import { 
  calculateDownPayment, 
  generateDownPaymentOptions,
  getAvailableDownPaymentPercentages,
  formatCurrency,
  formatPercentage,
  CMHC_INSURANCE_TIERS,
  DOWN_PAYMENT_RULES 
} from './mortgageCalculations.js';

// Test scenarios
const testScenarios = [
  {
    name: "Home under $500K - 5% down payment",
    askingPrice: 400000,
    downPaymentPercentage: 5,
    expectedInsuranceRate: 0.04
  },
  {
    name: "Home under $500K - 10% down payment", 
    askingPrice: 450000,
    downPaymentPercentage: 10,
    expectedInsuranceRate: 0.031
  },
  {
    name: "Home under $500K - 15% down payment",
    askingPrice: 480000,
    downPaymentPercentage: 15,
    expectedInsuranceRate: 0.028
  },
  {
    name: "Home under $500K - 20% down payment (no insurance)",
    askingPrice: 400000,
    downPaymentPercentage: 20,
    expectedInsuranceRate: 0
  },
  {
    name: "Home $500K-$999K - 10% down payment",
    askingPrice: 750000,
    downPaymentPercentage: 10,
    expectedInsuranceRate: 0.031
  },
  {
    name: "Home $500K-$999K - 15% down payment",
    askingPrice: 800000,
    downPaymentPercentage: 15,
    expectedInsuranceRate: 0.028
  },
  {
    name: "Home $1M+ - 20% down payment (no insurance)",
    askingPrice: 1200000,
    downPaymentPercentage: 20,
    expectedInsuranceRate: 0
  },
  {
    name: "Home $1M+ - 25% down payment (no insurance)",
    askingPrice: 1500000,
    downPaymentPercentage: 25,
    expectedInsuranceRate: 0
  }
];

// Validation test scenarios
const validationTestScenarios = [
  {
    name: "Invalid: Home under $500K with 3% down",
    askingPrice: 400000,
    downPaymentPercentage: 3,
    shouldBeValid: false
  },
  {
    name: "Invalid: Home $500K-$999K with 8% down",
    askingPrice: 750000,
    downPaymentPercentage: 8,
    shouldBeValid: false
  },
  {
    name: "Invalid: Home $1M+ with 15% down",
    askingPrice: 1200000,
    downPaymentPercentage: 15,
    shouldBeValid: false
  }
];

/**
 * Test the new generateDownPaymentOptions function
 */
export function testGenerateDownPaymentOptions() {
  console.log('🏠 Testing generateDownPaymentOptions Function\n');
  
  const testPrices = [400000, 750000, 1200000];
  
  testPrices.forEach(price => {
    console.log(`\n📊 Home Price: ${formatCurrency(price)}`);
    console.log('─'.repeat(80));
    
    const options = generateDownPaymentOptions(price);
    
    options.forEach(option => {
      const status = option.isEligible ? '✅' : '❌';
      console.log(`${status} ${option.percent}% Down Payment:`);
      console.log(`   Down Payment: ${formatCurrency(option.downPayment)}`);
      console.log(`   Insurance Rate: ${option.insuranceRate > 0 ? formatPercentage(option.insuranceRate * 100) : 'No Insurance'}`);
      console.log(`   Insurance Premium: ${option.insurancePremium > 0 ? formatCurrency(option.insurancePremium) : '—'}`);
      console.log(`   Total Mortgage: ${formatCurrency(option.totalMortgage)}`);
      console.log(`   Eligible: ${option.isEligible ? 'Yes' : 'No'}`);
      
      if (!option.isEligible && option.warningMessage) {
        console.log(`   Warning: ${option.warningMessage}`);
      }
      console.log('');
    });
  });
}

/**
 * Run all test scenarios
 */
export function runTests() {
  console.log('🏠 Mortgage Down Payment Calculator Tests\n');
  
  // Test valid scenarios
  console.log('✅ Valid Calculation Tests:');
  testScenarios.forEach((scenario, index) => {
    const result = calculateDownPayment(scenario.askingPrice, scenario.downPaymentPercentage);
    
    console.log(`\n${index + 1}. ${scenario.name}`);
    console.log(`   Home Price: ${formatCurrency(scenario.askingPrice)}`);
    console.log(`   Down Payment: ${formatPercentage(scenario.downPaymentPercentage)}`);
    console.log(`   Down Payment Amount: ${formatCurrency(result.downPaymentAmount)}`);
    console.log(`   Mortgage Before Insurance: ${formatCurrency(result.mortgageBeforeInsurance)}`);
    console.log(`   Insurance Rate: ${formatPercentage(result.insuranceRate * 100)}`);
    console.log(`   Insurance Premium: ${formatCurrency(result.insurancePremium)}`);
    console.log(`   Total Mortgage: ${formatCurrency(result.totalMortgage)}`);
    console.log(`   Valid: ${result.isValid ? '✅' : '❌'}`);
    
    // Verify insurance rate
    if (Math.abs(result.insuranceRate - scenario.expectedInsuranceRate) < 0.001) {
      console.log(`   Insurance Rate Check: ✅`);
    } else {
      console.log(`   Insurance Rate Check: ❌ (Expected: ${scenario.expectedInsuranceRate}, Got: ${result.insuranceRate})`);
    }
  });
  
  // Test validation scenarios
  console.log('\n\n❌ Validation Tests:');
  validationTestScenarios.forEach((scenario, index) => {
    const result = calculateDownPayment(scenario.askingPrice, scenario.downPaymentPercentage);
    
    console.log(`\n${index + 1}. ${scenario.name}`);
    console.log(`   Home Price: ${formatCurrency(scenario.askingPrice)}`);
    console.log(`   Down Payment: ${formatPercentage(scenario.downPaymentPercentage)}`);
    console.log(`   Valid: ${result.isValid ? '✅' : '❌'}`);
    console.log(`   Error: ${result.error || 'None'}`);
    
    if (result.isValid === scenario.shouldBeValid) {
      console.log(`   Validation Check: ✅`);
    } else {
      console.log(`   Validation Check: ❌ (Expected: ${scenario.shouldBeValid}, Got: ${result.isValid})`);
    }
  });
  
  // Test available percentages
  console.log('\n\n📊 Available Down Payment Percentages:');
  const testPrices = [400000, 750000, 1200000];
  testPrices.forEach(price => {
    const percentages = getAvailableDownPaymentPercentages(price);
    console.log(`\nHome Price: ${formatCurrency(price)}`);
    console.log(`Available percentages: ${percentages.join('%, ')}%`);
  });
  
  console.log('\n\n📋 CMHC Insurance Tiers:');
  Object.entries(CMHC_INSURANCE_TIERS).forEach(([key, tier]) => {
    console.log(`${key}: ${tier.label} → ${formatPercentage(tier.rate * 100)}`);
  });
  
  console.log('\n\n📋 Down Payment Rules:');
  Object.entries(DOWN_PAYMENT_RULES).forEach(([key, rule]) => {
    if (rule.maxPrice) {
      console.log(`${key}: Under ${formatCurrency(rule.maxPrice)} → Min ${rule.minDownPayment}%`);
    } else if (rule.minPrice) {
      console.log(`${key}: ${formatCurrency(rule.minPrice)}+ → Min ${rule.minDownPayment}%`);
    }
  });
}

// Example usage function
export function demonstrateUsage() {
  console.log('🎯 Example Usage:\n');
  
  // Example 1: Standard calculation
  const result1 = calculateDownPayment(500000, 10);
  console.log('Example 1: $500K home with 10% down payment');
  console.log(`Down Payment: ${formatCurrency(result1.downPaymentAmount)}`);
  console.log(`Insurance Premium: ${formatCurrency(result1.insurancePremium)}`);
  console.log(`Total Mortgage: ${formatCurrency(result1.totalMortgage)}`);
  console.log(`Insurance Tier: ${result1.insuranceTier}\n`);
  
  // Example 2: No insurance required
  const result2 = calculateDownPayment(600000, 25);
  console.log('Example 2: $600K home with 25% down payment');
  console.log(`Down Payment: ${formatCurrency(result2.downPaymentAmount)}`);
  console.log(`Insurance Premium: ${formatCurrency(result2.insurancePremium)}`);
  console.log(`Total Mortgage: ${formatCurrency(result2.totalMortgage)}`);
  console.log(`Insurance Tier: ${result2.insuranceTier}\n`);
  
  // Example 3: Validation error
  const result3 = calculateDownPayment(750000, 8);
  console.log('Example 3: $750K home with 8% down payment (invalid)');
  console.log(`Valid: ${result3.isValid}`);
  console.log(`Error: ${result3.error}`);
  
  // Example 4: Generate all options
  console.log('\nExample 4: Generate all down payment options for $500K home');
  const options = generateDownPaymentOptions(500000);
  options.forEach(option => {
    console.log(`${option.percent}%: ${formatCurrency(option.downPayment)} down, ${formatCurrency(option.totalMortgage)} total mortgage`);
  });
}

// Export for use in browser console or other modules
if (typeof window !== 'undefined') {
  window.mortgageTests = { 
    runTests, 
    demonstrateUsage, 
    testGenerateDownPaymentOptions 
  };
} 