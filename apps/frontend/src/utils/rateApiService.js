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
 * Generate mock rate data for a specific province
 */
const generateMockRatesForProvince = (province) => {
  const baseRates = {
    'Ontario': [
      { lender: 'RBC Royal Bank', rate: 2.89, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 2.99, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.95, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.05, type: 'Fixed', term: '5 Years' },
      { lender: 'BMO', rate: 2.92, type: 'Variable', term: '5 Years' }
    ],
    'British Columbia': [
      { lender: 'RBC Royal Bank', rate: 2.91, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 3.01, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.97, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.07, type: 'Fixed', term: '5 Years' },
      { lender: 'Vancity', rate: 2.88, type: 'Variable', term: '5 Years' }
    ],
    'Alberta': [
      { lender: 'RBC Royal Bank', rate: 2.87, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 2.97, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.93, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.03, type: 'Fixed', term: '5 Years' },
      { lender: 'ATB Financial', rate: 2.85, type: 'Variable', term: '5 Years' }
    ],
    'Quebec': [
      { lender: 'RBC Royal Bank', rate: 2.90, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 3.00, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.96, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.06, type: 'Fixed', term: '5 Years' },
      { lender: 'Desjardins', rate: 2.89, type: 'Variable', term: '5 Years' }
    ],
    'Nova Scotia': [
      { lender: 'RBC Royal Bank', rate: 2.93, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 3.03, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.99, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.09, type: 'Fixed', term: '5 Years' },
      { lender: 'Credit Union Atlantic', rate: 2.91, type: 'Variable', term: '5 Years' }
    ],
    'New Brunswick': [
      { lender: 'RBC Royal Bank', rate: 2.94, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 3.04, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 3.00, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.10, type: 'Fixed', term: '5 Years' },
      { lender: 'Assumption Life', rate: 2.92, type: 'Variable', term: '5 Years' }
    ],
    'Manitoba': [
      { lender: 'RBC Royal Bank', rate: 2.88, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 2.98, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.94, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.04, type: 'Fixed', term: '5 Years' },
      { lender: 'Assiniboine Credit Union', rate: 2.86, type: 'Variable', term: '5 Years' }
    ],
    'Saskatchewan': [
      { lender: 'RBC Royal Bank', rate: 2.86, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 2.96, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 2.92, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.02, type: 'Fixed', term: '5 Years' },
      { lender: 'Affinity Credit Union', rate: 2.84, type: 'Variable', term: '5 Years' }
    ],
    'Prince Edward Island': [
      { lender: 'RBC Royal Bank', rate: 2.95, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 3.05, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 3.01, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.11, type: 'Fixed', term: '5 Years' },
      { lender: 'Island Savings', rate: 2.93, type: 'Variable', term: '5 Years' }
    ],
    'Newfoundland and Labrador': [
      { lender: 'RBC Royal Bank', rate: 2.96, type: 'Fixed', term: '5 Years' },
      { lender: 'TD Canada Trust', rate: 3.06, type: 'Fixed', term: '5 Years' },
      { lender: 'Scotiabank', rate: 3.02, type: 'Variable', term: '5 Years' },
      { lender: 'CIBC', rate: 3.12, type: 'Fixed', term: '5 Years' },
      { lender: 'Newfoundland and Labrador Credit Union', rate: 2.94, type: 'Variable', term: '5 Years' }
    ]
  };

  // Get base rates for province or use Ontario as fallback
  const provinceRates = baseRates[province] || baseRates['Ontario'];

  // Transform to full rate objects with additional data
  return provinceRates.map((baseRate, index) => ({
    id: `${province}-${index + 1}`,
    lender: {
      name: baseRate.lender,
      type: getLenderType(baseRate.lender),
      logo: getLenderLogo(baseRate.lender),
      color: getLenderColor(baseRate.lender)
    },
    rate: baseRate.rate,
    apr: (baseRate.rate + 0.23).toFixed(2), // Simulate APR calculation
    term: baseRate.term,
    type: baseRate.type,
    purpose: 'Home Purchase',
    provinces: [province],
    change: generateRandomChange(),
    isTrending: getTrendingDirection(),
    features: generateFeatures(baseRate.lender),
    lastUpdated: new Date().toISOString(),
    province: province
  }));
};

/**
 * Get lender type based on lender name
 */
const getLenderType = (lenderName) => {
  const majorBanks = ['RBC Royal Bank', 'TD Canada Trust', 'Scotiabank', 'CIBC', 'BMO'];
  const creditUnions = ['Vancity', 'ATB Financial', 'Desjardins', 'Credit Union Atlantic', 'Assumption Life', 'Assiniboine Credit Union', 'Affinity Credit Union', 'Island Savings', 'Newfoundland and Labrador Credit Union'];
  
  if (majorBanks.includes(lenderName)) return 'Major Bank';
  if (creditUnions.includes(lenderName)) return 'Credit Union';
  return 'Monoline';
};

/**
 * Get lender logo abbreviation
 */
const getLenderLogo = (lenderName) => {
  const logoMap = {
    'RBC Royal Bank': 'RBC',
    'TD Canada Trust': 'TD',
    'Scotiabank': 'SC',
    'CIBC': 'CIBC',
    'BMO': 'BMO',
    'Vancity': 'VC',
    'ATB Financial': 'ATB',
    'Desjardins': 'DES',
    'Credit Union Atlantic': 'CUA',
    'Assumption Life': 'AL',
    'Assiniboine Credit Union': 'ACU',
    'Affinity Credit Union': 'AFF',
    'Island Savings': 'IS',
    'Newfoundland and Labrador Credit Union': 'NLCU'
  };
  return logoMap[lenderName] || lenderName.substring(0, 3).toUpperCase();
};

/**
 * Get lender color
 */
const getLenderColor = (lenderName) => {
  const colorMap = {
    'RBC Royal Bank': 'bg-blue-600',
    'TD Canada Trust': 'bg-green-600',
    'Scotiabank': 'bg-blue-800',
    'CIBC': 'bg-red-700',
    'BMO': 'bg-blue-500',
    'Vancity': 'bg-green-700',
    'ATB Financial': 'bg-orange-600',
    'Desjardins': 'bg-blue-700',
    'Credit Union Atlantic': 'bg-purple-600',
    'Assumption Life': 'bg-indigo-600',
    'Assiniboine Credit Union': 'bg-teal-600',
    'Affinity Credit Union': 'bg-pink-600',
    'Island Savings': 'bg-yellow-600',
    'Newfoundland and Labrador Credit Union': 'bg-red-600'
  };
  return colorMap[lenderName] || 'bg-gray-600';
};

/**
 * Generate random rate change
 */
const generateRandomChange = () => {
  const changes = [-0.15, -0.10, -0.05, 0.00, 0.05, 0.10, 0.15];
  return changes[Math.floor(Math.random() * changes.length)];
};

/**
 * Get trending direction based on change
 */
const getTrendingDirection = () => {
  const directions = ['up', 'down', 'stable'];
  return directions[Math.floor(Math.random() * directions.length)];
};

/**
 * Generate features based on lender
 */
const generateFeatures = () => {
  const allFeatures = [
    'No prepayment penalty',
    'Cashback available',
    'Portable mortgage',
    'Prime - 1.35%',
    'No frills mortgage',
    'Flexible payments',
    'Prepayment privileges',
    'Rate guarantee',
    'Online banking',
    'Mobile app access',
    'Branch support',
    'Online tools',
    '24/7 support'
  ];
  
  // Return 2-4 random features
  const numFeatures = Math.floor(Math.random() * 3) + 2;
  const shuffled = allFeatures.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numFeatures);
};

/**
 * Simulate API call to fetch rates for a specific province
 */
const fetchProvinceRates = async (province) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
    
    // In real implementation, this would be:
    // const response = await fetch(`${API_BASE_URL}/api/rates/${getProvinceCode(province)}`);
    // return await response.json();
    
    // For now, generate mock data
    return generateMockRatesForProvince(province);
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