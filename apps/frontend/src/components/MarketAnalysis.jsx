import { useState, useEffect } from 'react';

// Mock data for sparklines - in real app, this would come from API
const generateSparklineData = (baseRate, trend, days = 30) => {
  const data = [];
  let currentRate = baseRate;
  
  for (let i = 0; i < days; i++) {
    // Add some random variation to make it look realistic
    const variation = (Math.random() - 0.5) * 0.1;
    currentRate += trend + variation;
    data.push(Math.max(0, currentRate)); // Ensure rate doesn't go negative
  }
  
  return data;
};

const RateSparkline = ({ data, color, width = 120, height = 40, label, currentRate, delta }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center w-32 h-10 bg-gray-100 rounded text-xs text-gray-500">
        Chart unavailable
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center w-32 h-10 bg-gray-100 rounded animate-pulse">
        <div className="w-16 h-2 bg-gray-200 rounded"></div>
      </div>
    );
  }

  // Simple sparkline implementation without external library
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - minValue) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <svg width={width} height={height} className="overflow-visible">
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={points}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900">{label}</span>
        <div className="flex items-center space-x-1">
          <span className="text-xs text-gray-600">{currentRate}%</span>
          <span className={`text-xs font-medium ${delta >= 0 ? 'text-red-600' : 'text-green-600'}`}>
            {delta >= 0 ? '+' : ''}{delta}%
          </span>
        </div>
      </div>
    </div>
  );
};

const MarketAnalysis = () => {
  const [marketData, setMarketData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Simulate API call
    const fetchMarketData = async () => {
      try {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in real app, this would come from API
        const data = {
          fixedRate: {
            current: 2.89,
            delta: -0.15,
            data: generateSparklineData(3.04, -0.005), // Slight downward trend
            color: '#10B981' // Green for decreasing rates
          },
          variableRate: {
            current: 3.25,
            delta: 0.25,
            data: generateSparklineData(3.00, 0.008), // Slight upward trend
            color: '#EF4444' // Red for increasing rates
          },
          lastUpdated: new Date().toLocaleDateString(),
          nextBoCAnnouncement: 'March 6, 2025'
        };
        
        setMarketData(data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Market Analysis</h3>
        <div className="space-y-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !marketData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Market Analysis</h3>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-yellow-800">
              Market data temporarily unavailable. Please try again later.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Market Analysis</h3>
        <span className="text-xs text-gray-500">
          Updated: {marketData.lastUpdated}
        </span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rate Trends with Sparklines - Left Column */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">Rate Trends (30 Days)</h4>
          <div className="space-y-4">
            <RateSparkline
              data={marketData.fixedRate.data}
              color={marketData.fixedRate.color}
              label="5-Year Fixed"
              currentRate={marketData.fixedRate.current}
              delta={marketData.fixedRate.delta}
            />
            <RateSparkline
              data={marketData.variableRate.data}
              color={marketData.variableRate.color}
              label="Variable Rate"
              currentRate={marketData.variableRate.current}
              delta={marketData.variableRate.delta}
            />
          </div>
        </div>

        {/* Bank of Canada Impact - Right Column */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Bank of Canada Impact</h4>
          <p className="text-sm text-gray-600 mb-3">
            Recent BoC policy decisions have influenced mortgage rates, with fixed rates showing a slight decrease while variable rates have increased.
          </p>
          <div className="bg-green-100 border border-green-200 rounded-md p-3">
            <div className="flex items-center">
              <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-green-800">
                Next BoC Announcement: {marketData.nextBoCAnnouncement}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Insights - Full Width Below */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Market Insights</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-blue-800">Fixed Rates</span>
            </div>
            <p className="text-xs text-blue-700">
              Trending downward due to improved economic outlook and stable inflation expectations.
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 text-orange-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-orange-800">Variable Rates</span>
            </div>
            <p className="text-xs text-orange-700">
              Slightly increasing as markets anticipate potential future rate adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis; 