import React, { useState, useEffect, Suspense } from 'react';
// import { useNavigate } from 'react-router-dom';

function FirstTimeHomeBuyer() {
  // const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({});
  const [lastRefreshed, setLastRefreshed] = useState('');

  // SEO Setup
  useEffect(() => {
    document.title = 'First-Time Home Buyer Programs & Benefits | MortgageLink Canada';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover comprehensive first-time home buyer programs, federal benefits, provincial perks, and cash-back offers. Get expert guidance on maximizing your savings.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Discover comprehensive first-time home buyer programs, federal benefits, provincial perks, and cash-back offers. Get expert guidance on maximizing your savings.';
      document.head.appendChild(metaDescription);
    }

    // Set last refreshed date
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
    setLastRefreshed(formatter.format(now));

    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
    };
  }, []);

  // Load Calendly widget script
  useEffect(() => {
    if (!window.Calendly) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        console.log('Calendly widget loaded successfully');
      };
      script.onerror = (error) => {
        console.error('Failed to load Calendly widget:', error);
      };
      document.head.appendChild(script);
    }
  }, []);

  // Sortable table data
  const federalBenefits = [
    { program: 'First-Time Home Buyer Incentive', maxAmount: '$25,000', downPayment: '5%', income: '$120,000', property: '$565,000', notes: 'Shared equity program' },
    { program: 'Home Buyers\' Plan (HBP)', maxAmount: '$35,000', downPayment: 'N/A', income: 'N/A', property: 'N/A', notes: 'RRSP withdrawal' },
    { program: 'GST/HST New Housing Rebate', maxAmount: '$6,300', downPayment: 'N/A', income: 'N/A', property: '$450,000', notes: 'New construction only' },
    { program: 'First-Time Home Buyer Tax Credit', maxAmount: '$750', downPayment: 'N/A', income: 'N/A', property: 'N/A', notes: 'Non-refundable tax credit' }
  ];

  const provincialPerks = [
    { province: 'Ontario', program: 'Land Transfer Tax Rebate', maxAmount: '$4,000', conditions: 'First-time buyers', notes: 'Up to $4,000 rebate' },
    { province: 'British Columbia', program: 'Property Transfer Tax Exemption', maxAmount: '$8,000', conditions: 'First-time buyers', notes: 'Up to $500,000 property value' },
    { province: 'Alberta', program: 'No Provincial Land Transfer Tax', maxAmount: 'N/A', conditions: 'All buyers', notes: 'No provincial tax' },
    { province: 'Quebec', program: 'Welcome Tax Deferral', maxAmount: 'N/A', conditions: 'First-time buyers', notes: 'Deferral available' },
    { province: 'Manitoba', program: 'Land Transfer Tax Rebate', maxAmount: '$1,725', conditions: 'First-time buyers', notes: 'Up to $200,000 property value' }
  ];

  const municipalExtras = [
    { city: 'Toronto', program: 'Toronto Homeownership Program', maxAmount: '$50,000', conditions: 'Income-based', notes: 'Down payment assistance' },
    { city: 'Vancouver', program: 'Vancouver Affordable Housing Program', maxAmount: '$37,500', conditions: 'Income-based', notes: 'Down payment assistance' },
    { city: 'Calgary', program: 'Attainable Homes Calgary', maxAmount: '$25,000', conditions: 'Income-based', notes: 'Down payment assistance' },
    { city: 'Edmonton', program: 'Edmonton Homeownership Program', maxAmount: '$25,000', conditions: 'Income-based', notes: 'Down payment assistance' },
    { city: 'Montreal', program: 'Montreal Homeownership Program', maxAmount: '$25,000', conditions: 'Income-based', notes: 'Down payment assistance' }
  ];

  const cashBackOffers = [
    { lender: 'RBC', program: 'RBC First-Time Home Buyer Program', maxAmount: '$1,000', conditions: 'First-time buyers', notes: 'Cash back on closing costs' },
    { lender: 'TD Bank', program: 'TD First-Time Home Buyer Program', maxAmount: '$1,500', conditions: 'First-time buyers', notes: 'Cash back on closing costs' },
    { lender: 'BMO', program: 'BMO First-Time Home Buyer Program', maxAmount: '$1,000', conditions: 'First-time buyers', notes: 'Cash back on closing costs' },
    { lender: 'Scotiabank', program: 'Scotiabank First-Time Home Buyer Program', maxAmount: '$1,000', conditions: 'First-time buyers', notes: 'Cash back on closing costs' },
    { lender: 'CIBC', program: 'CIBC First-Time Home Buyer Program', maxAmount: '$1,000', conditions: 'First-time buyers', notes: 'Cash back on closing costs' }
  ];

  // Sorting function
  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      let aVal = a[key];
      let bVal = b[key];

      // Handle numeric values with currency symbols
      if (typeof aVal === 'string' && aVal.includes('$')) {
        aVal = parseFloat(aVal.replace(/[$,]/g, '')) || 0;
        bVal = parseFloat(bVal.replace(/[$,]/g, '')) || 0;
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Handle sort click
  const handleSort = (tableKey, columnKey) => {
    setSortConfig(prev => ({
      ...prev,
      [tableKey]: {
        key: columnKey,
        direction: prev[tableKey]?.key === columnKey && prev[tableKey]?.direction === 'asc' ? 'desc' : 'asc'
      }
    }));
  };

  // Get sorted data
  const getSortedData = (data, tableKey) => {
    const config = sortConfig[tableKey];
    if (!config) return data;
    return sortData(data, config.key, config.direction);
  };

  // Open Calendly scheduler
  const openScheduler = () => {
    try {
      if (!window.Calendly) {
        console.error('Calendly widget not loaded');
        const calendlyUrl = 'https://calendly.com/janvical15/mortgage-consultation';
        window.open(calendlyUrl, '_blank');
        return;
      }

      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/janvical15/mortgage-consultation',
        prefill: {
          name: 'First-Time Home Buyer Inquiry',
          email: '',
          firstName: '',
          lastName: ''
        },
        utm: {
          utmCampaign: 'first-time-home-buyer',
          utmSource: 'website',
          utmMedium: 'page'
        }
      });

      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'calendly_opened', {
          event_category: 'conversion',
          event_label: 'first_time_home_buyer_consultation',
          value: 1.0,
          currency: 'CAD'
        });
      }
    } catch (error) {
      console.error('Error opening Calendly scheduler:', error);
      const calendlyUrl = 'https://calendly.com/janvical15/mortgage-consultation';
      window.open(calendlyUrl, '_blank');
    }
  };

  // Sortable table component
  const SortableTable = ({ data, tableKey, columns, title }) => {
    const sortedData = getSortedData(data, tableKey);

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-[#1B5E20] text-white">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort(tableKey, column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {sortConfig[tableKey]?.key === column.key && (
                        <span className="text-[#1B5E20]">
                          {sortConfig[tableKey]?.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((column) => (
                    <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // --- HERO SECTION: How You’ll Save ---
  // Calculate total potential savings (sum of highlighted items)
  const potentialSavings = 25000 + 4000 + 750 + 1000; // $25,000 + $4,000 + $750 + $1,000
  const formattedSavings = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(potentialSavings);

  const AffordabilityCalculator = React.lazy(() => import('../components/AffordabilityCalculator.jsx'));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky CTA */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={openScheduler}
          className="bg-[#1B5E20] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#2E7D32] transition-all duration-300 transform hover:scale-105"
        >
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold">Book Free 15-Min Call</span>
          </div>
        </button>
      </div>

      {/* HERO: How You’ll Save */}
      <section className="bg-[#E8F5E9] border-b border-[#C8E6C9] py-10" aria-label="How You’ll Save">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1B5E20] mb-4" id="how-you-save">How You’ll Save as a First-Time Home Buyer</h1>
            <p className="text-lg text-[#2E7D32] mb-4 max-w-2xl">
              Stack federal, provincial, and municipal programs to maximize your savings on your first home. We’ll help you combine incentives, rebates, and cash-back offers—often totaling <span className="font-semibold">over $30,000</span>—so you keep more money in your pocket.
            </p>
            <p className="text-base text-gray-700 mb-6 max-w-2xl">
              Book a free 15-minute call to see exactly which programs you qualify for and how much you could save.
            </p>
            <button
              onClick={openScheduler}
              className="inline-flex items-center px-6 py-3 bg-[#1B5E20] text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1B5E20] transition-all"
              aria-label="Book Free 15-Minute Call to maximize your home buyer savings"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Free 15-Minute Call
            </button>
          </div>
          <div className="flex-shrink-0 w-full md:w-80">
            <div className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-xl shadow-2xl p-6 border-2 border-[#4CAF50] text-center transform hover:scale-105 transition-all duration-300" role="region" aria-label="Potential Savings Card">
              <div className="text-sm text-[#C8E6C9] mb-2 font-medium">Potential Savings*</div>
              <div className="text-5xl font-bold text-white mb-4 drop-shadow-lg" aria-live="polite">{formattedSavings}</div>
              <ul className="text-left text-sm text-white space-y-2 mb-4">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                  <span>Federal Incentive: <span className="font-bold text-[#4CAF50]">$25,000</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                  <span>ON Land Transfer Rebate: <span className="font-bold text-[#4CAF50]">$4,000</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                  <span>Tax Credit: <span className="font-bold text-[#4CAF50]">$750</span></span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#4CAF50] rounded-full"></div>
                  <span>Bank Cash-Back: <span className="font-bold text-[#4CAF50]">$1,000</span></span>
                </li>
              </ul>
              <div className="text-xs text-[#C8E6C9] mt-3 font-medium">*Typical max for eligible buyers. Actual savings may vary.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Affordability Calculator */}
      <section id="affordability-calculator" className="py-10 bg-white border-b border-[#C8E6C9]" aria-label="Affordability Calculator">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1B5E20] mb-4">Affordability Calculator</h2>
          <p className="text-base text-gray-700 mb-6">Find out how much home you can afford in minutes. Adjust the numbers to see your options.</p>
          <Suspense fallback={<div className="bg-gray-100 rounded-lg p-8 text-center text-[#1B5E20] font-semibold animate-pulse">Loading calculator…</div>}>
            <AffordabilityCalculator />
          </Suspense>
        </div>
      </section>

     

      {/* Main Content with Sidebar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-20 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Quick Navigation</h3>
              <nav className="space-y-2">
                <a 
                  href="#how-you-save" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  How You’ll Save
                </a>
                <a 
                  href="#affordability-calculator" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Affordability Calculator
                </a>
                <a 
                  href="#federal-benefits" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Federal Benefits
                </a>
                <a 
                  href="#provincial-perks" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Provincial Perks
                </a>
                <a 
                  href="#municipal-extras" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Municipal Extras
                </a>
                <a 
                  href="#cash-back-offers" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Cash-Back Offers
                </a>
                <a 
                  href="#savings-example" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Savings Example
                </a>
                <a 
                  href="#next-steps" 
                  className="block px-4 py-3 text-[#1B5E20] hover:text-[#2E7D32] hover:bg-[#F1F8E9] rounded-lg font-medium transition-colors"
                >
                  Next Steps
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-12">
            {/* Federal Benefits (MOVED UP) */}
            <section id="federal-benefits" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Federal Benefits</h2>
                <p className="text-lg text-gray-600">
                  The Canadian government offers several programs to help first-time home buyers achieve their dream of homeownership.
                </p>
              </div>
              <SortableTable
                data={federalBenefits}
                tableKey="federal"
                columns={[
                  { key: 'program', label: 'Program' },
                  { key: 'maxAmount', label: 'Max Amount' },
                  { key: 'downPayment', label: 'Min Down Payment' },
                  { key: 'income', label: 'Income Limit' },
                  { key: 'property', label: 'Property Limit' },
                  { key: 'notes', label: 'Notes' }
                ]}
                title="Federal First-Time Home Buyer Programs"
              />
            </section>
            {/* Provincial Perks */}
            <section id="provincial-perks" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Provincial Perks</h2>
                <p className="text-lg text-gray-600">
                  Each province offers unique benefits and tax incentives for first-time home buyers.
                </p>
              </div>
              <SortableTable
                data={provincialPerks}
                tableKey="provincial"
                columns={[
                  { key: 'province', label: 'Province' },
                  { key: 'program', label: 'Program' },
                  { key: 'maxAmount', label: 'Max Amount' },
                  { key: 'conditions', label: 'Conditions' },
                  { key: 'notes', label: 'Notes' }
                ]}
                title="Provincial First-Time Home Buyer Programs"
              />
            </section>
            {/* Municipal Extras */}
            <section id="municipal-extras" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Municipal Extras</h2>
                <p className="text-lg text-gray-600">
                  Many cities offer additional programs and incentives for first-time home buyers.
                </p>
              </div>
              <SortableTable
                data={municipalExtras}
                tableKey="municipal"
                columns={[
                  { key: 'city', label: 'City' },
                  { key: 'program', label: 'Program' },
                  { key: 'maxAmount', label: 'Max Amount' },
                  { key: 'conditions', label: 'Conditions' },
                  { key: 'notes', label: 'Notes' }
                ]}
                title="Municipal First-Time Home Buyer Programs"
              />
            </section>
            {/* Cash-Back Offers */}
            <section id="cash-back-offers" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Cash-Back Offers</h2>
                <p className="text-lg text-gray-600">
                  Major Canadian banks offer cash-back programs specifically for first-time home buyers.
                </p>
              </div>
              <SortableTable
                data={cashBackOffers}
                tableKey="cashback"
                columns={[
                  { key: 'lender', label: 'Lender' },
                  { key: 'program', label: 'Program' },
                  { key: 'maxAmount', label: 'Max Amount' },
                  { key: 'conditions', label: 'Conditions' },
                  { key: 'notes', label: 'Notes' }
                ]}
                title="Bank Cash-Back Programs"
              />
            </section>
            {/* Savings Example */}
            <section id="savings-example" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Savings Example</h2>
                <p className="text-lg text-gray-600">
                  Here's how much you could save as a first-time home buyer in Ontario purchasing a $500,000 home.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-[#1B5E20] mb-4">Available Benefits</h4>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>First-Time Home Buyer Incentive: <strong>$25,000</strong></span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Land Transfer Tax Rebate: <strong>$4,000</strong></span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>First-Time Home Buyer Tax Credit: <strong>$750</strong></span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Bank Cash-Back Program: <strong>$1,000</strong></span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-[#1B5E20] mb-4">Total Potential Savings</h4>
                    <div className="bg-[#E8F5E8] rounded-lg p-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-[#1B5E20] mb-2">$30,750</div>
                        <p className="text-lg text-[#2E7D32]">Total Potential Savings</p>
                        <p className="text-sm text-gray-600 mt-2">This represents approximately 6.15% of your home purchase price</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Next Steps */}
            <section id="next-steps" className="scroll-mt-20">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">Next Steps</h2>
                <p className="text-lg text-gray-600">
                  Ready to take advantage of these first-time home buyer programs? Here's what you need to do.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h4 className="text-xl font-semibold text-[#1B5E20] mb-3">Assess Your Eligibility</h4>
                  <p className="text-gray-600">
                    Review the criteria for each program to determine which benefits you qualify for based on your income, location, and property type.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h4 className="text-xl font-semibold text-[#1B5E20] mb-3">Get Pre-Approved</h4>
                  <p className="text-gray-600">
                    Work with a licensed mortgage broker to get pre-approved and understand your maximum purchase power and down payment requirements.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h4 className="text-xl font-semibold text-[#1B5E20] mb-3">Apply for Programs</h4>
                  <p className="text-gray-600">
                    Submit applications for the programs you qualify for, ensuring you meet all deadlines and provide required documentation.
                  </p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <button
                  onClick={openScheduler}
                  className="bg-[#1B5E20] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#2E7D32] transition-colors"
                >
                  Book Your Free Consultation
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              <strong>Disclosure:</strong> Program details and eligibility criteria are subject to change. 
              This information was last refreshed on {lastRefreshed}. 
              Please consult with a licensed mortgage professional for current program details and personalized advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstTimeHomeBuyer; 