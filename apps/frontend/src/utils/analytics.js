// Google Analytics 4 (GA4) Analytics Utility
// This utility provides functions for tracking page views and custom events

// Initialize GA4
export const initGA4 = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    console.log('GA4 initialized');
  }
};

// Track page view
export const trackPageView = (pageTitle, pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageTitle,
      page_location: window.location.origin + pagePath,
      page_path: pagePath,
      send_page_view: true
    });
    console.log('GA4 Page View:', pageTitle, pagePath);
  }
};

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
    console.log('GA4 Event:', eventName, parameters);
  }
};

// Track mortgage calculator usage
export const trackCalculatorUsage = (calculatorType, inputs) => {
  trackEvent('calculator_used', {
    calculator_type: calculatorType,
    input_values: inputs,
    page_location: window.location.pathname
  });
};

// Track rate comparison
export const trackRateComparison = (province, rateCount) => {
  trackEvent('rate_comparison_viewed', {
    province: province,
    rate_count: rateCount,
    page_location: window.location.pathname
  });
};

// Track quiz completion
export const trackQuizCompletion = (quizType, score, duration) => {
  trackEvent('quiz_completed', {
    quiz_type: quizType,
    score: score,
    duration_seconds: duration,
    page_location: window.location.pathname
  });
};

// Track application start
export const trackApplicationStart = (applicationType) => {
  trackEvent('application_started', {
    application_type: applicationType,
    page_location: window.location.pathname
  });
};

// Track contact form submission
export const trackContactSubmission = (contactMethod) => {
  trackEvent('contact_form_submitted', {
    contact_method: contactMethod,
    page_location: window.location.pathname
  });
};

// Track language change
export const trackLanguageChange = (language) => {
  trackEvent('language_changed', {
    language: language,
    page_location: window.location.pathname
  });
};

// Track service navigation
export const trackServiceNavigation = (serviceType) => {
  trackEvent('service_navigated', {
    service_type: serviceType,
    page_location: window.location.pathname
  });
};

// Enhanced page view tracking with additional parameters
export const trackEnhancedPageView = (pageData = {}) => {
  const {
    pageTitle = document.title,
    pagePath = window.location.pathname,
    pageCategory = 'mortgage_website',
    pageType = 'content',
    customParameters = {}
  } = pageData;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageTitle,
      page_location: window.location.origin + pagePath,
      page_path: pagePath,
      page_category: pageCategory,
      page_type: pageType,
      send_page_view: true,
      ...customParameters
    });
    console.log('GA4 Enhanced Page View:', pageTitle, pagePath, pageData);
  }
};

// Track user engagement metrics
export const trackUserEngagement = (engagementType, details = {}) => {
  trackEvent('user_engagement', {
    engagement_type: engagementType,
    ...details,
    page_location: window.location.pathname,
    timestamp: new Date().toISOString()
  });
};

// Track conversion events
export const trackConversion = (conversionType, value = 0, currency = 'CAD') => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
    currency: currency,
    page_location: window.location.pathname
  });
};

// Track error events
export const trackError = (errorType, errorMessage, errorContext = {}) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
    error_context: errorContext,
    page_location: window.location.pathname
  });
};

// Track performance metrics
export const trackPerformance = (metricName, metricValue, metricUnit = 'ms') => {
  trackEvent('performance_metric', {
    metric_name: metricName,
    metric_value: metricValue,
    metric_unit: metricUnit,
    page_location: window.location.pathname
  });
}; 