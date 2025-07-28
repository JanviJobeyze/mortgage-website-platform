# Internationalization (i18n) Setup

This document outlines the internationalization setup for the Mortgage Website Platform using `react-i18next`.

## Overview

The application supports multiple languages with a clean, maintainable translation system. All static text in the Header (Navigation) and Footer components has been internationalized using the `t()` function from `useTranslation('common')`.

## Supported Languages

Currently supported languages:
- **English (en)** - Default language
- **French (fr)** - Français
- **Spanish (es)** - Español

## File Structure

```
apps/frontend/
├── src/
│   ├── i18n.js                    # i18n configuration
│   └── components/
│       ├── Navigation.jsx         # Internationalized header
│       ├── Footer.jsx             # Internationalized footer
│       └── LanguageTest.jsx       # Test component
└── public/
    └── locales/
        ├── en/
        │   ├── common.json        # Header & Footer translations
        │   ├── calculator.json    # Calculator translations
        │   └── prequalquiz.json   # Pre-qualification quiz translations
        ├── fr/
        │   ├── common.json        # French translations
        │   ├── calculator.json
        │   └── prequalquiz.json
        └── es/
            ├── common.json        # Spanish translations
            ├── calculator.json
            └── prequalquiz.json
```

## Translation Keys

### Header (Navigation) Translations

```json
{
  "header": {
    "skipToContent": "Skip to main content",
    "brandName": "MortgageLink",
    "home": "Home",
    "about": "About",
    "loanServices": "Loan Services",
    "calculator": "Calculator",
    "rates": "Rates",
    "news": "News",
    "faq": "FAQ",
    "learningCentre": "Learning Centre",
    "contact": "Contact",
    "selectLanguage": "Select language",
    "toggleMobileMenu": "Toggle mobile menu",
    "mobileNavigation": "Mobile navigation",
    "mainNavigation": "Main navigation"
  }
}
```

### Footer Translations

```json
{
  "footer": {
    "brandName": "MortgageLink Canada",
    "companyDescription": "Licensed mortgage brokerage serving Canadian families...",
    "quickLinks": "Quick Links",
    "contactInfo": "Contact Info",
    "phone": "1-800-MORTGAGE",
    "email": "info@mortgagelink.ca",
    "address": {
      "line1": "123 Bay Street, Suite 1000",
      "line2": "Toronto, ON M5J 2J1"
    },
    "compliance": {
      "nmlsId": "NMLS ID:",
      "nmlsNumber": "#123456",
      "licensedBy": "Licensed by the",
      "financialConsumerAgency": "Financial Consumer Agency of Canada",
      "mortgageBrokerage": "Mortgage brokerage license in all provinces...",
      "mortgageBrokeragesAct": "Mortgage Brokerages, Lenders and Administrators Act",
      "equalHousing": "Equal Housing Opportunity"
    },
    "importantNotice": {
      "title": "Important Notice:",
      "content": "This is not a commitment to lend..."
    },
    "equalHousing": {
      "title": "Equal Housing Opportunity:",
      "content": "We are committed to providing equal housing opportunities..."
    },
    "privacy": {
      "title": "Privacy:",
      "content": "We are committed to protecting your privacy...",
      "privacyPolicy": "Privacy Policy",
      "forDetails": "for details on how we collect, use, and protect your information."
    },
    "copyright": "© 2024 MortgageLink Canada. All rights reserved. Licensed brokerage.",
    "legalLinks": "Privacy Policy | Terms of Service | Licensing"
  }
}
```

## Usage Examples

### Basic Translation

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('header.brandName')}</h1>
      <p>{t('footer.companyDescription')}</p>
    </div>
  );
}
```

### Language Switching

```jsx
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation('common');
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('es')}>Español</button>
    </div>
  );
}
```

### Nested Translation Keys

```jsx
// For nested objects like address
<p>{t('footer.address.line1')}</p>
<p>{t('footer.address.line2')}</p>

// For compliance information
<p>
  <strong>{t('footer.compliance.nmlsId')}</strong> {t('footer.compliance.nmlsNumber')}
</p>
```

## Implementation Details

### Navigation Component

The Navigation component has been fully internationalized:

- **Skip Link**: Uses `t('header.skipToContent')`
- **Brand Name**: Uses `t('header.brandName')`
- **Navigation Links**: All menu items use translation keys
- **Language Selector**: Properly switches languages using `i18n.changeLanguage()`
- **Accessibility**: ARIA labels are also translated

### Footer Component

The Footer component includes comprehensive translations:

- **Company Information**: Brand name and description
- **Quick Links**: Navigation links in footer
- **Contact Information**: Phone, email, and address
- **Compliance Information**: Legal notices and licensing
- **Copyright**: Copyright notice and legal links

## Adding New Languages

To add a new language (e.g., German):

1. **Create translation files**:
   ```bash
   mkdir -p public/locales/de
   touch public/locales/de/common.json
   touch public/locales/de/calculator.json
   touch public/locales/de/prequalquiz.json
   ```

2. **Add translations to `common.json`**:
   ```json
   {
     "header": {
       "skipToContent": "Zum Hauptinhalt springen",
       "brandName": "MortgageLink",
       "home": "Startseite",
       // ... other translations
     },
     "footer": {
       // ... footer translations
     }
   }
   ```

3. **Update i18n configuration** in `src/i18n.js`:
   ```javascript
   import deCommon from '../public/locales/de/common.json';
   import deCalculator from '../public/locales/de/calculator.json';
   import dePreQualQuiz from '../public/locales/de/prequalquiz.json';

   const resources = {
     // ... existing languages
     de: {
       calculator: deCalculator,
       prequalquiz: dePreQualQuiz,
       common: deCommon,
     },
   };
   ```

4. **Add language to Navigation component**:
   ```javascript
   const languages = [
     // ... existing languages
     { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
   ];
   ```

## Testing

### Manual Testing

1. **Language Switching**: Use the language dropdown in the header
2. **Persistence**: Language selection persists across page reloads
3. **Fallback**: Missing translations fall back to English
4. **Accessibility**: Screen readers announce translated content correctly

### Automated Testing

Use the `LanguageTest` component to verify translations:

```jsx
import LanguageTest from './components/LanguageTest';

// Add to any page for testing
<LanguageTest />
```

## Best Practices

### Translation Keys

- **Use descriptive keys**: `header.brandName` instead of `brand`
- **Group related content**: All header content under `header.*`
- **Use nested objects**: For complex content like `footer.compliance.*`
- **Keep keys consistent**: Use the same pattern across components

### Content Organization

- **Separate concerns**: Different namespaces for different features
- **Maintain structure**: Keep translation files organized and clean
- **Document changes**: Update this file when adding new translations

### Performance

- **Lazy loading**: Translations are loaded on demand
- **Caching**: Language selection is cached in localStorage
- **Fallback**: Graceful fallback to English for missing translations

## Troubleshooting

### Common Issues

1. **Translation not showing**: Check if the key exists in the translation file
2. **Language not switching**: Verify `i18n.changeLanguage()` is called
3. **Missing translations**: Check console for missing key warnings
4. **Fallback issues**: Ensure English translations are complete

### Debug Mode

Enable debug mode in development:

```javascript
// In i18n.js
debug: process.env.NODE_ENV === 'development',
```

This will show missing translation keys in the console.

## Future Enhancements

- **Pluralization**: Support for plural forms
- **Interpolation**: Dynamic content in translations
- **RTL Support**: Right-to-left language support
- **Auto-detection**: Browser language detection
- **Translation management**: Integration with translation services

## Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [WCAG Internationalization Guidelines](https://www.w3.org/WAI/standards-guidelines/i18n/) 