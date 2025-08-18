import React, { useState, useEffect, useMemo } from 'react';
import SkeletonRatesTable from './SkeletonRatesTable';
import InfoTooltip from './InfoTooltip';
import VoiceReader from './VoiceReader';
import { getTermDefinition } from '../data/rateTerms';

/**
 * RatesTable Component
 * 
 * Usage:
 * 1. With data prop (for Rates.jsx page): <RatesTable data={filteredRates} />
 *    - Uses provided data, filters disabled, sorting enabled
 * 
 * 2. Without data prop (standalone): <RatesTable />
 *    - Fetches own data from API, filters enabled, sorting enabled
 * 
 * Features:
 * - Real-time filtering via API (/api/rates/filtered)
 * - Sorting by Rate, APR, Lender
 * - Rate comparison modal
 * - Responsive design (desktop table + mobile cards)
 * - Error handling with retry
 * - Loading states
 */

// Reusable Alert Component
const Alert = ({ type = 'error', title, message, onRetry, children }) => {
  const alertStyles = {
    error: {
      container: 'bg-red-50 border border-red-200 rounded-lg p-4',
      icon: 'text-red-400',
      title: 'text-red-800',
      message: 'text-red-700',
      button: 'bg-red-600 hover:bg-red-700 text-white'
    },
    warning: {
      container: 'bg-yellow-50 border border-yellow-200 rounded-lg p-4',
      icon: 'text-yellow-400',
      title: 'text-yellow-800',
      message: 'text-yellow-700',
      button: 'bg-yellow-600 hover:bg-yellow-700 text-white'
    },
    info: {
      container: 'bg-blue-50 border border-blue-200 rounded-lg p-4',
      icon: 'text-blue-400',
      title: 'text-blue-800',
      message: 'text-blue-700',
      button: 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  };

  const styles = alertStyles[type];

  return (
    <div className={styles.container}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {type === 'error' && (
            <svg className={`w-5 h-5 ${styles.icon}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          {type === 'warning' && (
            <svg className={`w-5 h-5 ${styles.icon}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
          {type === 'info' && (
            <svg className={`w-5 h-5 ${styles.icon}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${styles.title}`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`text-sm ${styles.message} mt-1`}>
              {message}
            </p>
          )}
          {children}
          {onRetry && (
            <button 
              onClick={onRetry}
              className={`mt-3 px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium ${styles.button}`}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * TypeScript-like type definitions for mortgage rate data
 * 
 * interface Lender {
 *   name: string;
 *   logo: string;
 *   type: string;
 *   color: string;
 * }
 * 
 * interface MortgageRate {
 *   id: number;
 *   lender: Lender;
 *   rate: number;
 *   apr: number;
 *   term: string;
 *   type: 'Fixed' | 'Variable';
 *   change: number;
 *   features: string[];
 *   isTrending: 'up' | 'down' | 'stable';
 *   provinces: string[];
 *   lastUpdated: string;
 * }
 * 
 * interface ApiResponse {
 *   success: boolean;
 *   data: MortgageRate[];
 *   total: number;
 *   lastUpdated: string;
 *   error?: string;
 * }
 */

const RatesTable = ({ data: propData = null }) => {
  // State for rates data
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for sorting
  const [sortBy, setSortBy] = useState('rate');
  const [sortOrder, setSortOrder] = useState('asc');

  // State for comparison
  const [selectedRates, setSelectedRates] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // State for filters
  const [filters, setFilters] = useState({
    province: '',
    type: '',
    term: '',
    lenderType: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Determine if we should use prop data or fetch our own
  const shouldUsePropData = propData !== null;
  const displayRates = shouldUsePropData ? propData : rates;

  // Fetch rates data with filters (only when not using prop data)
  const fetchRates = async (filterParams = {}) => {
    if (shouldUsePropData) return; // Don't fetch if using prop data
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Build query string for filters
      const queryParams = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value && value !== '') {
          queryParams.append(key, value);
        }
      });
      
      const url = queryParams.toString() 
        ? `/api/rates/filtered?${queryParams.toString()}`
        : '/api/rates';
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setRates(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch rates');
      }
    } catch (error) {
      console.error('Error fetching rates:', error);
      
      // Provide specific error messages based on error type
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (error.message.includes('HTTP error! status: 404')) {
        setError('Rates service not found. Please try again later.');
      } else if (error.message.includes('HTTP error! status: 500')) {
        setError('Server error. Please try again later.');
      } else {
        setError('Couldn\'t load rates, please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch (only when not using prop data)
  useEffect(() => {
    if (!shouldUsePropData) {
      fetchRates();
    } else {
      setIsLoading(false);
      setError(null);
    }
  }, [shouldUsePropData]);

  // Handle filter changes (only when not using prop data)
  const handleFilterChange = (filterName, value) => {
    if (shouldUsePropData) return; // Don't filter if using prop data
    
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    fetchRates(newFilters);
  };

  // Clear all filters (only when not using prop data)
  const clearFilters = () => {
    if (shouldUsePropData) return; // Don't clear if using prop data
    
    const clearedFilters = {
      province: '',
      type: '',
      term: '',
      lenderType: ''
    };
    setFilters(clearedFilters);
    fetchRates();
  };

  // Get unique values for filter options
  const getFilterOptions = () => {
    const allRates = displayRates.length > 0 ? displayRates : [];
    
    const provinces = [...new Set(allRates.flatMap(rate => rate.provinces))].sort();
    const types = [...new Set(allRates.map(rate => rate.type))].sort();
    const terms = [...new Set(allRates.map(rate => rate.term))].sort();
    const lenderTypes = [...new Set(allRates.map(rate => rate.lender.type))].sort();
    
    return { provinces, types, terms, lenderTypes };
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  // Retry function for error state
  const handleRetry = () => {
    if (shouldUsePropData) return; // Don't retry if using prop data
    
    setError(null);
    fetchRates(filters);
  };

  // Handle rate selection for comparison
  const handleRateSelection = (rate) => {
    setSelectedRates(prev => {
      const isSelected = prev.find(r => r.id === rate.id);
      if (isSelected) {
        return prev.filter(r => r.id !== rate.id);
      } else {
        return [...prev, rate].slice(0, 3); // Limit to 3 rates
      }
    });
  };

  // Handle comparison button click
  const handleCompareClick = (rate) => {
    setSelectedRates([rate]);
    setShowComparisonModal(true);
  };

  // Handle sort
  const handleSort = (sortType) => {
    if (sortBy === sortType) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortType);
      setSortOrder('asc');
    }
  };

  // Sort rates
  const sortedRates = useMemo(() => {
    return [...displayRates].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Handle nested properties
      if (sortBy === 'lender') {
        aValue = a.lender.name;
        bValue = b.lender.name;
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [displayRates, sortBy, sortOrder]);

  // Helper functions
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 7z" clipRule="evenodd" /></svg>;
      case 'down':
        return <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 13a1 1 0 110 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L12 13z" clipRule="evenodd" /></svg>;
      default:
        return <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;
    }
  };

  const getChangeColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-red-600';
      case 'down':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTypeBadgeStyle = (type) => {
    switch (type.toLowerCase()) {
      case 'fixed':
        return 'bg-blue-100 text-blue-800';
      case 'variable':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate read-aloud text for individual rate
  const generateRateReadAloudText = (rate) => {
    const purposeText = rate.purpose ? `This rate is available for ${rate.purpose.toLowerCase()}. ` : '';
    const changeText = rate.change !== undefined && rate.change !== null && rate.change !== 0 
      ? `The rate has ${rate.change > 0 ? 'increased' : 'decreased'} by ${Math.abs(rate.change)} percentage points.` 
      : 'The rate has remained stable.';
    
    return `${rate.lender.name} offers a ${rate.rate}% ${rate.type.toLowerCase()} rate with a ${rate.term.toLowerCase()} term. The annual percentage rate is ${rate.apr}%. ${purposeText}${changeText}`;
  };

  // Comparison Modal Component
  const ComparisonModal = () => {
    if (!showComparisonModal || selectedRates.length === 0) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Rate Comparison</h2>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedRates.map((rate, index) => (
                <div key={rate.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${typeof rate.lender?.color === 'string' ? rate.lender.color : 'bg-gray-600'} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
                        {typeof rate.lender?.logo === 'string' ? rate.lender.logo : '🏦'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'}</h3>
                        <p className="text-sm text-gray-600">{typeof rate.lender?.type === 'string' ? rate.lender.type : 'Major Bank'}</p>
                      </div>
                    </div>
                    {index === 0 && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best Rate
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{rate.rate}%</div>
                      <div className="text-sm text-gray-600">Interest Rate</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">APR:</span>
                        <span className="ml-1 font-medium">{rate.apr}%</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Term:</span>
                        <span className="ml-1 font-medium">{rate.term}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-1 font-medium">{rate.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Change:</span>
                        <span className={`ml-1 font-medium ${rate.change > 0 ? 'text-red-600' : rate.change < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                          {rate.change > 0 ? '+' : ''}{rate.change}%
                        </span>
                      </div>
                    </div>
                    
                    {rate.features && rate.features.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {rate.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="flex items-center">
                              <svg className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  // Here you could implement "Apply Now" functionality
                  console.log('Apply for selected rates:', selectedRates);
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (isLoading) {
    return <SkeletonRatesTable />;
  }

  // Error state
  if (error) {
    return (
      <Alert 
        type="error" 
        title="Error Loading Rates" 
        message={error} 
        onRetry={handleRetry} 
      />
    );
  }

  // Empty state
  if (displayRates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Current Rates
          </h2>
        </div>
        <div className="p-8">
          <Alert 
            type="info" 
            title="No rates found" 
            message={shouldUsePropData ? "No rates match your current filters." : "Try adjusting your filters or check back later."}
          >
            <div className="text-center mt-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden" role="region" aria-labelledby="rates-table-heading">
        {/* Table Header with Sort Controls */}
        <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900" id="rates-table-heading">
                Current Mortgage Rates
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Showing {displayRates.length} rate{displayRates.length !== 1 ? 's' : ''} • Click column headers to sort
              </p>
            </div>
            
            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter and sort options">
              {/* Filter Toggle Button */}
              {shouldUsePropData ? (
                <div className="px-3 py-1 text-xs text-gray-500 bg-gray-100 rounded-md">
                  Filters (use page filters above)
                </div>
              ) : (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                    hasActiveFilters 
                      ? 'bg-[#1B5E20] text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Toggle filters"
                >
                  {hasActiveFilters ? 'Filters Active' : 'Filters'}
                  {hasActiveFilters && (
                    <span className="ml-1 bg-white text-[#1B5E20] px-1 rounded-full text-xs">
                      {Object.values(filters).filter(v => v !== '').length}
                    </span>
                  )}
                </button>
              )}
              
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <button
                onClick={() => handleSort('rate')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  sortBy === 'rate' 
                    ? 'bg-[#1B5E20] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`Sort by interest rate ${sortBy === 'rate' ? '(currently sorted)' : ''}`}
                aria-pressed={sortBy === 'rate'}
              >
                Rate
              </button>
              <button
                onClick={() => handleSort('apr')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  sortBy === 'apr' 
                    ? 'bg-[#1B5E20] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`Sort by APR ${sortBy === 'apr' ? '(currently sorted)' : ''}`}
                aria-pressed={sortBy === 'apr'}
              >
                APR
              </button>
              <button
                onClick={() => handleSort('lender')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                  sortBy === 'lender' 
                    ? 'bg-[#1B5E20] text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-label={`Sort by lender ${sortBy === 'lender' ? '(currently sorted)' : ''}`}
                aria-pressed={sortBy === 'lender'}
              >
                Lender
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && !shouldUsePropData && (
          <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Province Filter */}
              <div>
                <label htmlFor="province-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <select
                  id="province-filter"
                  value={filters.province}
                  onChange={(e) => handleFilterChange('province', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20]"
                >
                  <option value="">All Provinces</option>
                  {getFilterOptions().provinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id="type-filter"
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20]"
                >
                  <option value="">All Types</option>
                  {getFilterOptions().types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Term Filter */}
              <div>
                <label htmlFor="term-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Term
                </label>
                <select
                  id="term-filter"
                  value={filters.term}
                  onChange={(e) => handleFilterChange('term', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20]"
                >
                  <option value="">All Terms</option>
                  {getFilterOptions().terms.map(term => (
                    <option key={term} value={term}>{term}</option>
                  ))}
                </select>
              </div>

              {/* Lender Type Filter */}
              <div>
                <label htmlFor="lender-type-filter" className="block text-sm font-medium text-gray-700 mb-1">
                  Lender Type
                </label>
                <select
                  id="lender-type-filter"
                  value={filters.lenderType}
                  onChange={(e) => handleFilterChange('lenderType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20]"
                >
                  <option value="">All Lenders</option>
                  {getFilterOptions().lenderTypes.map(lenderType => (
                    <option key={lenderType} value={lenderType}>{lenderType}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full" role="table" aria-label="Mortgage rates comparison table">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    <div className="flex items-center space-x-1">
                      <span>Lender</span>
                      <InfoTooltip 
                        term={getTermDefinition('lender').term}
                        description={getTermDefinition('lender').description}
                        size="xs"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    <div className="flex items-center justify-center space-x-1">
                      <span>Rate</span>
                      <InfoTooltip 
                        term={getTermDefinition('rate').term}
                        description={getTermDefinition('rate').description}
                        size="xs"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    <div className="flex items-center justify-center space-x-1">
                      <span>APR</span>
                      <InfoTooltip 
                        term={getTermDefinition('apr').term}
                        description={getTermDefinition('apr').description}
                        size="xs"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    <div className="flex items-center justify-center space-x-1">
                      <span>Term</span>
                      <InfoTooltip 
                        term={getTermDefinition('term').term}
                        description={getTermDefinition('term').description}
                        size="xs"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    <div className="flex items-center justify-center space-x-1">
                      <span>Type</span>
                      <InfoTooltip 
                        term={getTermDefinition('type').term}
                        description={getTermDefinition('type').description}
                        size="xs"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    <div className="flex items-center justify-center space-x-1">
                      <span>Features</span>
                      <InfoTooltip 
                        term={getTermDefinition('features').term}
                        description={getTermDefinition('features').description}
                        size="xs"
                      />
                    </div>
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" role="columnheader">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedRates.map((rate, index) => (
                  <tr key={rate.id} className="hover:bg-gray-50" role="row">
                    {/* Lender */}
                    <td className="px-3 py-3 whitespace-nowrap" role="cell">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${typeof rate.lender?.color === 'string' ? rate.lender.color : 'bg-gray-600'} rounded-lg flex items-center justify-center text-white text-xs font-bold`} aria-hidden="true">
                          {typeof rate.lender?.logo === 'string' ? rate.lender.logo : '🏦'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900" aria-label={`Lender: ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'}`}>{typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'}</div>
                          <div className="text-sm text-gray-500" aria-label={`Lender type: ${typeof rate.lender?.type === 'string' ? rate.lender.type : 'Major Bank'}`}>{typeof rate.lender?.type === 'string' ? rate.lender.type : 'Major Bank'}</div>
                        </div>
                      </div>
                    </td>

                    {/* Rate */}
                    <td className="px-3 py-3 text-center" role="cell">
                      <div className="flex flex-col items-center space-y-1">
                        <span className="text-base font-bold text-gray-900" aria-label={`Interest rate: ${rate.rate} percent`}>{rate.rate}%</span>
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(rate.isTrending)}
                          <span className={`text-xs font-medium ${getChangeColor(rate.isTrending)}`} aria-label={`Rate change: ${rate.change > 0 ? 'increased' : 'decreased'} by ${Math.abs(rate.change)} percentage points`}>
                            {rate.change > 0 ? '+' : ''}{rate.change}%
                          </span>
                          <InfoTooltip 
                            term={getTermDefinition('change').term}
                            description={getTermDefinition('change').description}
                            size="xs"
                          />
                        </div>
                      </div>
                    </td>

                    {/* APR */}
                    <td className="px-2 py-3 text-center text-sm text-gray-600" role="cell">
                      <span aria-label={`Annual percentage rate: ${rate.apr} percent`}>{rate.apr}%</span>
                    </td>

                    {/* Term */}
                    <td className="px-2 py-3 text-center text-sm text-gray-600" role="cell">
                      <span aria-label={`Term length: ${rate.term}`}>{rate.term}</span>
                    </td>

                    {/* Type */}
                    <td className="px-2 py-3 text-center" role="cell">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeStyle(rate.type)}`} aria-label={`Rate type: ${rate.type}`}>
                        {rate.type}
                      </span>
                    </td>

                    {/* Features */}
                    <td className="px-3 py-3" role="cell">
                      <ul className="text-xs text-gray-600 space-y-1" aria-label={`Features: ${rate.features.slice(0, 2).join(', ')}${rate.features.length > 2 ? ` and ${rate.features.length - 2} more` : ''}`}>
                        {rate.features.slice(0, 2).map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-3 h-3 mr-1 text-[#2E7D32] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="truncate">{feature}</span>
                          </li>
                        ))}
                        {rate.features.length > 2 && (
                          <li className="text-xs text-gray-500">
                            +{rate.features.length - 2} more
                          </li>
                        )}
                      </ul>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3 text-center" role="cell">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-center space-x-2">
                          <button 
                            className="text-[#1B5E20] hover:text-[#2E7D32] text-sm font-medium transition-colors duration-200"
                            aria-label={`Apply for ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'} ${rate.rate}% mortgage rate`}
                          >
                            Apply
                          </button>
                          <span className="text-gray-300" aria-hidden="true">|</span>
                          <button 
                            onClick={() => handleCompareClick(rate)}
                            className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
                            aria-label={`Compare ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'} rate with others`}
                          >
                            Compare
                          </button>
                        </div>
                        <VoiceReader
                          text={generateRateReadAloudText(rate)}
                          buttonText="🔊 Read"
                          className="text-xs"
                          rate={0.9}
                          size="xs"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden" role="region" aria-labelledby="mobile-rates-heading">
          <div className="space-y-4 p-4">
            <h3 className="sr-only" id="mobile-rates-heading">Mobile view of mortgage rates</h3>
            {sortedRates.map((rate, index) => (
              <div key={rate.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" role="article" aria-label={`Rate ${index + 1} of ${sortedRates.length}: ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'} ${rate.rate}% ${rate.type} rate`}>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${typeof rate.lender?.color === 'string' ? rate.lender.color : 'bg-gray-600'} rounded-lg flex items-center justify-center text-white text-sm font-bold`} aria-hidden="true">
                      {typeof rate.lender?.logo === 'string' ? rate.lender.logo : '🏦'}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900" aria-label={`Lender: ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'}`}>{typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'}</div>
                                              <div className="text-sm text-gray-600" aria-label={`Lender type: ${typeof rate.lender?.type === 'string' ? rate.lender.type : 'Major Bank'}`}>{typeof rate.lender?.type === 'string' ? rate.lender.type : 'Major Bank'}</div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeStyle(rate.type)}`} aria-label={`Rate type: ${rate.type}`}>
                    {rate.type}
                  </span>
                </div>

                {/* Rate and APR */}
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900" aria-label={`Interest rate: ${rate.rate} percent`}>{rate.rate}%</div>
                    <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                      <span>Rate</span>
                      <InfoTooltip 
                        term={getTermDefinition('rate').term}
                        description={getTermDefinition('rate').description}
                        size="xs"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900" aria-label={`Annual percentage rate: ${rate.apr} percent`}>{rate.apr}%</div>
                    <div className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                      <span>APR</span>
                      <InfoTooltip 
                        term={getTermDefinition('apr').term}
                        description={getTermDefinition('apr').description}
                        size="xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Term and Change */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600" aria-label={`Term length: ${rate.term}`}>{rate.term}</span>
                    <InfoTooltip 
                      term={getTermDefinition('term').term}
                      description={getTermDefinition('term').description}
                      size="xs"
                    />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(rate.isTrending)}
                    <span className={`text-xs font-medium ${getChangeColor(rate.isTrending)}`} aria-label={`Rate change: ${rate.change > 0 ? 'increased' : 'decreased'} by ${Math.abs(rate.change)} percentage points`}>
                      {rate.change > 0 ? '+' : ''}{rate.change}%
                    </span>
                    <InfoTooltip 
                      term={getTermDefinition('change').term}
                      description={getTermDefinition('change').description}
                      size="xs"
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="mb-3">
                  <div className="flex items-center space-x-1 mb-2">
                    <span className="text-xs font-medium text-gray-700">Features</span>
                    <InfoTooltip 
                      term={getTermDefinition('features').term}
                      description={getTermDefinition('features').description}
                      size="xs"
                    />
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1" aria-label={`Features: ${rate.features.slice(0, 2).join(', ')}${rate.features.length > 2 ? ` and ${rate.features.length - 2} more` : ''}`}>
                    {rate.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-3 h-3 mr-1 text-[#2E7D32] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {rate.features.length > 2 && (
                      <li className="text-xs text-gray-500">
                        +{rate.features.length - 2} more features
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 bg-[#1B5E20] text-white py-2 px-4 rounded-md hover:bg-[#2E7D32] transition-colors duration-200 text-sm font-medium"
                      aria-label={`Apply for ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'} ${rate.rate}% mortgage rate`}
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={() => handleCompareClick(rate)}
                      className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                      aria-label={`Compare ${typeof rate.lender?.name === 'string' ? rate.lender.name : 'Unknown Lender'} rate with others`}
                    >
                      Compare
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <VoiceReader
                      text={generateRateReadAloudText(rate)}
                      buttonText="🔊 Read rate details aloud"
                      className="text-xs"
                      rate={0.9}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Modal */}
      <ComparisonModal />
    </>
  );
};

export default RatesTable; 