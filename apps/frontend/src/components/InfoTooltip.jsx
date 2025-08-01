import React, { useState } from 'react';

const InfoTooltip = ({ 
  term, 
  description, 
  icon = 'info', 
  size = 'sm', 
  position = 'top', 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Size classes mapping
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // Position classes mapping
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  // Icon components
  const icons = {
    info: (
      <svg className={`${sizeClasses[size]} text-gray-400 hover:text-[#1B5E20] transition-colors`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    question: (
      <svg className={`${sizeClasses[size]} text-gray-400 hover:text-[#1B5E20] transition-colors`} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    )
  };

  const handleMouseEnter = () => setIsVisible(true);
  const handleMouseLeave = () => setIsVisible(false);
  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        className="focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded-full"
        aria-label={`Information about ${term}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {icons[icon]}
      </button>
      
      {isVisible && (
        <div 
          className={`absolute z-50 ${positionClasses[position]}`}
          role="tooltip"
          aria-hidden="true"
        >
          <div className="bg-gray-800 text-white text-xs sm:text-sm rounded-lg px-3 py-2 max-w-xs shadow-lg">
            <div className="font-semibold mb-1">{term}</div>
            <div className="text-gray-200 leading-relaxed">{description}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTooltip; 