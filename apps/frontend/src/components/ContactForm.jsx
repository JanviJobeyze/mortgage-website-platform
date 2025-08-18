import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { trackContactSubmission, trackEvent } from '../utils/analytics';

function ContactForm({ 
  title = "Send Us a Message", 
  subtitle = "Fill out the form below and we'll get back to you within 24 hours. All fields marked with * are required.",
  showToaster = true,
  customFields = {},
  onSuccess = null
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    preferredLanguage: 'English',
    message: '',
    ...customFields
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.firstName.trim()) errors.push('First name is required');
    if (!formData.lastName.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!formData.serviceInterest) errors.push('Service interest is required');
    if (!formData.message.trim()) errors.push('Message is required');
    if (!consent) errors.push('Consent is required');
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/[\s\-()]/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          subject: `Service Inquiry: ${formData.serviceInterest}`,
          message: formData.message,
          serviceInterest: formData.serviceInterest,
          preferredLanguage: formData.preferredLanguage,
          ...customFields
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
        
        // Track contact form submission
        trackContactSubmission('contact_form');
        trackEvent('contact_submit', {
          contact_method: 'contact_form',
          service_interest: formData.serviceInterest,
          preferred_language: formData.preferredLanguage,
          has_consent: consent,
          page_location: window.location.pathname
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          serviceInterest: '',
          preferredLanguage: 'English',
          message: '',
          ...customFields
        });
        setConsent(false);
        
        // Call custom success handler if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {showToaster && (
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 5000,
              iconTheme: {
                primary: '#4CAF50',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#f44336',
                secondary: '#fff',
              },
            },
          }}
        />
      )}
      
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-10">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1B5E20] mb-4">{title}</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-6">{subtitle}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" role="form" aria-label="Contact form">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-[#1B5E20] mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] text-sm sm:text-base lg:text-lg"
                placeholder="Enter your first name"
              />
            </div>
            
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-[#1B5E20] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] text-sm sm:text-base lg:text-lg"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1B5E20] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] text-sm sm:text-base lg:text-lg"
                placeholder="your.email@example.com"
              />
            </div>
            
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#1B5E20] mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] text-sm sm:text-base lg:text-lg"
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Service and Language Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Service Interest */}
            <div>
              <label htmlFor="serviceInterest" className="block text-sm font-medium text-[#1B5E20] mb-2">
                Service Interest *
              </label>
              <select
                id="serviceInterest"
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleInputChange}
                required
                aria-required="true"
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] appearance-none text-sm sm:text-base lg:text-lg"
                style={{backgroundColor: '#F5F5F5'}}
              >
                <option value="">Select a service</option>
                <option value="Home Purchase">Home Purchase</option>
                <option value="Refinancing">Refinancing</option>
                <option value="Home Equity">Home Equity</option>
                <option value="First Time Home Buyer">First Time Home Buyer</option>
                <option value="Investment Property">Investment Property</option>
                <option value="Commercial Mortgage">Commercial Mortgage</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Preferred Language */}
            <div>
              <label htmlFor="preferredLanguage" className="block text-sm font-medium text-[#1B5E20] mb-2">
                Preferred Language
              </label>
              <select
                id="preferredLanguage"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] appearance-none text-sm sm:text-base lg:text-lg"
                style={{backgroundColor: '#F5F5F5'}}
              >
                <option value="English">English</option>
                <option value="French">French</option>
                <option value="Mandarin">Mandarin</option>
                <option value="Gujarati">Gujarati</option>
                <option value="Hindi">Hindi</option>
                <option value="Punjabi">Punjabi</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1B5E20] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] resize-none text-sm sm:text-base lg:text-lg"
              placeholder="Tell us about your mortgage needs or any questions you have..."
            />
          </div>

          {/* Consent Checkbox */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                aria-required="true"
                className="mt-1 mr-2 sm:mr-3 lg:mr-4 h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-[#2E7D32] focus:ring-[#2E7D32] border-gray-300 rounded"
              />
              <span className="text-xs sm:text-sm lg:text-base text-gray-600">
                I consent to being contacted by MortgageLink Canada regarding my mortgage inquiry *
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!consent || isSubmitting}
            className={`w-full py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-white transition-colors duration-200 mb-4 sm:mb-6 lg:mb-8 text-sm sm:text-base lg:text-lg ${
              consent && !isSubmitting
                ? 'bg-[#2E7D32] hover:bg-[#1B5E20] shadow-lg hover:shadow-xl'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onMouseOver={(e) => {
              if (consent && !isSubmitting) {
                e.target.style.backgroundColor = '#1B5E20';
              }
            }}
            onMouseOut={(e) => {
              if (consent && !isSubmitting) {
                e.target.style.backgroundColor = '#2E7D32';
              }
            }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending...</span>
              </div>
            ) : (
              'Request Consultation'
            )}
          </button>

          {/* Contact Info */}
          <div className="text-center">
            <p className="text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 lg:mb-4 text-gray-600">Or contact us directly</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm lg:text-base">
              <div className="flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2 lg:mr-3 text-[#2E7D32]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-[#2E7D32]">1-800-MORTGAGE</span>
              </div>
              <div className="flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 mr-1 sm:mr-2 lg:mr-3 text-[#2E7D32]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-[#2E7D32]">info@mortgagelink.ca</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default ContactForm;
