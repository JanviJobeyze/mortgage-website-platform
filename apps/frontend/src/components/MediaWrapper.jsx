import React, { useState } from 'react';

const MediaWrapper = ({ children, type = 'image', alt, title, className = '' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={`w-full bg-gray-100 rounded-lg flex items-center justify-center p-8 my-6 ${className}`}>
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Failed to load {type}</p>
          {alt && <p className="text-xs mt-1">{alt}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gray-400">
            <svg className="w-8 h-8 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
      )}
      
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}>
        {React.cloneElement(children, {
          onLoad: handleLoad,
          onError: handleError,
          onLoadedData: handleLoad, // For videos
          onCanPlay: handleLoad, // For videos
        })}
      </div>
      
      {title && (
        <div className="mt-2 text-center">
          <p className="text-sm text-gray-600 italic">{title}</p>
        </div>
      )}
    </div>
  );
};

export default MediaWrapper; 