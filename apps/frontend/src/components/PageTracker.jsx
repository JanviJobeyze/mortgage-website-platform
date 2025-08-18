import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView, trackEnhancedPageView } from '../utils/analytics';

// Component to track page views automatically
const PageTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view when location changes
    const pageTitle = document.title;
    const pagePath = location.pathname;
    
    // Enhanced page view tracking with additional context
    trackEnhancedPageView({
      pageTitle,
      pagePath,
      pageCategory: 'mortgage_website',
      pageType: getPageType(pagePath),
      customParameters: {
        page_section: getPageSection(pagePath),
        user_language: navigator.language || 'en',
        user_agent: navigator.userAgent,
        referrer: document.referrer || 'direct'
      }
    });
  }, [location]);

  return null; // This component doesn't render anything
};

// Helper function to determine page type
const getPageType = (pathname) => {
  if (pathname === '/') return 'homepage';
  if (pathname.includes('/calculator')) return 'tool';
  if (pathname.includes('/rates')) return 'rates';
  if (pathname.includes('/pre-qualify')) return 'quiz';
  if (pathname.includes('/apply')) return 'application';
  if (pathname.includes('/contact')) return 'contact';
  if (pathname.includes('/services')) return 'services';
  if (pathname.includes('/about')) return 'about';
  if (pathname.includes('/faq')) return 'faq';
  if (pathname.includes('/learning-centre')) return 'education';
  if (pathname.includes('/news')) return 'news';
  return 'content';
};

// Helper function to determine page section
const getPageSection = (pathname) => {
  if (pathname === '/') return 'home';
  if (pathname.includes('/calculator')) return 'tools';
  if (pathname.includes('/rates')) return 'rates';
  if (pathname.includes('/pre-qualify')) return 'qualification';
  if (pathname.includes('/apply')) return 'application';
  if (pathname.includes('/contact')) return 'contact';
  if (pathname.includes('/services')) return 'services';
  if (pathname.includes('/about')) return 'company';
  if (pathname.includes('/faq')) return 'support';
  if (pathname.includes('/learning-centre')) return 'education';
  if (pathname.includes('/news')) return 'news';
  return 'general';
};

export default PageTracker; 