import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import homeServiceIcon from '../assets/Home_Service.png';
import documentIcon from '../assets/Document.png';
import financialRecordsIcon from '../assets/Financial_Records.png';
import propertyDocumentsIcon from '../assets/Property_Documents.png';

function HomePurchase() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = 'Home Purchase Loans | First-Time Buyer & Move-Up Mortgages | MortgageLink Canada';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get competitive home purchase loans for first-time buyers and move-up purchases. Low down payment options, pre-approval up to 120 days, and flexible income verification. FSRA licensed broker.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Get competitive home purchase loans for first-time buyers and move-up purchases. Low down payment options, pre-approval up to 120 days, and flexible income verification. FSRA licensed broker.';
      document.head.appendChild(newMetaDescription);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-50 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <img src={homeServiceIcon} alt="Home Purchase" className="w-16 h-16 mr-4" loading="lazy" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Home Purchase Loans
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Make your dream of homeownership a reality with our comprehensive home purchase loan solutions. 
                Whether you're a first-time buyer or looking to move up, we offer competitive rates and flexible terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/pre-qualify')}
                  className="bg-[#1B5E20] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors duration-200"
                >
                  Get Pre-Approved
                </button>
                <button 
                  onClick={() => navigate('/calculator')}
                  className="bg-white text-[#1B5E20] px-8 py-4 rounded-lg font-semibold border-2 border-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-colors duration-200"
                >
                  Calculate Payments
                </button>
                <button 
                  onClick={() => navigate('/apply')}
                  onMouseEnter={() => {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = '/apply';
                    link.as = 'document';
                    document.head.appendChild(link);
                    setTimeout(() => {
                      if (document.head.contains(link)) {
                        document.head.removeChild(link);
                      }
                    }, 1000);
                  }}
                  className="bg-[#4CAF50] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#45a049] transition-colors duration-200"
                >
                  Apply Now
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Rate Check</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Best Fixed Rate</span>
                  <span className="text-2xl font-bold text-[#1B5E20]">2.89%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Best Variable Rate</span>
                  <span className="text-2xl font-bold text-[#1B5E20]">3.15%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Min. Down Payment</span>
                  <span className="text-xl font-bold text-[#1B5E20]">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Home Purchase Loans?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand that buying a home is one of life's biggest decisions. That's why we offer 
              personalized solutions designed to make your homeownership journey smooth and successful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pre-Approval Up to 120 Days</h3>
              <p className="text-gray-600">
                Get pre-approved and shop with confidence. Our pre-approvals are valid for up to 120 days, 
                giving you plenty of time to find your perfect home.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Low Down Payment Options</h3>
              <p className="text-gray-600">
                Start with as little as 5% down payment. We offer various down payment options to fit 
                your financial situation and help you get into your dream home sooner.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">First-Time Buyer Programs</h3>
              <p className="text-gray-600">
                Special programs designed for first-time homebuyers, including down payment assistance 
                and educational resources to guide you through the process.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Income Verification</h3>
              <p className="text-gray-600">
                We understand that income can come from various sources. Our flexible verification process 
                accommodates different employment types and income streams.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600">
                Access to the best rates from top Canadian lenders. We shop around to find you the most 
                competitive terms and save you money over the life of your mortgage.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Multilingual Support</h3>
              <p className="text-gray-600">
                Get support in your preferred language. Our team speaks multiple languages to ensure 
                clear communication throughout your home buying journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You'll Need</h2>
            <p className="text-lg text-gray-600">
              Prepare these documents to streamline your home purchase loan application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img src={documentIcon} alt="Income Documents" className="w-12 h-12 mr-4" loading="lazy" />
                <h3 className="text-xl font-bold text-gray-900">Income Documents</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Recent pay stubs (2-3 months)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  T4 slips (2 years)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Notice of Assessment
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Employment letter
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img src={financialRecordsIcon} alt="Financial Records" className="w-12 h-12 mr-4" loading="lazy" />
                <h3 className="text-xl font-bold text-gray-900">Financial Records</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Bank statements (3 months)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Investment statements
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  RRSP/TFSA statements
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Credit card statements
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img src={propertyDocumentsIcon} alt="Property Documents" className="w-12 h-12 mr-4" loading="lazy" />
                <h3 className="text-xl font-bold text-gray-900">Property Documents</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Purchase agreement
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Property tax assessment
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Home insurance quote
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Property appraisal
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1B5E20]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Home Buying Journey?</h2>
          <p className="text-xl text-green-100 mb-8">
            Get pre-approved today and take the first step towards homeownership
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/pre-qualify')}
              onMouseEnter={() => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = '/pre-qualify';
                link.as = 'document';
                document.head.appendChild(link);
                setTimeout(() => {
                  if (document.head.contains(link)) {
                    document.head.removeChild(link);
                  }
                }, 1000);
              }}
              className="bg-white text-[#1B5E20] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Pre-Approved Now
            </button>
            <button 
              onClick={() => navigate('/apply')}
              onMouseEnter={() => {
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = '/apply';
                link.as = 'document';
                document.head.appendChild(link);
                setTimeout(() => {
                  if (document.head.contains(link)) {
                    document.head.removeChild(link);
                  }
                }, 1000);
              }}
              className="bg-[#4CAF50] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#45a049] transition-colors duration-200"
            >
              Apply Now
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#1B5E20] transition-colors duration-200"
            >
              Speak with an Expert
            </button>
          </div>
        </div>
      </section>

      {/* Back to Services Link */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/services" 
            className="inline-flex items-center text-[#1B5E20] hover:text-[#2E7D32] font-medium transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Services
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePurchase; 