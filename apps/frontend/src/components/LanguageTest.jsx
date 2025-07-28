import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageTest() {
  const { t, i18n } = useTranslation('common');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Language Test Component</h2>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Current Language: {i18n.language}</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => changeLanguage('en')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('fr')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Français
          </button>
          <button 
            onClick={() => changeLanguage('es')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Español
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <p><strong>Brand Name:</strong> {t('header.brandName')}</p>
        <p><strong>Home:</strong> {t('header.home')}</p>
        <p><strong>About:</strong> {t('header.about')}</p>
        <p><strong>Contact:</strong> {t('header.contact')}</p>
        <p><strong>Company Description:</strong> {t('footer.companyDescription')}</p>
        <p><strong>Quick Links:</strong> {t('footer.quickLinks')}</p>
      </div>
    </div>
  );
}

export default LanguageTest; 