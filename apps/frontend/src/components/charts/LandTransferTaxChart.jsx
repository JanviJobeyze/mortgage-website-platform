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

const LandTransferTaxChart = ({ landTransferData }) => {
  const provincialTax = landTransferData.provincialTax || 0;
  const municipalTax = landTransferData.municipalTax || 0;
  const totalTax = landTransferData.totalTax || 0;
  const homePrice = landTransferData.homePrice || 0;

  const data = {
    labels: ['Land Transfer Tax Breakdown'],
    datasets: [
      {
        label: 'Provincial Tax',
        data: [provincialTax],
        backgroundColor: '#1B5E20',
        borderColor: '#0D4A0D',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Municipal Tax',
        data: [municipalTax],
        backgroundColor: '#2E7D32',
        borderColor: '#1B5E20',
        borderWidth: 2,
        borderRadius: 4,
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
            const percentage = ((value / homePrice) * 100).toFixed(2);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
          afterLabel: function(context) {
            return `Total: $${totalTax.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        stacked: true,
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
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
        stacked: true,
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
      <h3 className="text-lg font-semibold text-[#1B5E20] mb-4">Land Transfer Tax Breakdown</h3>
      <div className="h-64 mb-4">
        <Bar data={data} options={options} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Provincial Tax</div>
          <div className="text-lg font-semibold text-[#1B5E20]">
            ${provincialTax.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {((provincialTax / homePrice) * 100).toFixed(2)}% of home price
          </div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">Municipal Tax</div>
          <div className="text-lg font-semibold text-[#2E7D32]">
            ${municipalTax.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {((municipalTax / homePrice) * 100).toFixed(2)}% of home price
          </div>
        </div>
        <div className="text-center p-3 bg-[#E8F5E8] rounded-lg border border-[#C8E6C9]">
          <div className="text-sm text-gray-600">Total Tax</div>
          <div className="text-lg font-bold text-[#1B5E20]">
            ${totalTax.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            {((totalTax / homePrice) * 100).toFixed(2)}% of home price
          </div>
        </div>
      </div>
      {landTransferData.firstTimeBuyerRebate > 0 && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-green-900">First-Time Buyer Rebate</div>
              <div className="text-xs text-green-700">Available for first-time homebuyers</div>
            </div>
            <div className="text-lg font-bold text-green-600">
              -${landTransferData.firstTimeBuyerRebate.toLocaleString()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandTransferTaxChart; 