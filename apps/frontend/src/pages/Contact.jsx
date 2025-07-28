import React, { useState, useEffect } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phoneNumber: '(416) 555-0123',
    inquiryType: '',
    preferredLanguage: 'English',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  // SEO Metadata
  useEffect(() => {
    document.title = 'Contact Our Mortgage Advisors | MortgageLink Canada';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reach out to licensed mortgage brokers for personalized assistance. Visit us, call, or send a message today. Get expert mortgage advice from our Toronto and Vancouver offices.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Reach out to licensed mortgage brokers for personalized assistance. Visit us, call, or send a message today. Get expert mortgage advice from our Toronto and Vancouver offices.';
      document.head.appendChild(newMetaDescription);
    }

    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        inquiryType: '',
        preferredLanguage: 'English',
        message: ''
      });
      setConsent(false);
    } catch {
      // Handle error silently
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] mb-4 sm:mb-6">
              Get in Touch
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed">
              Ready to start your mortgage journey? Our multilingual team of licensed professionals is here to help you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Call Us */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-xl font-bold text-[#1B5E20] mb-1">1-800-MORTGAGE</p>
              <p className="text-sm text-gray-600">Mon-Fri: 8AM-8PM EST</p>
            </div>

            {/* Email Us */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-lg font-medium text-[#1B5E20] mb-1">info@mortgagelink.ca</p>
              <p className="text-sm text-gray-600">24-hour response</p>
            </div>

            {/* Live Chat */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 bg-[#FF6F00] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-lg font-medium text-[#FF6F00] mb-1">Start Chat</p>
              <p className="text-sm text-gray-600">Available now</p>
            </div>

            {/* Follow Us */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
              <div className="flex justify-center space-x-2">
                <svg className="w-6 h-6 text-[#1B5E20]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <svg className="w-6 h-6 text-[#1B5E20]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Two Column Layout */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                  Fill out the form below and we'll get back to you within 24 hours. All fields marked with * are required.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* First Name */}
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type *
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="home-purchase">Home Purchase</option>
                      <option value="refinancing">Refinancing</option>
                      <option value="home-equity">Home Equity</option>
                      <option value="first-time-buyer">First-Time Buyer</option>
                      <option value="general-inquiry">General Inquiry</option>
                    </select>
                  </div>

                  {/* Preferred Language */}
                  <div>
                    <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Language
                    </label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                    >
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Punjabi">Punjabi</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Gujarati">Gujarati</option>
                      <option value="Mandarin">Mandarin</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your mortgage needs, timeline, and any specific questions you have..."
                      rows={4}
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm resize-vertical"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 text-[#1B5E20] focus:ring-[#1B5E20] border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700">
                      I consent to MortgageLink Canada collecting and using my personal information to respond to my inquiry and provide mortgage services. I understand I can withdraw consent at any time.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!consent || isSubmitting}
                    className={`w-full py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium ${
                      consent && !isSubmitting
                        ? 'bg-[#1B5E20] text-white hover:bg-[#2E7D32]' 
                        : 'bg-[#E0E0E0] text-[#757575] cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {/* Response Time */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Typical response time: Within 4 hours during business hours</span>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Office Locations */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Office Locations
                </h2>
                <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                  Visit us in person or schedule a virtual consultation. We're here to help across Canada.
                </p>
                
                {/* Interactive Map */}
                <div className="rounded-lg h-48 mb-6 overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2685814407847!2d-79.3788!3d43.6532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4e477!2s123%20Bay%20St%2C%20Toronto%2C%20ON%20M5H%202Y2%2C%20Canada!5e0!3m2!1sen!2sca!4v1640995200000!5m2!1sen!2sca"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MortgageLink Canada - Toronto Office"
                  ></iframe>
                </div>

                {/* Toronto Office */}
                <div className="border-l-4 border-[#1B5E20] pl-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#1B5E20] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Toronto Office (Head Office)</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>123 Bay Street, Suite 1000</p>
                        <p>Toronto, ON M5H 2Y2</p>
                        <p className="font-semibold text-[#1B5E20]">(416) 555-0100</p>
                        <p>Mon-Fri: 8:00 AM - 8:00 PM EST</p>
                        <p className="text-xs text-gray-500 mt-2">Languages: English, French, Punjabi, Hindi, Gujarati</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vancouver Office */}
                <div className="border-l-4 border-[#2E7D32] pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Vancouver Office</h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>456 Granville Street, Suite 800</p>
                        <p>Vancouver, BC V6C 1V5</p>
                        <p className="font-semibold text-[#2E7D32]">(604) 555-0200</p>
                        <p>Mon-Fri: 8:00 AM - 6:00 PM PST</p>
                        <p className="text-xs text-gray-500 mt-2">Languages: English, Punjabi, Hindi, Mandarin</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licensed & Regulated Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Licensed & Regulated
            </h2>
            <p className="text-lg text-gray-600">
              Our professional credentials and regulatory compliance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* FSRA Licensed */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">FSRA Licensed</h3>
              <p className="text-sm text-gray-600 mb-2">
                Licensed mortgage brokerage under the Financial Services Regulatory Authority of Ontario (FSRA)
              </p>
              <p className="text-sm font-semibold text-[#1B5E20]">License #: MB-2024-001234</p>
            </div>

            {/* BCFSA Registered */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">BCFSA Registered</h3>
              <p className="text-sm text-gray-600 mb-2">
                Registered mortgage broker with BC Financial Services Authority (BCFSA)
              </p>
              <p className="text-sm font-semibold text-[#1B5E20]">Registration #: BC-2024-005678</p>
            </div>

            {/* Professional Member */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Member</h3>
              <p className="text-sm text-gray-600 mb-2">
                Member of Canadian Association of Mortgage Professionals (CAMP)
              </p>
              <p className="text-sm font-semibold text-[#1B5E20]">Member ID: CAMP-2024-9876</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Answers Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Quick Answers
            </h2>
            <p className="text-lg text-gray-600">
              Common questions answered instantly
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Current Rates */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are today's best mortgage rates?</h3>
            </div>

            {/* Qualification */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much can I qualify for?</h3>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does approval take?</h3>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What documents do I need?</h3>
            </div>

            {/* First-Time Buyers */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special programs available?</h3>
            </div>

            {/* Refinancing */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">When should I refinance?</h3>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button className="bg-[#1B5E20] text-white px-8 py-3 rounded-md hover:bg-[#2E7D32] transition-colors duration-200 font-medium">
              View All FAQs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact; 