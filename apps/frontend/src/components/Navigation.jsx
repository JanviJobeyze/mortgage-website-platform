import { Link } from 'react-router-dom';
import { useState } from 'react';
import HomeLogo from '../assets/HomeLogo.png';

function Navigation() {
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language.name);
    setIsLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Skip Link for Screen Readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src={HomeLogo} 
                  alt="MortgageLink" 
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-semibold text-gray-900">MortgageLink</span>
              </Link>
            </div>

            {/* Desktop Navigation Menu - Hidden on tablet and mobile */}
            <nav className="hidden lg:flex space-x-8" role="navigation" aria-label="Main navigation">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Loan Services
              </Link>
              <Link 
                to="/calculator" 
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Calculator
              </Link>
              <Link 
                to="/news" 
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                News
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Contact
              </Link>
            </nav>

            {/* Right side - Language Dropdown + Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="flex items-center space-x-2 px-2 sm:px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
                  aria-expanded={isLanguageDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Select language"
                >
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{selectedLanguage}</span>
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isLanguageDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50" role="menu" aria-orientation="vertical">
                    <div className="py-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => handleLanguageSelect(language)}
                          className="flex items-center space-x-3 w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150"
                          role="menuitem"
                        >
                          <span className="text-base sm:text-lg" aria-hidden="true">{language.flag}</span>
                          <span className="font-medium">{language.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile/Tablet menu button */}
              <div className="lg:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors duration-200"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Toggle mobile menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50" role="navigation" aria-label="Mobile navigation">
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/services" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Loan Services
                </Link>
                <Link 
                  to="/calculator" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Calculator
                </Link>
                <Link 
                  to="/news" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  News
                </Link>
                <Link 
                  to="/faq" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Click outside to close dropdown */}
        {isLanguageDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsLanguageDropdownOpen(false)}
            aria-hidden="true"
          ></div>
        )}
      </header>
    </>
  );
}

export default Navigation; 