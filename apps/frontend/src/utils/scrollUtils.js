/**
 * Scroll Utilities
 * Helper functions for smooth scrolling and scroll-to-top functionality
 */

/**
 * Smooth scroll to top of the page
 */
export const scrollToTop = () => {
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    // Fallback for browsers that don't support smooth scrolling
    window.scrollTo(0, 0);
  }
};

/**
 * Smooth scroll to a specific element by ID
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      element.scrollIntoView();
    }
  }
};

/**
 * Smooth scroll to a specific element by selector
 */
export const scrollToSelector = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    try {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } catch (error) {
      // Fallback for browsers that don't support smooth scrolling
      element.scrollIntoView();
    }
  }
};

/**
 * Get current scroll position
 */
export const getScrollPosition = () => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
};

/**
 * Check if element is in viewport
 */
export const isElementInViewport = (element) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}; 