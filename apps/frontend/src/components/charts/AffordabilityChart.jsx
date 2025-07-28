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

const AffordabilityChart = ({ affordabilityData }) => {
  const gdsRatio = affordabilityData.gdsRatio || 0;
  const tdsRatio = affordabilityData.tdsRatio || 0;
  const maxGDS = 32; // Maximum recommended GDS ratio
  const maxTDS = 40; // Maximum recommended TDS ratio

  const data = {
    labels: ['Gross Debt Service (GDS)', 'Total Debt Service (TDS)'],
    datasets: [
      {
        label: 'Your Ratio',
        data: [gdsRatio, tdsRatio],
        backgroundColor: [
          gdsRatio <= maxGDS ? '#1B5E20' : '#DC2626', // Green if good, red if over
          tdsRatio <= maxTDS ? '#2E7D32' : '#DC2626', // Green if good, red if over
        ],
        borderColor: [
          gdsRatio <= maxGDS ? '#0D4A0D' : '#B91C1C',
          tdsRatio <= maxTDS ? '#1B5E20' : '#B91C1C',
        ],
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Maximum Recommended',
        data: [maxGDS, maxTDS],
        backgroundColor: 'rgba(156, 163, 175, 0.3)',
        borderColor: '#9CA3AF',
        borderWidth: 2,
        borderRadius: 4,
        borderDash: [5, 5],
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
            return `${label}: ${value.toFixed(1)}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
        ticks: {
          callback: function(value) {
            return value + '%';
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

  const getStatusColor = (ratio, maxRatio) => {
    return ratio <= maxRatio ? 'text-green-600' : 'text-red-600';
  };

  const getStatusText = (ratio, maxRatio) => {
    return ratio <= maxRatio ? 'Good' : 'Over Limit';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Affordability Analysis</h3>
      <div className="h-64 mb-4">
        <Bar data={data} options={options} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">GDS Ratio</div>
          <div className={`text-xl font-bold ${getStatusColor(gdsRatio, maxGDS)}`}>
            {gdsRatio.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">
            Max: {maxGDS}% • {getStatusText(gdsRatio, maxGDS)}
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">TDS Ratio</div>
          <div className={`text-xl font-bold ${getStatusColor(tdsRatio, maxTDS)}`}>
            {tdsRatio.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">
            Max: {maxTDS}% • {getStatusText(tdsRatio, maxTDS)}
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="text-sm font-semibold text-yellow-900 mb-2">💡 Affordability Guidelines</h4>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• <strong>GDS Ratio:</strong> Should be 32% or less of gross income</li>
          <li>• <strong>TDS Ratio:</strong> Should be 40% or less of gross income</li>
          <li>• Lower ratios = better mortgage approval chances</li>
        </ul>
      </div>
    </div>
  );
};

export default AffordabilityChart; 