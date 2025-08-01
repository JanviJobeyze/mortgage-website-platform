import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const MortgagePaymentChart = ({ mortgageData, formData }) => {
  // Calculate payment breakdown
  const monthlyPayment = mortgageData.monthlyPayment || 0;
  const principalPortion = mortgageData.principalPortion || 0;
  const interestPortion = mortgageData.interestPortion || 0;
  const taxPortion = mortgageData.taxPortion || 0;

  const data = {
    labels: ['Principal', 'Interest', 'Property Tax'],
    datasets: [
      {
        data: [principalPortion, interestPortion, taxPortion],
        backgroundColor: [
          '#1B5E20', // Dark green for principal
          '#2E7D32', // Medium green for interest
          '#4CAF50', // Light green for tax
        ],
        borderColor: [
          '#0D4A0D',
          '#1B5E20',
          '#2E7D32',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          '#0D4A0D',
          '#1B5E20',
          '#2E7D32',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
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
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const percentage = ((value / monthlyPayment) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Monthly Payment Breakdown</h3>
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-600">Principal</div>
          <div className="text-lg font-semibold text-[#1B5E20]">
            ${principalPortion.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {((principalPortion / monthlyPayment) * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Interest</div>
          <div className="text-lg font-semibold text-[#2E7D32]">
            ${interestPortion.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {((interestPortion / monthlyPayment) * 100).toFixed(1)}%
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Property Tax</div>
          <div className="text-lg font-semibold text-[#4CAF50]">
            ${taxPortion.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {((taxPortion / monthlyPayment) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgagePaymentChart; 