import React, { useState, useEffect } from 'react';

const SmartLoadingFallback = ({ componentName = 'component' }) => {
  const [showLoading, setShowLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);

  useEffect(() => {
    // Only show loading after a short delay to avoid flash
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 100); // 100ms delay to avoid unnecessary loading states

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Track loading time
    const startTime = Date.now();
    const interval = setInterval(() => {
      setLoadingTime(Date.now() - startTime);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Don't show loading if component loads quickly
  if (!showLoading || loadingTime < 200) {
    return null;
  }

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

export default SmartLoadingFallback; 