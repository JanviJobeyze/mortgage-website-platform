import React from 'react';
import { useTranslation } from 'react-i18next'; // Activating i18n

const LanguageSelector = () => {
  const { i18n } = useTranslation(); // Using actual i18n
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];
  
  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('preferredLanguage', languageCode);
  };
  
  return (
    <div className="relative inline-block text-left w-full sm:w-auto">
      <div className="flex items-center space-x-2">
        <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">Language:</span>
        <select
          value={i18n.language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="block w-full px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] bg-white transition-colors"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.flag} {language.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LanguageSelector; 