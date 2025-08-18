/**
 * Rate API Service
 * Handles province-based rate data loading and caching
 */

// API configuration
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Rate data cache
const rateCache = new Map();

/**
 * Province mapping for API calls
 */
export const PROVINCES = {
  ON: 'Ontario',
  BC: 'British Columbia',
  AB: 'Alberta',
  QC: 'Quebec',
  NS: 'Nova Scotia',
  NB: 'New Brunswick',
  MB: 'Manitoba',
  SK: 'Saskatchewan',
  PE: 'Prince Edward Island',
  NL: 'Newfoundland and Labrador',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  YT: 'Yukon'
};

/**
 * Get province code from full name
 */
export const getProvinceCode = (provinceName) => {
  const entries = Object.entries(PROVINCES);
  const entry = entries.find(([, name]) => name === provinceName);
  return entry ? entry[0] : null;
};

/**
 * Get province name from code
 */
export const getProvinceName = (provinceCode) => {
  return PROVINCES[provinceCode] || provinceCode;
};

/**
 * Check if cache is valid
 */
const isCacheValid = (cacheEntry) => {
  if (!cacheEntry) return false;
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
};

/**
 * Clear expired cache entries
 */
const clearExpiredCache = () => {
  const now = Date.now();
  for (const [key, entry] of rateCache.entries()) {
    if (now - entry.timestamp > CACHE_DURATION) {
      rateCache.delete(key);
    }
  }
};

/**
 * Simulate API call to fetch rates for a specific province
 */
const fetchProvinceRates = async (province) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rates`);
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to fetch rates');
    }
    
    // Filter rates for the specific province
    return result.data.filter(rate => 
      rate.provinces.includes(province) || 
      rate.provinces.includes('All Provinces')
    );
  } catch (error) {
    console.error(`Error fetching rates for ${province}:`, error);
    throw new Error(`Failed to fetch rates for ${province}`);
  }
};

/**
 * Load rates for a specific province with caching
 */
export const loadProvinceRates = async (province) => {
  // Clear expired cache entries
  clearExpiredCache();
  
  const cacheKey = `rates-${province}`;
  const cachedData = rateCache.get(cacheKey);
  
  // Return cached data if valid
  if (isCacheValid(cachedData)) {
    console.log(`Returning cached rates for ${province}`);
    return cachedData.data;
  }
  
  try {
    console.log(`Fetching rates for ${province}...`);
    const rates = await fetchProvinceRates(province);
    
    // Cache the results
    rateCache.set(cacheKey, {
      data: rates,
      timestamp: Date.now()
    });
    
    console.log(`Successfully loaded ${rates.length} rates for ${province}`);
    return rates;
  } catch (error) {
    console.error(`Failed to load rates for ${province}:`, error);
    throw error;
  }
};

/**
 * Load rates for all provinces
 */
export const loadAllProvinceRates = async () => {
  const allRates = {};
  const provinces = Object.values(PROVINCES);
  
  try {
    // Use Promise.allSettled to handle individual province failures gracefully
    const results = await Promise.allSettled(
      provinces.map(async (province) => {
        try {
          const rates = await loadProvinceRates(province);
          return { province, rates };
        } catch (error) {
          console.error(`Failed to load rates for ${province}:`, error);
          return { province, rates: [] };
        }
      })
    );
    
    // Process results
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        allRates[result.value.province] = result.value.rates;
      } else {
        console.error('Promise rejected:', result.reason);
      }
    });
    
    console.log('Loaded rates for provinces:', Object.keys(allRates));
    return allRates;
  } catch (error) {
    console.error('Failed to load all province rates:', error);
    throw error;
  }
};

/**
 * Get rates for multiple provinces
 */
export const loadMultipleProvinceRates = async (provinces) => {
  const rates = {};
  
  try {
    const promises = provinces.map(async (province) => {
      try {
        const provinceRates = await loadProvinceRates(province);
        rates[province] = provinceRates;
      } catch (error) {
        console.error(`Failed to load rates for ${province}:`, error);
        rates[province] = [];
      }
    });
    
    await Promise.all(promises);
    return rates;
  } catch (error) {
    console.error('Failed to load multiple province rates:', error);
    throw error;
  }
};

/**
 * Clear cache for a specific province
 */
export const clearProvinceCache = (province) => {
  const cacheKey = `rates-${province}`;
  rateCache.delete(cacheKey);
  console.log(`Cleared cache for ${province}`);
};

/**
 * Clear all cache
 */
export const clearAllCache = () => {
  rateCache.clear();
  console.log('Cleared all rate cache');
};

/**
 * Get cache statistics
 */
export const getCacheStats = () => {
  clearExpiredCache();
  return {
    totalEntries: rateCache.size,
    provinces: Array.from(rateCache.keys()).map(key => key.replace('rates-', '')),
    cacheDuration: CACHE_DURATION / 1000 / 60 // in minutes
  };
};

/**
 * Simulate real-time rate updates
 */
export const subscribeToRateUpdates = (province, callback) => {
  // In real implementation, this would use WebSocket or Server-Sent Events
  const interval = setInterval(async () => {
    try {
      const rates = await loadProvinceRates(province);
      callback(rates);
    } catch (error) {
      console.error('Error in rate update subscription:', error);
    }
  }, 30000); // Update every 30 seconds
  
  // Return unsubscribe function
  return () => clearInterval(interval);
};

export default {
  loadProvinceRates,
  loadAllProvinceRates,
  loadMultipleProvinceRates,
  clearProvinceCache,
  clearAllCache,
  getCacheStats,
  subscribeToRateUpdates,
  PROVINCES,
  getProvinceCode,
  getProvinceName
}; 