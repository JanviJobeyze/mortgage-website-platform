import React from 'react';
import VoiceReader from './VoiceReader';

const Dropdown = ({ 
  label, 
  options, 
  value, 
  onChange, 
  required = false,
  placeholder = "Select an option",
  className = "",
  error = null,
  disabled = false
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
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent transition-colors text-gray-900 text-sm sm:text-base appearance-none bg-white ${
            error ? 'border-red-500 bg-red-50' : ''
          } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
          <svg 
            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 ${
              disabled ? 'opacity-50' : ''
            }`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

export default Dropdown; 