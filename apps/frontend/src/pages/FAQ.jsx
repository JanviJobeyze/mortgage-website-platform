import { useState, useEffect } from 'react';
import { faqData } from '../data/faqData';

// Add custom CSS animations
const customStyles = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
      max-height: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0);
      max-height: 1000px;
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
  
  .animate-slideDown {
    animation: slideDown 0.4s ease-out;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

// Individual question accordion component
const QuestionAccordion = ({ question, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-inset transition-all duration-200 ease-in-out hover:bg-[#F5F5F5] hover:pl-6 transform hover:scale-[1.01]"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.id}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 pr-4">
            <h3 className="text-sm sm:text-base font-medium text-[#212121] leading-relaxed">
              {question.question}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            {/* Language badges */}
            <div className="flex space-x-1">
              {question.languages.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#C8E6C9] text-[#1B5E20] transition-all duration-200 ease-in-out transform hover:scale-110 hover:bg-[#A5D6A7] hover:shadow-sm"
                >
                  {lang}
                </span>
              ))}
            </div>
            {/* Expand/collapse icon */}
            <svg
              className={`w-4 h-4 text-[#2E7D32] transition-all duration-300 ease-in-out transform ${
                isOpen ? 'rotate-180 scale-110' : 'hover:scale-110'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      
      {isOpen && (
        <div
          id={`faq-answer-${question.id}`}
          className="px-4 pb-3 animate-fadeIn"
          aria-labelledby={`faq-question-${question.id}`}
        >
          <div className="text-sm sm:text-base text-[#757575] leading-relaxed">
            {question.answer}
          </div>
          {/* ChatBot integration */}
          <div 
            data-question-id={question.id}
            data-category={question.category}
            className="mt-3 pt-3 border-t border-gray-100"
          >
            <button
              onClick={() => {
                console.log('FAQ: Dispatching openChatbot event for question:', question.question);
                // Trigger chatbot with this question
                const event = new CustomEvent('openChatbot', {
                  detail: {
                    question: question.question,
                    category: question.category
                  }
                });
                window.dispatchEvent(event);
              }}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#2E7D32] bg-[#E8F5E8] rounded-full hover:bg-[#C8E6C9] hover:text-[#1B5E20] transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-1"
            >
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Ask ChatBot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Category dropdown component
const CategoryDropdown = ({ category, isOpen, onToggle, searchTerm, openQuestions, onQuestionToggle }) => {
  // Filter questions based on search term (search both question and answer)
  const filteredQuestions = category.questions.filter(q =>
    q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4" data-category-id={category.id}>
      {/* Category header - always visible */}
      <button
        className={`w-full rounded-lg p-4 text-left focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-inset transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md ${
          isOpen ? 'bg-[#C8E6C9] shadow-sm' : 'bg-[#FFF3E0] hover:bg-[#FFE0B2]'
        }`}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`category-${category.id}`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-semibold text-[#212121]">
            {category.category}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#1B5E20] font-medium">
              {filteredQuestions.length} Questions
            </span>
            <svg
              className={`w-5 h-5 text-[#2E7D32] transition-all duration-300 ease-in-out transform ${
                isOpen ? 'rotate-180 scale-110' : 'hover:scale-110'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </button>
      
      {/* Category content - collapsible */}
      {isOpen && (
        <div
          id={`category-${category.id}`}
          className="mt-3 bg-white rounded-lg shadow-sm border border-[#D1D5DB] animate-slideDown"
        >
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionAccordion
                key={question.id}
                question={question}
                isOpen={openQuestions.includes(question.id)}
                onToggle={() => onQuestionToggle(question.id)}
              />
            ))
          ) : (
            <div className="px-4 py-6 text-center text-[#757575]">
              No questions match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Categories sidebar component
const CategoriesSidebar = ({ categories, activeCategory, onCategoryClick, openCategories }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#D1D5DB] p-4">
      <h3 className="text-lg font-semibold text-[#212121] mb-4">
        Categories
      </h3>
      <ul className="space-y-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.category;
          const isOpen = openCategories.includes(cat.id);
          
          return (
            <li key={cat.category}>
              <button
                onClick={() => onCategoryClick(cat.category)}
                              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                isActive
                  ? 'bg-[#C8E6C9] text-[#1B5E20] shadow-sm'
                  : isOpen
                  ? 'bg-[#E8F5E8] text-[#2E7D32] shadow-sm'
                  : 'text-[#212121] hover:bg-[#F5F5F5] hover:shadow-sm'
              } focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-inset`}
              >
                <span className="text-sm font-medium">{cat.category}</span>
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                  isActive
                    ? 'bg-[#1B5E20] text-white'
                    : 'bg-[#2E7D32] text-white'
                }`}>
                  {cat.questions.length}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Popular questions sidebar component
const PopularQuestions = ({ questions, onQuestionClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#D1D5DB] p-4">
      <h3 className="text-lg font-semibold text-[#212121] mb-4">
        Popular Questions
      </h3>
      <ul className="space-y-3">
        {questions.map((question) => {
          // Find the category for this question
          const category = faqData.find(cat => 
            cat.questions.some(q => q.id === question.id)
          );
          
          return (
            <li key={question.id}>
              <button
                onClick={() => onQuestionClick(question.id)}
                className="text-sm text-[#2E7D32] hover:text-[#1B5E20] text-left hover:underline focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-inset rounded w-full transition-all duration-200 ease-in-out transform hover:scale-[1.01] hover:bg-[#F5F5F5] p-2 -m-2 rounded-lg"
              >
                <div className="text-xs text-[#757575] mb-1 font-medium">
                  {category?.category}
                </div>
                <div className="text-sm leading-relaxed">
                  {question.question}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState(
    // Initialize with categories that should be open by default
    faqData.filter(cat => cat.isOpenByDefault).map(cat => cat.id)
  );
  const [openQuestions, setOpenQuestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');

  // SEO Meta Tags
  useEffect(() => {
    // Update document title
    document.title = 'Frequently Asked Questions - Mortgage Help & Expert Advice | Your Mortgage Company';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Get answers to common mortgage questions about pre-approval, rates, documents, refinancing, and more. Expert advice from licensed mortgage professionals in Canada.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Get answers to common mortgage questions about pre-approval, rates, documents, refinancing, and more. Expert advice from licensed mortgage professionals in Canada.';
      document.head.appendChild(newMetaDescription);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'mortgage FAQ, mortgage questions, pre-approval, down payment, credit score, mortgage rates, refinancing, mortgage documents, first-time homebuyer, mortgage broker');
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = 'mortgage FAQ, mortgage questions, pre-approval, down payment, credit score, mortgage rates, refinancing, mortgage documents, first-time homebuyer, mortgage broker';
      document.head.appendChild(newMetaKeywords);
    }

    // Open Graph meta tags for social media
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Frequently Asked Questions - Mortgage Help & Expert Advice');
    } else {
      const newOgTitle = document.createElement('meta');
      newOgTitle.setAttribute('property', 'og:title');
      newOgTitle.setAttribute('content', 'Frequently Asked Questions - Mortgage Help & Expert Advice');
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Get answers to common mortgage questions about pre-approval, rates, documents, refinancing, and more. Expert advice from licensed mortgage professionals.');
    } else {
      const newOgDescription = document.createElement('meta');
      newOgDescription.setAttribute('property', 'og:description');
      newOgDescription.setAttribute('content', 'Get answers to common mortgage questions about pre-approval, rates, documents, refinancing, and more. Expert advice from licensed mortgage professionals.');
      document.head.appendChild(newOgDescription);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const newOgType = document.createElement('meta');
      newOgType.setAttribute('property', 'og:type');
      newOgType.setAttribute('content', 'website');
      document.head.appendChild(newOgType);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.setAttribute('content', window.location.href);
      document.head.appendChild(newOgUrl);
    }

    // Twitter Card meta tags
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (twitterCard) {
      twitterCard.setAttribute('content', 'summary_large_image');
    } else {
      const newTwitterCard = document.createElement('meta');
      newTwitterCard.setAttribute('name', 'twitter:card');
      newTwitterCard.setAttribute('content', 'summary_large_image');
      document.head.appendChild(newTwitterCard);
    }

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', 'Frequently Asked Questions - Mortgage Help & Expert Advice');
    } else {
      const newTwitterTitle = document.createElement('meta');
      newTwitterTitle.setAttribute('name', 'twitter:title');
      newTwitterTitle.setAttribute('content', 'Frequently Asked Questions - Mortgage Help & Expert Advice');
      document.head.appendChild(newTwitterTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'Get answers to common mortgage questions about pre-approval, rates, documents, refinancing, and more. Expert advice from licensed mortgage professionals.');
    } else {
      const newTwitterDescription = document.createElement('meta');
      newTwitterDescription.setAttribute('name', 'twitter:description');
      newTwitterDescription.setAttribute('content', 'Get answers to common mortgage questions about pre-approval, rates, documents, refinancing, and more. Expert advice from licensed mortgage professionals.');
      document.head.appendChild(newTwitterDescription);
    }

    // Canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.href);
    } else {
      const newCanonical = document.createElement('link');
      newCanonical.setAttribute('rel', 'canonical');
      newCanonical.setAttribute('href', window.location.href);
      document.head.appendChild(newCanonical);
    }

    // Structured data for FAQ
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.flatMap(category => 
        category.questions.map(question => ({
          "@type": "Question",
          "name": question.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": question.answer
          }
        }))
      )
    };

    // Remove existing structured data script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      // Reset title to default when component unmounts
      document.title = 'Your Mortgage Company';
    };
  }, []);

  // Auto-open categories with matching questions when searching
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    if (newSearchTerm.trim()) {
      // Find categories with matching questions
      const categoriesWithMatches = faqData.filter(cat => 
        cat.questions.some(q => 
          q.question.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(newSearchTerm.toLowerCase())
        )
      );
      
      // Open categories with matches
      const categoryIdsToOpen = categoriesWithMatches.map(cat => cat.id);
      setOpenCategories(categoryIdsToOpen);
      // Clear active category when searching
      setActiveCategory('');
    } else {
      // Reset to default open categories when search is cleared
      setOpenCategories(faqData.filter(cat => cat.isOpenByDefault).map(cat => cat.id));
      setActiveCategory('');
      // Reset open questions to default
      setOpenQuestions([]);
    }
  };

  // Get popular questions (curated list of most commonly asked questions)
  const popularQuestions = [
    // Most important questions that users typically ask first
    faqData.find(cat => cat.category === 'Getting Started')?.questions.find(q => q.id === 'q-1'), // Pre-approval
    faqData.find(cat => cat.category === 'Getting Started')?.questions.find(q => q.id === 'q-2'), // Down payment
    faqData.find(cat => cat.category === 'Getting Started')?.questions.find(q => q.id === 'q-3'), // Credit score
    faqData.find(cat => cat.category === 'Application Process')?.questions.find(q => q.id === 'q-9'), // Documents needed
    faqData.find(cat => cat.category === 'Rates & Terms')?.questions.find(q => q.id === 'q-21'), // What affects rates
  ].filter(Boolean); // Remove any undefined questions

  // Handle category toggle
  const handleCategoryToggle = (categoryId) => {
    setOpenCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle question toggle
  const handleQuestionToggle = (questionId) => {
    setOpenQuestions(prev => 
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  // Handle popular question click
  const handlePopularQuestionClick = (questionId) => {
    // Find the question and its category
    const question = faqData
      .flatMap(cat => cat.questions)
      .find(q => q.id === questionId);
    
    if (question) {
      // Find the category that contains this question
      const categoryData = faqData.find(cat => 
        cat.questions.some(q => q.id === questionId)
      );
      
      if (categoryData) {
        // Set as active category
        setActiveCategory(categoryData.category);
        
        // Open only this category
        setOpenCategories([categoryData.id]);
        
        // Open only this question
        setOpenQuestions([questionId]);
        
        // Scroll to the question after a short delay
        setTimeout(() => {
          const element = document.querySelector(`[data-question-id="${questionId}"]`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 150);
      }
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    
    // Find the category data
    const categoryData = faqData.find(cat => cat.category === category);
    if (categoryData) {
      // Close all other categories and open only the selected one
      setOpenCategories([categoryData.id]);
      
      // Close all open questions
      setOpenQuestions([]);
      
      // Open the first question in the category
      if (categoryData.questions.length > 0) {
        const firstQuestionId = categoryData.questions[0].id;
        setOpenQuestions([firstQuestionId]);
      }
      
      // Scroll to the category after a short delay to ensure it's rendered
      setTimeout(() => {
        const categoryElement = document.querySelector(`[data-category-id="${categoryData.id}"]`);
        if (categoryElement) {
          categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] mb-4 sm:mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed mb-8">
              Find answers to common mortgage questions. Can't find what you're looking for? Contact our experts for personalized assistance.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-[#757575] transition-all duration-300 ease-in-out group-hover:text-[#2E7D32] group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 py-3 sm:py-4 border border-[#D1D5DB] rounded-lg bg-white text-[#212121] placeholder-[#757575] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] text-sm sm:text-base transition-all duration-300 ease-in-out hover:border-[#9CA3AF] focus:shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <CategoriesSidebar
                categories={faqData}
                activeCategory={activeCategory}
                onCategoryClick={handleCategoryClick}
                openCategories={openCategories}
              />
              <PopularQuestions
                questions={popularQuestions}
                onQuestionClick={handlePopularQuestionClick}
              />
            </div>

            {/* Main FAQ Content */}
            <div className="lg:col-span-3">
              {faqData.map((category) => {
                // Check if category has any matching questions
                const hasMatchingQuestions = category.questions.some(q =>
                  q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                );
                
                // Hide category if searching and no questions match
                if (searchTerm.trim() && !hasMatchingQuestions) {
                  return null;
                }
                
                return (
                  <CategoryDropdown
                    key={category.id}
                    category={category}
                    isOpen={openCategories.includes(category.id)}
                    onToggle={() => handleCategoryToggle(category.id)}
                    searchTerm={searchTerm}
                    openQuestions={openQuestions}
                    onQuestionToggle={handleQuestionToggle}
                  />
                );
              })}
              
              {/* Show message when no results found */}
              {searchTerm.trim() && faqData.every(category => 
                !category.questions.some(q =>
                  q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ) && (
                <div className="text-center py-12">
                  <div className="text-[#757575] text-lg mb-4">
                    No questions found matching "{searchTerm}"
                  </div>
                  <p className="text-[#757575]">
                    Try searching with different keywords or browse our categories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#C8E6C9] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#212121] mb-4">
            Can't Find Your Answer?
          </h2>
          <p className="text-[#757575] mb-8 max-w-2xl mx-auto">
            Our mortgage experts are here to help with personalized guidance for your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1B5E20] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 active:scale-95">
              Ask a Question
            </button>
            <button className="bg-[#2E7D32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1B5E20] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-offset-2 active:scale-95">
              Call Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FAQ; 