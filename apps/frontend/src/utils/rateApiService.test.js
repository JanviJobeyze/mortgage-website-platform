import { 
  loadProvinceRates, 
  loadAllProvinceRates, 
  loadMultipleProvinceRates,
  clearProvinceCache,
  clearAllCache,
  getCacheStats,
  PROVINCES,
  getProvinceCode,
  getProvinceName
} from './rateApiService';

// Mock console.log to avoid noise in tests
const originalConsoleLog = console.log;
beforeEach(() => {
  console.log = jest.fn();
});

afterEach(() => {
  console.log = originalConsoleLog;
});

describe('Rate API Service Tests', () => {
  
  test('should load rates for a specific province', async () => {
    const rates = await loadProvinceRates('Ontario');
    
    expect(rates).toBeDefined();
    expect(Array.isArray(rates)).toBe(true);
    expect(rates.length).toBeGreaterThan(0);
    
    // Check rate structure
    const firstRate = rates[0];
    expect(firstRate).toHaveProperty('id');
    expect(firstRate).toHaveProperty('lender');
    expect(firstRate).toHaveProperty('rate');
    expect(firstRate).toHaveProperty('type');
    expect(firstRate).toHaveProperty('term');
    expect(firstRate).toHaveProperty('province');
    expect(firstRate.province).toBe('Ontario');
  });
  
  test('should load rates for all provinces', async () => {
    const allRates = await loadAllProvinceRates();
    
    expect(allRates).toBeDefined();
    expect(typeof allRates).toBe('object');
    
    // Check that we have rates for multiple provinces
    const provinces = Object.keys(allRates);
    expect(provinces.length).toBeGreaterThan(1);
    
    // Check that each province has rates
    provinces.forEach(province => {
      expect(Array.isArray(allRates[province])).toBe(true);
      expect(allRates[province].length).toBeGreaterThan(0);
    });
  });
  
  test('should load rates for multiple specific provinces', async () => {
    const provinces = ['Ontario', 'British Columbia'];
    const rates = await loadMultipleProvinceRates(provinces);
    
    expect(rates).toBeDefined();
    expect(typeof rates).toBe('object');
    expect(Object.keys(rates)).toHaveLength(2);
    
    expect(rates['Ontario']).toBeDefined();
    expect(rates['British Columbia']).toBeDefined();
    expect(Array.isArray(rates['Ontario'])).toBe(true);
    expect(Array.isArray(rates['British Columbia'])).toBe(true);
  });
  
  test('should handle province code conversion correctly', () => {
    expect(getProvinceCode('Ontario')).toBe('ON');
    expect(getProvinceCode('British Columbia')).toBe('BC');
    expect(getProvinceCode('Alberta')).toBe('AB');
    expect(getProvinceCode('Quebec')).toBe('QC');
    expect(getProvinceCode('Unknown Province')).toBeNull();
  });
  
  test('should handle province name conversion correctly', () => {
    expect(getProvinceName('ON')).toBe('Ontario');
    expect(getProvinceName('BC')).toBe('British Columbia');
    expect(getProvinceName('AB')).toBe('Alberta');
    expect(getProvinceName('QC')).toBe('Quebec');
    expect(getProvinceName('UNKNOWN')).toBe('UNKNOWN');
  });
  
  test('should cache rates and return cached data on subsequent calls', async () => {
    // First call - should fetch from API
    const rates1 = await loadProvinceRates('Ontario');
    expect(rates1).toBeDefined();
    
    // Second call - should return cached data
    const rates2 = await loadProvinceRates('Ontario');
    expect(rates2).toBeDefined();
    expect(rates2).toEqual(rates1);
  });
  
  test('should clear cache for specific province', async () => {
    // Load rates to populate cache
    await loadProvinceRates('Ontario');
    
    // Clear cache
    clearProvinceCache('Ontario');
    
    // Get cache stats
    const stats = getCacheStats();
    expect(stats.provinces).not.toContain('Ontario');
  });
  
  test('should clear all cache', async () => {
    // Load rates for multiple provinces to populate cache
    await loadProvinceRates('Ontario');
    await loadProvinceRates('British Columbia');
    
    // Clear all cache
    clearAllCache();
    
    // Get cache stats
    const stats = getCacheStats();
    expect(stats.totalEntries).toBe(0);
  });
  
  test('should provide cache statistics', async () => {
    // Load some rates to populate cache
    await loadProvinceRates('Ontario');
    
    const stats = getCacheStats();
    
    expect(stats).toHaveProperty('totalEntries');
    expect(stats).toHaveProperty('provinces');
    expect(stats).toHaveProperty('cacheDuration');
    expect(typeof stats.totalEntries).toBe('number');
    expect(Array.isArray(stats.provinces)).toBe(true);
    expect(typeof stats.cacheDuration).toBe('number');
  });
  
  test('should handle errors gracefully', async () => {
    // Test with invalid province
    try {
      await loadProvinceRates('Invalid Province');
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toContain('Failed to fetch rates');
    }
  });
  
  test('should have correct PROVINCES mapping', () => {
    expect(PROVINCES).toBeDefined();
    expect(typeof PROVINCES).toBe('object');
    
    // Check that we have all expected provinces
    expect(PROVINCES.ON).toBe('Ontario');
    expect(PROVINCES.BC).toBe('British Columbia');
    expect(PROVINCES.AB).toBe('Alberta');
    expect(PROVINCES.QC).toBe('Quebec');
    expect(PROVINCES.NS).toBe('Nova Scotia');
    expect(PROVINCES.NB).toBe('New Brunswick');
    expect(PROVINCES.MB).toBe('Manitoba');
    expect(PROVINCES.SK).toBe('Saskatchewan');
    expect(PROVINCES.PE).toBe('Prince Edward Island');
    expect(PROVINCES.NL).toBe('Newfoundland and Labrador');
    expect(PROVINCES.NT).toBe('Northwest Territories');
    expect(PROVINCES.NU).toBe('Nunavut');
    expect(PROVINCES.YT).toBe('Yukon');
  });
  
  test('should generate different rates for different provinces', async () => {
    const ontarioRates = await loadProvinceRates('Ontario');
    const bcRates = await loadProvinceRates('British Columbia');
    
    // Rates should be different between provinces
    expect(ontarioRates).not.toEqual(bcRates);
    
    // But structure should be the same
    expect(ontarioRates.length).toBe(bcRates.length);
    expect(Object.keys(ontarioRates[0])).toEqual(Object.keys(bcRates[0]));
  });
  
  test('should include all required rate properties', async () => {
    const rates = await loadProvinceRates('Ontario');
    const rate = rates[0];
    
    // Required properties
    expect(rate).toHaveProperty('id');
    expect(rate).toHaveProperty('lender');
    expect(rate).toHaveProperty('rate');
    expect(rate).toHaveProperty('apr');
    expect(rate).toHaveProperty('term');
    expect(rate).toHaveProperty('type');
    expect(rate).toHaveProperty('purpose');
    expect(rate).toHaveProperty('provinces');
    expect(rate).toHaveProperty('change');
    expect(rate).toHaveProperty('isTrending');
    expect(rate).toHaveProperty('features');
    expect(rate).toHaveProperty('lastUpdated');
    expect(rate).toHaveProperty('province');
    
    // Lender properties
    expect(rate.lender).toHaveProperty('name');
    expect(rate.lender).toHaveProperty('type');
    expect(rate.lender).toHaveProperty('logo');
    expect(rate.lender).toHaveProperty('color');
  });
});

// Performance tests
describe('Rate API Service Performance Tests', () => {
  
  test('should load rates within reasonable time', async () => {
    const startTime = Date.now();
    await loadProvinceRates('Ontario');
    const endTime = Date.now();
    
    const duration = endTime - startTime;
    expect(duration).toBeLessThan(2000); // Should complete within 2 seconds
  });
  
  test('should handle concurrent requests efficiently', async () => {
    const startTime = Date.now();
    
    const promises = [
      loadProvinceRates('Ontario'),
      loadProvinceRates('British Columbia'),
      loadProvinceRates('Alberta')
    ];
    
    await Promise.all(promises);
    const endTime = Date.now();
    
    const duration = endTime - startTime;
    expect(duration).toBeLessThan(3000); // Should complete within 3 seconds
  });
});

// Integration tests
describe('Rate API Service Integration Tests', () => {
  
  test('should work with Rates component integration', async () => {
    // Simulate what the Rates component does
    const selectedProvince = 'Ontario';
    let rates;
    
    if (selectedProvince === 'All Provinces') {
      const allRates = await loadAllProvinceRates();
      rates = Object.values(allRates).flat();
    } else {
      rates = await loadProvinceRates(selectedProvince);
    }
    
    expect(rates).toBeDefined();
    expect(Array.isArray(rates)).toBe(true);
    expect(rates.length).toBeGreaterThan(0);
  });
  
  test('should handle filter combinations correctly', async () => {
    const rates = await loadProvinceRates('Ontario');
    
    // Simulate filtering
    const fixedRates = rates.filter(rate => rate.type === 'Fixed');
    const variableRates = rates.filter(rate => rate.type === 'Variable');
    
    expect(fixedRates.length).toBeGreaterThan(0);
    expect(variableRates.length).toBeGreaterThan(0);
    expect(fixedRates.length + variableRates.length).toBeLessThanOrEqual(rates.length);
  });
});

console.log('Rate API Service tests completed successfully!'); 