import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import equityServiceIcon from '../assets/Equity_Service.png';
import documentIcon from '../assets/Document.png';
import financialRecordsIcon from '../assets/Financial_Records.png';
import propertyDocumentsIcon from '../assets/Property_Documents.png';

function HomeEquity() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = 'Home Equity Solutions | HELOC & Second Mortgages | MortgageLink Canada';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access your home equity with HELOC and second mortgage solutions. Competitive rates, flexible access, and up to 65% LTV. Perfect for renovations, investments, or major expenses. FSRA licensed broker.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Access your home equity with HELOC and second mortgage solutions. Competitive rates, flexible access, and up to 65% LTV. Perfect for renovations, investments, or major expenses. FSRA licensed broker.';
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
                <img src={equityServiceIcon} alt="Home Equity" className="w-16 h-16 mr-4" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Home Equity Solutions
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Unlock the value in your home with our flexible home equity solutions. Whether you need 
                a HELOC for ongoing access or a second mortgage for a lump sum, we have options for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/pre-qualify')}
                  className="bg-[#1B5E20] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors duration-200"
                >
                  Calculate Equity
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-white text-[#1B5E20] px-8 py-4 rounded-lg font-semibold border-2 border-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-colors duration-200"
                >
                  Speak with Expert
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Home Equity Options</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">HELOC Rate</span>
                  <span className="text-2xl font-bold text-[#FF8F00]">Prime + 0.5%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Max Credit Limit</span>
                  <span className="text-xl font-bold text-[#1B5E20]">65% of home value</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Processing Time</span>
                  <span className="text-lg font-bold text-[#1B5E20]">14-21 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Equity Solutions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose the home equity solution that best fits your financial needs and goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* HELOC */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Home Equity Line of Credit (HELOC)</h3>
                <p className="text-gray-600 mt-2">Flexible access to your home equity</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Interest Rate</span>
                  <span className="font-bold text-blue-600">Prime + 0.5%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Credit Limit</span>
                  <span className="font-bold text-blue-600">Up to 65% LTV</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-700">Draw Period</span>
                  <span className="font-bold text-blue-600">10 years</span>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pay interest only on what you use
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access funds anytime with debit card
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Revolving credit line
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Perfect for ongoing expenses
                </li>
              </ul>
            </div>
            
            {/* Second Mortgage */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Second Mortgage</h3>
                <p className="text-gray-600 mt-2">Lump sum access to your home equity</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Interest Rate</span>
                  <span className="font-bold text-orange-600">3.25% - 4.50%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Loan Amount</span>
                  <span className="font-bold text-orange-600">Up to 65% LTV</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <span className="text-gray-700">Term Options</span>
                  <span className="font-bold text-orange-600">5-25 years</span>
                </div>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Fixed monthly payments
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Predictable repayment schedule
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lower rates than personal loans
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Ideal for large one-time expenses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Common Uses for Home Equity</h2>
            <p className="text-lg text-gray-600">
              Discover how homeowners are using their equity to achieve their financial goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Home Renovations</h3>
              <p className="text-gray-600">
                Upgrade your kitchen, add a bathroom, or finish your basement. 
                Increase your home's value while improving your living space.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Education Funding</h3>
              <p className="text-gray-600">
                Pay for tuition, books, or other educational expenses. 
                Invest in your future or your children's education.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Investment Opportunities</h3>
              <p className="text-gray-600">
                Start a business, invest in real estate, or diversify your portfolio. 
                Use your equity to build wealth.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Debt Consolidation</h3>
              <p className="text-gray-600">
                Combine high-interest debts into one lower-rate payment. 
                Simplify your finances and save on interest.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emergency Fund</h3>
              <p className="text-gray-600">
                Create a financial safety net for unexpected expenses. 
                Access funds when you need them most.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Major Purchases</h3>
              <p className="text-gray-600">
                Buy a vehicle, pay for a wedding, or cover medical expenses. 
                Use your equity for life's important moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Equity Requirements</h2>
            <p className="text-lg text-gray-600">
              Prepare these documents to streamline your home equity application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <img src={documentIcon} alt="Income Documents" className="w-12 h-12 mr-4" />
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
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <img src={financialRecordsIcon} alt="Financial Records" className="w-12 h-12 mr-4" />
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
                  Current mortgage statement
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
                  Credit card statements
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <img src={propertyDocumentsIcon} alt="Property Documents" className="w-12 h-12 mr-4" />
                <h3 className="text-xl font-bold text-gray-900">Property Documents</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
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
                  Home insurance certificate
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Property appraisal
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Title search
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1B5E20]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Access Your Home Equity?</h2>
          <p className="text-xl text-green-100 mb-8">
            Calculate your available equity and explore your options today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/calculator')}
              className="bg-white text-[#1B5E20] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Calculate Equity Now
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

export default HomeEquity; 