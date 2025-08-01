import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { calculateMonthlyPayment, formatCurrencyAmount } from '../utils/mortgageCalculations';

/**
 * MiniMortgageCalculator Component
 * Compact mortgage calculator with real-time calculations
 * 
 * @example
 * // Basic usage
 * <MiniMortgageCalculator />
 * 
 * @example
 * // With custom defaults and callback
 * <MiniMortgageCalculator 
 *   defaultValues={{
 *     loanAmount: 500000,
 *     downPayment: 100000,
 *     interestRate: 5.89,
 *     amortizationYears: 25
 *   }}
 *   onResultChange={(result) => console.log(result)}
 *   showButton={true}
 * />
 * 
 * @param {Object} props
 * @param {Object} props.defaultValues - Default values for calculator inputs
 * @param {string} props.variant - Visual variant: "default" | "compact" | "inline" (default: "default")
 * @param {Function} props.onResultChange - Callback function when calculation changes
 * @param {boolean} props.showButton - Whether to show calculate button (default: false for real-time)
 * @param {string} props.title - Calculator title (default: "Mortgage Calculator")
 * @param {string} props.subtitle - Calculator subtitle
 * @param {string} props.buttonText - Button text (default: "Calculate Payment")
 */
const MiniMortgageCalculator = ({
  defaultValues = {
    loanAmount: 500000,
    downPayment: 100000,
    interestRate: 5.89,
    amortizationYears: 25
  },
  variant = "default",
  onResultChange,
  showButton = false,
  title = "Mortgage Calculator",
  subtitle,
  buttonText = "Calculate Payment"
}) => {
  const { t } = useTranslation('common');
  
  // State for input values
  const [inputs, setInputs] = useState({
    loanAmount: defaultValues.loanAmount?.toString() || '500,000',
    downPayment: defaultValues.downPayment?.toString() || '100,000',
    interestRate: defaultValues.interestRate?.toString() || '5.89',
    amortizationYears: defaultValues.amortizationYears?.toString() || '25'
  });

  // State for calculated result
  const [monthlyPayment, setMonthlyPayment] = useState('$0');
  const [isCalculating, setIsCalculating] = useState(false);

  // Format number input with commas
  const formatNumberInput = (value) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    if (numericValue === '') return '';
    
    const number = parseFloat(numericValue);
    if (isNaN(number)) return '';
    
    return number.toLocaleString('en-CA');
  };

  // Parse formatted number back to numeric value
  const parseFormattedNumber = (value) => {
    return parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  };

  // Calculate mortgage payment
  const calculatePayment = useCallback(() => {
    try {
      setIsCalculating(true);
      
      // Parse input values
      const loanAmount = parseFormattedNumber(inputs.loanAmount);
      const downPayment = parseFormattedNumber(inputs.downPayment);
      const interestRate = parseFloat(inputs.interestRate) || 0;
      const amortizationYears = parseFloat(inputs.amortizationYears) || 25;
      
      // Calculate principal (loan amount minus down payment)
      const principal = loanAmount - downPayment;
      
      // Validate inputs
      if (principal <= 0 || amortizationYears <= 0 || interestRate < 0) {
        setMonthlyPayment('$0');
        return;
      }
      
      // Calculate monthly payment
      const payment = calculateMonthlyPayment(principal, interestRate, amortizationYears);
      const formattedPayment = formatCurrencyAmount(payment);
      
      setMonthlyPayment(formattedPayment);
      
      // Call callback if provided
      if (onResultChange) {
        onResultChange({
          principal,
          monthlyPayment: payment,
          formattedPayment,
          inputs: {
            loanAmount,
            downPayment,
            interestRate,
            amortizationYears
          }
        });
      }
    } catch (error) {
      console.error('Error calculating payment:', error);
      setMonthlyPayment('$0');
    } finally {
      setIsCalculating(false);
    }
  }, [inputs, onResultChange]);

  // Real-time calculation effect
  useEffect(() => {
    if (!showButton) {
      calculatePayment();
    }
  }, [inputs, showButton, calculatePayment]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    // Format number inputs with commas
    if (field === 'loanAmount' || field === 'downPayment') {
      formattedValue = formatNumberInput(value);
    }
    
    setInputs(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  // Handle button click
  const handleCalculateClick = () => {
    calculatePayment();
  };

  // Get variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'bg-white rounded-lg shadow-sm border border-gray-200 p-4',
          title: 'text-lg font-semibold text-gray-900 mb-3',
          inputGroup: 'space-y-3',
          result: 'bg-gray-50 p-3 rounded-lg'
        };
      case 'inline':
        return {
          container: 'bg-white rounded-lg shadow-md p-6',
          title: 'text-xl font-bold text-gray-900 mb-4',
          inputGroup: 'grid grid-cols-1 md:grid-cols-2 gap-4',
          result: 'bg-green-50 p-4 rounded-lg border border-green-200'
        };
      default:
        return {
          container: 'bg-white rounded-lg shadow-lg p-6',
          title: 'text-xl font-bold text-gray-900 mb-4',
          inputGroup: 'space-y-4',
          result: 'bg-gray-50 p-4 rounded-lg'
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className="mb-4">
        <h3 className={styles.title}>{title}</h3>
        {subtitle && (
          <p className="text-gray-600 text-sm">{subtitle}</p>
        )}
      </div>

      {/* Input Fields */}
      <div className={styles.inputGroup}>
        {/* Loan Amount */}
        <div>
          <label htmlFor="loan-amount" className="block text-sm font-medium text-gray-700 mb-2">
            {t('calculator.loanAmount', 'Loan Amount')}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              id="loan-amount"
              type="text"
              value={inputs.loanAmount}
              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm"
              placeholder="500,000"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label htmlFor="down-payment" className="block text-sm font-medium text-gray-700 mb-2">
            {t('calculator.downPayment', 'Down Payment')}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input
              id="down-payment"
              type="text"
              value={inputs.downPayment}
              onChange={(e) => handleInputChange('downPayment', e.target.value)}
              className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm"
              placeholder="100,000"
            />
          </div>
        </div>

        {/* Interest Rate and Amortization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="interest-rate" className="block text-sm font-medium text-gray-700 mb-2">
              {t('calculator.interestRate', 'Interest Rate')} (%)
            </label>
            <input
              id="interest-rate"
              type="text"
              value={inputs.interestRate}
              onChange={(e) => handleInputChange('interestRate', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm"
              placeholder="5.89"
            />
          </div>
          <div>
            <label htmlFor="amortization" className="block text-sm font-medium text-gray-700 mb-2">
              {t('calculator.amortization', 'Amortization')} (Years)
            </label>
            <input
              id="amortization"
              type="text"
              value={inputs.amortizationYears}
              onChange={(e) => handleInputChange('amortizationYears', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white text-gray-900 text-sm"
              placeholder="25"
            />
          </div>
        </div>
      </div>

      {/* Calculate Button (if enabled) */}
      {showButton && (
        <div className="mb-4">
          <button
            onClick={handleCalculateClick}
            disabled={isCalculating}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-sm"
          >
            {isCalculating ? 'Calculating...' : buttonText}
          </button>
        </div>
      )}

      {/* Result Display */}
      <div className={styles.result}>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {t('calculator.monthlyPayment', 'Monthly Payment')}
          </span>
          <span className="text-xl font-bold text-green-600">
            {monthlyPayment}
          </span>
        </div>
        
        {/* Additional Info */}
        <div className="mt-2 text-xs text-gray-500">
          <p>Principal: {formatCurrencyAmount(parseFormattedNumber(inputs.loanAmount) - parseFormattedNumber(inputs.downPayment))}</p>
          <p>Down Payment: {formatCurrencyAmount(parseFormattedNumber(inputs.downPayment))}</p>
        </div>
      </div>
    </div>
  );
};

export default MiniMortgageCalculator; 