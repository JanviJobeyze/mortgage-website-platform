import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DownPaymentChart = ({ downPaymentOptions }) => {
  const data = {
    labels: downPaymentOptions.map(option => `${option.percent}%`),
    datasets: [
      {
        label: 'Down Payment Amount',
        data: downPaymentOptions.map(option => option.downPayment),
        backgroundColor: downPaymentOptions.map(option => 
          option.isEligible ? '#1B5E20' : '#DC2626'
        ),
        borderColor: downPaymentOptions.map(option => 
          option.isEligible ? '#0D4A0D' : '#B91C1C'
        ),
        borderWidth: 2,
        borderRadius: 4,
        order: 2,
      },
      {
        label: 'Insurance Premium',
        data: downPaymentOptions.map(option => option.insurancePremium),
        backgroundColor: downPaymentOptions.map(option => 
          option.insurancePremium > 0 ? '#2E7D32' : 'rgba(46, 125, 50, 0.3)'
        ),
        borderColor: downPaymentOptions.map(option => 
          option.insurancePremium > 0 ? '#1B5E20' : 'rgba(27, 94, 32, 0.3)'
        ),
        borderWidth: 2,
        borderRadius: 4,
        order: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(27, 94, 32, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#1B5E20',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y || 0;
            const homePrice = downPaymentOptions[context.dataIndex]?.homePrice || 0;
            const percentage = ((value / homePrice) * 100).toFixed(2);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
          afterLabel: function(context) {
            const option = downPaymentOptions[context.dataIndex];
            if (option) {
              return [
                `Total Mortgage: $${option.totalMortgage.toLocaleString()}`,
                option.isEligible ? '✅ Eligible' : '❌ Not Eligible'
              ];
            }
            return '';
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '$' + (value / 1000) + 'K';
          },
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#6B7280',
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#6B7280',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Down Payment Comparison</h3>
      <div className="h-64 mb-4">
        <Bar data={data} options={options} />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {downPaymentOptions.map((option) => (
          <div 
            key={option.percent}
            className={`text-center p-3 rounded-lg border ${
              option.isEligible 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="text-sm font-medium text-gray-700">{option.percent}%</div>
            <div className={`text-lg font-bold ${
              option.isEligible ? 'text-[#1B5E20]' : 'text-red-600'
            }`}>
              ${option.downPayment.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500">
              {option.insurancePremium > 0 
                ? `+$${option.insurancePremium.toLocaleString()} insurance`
                : 'No insurance'
              }
            </div>
            {!option.isEligible && (
              <div className="text-xs text-red-600 mt-1">
                Not eligible
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2">📊 Chart Legend</h4>
        <div className="grid grid-cols-2 gap-4 text-xs text-yellow-800">
          <div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-[#1B5E20] rounded mr-2"></div>
              <span><strong>Down Payment:</strong> Your initial cash contribution</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-[#2E7D32] rounded mr-2"></div>
              <span><strong>Insurance Premium:</strong> CMHC insurance cost (if applicable)</span>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
              <span><strong>Green:</strong> Eligible option</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
              <span><strong>Red:</strong> Not eligible</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownPaymentChart; 