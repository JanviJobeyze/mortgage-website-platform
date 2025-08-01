import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { ResultCard } from '../components';
import { calculateEligibility } from '../utils/mortgageCalculations';

function Results() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adviceForm, setAdviceForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const speechRef = useRef(null);

  // Mock data - in real app, this would come from the quiz results
  const mockInputs = {
    annualIncome: '75000',
    creditScore: '720'
  };
  
  // Calculate eligibility
  const eligibility = calculateEligibility(mockInputs);
  
  const handleBookConsultation = () => {
    // Custom consultation booking logic
    console.log('Booking consultation...');
    // You can integrate with your booking system here
  };

  const handleGetPersonalizedAdvice = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setAdviceForm({ name: '', email: '', phone: '' });
  };

  const handleAdviceFormSubmit = (e) => {
    e.preventDefault();
    console.log('Advice form submitted:', adviceForm);
    // Here you would typically send the data to your backend
    alert('Thank you! A mortgage specialist will contact you within 24 hours.');
    handleCloseModal();
  };

  const handleAdviceFormChange = (field, value) => {
    setAdviceForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpeakResult = () => {
    // Cancel any existing speech
    if (speechRef.current) {
      window.speechSynthesis.cancel();
    }

    const resultText = `You may qualify for a mortgage of up to ${eligibility.formatted}.`;
    
    const utterance = new SpeechSynthesisUtterance(resultText);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to get a Canadian English voice
    const voices = window.speechSynthesis.getVoices();
    const canadianVoice = voices.find(voice =>
      voice.lang.includes('en-CA') ||
      voice.lang.includes('en-US') ||
      voice.lang.includes('en-GB')
    );
    
    if (canadianVoice) {
      utterance.voice = canadianVoice;
    }
    
    utterance.onstart = () => {
      setIsSpeaking(true);
      speechRef.current = utterance;
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      speechRef.current = null;
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      speechRef.current = null;
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    speechRef.current = null;
  };

  return (
    <>
      <Helmet>
        <title>Your Mortgage Pre-Qualification Results – Canada</title>
        <meta name="description" content="View your personalized mortgage pre-qualification results and book a free consultation." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1B5E20] mb-4">
              Your Pre-Qualification Results
            </h1>
            <p className="text-gray-600 text-lg">
              Congratulations! Here's what you may qualify for.
            </p>
          </div>

          {/* Result Card */}
          <div className="max-w-2xl mx-auto">
            <ResultCard 
              estimatedAmount={eligibility.formatted}
              onBookConsultation={handleBookConsultation}
            />
            
            {/* Hear Result Button */}
            <div className="mt-6 text-center">
              <button
                onClick={isSpeaking ? handleStopSpeaking : handleSpeakResult}
                className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSpeaking
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500'
                    : 'bg-[#1B5E20] text-white hover:bg-[#2E7D32] focus:ring-[#1B5E20]'
                } shadow-md hover:shadow-lg transform hover:-translate-y-0.5`}
                aria-label={isSpeaking ? 'Stop reading result' : 'Hear my result'}
                title={isSpeaking ? 'Stop reading result' : 'Hear my result'}
              >
                <span className="text-lg mr-2">
                  {isSpeaking ? '⏹️' : '🔊'}
                </span>
                <span className="text-sm sm:text-base">
                  {isSpeaking ? 'Stop Reading' : 'Hear My Result'}
                </span>
              </button>
              <p className="text-xs text-gray-500 mt-2">
                {isSpeaking ? 'Click to stop' : 'Click to hear your qualification result'}
              </p>
            </div>
            
            {/* Eligibility Details */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-[#1B5E20] mb-3">
                Your Qualification Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Qualification Tier:</span>
                  <span className="ml-2 font-semibold text-[#1B5E20]">{eligibility.tier}</span>
                </div>
                <div>
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="ml-2 font-semibold">${parseInt(mockInputs.annualIncome).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-600">Credit Score:</span>
                  <span className="ml-2 font-semibold">{mockInputs.creditScore}</span>
                </div>
                <div>
                  <span className="text-gray-600">Max Loan Amount:</span>
                  <span className="ml-2 font-semibold text-[#1B5E20]">{eligibility.formatted}</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Requirements for this tier:</h4>
                <div className="text-sm text-gray-600">
                  <p>• Income: {eligibility.requirements.income}</p>
                  <p>• Credit Score: {eligibility.requirements.creditScore}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3 italic">
                {eligibility.description}
              </p>
            </div>
            
            {/* Disclaimer and Personalized Advice */}
            <div className="mt-6 bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <p className="text-xs text-gray-500 mb-4 italic">
                  *This is not a formal mortgage approval. Rates and terms may vary.
                </p>
                <button
                  onClick={handleGetPersonalizedAdvice}
                  className="bg-[#FF6F00] hover:bg-[#E65100] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF6F00] focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get Personalized Advice
                </button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-[#1B5E20] mb-4">
                What's Next?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Free Consultation</h3>
                  <p className="text-gray-600 text-sm">
                    Schedule a free consultation with our mortgage specialists to discuss your options and get personalized advice.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Document Preparation</h3>
                  <p className="text-gray-600 text-sm">
                    We'll help you gather the necessary documents for your mortgage application process.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Rate Comparison</h3>
                  <p className="text-gray-600 text-sm">
                    Compare rates from multiple lenders to ensure you get the best possible terms.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Application Support</h3>
                  <p className="text-gray-600 text-sm">
                    Get expert guidance throughout the entire mortgage application and approval process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Advice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#1B5E20]">
                Get Personalized Advice
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleAdviceFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={adviceForm.name}
                  onChange={(e) => handleAdviceFormChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={adviceForm.email}
                  onChange={(e) => handleAdviceFormChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={adviceForm.phone}
                  onChange={(e) => handleAdviceFormChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-800">
                  <strong>What happens next:</strong> A mortgage specialist will review your information and contact you within 24 hours to discuss your personalized mortgage options.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#1B5E20] hover:bg-[#2E7D32] text-white px-4 py-3 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Results; 