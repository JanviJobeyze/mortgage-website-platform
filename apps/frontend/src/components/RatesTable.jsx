import React, { useState, useEffect } from 'react';
import SkeletonRatesTable from './SkeletonRatesTable';
import InfoTooltip from './InfoTooltip';
import VoiceReader from './VoiceReader';
import { getTermDefinition } from '../data/rateTerms';

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
  const [sortBy, setSortBy] = useState('rate');
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update rates when propData changes (for filtering from parent)
  useEffect(() => {
    if (propData) {
      setRates(propData);
      setIsLoading(false);
      setError(null);
    } else {
      // If no propData, show empty state
      setRates([]);
      setIsLoading(false);
      setError(null);
    }
  }, [propData]);

  // Sorting function
  const handleSort = (sortType) => {
    setSortBy(sortType);
    
    const sortedRates = [...rates].sort((a, b) => {
      switch (sortType) {
        case 'rate':
          return a.rate - b.rate;
        case 'apr':
          return a.apr - b.apr;
        case 'term': {
          // Extract years from term string and sort
          const aYears = parseInt(a.term.split(' ')[0]);
          const bYears = parseInt(b.term.split(' ')[0]);
          return bYears - aYears; // Longest term first
        }
        case 'lender':
          return a.lender.name.localeCompare(b.lender.name);
        default:
          return 0;
      }
    });
    
    setRates(sortedRates);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L12 8.586z" clipRule="evenodd" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1v-5a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586l-4.293-4.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L12 11.414z" clipRule="evenodd" />
          </svg>
        );
      case 'stable':
      default:
        return (
          <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getChangeColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-red-600';
      case 'down':
        return 'text-green-600';
      case 'stable':
      default:
        return 'text-gray-500';
    }
  };

  const getTypeBadgeStyle = (type) => {
    switch (type) {
      case 'Fixed':
        return 'bg-blue-100 text-blue-800';
      case 'Variable':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Generate read-aloud text for individual rate
  const generateRateReadAloudText = (rate) => {
    return `${rate.lender.name} offers a ${rate.rate}% ${rate.type.toLowerCase()} rate with a ${rate.term.toLowerCase()} term. The annual percentage rate is ${rate.apr}%. This rate is available for ${rate.purpose.toLowerCase()}. ${rate.change !== '0.00' ? `The rate has ${rate.change.startsWith('+') ? 'increased' : 'decreased'} by ${rate.change.replace('+', '').replace('-', '')} percentage points.` : 'The rate has remained stable.'}`;
  };

  // Loading state
  if (isLoading) {
    return <SkeletonRatesTable />;
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Current Rates
          </h2>
        </div>
        <div className="p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">Error Loading Rates</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button 
                  onClick={() => {}} // No API call to try again, just clear error
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (rates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
            Current Rates
          </h2>
        </div>
        <div className="p-8">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No rates found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" role="region" aria-labelledby="rates-table-heading">
      {/* Table Header with Sort Controls */}
      <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900" id="rates-table-heading">
              Current Mortgage Rates
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {rates.length} rate{rates.length !== 1 ? 's' : ''} • Click column headers to sort
            </p>
          </div>
          
          {/* Sort Controls */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Sort options">
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
              aria-label={`Sort by annual percentage rate ${sortBy === 'apr' ? '(currently sorted)' : ''}`}
              aria-pressed={sortBy === 'apr'}
            >
              APR
            </button>
            <button
              onClick={() => handleSort('term')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                sortBy === 'term' 
                  ? 'bg-[#1B5E20] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Sort by term length ${sortBy === 'term' ? '(currently sorted)' : ''}`}
              aria-pressed={sortBy === 'term'}
            >
              Term
            </button>
            <button
              onClick={() => handleSort('lender')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200 ${
                sortBy === 'lender' 
                  ? 'bg-[#1B5E20] text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              aria-label={`Sort by lender name ${sortBy === 'lender' ? '(currently sorted)' : ''}`}
              aria-pressed={sortBy === 'lender'}
            >
              Lender
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full" role="table" aria-labelledby="rates-table-heading">
            <thead>
              <tr role="row">
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  <div className="flex items-center space-x-1">
                    <span>Lender</span>
                    <InfoTooltip 
                      term="Lender"
                      description="The financial institution offering the mortgage rate"
                      size="xs"
                    />
                  </div>
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  <div className="flex items-center justify-center space-x-1">
                    <span>Rate</span>
                    <InfoTooltip 
                      term={getTermDefinition('rate').term}
                      description={getTermDefinition('rate').description}
                      size="xs"
                    />
                  </div>
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  <div className="flex items-center justify-center space-x-1">
                    <span>APR</span>
                    <InfoTooltip 
                      term={getTermDefinition('apr').term}
                      description={getTermDefinition('apr').description}
                      size="xs"
                    />
                  </div>
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  <div className="flex items-center justify-center space-x-1">
                    <span>Term</span>
                    <InfoTooltip 
                      term={getTermDefinition('term').term}
                      description={getTermDefinition('term').description}
                      size="xs"
                    />
                  </div>
                </th>
                <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  <div className="flex items-center justify-center space-x-1">
                    <span>Type</span>
                    <InfoTooltip 
                      term={getTermDefinition('type').term}
                      description={getTermDefinition('type').description}
                      size="xs"
                    />
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  <div className="flex items-center space-x-1">
                    <span>Features</span>
                    <InfoTooltip 
                      term={getTermDefinition('features').term}
                      description={getTermDefinition('features').description}
                      size="xs"
                    />
                  </div>
                </th>
                <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col" role="columnheader">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rates.map((rate, index) => (
                <tr 
                  key={rate.id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                  role="row"
                  aria-label={`Rate ${index + 1} of ${rates.length}: ${rate.lender.name} ${rate.rate}% ${rate.type} rate`}
                >
                  {/* Lender */}
                  <td className="px-3 py-3" role="cell">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 ${rate.lender.color} rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0`} aria-hidden="true">
                        {rate.lender.logo}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate" aria-label={`Lender: ${rate.lender.name}`}>{rate.lender.name}</div>
                        <div className="text-xs text-gray-500 truncate" aria-label={`Lender type: ${rate.lender.type}`}>{rate.lender.type}</div>
                      </div>
                    </div>
                  </td>

                  {/* Rate */}
                  <td className="px-2 py-3 text-center" role="cell">
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-base font-bold text-gray-900" aria-label={`Interest rate: ${rate.rate} percent`}>{rate.rate}%</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(rate.isTrending)}
                        <span className={`text-xs font-medium ${getChangeColor(rate.isTrending)}`} aria-label={`Rate change: ${rate.change > 0 ? 'increased' : 'decreased'} by ${rate.change.replace('+', '').replace('-', '')} percentage points`}>
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
                          aria-label={`Apply for ${rate.lender.name} ${rate.rate}% mortgage rate`}
                        >
                          Apply
                        </button>
                        <span className="text-gray-300" aria-hidden="true">|</span>
                        <button 
                          className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
                          aria-label={`Compare ${rate.lender.name} rate with others`}
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
          {rates.map((rate, index) => (
            <div key={rate.id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" role="article" aria-label={`Rate ${index + 1} of ${rates.length}: ${rate.lender.name} ${rate.rate}% ${rate.type} rate`}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${rate.lender.color} rounded-lg flex items-center justify-center text-white text-sm font-bold`} aria-hidden="true">
                    {rate.lender.logo}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900" aria-label={`Lender: ${rate.lender.name}`}>{rate.lender.name}</div>
                    <div className="text-xs text-gray-500" aria-label={`Lender type: ${rate.lender.type}`}>{rate.lender.type}</div>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeStyle(rate.type)}`} aria-label={`Rate type: ${rate.type}`}>
                  {rate.type}
                </span>
              </div>

              {/* Rate Info */}
              <div className="grid grid-cols-2 gap-4 mb-3">
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
                  <span className={`text-xs font-medium ${getChangeColor(rate.isTrending)}`} aria-label={`Rate change: ${rate.change > 0 ? 'increased' : 'decreased'} by ${rate.change.replace('+', '').replace('-', '')} percentage points`}>
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
                    aria-label={`Apply for ${rate.lender.name} ${rate.rate}% mortgage rate`}
                  >
                    Apply Now
                  </button>
                  <button 
                    className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition-colors duration-200 text-sm font-medium"
                    aria-label={`Compare ${rate.lender.name} rate with others`}
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
  );
};

export default RatesTable; 