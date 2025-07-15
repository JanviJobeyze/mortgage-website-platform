import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

function Home() {
  const [loanAmount, setLoanAmount] = useState('500,000');
  const [downPayment, setDownPayment] = useState('100,000');
  const [amortization, setAmortization] = useState('25');
  const [rate, setRate] = useState('25');
  const [email, setEmail] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center">
            {/* Left Content */}
            <div className="space-y-4 md:space-y-6 text-left md:text-center lg:text-left">
              <div className="bg-[#FFE0B2] text-[#E65100] px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium inline-flex items-center w-fit mx-auto md:mx-auto lg:mx-0">
                <img src={StarIcon} alt="Star" className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                <span className="whitespace-nowrap">Trusted by 10,000+ Canadian Families</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#374151] leading-tight">
                Your Dream Home<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className="text-[#1B5E20]">Starts Here</span>
              </h1>
              
              <p className="text-[#374151] text-base sm:text-lg max-w-lg leading-relaxed mx-auto md:mx-auto lg:mx-0">
                Get the best mortgage rates in Canada with our expert guidance. From first-
                time buyers to refinancing, we make homeownership accessible across all 
                provinces.
              </p>
              
              {/* Rate Display Box */}
              <div className="rounded-lg px-4 sm:px-6 py-3 sm:py-4 bg-[#FFFFFF] shadow-lg max-w-lg mx-auto md:mx-auto lg:mx-0">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="text-left py-2">
                    <div className="text-xs text-[#9CA3AF] mb-1 sm:mb-2">Current Best Rate</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-1">2.89%</div>
                    <div className="text-xs text-[#9CA3AF]">5-Year Fixed</div>
                  </div>
                  <div className="text-right py-2">
                    <div className="text-xs text-[#9CA3AF] mb-1 sm:mb-2">Variable Rate</div>
                    <div className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-1">3.15%</div>
                    <div className="text-xs text-[#9CA3AF]">Prime + 1.35%</div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-center lg:justify-start">
                <button className="bg-[#1B5E20] text-[#FFFFFF] px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors flex items-center justify-center text-sm sm:text-base">
                  <img src={ApprovedIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> 
                  <span>Get Pre-Approved</span>
                </button>
                <button className="bg-[#1B5E20] text-[#FFFFFF] px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors flex items-center justify-center text-sm sm:text-base">
                  <img src={CalculatorIcon} alt="Calculator" className="w-4 h-4 mr-2" /> 
                  <span>Calculate Payments</span>
                </button>
              </div>
            </div>
            
            {/* Quick Payment Calculator */}
            <div className="bg-[#FFFFFF] rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-4 sm:mb-6">Quick Payment Calculator</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Loan Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-sm">$</span>
                    <input
                      type="text"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                      className="w-full pl-7 sm:pl-8 pr-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#9CA3AF] text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Down Payment</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] text-sm">$</span>
                    <input
                      type="text"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      className="w-full pl-7 sm:pl-8 pr-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#9CA3AF] text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Amortization</label>
                    <input
                      type="text"
                      value={amortization}
                      onChange={(e) => setAmortization(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#9CA3AF] text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">Rate</label>
                    <input
                      type="text"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full px-4 py-2.5 sm:py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent bg-[#FFFFFF] text-[#9CA3AF] text-sm sm:text-base"
                    />
                  </div>
                </div>
                
                <div className="bg-[#F5F5F5] p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#757575]">Monthly Payment</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#212121]">$1,847</span>
                  </div>
                </div>
                
                <Link 
                  to="/calculator"
                  className="w-full bg-[#FF6F00] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#E65100] transition-colors text-center block text-sm sm:text-base"
                >
                  View Detailed Calculator
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Mortgage Solutions */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-3 sm:mb-4">Comprehensive Mortgage Solutions</h2>
          <p className="text-[#757575] mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Whether you're buying your first home, refinancing, or investing in your 
            future, we have the expertise to guide you through every step of the process.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="group text-center p-4 sm:p-6 rounded-xl bg-white border border-transparent hover:border-[#1B5E20] hover:shadow-xl hover:bg-gradient-to-br hover:from-[#F1F8E9] hover:to-white transition-all duration-300 transform hover:-translate-y-2 sm:col-span-1 lg:col-span-1">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img 
                  src={HomePurchaseIcon} 
                  alt="Home Purchase" 
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg" 
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-2 sm:mb-3 group-hover:text-[#1B5E20] transition-colors duration-300">Home Purchase</h3>
              <p className="text-sm sm:text-base text-[#757575] mb-3 sm:mb-4 group-hover:text-[#374151] transition-colors duration-300 leading-relaxed">
                First-time buyer or moving up? We connect 
                you with competitive pre-qualified 
                through the purchase process.
              </p>
              <button className="text-[#1B5E20] font-semibold hover:text-[#2E7D32] transition-all duration-300 group-hover:scale-105 inline-flex items-center text-sm sm:text-base">
                Learn More 
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="group text-center p-4 sm:p-6 rounded-xl bg-white border border-transparent hover:border-[#1B5E20] hover:shadow-xl hover:bg-gradient-to-br hover:from-[#F1F8E9] hover:to-white transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img 
                  src={RefinancingIcon} 
                  alt="Refinancing" 
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg group-hover:rotate-3" 
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-2 sm:mb-3 group-hover:text-[#1B5E20] transition-colors duration-300">Refinancing</h3>
              <p className="text-sm sm:text-base text-[#757575] mb-3 sm:mb-4 group-hover:text-[#374151] transition-colors duration-300 leading-relaxed">
                Lower your payments, consolidate debt or 
                cash out refinancing. Help you maximize 
                your home equity.
              </p>
              <button className="text-[#1B5E20] font-semibold hover:text-[#2E7D32] transition-all duration-300 group-hover:scale-105 inline-flex items-center text-sm sm:text-base">
                Learn More 
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="group text-center p-4 sm:p-6 rounded-xl bg-white border border-transparent hover:border-[#FF6F00] hover:shadow-xl hover:bg-gradient-to-br hover:from-[#FFF3E0] hover:to-white transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
              <div className="flex justify-center mb-3 sm:mb-4">
                <img 
                  src={HomeEquityIcon} 
                  alt="Home Equity" 
                  className="w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg group-hover:-rotate-3" 
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#212121] mb-2 sm:mb-3 group-hover:text-[#FF6F00] transition-colors duration-300">Home Equity</h3>
              <p className="text-sm sm:text-base text-[#757575] mb-3 sm:mb-4 group-hover:text-[#374151] transition-colors duration-300 leading-relaxed">
                Unlock your home's value with a HELOC or second 
                mortgage. Options. Renovations, 
                investments, or major purchases.
              </p>
              <button className="text-[#FF6F00] font-semibold hover:text-[#E65100] transition-all duration-300 group-hover:scale-105 inline-flex items-center text-sm sm:text-base">
                Learn More 
                <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted & Regulated */}
      <section className="py-16 px-4 bg-[#E8F5E8]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#212121] mb-4">Trusted & Regulated</h2>
          <p className="text-[#757575] mb-12">
            Licensed mortgage professionals with full regulatory compliance across Canada.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#FFFFFF] rounded-lg p-6 shadow-sm">
                <img src={CorrectIcon} alt="Approved" className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium text-[#212121]">OSFI Approved</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#FFFFFF] rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-2">🏛️</div>
                <div className="text-sm font-medium text-[#212121]">Licensed/Insured</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#FFFFFF] rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-sm font-medium text-[#212121]">As Lenders</div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-[#FFFFFF] rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-2">📈</div>
                <div className="text-sm font-medium text-[#212121]">Rate Comparison</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-3 sm:mb-4">What Our Clients Say</h2>
          <p className="text-sm sm:text-base text-[#757575] mb-8 sm:mb-12">Trusted by families across Canada's major communities</p>
          
          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto">
            {/* Navigation Arrows - Hidden on mobile */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 sm:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFFFFF] shadow-lg rounded-full p-2 sm:p-3 hover:bg-[#F5F5F5] transition-colors hidden sm:block"
              aria-label="Previous testimonial"
            >
              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 sm:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FFFFFF] shadow-lg rounded-full p-2 sm:p-3 hover:bg-[#F5F5F5] transition-colors hidden sm:block"
              aria-label="Next testimonial"
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
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Province-Specific Expertise */}
      <section className="py-16 px-4 bg-[#E8F5E8]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#212121] mb-4">Province-Specific Expertise</h2>
          <p className="text-[#757575] mb-12">Local knowledge and regulatory expertise across Canada</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-[#FFFFFF] rounded-lg p-6 text-left">
              <div className="flex items-center mb-4">
                <img src={OntarioLogo} alt="Ontario" className="w-12 h-12 object-contain mr-4" />
                <h3 className="text-xl font-bold text-[#212121]">Ontario</h3>
              </div>
              <p className="text-sm text-[#757575] mb-4">FSRA licensed, insured & bonded</p>
              
              <ul className="space-y-2 text-sm text-[#757575] mb-6">
                <li className="flex items-center"><img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> Land Transfer Tax credit (Toronto & Ontario)</li>
                <li className="flex items-center"><img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> First-Time Home Buyer Incentive guidance</li>
                <li className="flex items-center"><img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> RRSP HBP assistance/investment</li>
              </ul>
              
              <button className="w-full bg-[#1B5E20] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors">
                Explore Ontario Services
              </button>
            </div>
            
            <div className="bg-[#FFFFFF] rounded-lg p-6 text-left">
              <div className="flex items-center mb-4">
                <img src={BritishColumbiaLogo} alt="British Columbia" className="w-12 h-12 object-contain mr-4" />
                <h3 className="text-xl font-bold text-[#212121]">British Columbia</h3>
              </div>
              <p className="text-sm text-[#757575] mb-4">Vancouver, Victoria & Fraser Valley</p>
              
              <ul className="space-y-2 text-sm text-[#757575] mb-6">
                <li className="flex items-center"><img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> Foreign Buyer Tax compliance</li>
                <li className="flex items-center"><img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> BC Home Owner Mortgage programs</li>
                <li className="flex items-center"><img src={CorrectIcon} alt="Checkmark" className="w-4 h-4 mr-2" /> RRSP fees/bets of eligibility</li>
              </ul>
              
              <button className="w-full bg-[#1B5E20] text-[#FFFFFF] py-3 rounded-lg font-semibold hover:bg-[#2E7D32] transition-colors">
                Explore BC Services
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stay Updated Newsletter */}
      <section className="py-8 sm:py-12 md:py-16 px-4 bg-[#1B5E20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-3 sm:mb-4">Stay Updated on Mortgage Rates</h2>
          <p className="text-[#C8E6C9] mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">
            Get weekly rate updates, market insights, and exclusive mortgage tips delivered to your inbox.
          </p>
          
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#A5D6A7] focus:outline-none bg-[#FFFFFF] text-[#9CA3AF] text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-[#FF6F00] text-[#FFFFFF] px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-[#E65100] transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
          
          <p className="text-[#C8E6C9] text-xs sm:text-sm mt-3 sm:mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

            {/* Chat Bot Component */}
      <ChatBot />
    </div>
  );
}

export default Home; 