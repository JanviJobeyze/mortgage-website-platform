import React, { useState, useEffect } from 'react';
import { trackApplicationStart, trackEvent } from '../utils/analytics';

function Apply() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    propertyValue: '',
    propertyType: 'residential',
    employmentStatus: 'employed',
    annualIncome: '',
    downPayment: '',
    loanAmount: ''
  });
  
  const [files, setFiles] = useState({
    identification: null,
    incomeProof: null,
    propertyDocuments: null,
    bankStatements: null
  });

  const [filePreviews, setFilePreviews] = useState({
    identification: null,
    incomeProof: null,
    propertyDocuments: null,
    bankStatements: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // SEO Metadata
  useEffect(() => {
    // Update page title
    document.title = 'Mortgage Application | Apply Online | MortgageLink Canada';
    
    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Apply for your mortgage online with our secure application form. Submit your information and documents for a quick pre-approval process. Licensed mortgage brokers across Canada.');
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = 'Apply for your mortgage online with our secure application form. Submit your information and documents for a quick pre-approval process. Licensed mortgage brokers across Canada.';
      document.head.appendChild(metaDescription);
    }

    // Add or update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mortgage application, apply online, mortgage pre-approval, home loan application, mortgage broker Canada, FSRA licensed');
    } else {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      metaKeywords.content = 'mortgage application, apply online, mortgage pre-approval, home loan application, mortgage broker Canada, FSRA licensed';
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
      { property: 'og:title', content: 'Mortgage Application | Apply Online | MortgageLink Canada' },
      { property: 'og:description', content: 'Apply for your mortgage online with our secure application form. Submit your information and documents for a quick pre-approval process.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://mortgagelink.ca/apply' },
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
      { name: 'twitter:title', content: 'Mortgage Application | Apply Online | MortgageLink Canada' },
      { name: 'twitter:description', content: 'Apply for your mortgage online with our secure application form. Submit your information and documents for a quick pre-approval process.' }
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field on blur
    validateField(name, formData[name]);
  };

  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        else if (value.trim().length < 2) error = 'First name must be at least 2 characters';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        else if (value.trim().length < 2) error = 'Last name must be at least 2 characters';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^[+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-()]/g, ''))) {
          error = 'Please enter a valid phone number';
        }
        break;
      case 'propertyValue':
        if (!value.trim()) {
          error = 'Property value is required';
        } else {
          const numericValue = parseFloat(value.replace(/[^\d]/g, ''));
          if (numericValue < 50000) error = 'Property value must be at least $50,000';
          else if (numericValue > 10000000) error = 'Property value cannot exceed $10,000,000';
        }
        break;
      case 'annualIncome':
        if (!value.trim()) {
          error = 'Annual income is required';
        } else {
          const numericValue = parseFloat(value.replace(/[^\d]/g, ''));
          if (numericValue < 10000) error = 'Annual income must be at least $10,000';
          else if (numericValue > 5000000) error = 'Annual income cannot exceed $5,000,000';
        }
        break;
      case 'downPayment':
        if (!value.trim()) {
          error = 'Down payment amount is required';
        } else {
          const numericValue = parseFloat(value.replace(/[^\d]/g, ''));
          if (numericValue < 5000) error = 'Down payment must be at least $5,000';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return !error;
  };

  const createFilePreview = (file, fileType) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreviews(prev => ({
          ...prev,
          [fileType]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // For non-image files, show file info
      setFilePreviews(prev => ({
        ...prev,
        [fileType]: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      }));
    }
  };

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'File size must be less than 10MB'
        }));
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [fileType]: 'Please upload PDF, JPEG, or PNG files only'
        }));
        return;
      }
      
      setFiles(prev => ({
        ...prev,
        [fileType]: file
      }));
      
      // Create preview
      createFilePreview(file, fileType);
      
      // Clear error
      if (errors[fileType]) {
        setErrors(prev => ({
          ...prev,
          [fileType]: ''
        }));
      }
    }
  };

  const removeFile = (fileType) => {
    setFiles(prev => ({
      ...prev,
      [fileType]: null
    }));
    setFilePreviews(prev => ({
      ...prev,
      [fileType]: null
    }));
    if (errors[fileType]) {
      setErrors(prev => ({
        ...prev,
        [fileType]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate all required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'propertyValue', 'annualIncome', 'downPayment'];
    
    requiredFields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });
    
    // Validate required files
    const requiredFiles = ['identification', 'incomeProof'];
    requiredFiles.forEach(fileType => {
      if (!files[fileType]) {
        newErrors[fileType] = 'This document is required';
        isValid = false;
      }
    });
    
    setErrors(prev => ({
      ...prev,
      ...newErrors
    }));
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');
    
    try {
      const formDataToSend = new FormData();
      
      // Append form data
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append files
      Object.keys(files).forEach(key => {
        if (files[key]) {
          formDataToSend.append(key, files[key]);
        }
      });
      
              const response = await fetch('/api/apply', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        setStatusMessage('Application submitted successfully! We will contact you within 24 hours.');
        
        // Track application submission
        trackApplicationStart('mortgage_application');
        trackEvent('apply_submit', {
          application_type: 'mortgage_application',
          property_type: formData.propertyType,
          employment_status: formData.employmentStatus,
          has_files: Object.values(files).some(file => file !== null),
          file_count: Object.values(files).filter(file => file !== null).length,
          page_location: window.location.pathname
        });
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          propertyValue: '',
          propertyType: 'residential',
          employmentStatus: 'employed',
          annualIncome: '',
          downPayment: '',
          loanAmount: ''
        });
        setFiles({
          identification: null,
          incomeProof: null,
          propertyDocuments: null,
          bankStatements: null
        });
        setFilePreviews({
          identification: null,
          incomeProof: null,
          propertyDocuments: null,
          bankStatements: null
        });
        setTouched({});
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Failed to submit application. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue === '') return '';
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  const handleCurrencyInput = (e) => {
    const { name, value } = e.target;
    const formattedValue = formatCurrency(value);
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const FilePreview = ({ fileType, file, preview }) => {
    if (!file) return null;

    return (
      <div className="mt-2 p-3 bg-gray-50 rounded-md border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {preview && typeof preview === 'string' ? (
              // Image preview
              <img 
                src={preview} 
                alt="File preview" 
                className="w-12 h-12 object-cover rounded border"
                loading="lazy"
              />
            ) : (
              // File icon for non-image files
              <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeFile(fileType)}
            className="text-red-500 hover:text-red-700 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main id="main">
        {/* Hero Section */}
        <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] mb-4 sm:mb-6">
                Mortgage Application
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed">
                Complete your mortgage application online. Our secure form collects all necessary information to help you get pre-approved quickly.
              </p>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-6 sm:mb-8">
                Personal Information
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                        errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  
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
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                        errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && touched.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                        errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && touched.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Property Information */}
                <div className="border-t pt-6 sm:pt-8">
                  <h3 className="text-xl font-semibold text-[#212121] mb-4 sm:mb-6">
                    Property Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="propertyValue" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Value *
                      </label>
                      <input
                        type="text"
                        id="propertyValue"
                        name="propertyValue"
                        value={formData.propertyValue}
                        onChange={handleCurrencyInput}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.propertyValue && touched.propertyValue ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter property value"
                      />
                      {errors.propertyValue && touched.propertyValue && (
                        <p className="text-red-500 text-sm mt-1">{errors.propertyValue}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Type
                      </label>
                      <select
                        id="propertyType"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                      >
                        <option value="residential">Residential</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="border-t pt-6 sm:pt-8">
                  <h3 className="text-xl font-semibold text-[#212121] mb-4 sm:mb-6">
                    Financial Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-2">
                        Employment Status
                      </label>
                      <select
                        id="employmentStatus"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                      >
                        <option value="employed">Employed</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="retired">Retired</option>
                        <option value="student">Student</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Income *
                      </label>
                      <input
                        type="text"
                        id="annualIncome"
                        name="annualIncome"
                        value={formData.annualIncome}
                        onChange={handleCurrencyInput}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.annualIncome && touched.annualIncome ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter annual income"
                      />
                      {errors.annualIncome && touched.annualIncome && (
                        <p className="text-red-500 text-sm mt-1">{errors.annualIncome}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div>
                      <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-2">
                        Down Payment *
                      </label>
                      <input
                        type="text"
                        id="downPayment"
                        name="downPayment"
                        value={formData.downPayment}
                        onChange={handleCurrencyInput}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.downPayment && touched.downPayment ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter down payment amount"
                      />
                      {errors.downPayment && touched.downPayment && (
                        <p className="text-red-500 text-sm mt-1">{errors.downPayment}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                        Requested Loan Amount
                      </label>
                      <input
                        type="text"
                        id="loanAmount"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleCurrencyInput}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                        placeholder="Enter loan amount"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="border-t pt-6 sm:pt-8">
                  <h3 className="text-xl font-semibold text-[#212121] mb-4 sm:mb-6">
                    Required Documents
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 sm:mb-6">
                    Please upload the following documents (PDF, JPEG, or PNG format, max 10MB each):
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="identification" className="block text-sm font-medium text-gray-700 mb-2">
                        Government ID (Driver's License, Passport) *
                      </label>
                      <input
                        type="file"
                        id="identification"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'identification')}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.identification ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.identification && (
                        <p className="text-red-500 text-sm mt-1">{errors.identification}</p>
                      )}
                      <FilePreview 
                        fileType="identification" 
                        file={files.identification} 
                        preview={filePreviews.identification} 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="incomeProof" className="block text-sm font-medium text-gray-700 mb-2">
                        Proof of Income (Pay Stubs, T4) *
                      </label>
                      <input
                        type="file"
                        id="incomeProof"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'incomeProof')}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.incomeProof ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.incomeProof && (
                        <p className="text-red-500 text-sm mt-1">{errors.incomeProof}</p>
                      )}
                      <FilePreview 
                        fileType="incomeProof" 
                        file={files.incomeProof} 
                        preview={filePreviews.incomeProof} 
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div>
                      <label htmlFor="propertyDocuments" className="block text-sm font-medium text-gray-700 mb-2">
                        Property Documents (Purchase Agreement, MLS Listing)
                      </label>
                      <input
                        type="file"
                        id="propertyDocuments"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'propertyDocuments')}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.propertyDocuments ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.propertyDocuments && (
                        <p className="text-red-500 text-sm mt-1">{errors.propertyDocuments}</p>
                      )}
                      <FilePreview 
                        fileType="propertyDocuments" 
                        file={files.propertyDocuments} 
                        preview={filePreviews.propertyDocuments} 
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="bankStatements" className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Statements (Last 3 Months)
                      </label>
                      <input
                        type="file"
                        id="bankStatements"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, 'bankStatements')}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4CAF50] ${
                          errors.bankStatements ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.bankStatements && (
                        <p className="text-red-500 text-sm mt-1">{errors.bankStatements}</p>
                      )}
                      <FilePreview 
                        fileType="bankStatements" 
                        file={files.bankStatements} 
                        preview={filePreviews.bankStatements} 
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Status */}
                {submitStatus && (
                  <div className={`p-4 rounded-md ${
                    submitStatus === 'success' 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    {statusMessage}
                  </div>
                )}

                {/* Submit Button */}
                <div className="border-t pt-6 sm:pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#4CAF50] text-white py-3 px-6 rounded-md font-semibold text-lg hover:bg-[#45a049] focus:outline-none focus:ring-2 focus:ring-[#4CAF50] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Apply;