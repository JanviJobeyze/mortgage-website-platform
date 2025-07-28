# Internationalization (i18n) Setup Guide

## Overview
This project has been prepared for internationalization with support for 6 languages:
- English (en)
- French (fr)
- Hindi (hi)
- Punjabi (pa)
- Gujarati (gu)
- Spanish (es)

## Current Status
✅ **Translation files created** for all languages
✅ **Component refactored** to use translation keys
✅ **i18n configuration** prepared
✅ **Language selector component** created

⏳ **Pending**: Installation of i18n dependencies

## Setup Instructions

### 1. Install Dependencies
```bash
cd apps/frontend
npm install react-i18next i18next i18next-browser-languagedetector
```

### 2. Enable i18n in the Application
Uncomment the following lines in the specified files:

**In `src/main.jsx`:**
```javascript
import './i18n'; // Uncomment this line
```

**In `src/pages/PreQualQuiz.jsx`:**
```javascript
import { useTranslation } from 'react-i18next'; // Uncomment this line
const { t } = useTranslation('prequalquiz'); // Uncomment this line
```

**In `src/components/LanguageSelector.jsx`:**
```javascript
import { useTranslation } from 'react-i18next'; // Uncomment this line
const { i18n } = useTranslation(); // Uncomment this line
```

### 3. Remove Temporary Translation Function
In `src/pages/PreQualQuiz.jsx`, remove the temporary `t` function and use the actual i18n hook.

## Translation Files Structure

```
public/locales/
├── en/
│   ├── calculator.json
│   └── prequalquiz.json
├── fr/
│   ├── calculator.json
│   └── prequalquiz.json
├── hi/
│   ├── calculator.json
│   └── prequalquiz.json
├── pa/
│   ├── calculator.json
│   └── prequalquiz.json
├── gu/
│   ├── calculator.json
│   └── prequalquiz.json
└── es/
    ├── calculator.json
    └── prequalquiz.json
```

## Usage

### In Components
```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('prequalquiz');
  
  return (
    <h1>{t('title')}</h1>
  );
}
```

### Language Switching
```javascript
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <button onClick={() => changeLanguage('fr')}>
      Switch to French
    </button>
  );
}
```

## Features Implemented

### PreQualQuiz Component
- ✅ All text content translated
- ✅ Form labels and placeholders
- ✅ Navigation buttons
- ✅ Progress indicators
- ✅ Validation messages
- ✅ Review screen content

### Language Support
- ✅ English (en) - Complete
- ✅ French (fr) - Complete
- ✅ Hindi (hi) - Complete
- ✅ Punjabi (pa) - Complete
- ✅ Gujarati (gu) - Complete
- ✅ Spanish (es) - Complete

## Next Steps

1. **Install dependencies** when ready
2. **Uncomment i18n imports** in the specified files
3. **Test language switching** functionality
4. **Add language selector** to the main navigation
5. **Extend translations** to other components as needed

## Notes

- The current implementation includes a temporary translation function that will be replaced with the actual i18n hook
- Language preferences are stored in localStorage
- The system automatically detects the user's preferred language
- Fallback language is set to English 