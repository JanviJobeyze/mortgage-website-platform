import { useEffect } from 'react';

function Privacy() {
  // SEO Meta Tags for Privacy Policy Page
  useEffect(() => {
    // Store original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');
    
    // Set Privacy Policy specific meta tags
    document.title = "Privacy Policy | MortgageLink Canada";
    
    // Update description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read our Privacy Policy to understand how MortgageLink Canada collects, uses, and protects your personal information. Learn about your rights and our commitment to data privacy.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'privacy policy, data protection, personal information, mortgage privacy, Canadian mortgage privacy, PIPEDA compliance, data security, privacy rights');
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Privacy Policy | MortgageLink Canada');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Read our Privacy Policy to understand how we collect, use, and protect your personal information.');
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Privacy Policy | MortgageLink Canada');
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Read our Privacy Policy to understand how we collect, use, and protect your personal information.');
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
    
    // Add structured data for Privacy Policy
    let structuredData = document.querySelector('#privacy-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      structuredData.setAttribute('id', 'privacy-structured-data');
      document.head.appendChild(structuredData);
    }
    
    const privacySchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Privacy Policy",
      "description": "Privacy Policy for MortgageLink Canada",
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "MortgageLink Canada"
      }
    };
    
    structuredData.textContent = JSON.stringify(privacySchema);
    
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
      const existingStructuredData = document.querySelector('#privacy-structured-data');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main id="main" className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-sm text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last updated:</strong> [Insert Date]
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Introduction</h2>
            <p>
              Parm Capital Inc. ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any way.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mt-4 mb-2">2.1 Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Financial information (income, employment details, credit history)</li>
              <li>Property information (purchase price, down payment, property address)</li>
              <li>Government identification documents</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">2.2 Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website information</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Provide mortgage services and process applications</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Prevent fraud and ensure security</li>
              <li>Send you marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Information Sharing and Disclosure</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist in our operations</li>
              <li>In connection with a business transfer or merger</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">9. Children's Privacy</h2>
            <p>
              Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">10. International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-semibold">Parm Capital Inc.</p>
              <p>[Insert your business address here]</p>
              <p>Email: privacy@parmcapital.ca</p>
              <p>Phone: [Insert phone number]</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This Privacy Policy is designed to comply with Canadian privacy laws, including PIPEDA (Personal Information Protection and Electronic Documents Act). Please ensure all placeholder information is updated before deployment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Privacy; 