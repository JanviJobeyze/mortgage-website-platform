import React from 'react';
import VoiceReader from './VoiceReader';

const MultipleChoice = ({ 
  label, 
  options, 
  value, 
  onChange, 
  required = false,
  className = "",
  error = null,
  orientation = "vertical" // "vertical" or "horizontal"
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <label className="block text-xs sm:text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <VoiceReader text={label} />
      </div>
      
      <div className={`space-y-2 ${
        orientation === "horizontal" 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3" 
          : ""
      }`}>
        {options.map((option, index) => (
          <label 
            key={index}
            className={`flex items-center p-2.5 sm:p-3 border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-[#1B5E20] hover:bg-green-50 ${
              value === option 
                ? 'border-[#1B5E20] bg-green-50 ring-2 ring-[#1B5E20] ring-opacity-20' 
                : ''
            }`}
          >
            <input
              type="radio"
              name={label.toLowerCase().replace(/\s+/g, '-')}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            
            <div className={`flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 border-2 rounded-full mr-2 sm:mr-3 flex items-center justify-center ${
              value === option 
                ? 'border-[#1B5E20]' 
                : 'border-gray-300'
            }`}>
              {value === option && (
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#1B5E20] rounded-full"></div>
              )}
            </div>
            
            <span className={`text-xs sm:text-sm md:text-base ${
              value === option 
                ? 'text-[#1B5E20] font-medium' 
                : 'text-gray-700'
            }`}>
              {option}
            </span>
          </label>
        ))}
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

export default MultipleChoice; 