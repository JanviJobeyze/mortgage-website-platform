import React, { useState } from 'react';

const ResultCard = ({ 
  estimatedAmount = "$450,000",
  onBookConsultation,
  className = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookConsultation = () => {
    if (onBookConsultation) {
      onBookConsultation();
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 sm:p-8 ${className}`}>
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-2">
            You May Qualify for up to:
          </h2>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B5E20] mb-4">
            {estimatedAmount}
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
            Based on your answers, here's your estimated mortgage range.
          </p>
        </div>

        {/* Features List */}
        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-[#1B5E20] mb-3 text-sm sm:text-base">What this means:</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Pre-qualified for mortgage approval
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Competitive rates available
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No obligation consultation
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Expert guidance throughout the process
            </li>
          </ul>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <button
            onClick={handleBookConsultation}
            className="w-full bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-base sm:text-lg"
          >
            Book a Free Consultation
          </button>
          <p className="text-xs text-gray-500 mt-3">
            No credit check required • No obligation
          </p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#1B5E20]">Book Your Free Consultation</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent"
                  placeholder="Your phone number"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent">
                  <option value="">Select a time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                </select>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#1B5E20] text-white rounded-md hover:bg-[#2E7D32] transition-colors"
                >
                  Book Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultCard; 