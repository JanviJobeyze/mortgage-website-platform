import React from 'react';
import VoiceReader from './VoiceReader';

const QuestionInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  prefix = "",
  suffix = "",
  className = "",
  error = null
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <VoiceReader text={label} />
      </div>
      
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {prefix}
          </span>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors ${
            prefix ? 'pl-6 sm:pl-8' : 'pl-3 sm:pl-4'
          } ${suffix ? 'pr-6 sm:pr-8' : 'pr-3 sm:pr-4'} py-2.5 sm:py-3 text-gray-900 text-sm sm:text-base ${
            error ? 'border-red-500 bg-red-50' : ''
          }`}
        />
        
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
      
      {error && (
        <p className="text-xs sm:text-sm text-red-600 flex items-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default QuestionInput; 