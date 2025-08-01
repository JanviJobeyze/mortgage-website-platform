import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to top when navigating between pages
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    const scrollToTop = () => {
      // Try smooth scrolling first
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

    // Small delay to ensure the page has loaded
    const timer = setTimeout(scrollToTop, 100);
    
    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default ScrollToTop; 