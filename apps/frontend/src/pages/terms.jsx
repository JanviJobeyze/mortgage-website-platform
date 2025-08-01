import { useEffect } from 'react';

function Terms() {
  // SEO Meta Tags for Terms of Use Page
  useEffect(() => {
    // Store original meta tags
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const originalOgTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const originalOgDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const originalOgUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    const originalTwitterTitle = document.querySelector('meta[name="twitter:title"]')?.getAttribute('content');
    const originalTwitterDescription = document.querySelector('meta[name="twitter:description"]')?.getAttribute('content');
    
    // Set Terms of Use specific meta tags
    document.title = "Terms of Use | MortgageLink Canada";
    
    // Update description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read our Terms of Use to understand the terms and conditions governing your use of MortgageLink Canada services. Learn about your rights and obligations when using our mortgage services.');
    }
    
    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'terms of use, terms and conditions, mortgage terms, legal terms, service agreement, user agreement, mortgage services terms');
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Terms of Use | MortgageLink Canada');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Read our Terms of Use to understand the terms and conditions governing your use of our mortgage services.');
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }
    
    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Terms of Use | MortgageLink Canada');
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Read our Terms of Use to understand the terms and conditions governing your use of our mortgage services.');
    }
    
    // Add canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.href);
    
    // Add structured data for Terms of Use
    let structuredData = document.querySelector('#terms-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.setAttribute('type', 'application/ld+json');
      structuredData.setAttribute('id', 'terms-structured-data');
      document.head.appendChild(structuredData);
    }
    
    const termsSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Use",
      "description": "Terms of Use for MortgageLink Canada",
      "url": window.location.href,
      "publisher": {
        "@type": "Organization",
        "name": "MortgageLink Canada"
      }
    };
    
    structuredData.textContent = JSON.stringify(termsSchema);
    
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
      const existingStructuredData = document.querySelector('#terms-structured-data');
      if (existingStructuredData) {
        existingStructuredData.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main id="main" className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Use</h1>
          
          <div className="prose prose-sm text-gray-700 leading-relaxed">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last updated:</strong> [Insert Date]
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the MortgageLink Canada website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on MortgageLink Canada's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2">3. Disclaimer</h2>
            <p>
              The materials on MortgageLink Canada's website are provided on an 'as is' basis. MortgageLink Canada makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">4. Limitations</h2>
            <p>
              In no event shall MortgageLink Canada or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MortgageLink Canada's website, even if MortgageLink Canada or a MortgageLink Canada authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">5. Accuracy of Materials</h2>
            <p>
              The materials appearing on MortgageLink Canada's website could include technical, typographical, or photographic errors. MortgageLink Canada does not warrant that any of the materials on its website are accurate, complete or current. MortgageLink Canada may make changes to the materials contained on its website at any time without notice.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">6. Links</h2>
            <p>
              MortgageLink Canada has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MortgageLink Canada of the site. Use of any such linked website is at the user's own risk.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">7. Modifications</h2>
            <p>
              MortgageLink Canada may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms and Conditions of Use.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Canada and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">9. Mortgage Services</h2>
            <p>
              Our mortgage services are subject to additional terms and conditions that will be provided to you when you engage our services. These terms govern the use of our website and general information only.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">10. Privacy Policy</h2>
            <p>
              Your use of our website is also governed by our Privacy Policy, which is incorporated into these terms by reference.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2">11. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Use, please contact us at:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <p className="font-semibold">Parm Capital Inc.</p>
              <p>[Insert your business address here]</p>
              <p>Email: legal@parmcapital.ca</p>
              <p>Phone: [Insert phone number]</p>
            </div>

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These Terms of Use are designed to comply with Canadian laws and regulations. Please ensure all placeholder information is updated before deployment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Terms; 