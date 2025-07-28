import { useEffect, useState } from 'react';
import RatesTable from '../components/RatesTable';
import MarketAnalysis from '../components/MarketAnalysis';
import InfoTooltip from '../components/InfoTooltip';
import VoiceReader from '../components/VoiceReader';
import { getTermDefinition } from '../data/rateTerms';

// Mock data for rates
const mockRates = [
  {
    id: '1',
    lender: {
      name: 'RBC Royal Bank',
      type: 'Major Bank',
      logo: '🏦',
      color: '#0052CC'
    },
    rate: 2.89,
    apr: 3.12,
    term: '5 Years',
    type: 'Fixed',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'British Columbia', 'Alberta'],
    change: '+0.05',
    isTrending: 'up',
    features: ['No prepayment penalty', 'Portable', 'Assumable'],
    lastUpdated: '2024-01-15T10:30:00Z',
    province: 'Ontario'
  },
  {
    id: '2',
    lender: {
      name: 'TD Canada Trust',
      type: 'Major Bank',
      logo: '🏦',
      color: '#00A3E0'
    },
    rate: 2.99,
    apr: 3.22,
    term: '5 Years',
    type: 'Fixed',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'British Columbia', 'Alberta'],
    change: '-0.02',
    isTrending: 'down',
    features: ['No prepayment penalty', 'Portable'],
    lastUpdated: '2024-01-15T10:30:00Z',
    province: 'Ontario'
  },
  {
    id: '3',
    lender: {
      name: 'Scotiabank',
      type: 'Major Bank',
      logo: '🏦',
      color: '#E31837'
    },
    rate: 2.95,
    apr: 3.18,
    term: '5 Years',
    type: 'Variable',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'British Columbia', 'Alberta'],
    change: '0.00',
    isTrending: 'stable',
    features: ['No prepayment penalty', 'Portable', 'Assumable'],
    lastUpdated: '2024-01-15T10:30:00Z',
    province: 'Ontario'
  },
  {
    id: '4',
    lender: {
      name: 'CIBC',
      type: 'Major Bank',
      logo: '🏦',
      color: '#FF6B35'
    },
    rate: 3.05,
    apr: 3.28,
    term: '5 Years',
    type: 'Fixed',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'British Columbia', 'Alberta'],
    change: '+0.03',
    isTrending: 'up',
    features: ['No prepayment penalty', 'Portable'],
    lastUpdated: '2024-01-15T10:30:00Z',
    province: 'Ontario'
  },
  {
    id: '5',
    lender: {
      name: 'BMO',
      type: 'Major Bank',
      logo: '🏦',
      color: '#0078D4'
    },
    rate: 2.92,
    apr: 3.15,
    term: '5 Years',
    type: 'Variable',
    purpose: 'Home Purchase',
    provinces: ['Ontario', 'British Columbia', 'Alberta'],
    change: '-0.01',
    isTrending: 'down',
    features: ['No prepayment penalty', 'Portable', 'Assumable'],
    lastUpdated: '2024-01-15T10:30:00Z',
    province: 'Ontario'
  }
];

function Rates() {
  useEffect(() => {
    // Set page title
    document.title = 'Compare Mortgage Rates | Best Canadian Mortgage Rates | MortgageLink Canada';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare the best mortgage rates from top Canadian lenders. Find competitive rates for home purchase, refinancing, and home equity loans. Get instant rate comparisons and quotes.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Compare the best mortgage rates from top Canadian lenders. Find competitive rates for home purchase, refinancing, and home equity loans. Get instant rate comparisons and quotes.';
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mortgage rates, rate comparison, Canadian mortgage rates, best mortgage rates, fixed rate, variable rate, mortgage quotes, rate calculator');
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = 'mortgage rates, rate comparison, Canadian mortgage rates, best mortgage rates, fixed rate, variable rate, mortgage quotes, rate calculator';
      document.head.appendChild(newMetaKeywords);
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Compare Mortgage Rates | MortgageLink Canada');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = 'Compare Mortgage Rates | MortgageLink Canada';
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Compare the best mortgage rates from top Canadian lenders. Find competitive rates for home purchase, refinancing, and home equity loans.');
    } else {
      const newOgDescription = document.createElement('meta');
      newOgDescription.setAttribute('property', 'og:description');
      newOgDescription.content = 'Compare the best mortgage rates from top Canadian lenders. Find competitive rates for home purchase, refinancing, and home equity loans.';
      document.head.appendChild(newOgDescription);
    }

    // Set canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', window.location.href);
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.rel = 'canonical';
      newCanonical.href = window.location.href;
      document.head.appendChild(newCanonical);
    }
  }, []);

  // ===== STATE =====
  const [province, setProvince] = useState('All Provinces');
  const [loanPurpose, setLoanPurpose] = useState('All Purposes');
  const [loanType, setLoanType] = useState('All Types');
  const [termLength, setTermLength] = useState('All Terms');
  const [lenderType, setLenderType] = useState('All Lenders');
  const [filteredRates, setFilteredRates] = useState(mockRates);

  // ===== HELPER FUNCTIONS =====
  
  // Get the best rate from filtered rates
  const getBestRate = () => {
    if (!filteredRates || filteredRates.length === 0) return null;
    return filteredRates.reduce((best, current) => 
      current.rate < best.rate ? current : best
    );
  };

  // Generate text for read-aloud functionality
  const generateReadAloudText = () => {
    const bestRate = getBestRate();
    if (!bestRate) {
      return "No rates available to read aloud.";
    }

    const rateText = `The best mortgage rate available is ${bestRate.rate}% from ${bestRate.lender.name}. `;
    const detailsText = `This is a ${bestRate.type.toLowerCase()} rate with a ${bestRate.term.toLowerCase()} term. `;
    const purposeText = `It's available for ${bestRate.purpose.toLowerCase()}. `;
    const aprText = `The annual percentage rate is ${bestRate.apr}%. `;
    const changeText = bestRate.change !== '0.00' ? 
      `The rate has ${bestRate.change.startsWith('+') ? 'increased' : 'decreased'} by ${bestRate.change.replace('+', '').replace('-', '')} percentage points. ` : 
      'The rate has remained stable. ';

    return rateText + detailsText + purposeText + aprText + changeText;
  };

  // ===== FILTERING LOGIC =====
  
  // Normalize lender type mapping
  const normalizeLenderType = (userSelection) => {
    const mapping = {
      'Major Banks': 'Major Bank',
      'Credit Unions': 'Credit Union', 
      'Monoline Lenders': 'Monoline',
      'Alternative Lenders': 'Alternative Lender'
    };
    return mapping[userSelection] || userSelection;
  };

  // Check if any filters are active
  const hasActiveFilters = province !== 'All Provinces' || 
                          loanPurpose !== 'All Purposes' ||
                          loanType !== 'All Types' || 
                          termLength !== 'All Terms' || 
                          lenderType !== 'All Lenders';

  // Reset all filters function
  const resetFilters = () => {
    setProvince('All Provinces');
    setLoanPurpose('All Purposes');
    setLoanType('All Types');
    setTermLength('All Terms');
    setLenderType('All Lenders');
  };

  // Client-side filtering logic
  useEffect(() => {
    let filtered = [...mockRates];

    // Apply filters
    if (province !== 'All Provinces') {
      filtered = filtered.filter(rate => rate.provinces.includes(province));
    }

    if (loanPurpose !== 'All Purposes') {
      filtered = filtered.filter(rate => rate.purpose === loanPurpose);
    }

    if (loanType !== 'All Types') {
      filtered = filtered.filter(rate => rate.type === loanType);
    }

    if (termLength !== 'All Terms') {
      filtered = filtered.filter(rate => rate.term === termLength);
    }

    if (lenderType !== 'All Lenders') {
      const normalizedLenderType = normalizeLenderType(lenderType);
      filtered = filtered.filter(rate => rate.lender.type === normalizedLenderType);
    }

    setFilteredRates(filtered);
  }, [province, loanPurpose, loanType, termLength, lenderType]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] mb-4 sm:mb-6">
              Compare Mortgage Rates
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed">
              Find the best mortgage rates from top Canadian lenders. Compare rates, terms, and features to make an informed decision.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Left Column - Filter Controls (Desktop) and Rate Alerts (Desktop) */}
            <div className="lg:col-span-1 space-y-6 sm:space-y-8">
              
              {/* Filter Rates Section */}
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Filter Rates
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Province */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="province-label">
                      <div className="flex items-center space-x-1">
                        <span>Province</span>
                        <InfoTooltip 
                          term={getTermDefinition('province').term}
                          description={getTermDefinition('province').description}
                          size="xs"
                          position="bottom"
                        />
                      </div>
                    </label>
                    <select 
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      aria-labelledby="province-label"
                      aria-describedby="province-description"
                      role="combobox"
                      aria-expanded="false"
                    >
                      <option value="All Provinces" aria-label="Show rates from all provinces">All Provinces</option>
                      <option value="Ontario" aria-label="Show rates from Ontario">Ontario</option>
                      <option value="British Columbia" aria-label="Show rates from British Columbia">British Columbia</option>
                      <option value="Alberta" aria-label="Show rates from Alberta">Alberta</option>
                      <option value="Quebec" aria-label="Show rates from Quebec">Quebec</option>
                      <option value="Nova Scotia" aria-label="Show rates from Nova Scotia">Nova Scotia</option>
                      <option value="New Brunswick" aria-label="Show rates from New Brunswick">New Brunswick</option>
                      <option value="Manitoba" aria-label="Show rates from Manitoba">Manitoba</option>
                      <option value="Saskatchewan" aria-label="Show rates from Saskatchewan">Saskatchewan</option>
                      <option value="Prince Edward Island" aria-label="Show rates from Prince Edward Island">Prince Edward Island</option>
                      <option value="Newfoundland and Labrador" aria-label="Show rates from Newfoundland and Labrador">Newfoundland and Labrador</option>
                    </select>
                    <div id="province-description" className="sr-only">
                      Select a province to filter mortgage rates by location. Choose "All Provinces" to see rates from all locations.
                    </div>
                  </div>

                  {/* Loan Purpose */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="purpose-label">
                      <div className="flex items-center space-x-1">
                        <span>Loan Purpose</span>
                        <InfoTooltip 
                          term={getTermDefinition('loanPurpose').term}
                          description={getTermDefinition('loanPurpose').description}
                          size="xs"
                          position="bottom"
                        />
                      </div>
                    </label>
                    <select 
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      aria-labelledby="purpose-label"
                      aria-describedby="purpose-description"
                      role="combobox"
                      aria-expanded="false"
                    >
                      <option value="All Purposes" aria-label="Show rates for all loan purposes">All Purposes</option>
                      <option value="Home Purchase" aria-label="Show rates for home purchase mortgages">Home Purchase</option>
                      <option value="Refinancing" aria-label="Show rates for mortgage refinancing">Refinancing</option>
                      <option value="Home Equity" aria-label="Show rates for home equity loans">Home Equity</option>
                      <option value="First-Time Buyer" aria-label="Show rates for first-time home buyers">First-Time Buyer</option>
                    </select>
                    <div id="purpose-description" className="sr-only">
                      Select the purpose of your mortgage loan to filter rates accordingly.
                    </div>
                  </div>

                  {/* Loan Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="type-label">
                      <div className="flex items-center space-x-1">
                        <span>Loan Type</span>
                        <InfoTooltip 
                          term={getTermDefinition('loanType').term}
                          description={getTermDefinition('loanType').description}
                          size="xs"
                          position="bottom"
                        />
                      </div>
                    </label>
                    <select 
                      value={loanType}
                      onChange={(e) => setLoanType(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      aria-labelledby="type-label"
                      aria-describedby="type-description"
                      role="combobox"
                      aria-expanded="false"
                    >
                      <option value="All Types" aria-label="Show both fixed and variable rates">All Types</option>
                      <option value="Fixed" aria-label="Show only fixed rate mortgages">Fixed</option>
                      <option value="Variable" aria-label="Show only variable rate mortgages">Variable</option>
                    </select>
                    <div id="type-description" className="sr-only">
                      Choose between fixed rates that stay the same or variable rates that can change.
                    </div>
                  </div>

                  {/* Term Length */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="term-label">
                      <div className="flex items-center space-x-1">
                        <span>Term Length</span>
                        <InfoTooltip 
                          term={getTermDefinition('termLength').term}
                          description={getTermDefinition('termLength').description}
                          size="xs"
                          position="bottom"
                        />
                      </div>
                    </label>
                    <select 
                      value={termLength}
                      onChange={(e) => setTermLength(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      aria-labelledby="term-label"
                      aria-describedby="term-description"
                      role="combobox"
                      aria-expanded="false"
                    >
                      <option value="All Terms" aria-label="Show rates for all term lengths">All Terms</option>
                      <option value="1 Year" aria-label="Show 1 year term rates">1 Year</option>
                      <option value="2 Years" aria-label="Show 2 year term rates">2 Years</option>
                      <option value="3 Years" aria-label="Show 3 year term rates">3 Years</option>
                      <option value="4 Years" aria-label="Show 4 year term rates">4 Years</option>
                      <option value="5 Years" aria-label="Show 5 year term rates">5 Years</option>
                      <option value="7 Years" aria-label="Show 7 year term rates">7 Years</option>
                      <option value="10 Years" aria-label="Show 10 year term rates">10 Years</option>
                    </select>
                    <div id="term-description" className="sr-only">
                      Select the length of time you want to lock in your mortgage rate.
                    </div>
                  </div>

                  {/* Lender Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2" id="lender-label">
                      <div className="flex items-center space-x-1">
                        <span>Lender Type</span>
                        <InfoTooltip 
                          term={getTermDefinition('lenderType').term}
                          description={getTermDefinition('lenderType').description}
                          size="xs"
                          position="bottom"
                        />
                      </div>
                    </label>
                    <select 
                      value={lenderType}
                      onChange={(e) => setLenderType(e.target.value)}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      aria-labelledby="lender-label"
                      aria-describedby="lender-description"
                      role="combobox"
                      aria-expanded="false"
                    >
                      <option value="All Lenders" aria-label="Show rates from all types of lenders">All Lenders</option>
                      <option value="Major Banks" aria-label="Show rates from major banks only">Major Banks</option>
                      <option value="Credit Unions" aria-label="Show rates from credit unions only">Credit Unions</option>
                      <option value="Monoline Lenders" aria-label="Show rates from monoline lenders only">Monoline Lenders</option>
                      <option value="Alternative Lenders" aria-label="Show rates from alternative lenders only">Alternative Lenders</option>
                    </select>
                    <div id="lender-description" className="sr-only">
                      Choose the type of financial institution you prefer for your mortgage.
                    </div>
                  </div>

                  {/* Reset Filters Button */}
                  <button 
                    onClick={resetFilters}
                    disabled={!hasActiveFilters}
                    className={`w-full py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium flex items-center justify-center space-x-2 ${
                      hasActiveFilters 
                        ? 'bg-[#1B5E20] text-white hover:bg-[#2E7D32]' 
                        : 'bg-[#E0E0E0] text-[#757575] cursor-not-allowed'
                    }`}
                    aria-label={hasActiveFilters ? "Reset all filters to show all rates" : "No filters are currently active"}
                    aria-describedby="reset-description"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>{hasActiveFilters ? 'Reset Filters' : 'No Filters Active'}</span>
                  </button>
                  <div id="reset-description" className="sr-only">
                    Click to clear all applied filters and show all available mortgage rates.
                  </div>
                </div>
              </div>

              {/* Rate Alerts Section - Desktop Only */}
              <div className="hidden lg:block bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Rate Alerts
                </h2>
                
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                  Get notified when rates drop below your target.
                </p>
                
                <div className="space-y-4 sm:space-y-6">
                  {/* Target Rate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Rate (%)
                    </label>
                    <input 
                      type="number" 
                      step="0.01"
                      defaultValue="2.50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
                    />
                  </div>

                  {/* Set Alert Button */}
                  <button className="w-full bg-[#FF6F00] text-white py-2 px-4 rounded-md hover:bg-[#E65100] transition-colors duration-200 text-sm font-medium">
                    Set Alert
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Current Rates */}
            <div className="lg:col-span-3">
              {/* Best Rate Summary with Read-Aloud */}
              {filteredRates && filteredRates.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6" role="region" aria-labelledby="best-rate-heading">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1B5E20] mb-2" id="best-rate-heading">
                        Best Rate Available
                      </h3>
                      {(() => {
                        const bestRate = getBestRate();
                        if (!bestRate) return null;
                        
                        return (
                          <div className="space-y-1" role="group" aria-labelledby="best-rate-details">
                            <p className="text-2xl sm:text-3xl font-bold text-[#1B5E20]" id="best-rate-details" aria-label={`Best rate: ${bestRate.rate} percent`}>
                              {bestRate.rate}%
                            </p>
                            <p className="text-sm sm:text-base text-gray-600" aria-label={`Lender: ${bestRate.lender.name}, Type: ${bestRate.type}, Term: ${bestRate.term}`}>
                              {bestRate.lender.name} • {bestRate.type} • {bestRate.term}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500" aria-label={`Annual Percentage Rate: ${bestRate.apr} percent, Purpose: ${bestRate.purpose}`}>
                              APR: {bestRate.apr}% • {bestRate.purpose}
                            </p>
                          </div>
                        );
                      })()}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <VoiceReader
                        text={generateReadAloudText()}
                        buttonText="🔊 Read best rate aloud"
                        className="w-full sm:w-auto"
                        rate={0.85}
                        onStart={() => console.log('Started reading best rate')}
                        onEnd={() => console.log('Finished reading best rate')}
                        onError={(error) => console.error('Voice reading error:', error)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Rates Table */}
              {filteredRates && filteredRates.length > 0 && (
                <RatesTable data={filteredRates} />
              )}

              {/* No Results */}
              {filteredRates && filteredRates.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No rates found</h3>
                    <p className="text-gray-600">Try adjusting your filters to see more results.</p>
                  </div>
                </div>
              )}
              
              {/* Disclaimer */}
              <aside className="mt-6 p-4 bg-[#FFF3E0] border border-[#FF6F00] rounded-lg">
                <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
                  Disclaimer: The mortgage rates listed above are for informational purposes only. Actual rates may vary and are subject to change without notice.
                </p>
              </aside>
              
              {/* Rate Alerts Section - Mobile/Tablet Only */}
              <div className="lg:hidden mt-6">
                <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Rate Alerts
                  </h2>
                  
                  <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                    Get notified when rates drop below your target.
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6">
                    {/* Target Rate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Rate (%)
                      </label>
                      <input 
                        type="number" 
                        step="0.01"
                        defaultValue="2.50"
                        className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      />
                    </div>

                    {/* Set Alert Button */}
                    <button className="w-full bg-[#FF6F00] text-white py-2 px-4 rounded-md hover:bg-[#E65100] transition-colors duration-200 text-sm font-medium">
                      Set Alert
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Market Analysis */}
              <div className="mt-8">
                <MarketAnalysis />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Rates; 