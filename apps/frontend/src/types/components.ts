/**
 * TypeScript interfaces for reusable components
 */

// Rate data structure for RateComparison component
export interface RateData {
  lender: string;
  productType: string;
  rate: number;
  term: string;
  payment?: string;
  province?: string;
}

// RateComparison component props
export interface RateComparisonProps {
  province?: string;
  variant?: 'card' | 'table';
  ratesData: RateData[];
  showProvinceFilter?: boolean;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

// Calculator input values
export interface CalculatorInputs {
  loanAmount: number;
  downPayment: number;
  interestRate: number;
  amortizationYears: number;
}

// Calculator result structure
export interface CalculatorResult {
  principal: number;
  monthlyPayment: number;
  formattedPayment: string;
  inputs: CalculatorInputs;
}

// MiniMortgageCalculator component props
export interface MiniMortgageCalculatorProps {
  defaultValues?: Partial<CalculatorInputs>;
  variant?: 'default' | 'compact' | 'inline';
  onResultChange?: (result: CalculatorResult) => void;
  showButton?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

// Component variant styles
export interface VariantStyles {
  container: string;
  title: string;
  inputGroup: string;
  result: string;
}

// Filtered rates result
export interface FilteredRatesResult {
  rates: RateData[];
  bestRate: RateData | null;
} 