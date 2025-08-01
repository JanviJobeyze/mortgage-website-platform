import { useEffect } from 'react';

function Accessibility() {
  // SEO Meta Tags for Accessibility Statement Page
  useEffect(() => {
    // Store original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');
    
    // Set Accessibility Statement specific meta tags
    document.title = "Accessibility Statement | MortgageLink Canada";
    
    // Update description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about MortgageLink Canada\'s commitment to web accessibility. We strive to make our mortgage services accessible to all users, including those with disabilities.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'accessibility statement, web accessibility, WCAG 2.1, accessible mortgage services, disability-friendly website, screen reader compatible, keyboard navigation');
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Accessibility Statement | MortgageLink Canada');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Learn about our commitment to web accessibility and making mortgage services accessible to all users.');
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Accessibility Statement | MortgageLink Canada');
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Learn about our commitment to web accessibility and making mortgage services accessible to all users.');
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
    
    // Add structured data for Accessibility Statement
    let structuredData = document.querySelector('#accessibility-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      structuredData.setAttribute('id', 'accessibility-structured-data');
      document.head.appendChild(structuredData);
    }
    
    const accessibilitySchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Accessibility Statement",
      "description": "Accessibility Statement for MortgageLink Canada",
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "MortgageLink Canada"
      }
    };
    
    structuredData.textContent = JSON.stringify(accessibilitySchema);
    
    // Cleanup function to restore original meta tags
    return () => {
      document.title = originalTitle;
      
      if (metaDescription) {
        metaDescription.setAttribute('content', originalDescription || '');
      }
      
      if (ogTitle) {
        ogTitle.setAttribute('content', originalOgTitle || '');
      }
      
      if (ogDescription) {
        ogDescription.setAttribute('content', originalOgDescription || '');
      }
      
      if (ogUrl) {
        ogUrl.setAttribute('content', originalOgUrl || '');
      }
      
      if (twitterTitle) {
        twitterTitle.setAttribute('content', originalTwitterTitle || '');
      }
      
      if (twitterDescription) {
        twitterDescription.setAttribute('content', originalTwitterDescription || '');
      }
      
      // Remove structured data
      const existingStructuredData = document.querySelector('#accessibility-structured-data');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main id="main" className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Accessibility Statement</h1>
          
          <div className="prose prose-sm text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last updated:</strong> [Insert Date]
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Our Commitment to Accessibility</h2>
            <p>
              MortgageLink Canada is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. MortgageLink Canada is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Accessibility Features</h2>
            <p>
              Our website includes the following accessibility features:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Semantic HTML structure for proper screen reader navigation</li>
              <li>Alternative text for images and non-text content</li>
              <li>Keyboard navigation support throughout the website</li>
              <li>Sufficient color contrast ratios for text readability</li>
              <li>Resizable text that can be increased up to 200% without loss of functionality</li>
              <li>Clear focus indicators for keyboard users</li>
              <li>Descriptive link text that explains the purpose of each link</li>
              <li>Form labels and error messages that are accessible to screen readers</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Known Limitations</h2>
            <p>
              While we strive to ensure the highest level of accessibility, we are aware of some limitations:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Some third-party content may not be fully accessible</li>
              <li>Older PDF documents may not be fully accessible to screen readers</li>
              <li>Some complex financial calculators may require additional testing with assistive technologies</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Compatible Technologies</h2>
            <p>
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
              <li>Screen magnification software</li>
              <li>Speech recognition software</li>
              <li>Keyboard-only navigation</li>
              <li>High contrast mode</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Testing and Evaluation</h2>
            <p>
              We regularly test our website for accessibility using:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Automated accessibility testing tools</li>
              <li>Manual testing with keyboard navigation</li>
              <li>Screen reader testing</li>
              <li>Color contrast analysis</li>
              <li>User feedback from individuals with disabilities</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Continuous Improvement</h2>
            <p>
              We are committed to continuously improving the accessibility of our website. This includes:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Regular accessibility audits and testing</li>
              <li>Training our development team on accessibility best practices</li>
              <li>Incorporating accessibility requirements into our design and development processes</li>
              <li>Staying updated with the latest accessibility standards and guidelines</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">Alternative Formats</h2>
            <p>
              If you need information from our website in an alternative format, please contact us. We will work with you to provide the information in a format that meets your needs.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Feedback and Contact Information</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you experience accessibility barriers or have suggestions for improvement, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-semibold">Accessibility Support</p>
              <p>Email: support@parmcapital.ca</p>
              <p>Phone: [Insert phone number]</p>
              <p>Response Time: We aim to respond to accessibility feedback within 2 business days</p>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-2">Technical Specifications</h2>
            <p>
              Accessibility of our website relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>HTML</li>
              <li>WAI-ARIA</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
            <p>
              These technologies are relied upon for conformance with the accessibility standards used.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">Assessment Methods</h2>
            <p>
              We assessed the accessibility of our website using the following methods:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Self-evaluation using WCAG 2.1 guidelines</li>
              <li>Automated testing with accessibility tools</li>
              <li>Manual testing with assistive technologies</li>
              <li>User feedback and testing</li>
            </ul>

            <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Commitment:</strong> We are committed to making our mortgage services accessible to everyone. If you encounter any accessibility issues, please don't hesitate to contact us. Your feedback helps us improve our services for all users.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Accessibility; 