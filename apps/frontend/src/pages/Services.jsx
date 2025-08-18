import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import homeServiceIcon from '../assets/Home_Service.png';
import refiniServiceIcon from '../assets/Refinancing_Service.png';
import equityServiceIcon from '../assets/Equity_Service.png';
import documentIcon from '../assets/Document.png';
import financialRecordsIcon from '../assets/Financial_Records.png';
import propertyDocumentsIcon from '../assets/Property_Documents.png';
import sarahChenImage from '../assets/Sarah Chen.png';
import rajeshPatelImage from '../assets/Rajesh Patel.png';
import MortgageCalculator from '../components/MortgageCalculator';
import ContactForm from '../components/ContactForm';

function Services() {
  const navigate = useNavigate();



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
                  onClick={() => navigate('/eligibility-quiz')}
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
                  onClick={() => navigate('/eligibility-qui')}
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
    <MortgageCalculator  isCompact={true}/>
    

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
          
          <ContactForm 
            title="Request a Consultation"
            subtitle="Fill out the form below and we'll get back to you within 24 hours. All fields marked with * are required."
            showToaster={true}
          />
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