import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * RateComparison Component
 * Displays mortgage rates by product type with filtering and highlighting
 * 
 * @example
 * // Basic usage
 * <RateComparison ratesData={rates} />
 * 
 * @example
 * // With custom province and variant
 * <RateComparison 
 *   province="British Columbia"
 *   variant="table"
 *   ratesData={rates}
 * />
 * 
 * @param {Object} props
 * @param {string} props.province - Province to filter rates (default: "Ontario")
 * @param {string} props.variant - Layout variant: "card" | "table" (default: "card")
 * @param {Array} props.ratesData - Array of rate objects
 * @param {boolean} props.showProvinceFilter - Whether to show province filter (default: true)
 * @param {string} props.title - Component title (default: "Mortgage Rate Comparison")
 * @param {string} props.subtitle - Component subtitle
 * @param {string} props.ctaText - CTA button text (default: "View All Rates")
 * @param {string} props.ctaLink - CTA button link (default: "/rates")
 */
const RateComparison = ({
  province = "Ontario",
  variant = "card",
  ratesData = [],
  showProvinceFilter = true,
  title = "Mortgage Rate Comparison",
  subtitle,
  ctaText = "View All Rates",
  ctaLink = "/rates"
}) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState(province);

  // Available provinces for filtering
  const provinces = [
    "Ontario",
    "British Columbia", 
    "Alberta",
    "Quebec",
    "Manitoba",
    "Saskatchewan",
    "Nova Scotia",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Prince Edward Island"
  ];

  // Filter rates by selected province and find best rate
  const filteredRates = useMemo(() => {
    const filtered = ratesData.filter(rate => 
      !selectedProvince || rate.province === selectedProvince
    );
    
    // Find the best rate (lowest rate)
    const bestRate = filtered.length > 0 
      ? filtered.reduce((min, rate) => rate.rate < min.rate ? rate : min)
      : null;
    
    return { rates: filtered, bestRate };
  }, [ratesData, selectedProvince]);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const handleCTAClick = () => {
    navigate(ctaLink);
  };

  // Card variant layout
  const CardLayout = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredRates.rates.map((rate, index) => (
        <div 
          key={`${rate.lender}-${rate.term}-${index}`}
          className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 border-2 ${
            filteredRates.bestRate && rate.rate === filteredRates.bestRate.rate
              ? 'border-green-500 bg-green-50'
              : 'border-gray-100'
          }`}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">{rate.lender}</h4>
              <p className="text-gray-600 text-xs">{rate.productType}</p>
            </div>
            {filteredRates.bestRate && rate.rate === filteredRates.bestRate.rate && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Best Rate
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Rate:</span>
              <span className={`font-bold text-lg ${
                filteredRates.bestRate && rate.rate === filteredRates.bestRate.rate
                  ? 'text-green-600'
                  : 'text-gray-900'
              }`}>
                {rate.rate}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Term:</span>
              <span className="font-medium text-gray-900 text-sm">{rate.term}</span>
            </div>
            
            {rate.payment && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Payment:</span>
                <span className="font-medium text-gray-900 text-sm">{rate.payment}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  // Table variant layout
  const TableLayout = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lender
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rate
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Term
              </th>
              {filteredRates.rates.some(rate => rate.payment) && (
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRates.rates.map((rate, index) => (
              <tr 
                key={`${rate.lender}-${rate.term}-${index}`}
                className={`hover:bg-gray-50 ${
                  filteredRates.bestRate && rate.rate === filteredRates.bestRate.rate
                    ? 'bg-green-50'
                    : ''
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 text-sm">{rate.lender}</span>
                    {filteredRates.bestRate && rate.rate === filteredRates.bestRate.rate && (
                      <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Best
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                  {rate.productType}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`font-bold text-lg ${
                    filteredRates.bestRate && rate.rate === filteredRates.bestRate.rate
                      ? 'text-green-600'
                      : 'text-gray-900'
                  }`}>
                    {rate.rate}%
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {rate.term}
                </td>
                {rate.payment && (
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {rate.payment}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 text-sm">{subtitle}</p>
        )}
      </div>

      {/* Province Filter */}
      {showProvinceFilter && (
        <div className="mb-6">
          <label htmlFor="province-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Province
          </label>
          <select
            id="province-filter"
            value={selectedProvince}
            onChange={handleProvinceChange}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm"
          >
            <option value="">All Provinces</option>
            {provinces.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>
      )}

      {/* Rates Display */}
      <div className="mb-6">
        {filteredRates.rates.length > 0 ? (
          variant === 'table' ? <TableLayout /> : <CardLayout />
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No rates available for the selected criteria.</p>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={handleCTAClick}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default RateComparison; 