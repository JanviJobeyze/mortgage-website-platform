import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import refiniServiceIcon from '../assets/Refinancing_Service.png';
import documentIcon from '../assets/Document.png';
import financialRecordsIcon from '../assets/Financial_Records.png';
import propertyDocumentsIcon from '../assets/Property_Documents.png';

function Refinancing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set page title
    document.title = 'Mortgage Refinancing | Lower Rates & Debt Consolidation | MortgageLink Canada';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Lower your mortgage payments and consolidate debt with our refinancing solutions. Access competitive rates up to 80% LTV, cash-out options, and flexible terms. FSRA licensed broker.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Lower your mortgage payments and consolidate debt with our refinancing solutions. Access competitive rates up to 80% LTV, cash-out options, and flexible terms. FSRA licensed broker.';
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
                <img src={refiniServiceIcon} alt="Refinancing" className="w-16 h-16 mr-4" loading="lazy" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  Mortgage Refinancing
                </h1>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Lower your monthly payments, consolidate debt, or access your home equity with our 
                comprehensive refinancing solutions. Get better rates and more flexible terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/pre-qualify')}
                  className="bg-[#1B5E20] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors duration-200"
                >
                  Check Eligibility
                </button>
                <button 
                  onClick={() => navigate('/calculator')}
                  className="bg-white text-[#1B5E20] px-8 py-4 rounded-lg font-semibold border-2 border-[#1B5E20] hover:bg-[#1B5E20] hover:text-white transition-colors duration-200"
                >
                  Calculate Savings
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
              <h3 className="text-xl font-bold text-gray-900 mb-6">Refinancing Benefits</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Best Refinance Rate</span>
                  <span className="text-2xl font-bold text-[#1B5E20]">2.79%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Max Loan-to-Value</span>
                  <span className="text-xl font-bold text-[#1B5E20]">80%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                  <span className="text-gray-700">Processing Time</span>
                  <span className="text-lg font-bold text-[#1B5E20]">21-30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Refinance Your Mortgage?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Refinancing can help you save money, reduce debt, and improve your financial situation. 
              Discover the benefits that could work for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lower Monthly Payments</h3>
              <p className="text-gray-600">
                Reduce your monthly mortgage payment by securing a lower interest rate. 
                This can free up hundreds of dollars each month for other expenses.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Debt Consolidation</h3>
              <p className="text-gray-600">
                Combine high-interest debts into your mortgage at a lower rate. 
                Simplify your finances with one monthly payment.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cash-Out Refinancing</h3>
              <p className="text-gray-600">
                Access your home equity for major expenses like renovations, education, 
                or investment opportunities.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Payoff</h3>
              <p className="text-gray-600">
                Choose a shorter amortization period to pay off your mortgage faster 
                and save on total interest costs.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Better Terms</h3>
              <p className="text-gray-600">
                Switch from variable to fixed rates or vice versa. Choose payment 
                frequency that works better for your budget.
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
                Get expert guidance in your preferred language throughout the 
                refinancing process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Refinancing Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Refinancing</h2>
            <p className="text-lg text-gray-600">
              Choose the refinancing option that best fits your financial goals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Rate & Term Refinance</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Lower your interest rate or change your mortgage term without accessing additional funds.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lower monthly payments
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Faster payoff options
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Switch rate types
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Debt Consolidation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Combine high-interest debts into your mortgage at a lower rate to simplify payments.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lower interest costs
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Single monthly payment
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Improved cash flow
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cash-Out Refinance</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Access your home equity for major expenses like renovations, education, or investments.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Access home equity
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Lower rates than loans
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Flexible use of funds
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Refinancing Requirements</h2>
            <p className="text-lg text-gray-600">
              Prepare these documents to streamline your refinancing application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
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
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
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
                  Current mortgage statement
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Debt statements (if consolidating)
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-[#1B5E20] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Investment statements
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <img src={propertyDocumentsIcon} alt="Property Documents" className="w-12 h-12 mr-4" loading="lazy" />
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
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Refinance Your Mortgage?</h2>
          <p className="text-xl text-green-100 mb-8">
            Check your eligibility and see how much you could save with refinancing
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
              Check Eligibility Now
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

export default Refinancing; 