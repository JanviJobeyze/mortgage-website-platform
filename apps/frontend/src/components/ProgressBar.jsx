import React from 'react';

const ProgressBar = ({ 
  totalSteps, 
  currentStep, 
  className = "",
  showPercentage = true,
  showStepCount = true
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className={`w-full ${className}`}>
      {/* Header with step count and percentage */}
      <div className="flex justify-between items-center mb-2">
        {showStepCount && (
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
        )}
        {showPercentage && (
          <span className="text-sm font-medium text-[#1B5E20]">
            {percentage}% Complete
          </span>
        )}
      </div>
      
      {/* Progress bar container */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 rounded-full transition-all duration-500 ease-in-out shadow-sm"
          style={{ width: `${percentage}%` }}
        >
          {/* Optional: Add a subtle shimmer effect */}
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar; 