import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCalculator from '../public/locales/en/calculator.json';
import enPreQualQuiz from '../public/locales/en/prequalquiz.json';
import enCommon from '../public/locales/en/common.json';

import frCalculator from '../public/locales/fr/calculator.json';
import frPreQualQuiz from '../public/locales/fr/prequalquiz.json';
import frCommon from '../public/locales/fr/common.json';

import hiCalculator from '../public/locales/hi/calculator.json';
import hiPreQualQuiz from '../public/locales/hi/prequalquiz.json';
import hiCommon from '../public/locales/hi/common.json';

import paCalculator from '../public/locales/pa/calculator.json';
import paPreQualQuiz from '../public/locales/pa/prequalquiz.json';
import paCommon from '../public/locales/pa/common.json';

import guCalculator from '../public/locales/gu/calculator.json';
import guPreQualQuiz from '../public/locales/gu/prequalquiz.json';
import guCommon from '../public/locales/gu/common.json';

import esCalculator from '../public/locales/es/calculator.json';
import esPreQualQuiz from '../public/locales/es/prequalquiz.json';
import esCommon from '../public/locales/es/common.json';

const resources = {
  en: {
    calculator: enCalculator,
    prequalquiz: enPreQualQuiz,
    common: enCommon,
  },
  fr: {
    calculator: frCalculator,
    prequalquiz: frPreQualQuiz,
    common: frCommon,
  },
  hi: {
    calculator: hiCalculator,
    prequalquiz: hiPreQualQuiz,
    common: hiCommon,
  },
  pa: {
    calculator: paCalculator,
    prequalquiz: paPreQualQuiz,
    common: paCommon,
  },
  gu: {
    calculator: guCalculator,
    prequalquiz: guPreQualQuiz,
    common: guCommon,
  },
  es: {
    calculator: esCalculator,
    prequalquiz: esPreQualQuiz,
    common: esCommon,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n; 