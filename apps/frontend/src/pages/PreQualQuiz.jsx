import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import { calculateEligibility, getEligibilityStatus, formatCurrency } from '../utils/eligibilityEngine';
import { trackQuizCompletion, trackEvent } from '../utils/analytics';

function PreQualQuiz() {
  const navigate = useNavigate();
  const { t } = useTranslation('prequalquiz');
  
  // SEO Metadata
  useEffect(() => {
    // Update page title
    document.title = 'Mortgage Pre-Qualification Quiz | Check Eligibility | MortgageLink Canada';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Take our free mortgage pre-qualification quiz to check your eligibility. Get instant results and see how much you can afford. Licensed mortgage brokers across Canada.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Take our free mortgage pre-qualification quiz to check your eligibility. Get instant results and see how much you can afford. Licensed mortgage brokers across Canada.';
      document.head.appendChild(metaDescription);
    }

    // Add or update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mortgage pre-qualification, mortgage eligibility, mortgage calculator, pre-approval quiz, mortgage broker Canada, FSRA licensed');
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'mortgage pre-qualification, mortgage eligibility, mortgage calculator, pre-approval quiz, mortgage broker Canada, FSRA licensed';
      document.head.appendChild(metaKeywords);
    }

    // Add or update author
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (metaAuthor) {
      metaAuthor.setAttribute('content', 'MortgageLink Canada');
    } else {
      metaAuthor = document.createElement('meta');
      metaAuthor.name = 'author';
      metaAuthor.content = 'MortgageLink Canada';
      document.head.appendChild(metaAuthor);
    }

    // Add or update robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'index, follow');
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      metaRobots.content = 'index, follow';
      document.head.appendChild(metaRobots);
    }

    // Add Open Graph tags
    const ogTags = [
      { property: 'og:title', content: 'Mortgage Pre-Qualification Quiz | Check Eligibility | MortgageLink Canada' },
      { property: 'og:description', content: 'Take our free mortgage pre-qualification quiz to check your eligibility. Get instant results and see how much you can afford.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://mortgagelink.ca/pre-qualify' },
      { property: 'og:site_name', content: 'MortgageLink Canada' }
    ];

    ogTags.forEach(tag => {
      let ogTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (ogTag) {
        ogTag.setAttribute('content', tag.content);
      } else {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', tag.property);
        ogTag.setAttribute('content', tag.content);
        document.head.appendChild(ogTag);
      }
    });

    // Add Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Mortgage Pre-Qualification Quiz | Check Eligibility | MortgageLink Canada' },
      { name: 'twitter:description', content: 'Take our free mortgage pre-qualification quiz to check your eligibility. Get instant results and see how much you can afford.' }
    ];

    twitterTags.forEach(tag => {
      let twitterTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute('content', tag.content);
      } else {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', tag.name);
        twitterTag.setAttribute('content', tag.content);
        document.head.appendChild(twitterTag);
      }
    });

    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
    };
  }, []);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [eligibilityResults, setEligibilityResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [quizStartTime] = useState(Date.now());
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    annualIncome: '',
    employmentStatus: '',
    creditScore: '',
    downPayment: '',
    monthlyDebts: ''
  });
  
  // Total number of steps in the quiz
  const totalSteps = 5;
  
  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Form update handler
  const handleFormUpdate = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Validation function
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return formData.firstName.trim() && formData.lastName.trim() && formData.email.trim();
      case 2: return formData.annualIncome.trim() && formData.employmentStatus && formData.creditScore;
      case 3: return formData.downPayment.trim() && formData.monthlyDebts.trim();
      case 4: return true;
      default: return false;
    }
  };
  
  // Handle final step (Get Results)
  const handleGetResults = async () => {
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    setTimeout(async () => {
      const results = calculateEligibility(formData);
      setEligibilityResults(results);
      setIsCalculating(false);
      
      // Submit results to backend
      await submitQuizResults(results);
    }, 1500);
  };
  
  // Submit quiz results to backend
  const submitQuizResults = async (results) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitMessage('');
    
    try {
              const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          annualIncome: formData.annualIncome,
          employmentStatus: formData.employmentStatus,
          creditScore: formData.creditScore,
          downPayment: formData.downPayment,
          monthlyDebts: formData.monthlyDebts,
          eligible: results.eligible,
          maxLoanAmount: results.maxLoanAmount,
          confidence: results.confidence,
          reason: results.reason,
          recommendations: results.recommendations
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Thanks! We\'ll be in touch with your personalized mortgage options within 24 hours.');
        
        // Track quiz completion
        const quizDuration = Math.round((Date.now() - quizStartTime) / 1000);
        trackQuizCompletion('mortgage_pre_qualification', results.confidence, quizDuration);
        trackEvent('quiz_complete', {
          quiz_type: 'mortgage_pre_qualification',
          score: results.confidence,
          duration_seconds: quizDuration,
          eligible: results.eligible,
          max_loan_amount: results.maxLoanAmount,
          employment_status: formData.employmentStatus,
          credit_score: formData.creditScore,
          page_location: window.location.pathname
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.error || 'Failed to submit results. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector - Mobile optimized */}
        <div className="flex justify-end mb-3 sm:mb-4 md:mb-6">
          <div className="w-full sm:w-auto">
            <LanguageSelector />
          </div>
        </div>
        
        {/* Header - Responsive typography */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1B5E20] mb-2 sm:mb-3 md:mb-4 leading-tight">
            {t('title')}
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 px-2 sm:px-0 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
        
        {/* Progress Bar - Mobile optimized */}
        <div className="mb-4 sm:mb-6 md:mb-8 px-2 sm:px-0">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#1B5E20]">
              {Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Step Content - Responsive card */}
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6 lg:p-8 mx-2 sm:mx-0">
          {currentStep === 0 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1B5E20] mb-3 sm:mb-4">
                {t('welcome.title')}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t('welcome.description')}
              </p>
              
              {/* Requirements Box - Mobile stacked */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-[#1B5E20] mb-2 sm:mb-3 text-sm sm:text-base">
                  {t('welcome.requirementsTitle')}
                </h3>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                  {t('welcome.requirements', { returnObjects: true }).map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-0.5">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Privacy Note - Mobile optimized */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {t('welcome.privacyNote')}
                </p>
              </div>
            </div>
          )}
          
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1B5E20] mb-3 sm:mb-4">
                {t('personalInfo.title')}
              </h2>
              
              {/* Form Grid - Mobile stacked, tablet 2 columns, desktop 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('personalInfo.firstName')}
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleFormUpdate('firstName', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                    placeholder={t('personalInfo.firstNamePlaceholder')}
                  />
                </div>
                
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('personalInfo.lastName')}
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleFormUpdate('lastName', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                    placeholder={t('personalInfo.lastNamePlaceholder')}
                  />
                </div>
                
                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('personalInfo.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFormUpdate('email', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                    placeholder={t('personalInfo.emailPlaceholder')}
                  />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1B5E20] mb-3 sm:mb-4">
                {t('financialInfo.title')}
              </h2>
              
              {/* Financial Info Grid - Mobile stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('financialInfo.annualIncome')}
                  </label>
                  <input
                    type="number"
                    value={formData.annualIncome}
                    onChange={(e) => handleFormUpdate('annualIncome', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                    placeholder={t('financialInfo.annualIncomePlaceholder')}
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('financialInfo.employmentStatus')}
                  </label>
                  <select
                    value={formData.employmentStatus}
                    onChange={(e) => handleFormUpdate('employmentStatus', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                  >
                    <option value="">Select employment status</option>
                    <option value="fullTime">{t('financialInfo.employmentOptions.fullTime')}</option>
                    <option value="partTime">{t('financialInfo.employmentOptions.partTime')}</option>
                    <option value="selfEmployed">{t('financialInfo.employmentOptions.selfEmployed')}</option>
                    <option value="contractor">{t('financialInfo.employmentOptions.contractor')}</option>
                    <option value="retired">{t('financialInfo.employmentOptions.retired')}</option>
                  </select>
                </div>
                
                <div className="lg:col-span-2">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('financialInfo.creditScore')}
                  </label>
                  <select
                    value={formData.creditScore}
                    onChange={(e) => handleFormUpdate('creditScore', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                  >
                    <option value="">Select credit score range</option>
                    <option value="excellent">{t('financialInfo.creditScoreOptions.excellent')}</option>
                    <option value="good">{t('financialInfo.creditScoreOptions.good')}</option>
                    <option value="fair">{t('financialInfo.creditScoreOptions.fair')}</option>
                    <option value="poor">{t('financialInfo.creditScoreOptions.poor')}</option>
                    <option value="veryPoor">{t('financialInfo.creditScoreOptions.veryPoor')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1B5E20] mb-3 sm:mb-4">
                {t('propertyInfo.title')}
              </h2>
              
              {/* Property Info Grid - Mobile stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('propertyInfo.downPayment')}
                  </label>
                  <input
                    type="number"
                    value={formData.downPayment}
                    onChange={(e) => handleFormUpdate('downPayment', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                    placeholder={t('propertyInfo.downPaymentPlaceholder')}
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    {t('propertyInfo.monthlyDebts')}
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyDebts}
                    onChange={(e) => handleFormUpdate('monthlyDebts', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors"
                    placeholder={t('propertyInfo.monthlyDebtsPlaceholder')}
                  />
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {t('propertyInfo.debtNote')}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1B5E20] mb-3 sm:mb-4">
                {t('review.title')}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {t('review.description')}
              </p>
              
              {/* Review Info - Mobile optimized */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-[#1B5E20] mb-3 text-sm sm:text-base">
                  {t('review.yourInfo')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium">{t('review.fields.name')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900">{formData.firstName} {formData.lastName}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium">{t('review.fields.email')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900 break-all">{formData.email}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium">{t('review.fields.annualIncome')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900">${formData.annualIncome}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium">{t('review.fields.employment')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900">{formData.employmentStatus}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium">{t('review.fields.creditScore')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900">{formData.creditScore}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-600 font-medium">{t('review.fields.downPayment')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900">${formData.downPayment}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:col-span-2">
                    <span className="text-gray-600 font-medium">{t('review.fields.monthlyDebts')}</span>
                    <span className="ml-0 sm:ml-2 font-medium text-gray-900">${formData.monthlyDebts}</span>
                  </div>
                </div>
              </div>
              
              {/* Next Steps - Mobile optimized */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                <h3 className="font-semibold text-[#1B5E20] mb-2 sm:mb-3 text-sm sm:text-base">
                  {t('review.nextStepsTitle')}
                </h3>
                <ul className="text-xs sm:text-sm text-gray-700 space-y-1 sm:space-y-2">
                  {t('review.nextSteps', { returnObjects: true }).map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2 mt-0.5">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Eligibility Results - Responsive grid */}
          {eligibilityResults && (
            <div className="mt-4 sm:mt-6 border-t border-gray-200 pt-4 sm:pt-6">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#1B5E20] mb-3 sm:mb-4">
                Your Eligibility Results
              </h3>
              
              {eligibilityResults.eligible ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 md:p-6">
                  {/* Status Header */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3 ${
                      eligibilityResults.confidence === 'high' ? 'bg-green-500' :
                      eligibilityResults.confidence === 'medium' ? 'bg-yellow-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="font-semibold text-green-800 text-sm sm:text-base">
                      {getEligibilityStatus(eligibilityResults)}
                    </span>
                  </div>
                  
                  {/* Results Grid - Mobile stacked, tablet 2 columns, desktop 4 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="text-xs sm:text-sm text-gray-600 mb-1">Maximum Loan Amount</div>
                      <div className="text-lg sm:text-xl font-bold text-[#1B5E20] break-words">
                        {formatCurrency(eligibilityResults.maxLoanAmount)}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="text-xs sm:text-sm text-gray-600 mb-1">Maximum Purchase Price</div>
                      <div className="text-lg sm:text-xl font-bold text-[#1B5E20] break-words">
                        {formatCurrency(eligibilityResults.maxPurchasePrice)}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="text-xs sm:text-sm text-gray-600 mb-1">Estimated Monthly Payment</div>
                      <div className="text-lg sm:text-xl font-bold text-[#1B5E20] break-words">
                        {formatCurrency(eligibilityResults.monthlyPayment)}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-2 sm:p-3">
                      <div className="text-xs sm:text-sm text-gray-600 mb-1">Debt-to-Income Ratio</div>
                      <div className="text-lg sm:text-xl font-bold text-[#1B5E20]">
                        {(eligibilityResults.dtiRatio * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommendations - Mobile optimized */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">Recommendations:</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1 sm:space-y-2">
                      {eligibilityResults.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 md:p-6">
                  {/* Status Header */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500 mr-2 sm:mr-3"></div>
                    <span className="font-semibold text-red-800 text-sm sm:text-base">Not Eligible</span>
                  </div>
                  
                  {/* Reason */}
                  <div className="text-red-700 mb-3 sm:mb-4 text-sm sm:text-base">
                    <strong>Reason:</strong> {eligibilityResults.reason}
                  </div>
                  
                  {/* Recommendations */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                    <h4 className="font-semibold text-blue-800 mb-2 sm:mb-3 text-sm sm:text-base">Recommendations:</h4>
                    <ul className="text-xs sm:text-sm text-blue-700 space-y-1 sm:space-y-2">
                      {eligibilityResults.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-600 mr-2 mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Action Button */}
              <div className="flex justify-center mt-4 sm:mt-6">
                <button
                  onClick={() => navigate('/results')}
                  className="w-full sm:w-auto bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 text-sm sm:text-base"
                >
                  Get Detailed Results
                </button>
              </div>
              
              {/* Submission Status */}
              {submitStatus && (
                <div className={`mt-4 p-4 rounded-lg ${
                  submitStatus === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-800' 
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center">
                    {submitStatus === 'success' ? (
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className="font-medium">{submitMessage}</span>
                  </div>
                </div>
              )}
              
              {/* Loading indicator for submission */}
              {isSubmitting && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    <span>Submitting your results...</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation Buttons - Mobile optimized */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-8 px-2 sm:px-0">
          <button
            onClick={currentStep === 0 ? () => navigate(-1) : prevStep}
            disabled={currentStep === 0 && false}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {currentStep === 0 ? '← Back to Previous Page' : '← Previous Step'}
          </button>
          
          <div className="flex w-full sm:w-auto gap-3">
            {currentStep < totalSteps - 1 ? (
              <button
                onClick={nextStep}
                disabled={!isCurrentStepValid()}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 text-sm sm:text-base ${
                  !isCurrentStepValid()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1B5E20] hover:bg-[#2E7D32] text-white'
                }`}
              >
                {t('navigation.next')}
              </button>
            ) : (
              <button
                onClick={handleGetResults}
                disabled={isCalculating}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 text-sm sm:text-base ${
                  isCalculating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1B5E20] hover:bg-[#2E7D32] text-white'
                }`}
              >
                {isCalculating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                    <span className="text-xs sm:text-sm">Calculating...</span>
                  </div>
                ) : (
                  t('navigation.getResults')
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* Step Indicators - Mobile optimized */}
        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-1 sm:space-x-2 px-2 sm:px-0">
          {Array.from({ length: totalSteps }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentStep
                  ? 'bg-[#1B5E20]'
                  : index < currentStep
                  ? 'bg-[#4CAF50]'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PreQualQuiz; 