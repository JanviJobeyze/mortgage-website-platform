import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { trackContactSubmission, trackEvent } from '../utils/analytics';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consent, setConsent] = useState(false);

  // SEO Metadata
  useEffect(() => {
    // Update page title
    document.title = 'Contact Our Mortgage Advisors | Get Expert Help | MortgageLink Canada';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Reach out to licensed mortgage brokers for personalized assistance. Visit us, call, or send a message today. Get expert mortgage advice from our Toronto and Vancouver offices. FSRA licensed across Canada.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Reach out to licensed mortgage brokers for personalized assistance. Visit us, call, or send a message today. Get expert mortgage advice from our Toronto and Vancouver offices. FSRA licensed across Canada.';
      document.head.appendChild(metaDescription);
    }

    // Add or update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'contact mortgage broker, mortgage advisor, mortgage help, mortgage consultation, mortgage broker Toronto, mortgage broker Vancouver, FSRA licensed');
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'contact mortgage broker, mortgage advisor, mortgage help, mortgage consultation, mortgage broker Toronto, mortgage broker Vancouver, FSRA licensed';
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
      { property: 'og:title', content: 'Contact Our Mortgage Advisors | Get Expert Help | MortgageLink Canada' },
      { property: 'og:description', content: 'Reach out to licensed mortgage brokers for personalized assistance. Visit us, call, or send a message today. Get expert mortgage advice from our Toronto and Vancouver offices.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://mortgagelink.ca/contact' },
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
      { name: 'twitter:title', content: 'Contact Our Mortgage Advisors | Get Expert Help | MortgageLink Canada' },
      { name: 'twitter:description', content: 'Reach out to licensed mortgage brokers for personalized assistance. Visit us, call, or send a message today. Get expert mortgage advice from our Toronto and Vancouver offices.' }
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
        
        // Track contact form submission
        trackContactSubmission('contact_form');
        trackEvent('contact_submit', {
          contact_method: 'contact_form',
          subject: formData.subject,
          has_consent: consent,
          page_location: window.location.pathname
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setConsent(false);
      } else {
        toast.error(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // WhatsApp chat function
  const handleWhatsAppChat = () => {
    const phoneNumber = '14165551234'; // Replace with actual WhatsApp number
    const message = encodeURIComponent('Hi! I\'m interested in learning more about mortgage options. Can you help me?');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Track WhatsApp contact
    trackContactSubmission('whatsapp');
    trackEvent('contact_submit', {
      contact_method: 'whatsapp',
      subject: 'WhatsApp Inquiry',
      has_consent: true,
      page_location: window.location.pathname
    });
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
      
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleWhatsAppChat}
          aria-label="Chat with us on WhatsApp"
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          <svg 
            className="w-6 h-6" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
        </button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>

      <main id="main">
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
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
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
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
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
              <div className="w-12 h-12 bg-[#FF6F00] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-lg font-medium text-[#FF6F00] mb-1">Start Chat</p>
              <p className="text-sm text-gray-600">Available now</p>
            </div>

            {/* WhatsApp */}
            <div 
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={handleWhatsAppChat}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleWhatsAppChat();
                }
              }}
              aria-label="Chat with us on WhatsApp"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-lg font-medium text-green-500 mb-1">Quick Chat</p>
              <p className="text-sm text-gray-600">Instant messaging</p>
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
                
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" role="form" aria-label="Contact form">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      aria-describedby="name-error"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      placeholder="Enter your full name"
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
                      required
                      aria-required="true"
                      aria-describedby="email-error"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      aria-required="true"
                      aria-describedby="subject-error"
                      className="w-full px-3 py-2 border border-[#E0E0E0] rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
                      placeholder="Enter message subject"
                    />
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
                      required
                      aria-required="true"
                      aria-describedby="message-error"
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
                      aria-required="true"
                      aria-describedby="consent-error"
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
                    aria-describedby="submit-status"
                    className={`w-full py-2 px-4 rounded-md transition-colors duration-200 text-sm font-medium ${
                      consent && !isSubmitting
                        ? 'bg-[#1B5E20] text-white hover:bg-[#2E7D32]' 
                        : 'bg-[#E0E0E0] text-[#757575] cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center" aria-live="polite">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>

                  {/* Response Time */}
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                    aria-label="Interactive map showing Toronto office location"
                  ></iframe>
                </div>

                {/* Toronto Office */}
                <div className="border-l-4 border-[#1B5E20] pl-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#1B5E20] rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
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
                    <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center flex-shrink-0" aria-hidden="true">
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
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
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
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
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
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
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
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What are today's best mortgage rates?</h3>
            </div>

            {/* Qualification */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How much can I qualify for?</h3>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does approval take?</h3>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What documents do I need?</h3>
            </div>

            {/* First-Time Buyers */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Special programs available?</h3>
            </div>

            {/* Refinancing */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-12 h-12 bg-[#1B5E20] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
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
      </main>
    </div>
  );
}

export default Contact; 