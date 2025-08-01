import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const AmortizationChart = ({ totalMortgage, mortgageRate, amortizationYears }) => {
  // Generate amortization data
  const generateAmortizationData = () => {
    const monthlyRate = mortgageRate / 100 / 12;
    const totalPayments = amortizationYears * 12;
    const monthlyPayment = totalMortgage * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const data = [];
    let remainingBalance = totalMortgage;

    // Generate data for each year (12 months)
    for (let year = 1; year <= amortizationYears; year++) {
      let yearPrincipal = 0;
      let yearInterest = 0;

      // Calculate for each month in the year
      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        yearPrincipal += principalPayment;
        yearInterest += interestPayment;
        remainingBalance -= principalPayment;
      }

      data.push({
        year,
        principal: yearPrincipal,
        interest: yearInterest,
        balance: remainingBalance
      });
    }

    return data;
  };

  const amortizationData = generateAmortizationData();

  const chartData = {
    labels: amortizationData.map(d => `Year ${d.year}`),
    datasets: [
      {
        label: 'Principal',
        data: amortizationData.map(d => d.principal),
        backgroundColor: '#2E7D32',
        borderColor: '#2E7D32',
        borderWidth: 1,
        yAxisID: 'y',
        type: 'bar'
      },
      {
        label: 'Interest',
        data: amortizationData.map(d => d.interest),
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
        borderWidth: 1,
        yAxisID: 'y',
        type: 'bar'
      },
      {
        label: 'Remaining Balance',
        data: amortizationData.map(d => d.balance),
        borderColor: '#FF9800',
        backgroundColor: 'transparent',
        borderWidth: 3,
        yAxisID: 'y1',
        type: 'line',
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#FF9800',
        pointHoverBorderColor: '#FF9800'
      }
    ]
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Amortization Schedule',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: $${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Years'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Payment Amount ($)'
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Remaining Balance ($)'
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return '$' + value.toLocaleString();
          }
        }
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AmortizationChart; 