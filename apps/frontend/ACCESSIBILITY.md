# Accessibility Guidelines & Implementation

This document outlines the accessibility standards and implementation details for the Mortgage Website Platform, ensuring compliance with WCAG 2.1 AA standards.

## Overview

Our platform is designed to be accessible to all users, including those with disabilities. We follow the Web Content Accessibility Guidelines (WCAG) 2.1 AA standards to ensure our content is perceivable, operable, understandable, and robust.

## Key Accessibility Features

### 1. Semantic HTML Structure

- **Main Content**: All pages use `<main>` element with `role="main"`
- **Navigation**: Proper `<nav>` elements with descriptive `aria-label`
- **Sections**: Content is organized using `<section>`, `<article>`, `<header>`, `<footer>`
- **Headings**: Proper heading hierarchy (h1 → h2 → h3) with unique IDs

### 2. Keyboard Navigation

All interactive elements are keyboard accessible:
- **Focus Indicators**: Visible focus rings on all interactive elements
- **Tab Order**: Logical tab sequence following document flow
- **Skip Links**: Skip to main content functionality
- **Keyboard Shortcuts**: No custom shortcuts that conflict with assistive technology

### 3. Screen Reader Support

- **ARIA Labels**: Descriptive labels for all interactive elements
- **Alt Text**: All images have meaningful alt text
- **Live Regions**: Dynamic content updates are announced
- **Landmarks**: Proper use of ARIA landmarks and roles

### 4. Color and Contrast

- **Color Contrast**: Minimum 4.5:1 ratio for normal text, 3:1 for large text
- **Color Independence**: Information is not conveyed by color alone
- **Focus Indicators**: High contrast focus indicators

## Implementation Details

### Learning Centre Page

```jsx
// Semantic structure
<main role="main">
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Learning Centre</h1>
  </section>
  
  <section aria-labelledby="category-filters-heading">
    <h2 id="category-filters-heading">Filter by Category</h2>
    <div role="group" aria-label="Category filter options">
      {/* Filter buttons with aria-pressed */}
    </div>
  </section>
</main>
```

### Article Detail Page

```jsx
// Article structure
<main role="main">
  <article>
    <nav aria-label="Breadcrumb navigation">
      {/* Back link with proper aria-label */}
    </nav>
    
    <header aria-labelledby="article-title">
      <h1 id="article-title">Article Title</h1>
    </header>
    
    <div role="contentinfo" aria-label="Article metadata">
      {/* Article meta information */}
    </div>
  </article>
</main>
```

### Interactive Elements

```jsx
// Buttons with proper accessibility
<button
  onClick={handleClick}
  className="focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2"
  aria-label="Descriptive action"
  aria-pressed={isPressed}
>
  Button Text
</button>

// Links with proper accessibility
<Link
  to="/path"
  className="focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1"
  aria-label="Descriptive link purpose"
>
  Link Text
</Link>
```

## Color Palette

Our color palette meets WCAG 2.1 AA contrast requirements:

- **Primary Green**: `#1B5E20` (Dark Green)
- **Secondary Green**: `#2E7D32` (Medium Green)
- **Light Green**: `#C8E6C9` (Background)
- **Text Colors**: 
  - Primary: `#212121` (Dark Gray)
  - Secondary: `#757575` (Medium Gray)
  - Muted: `#9E9E9E` (Light Gray)

## Testing and Validation

### Automated Testing

We use a custom accessibility audit utility that checks:

1. **Image Alt Text**: All images have meaningful alt attributes
2. **Keyboard Accessibility**: All interactive elements are keyboard accessible
3. **Heading Hierarchy**: Proper heading structure
4. **ARIA Labels**: Proper implementation of ARIA attributes
5. **Color Contrast**: Basic contrast checking
6. **Semantic HTML**: Appropriate use of semantic elements

### Manual Testing

1. **Screen Reader Testing**: Test with NVDA, JAWS, and VoiceOver
2. **Keyboard Navigation**: Navigate entire site using only keyboard
3. **Color Blindness**: Test with color blindness simulators
4. **Zoom Testing**: Test at 200% zoom level
5. **Mobile Accessibility**: Test on mobile devices with accessibility features

### Tools Used

- **axe-core**: Automated accessibility testing
- **Lighthouse**: Performance and accessibility audits
- **WAVE**: Web accessibility evaluation tool
- **Color Contrast Analyzer**: Verify color contrast ratios

## Common Accessibility Patterns

### 1. Form Accessibility

```jsx
<form onSubmit={handleSubmit}>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    required
    aria-describedby="email-help"
    aria-invalid={hasError}
  />
  <div id="email-help" className="sr-only">
    Enter a valid email address
  </div>
  {hasError && (
    <div role="alert" aria-live="polite">
      Please enter a valid email address
    </div>
  )}
</form>
```

### 2. Modal/Dialog Accessibility

```jsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">Modal description</p>
  {/* Modal content */}
</div>
```

### 3. Loading States

```jsx
<div aria-live="polite" aria-label="Loading content">
  {isLoading ? (
    <div role="status" aria-label="Loading">
      Loading...
    </div>
  ) : (
    <div role="status" aria-label="Content loaded">
      Content loaded successfully
    </div>
  )}
</div>
```

## Accessibility Checklist

### Content
- [ ] All images have meaningful alt text
- [ ] Videos have captions and transcripts
- [ ] Audio content has transcripts
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] Color is not the only way to convey information

### Navigation
- [ ] All pages have descriptive titles
- [ ] Heading hierarchy is logical (h1 → h2 → h3)
- [ ] Skip links are available for main content
- [ ] Navigation is consistent across pages
- [ ] Current page is clearly indicated

### Forms
- [ ] All form fields have associated labels
- [ ] Error messages are clear and descriptive
- [ ] Required fields are clearly marked
- [ ] Form validation provides immediate feedback
- [ ] Forms can be completed using only keyboard

### Interactive Elements
- [ ] All buttons and links are keyboard accessible
- [ ] Focus indicators are visible and clear
- [ ] Custom controls have proper ARIA attributes
- [ ] Dynamic content updates are announced
- [ ] No keyboard traps exist

### Media
- [ ] Images have descriptive alt text
- [ ] Decorative images have empty alt text
- [ ] Complex images have detailed descriptions
- [ ] Videos have captions
- [ ] Audio content has transcripts

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Web Accessibility Initiative](https://www.w3.org/WAI/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)

## Maintenance

- Regular accessibility audits should be performed
- New features must pass accessibility testing before deployment
- User feedback regarding accessibility should be prioritized
- Stay updated with latest accessibility standards and best practices

## Contact

For accessibility-related questions or issues, please contact the development team or create an issue in the project repository. 