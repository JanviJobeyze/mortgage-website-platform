import React from 'react';
import { Link } from 'react-router-dom';

const ArticleCard = ({ 
  title, 
  excerpt, 
  imageUrl, 
  slug, 
  publishedDate,
  category,
  readTime 
}) => {
  // Format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate excerpt to approximately 2 lines (around 120 characters)
  const truncateExcerpt = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-[#1B5E20] focus-within:ring-offset-2 group">
      {/* Article Image */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {/* Optional overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Article Content */}
      <div className="p-4 sm:p-6">
        {/* Category Badge - Optional */}
        {category && (
          <div className="mb-3">
            <span className="inline-block px-2 py-1 bg-[#E8F5E8] text-[#1B5E20] text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Article Title */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#1B5E20] transition-colors duration-200">
          <Link 
            to={`/learning-centre/${slug}`}
            className="focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded"
            aria-label={`Read article: ${title}`}
          >
            {title}
          </Link>
        </h3>

        {/* Article Excerpt */}
        <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {truncateExcerpt(excerpt)}
        </p>

        {/* Article Meta */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
          <time dateTime={publishedDate} className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(publishedDate)}
          </time>
          {readTime && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime}
            </span>
          )}
        </div>

        {/* Read More Link */}
        <div className="border-t border-gray-100 pt-4">
          <Link 
            to={`/learning-centre/${slug}`}
            className="inline-flex items-center text-[#1B5E20] font-medium hover:text-[#2E7D32] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded group/link"
            aria-label={`Read full article: ${title}`}
          >
            Read More
            <svg 
              className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard; 