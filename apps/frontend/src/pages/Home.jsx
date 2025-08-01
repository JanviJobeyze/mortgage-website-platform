import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StarIcon from '../assets/Star.png';
import HomePurchaseIcon from '../assets/Home_Purchase.png';
import RefinancingIcon from '../assets/Refinancing.png';
import HomeEquityIcon from '../assets/Home_Equity.png';
import SarahChenPhoto from '../assets/Sarah Chen.png';
import RajeshPatelPhoto from '../assets/Rajesh Patel.png';
import MarieDuboisPhoto from '../assets/Marie_Dubois.png';
import OntarioLogo from '../assets/ON.png';
import BritishColumbiaLogo from '../assets/BC.png';
import CorrectIcon from '../assets/Correct.png';
import ApprovedIcon from '../assets/approved.png';
import CalculatorIcon from '../assets/Calculator.png';
import ChatBot from '../components/ChatBot';
import { ResultCard } from '../components';
import { loadProvinceRates } from '../utils/rateApiService';


function Home() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  // Rates state
  const [topRates, setTopRates] = useState([]);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState(null);

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Chen",
      photo: SarahChenPhoto,
      text: "Excellent service & dedication. They helped us navigate our complex first-time buyer process and found us a rate that saved thousands in that term."
    },
    {
      name: "Rajesh Patel", 
      photo: RajeshPatelPhoto,
      text: "Professional and responsive team. Very attention to my business needs and helped us plan a long term strategy. Highly recommended for family lending."
    },
    {
      name: "Marie Dubois",
      photo: MarieDuboisPhoto,
      text: "Outstanding service for getting approved for our second home in Quebec. The team found us budget solution that fits into our schedule and a competitive mortgage."
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Load top rates
  useEffect(() => {
    const loadTopRates = async () => {
      try {
        setRatesLoading(true);
        setRatesError(null);
        
        // Load rates for Ontario (most popular province)
        const ontarioRates = await loadProvinceRates('Ontario');
        
        // Get top 5 rates sorted by rate (lowest first)
        const sortedRates = ontarioRates
          .sort((a, b) => a.rate - b.rate)
          .slice(0, 5);
        
        setTopRates(sortedRates);
      } catch (error) {
        console.error('Error loading top rates:', error);
        setRatesError('Failed to load rates. Please try again later.');
      } finally {
        setRatesLoading(false);
      }
    };

    loadTopRates();
  }, []);

  // Navigation functions
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription for:', email);
    setEmail('');
  };

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
    
    // Auto-calculate when values change
    setTimeout(() => {
      calculatePayment();
    }, 100);
  };

  // Format currency inputs
  const formatCurrency = (value) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '') return '';
    return new Intl.NumberFormat('en-CA').format(parseInt(numericValue));
  };

  // Update input handlers with calculation and formatting




  return (
    <div className="min-h-screen">
      <main id="main">
        {/* Hero Section */}
        <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 text-left md:text-center lg:text-left">
              <div className="bg-[#FFE0B2] text-[#E65100] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium inline-flex items-center w-fit mx-auto md:mx-auto lg:mx-0">
                <img src={StarIcon} alt="Star" className="w-3 h-3 sm:w-4 sm:h-4 mr-2" loading="lazy" />
                <span className="whitespace-nowrap">{t('home.hero.trustedBadge')}</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#374151] leading-tight">
                {t('home.hero.mainTitle')}<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className="text-[#1B5E20]">{t('home.hero.mainTitleHighlight')}</span>
              </h1>
              
              <p className="text-[#374151] text-base sm:text-lg max-w-lg leading-relaxed mx-auto md:mx-auto lg:mx-0">
                {t('home.hero.subtitle')}
              </p>
              
              {/* Rate Display Box */}
              <div className="rounded-lg px-4 sm:px-6 py-3 sm:py-4 bg-[#FFFFFF] shadow-lg max-w-lg mx-auto md:mx-auto lg:mx-0">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="text-left py-2">
                    <div className="text-xs text-[#9CA3AF] mb-1 sm:mb-2">{t('home.hero.currentBestRate')}</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-1">
                      {ratesLoading ? '...' : topRates.length > 0 ? `${topRates[0]?.rate}%` : '2.89%'}
                    </div>
                    <div className="text-xs text-[#9CA3AF]">{t('home.hero.fiveYearFixed')}</div>
                  </div>
                  <div className="text-right py-2">
                    <div className="text-xs text-[#9CA3AF] mb-1 sm:mb-2">{t('home.hero.variableRate')}</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-1">
                      {ratesLoading ? '...' : topRates.length > 1 ? `${topRates[1]?.rate}%` : '3.15%'}
                    </div>
                    <div className="text-xs text-[#9CA3AF]">{t('home.hero.primePlus')}</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-center lg:justify-start">
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
                  className="bg-[#1B5E20] text-[#FFFFFF] px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <img src={ApprovedIcon} alt="Checkmark" className="w-4 h-4 mr-2" loading="lazy" /> 
                  <span>Check My Eligibility</span>
                </button>
                <button 
                  onClick={() => navigate('/rates')}
                  className="bg-[#1B5E20] text-[#FFFFFF] px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <img src={CalculatorIcon} alt="Calculator" className="w-4 h-4 mr-2" loading="lazy" /> 
                  <span>View All Rates</span>
                </button>
              </div>
                        </div>
            
            {/* Quick Payment Calculator */}
            <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-4 sm:mb-6">{t('home.calculator.title')}</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">{t('home.calculator.loanAmount')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-sm">$</span>
                    <input
                      type="text"
                      value={calculatorData.homePrice}
                      onChange={(e) => handleInputChange('homePrice', formatCurrency(e.target.value))}
                      placeholder="500,000"
                      className="w-full pl-7 sm:pl-8 pr-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#212121] text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">{t('home.calculator.downPayment')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-sm">$</span>
                    <input
                      type="text"
                      value={calculatorData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', formatCurrency(e.target.value))}
                      placeholder="100,000"
                      className="w-full pl-7 sm:pl-8 pr-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#212121] text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">{t('home.calculator.amortization')}</label>
                    <input
                      type="text"
                      value={calculatorData.amortization}
                      onChange={(e) => handleInputChange('amortization', e.target.value)}
                      placeholder="25"
                      className="w-full px-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#212121] text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">{t('home.calculator.rate')}</label>
                    <input
                      type="text"
                      value={calculatorData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      placeholder="2.89"
                      className="w-full px-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#212121] text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="bg-[#F5F5F5] p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#757575]">{t('home.calculator.monthlyPayment')}</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#212121]">{monthlyPayment}</span>
                  </div>
                </div>
                
                <button 
                  onClick={calculatePayment}
                  className="w-full bg-[#1B5E20] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors text-center block text-sm sm:text-base mb-3"
                >
                  Calculate Payment
                </button>
                
                <Link 
                  to="/calculator"
                  className="w-full bg-[#FF6F00] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#E65100] transition-colors text-center block text-sm sm:text-base"
                >
                  {t('home.calculator.viewDetailedCalculator')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Mortgage Solutions */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-3 sm:mb-4">{t('home.solutions.title')}</h2>
          <p className="text-[#757575] mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            {t('home.solutions.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div 
              onClick={() => navigate('/services')}
              className="group text-center p-4 sm:p-6 rounded-xl bg-white border border-transparent hover:border-[#1B5E20] hover:shadow-xl hover:bg-gradient-to-br hover:from-[#F1F8E9] hover:to-white transition-all duration-300 transform hover:-translate-y-2 sm:col-span-1 lg:col-span-1 cursor-pointer"
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <img 
                  src={HomePurchaseIcon} 
                  alt="Home Purchase" 
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg" 
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-2 sm:mb-3 group-hover:text-[#1B5E20] transition-colors duration-300">{t('home.solutions.homePurchase.title')}</h3>
              <p className="text-sm sm:text-base text-[#757575] mb-3 sm:mb-4 group-hover:text-[#374151] transition-colors duration-300 leading-relaxed">
                {t('home.solutions.homePurchase.description')}
              </p>
              <button className="text-[#1B5E20] font-semibold hover:text-[#2E7D32] transition-all duration-300 group-hover:scale-105 inline-flex items-center text-sm sm:text-base">
                {t('home.solutions.homePurchase.learnMore')} 
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div 
              onClick={() => navigate('/services')}
              className="group text-center p-4 sm:p-6 rounded-xl bg-white border border-transparent hover:border-[#1B5E20] hover:shadow-xl hover:bg-gradient-to-br hover:from-[#F1F8E9] hover:to-white transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <img 
                  src={RefinancingIcon} 
                  alt="Refinancing" 
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg group-hover:rotate-3" 
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-2 sm:mb-3 group-hover:text-[#1B5E20] transition-colors duration-300">{t('home.solutions.refinancing.title')}</h3>
              <p className="text-sm sm:text-base text-[#757575] mb-3 sm:mb-4 group-hover:text-[#374151] transition-colors duration-300 leading-relaxed">
                {t('home.solutions.refinancing.description')}
              </p>
              <button className="text-[#1B5E20] font-semibold hover:text-[#2E7D32] transition-all duration-300 group-hover:scale-105 inline-flex items-center text-sm sm:text-base">
                {t('home.solutions.refinancing.learnMore')} 
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div 
              onClick={() => navigate('/services')}
              className="group text-center p-4 sm:p-6 rounded-xl bg-white border border-transparent hover:border-[#FF6F00] hover:shadow-xl hover:bg-gradient-to-br hover:from-[#FFF3E0] hover:to-white transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1 cursor-pointer"
            >
              <div className="flex justify-center mb-3 sm:mb-4">
                <img 
                  src={HomeEquityIcon} 
                  alt="Home Equity" 
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg group-hover:-rotate-3" 
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-2 sm:mb-3 group-hover:text-[#FF6F00] transition-colors duration-300">{t('home.solutions.homeEquity.title')}</h3>
              <p className="text-sm sm:text-base text-[#757575] mb-3 sm:mb-4 group-hover:text-[#374151] transition-colors duration-300 leading-relaxed">
                {t('home.solutions.homeEquity.description')}
              </p>
              <button className="text-[#FF6F00] font-semibold hover:text-[#E65100] transition-all duration-300 group-hover:scale-105 inline-flex items-center text-sm sm:text-base">
                {t('home.solutions.homeEquity.learnMore')} 
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Mortgage Rates Section */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1B5E20] rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#212121] mb-4">
              Current Mortgage Rates
            </h2>
            <p className="text-[#757575] text-lg max-w-3xl mx-auto leading-relaxed">
              Stay ahead with real-time rates from Canada's top lenders. Compare and find the perfect mortgage rate for your needs.
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            {/* Loading State */}
            {ratesLoading && (
              <div className="text-center py-12">
                <div className="inline-flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-8 h-8 border-4 border-[#1B5E20]/20 border-t-[#1B5E20] rounded-full animate-spin"></div>
                  </div>
                  <span className="text-lg text-gray-600">Loading current rates...</span>
                </div>
              </div>
            )}

            {/* Error State */}
            {ratesError && !ratesLoading && (
              <div role="alert" className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span className="font-medium">{ratesError}</span>
                </div>
              </div>
            )}

            {/* Best Rate Highlight */}
            {!ratesLoading && !ratesError && topRates.length > 0 && (
              <div className="mb-8 p-6 bg-[#F8F9FA] rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center px-3 py-1 bg-[#1B5E20] text-white rounded-full text-xs font-semibold mb-3">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Best Rate Available
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl sm:text-4xl font-bold text-[#1B5E20]">
                        {topRates[0]?.rate}%
                      </div>
                      <div className="text-sm sm:text-base text-gray-600">
                        {typeof topRates[0]?.lender?.name === 'string' ? topRates[0].lender.name : 'Unknown Lender'} • {topRates[0]?.type} • {topRates[0]?.term}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        APR: {topRates[0]?.apr}% • Home Purchase
                      </div>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border border-[#1B5E20]/20">
                      <svg className="w-4 h-4 text-[#1B5E20] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs font-medium text-[#1B5E20]">Updated Today</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rates Cards Row */}
            {!ratesLoading && !ratesError && topRates.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                {topRates.map((rate, index) => (
                  <div key={index} className={`group relative bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border h-full ${
                    index === 0 ? 'border-[#1B5E20] bg-[#F8F9FA]' : 'border-gray-200 hover:border-[#1B5E20]/30'
                  }`}>
                    {/* Best Rate Badge */}
                    {index === 0 && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-[#1B5E20] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                          Best Rate
                        </div>
                      </div>
                    )}
                    
                    {/* Lender Info */}
                    <div className="flex items-center mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 flex-shrink-0 ${
                        rate.lender?.color || 'bg-gray-600'
                      }`}>
                        {typeof rate.lender?.logo === 'string' ? rate.lender.logo : '🏦'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 text-sm truncate">{typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'}</div>
                        <div className="text-xs text-gray-500 truncate">{typeof rate.lender?.type === 'string' ? rate.lender.type : 'Major Bank'}</div>
                      </div>
                    </div>

                    {/* Rate Display */}
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-[#1B5E20] mb-1">
                        {rate.rate}%
                      </div>
                      <div className="text-xs text-gray-600">
                        Annual Rate
                      </div>
                    </div>

                    {/* Rate Details */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          rate.type === 'Fixed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {rate.type}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          {rate.term}
                        </span>
                      </div>
                      
                      {/* Change Indicator */}
                      {rate.change !== undefined && (
                        <div className="flex items-center justify-center">
                          <span className={`text-xs font-medium ${
                            rate.change > 0 ? 'text-red-600' : rate.change < 0 ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {rate.change > 0 ? '↗' : rate.change < 0 ? '↘' : '→'} {rate.change > 0 ? '+' : ''}{rate.change || 0}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* No Rates State */}
            {!ratesLoading && !ratesError && topRates.length === 0 && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">No rates available at the moment. Please try again later.</p>
              </div>
            )}

            {/* Call to Action */}
            <div className="text-center">
              <button 
                onClick={() => navigate('/rates')}
                className="inline-flex items-center px-6 py-3 bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 shadow-sm hover:shadow-md text-base"
              >
                <span>Explore All 20+ Rates</span>
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l7 7-7 7" />
                </svg>
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Compare rates from all provinces and lenders
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Mortgage Payment Calculator Section */}
      <section className="py-16 px-4 bg-[#1B5E20]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Calculate Your Mortgage Payment
            </h2>
            <p className="text-[#C8E6C9] text-lg max-w-3xl mx-auto leading-relaxed">
              Get instant calculations with our advanced mortgage calculator. See how different rates and terms affect your monthly payment.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
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
                  <button 
                    onClick={() => navigate('/calculator')}
                    className="px-6 py-2.5 text-[#1B5E20] bg-[#E8F5E8] hover:bg-[#C8E6C9] font-medium rounded-lg transition-colors duration-200 text-sm border border-[#1B5E20]"
                  >
                    View Detailed Calculator
                  </button>
                  <button 
                    onClick={() => navigate('/services')}
                    className="px-6 py-2.5 text-[#1B5E20] bg-white hover:bg-gray-50 font-medium rounded-lg transition-colors duration-200 text-sm border border-[#1B5E20]"
                  >
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
        </div>
      </section>

      {/* Trusted & Regulated */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#212121] mb-4">{t('home.trusted.title')}</h2>
              <p className="text-[#757575] text-lg max-w-3xl mx-auto leading-relaxed">
                {t('home.trusted.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F8F9FA] rounded-xl p-6 text-center hover:bg-[#E8F5E8] transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1B5E20] rounded-full mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#212121] mb-2">{t('home.trusted.osfiApproved')}</h3>
                <p className="text-sm text-[#757575]">Fully compliant with Canadian regulations</p>
              </div>
              
              <div className="bg-[#F8F9FA] rounded-xl p-6 text-center hover:bg-[#E8F5E8] transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1B5E20] rounded-full mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#212121] mb-2">{t('home.trusted.licensedInsured')}</h3>
                <p className="text-sm text-[#757575]">Licensed and fully insured operations</p>
              </div>
              
              <div className="bg-[#F8F9FA] rounded-xl p-6 text-center hover:bg-[#E8F5E8] transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1B5E20] rounded-full mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#212121] mb-2">{t('home.trusted.asLenders')}</h3>
                <p className="text-sm text-[#757575]">Direct access to major lenders</p>
              </div>
              
              <div className="bg-[#F8F9FA] rounded-xl p-6 text-center hover:bg-[#E8F5E8] transition-colors duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1B5E20] rounded-full mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#212121] mb-2">{t('home.trusted.rateComparison')}</h3>
                <p className="text-sm text-[#757575]">Comprehensive rate analysis</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Province-Specific Expertise */}
      <section className="py-16 px-4 bg-[#E8F5E8]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#212121] mb-4">{t('home.provinces.title')}</h2>
          <p className="text-[#757575] mb-12">{t('home.provinces.subtitle')}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#FFFFFF] rounded-lg p-6 text-left">
              <div className="flex items-center mb-4">
                <img src={OntarioLogo} alt="Ontario" className="w-12 h-12 object-contain mr-4" loading="lazy" />
                <h3 className="text-xl font-bold text-[#212121]">{t('home.provinces.ontario.title')}</h3>
              </div>
              <p className="text-sm text-[#757575] mb-4">{t('home.provinces.ontario.subtitle')}</p>
              
              <ul className="space-y-2 text-sm text-[#757575] mb-6">
                {t('home.provinces.ontario.features', { returnObjects: true }).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" loading="lazy" /> {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-[#1B5E20] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors">
                {t('home.provinces.ontario.button')}
              </button>
            </div>
            
            <div className="bg-[#FFFFFF] rounded-lg p-6 text-left">
              <div className="flex items-center mb-4">
                <img src={BritishColumbiaLogo} alt="British Columbia" className="w-12 h-12 object-contain mr-4" loading="lazy" />
                <h3 className="text-xl font-bold text-[#212121]">{t('home.provinces.britishColumbia.title')}</h3>
              </div>
              <p className="text-sm text-[#757575] mb-4">{t('home.provinces.britishColumbia.subtitle')}</p>
              
              <ul className="space-y-2 text-sm text-[#757575] mb-6">
                {t('home.provinces.britishColumbia.features', { returnObjects: true }).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" loading="lazy" /> {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-[#1B5E20] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors">
                {t('home.provinces.britishColumbia.button')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Qualification Quiz Section */}
      <section className="py-16 px-4 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#212121] mb-4">
                Get Pre-Qualified in Minutes
              </h2>
              <p className="text-[#757575] text-lg max-w-3xl mx-auto leading-relaxed">
                Take our quick assessment to see if you qualify for a mortgage. Get personalized recommendations and rates.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#212121] mb-4">What the quiz includes:</h3>
                  <ul className="space-y-3 text-[#757575]">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Basic personal information</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Employment and income details</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Property preferences and budget</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Credit history overview</span>
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-[#212121] mb-4">What you'll receive:</h3>
                  <ul className="space-y-3 text-[#757575]">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Instant eligibility assessment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Personalized rate recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Maximum loan amount estimate</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-[#1B5E20] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Next steps guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
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
                  className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 shadow-sm hover:shadow-md text-lg"
                >
                  Start Pre-Qualification Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-3 sm:mb-4">{t('home.testimonials.title')}</h2>
          <p className="text-sm sm:text-base text-[#757575] mb-8 sm:mb-12">{t('home.testimonials.subtitle')}</p>
          
          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Arrows - Hidden on mobile */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFFFFF] shadow-lg rounded-full p-2 sm:p-3 hover:bg-[#F5F5F5] transition-colors hidden sm:block"
              aria-label={t('home.testimonials.previousTestimonial')}
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFFFFF] shadow-lg rounded-full p-2 sm:p-3 hover:bg-[#F5F5F5] transition-colors hidden sm:block"
              aria-label={t('home.testimonials.nextTestimonial')}
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Cards Container */}
            <div className="overflow-hidden rounded-lg">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4 sm:px-8">
                    <div className="bg-[#FFFFFF] border border-[#E0E0E0] rounded-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
                      <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6">
                        <img 
                          src={testimonial.photo} 
                          alt={testimonial.name} 
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mb-3 sm:mb-0"
                          loading="lazy"
                        />
                        <div className="sm:ml-4 text-center sm:text-left">
                          <h4 className="font-bold text-[#212121] text-base sm:text-lg">{testimonial.name}</h4>
                          <div className="flex justify-center sm:justify-start text-[#FF6F00] text-sm sm:text-lg">★★★★★</div>
                        </div>
                      </div>
                      <p className="text-[#757575] text-center leading-relaxed text-sm sm:text-base">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial 
                      ? 'bg-[#1B5E20]' 
                      : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'
                  }`}
                  aria-label={`${t('home.testimonials.goToTestimonial')} ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stay Updated Newsletter */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#1B5E20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-3 sm:mb-4">{t('home.newsletter.title')}</h2>
          <p className="text-[#C8E6C9] mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            {t('home.newsletter.subtitle')}
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletter.placeholder')}
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#A5D6A7] focus:outline-none bg-[#FFFFFF] text-[#9CA3AF] text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-[#FF6F00] text-[#FFFFFF] px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-[#E65100] transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              {t('home.newsletter.button')}
            </button>
          </form>
          
          <p className="text-[#C8E6C9] text-xs sm:text-sm mt-3 sm:mt-4">
            {t('home.newsletter.privacy')}
          </p>
        </div>
      </section>
      </main>

      {/* Chat Bot Component */}
      <ChatBot />
    </div>
  );
}

export default Home; 