import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * WCAG 2.1 Compliant Language Switcher Example
 * 
 * This component demonstrates a fully accessible language switcher dropdown
 * that meets WCAG 2.1 AA standards for keyboard navigation and screen readers.
 * 
 * Key Accessibility Features:
 * - Proper ARIA roles (listbox, option)
 * - Keyboard navigation (Arrow keys, Home, End, Escape, Enter, Space)
 * - Focus management and visible focus indicators
 * - Screen reader announcements
 * - Semantic HTML structure
 * - High contrast focus states
 * 
 * Testing Instructions:
 * 1. Keyboard Navigation Test:
 *    - Tab to the language button
 *    - Press Enter/Space/ArrowDown to open dropdown
 *    - Use Arrow keys to navigate options
 *    - Press Home/End to jump to first/last option
 *    - Press Enter/Space to select
 *    - Press Escape to close
 * 
 * 2. Screen Reader Test (NVDA/JAWS/VoiceOver):
 *    - Navigate to language button
 *    - Listen for "Select language. Current language: English" announcement
 *    - Open dropdown and hear "Language options" announcement
 *    - Navigate through options and hear selection state
 *    - Select language and hear "Language changed to [Language]" announcement
 * 
 * 3. Visual Focus Test:
 *    - Tab through all interactive elements
 *    - Verify green focus ring is visible on all focusable elements
 *    - Check that focus moves logically through the interface
 * 
 * 4. High Contrast Test:
 *    - Enable high contrast mode in OS
 *    - Verify all focus states remain visible
 *    - Check that selected state is clearly distinguishable
 */

function AccessibleLanguageSwitcherExample() {
  const { t, i18n } = useTranslation('common');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (language) => {
    i18n.changeLanguage(language.code);
    setIsDropdownOpen(false);
    setFocusedIndex(-1);
    
    // Store preference
    localStorage.setItem('i18nextLng', language.code);
    
    // Screen reader announcement
    announceToScreenReader(`${t('header.languageChanged')} ${language.name}`);
  };

  const announceToScreenReader = (message) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (!isDropdownOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        closeDropdown();
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
      openDropdown();
    }
  };

  const openDropdown = () => {
    setIsDropdownOpen(true);
    setFocusedIndex(0);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setFocusedIndex(-1);
    buttonRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.language-dropdown')) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Focus management
  useEffect(() => {
    if (isDropdownOpen && focusedIndex >= 0) {
      const optionElement = dropdownRef.current?.querySelector(`[data-index="${focusedIndex}"]`);
      optionElement?.focus();
    }
  }, [focusedIndex, isDropdownOpen]);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">MortgageLink</span>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded">
              {t('header.home')}
            </a>
            <a href="/about" className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded">
              {t('header.about')}
            </a>
            <a href="/contact" className="text-gray-700 hover:text-green-600 px-2 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:rounded">
              {t('header.contact')}
            </a>
          </div>

          {/* Language Switcher */}
          <div className="relative language-dropdown">
            <button
              ref={buttonRef}
              onClick={() => {
                if (isDropdownOpen) {
                  closeDropdown();
                } else {
                  openDropdown();
                }
              }}
              onKeyDown={handleButtonKeyDown}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:border-green-500"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
              aria-label={`${t('header.selectLanguage')}. ${t('header.currentLanguage')}: ${currentLanguage.name}`}
            >
              <span className="text-base" aria-hidden="true">{currentLanguage.flag}</span>
              <span className="text-sm font-medium text-gray-700 hidden sm:block">{currentLanguage.short}</span>
              <svg 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
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
        </div>
      </div>
    </nav>
  );
}

export default AccessibleLanguageSwitcherExample; 