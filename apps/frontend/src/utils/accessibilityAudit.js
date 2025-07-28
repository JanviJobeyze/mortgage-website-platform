/**
 * Accessibility Audit Utility
 * 
 * This utility provides functions to check for common accessibility issues
 * and can be used during development to ensure WCAG 2.1 AA compliance.
 */

export const accessibilityAudit = {
  /**
   * Check if all images have alt attributes
   */
  checkImageAltText: () => {
    const images = document.querySelectorAll('img');
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
    
    if (imagesWithoutAlt.length > 0) {
      console.warn('Accessibility Issue: Images without alt text found:', imagesWithoutAlt);
      return false;
    }
    
    console.log('✅ All images have alt text');
    return true;
  },

  /**
   * Check if all buttons and links are keyboard accessible
   */
  checkKeyboardAccessibility: () => {
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    const nonAccessibleElements = Array.from(interactiveElements).filter(el => {
      const style = window.getComputedStyle(el);
      return style.pointerEvents === 'none' || el.tabIndex === -1;
    });
    
    if (nonAccessibleElements.length > 0) {
      console.warn('Accessibility Issue: Non-keyboard accessible elements found:', nonAccessibleElements);
      return false;
    }
    
    console.log('✅ All interactive elements are keyboard accessible');
    return true;
  },

  /**
   * Check for proper heading hierarchy
   */
  checkHeadingHierarchy: () => {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
    
    let previousLevel = 0;
    let hasIssues = false;
    
    headingLevels.forEach((level, index) => {
      if (level - previousLevel > 1) {
        console.warn(`Accessibility Issue: Heading hierarchy skip detected at index ${index}: ${previousLevel} -> ${level}`);
        hasIssues = true;
      }
      previousLevel = level;
    });
    
    if (!hasIssues) {
      console.log('✅ Heading hierarchy is properly structured');
    }
    
    return !hasIssues;
  },

  /**
   * Check for proper ARIA labels
   */
  checkAriaLabels: () => {
    const elementsWithAria = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]');
    const elementsWithoutLabels = Array.from(elementsWithAria).filter(el => {
      const ariaLabel = el.getAttribute('aria-label');
      const ariaLabelledBy = el.getAttribute('aria-labelledby');
      const ariaDescribedBy = el.getAttribute('aria-describedby');
      
      return (!ariaLabel || ariaLabel.trim() === '') && 
             (!ariaLabelledBy || ariaLabelledBy.trim() === '') &&
             (!ariaDescribedBy || ariaDescribedBy.trim() === '');
    });
    
    if (elementsWithoutLabels.length > 0) {
      console.warn('Accessibility Issue: Elements with empty ARIA attributes found:', elementsWithoutLabels);
      return false;
    }
    
    console.log('✅ ARIA labels are properly implemented');
    return true;
  },

  /**
   * Check color contrast (basic check)
   */
  checkColorContrast: () => {
    // This is a basic check - for comprehensive contrast checking,
    // use tools like axe-core or Lighthouse
    const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
    const lowContrastElements = Array.from(textElements).filter(el => {
      const style = window.getComputedStyle(el);
      const color = style.color;
      const backgroundColor = style.backgroundColor;
      
      // Basic check - in a real implementation, you'd use a color contrast library
      return color === backgroundColor;
    });
    
    if (lowContrastElements.length > 0) {
      console.warn('Accessibility Issue: Potential low contrast elements found:', lowContrastElements);
      return false;
    }
    
    console.log('✅ Basic color contrast check passed');
    return true;
  },

  /**
   * Check for semantic HTML usage
   */
  checkSemanticHTML: () => {
    const semanticElements = document.querySelectorAll('main, article, section, nav, header, footer, aside');
    const divElements = document.querySelectorAll('div');
    
    if (divElements.length > semanticElements.length * 10) {
      console.warn('Accessibility Issue: Consider using more semantic HTML elements');
      return false;
    }
    
    console.log('✅ Semantic HTML usage looks good');
    return true;
  },

  /**
   * Run all accessibility checks
   */
  runFullAudit: () => {
    console.log('🔍 Running Accessibility Audit...');
    
    const results = {
      imageAltText: accessibilityAudit.checkImageAltText(),
      keyboardAccessibility: accessibilityAudit.checkKeyboardAccessibility(),
      headingHierarchy: accessibilityAudit.checkHeadingHierarchy(),
      ariaLabels: accessibilityAudit.checkAriaLabels(),
      colorContrast: accessibilityAudit.checkColorContrast(),
      semanticHTML: accessibilityAudit.checkSemanticHTML()
    };
    
    const passedChecks = Object.values(results).filter(Boolean).length;
    const totalChecks = Object.keys(results).length;
    
    console.log(`\n📊 Accessibility Audit Results: ${passedChecks}/${totalChecks} checks passed`);
    
    if (passedChecks === totalChecks) {
      console.log('🎉 All accessibility checks passed!');
    } else {
      console.log('⚠️  Some accessibility issues were found. Please review the warnings above.');
    }
    
    return results;
  }
};

// Auto-run audit in development mode
if (import.meta.env.DEV) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => accessibilityAudit.runFullAudit(), 1000);
    });
  } else {
    setTimeout(() => accessibilityAudit.runFullAudit(), 1000);
  }
}

export default accessibilityAudit; 