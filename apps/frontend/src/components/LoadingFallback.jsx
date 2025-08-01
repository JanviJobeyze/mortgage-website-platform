import React from 'react';

const LoadingFallback = ({ componentName = 'component' }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg mb-2">Loading {componentName}...</p>
        <p className="text-gray-400 text-sm">This will only take a moment</p>
      </div>
    </div>
  );
};

export default LoadingFallback; 