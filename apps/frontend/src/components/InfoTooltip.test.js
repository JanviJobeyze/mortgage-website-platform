import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoTooltip from './InfoTooltip';

describe('InfoTooltip Component', () => {
  
  test('renders info icon by default', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Information about Test Term');
  });

  test('renders question icon when specified', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
        icon="question"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('shows tooltip on hover', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    
    // Tooltip should not be visible initially
    expect(screen.queryByText('Test Term')).not.toBeInTheDocument();
    
    // Hover to show tooltip
    fireEvent.mouseEnter(button);
    expect(screen.getByText('Test Term')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    
    // Mouse leave to hide tooltip
    fireEvent.mouseLeave(button);
    expect(screen.queryByText('Test Term')).not.toBeInTheDocument();
  });

  test('shows tooltip on focus for accessibility', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    
    // Focus to show tooltip
    fireEvent.focus(button);
    expect(screen.getByText('Test Term')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    
    // Blur to hide tooltip
    fireEvent.blur(button);
    expect(screen.queryByText('Test Term')).not.toBeInTheDocument();
  });

  test('applies different sizes correctly', () => {
    const { rerender } = render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
        size="xs"
      />
    );
    
    let button = screen.getByRole('button');
    expect(button.querySelector('svg')).toHaveClass('w-3', 'h-3');
    
    rerender(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
        size="lg"
      />
    );
    
    button = screen.getByRole('button');
    expect(button.querySelector('svg')).toHaveClass('w-6', 'h-6');
  });

  test('applies different positions correctly', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
        position="bottom"
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    const tooltip = screen.getByText('Test Term').closest('div');
    expect(tooltip).toHaveClass('top-full', 'left-1/2', 'transform', '-translate-x-1/2', 'mt-2');
  });

  test('applies custom className', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
        className="custom-class"
      />
    );
    
    const container = screen.getByRole('button').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  test('handles empty term gracefully', () => {
    render(
      <InfoTooltip 
        term=""
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Information about ');
  });

  test('handles empty description gracefully', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description=""
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    expect(screen.getByText('Test Term')).toBeInTheDocument();
    expect(screen.getByText('')).toBeInTheDocument();
  });

  test('has proper focus styles for accessibility', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-[#1B5E20]', 'focus:ring-offset-1', 'rounded-full');
  });

  test('tooltip has proper z-index and positioning', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    const tooltip = screen.getByText('Test Term').closest('div');
    expect(tooltip).toHaveClass('z-50');
  });

  test('tooltip content has proper styling', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    const tooltipContent = screen.getByText('Test Term').closest('div');
    expect(tooltipContent).toHaveClass('bg-gray-800', 'text-white', 'text-xs', 'sm:text-sm', 'rounded-lg', 'px-3', 'py-2', 'max-w-xs', 'shadow-lg');
  });

  test('term title has proper styling', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    const termTitle = screen.getByText('Test Term');
    expect(termTitle).toHaveClass('font-semibold', 'mb-1');
  });

  test('description has proper styling', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    const description = screen.getByText('Test description');
    expect(description).toHaveClass('text-gray-200', 'leading-relaxed');
  });

  test('icon has proper hover effects', () => {
    render(
      <InfoTooltip 
        term="Test Term"
        description="Test description"
      />
    );
    
    const button = screen.getByRole('button');
    const icon = button.querySelector('svg');
    
    expect(icon).toHaveClass('text-gray-400', 'hover:text-[#1B5E20]', 'transition-colors');
  });

  test('handles long descriptions properly', () => {
    const longDescription = 'This is a very long description that should be properly handled by the tooltip component. It should wrap correctly and not overflow the container.';
    
    render(
      <InfoTooltip 
        term="Test Term"
        description={longDescription}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    expect(screen.getByText(longDescription)).toBeInTheDocument();
  });

  test('handles special characters in term and description', () => {
    render(
      <InfoTooltip 
        term="APR (Annual % Rate)"
        description="Rate with special chars: 2.5% - 5.0%"
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.mouseEnter(button);
    
    expect(screen.getByText('APR (Annual % Rate)')).toBeInTheDocument();
    expect(screen.getByText('Rate with special chars: 2.5% - 5.0%')).toBeInTheDocument();
  });

  test('multiple tooltips work independently', () => {
    render(
      <div>
        <InfoTooltip 
          term="First Term"
          description="First description"
        />
        <InfoTooltip 
          term="Second Term"
          description="Second description"
        />
      </div>
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    // Hover first tooltip
    fireEvent.mouseEnter(buttons[0]);
    expect(screen.getByText('First Term')).toBeInTheDocument();
    expect(screen.queryByText('Second Term')).not.toBeInTheDocument();
    
    // Hover second tooltip
    fireEvent.mouseLeave(buttons[0]);
    fireEvent.mouseEnter(buttons[1]);
    expect(screen.queryByText('First Term')).not.toBeInTheDocument();
    expect(screen.getByText('Second Term')).toBeInTheDocument();
  });
});

console.log('InfoTooltip component tests completed successfully!'); 