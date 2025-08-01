import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homeServiceIcon from '../assets/Home_Service.png';
import refiniServiceIcon from '../assets/Refinancing_Service.png';
import equityServiceIcon from '../assets/Equity_Service.png';
import documentIcon from '../assets/Document.png';
import financialRecordsIcon from '../assets/Financial_Records.png';
import propertyDocumentsIcon from '../assets/Property_Documents.png';
import sarahChenImage from '../assets/Sarah Chen.png';
import rajeshPatelImage from '../assets/Rajesh Patel.png';

function Services() {
  const navigate = useNavigate();

  // Calculator state
  const [calculatorData, setCalculatorData] = useState({
    loanType: 'Home Purchase',
    province: 'Ontario',
    homePrice: '',
    downPayment: '',
    interestRate: '',
    amortization: '',
    paymentFrequency: 'Monthly'
  });

  const [monthlyPayment, setMonthlyPayment] = useState('$0');
  const [loanAmount, setLoanAmount] = useState('$0');
  const [showResult, setShowResult] = useState(false);

  // Calculate mortgage payment
  const calculatePayment = () => {
    const homePrice = parseFloat(calculatorData.homePrice.replace(/,/g, '')) || 0;
    const downPayment = parseFloat(calculatorData.downPayment.replace(/,/g, '')) || 0;
    const interestRate = parseFloat(calculatorData.interestRate) || 0;
    const amortization = parseFloat(calculatorData.amortization) || 0;

    if (homePrice <= 0 || interestRate <= 0 || amortization <= 0) {
      setMonthlyPayment('$0');
      setLoanAmount('$0');
      setShowResult(false);
      return;
    }

    const calculatedLoanAmount = homePrice - downPayment;
    if (calculatedLoanAmount <= 0) {
      setMonthlyPayment('$0');
      setLoanAmount('$0');
      setShowResult(false);
      return;
    }

    // Convert annual interest rate to monthly rate
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = amortization * 12;

    // Calculate monthly payment using the formula: P = L[c(1 + c)^n]/[(1 + c)^n – 1]
    const monthlyPaymentAmount = calculatedLoanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // Format the results
    const formattedPayment = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(monthlyPaymentAmount);

    const formattedLoanAmount = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(calculatedLoanAmount);

    setMonthlyPayment(formattedPayment);
    setLoanAmount(formattedLoanAmount);
    setShowResult(true);
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Format currency inputs
  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '') return '';
    return new Intl.NumberFormat('en-CA').format(parseInt(numericValue));
  };

  useEffect(() => {
    // Set page title
    document.title = 'Mortgage Services | Home Loans, Refinancing & HELOC | MortgageLink Canada';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive mortgage services in Canada. Get competitive rates on home purchase loans, refinancing, and home equity solutions. Licensed FSRA mortgage broker with multilingual support.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Comprehensive mortgage services in Canada. Get competitive rates on home purchase loans, refinancing, and home equity solutions. Licensed FSRA mortgage broker with multilingual support.';
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mortgage services, home loans, refinancing, HELOC, home equity, first time buyer, mortgage rates, FSRA licensed, Canadian mortgage broker, home purchase loans');
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = 'mortgage services, home loans, refinancing, HELOC, home equity, first time buyer, mortgage rates, FSRA licensed, Canadian mortgage broker, home purchase loans';
      document.head.appendChild(newMetaKeywords);
    }

    // Set Open Graph meta tags for social sharing
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Professional Mortgage Services | MortgageLink Canada');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.content = 'Professional Mortgage Services | MortgageLink Canada';
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Expert mortgage services with competitive rates. Home purchase, refinancing, and HELOC solutions. FSRA licensed with multilingual support across Canada.');
    } else {
      const newOgDescription = document.createElement('meta');
      newOgDescription.setAttribute('property', 'og:description');
      newOgDescription.content = 'Expert mortgage services with competitive rates. Home purchase, refinancing, and HELOC solutions. FSRA licensed with multilingual support across Canada.';
      document.head.appendChild(newOgDescription);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const newOgType = document.createElement('meta');
      newOgType.setAttribute('property', 'og:type');
      newOgType.content = 'website';
      document.head.appendChild(newOgType);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.content = window.location.href;
      document.head.appendChild(newOgUrl);
    }

    // Set Twitter Card meta tags
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) {
      twitterCard.setAttribute('content', 'summary_large_image');
    } else {
      const newTwitterCard = document.createElement('meta');
      newTwitterCard.name = 'twitter:card';
      newTwitterCard.content = 'summary_large_image';
      document.head.appendChild(newTwitterCard);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Professional Mortgage Services | MortgageLink Canada');
    } else {
      const newTwitterTitle = document.createElement('meta');
      newTwitterTitle.name = 'twitter:title';
      newTwitterTitle.content = 'Professional Mortgage Services | MortgageLink Canada';
      document.head.appendChild(newTwitterTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Expert mortgage services with competitive rates. Home purchase, refinancing, and HELOC solutions. FSRA licensed with multilingual support.');
    } else {
      const newTwitterDescription = document.createElement('meta');
      newTwitterDescription.name = 'twitter:description';
      newTwitterDescription.content = 'Expert mortgage services with competitive rates. Home purchase, refinancing, and HELOC solutions. FSRA licensed with multilingual support.';
      document.head.appendChild(newTwitterDescription);
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

    // Set robots meta tag
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    } else {
      const newRobotsMeta = document.createElement('meta');
      newRobotsMeta.name = 'robots';
      newRobotsMeta.content = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
      document.head.appendChild(newRobotsMeta);
    }

    // Add structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "MortgageLink Canada",
      "description": "Professional mortgage brokerage services offering home loans, refinancing, and HELOC solutions across Canada",
      "url": window.location.origin,
      "serviceType": "Mortgage Brokerage",
      "areaServed": {
        "@type": "Country",
        "name": "Canada"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mortgage Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Home Purchase Loans",
              "description": "First-time buyer and move-up purchase mortgages with competitive rates"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct", 
              "name": "Refinancing Services",
              "description": "Lower rates and debt consolidation through mortgage refinancing"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "FinancialProduct",
              "name": "Home Equity Solutions",
              "description": "HELOC and second mortgage options to access home equity"
            }
          }
        ]
      }
    };

    // Add structured data script
    const existingStructuredData = document.querySelector('#services-structured-data');
    if (existingStructuredData) {
      existingStructuredData.textContent = JSON.stringify(structuredData);
    } else {
      const structuredDataScript = document.createElement('script');
      structuredDataScript.id = 'services-structured-data';
      structuredDataScript.type = 'application/ld+json';
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Cleanup function to remove meta tags when component unmounts
    return () => {
      const structuredDataScript = document.querySelector('#services-structured-data');
      if (structuredDataScript) {
        document.head.removeChild(structuredDataScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 leading-tight">
            Comprehensive Mortgage Solutions
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            From first-time homebuyer programs to refinancing and home equity loans, we offer a full range of mortgage solutions tailored to your unique financial situation.
          </p>
          
          {/* Province Dropdown */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="max-w-xs w-full relative">
              <select className="w-full px-4 sm:px-6 py-2 sm:py-3 pr-10 sm:pr-12 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-gray-700 bg-white appearance-none cursor-pointer text-sm sm:text-base">
                <option value="">Select Province</option>
                <option value="AB">Alberta</option>
                <option value="BC">British Columbia</option>
                <option value="MB">Manitoba</option>
                <option value="NB">New Brunswick</option>
                <option value="NL">Newfoundland and Labrador</option>
                <option value="NS">Nova Scotia</option>
                <option value="ON">Ontario</option>
                <option value="PE">Prince Edward Island</option>
                <option value="QC">Quebec</option>
                <option value="SK">Saskatchewan</option>
                <option value="NT">Northwest Territories</option>
                <option value="NU">Nunavut</option>
                <option value="YT">Yukon</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 sm:pr-4 pointer-events-none">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Home Purchase */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 flex flex-col h-full">
              <div className="flex items-start mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mr-3 flex-shrink-0">
                  <img src={homeServiceIcon} alt="Home Purchase" className="w-full h-full" loading="lazy" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-1" style={{color: '#212121'}}>Home Purchase Loans</h3>
                  <p className="text-xs sm:text-sm lg:text-base mt-2" style={{color: '#757575'}}>
                    First-time buyers & move-up purchases
                  </p>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="rounded-lg p-3 sm:p-4 mb-4" style={{backgroundColor: '#E8F5E8'}}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Interest Rate Range</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#1B5E20'}}>2.89% - 4.25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Down Payment</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#212121'}}>As low as 5%</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 sm:mb-6 flex-grow">
                  <h4 className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#212121'}}>Key Features:</h4>
                  <ul className="text-xs sm:text-sm lg:text-base space-y-2" style={{color: '#757575'}}>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Pre-approval up to 120 days
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      First-time buyer programs
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Flexible income verification
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3 mt-auto">
                <button 
                  className="w-full text-white py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-xs sm:text-sm lg:text-base transition-colors duration-200" 
                  style={{backgroundColor: '#388E3C'}} 
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2E7D32';
                  }} 
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#388E3C';
                  }}
                  onClick={() => navigate('/services/home-purchase')}
                >
                  Learn More
                </button>
                <button 
                  onClick={() => navigate('/pre-qualify')}
                  className="w-full text-white py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-xs sm:text-sm lg:text-base transition-colors duration-200" 
                  style={{backgroundColor: '#4CAF50'}} 
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#388E3C';
                  }} 
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#4CAF50';
                  }}
                >
                  Start Application
                </button>
              </div>
            </div>

            {/* Refinancing Options */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 flex flex-col h-full">
              <div className="flex items-start mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mr-3 flex-shrink-0">
                  <img src={refiniServiceIcon} alt="Refinancing Options" className="w-full h-full" loading="lazy" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-1" style={{color: '#212121'}}>Refinancing Options</h3>
                  <p className="text-xs sm:text-sm lg:text-base mt-2" style={{color: '#757575'}}>
                    Lower rates & access equity
                  </p>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="rounded-lg p-3 sm:p-4 mb-4" style={{backgroundColor: '#E8F5E8'}}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Interest Rate Range</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#1B5E20'}}>2.79% - 3.95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Max Loan-to-Value</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#212121'}}>Up to 80%</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 sm:mb-6 flex-grow">
                  <h4 className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#212121'}}>Key Benefits:</h4>
                  <ul className="text-xs sm:text-sm lg:text-base space-y-2" style={{color: '#757575'}}>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Lower monthly payments
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Debt consolidation options
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Cash-out refinancing
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3 mt-auto">
                <button 
                  className="w-full text-white py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-xs sm:text-sm lg:text-base transition-colors duration-200" 
                  style={{backgroundColor: '#388E3C'}} 
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#2E7D32';
                  }} 
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#388E3C';
                  }}
                  onClick={() => navigate('/services/refinancing')}
                >
                  Learn More
                </button>
                <button 
                  onClick={() => navigate('/pre-qualify')}
                  className="w-full text-white py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-xs sm:text-sm lg:text-base transition-colors duration-200" 
                  style={{backgroundColor: '#4CAF50'}} 
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#388E3C';
                  }} 
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#4CAF50';
                  }}
                >
                  Check Eligibility
                </button>
              </div>
            </div>

            {/* Home Equity Solutions */}
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-200 flex flex-col h-full md:col-span-2 xl:col-span-1">
              <div className="flex items-start mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mr-3 flex-shrink-0">
                  <img src={equityServiceIcon} alt="Home Equity Solutions" className="w-full h-full" loading="lazy" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-1" style={{color: '#212121'}}>Home Equity Solutions</h3>
                  <p className="text-xs sm:text-sm lg:text-base mt-2" style={{color: '#757575'}}>
                    HELOC & second mortgages
                  </p>
                </div>
              </div>
              
              <div className="flex-grow flex flex-col">
                <div className="rounded-lg p-3 sm:p-4 mb-4" style={{backgroundColor: '#E8F5E8'}}>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>HELOC Rate</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#FF8F00'}}>Prime + 0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Credit Limit</span>
                    <span className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#212121'}}>Up to 65% of home value</span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4 sm:mb-6 flex-grow">
                  <h4 className="font-semibold text-xs sm:text-sm lg:text-base" style={{color: '#212121'}}>Access Options:</h4>
                  <ul className="text-xs sm:text-sm lg:text-base space-y-2" style={{color: '#757575'}}>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Home Equity Line of Credit
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Second mortgage loans
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-2 sm:mr-3 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Reverse mortgage options
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3 mt-auto">
                <button 
                  className="w-full text-white py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-xs sm:text-sm lg:text-base transition-colors duration-200" 
                  style={{backgroundColor: '#FF8F00'}} 
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#E65100';
                  }} 
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#FF8F00';
                  }}
                  onClick={() => navigate('/services/home-equity')}
                >
                  Learn More
                </button>
                <button 
                  onClick={() => navigate('/calculator')}
                  className="w-full text-white py-2 sm:py-3 lg:py-4 rounded-lg font-medium text-xs sm:text-sm lg:text-base transition-colors duration-200" 
                  style={{backgroundColor: '#4CAF50'}} 
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#388E3C';
                  }} 
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#4CAF50';
                  }}
                >
                  Calculate Equity
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Our Services */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6">Compare Our Services</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
              Side-by-side comparison to help you choose the right mortgage solution
            </p>
          </div>
          

          
          {/* Mobile Card View */}
          <div className="block lg:hidden space-y-4">
            {/* Home Purchase Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4" style={{color: '#212121'}}>Home Purchase</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Interest Rate Range</span>
                  <span className="font-semibold text-sm" style={{color: '#1B5E20'}}>2.89% - 4.25%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Minimum Down Payment</span>
                  <span className="text-sm" style={{color: '#757575'}}>5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Maximum Loan-to-Value</span>
                  <span className="text-sm" style={{color: '#757575'}}>95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Processing Time</span>
                  <span className="text-sm" style={{color: '#757575'}}>30-45 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Pre-approval Available</span>
                  <svg className="w-4 h-4" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Refinancing Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4" style={{color: '#212121'}}>Refinancing</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Interest Rate Range</span>
                  <span className="font-semibold text-sm" style={{color: '#1B5E20'}}>2.79% - 3.95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Minimum Down Payment</span>
                  <span className="text-sm" style={{color: '#757575'}}>N/A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Maximum Loan-to-Value</span>
                  <span className="text-sm" style={{color: '#757575'}}>80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Processing Time</span>
                  <span className="text-sm" style={{color: '#757575'}}>21-30 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Pre-approval Available</span>
                  <svg className="w-4 h-4" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Home Equity Card */}
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4" style={{color: '#212121'}}>Home Equity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Interest Rate Range</span>
                  <span className="font-semibold text-sm" style={{color: '#FF8F00'}}>Prime + 0.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Minimum Down Payment</span>
                  <span className="text-sm" style={{color: '#757575'}}>N/A</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Maximum Loan-to-Value</span>
                  <span className="text-sm" style={{color: '#757575'}}>65%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Processing Time</span>
                  <span className="text-sm" style={{color: '#757575'}}>14-21 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm" style={{color: '#757575'}}>Pre-approval Available</span>
                  <svg className="w-4 h-4" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead style={{backgroundColor: '#E8F5E8'}}>
                  <tr>
                    <th className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-left text-sm lg:text-base xl:text-lg font-semibold" style={{color: '#212121'}}>Feature</th>
                    <th className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-center text-sm lg:text-base xl:text-lg font-semibold" style={{color: '#212121'}}>Home Purchase</th>
                    <th className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-center text-sm lg:text-base xl:text-lg font-semibold" style={{color: '#212121'}}>Refinancing</th>
                    <th className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-center text-sm lg:text-base xl:text-lg font-semibold" style={{color: '#212121'}}>Home Equity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg font-medium" style={{color: '#212121'}}>Interest Rate Range</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center font-semibold" style={{color: '#1B5E20'}}>2.89% - 4.25%</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center font-semibold" style={{color: '#1B5E20'}}>2.79% - 3.95%</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center font-semibold" style={{color: '#FF8F00'}}>Prime + 0.5%</td>
                  </tr>
                  <tr style={{backgroundColor: '#F8FCF8'}}>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg font-medium" style={{color: '#212121'}}>Minimum Down Payment</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>5%</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>N/A</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>N/A</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg font-medium" style={{color: '#212121'}}>Maximum Loan-to-Value</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>95%</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>80%</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>65%</td>
                  </tr>
                  <tr style={{backgroundColor: '#F8FCF8'}}>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg font-medium" style={{color: '#212121'}}>Typical Processing Time</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>30-45 days</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>21-30 days</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg text-center" style={{color: '#757575'}}>14-21 days</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-sm lg:text-base xl:text-lg font-medium" style={{color: '#212121'}}>Pre-approval Available</td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-center">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mx-auto" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-center">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mx-auto" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                    <td className="px-4 lg:px-6 xl:px-8 py-3 lg:py-4 xl:py-6 text-center">
                      <svg className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 mx-auto" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Rate Disclaimer */}
          <div className="mt-4 sm:mt-6 lg:mt-8 p-3 sm:p-4 lg:p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>
              <span className="font-semibold" style={{color: '#212121'}}>Rate Disclaimer:</span> 
              All rates shown are for illustration purposes and subject to change. Actual rates vary based on creditworthiness, 
              loan-to-value, property type and other factors. Rates do not constitute a guarantee or commitment to lend.
            </p>
          </div>
        </div>
      </section>

      {/* Calculate Your Payments - MAIN FEATURE */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#1B5E20]">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Calculate Your Mortgage Payments
            </h2>
            <p className="text-base sm:text-lg text-[#C8E6C9] max-w-3xl mx-auto">
              Get instant payment estimates for any of our mortgage services
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Loan Type */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Loan Type</label>
                <select 
                  value={calculatorData.loanType}
                  onChange={(e) => handleInputChange('loanType', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option>Home Purchase</option>
                  <option>Refinancing</option>
                  <option>Home Equity</option>
                </select>
              </div>
              
              {/* Province */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Province</label>
                <select 
                  value={calculatorData.province}
                  onChange={(e) => handleInputChange('province', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option>Ontario</option>
                  <option>Alberta</option>
                  <option>British Columbia</option>
                  <option>Manitoba</option>
                  <option>New Brunswick</option>
                  <option>Newfoundland and Labrador</option>
                  <option>Nova Scotia</option>
                  <option>Prince Edward Island</option>
                  <option>Quebec</option>
                  <option>Saskatchewan</option>
                  <option>Northwest Territories</option>
                  <option>Nunavut</option>
                  <option>Yukon</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Home Price / Loan Amount */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Home Price / Loan Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="text" 
                    value={calculatorData.homePrice}
                    onChange={(e) => handleInputChange('homePrice', formatCurrency(e.target.value))}
                    placeholder="500,000"
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm"
                  />
                </div>
              </div>
              
              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Down Payment</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    type="text" 
                    value={calculatorData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', formatCurrency(e.target.value))}
                    placeholder="100,000"
                    className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Interest Rate (%)</label>
                <input 
                  type="text" 
                  value={calculatorData.interestRate}
                  onChange={(e) => handleInputChange('interestRate', e.target.value)}
                  placeholder="2.89"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm"
                />
              </div>
              
              {/* Amortization */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Amortization (Years)</label>
                <input 
                  type="text" 
                  value={calculatorData.amortization}
                  onChange={(e) => handleInputChange('amortization', e.target.value)}
                  placeholder="25"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm"
                />
              </div>
              
              {/* Payment Frequency */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Payment Frequency</label>
                <select 
                  value={calculatorData.paymentFrequency}
                  onChange={(e) => handleInputChange('paymentFrequency', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm appearance-none bg-white"
                >
                  <option>Monthly</option>
                  <option>Bi-weekly</option>
                  <option>Weekly</option>
                </select>
              </div>
            </div>

            {/* Result Display */}
            {showResult && (
              <div className="mb-6 p-6 bg-[#E8F5E8] border border-[#1B5E20] rounded-lg">
                <h3 className="text-lg font-bold text-[#1B5E20] mb-4">Mortgage Calculation Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column - Key Figures */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#1B5E20]/20">
                      <span className="text-sm font-medium text-[#1B5E20]">Monthly Payment:</span>
                      <span className="text-xl font-bold text-[#1B5E20]">{monthlyPayment}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#1B5E20]/20">
                      <span className="text-sm font-medium text-[#1B5E20]">Principal:</span>
                      <span className="text-lg font-semibold text-[#1B5E20]">{loanAmount}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#1B5E20]/20">
                      <span className="text-sm font-medium text-[#1B5E20]">Down Payment:</span>
                      <span className="text-lg font-semibold text-[#1B5E20]">
                        {calculatorData.downPayment ? `$${calculatorData.downPayment}` : '$0'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Right Column - Additional Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#1B5E20]/20">
                      <span className="text-sm font-medium text-[#1B5E20]">Home Price:</span>
                      <span className="text-lg font-semibold text-[#1B5E20]">
                        {calculatorData.homePrice ? `$${calculatorData.homePrice}` : '$0'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#1B5E20]/20">
                      <span className="text-sm font-medium text-[#1B5E20]">Interest Rate:</span>
                      <span className="text-lg font-semibold text-[#1B5E20]">
                        {calculatorData.interestRate ? `${calculatorData.interestRate}%` : '0%'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-[#1B5E20]/20">
                      <span className="text-sm font-medium text-[#1B5E20]">Amortization:</span>
                      <span className="text-lg font-semibold text-[#1B5E20]">
                        {calculatorData.amortization ? `${calculatorData.amortization} years` : '0 years'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-[#1B5E20]/10 rounded-lg">
                  <p className="text-sm text-[#1B5E20] text-center">
                    <span className="font-medium">Note:</span> This is an estimate. Actual rates and payments may vary based on your specific situation and lender terms.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <button 
                onClick={calculatePayment}
                className="w-full sm:w-auto px-8 py-3 bg-[#FF6F00] hover:bg-[#E65100] text-white font-semibold rounded-lg transition-colors duration-200 text-base"
              >
                Calculate Payment
              </button>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2.5 text-[#1B5E20] bg-[#E8F5E8] hover:bg-[#C8E6C9] font-medium rounded-lg transition-colors duration-200 text-sm border border-[#1B5E20]">
                  View Detailed Calculator
                </button>
                <button className="px-6 py-2.5 text-[#1B5E20] bg-white hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200 text-sm border border-[#1B5E20]">
                  Get Pre-Approved
                </button>
              </div>
            </div>
            
            {/* Calculator Disclaimer */}
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-gray-700">Disclaimer:</span> 
                Results are estimates only and do not constitute pre-approval or guarantee of terms. 
                Consult with a mortgage professional for advice based on your specific situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6" style={{color: '#212121'}}>Required Documents</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl" style={{color: '#757575'}}>
              Prepare these documents to streamline your mortgage application process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Income Documents */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mr-3 sm:mr-4">
                  <img src={documentIcon} alt="Income Documents" className="w-full h-full" loading="lazy" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: '#212121'}}>Income Documents</h3>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8 lg:mb-10">
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Recent pay stubs (2-3 months)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>T4 slips (2 years)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Notice of Assessment</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Employment letter</span>
                </li>
              </ul>
              

            </div>

            {/* Financial Records */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mr-3 sm:mr-4">
                  <img src={financialRecordsIcon} alt="Financial Records" className="w-full h-full" loading="lazy" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: '#212121'}}>Financial Records</h3>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8 lg:mb-10">
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Bank statements (3 months)</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Investment statements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>RRSP/TFSA statements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Credit card statements</span>
                </li>
              </ul>
              

            </div>

            {/* Property Documents */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 shadow-lg md:col-span-2 xl:col-span-1">
              <div className="flex items-center mb-4 sm:mb-6 lg:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex items-center justify-center mr-3 sm:mr-4">
                  <img src={propertyDocumentsIcon} alt="Property Documents" className="w-full h-full" loading="lazy" />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{color: '#212121'}}>Property Documents</h3>
              </div>
              
              <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-6 sm:mb-8 lg:mb-10">
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Purchase agreement</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Property tax assessment</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Home insurance quote</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" style={{color: '#FF8F00'}} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Property appraisal</span>
                </li>
              </ul>
              

            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6" style={{color: '#212121'}}>Success Stories</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl" style={{color: '#757575'}}>
              Real results from our diverse client community
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {/* The Chen Family */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full mr-3 sm:mr-4 flex-shrink-0 overflow-hidden">
                    <img src={sarahChenImage} alt="The Chen Family" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold" style={{color: '#212121'}}>The Chen Family</h3>
                    <p className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>First-Time Home Buyers · Toronto, ON</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4" style={{backgroundColor: '#E8F5E8'}}>
                    <h4 className="font-semibold text-xs sm:text-sm lg:text-base mb-2" style={{color: '#212121'}}>Before:</h4>
                    <ul className="text-xs sm:text-sm lg:text-base space-y-1" style={{color: '#757575'}}>
                      <li>• Renting for $2,800/month</li>
                      <li>• Limited credit history as new immigrants</li>
                      <li>• Uncertain about mortgage process</li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4" style={{backgroundColor: '#E8F5E8'}}>
                    <h4 className="font-semibold text-xs sm:text-sm lg:text-base mb-2" style={{color: '#212121'}}>After:</h4>
                    <ul className="text-xs sm:text-sm lg:text-base space-y-1" style={{color: '#757575'}}>
                      <li>• Purchased $650,000 home with 10% down</li>
                      <li>• Monthly payment: $3,450 (saving $350/month)</li>
                      <li>• Secured 2.89% rate through our program</li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="border-l-4 pl-3 sm:pl-4 lg:pl-6 italic text-xs sm:text-sm lg:text-base" style={{borderColor: '#2E7D32', color: '#757575'}}>
                  "The team provided service in Mandarin and guided us through every step. We couldn't be happier with our new home!"
                </blockquote>
              </div>
            </div>

            {/* Rajesh & Priya Patel */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-start mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full mr-3 sm:mr-4 flex-shrink-0 overflow-hidden">
                    <img src={rajeshPatelImage} alt="Rajesh & Priya Patel" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold" style={{color: '#212121'}}>Rajesh & Priya Patel</h3>
                    <p className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>Refinancing · Surrey, BC</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4" style={{backgroundColor: '#E8F5E8'}}>
                    <h4 className="font-semibold text-xs sm:text-sm lg:text-base mb-2" style={{color: '#212121'}}>Before:</h4>
                    <ul className="text-xs sm:text-sm lg:text-base space-y-1" style={{color: '#757575'}}>
                      <li>• Paying 4.2% on existing mortgage</li>
                      <li>• Monthly payment: $2,890</li>
                      <li>• High interest credit card debt</li>
                    </ul>
                  </div>
                  
                  <div className="rounded-lg p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4" style={{backgroundColor: '#E8F5E8'}}>
                    <h4 className="font-semibold text-xs sm:text-sm lg:text-base mb-2" style={{color: '#212121'}}>After:</h4>
                    <ul className="text-xs sm:text-sm lg:text-base space-y-1" style={{color: '#757575'}}>
                      <li>• Refinanced at 2.79% rate</li>
                      <li>• New monthly payment: $2,340</li>
                      <li>• Consolidated debt, saving $750/month</li>
                    </ul>
                  </div>
                </div>
                
                <blockquote className="border-l-4 pl-3 sm:pl-4 lg:pl-6 italic text-xs sm:text-sm lg:text-base" style={{borderColor: '#2E7D32', color: '#757575'}}>
                  "અમારી ગુજરાતી ભાષામાં સેવા મળી અને અમને હજારો ડોલર બચાવ્યા, ખૂબ જ સારો અનુભવ!"
                  <div className="text-xs sm:text-sm lg:text-base mt-1 not-italic" style={{color: '#757575'}}>(We received service in Gujarati and saved thousands of dollars. Excellent service!)</div>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24" style={{backgroundColor: '#E8F5E8'}}>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 lg:mb-6" style={{color: '#212121'}}>Ready to Get Started?</h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl" style={{color: '#757575'}}>
              Connect with our mortgage experts for personalized guidance
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
              {/* First Name */}
              <div>
                <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>First Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your first name"
                  className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm sm:text-base lg:text-lg"
                  style={{color: '#212121'}}
                />
              </div>
              
              {/* Last Name */}
              <div>
                <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>Last Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your last name"
                  className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm sm:text-base lg:text-lg"
                  style={{color: '#212121'}}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
              {/* Email Address */}
              <div>
                <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>Email Address *</label>
                <input 
                  type="email" 
                  placeholder="your.email@example.com"
                  className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm sm:text-base lg:text-lg"
                  style={{color: '#212121'}}
                />
              </div>
              
              {/* Phone Number */}
              <div>
                <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="(555) 123-4567"
                  className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm sm:text-base lg:text-lg"
                  style={{color: '#212121'}}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
              {/* Service Interest */}
              <div>
                <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>Service Interest *</label>
                <select className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 appearance-none text-sm sm:text-base lg:text-lg" style={{backgroundColor: '#F5F5F5', color: '#212121'}}>
                  <option>Select a service</option>
                  <option>Home Purchase</option>
                  <option>Refinancing</option>
                  <option>Home Equity</option>
                </select>
              </div>
              
              {/* Preferred Language */}
              <div>
                <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>Preferred Language</label>
                <select className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 appearance-none text-sm sm:text-base lg:text-lg" style={{backgroundColor: '#F5F5F5', color: '#212121'}}>
                  <option>English</option>
                  <option>French</option>
                  <option>Mandarin</option>
                  <option>Gujarati</option>
                  <option>Hindi</option>
                  <option>Punjabi</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <label className="block text-xs sm:text-sm lg:text-base font-medium mb-2" style={{color: '#757575'}}>Message</label>
              <textarea 
                rows={4}
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 resize-none text-sm sm:text-base lg:text-lg"
                placeholder="Tell us about your mortgage needs or any questions you have..."
                style={{color: '#212121'}}
              ></textarea>
            </div>

            {/* Consent Checkbox */}
            <div className="mb-4 sm:mb-6 lg:mb-8">
              <label className="flex items-start">
                <input 
                  type="checkbox" 
                  className="mt-1 mr-2 sm:mr-3 lg:mr-4 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>
                  I consent to being contacted by MortgageLink Canada regarding my mortgage inquiry *
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-white transition-colors duration-200 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg" style={{backgroundColor: '#2E7D32'}} onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1B5E20';
            }} onMouseOut={(e) => {
              e.target.style.backgroundColor = '#2E7D32';
            }}>
              Request Consultation
            </button>

            {/* Contact Info */}
            <div className="text-center">
              <p className="text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 lg:mb-4" style={{color: '#757575'}}>Or contact us directly</p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm lg:text-base">
                <div className="flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2 lg:mr-3" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span style={{color: '#2E7D32'}}>1-800-MORTGAGE</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2 lg:mr-3" style={{color: '#2E7D32'}} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span style={{color: '#2E7D32'}}>info@mortgagelink.ca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal & Regulatory Information */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold mb-3 sm:mb-4 lg:mb-6" style={{color: '#212121'}}>Legal & Regulatory Information</h3>
          </div>
          
          <div className="text-center text-xs sm:text-sm lg:text-base max-w-5xl mx-auto" style={{color: '#757575'}}>
            <p className="mb-3 sm:mb-4 lg:mb-6">
              <span className="font-semibold" style={{color: '#212121'}}>Regulatory Compliance:</span> 
              MortgageLink Canada is licensed under the Financial Services Regulatory Authority of Ontario (FSRA). 
              License #12345. We are committed to responsible lending practices and consumer protection.
            </p>
            <p className="mb-3 sm:mb-4 lg:mb-6">
              All mortgage applications are subject to credit approval and property verification. 
              Terms and conditions apply. Not all applicants will qualify for advertised rates or terms. 
              Professional advice should be obtained before making any mortgage decisions.
            </p>
          </div>
          
          <div className="mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 lg:pt-6 border-t border-gray-300 text-center">
            <p className="text-xs sm:text-sm lg:text-base" style={{color: '#757575'}}>
              © 2024 MortgageLink Canada. All rights reserved. 
              <span className="mx-1 sm:mx-2">|</span>
              <a href="#" className="hover:underline" style={{color: '#2E7D32'}}>Privacy Policy</a>
              <span className="mx-1 sm:mx-2">|</span>
              <a href="#" className="hover:underline" style={{color: '#2E7D32'}}>Terms of Service</a>
              <span className="mx-1 sm:mx-2">|</span>
              <a href="#" className="hover:underline" style={{color: '#2E7D32'}}>Complaint Process</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services; 