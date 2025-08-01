import React, { useState } from 'react';
import { RateComparison, MiniMortgageCalculator } from '../components';

/**
 * Component Demo Page
 * Showcases the RateComparison and MiniMortgageCalculator components
 * with different variants and configurations
 */
const ComponentDemo = () => {
  const [calculatorResult, setCalculatorResult] = useState(null);

  // Sample rates data for demonstration
  const sampleRatesData = [
    {
      lender: 'RBC Royal Bank',
      productType: '5-Year Fixed',
      rate: 5.89,
      term: '5 Years',
      payment: '$2,847',
      province: 'Ontario'
    },
    {
      lender: 'TD Canada Trust',
      productType: '5-Year Fixed',
      rate: 5.95,
      term: '5 Years',
      payment: '$2,867',
      province: 'Ontario'
    },
    {
      lender: 'Scotiabank',
      productType: '5-Year Variable',
      rate: 6.15,
      term: '5 Years',
      payment: '$2,967',
      province: 'Ontario'
    },
    {
      lender: 'BMO',
      productType: '3-Year Fixed',
      rate: 5.75,
      term: '3 Years',
      payment: '$2,807',
      province: 'Ontario'
    },
    {
      lender: 'CIBC',
      productType: '5-Year Fixed',
      rate: 5.92,
      term: '5 Years',
      payment: '$2,857',
      province: 'Ontario'
    },
    {
      lender: 'National Bank',
      productType: '5-Year Variable',
      rate: 6.25,
      term: '5 Years',
      payment: '$2,987',
      province: 'Ontario'
    }
  ];

  const handleCalculatorResult = (result) => {
    setCalculatorResult(result);
    console.log('Calculator result:', result);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Component Demo
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcasing the RateComparison and MiniMortgageCalculator components 
            with different variants and configurations.
          </p>
        </div>

        {/* RateComparison Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">RateComparison Components</h2>
          
          {/* Card Variant */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Card Layout Variant</h3>
            <RateComparison
              ratesData={sampleRatesData}
              variant="card"
              title="Current Mortgage Rates"
              subtitle="Best rates from top Canadian lenders"
              showProvinceFilter={true}
              ctaText="Compare All Rates"
              ctaLink="/rates"
            />
          </div>

          {/* Table Variant */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Table Layout Variant</h3>
            <RateComparison
              ratesData={sampleRatesData}
              variant="table"
              title="Detailed Rate Comparison"
              subtitle="Comprehensive view of all available rates"
              showProvinceFilter={true}
              ctaText="Get Pre-Approved"
              ctaLink="/pre-qualify"
            />
          </div>

          {/* Compact Variant */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Compact Variant (No Province Filter)</h3>
            <RateComparison
              ratesData={sampleRatesData.slice(0, 3)}
              variant="card"
              title="Quick Rate Check"
              subtitle="Top 3 rates at a glance"
              showProvinceFilter={false}
              ctaText="View More Rates"
              ctaLink="/rates"
            />
          </div>
        </section>

        {/* MiniMortgageCalculator Components */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">MiniMortgageCalculator Components</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Default Variant */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Default Variant (Real-time)</h3>
              <MiniMortgageCalculator
                defaultValues={{
                  loanAmount: 500000,
                  downPayment: 100000,
                  interestRate: 5.89,
                  amortizationYears: 25
                }}
                onResultChange={handleCalculatorResult}
                title="Mortgage Payment Calculator"
                subtitle="Calculate your monthly mortgage payment"
              />
            </div>

            {/* Compact Variant */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Compact Variant</h3>
              <MiniMortgageCalculator
                variant="compact"
                defaultValues={{
                  loanAmount: 750000,
                  downPayment: 150000,
                  interestRate: 6.15,
                  amortizationYears: 30
                }}
                onResultChange={handleCalculatorResult}
                title="Quick Calculator"
                subtitle="Fast payment estimation"
              />
            </div>

            {/* Inline Variant */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Inline Variant</h3>
              <MiniMortgageCalculator
                variant="inline"
                defaultValues={{
                  loanAmount: 400000,
                  downPayment: 80000,
                  interestRate: 5.75,
                  amortizationYears: 25
                }}
                onResultChange={handleCalculatorResult}
                title="Payment Estimator"
                subtitle="Side-by-side layout"
              />
            </div>

            {/* Button Variant */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Button Variant (Manual Calculation)</h3>
              <MiniMortgageCalculator
                showButton={true}
                defaultValues={{
                  loanAmount: 600000,
                  downPayment: 120000,
                  interestRate: 6.00,
                  amortizationYears: 25
                }}
                onResultChange={handleCalculatorResult}
                title="Manual Calculator"
                subtitle="Calculate when ready"
                buttonText="Calculate Payment"
              />
            </div>
          </div>
        </section>

        {/* Calculator Result Display */}
        {calculatorResult && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Calculator Result</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Calculation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Monthly Payment:</p>
                  <p className="text-xl font-bold text-green-600">{calculatorResult.formattedPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Principal Amount:</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${calculatorResult.principal.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loan Amount:</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${calculatorResult.inputs.loanAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Down Payment:</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${calculatorResult.inputs.downPayment.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Usage Examples */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Usage Examples</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* RateComparison Usage */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">RateComparison Usage</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Basic usage
<RateComparison ratesData={rates} />

// With custom province and variant
<RateComparison 
  province="British Columbia"
  variant="table"
  ratesData={rates}
  showProvinceFilter={true}
  title="BC Mortgage Rates"
  ctaText="Get Pre-Approved"
  ctaLink="/pre-qualify"
/>`}
              </pre>
            </div>

            {/* MiniMortgageCalculator Usage */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">MiniMortgageCalculator Usage</h3>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Basic usage with real-time calculation
<MiniMortgageCalculator />

// With custom defaults and callback
<MiniMortgageCalculator 
  defaultValues={{
    loanAmount: 500000,
    downPayment: 100000,
    interestRate: 5.89,
    amortizationYears: 25
  }}
  onResultChange={(result) => console.log(result)}
  variant="compact"
  showButton={false}
/>`}
              </pre>
            </div>
          </div>
        </section>

        {/* Features Summary */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Component Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* RateComparison Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">RateComparison Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Responsive card and table layouts
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Province filtering with dropdown
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Best rate highlighting in green
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Customizable CTA buttons
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Accessible design with proper ARIA labels
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Mobile-responsive design
                </li>
              </ul>
            </div>

            {/* MiniMortgageCalculator Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">MiniMortgageCalculator Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Real-time calculation updates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Multiple visual variants (default, compact, inline)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Automatic currency formatting
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Optional manual calculation button
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Result callback function
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Uses shared mortgage calculation utilities
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ComponentDemo; 