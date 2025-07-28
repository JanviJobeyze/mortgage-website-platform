import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import HomeLogo from '../assets/HomeLogo.png';

function Navigation() {
  const { t, i18n } = useTranslation('common');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', short: 'EN' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', short: 'FR' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳', short: 'HI' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', short: 'PA' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳', short: 'GU' },
    { code: 'es', name: 'Español', flag: '🇪🇸', short: 'ES' }
  ];

  // Get current language info
  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (language) => {
    i18n.changeLanguage(language.code);
    setIsLanguageDropdownOpen(false);
    setFocusedIndex(-1);
    
    // Store language preference in localStorage
    localStorage.setItem('i18nextLng', language.code);
    
    // Announce language change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `${t('header.languageChanged')} ${language.name}`;
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (!isLanguageDropdownOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        setIsLanguageDropdownOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev < languages.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : languages.length - 1
        );
        break;
      case 'Home':
        event.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setFocusedIndex(languages.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (focusedIndex >= 0) {
          handleLanguageSelect(languages[focusedIndex]);
        }
        break;
    }
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
      event.preventDefault();
      setIsLanguageDropdownOpen(true);
      setFocusedIndex(0);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
        setFocusedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  // Focus management
  useEffect(() => {
    if (isLanguageDropdownOpen && focusedIndex >= 0) {
      const optionElement = dropdownRef.current?.querySelector(`[data-index="${focusedIndex}"]`);
      optionElement?.focus();
    }
  }, [focusedIndex, isLanguageDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Skip Link for Screen Readers */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-green-600 focus:text-white focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label={t('header.skipToContent')}
      >
        {t('header.skipToContent')}
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
                <span className="ml-2 text-xl font-semibold text-gray-900">{t('header.brandName')}</span>
              </Link>
            </div>

            {/* Desktop Navigation Menu - Hidden on tablet and mobile */}
            <nav className="hidden xl:flex space-x-6" role="navigation" aria-label={t('header.mainNavigation')}>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.home')}
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.about')}
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.loanServices')}
              </Link>
              <Link 
                to="/calculator" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.calculator')}
              </Link>
              <Link 
                to="/rates" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.rates')}
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.faq')}
              </Link>
              <Link 
                to="/learning-centre" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.learningCentre')}
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded"
              >
                {t('header.contact')}
              </Link>
            </nav>

            {/* Right side - Language Dropdown + Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Language Dropdown */}
              <div className="relative language-dropdown">
                <button
                  ref={buttonRef}
                  onClick={() => {
                    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                    setFocusedIndex(-1);
                  }}
                  onKeyDown={handleButtonKeyDown}
                  className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:border-green-500"
                  aria-expanded={isLanguageDropdownOpen}
                  aria-haspopup="listbox"
                  aria-label={`${t('header.selectLanguage')}. ${t('header.currentLanguage')}: ${currentLanguage.name}`}
                >
                  <span className="text-base" aria-hidden="true">{currentLanguage.flag}</span>
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentLanguage.short}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
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
                  <div 
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transform opacity-100 scale-100 transition-all duration-200" 
                    role="listbox"
                    aria-label={t('header.languageOptions')}
                    onKeyDown={handleKeyDown}
                    tabIndex={-1}
                  >
                    <div className="py-1">
                      {languages.map((language, index) => (
                        <button
                          key={language.code}
                          data-index={index}
                          onClick={() => handleLanguageSelect(language)}
                          className={`flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset focus:bg-gray-100 focus:text-gray-900 ${
                            language.code === currentLanguage.code ? 'bg-green-50 text-green-700 border-r-2 border-green-500' : ''
                          }`}
                          role="option"
                          aria-selected={language.code === currentLanguage.code}
                          tabIndex={-1}
                        >
                          <span className="text-lg" aria-hidden="true">{language.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{language.name}</span>
                            <span className="text-xs text-gray-500">{language.short}</span>
                          </div>
                          {language.code === currentLanguage.code && (
                            <svg className="w-4 h-4 text-green-600 ml-auto" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile/Tablet menu button */}
              <div className="xl:hidden">
                <button 
                  onClick={toggleMobileMenu}
                  className="text-gray-600 hover:text-gray-900 p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-expanded={isMobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label={t('header.toggleMobileMenu')}
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
            <div className="xl:hidden border-t border-gray-200" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50" role="navigation" aria-label={t('header.mobileNavigation')}>
                <Link 
                  to="/" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.home')}
                </Link>
                <Link 
                  to="/about" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.about')}
                </Link>
                <Link 
                  to="/services" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.loanServices')}
                </Link>
                <Link 
                  to="/calculator" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.calculator')}
                </Link>
                <Link 
                  to="/rates" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.rates')}
                </Link>
                <Link 
                  to="/faq" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.faq')}
                </Link>
                <Link 
                  to="/learning-centre" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.learningCentre')}
                </Link>
                <Link 
                  to="/contact" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('header.contact')}
                </Link>
                
                {/* Mobile Language Switcher */}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {t('header.language')}
                  </div>
                  <div className="grid grid-cols-2 gap-2" role="group" aria-label={t('header.mobileLanguageOptions')}>
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => {
                          handleLanguageSelect(language);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                          language.code === currentLanguage.code 
                            ? 'bg-green-100 text-green-700 border border-green-300' 
                            : 'text-gray-700 hover:bg-white hover:text-gray-900'
                        }`}
                        aria-pressed={language.code === currentLanguage.code}
                      >
                        <span className="text-base" aria-hidden="true">{language.flag}</span>
                        <span className="font-medium">{language.short}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Navigation; 