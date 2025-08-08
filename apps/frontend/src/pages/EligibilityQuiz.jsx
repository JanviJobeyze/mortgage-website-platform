import React, { useState, useEffect } from 'react';

function EligibilityQuiz() {
  
  // Quiz state
  const [isEligible, setIsEligible] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    downPayment: '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: '',
    monthlyDebts: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  // SEO Setup
  useEffect(() => {
    document.title = 'Mortgage Eligibility Quiz | Quick Pre-Approval Check | MortgageLink Canada';
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Take our quick 2-minute mortgage eligibility quiz. Get instant pre-approval results and book a free consultation with our licensed mortgage specialists.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Take our quick 2-minute mortgage eligibility quiz. Get instant pre-approval results and book a free consultation with our licensed mortgage specialists.';
      document.head.appendChild(metaDescription);
    }

    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
    };
  }, []);

  // Load Calendly widget script
  useEffect(() => {
    // Load Calendly widget script if not already loaded
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

  // Validation functions
  const validateAllFields = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.downPayment || formData.downPayment === '') {
      newErrors.downPayment = 'Down payment is required';
    } else {
      const numValue = parseFloat(formData.downPayment.toString().replace(/[,$]/g, ''));
      if (isNaN(numValue) || numValue < 0) {
        newErrors.downPayment = 'Please enter a valid amount';
      }
    }
    
    if (!formData.annualIncome || formData.annualIncome === '') {
      newErrors.annualIncome = 'Annual income is required';
    } else {
      const numValue = parseFloat(formData.annualIncome.toString().replace(/[,$]/g, ''));
      if (isNaN(numValue) || numValue < 0) {
        newErrors.annualIncome = 'Please enter a valid amount';
      }
    }
    
    if (!formData.employmentStatus || formData.employmentStatus === '') {
      newErrors.employmentStatus = 'Employment status is required';
    }
    
    if (!formData.creditScore || formData.creditScore === '') {
      newErrors.creditScore = 'Credit score range is required';
    }
    
    if (!formData.monthlyDebts || formData.monthlyDebts === '') {
      newErrors.monthlyDebts = 'Monthly debt payments are required';
    } else {
      const numValue = parseFloat(formData.monthlyDebts.toString().replace(/[,$]/g, ''));
      if (isNaN(numValue) || numValue < 0) {
        newErrors.monthlyDebts = 'Please enter a valid amount';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateContactInfo = () => {
    const newErrors = { ...errors };
    
    // Only first name and phone are required
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    // Optional email validation (only if provided)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^[\d\s\-()+=]{10,}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Eligibility calculation
  const calculateEligibility = () => {
    const income = parseFloat(formData.annualIncome.toString().replace(/[,$]/g, '')) || 0;
    const monthlyIncome = income / 12;
    const monthlyDebts = parseFloat(formData.monthlyDebts.toString().replace(/[,$]/g, '')) || 0;
    const downPayment = parseFloat(formData.downPayment.toString().replace(/[,$]/g, '')) || 0;
    
    // DTI calculation (simple version)
    const dti = monthlyIncome > 0 ? (monthlyDebts / monthlyIncome) * 100 : 100;
    
    // Credit score check
    const creditScoreValue = formData.creditScore;
    const hasBadCredit = creditScoreValue === '<600';
    
    // Basic eligibility criteria
    const isIncomeAdequate = income >= 30000;
    const isDTIAcceptable = dti <= 44;
    const hasMininumDownPayment = downPayment >= 25000;
    const hasAcceptableCredit = !hasBadCredit;
    const isEmployed = ['full-time', 'self-employed', 'contract'].includes(formData.employmentStatus);
    
    return isIncomeAdequate && isDTIAcceptable && hasMininumDownPayment && hasAcceptableCredit && isEmployed;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (validateAllFields()) {
      // Simulate loading for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Calculate eligibility and show results
      const eligible = calculateEligibility();
      setIsEligible(eligible);
      setShowResults(true);
    }
    
    setIsLoading(false);
  };

  /**
   * Opens Calendly scheduler popup with pre-filled user information
   * @param {Object} user - User data from the quiz form
   */
  const openScheduler = (user) => {
    try {
      // Validate that Calendly is loaded
      if (!window.Calendly) {
        console.error('Calendly widget not loaded');
        // Fallback: open Calendly in new tab
        const calendlyUrl = 'https://calendly.com/janvical15/mortgage-consultation';
        const params = new URLSearchParams({
          name: `${user.firstName} ${user.lastName}`.trim(),
          email: user.email || '',
          first_name: user.firstName,
          last_name: user.lastName || ''
        });
        window.open(`${calendlyUrl}?${params.toString()}`, '_blank');
        return;
      }

      // Prepare pre-filled data for Calendly
      const prefillData = {
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email || '',
        firstName: user.firstName,
        lastName: user.lastName || '',
        // Note: Calendly doesn't support phone pre-fill in popup, but we can track it
      };

      // Open Calendly popup with pre-filled data
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/janvical15/mortgage-consultation', // Replace with your actual Calendly link
        prefill: prefillData,
        utm: {
          utmCampaign: 'mortgage-quiz',
          utmSource: 'website',
          utmMedium: 'quiz'
        }
      });

      // Track the conversion attempt
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'calendly_opened', {
          event_category: 'conversion',
          event_label: 'mortgage_consultation',
          value: 1.0,
          currency: 'CAD'
        });
      }

      console.log('Calendly popup opened with user data:', user);
    } catch (error) {
      console.error('Error opening Calendly scheduler:', error);
      // Fallback: open Calendly in new tab
      const calendlyUrl = 'https://calendly.com/janvical15/mortgage-consultation';
      const params = new URLSearchParams({
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.email || '',
        first_name: user.firstName,
        last_name: user.lastName || ''
      });
      window.open(`${calendlyUrl}?${params.toString()}`, '_blank');
    }
  };

  // Handle consultation booking
  const handleBookConsultation = () => {
    if (validateContactInfo()) {
      // Open Calendly scheduler with user data
      openScheduler(formData);
    }
  };



  // Get progress percentage based on filled fields
  const getProgressPercentage = () => {
    const fields = ['downPayment', 'annualIncome', 'employmentStatus', 'creditScore', 'monthlyDebts'];
    const filledFields = fields.filter(field => formData[field] && formData[field] !== '').length;
    return (filledFields / fields.length) * 100;
  };

  // Render results screen
  const renderResults = () => {
    if (!isEligible) {
      return (
        <div className="text-center space-y-6">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">
              Great News! You're Eligible for Our Programs! 🎉
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Based on your profile, you qualify for our specialized mortgage solutions and personalized improvement programs. We have multiple pathways to help you achieve your homeownership goals!
            </p>
          </div>

          {/* Eligible Programs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#1B5E20] mb-2">Alternative Lending</h4>
              <p className="text-sm text-gray-600">Specialized programs for unique situations</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#1B5E20] mb-2">Credit Improvement</h4>
              <p className="text-sm text-gray-600">Personalized plan to boost your profile</p>
            </div>
            <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#1B5E20] mb-2">Down Payment Help</h4>
              <p className="text-sm text-gray-600">Programs to reduce upfront costs</p>
            </div>
          </div>

          <div className="bg-[#E8F5E8] rounded-lg p-6 max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">
              Claim Your Personalized Mortgage Solution:
            </h3>
            <div className="space-y-4">
              {renderContactForm()}
              <button
                onClick={handleBookConsultation}
                className="w-full bg-[#1B5E20] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#2E7D32] transition-colors"
              >
                Get My Custom Mortgage Plan
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center space-y-6">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-[#1B5E20] mb-4">
            Congratulations! You're Pre-Qualified! 
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Based on your information, you appear to qualify for a mortgage. Let's get you connected with one of our licensed mortgage specialists to explore your options and get the best rates.
          </p>
        </div>

        <div className="bg-[#E8F5E8] rounded-lg p-6 max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">
            Complete your information to book a free consultation:
          </h3>
          <div className="space-y-4">
            {renderContactForm()}
            <button
              onClick={handleBookConsultation}
              className="w-full bg-[#1B5E20] text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-[#2E7D32] transition-colors"
            >
              Book Free Consultation
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500 max-w-md mx-auto">
          <p>🔒 Your information is secure and will only be used to contact you about your mortgage consultation.</p>
        </div>
      </div>
    );
  };

  // Render contact form
  const renderContactForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
              errors.firstName ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name (Optional)"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
              errors.lastName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>
      </div>
      
      <div>
        <input
          type="tel"
          placeholder="Phone Number *"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
            errors.phone ? 'border-red-500' : 'border-gray-300'
          }`}
          required
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
      </div>
      
      <div>
        <input
          type="email"
          placeholder="Email Address (Optional)"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        * Required fields
      </p>
    </div>
  );

  const progressPercentage = showResults ? 100 : getProgressPercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#C8E6C9] py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1B5E20] mb-4">
              {showResults ? 'Your Results' : 'Quick Eligibility Check'}
            </h1>
            <p className="text-lg text-[#2E7D32] max-w-2xl mx-auto">
              {showResults 
                ? 'See if you qualify for a mortgage!' 
                : 'You may qualify for a mortgage! Complete the form below to find out in just 2 minutes.'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {!showResults && (
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Completion Progress</span>
              <span className="text-sm text-[#2E7D32] font-medium">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#1B5E20] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {showResults ? renderResults() : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#1B5E20] mb-2">
                  Tell us about your financial situation
                </h2>
                <p className="text-gray-600">
                  All fields are required to get an accurate eligibility assessment
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Down Payment Available
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', e.target.value)}
                      className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
                        errors.downPayment ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="50,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Minimum 5% of home price is typically required</p>
                  {errors.downPayment && <p className="text-red-500 text-sm mt-1">{errors.downPayment}</p>}
                </div>

                {/* Annual Income */}
                <div>
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Annual Household Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={formData.annualIncome}
                      onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                      className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
                        errors.annualIncome ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="75,000"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Include all sources of income before taxes</p>
                  {errors.annualIncome && <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>}
                </div>

                {/* Employment Status */}
                <div>
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Employment Status
                  </label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) => handleInputChange('employmentStatus', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
                      errors.employmentStatus ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Please select...</option>
                    <option value="full-time">Full-time Employee</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="part-time">Part-time Employee</option>
                    <option value="contract">Contract Worker</option>
                    <option value="retired">Retired</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.employmentStatus && <p className="text-red-500 text-sm mt-1">{errors.employmentStatus}</p>}
                </div>

                {/* Credit Score */}
                <div>
                  <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                    Credit Score Range
                  </label>
                  <select
                    value={formData.creditScore}
                    onChange={(e) => handleInputChange('creditScore', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
                      errors.creditScore ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Please select...</option>
                    <option value="750+">Excellent (750+)</option>
                    <option value="700-749">Good (700-749)</option>
                    <option value="650-699">Fair (650-699)</option>
                    <option value="600-649">Poor (600-649)</option>
                    <option value="<600">Very Poor (&lt;600)</option>
                    <option value="unknown">I don't know</option>
                  </select>
                  {errors.creditScore && <p className="text-red-500 text-sm mt-1">{errors.creditScore}</p>}
                </div>
              </div>

              {/* Monthly Debts - Full Width */}
              <div>
                <label className="block text-sm font-medium text-[#1B5E20] mb-2">
                  Monthly Debt Payments
                </label>
                <div className="relative max-w-md">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="text"
                    value={formData.monthlyDebts}
                    onChange={(e) => handleInputChange('monthlyDebts', e.target.value)}
                    className={`w-full pl-8 pr-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] ${
                      errors.monthlyDebts ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="500"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Include credit cards, car loans, student loans, etc.</p>
                {errors.monthlyDebts && <p className="text-red-500 text-sm mt-1">{errors.monthlyDebts}</p>}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg ${
                    isLoading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-[#1B5E20] hover:bg-[#2E7D32] text-white'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Checking Eligibility...
                    </div>
                  ) : (
                    'Check My Eligibility →'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white border-t py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-[#1B5E20]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">100% Secure & Confidential</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-[#1B5E20]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">FSRA Licensed Brokers</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5 text-[#1B5E20]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-sm text-gray-600">Free Consultation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EligibilityQuiz;