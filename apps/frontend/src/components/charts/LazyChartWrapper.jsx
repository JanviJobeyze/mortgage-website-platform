import React, { Suspense } from 'react';

// Dynamic imports for chart components
const MortgagePaymentChart = React.lazy(() => import('./MortgagePaymentChart.jsx'));
const AffordabilityChart = React.lazy(() => import('./AffordabilityChart.jsx'));
const LandTransferTaxChart = React.lazy(() => import('./LandTransferTaxChart.jsx'));
const DownPaymentChart = React.lazy(() => import('./DownPaymentChart.jsx'));
const AmortizationChart = React.lazy(() => import('./AmortizationChart.jsx'));

// Loading component for charts
const ChartLoading = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1B5E20]"></div>
    <span className="ml-3 text-gray-600">Loading chart...</span>
  </div>
);

// Chart wrapper components
export const LazyMortgagePaymentChart = (props) => (
  <Suspense fallback={<ChartLoading />}>
    <MortgagePaymentChart {...props} />
  </Suspense>
);

export const LazyAffordabilityChart = (props) => (
  <Suspense fallback={<ChartLoading />}>
    <AffordabilityChart {...props} />
  </Suspense>
);

export const LazyLandTransferTaxChart = (props) => (
  <Suspense fallback={<ChartLoading />}>
    <LandTransferTaxChart {...props} />
  </Suspense>
);

export const LazyDownPaymentChart = (props) => (
  <Suspense fallback={<ChartLoading />}>
    <DownPaymentChart {...props} />
  </Suspense>
);

export const LazyAmortizationChart = (props) => (
  <Suspense fallback={<ChartLoading />}>
    <AmortizationChart {...props} />
  </Suspense>
); 