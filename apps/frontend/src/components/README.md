# Reusable Components

This directory contains reusable React components for the mortgage website platform.

## New Components

### RateComparison

A responsive component for displaying and comparing mortgage rates with filtering and highlighting capabilities.

#### Features

- **Responsive Layouts**: Card and table variants
- **Province Filtering**: Dropdown to filter rates by Canadian provinces
- **Best Rate Highlighting**: Automatically highlights the lowest rate in green
- **Customizable CTAs**: Configurable call-to-action buttons
- **Accessible Design**: Proper ARIA labels and keyboard navigation
- **Mobile Responsive**: Optimized for all screen sizes

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `province` | `string` | `"Ontario"` | Default province for filtering |
| `variant` | `'card' \| 'table'` | `'card'` | Layout variant |
| `ratesData` | `RateData[]` | `[]` | Array of rate objects |
| `showProvinceFilter` | `boolean` | `true` | Whether to show province filter |
| `title` | `string` | `"Mortgage Rate Comparison"` | Component title |
| `subtitle` | `string` | `undefined` | Component subtitle |
| `ctaText` | `string` | `"View All Rates"` | CTA button text |
| `ctaLink` | `string` | `"/rates"` | CTA button link |

#### RateData Interface

```typescript
interface RateData {
  lender: string;
  productType: string;
  rate: number;
  term: string;
  payment?: string;
  province?: string;
}
```

#### Usage Examples

```jsx
// Basic usage
<RateComparison ratesData={rates} />

// Card layout with custom title
<RateComparison 
  ratesData={rates}
  variant="card"
  title="Current Best Rates"
  subtitle="Updated daily from top lenders"
/>

// Table layout with province filter
<RateComparison 
  ratesData={rates}
  variant="table"
  province="British Columbia"
  showProvinceFilter={true}
  ctaText="Get Pre-Approved"
  ctaLink="/pre-qualify"
/>

// Compact variant without province filter
<RateComparison 
  ratesData={rates.slice(0, 3)}
  showProvinceFilter={false}
  title="Quick Rate Check"
/>
```

### MiniMortgageCalculator

A compact mortgage calculator component with real-time calculations and multiple visual variants.

#### Features

- **Real-time Calculations**: Updates payment as user types (optional)
- **Multiple Variants**: Default, compact, and inline layouts
- **Currency Formatting**: Automatic formatting of monetary values
- **Shared Utilities**: Uses existing mortgage calculation functions
- **Result Callbacks**: Optional callback for calculation results
- **Accessible Inputs**: Proper labels and form structure

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValues` | `Partial<CalculatorInputs>` | See below | Default input values |
| `variant` | `'default' \| 'compact' \| 'inline'` | `'default'` | Visual variant |
| `onResultChange` | `(result: CalculatorResult) => void` | `undefined` | Callback for results |
| `showButton` | `boolean` | `false` | Show manual calculate button |
| `title` | `string` | `"Mortgage Calculator"` | Calculator title |
| `subtitle` | `string` | `undefined` | Calculator subtitle |
| `buttonText` | `string` | `"Calculate Payment"` | Button text |

#### Default Values

```javascript
{
  loanAmount: 500000,
  downPayment: 100000,
  interestRate: 5.89,
  amortizationYears: 25
}
```

#### CalculatorResult Interface

```typescript
interface CalculatorResult {
  principal: number;
  monthlyPayment: number;
  formattedPayment: string;
  inputs: CalculatorInputs;
}
```

#### Usage Examples

```jsx
// Basic usage with real-time calculation
<MiniMortgageCalculator />

// With custom defaults and callback
<MiniMortgageCalculator 
  defaultValues={{
    loanAmount: 750000,
    downPayment: 150000,
    interestRate: 6.15,
    amortizationYears: 30
  }}
  onResultChange={(result) => {
    console.log('Monthly payment:', result.formattedPayment);
  }}
/>

// Compact variant
<MiniMortgageCalculator 
  variant="compact"
  title="Quick Calculator"
  subtitle="Fast payment estimation"
/>

// Manual calculation with button
<MiniMortgageCalculator 
  showButton={true}
  buttonText="Calculate My Payment"
  onResultChange={(result) => {
    // Handle result
  }}
/>

// Inline variant for side-by-side layout
<MiniMortgageCalculator 
  variant="inline"
  title="Payment Estimator"
/>
```

## Styling

Both components use Tailwind CSS and follow the existing design system:

- **Colors**: Green accent (`#1B5E20`) for primary actions and highlights
- **Shadows**: Soft shadows for depth and elevation
- **Border Radius**: Consistent rounded corners (`rounded-lg`)
- **Spacing**: Responsive spacing using Tailwind's spacing scale
- **Typography**: Consistent font weights and sizes

## Accessibility

Components include:

- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader friendly structure
- High contrast color schemes
- Focus indicators for interactive elements

## Integration

### Importing Components

```jsx
import { RateComparison, MiniMortgageCalculator } from '../components';
```

### Using with Translation

Both components support i18n through react-i18next:

```jsx
// Translation keys used:
// - calculator.loanAmount
// - calculator.downPayment  
// - calculator.interestRate
// - calculator.amortization
// - calculator.monthlyPayment
```

### Using with Navigation

Components use React Router for navigation:

```jsx
// CTA buttons automatically navigate using useNavigate hook
<RateComparison ctaLink="/rates" />
```

## Performance

- **Memoization**: RateComparison uses `useMemo` for filtered rates
- **Debounced Calculations**: MiniMortgageCalculator uses `useCallback` for calculations
- **Lazy Loading**: Components load efficiently with proper React patterns

## Testing

Components can be tested using:

```jsx
// Example test structure
import { render, screen, fireEvent } from '@testing-library/react';
import { RateComparison, MiniMortgageCalculator } from '../components';

describe('RateComparison', () => {
  it('displays rates correctly', () => {
    // Test implementation
  });
});

describe('MiniMortgageCalculator', () => {
  it('calculates payments correctly', () => {
    // Test implementation
  });
});
```

## Future Enhancements

Potential improvements:

- **Advanced Filtering**: Product type, lender, rate range filters
- **Rate Alerts**: Email notifications for rate changes
- **Comparison Tools**: Side-by-side rate comparison
- **Amortization Schedules**: Detailed payment breakdowns
- **Rate History**: Historical rate tracking
- **Mobile App**: Native mobile components 