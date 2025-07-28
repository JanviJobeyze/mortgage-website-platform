import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadProvinceRates } from '../utils/rateApiService';

/**
 * Reusable Rates Snapshot Component
 * Displays a compact view of current mortgage rates
 * 
 * @example
 * // Basic usage
 * <RatesSnapshot />
 * 
 * @example
 * // Custom province and title
 * <RatesSnapshot 
 *   province="British Columbia"
 *   title="BC Mortgage Rates"
 *   subtitle="Best rates in British Columbia"
 * />
 * 
 * @example
 * // Compact variant for sidebar
 * <RatesSnapshot 
 *   variant="compact"
 *   maxRates={2}
 *   showViewAllButton={false}
 * />
 * 
 * @example
 * // Featured variant for hero section
 * <RatesSnapshot 
 *   variant="featured"
 *   title="Today's Best Rates"
 *   buttonText="Compare All Rates"
 *   buttonLink="/rates/compare"
 * />
 * 
 * @param {Object} props
 * @param {string} props.title - Section title (default: "Latest Mortgage Rates")
 * @param {string} props.subtitle - Section subtitle (default: "Current best rates from top Canadian lenders")
 * @param {string} props.province - Province to load rates for (default: "Ontario")
 * @param {number} props.maxRates - Maximum number of rates to display (default: 3)
 * @param {boolean} props.showViewAllButton - Whether to show "View All Rates" button (default: true)
 * @param {string} props.buttonText - Custom button text (default: "View All Rates")
 * @param {string} props.buttonLink - Custom button link (default: "/rates")
 * @param {string} props.variant - Visual variant: "default", "compact", "featured" (default: "default")
 * @param {boolean} props.loading - Force loading state (default: false)
 * @param {Array} props.fallbackRates - Fallback rates if API fails
 */
const RatesSnapshot = ({
  title = "Latest Mortgage Rates",
  subtitle = "Current best rates from top Canadian lenders",
  province = "Ontario",
  maxRates = 3,
  showViewAllButton = true,
  buttonText = "View All Rates",
  buttonLink = "/rates",
  variant = "default",
  loading = false,
  fallbackRates = [
    { lender: 'RBC Royal Bank', rate: 2.89, type: 'Fixed', term: '5 Years' },
    { lender: 'TD Canada Trust', rate: 2.99, type: 'Fixed', term: '5 Years' },
    { lender: 'Scotiabank', rate: 2.95, type: 'Variable', term: '5 Years' }
  ]
}) => {
  const navigate = useNavigate();
  const [rates, setRates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load rates on component mount
  useEffect(() => {
    const loadRates = async () => {
      if (loading) {
        setIsLoading(true);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const provinceRates = await loadProvinceRates(province);
        if (provinceRates && provinceRates.rates) {
          // Get top rates sorted by rate
          const topRates = provinceRates.rates
            .sort((a, b) => a.rate - b.rate)
            .slice(0, maxRates);
          setRates(topRates);
        } else {
          setRates(fallbackRates);
        }
      } catch (error) {
        console.error('Error loading rates:', error);
        setError(error.message);
        setRates(fallbackRates);
      } finally {
        setIsLoading(false);
      }
    };

    loadRates();
  }, [province, maxRates, loading, fallbackRates]);

  // Handle navigation
  const handleViewAllClick = () => {
    navigate(buttonLink);
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: "py-4 px-4",
          title: "text-lg font-bold text-[#212121] mb-2",
          subtitle: "text-sm text-[#757575] mb-4",
          grid: "grid-cols-1 sm:grid-cols-3 gap-3",
          card: "bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-4 text-center border border-transparent hover:border-[#1B5E20]",
          rate: "text-2xl font-bold text-[#1B5E20] mb-1",
          lender: "text-xs text-[#9CA3AF] mb-1 font-medium",
          details: "text-xs text-[#757575] mb-2",
          badge: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#E8F5E8] text-[#1B5E20]",
          rateContainer: "bg-gradient-to-br from-[#F1F8E9] to-[#E8F5E8] rounded-lg p-2 mb-2"
        };
      case 'featured':
        return {
          container: "py-12 px-4 bg-gradient-to-r from-[#E8F5E8] to-[#F1F8E9]",
          title: "text-3xl font-bold text-[#212121] mb-3",
          subtitle: "text-lg text-[#757575] mb-8",
          grid: "grid-cols-1 md:grid-cols-3 gap-6",
          card: "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 text-center transform hover:-translate-y-1 border border-transparent hover:border-[#1B5E20]",
          rate: "text-4xl font-bold text-[#1B5E20] mb-3",
          lender: "text-sm text-[#9CA3AF] mb-2 font-medium",
          details: "text-sm text-[#757575] mb-4",
          badge: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#1B5E20] text-white",
          rateContainer: "bg-gradient-to-br from-[#F1F8E9] to-[#E8F5E8] rounded-xl p-4 mb-3"
        };
      default:
        return {
          container: "py-8 sm:py-12 px-4 bg-[#F8F9FA]",
          title: "text-2xl sm:text-3xl font-bold text-[#212121] mb-3",
          subtitle: "text-base sm:text-lg text-[#757575]",
          grid: "grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6",
          card: "bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center border border-transparent hover:border-[#1B5E20] group",
          rate: "text-3xl sm:text-4xl font-bold text-[#1B5E20] mb-2",
          lender: "text-sm text-[#9CA3AF] mb-2 font-medium",
          details: "text-sm text-[#757575] mb-3",
          badge: "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#E8F5E8] text-[#1B5E20]",
          rateContainer: "bg-gradient-to-br from-[#F1F8E9] to-[#E8F5E8] rounded-lg p-3 mb-3 group-hover:shadow-md transition-shadow duration-300"
        };
    }
  };

  const styles = getVariantStyles();

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className={styles.grid}>
      {Array.from({ length: maxRates }).map((_, index) => (
        <div key={index} className={`${styles.card} animate-pulse`}>
          {/* Lender name skeleton */}
          <div className="h-4 bg-gray-200 rounded mb-3"></div>
          
          {/* Rate container skeleton */}
          <div className="bg-gray-100 rounded-lg p-3 mb-3">
            <div className="h-8 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          
          {/* Details skeleton */}
          <div className="flex items-center justify-center space-x-2 mb-3">
            <div className="h-5 bg-gray-200 rounded-full w-12"></div>
            <div className="h-5 bg-gray-200 rounded-full w-16"></div>
          </div>
          
          {/* Badge skeleton */}
          <div className="h-6 bg-gray-200 rounded-full w-24 mx-auto"></div>
        </div>
      ))}
    </div>
  );

  // Error state
  if (error && rates.length === 0) {
    return (
      <div className={styles.container}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-500">Unable to load rates. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        
                 {isLoading ? (
           <LoadingSkeleton />
         ) : (
           <div className={styles.grid}>
             {rates.map((rate, index) => (
               <div key={index} className={styles.card}>
                 {/* Lender Name */}
                 <div className={styles.lender}>
                   {rate.lender}
                 </div>
                 
                 {/* Rate Display with Professional Styling */}
                 <div className={styles.rateContainer}>
                   <div className={styles.rate}>
                     {rate.rate}%
                   </div>
                   <div className="text-xs text-[#1B5E20] font-medium opacity-75">
                     Annual Rate
                   </div>
                 </div>
                 
                 {/* Rate Details */}
                 <div className={styles.details}>
                   <div className="flex items-center justify-center space-x-2 mb-1">
                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#F3E5F5] text-[#7B1FA2]">
                       {rate.type}
                     </span>
                     <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#E3F2FD] text-[#1976D2]">
                       {rate.term}
                     </span>
                   </div>
                 </div>
                 
                 {/* Status Badge */}
                 <div className={styles.badge}>
                   <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                   Available Now
                 </div>
               </div>
             ))}
           </div>
         )}
        
        {showViewAllButton && (
          <div className="text-center mt-8">
            <button 
              onClick={handleViewAllClick}
              className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 shadow-sm hover:shadow-md text-base sm:text-lg"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RatesSnapshot; 