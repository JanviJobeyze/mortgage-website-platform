import React from 'react';

// This is a placeholder component to show how charts would be integrated
// In a real implementation, you would install chart.js and react-chartjs-2
const ChartExample = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">📊 Chart Examples</h3>
      
      <div className="space-y-6">
        {/* Mortgage Payment Breakdown Chart */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-[#1B5E20] mb-3">Monthly Payment Breakdown (Pie Chart)</h4>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm">Pie Chart showing:</div>
              <div className="text-xs mt-1">
                • Principal: $1,200 (40%)<br/>
                • Interest: $1,500 (50%)<br/>
                • Property Tax: $300 (10%)
              </div>
            </div>
          </div>
        </div>

        {/* Affordability Analysis Chart */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-[#1B5E20] mb-3">Affordability Analysis (Bar Chart)</h4>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-sm">Bar Chart showing:</div>
              <div className="text-xs mt-1">
                • GDS Ratio: 28% (Good)<br/>
                • TDS Ratio: 35% (Good)<br/>
                • Max Recommended: 32% / 40%
              </div>
            </div>
          </div>
        </div>

        {/* Land Transfer Tax Chart */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-[#1B5E20] mb-3">Land Transfer Tax Breakdown (Stacked Bar)</h4>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">🏠</div>
              <div className="text-sm">Stacked Bar showing:</div>
              <div className="text-xs mt-1">
                • Provincial Tax: $8,475<br/>
                • Municipal Tax: $8,475<br/>
                • Total: $16,950
              </div>
            </div>
          </div>
        </div>

        {/* Down Payment Comparison Chart */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-[#1B5E20] mb-3">Down Payment Comparison (Bar Chart)</h4>
          <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm">Bar Chart showing:</div>
              <div className="text-xs mt-1">
                • 5%: $25K down + $18.6K insurance<br/>
                • 10%: $50K down + $13.9K insurance<br/>
                • 15%: $75K down + $11.9K insurance<br/>
                • 20%: $100K down (no insurance)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2">🔧 Implementation Notes</h4>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• Install: <code>npm install chart.js react-chartjs-2</code></li>
          <li>• Charts update automatically when inputs change</li>
          <li>• Color-coded with your green/yellow theme</li>
          <li>• Responsive design for all screen sizes</li>
          <li>• Interactive tooltips with detailed information</li>
        </ul>
      </div>
    </div>
  );
};

export default ChartExample; 