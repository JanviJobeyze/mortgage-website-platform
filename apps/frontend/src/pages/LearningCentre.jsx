import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LearningCentre() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Available tags for filtering
  const availableTags = [
    'First-Time Buyers',
    'Rates',
    'Pre-Approval',
    'Credit Score',
    'Down Payment',
    'Refinancing',
    'Mortgage Basics',
    'Investment Properties',
    'Government Programs',
    'Market Trends'
  ];

  // Enhanced dummy data for articles with multiple tags
  const articles = [
    {
      id: 1,
      title: "Understanding Mortgage Rates: Fixed vs Variable",
      slug: "understanding-mortgage-rates",
      excerpt: "Learn the key differences between fixed and variable mortgage rates, and how to choose the right option for your financial situation.",
      category: "Mortgage Basics",
      tags: ["Rates", "Mortgage Basics"],
      readTime: "5 min read",
      image: "📊",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "First-Time Home Buyer Guide: Complete Checklist",
      slug: "first-time-home-buyer-guide",
      excerpt: "Everything you need to know about buying your first home, from saving for a down payment to closing the deal.",
      category: "First-Time Buyers",
      tags: ["First-Time Buyers", "Down Payment", "Pre-Approval"],
      readTime: "8 min read",
      image: "🏠",
      date: "2024-01-12"
    },
    {
      id: 3,
      title: "How to Improve Your Credit Score for Better Rates",
      slug: "improve-credit-score",
      excerpt: "Practical tips and strategies to boost your credit score and qualify for the best mortgage rates available.",
      category: "Credit & Finance",
      tags: ["Credit Score", "Rates", "Pre-Approval"],
      readTime: "6 min read",
      image: "📈",
      date: "2024-01-10"
    },
    {
      id: 4,
      title: "Refinancing Your Mortgage: When and Why",
      excerpt: "Discover the right time to refinance your mortgage and how it can save you money in the long run.",
      category: "Refinancing",
      tags: ["Refinancing", "Rates", "Mortgage Basics"],
      readTime: "7 min read",
      image: "🔄",
      date: "2024-01-08"
    },
    {
      id: 5,
      title: "Down Payment Strategies: Saving Smart",
      excerpt: "Effective strategies to save for your down payment faster, including government programs and investment options.",
      category: "Saving & Planning",
      tags: ["Down Payment", "Government Programs", "First-Time Buyers"],
      readTime: "9 min read",
      image: "💰",
      date: "2024-01-05"
    },
    {
      id: 6,
      title: "Mortgage Pre-Approval: Your First Step to Homeownership",
      excerpt: "Why getting pre-approved is crucial and how to navigate the pre-approval process successfully.",
      category: "Mortgage Basics",
      tags: ["Pre-Approval", "Mortgage Basics", "First-Time Buyers"],
      readTime: "4 min read",
      image: "✅",
      date: "2024-01-03"
    },
    {
      id: 7,
      title: "Investment Property Mortgages: What You Need to Know",
      excerpt: "Essential information about financing investment properties and understanding the different requirements.",
      category: "Investment",
      tags: ["Investment Properties", "Mortgage Basics", "Rates"],
      readTime: "6 min read",
      image: "🏢",
      date: "2024-01-01"
    },
    {
      id: 8,
      title: "2024 Mortgage Market Trends and Predictions",
      excerpt: "Stay ahead of the curve with insights into current mortgage market trends and what to expect in the coming year.",
      category: "Market Analysis",
      tags: ["Market Trends", "Rates", "Mortgage Basics"],
      readTime: "7 min read",
      image: "📊",
      date: "2023-12-28"
    },
    {
      id: 9,
      title: "Government Programs for First-Time Home Buyers",
      excerpt: "Explore available government programs and incentives designed to help first-time buyers enter the housing market.",
      category: "Government Programs",
      tags: ["Government Programs", "First-Time Buyers", "Down Payment"],
      readTime: "5 min read",
      image: "🏛️",
      date: "2023-12-25"
    }
  ];

  // Get unique categories
  const categories = ['All Categories', ...new Set(articles.map(article => article.category))];

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // Clear tags when changing category
    setSelectedTags([]);
  };

  // Filter articles based on selected category and tags
  const filteredArticles = articles.filter(article => {
    // First filter by category
    const categoryMatch = selectedCategory === 'All Categories' || article.category === selectedCategory;
    
    // Then filter by tags (if any tags are selected)
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.some(tag => article.tags.includes(tag));
    
    return categoryMatch && tagMatch;
  });

  // SEO Metadata
  useEffect(() => {
    document.title = 'Learning Centre | Mortgage Education & Resources | MortgageLink Canada';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Access comprehensive mortgage education resources, guides, and expert insights. Learn about mortgage rates, first-time buying, refinancing, and more.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = 'Access comprehensive mortgage education resources, guides, and expert insights. Learn about mortgage rates, first-time buying, refinancing, and more.';
      document.head.appendChild(newMetaDescription);
    }

    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50" role="main">
      {/* Hero Section */}
      <section className="bg-[#C8E6C9] py-8 sm:py-12 md:py-16 lg:py-20" aria-labelledby="hero-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 id="hero-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#212121] mb-4 sm:mb-6">
              Learning Centre
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#757575] max-w-3xl mx-auto leading-relaxed">
              Access comprehensive mortgage education resources, expert guides, and insights to make informed decisions about your home financing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filters */}
          <section className="mb-8 sm:mb-12" aria-labelledby="category-filters-heading">
            <h2 id="category-filters-heading" className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3" role="group" aria-label="Category filter options">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 ${
                    selectedCategory === category
                      ? 'bg-[#1B5E20] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                  }`}
                  aria-pressed={selectedCategory === category}
                  aria-label={`Filter by ${category} category`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Tag Filters */}
          <section className="mb-8 sm:mb-12" aria-labelledby="tag-filters-heading">
            <h3 id="tag-filters-heading" className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
              Filter by Tags
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3" role="group" aria-label="Tag filter options">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 ${
                    selectedTags.includes(tag)
                      ? 'bg-[#1B5E20] text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                  aria-pressed={selectedTags.includes(tag)}
                  aria-label={`Filter by ${tag} tag`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-[#E8F5E8] text-[#1B5E20] text-xs font-medium rounded-full"
                    >
                      {tag}
                      <button
                        onClick={() => handleTagClick(tag)}
                        className="ml-1 w-4 h-4 rounded-full hover:bg-[#1B5E20] hover:text-white transition-colors duration-200 flex items-center justify-center"
                        aria-label={`Remove ${tag} filter`}
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-sm text-[#1B5E20] hover:text-[#2E7D32] font-medium transition-colors duration-200"
                >
                  Clear all
                </button>
              </div>
            )}
          </section>

          {/* Results Count */}
          <div className="mb-6 sm:mb-8">
            <p className="text-sm text-gray-600">
              Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
              {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
              {selectedTags.length > 0 && ` with tags: ${selectedTags.join(', ')}`}
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article 
                key={article.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#1B5E20] focus-within:ring-offset-2"
              >
                {/* Article Image */}
                <div className="h-48 bg-gradient-to-br from-[#C8E6C9] to-[#A5D6A7] flex items-center justify-center">
                  <span className="text-6xl" role="img" aria-label="Article illustration">
                    {article.image}
                  </span>
                </div>

                {/* Article Content */}
                <div className="p-4 sm:p-6">
                  {/* Category Badge */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-[#E8F5E8] text-[#1B5E20] text-xs font-medium rounded-full">
                      {article.category}
                    </span>
                  </div>

                  {/* Article Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link 
                      to={`/learning-centre/${article.slug || article.id}`}
                      className="hover:text-[#1B5E20] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded"
                      aria-label={`Read article: ${article.title}`}
                    >
                      {article.title}
                    </Link>
                  </h3>

                  {/* Article Excerpt */}
                  <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Article Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Article Meta */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('en-CA', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {article.readTime}
                    </span>
                  </div>

                  {/* Read More Button */}
                  <div className="mt-4 sm:mt-6">
                    <Link 
                      to={`/learning-centre/${article.slug || article.id}`}
                      className="inline-flex items-center text-[#1B5E20] font-medium hover:text-[#2E7D32] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded"
                      aria-label={`Read full article: ${article.title}`}
                    >
                      Read More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* No Results Message */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or check back later for new content.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Categories');
                  setSelectedTags([]);
                }}
                className="text-[#1B5E20] hover:text-[#2E7D32] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded px-2 py-1"
                aria-label="Clear all filters and show all articles"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-8 sm:mt-12">
              <button className="bg-[#1B5E20] text-white px-8 py-3 rounded-md hover:bg-[#2E7D32] transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-white py-8 sm:py-12 border-t border-gray-200" aria-labelledby="newsletter-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="newsletter-heading" className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Stay Updated with Mortgage Insights
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Get the latest mortgage tips, market updates, and educational content delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1B5E20] focus:border-[#1B5E20] text-sm"
              aria-label="Email address for newsletter subscription"
              required
            />
            <button 
              type="submit"
              className="bg-[#1B5E20] text-white px-6 py-3 rounded-md hover:bg-[#2E7D32] transition-colors duration-200 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2"
              aria-label="Subscribe to newsletter"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default LearningCentre; 