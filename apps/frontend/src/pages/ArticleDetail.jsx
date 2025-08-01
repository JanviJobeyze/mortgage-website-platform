import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to sanitize and enhance HTML content
  const sanitizeAndEnhanceContent = (htmlContent) => {
    try {
      // Check if DOMPurify is available and window object exists (browser environment)
      if (typeof window !== 'undefined' && typeof DOMPurify !== 'undefined' && DOMPurify.sanitize) {
        // Configure DOMPurify to allow specific tags and attributes
        const config = {
          ALLOWED_TAGS: [
            'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br',
            'img', 'video', 'iframe', 'blockquote', 'div', 'span'
          ],
          ALLOWED_ATTR: [
            'href', 'src', 'alt', 'title', 'width', 'height', 'class', 'id', 'style',
            'controls', 'autoplay', 'muted', 'loop', 'poster', 'preload',
            'frameborder', 'allowfullscreen', 'allow', 'loading'
          ],
          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i
        };

        // Sanitize the HTML
        let sanitizedContent = DOMPurify.sanitize(htmlContent, config);

        // Add responsive classes to images and videos
        sanitizedContent = sanitizedContent.replace(
          /<img([^>]*)>/gi,
          '<img$1 class="w-full h-auto rounded-lg shadow-md my-6 max-w-full" loading="lazy" onerror="this.style.display=\'none\'">'
        );

        // Add responsive classes to videos
        sanitizedContent = sanitizedContent.replace(
          /<video([^>]*)>/gi,
          '<video$1 class="w-full h-auto rounded-lg shadow-md my-6 max-w-full" controls preload="metadata">'
        );

        // Add responsive wrapper for iframes (embeds)
        sanitizedContent = sanitizedContent.replace(
          /<iframe([^>]*)>/gi,
          '<div class="relative w-full my-6" style="padding-bottom: 56.25%;"><iframe$1 class="absolute top-0 left-0 w-full h-full rounded-lg shadow-md" frameborder="0" allowfullscreen></iframe></div>'
        );

        return sanitizedContent;
      } else {
        // Fallback: basic sanitization without DOMPurify
        console.warn('DOMPurify not available, using basic sanitization');
        return htmlContent
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<img([^>]*)>/gi, '<img$1 class="w-full h-auto rounded-lg shadow-md my-6 max-w-full" loading="lazy" onerror="this.style.display=\'none\'">')
          .replace(/<video([^>]*)>/gi, '<video$1 class="w-full h-auto rounded-lg shadow-md my-6 max-w-full" controls preload="metadata">')
          .replace(/<iframe([^>]*)>/gi, '<div class="relative w-full my-6" style="padding-bottom: 56.25%;"><iframe$1 class="absolute top-0 left-0 w-full h-full rounded-lg shadow-md" frameborder="0" allowfullscreen></iframe></div>');
      }
    } catch (error) {
      console.error('Error sanitizing content:', error);
      // Return original content with basic media enhancements
      return htmlContent
        .replace(/<img([^>]*)>/gi, '<img$1 class="w-full h-auto rounded-lg shadow-md my-6 max-w-full" loading="lazy" onerror="this.style.display=\'none\'">')
        .replace(/<video([^>]*)>/gi, '<video$1 class="w-full h-auto rounded-lg shadow-md my-6 max-w-full" controls preload="metadata">')
        .replace(/<iframe([^>]*)>/gi, '<div class="relative w-full my-6" style="padding-bottom: 56.25%;"><iframe$1 class="absolute top-0 left-0 w-full h-full rounded-lg shadow-md" frameborder="0" allowfullscreen></iframe></div>');
    }
  };

  // Mock article data - in a real app, this would come from an API
  const mockArticles = {
    'understanding-mortgage-rates': {
      id: 1,
      title: "Understanding Mortgage Rates: Fixed vs Variable",
      slug: 'understanding-mortgage-rates',
      excerpt: "Learn the key differences between fixed and variable mortgage rates, and how to choose the right option for your financial situation.",
      category: "Mortgage Basics",
      tags: ["Rates", "Mortgage Basics"],
      readTime: "5 min read",
      image: "📊",
      date: "2024-01-15",
      author: "Sarah Chen",
      authorTitle: "Senior Mortgage Specialist",
      content: `
        <p>When it comes to choosing a mortgage, one of the most important decisions you'll make is whether to go with a fixed or variable rate. This choice can significantly impact your monthly payments and overall mortgage costs.</p>
        
                        <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="House with mortgage rate comparison chart" title="Understanding mortgage rates is crucial for homebuyers" loading="lazy">
        
        <h2>What is a Fixed Rate Mortgage?</h2>
        <p>A fixed rate mortgage offers a consistent interest rate throughout the entire term of your loan. This means your monthly payment amount remains the same, providing predictability and peace of mind.</p>
        
        <div style="background: linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%); padding: 20px; border-radius: 8px; border-left: 4px solid #1B5E20; margin: 24px 0;">
          <h3 style="margin-top: 0; color: #1B5E20;">Key Takeaway</h3>
          <p style="margin-bottom: 0;">Fixed rates provide stability but may cost more initially. Variable rates offer potential savings but come with uncertainty.</p>
        </div>
        
        <h3>Advantages of Fixed Rates:</h3>
        <ul>
          <li><strong>Predictability:</strong> Your payment never changes, making budgeting easier</li>
          <li><strong>Protection:</strong> You're shielded from rising interest rates</li>
          <li><strong>Peace of mind:</strong> No surprises in your monthly budget</li>
        </ul>
        
        <h3>Disadvantages of Fixed Rates:</h3>
        <ul>
          <li><strong>Higher initial rates:</strong> Fixed rates are typically higher than variable rates</li>
          <li><strong>No savings from rate drops:</strong> You won't benefit if rates decrease</li>
          <li><strong>Breakage costs:</strong> Higher penalties if you need to break the mortgage early</li>
        </ul>
        
        <h2>What is a Variable Rate Mortgage?</h2>
        <p>A variable rate mortgage has an interest rate that can fluctuate based on changes to the Bank of Canada's prime rate. Your monthly payment may change as rates go up or down.</p>
        
        <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Variable rate mortgage graph showing rate fluctuations over time" title="Variable rates can fluctuate with market conditions" loading="lazy">
        
        <h3>Advantages of Variable Rates:</h3>
        <ul>
          <li><strong>Lower initial rates:</strong> Typically start lower than fixed rates</li>
          <li><strong>Potential savings:</strong> Can save money if rates remain low or decrease</li>
          <li><strong>Lower breakage costs:</strong> Generally lower penalties for early termination</li>
        </ul>
        
        <h3>Disadvantages of Variable Rates:</h3>
        <ul>
          <li><strong>Uncertainty:</strong> Monthly payments can change unexpectedly</li>
          <li><strong>Risk of rate increases:</strong> Payments could increase if rates rise</li>
          <li><strong>Budgeting challenges:</strong> Harder to plan long-term finances</li>
        </ul>
        
        <h2>How to Choose Between Fixed and Variable</h2>
        <p>The decision between fixed and variable rates depends on several factors:</p>
        
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Mortgage Rate Comparison Guide" allowfullscreen></iframe>
        
        <h3>Consider Fixed Rates If:</h3>
        <ul>
          <li>You prefer predictable payments</li>
          <li>You're on a tight budget and can't afford payment increases</li>
          <li>You plan to stay in your home for the full term</li>
          <li>You're risk-averse and value stability</li>
        </ul>
        
        <h3>Consider Variable Rates If:</h3>
        <ul>
          <li>You can handle payment fluctuations</li>
          <li>You want to take advantage of potentially lower rates</li>
          <li>You might need to break your mortgage early</li>
          <li>You're comfortable with some financial risk</li>
        </ul>
        
        <h2>Current Market Considerations</h2>
        <p>In today's market, it's important to consider the current interest rate environment. With rates at historically low levels, many borrowers are choosing fixed rates to lock in these favorable terms.</p>
        
        <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Current mortgage market trends and rate analysis" title="Stay informed about current market conditions" loading="lazy">
        
        <p>However, if you believe rates may continue to decrease or you're comfortable with some uncertainty, a variable rate could still be an attractive option.</p>
        
        <h2>Consult with a Professional</h2>
        <p>Ultimately, the choice between fixed and variable rates is a personal one that depends on your financial situation, risk tolerance, and long-term goals. We recommend consulting with a mortgage professional who can help you evaluate your options and make an informed decision.</p>
        
        <p>At MortgageLink Canada, our experienced team can walk you through the pros and cons of each option and help you choose the mortgage product that best fits your needs.</p>
      `
    },
    'first-time-home-buyer-guide': {
      id: 2,
      title: "First-Time Home Buyer Guide: Complete Checklist",
      slug: 'first-time-home-buyer-guide',
      excerpt: "Everything you need to know about buying your first home, from saving for a down payment to closing the deal.",
      category: "First-Time Buyers",
      tags: ["First-Time Buyers", "Down Payment", "Pre-Approval"],
      readTime: "8 min read",
      image: "🏠",
      date: "2024-01-12",
      author: "Rajesh Patel",
      authorTitle: "First-Time Buyer Specialist",
      content: `
        <p>Buying your first home is one of the most exciting and significant financial decisions you'll ever make. This comprehensive guide will walk you through every step of the process, from initial planning to closing day.</p>
        
        <h2>Pre-Purchase Planning (6-12 months before)</h2>
        
        <h3>1. Assess Your Financial Situation</h3>
        <p>Before you start house hunting, take a thorough look at your finances:</p>
        <ul>
          <li>Calculate your monthly income and expenses</li>
          <li>Review your credit score and credit report</li>
          <li>Determine how much you can afford for a down payment</li>
          <li>Calculate your debt-to-income ratio</li>
        </ul>
        
        <h3>2. Start Saving for Your Down Payment</h3>
        <p>The minimum down payment in Canada is typically 5% for homes under $500,000, but saving more can help you:</p>
        <ul>
          <li>Avoid mortgage default insurance (CMHC insurance)</li>
          <li>Get better interest rates</li>
          <li>Reduce your monthly payments</li>
          <li>Build equity faster</li>
        </ul>
        
        <h3>3. Research Government Programs</h3>
        <p>Several programs can help first-time buyers:</p>
        <ul>
          <li><strong>First-Time Home Buyer Incentive:</strong> Shared equity program</li>
          <li><strong>Home Buyers' Plan (HBP):</strong> Withdraw from RRSPs tax-free</li>
          <li><strong>Land Transfer Tax Rebates:</strong> Available in some provinces</li>
          <li><strong>GST/HST Rebates:</strong> For new construction</li>
        </ul>
        
        <h2>Getting Pre-Approved (3-6 months before)</h2>
        
        <h3>4. Choose a Mortgage Professional</h3>
        <p>Work with a licensed mortgage broker who can:</p>
        <ul>
          <li>Compare rates from multiple lenders</li>
          <li>Explain different mortgage products</li>
          <li>Help you understand the approval process</li>
          <li>Negotiate on your behalf</li>
        </ul>
        
        <h3>5. Get Pre-Approved</h3>
        <p>A pre-approval will tell you:</p>
        <ul>
          <li>How much you can borrow</li>
          <li>What your interest rate will be</li>
          <li>What your monthly payments will be</li>
          <li>What documents you'll need</li>
        </ul>
        
        <h2>House Hunting (2-4 months)</h2>
        
        <h3>6. Determine Your Priorities</h3>
        <p>Create a list of must-haves and nice-to-haves:</p>
        <ul>
          <li>Location and neighborhood</li>
          <li>Size and number of bedrooms</li>
          <li>Property type (house, condo, townhouse)</li>
          <li>Age and condition of the property</li>
          <li>Future resale potential</li>
        </ul>
        
        <h3>7. Find a Real Estate Agent</h3>
        <p>Choose an agent who:</p>
        <ul>
          <li>Specializes in your target area</li>
          <li>Has experience with first-time buyers</li>
          <li>Understands your needs and budget</li>
          <li>Is responsive and communicates well</li>
        </ul>
        
        <h2>Making an Offer and Closing</h2>
        
        <h3>8. Making Your Offer</h3>
        <p>When you find the right home:</p>
        <ul>
          <li>Work with your agent to determine a fair price</li>
          <li>Include conditions (financing, home inspection)</li>
          <li>Set a reasonable closing date</li>
          <li>Be prepared to negotiate</li>
        </ul>
        
        <h3>9. Home Inspection</h3>
        <p>Always get a professional home inspection to:</p>
        <ul>
          <li>Identify potential issues</li>
          <li>Understand the property's condition</li>
          <li>Negotiate repairs or price adjustments</li>
          <li>Plan for future maintenance</li>
        </ul>
        
        <h3>10. Finalizing Your Mortgage</h3>
        <p>Once your offer is accepted:</p>
        <ul>
          <li>Provide all required documentation</li>
          <li>Review and sign your mortgage documents</li>
          <li>Arrange for home insurance</li>
          <li>Set up utilities and services</li>
        </ul>
        
        <h2>Closing Day Checklist</h2>
        <ul>
          <li>Bring photo ID and certified cheques</li>
          <li>Review all documents carefully</li>
          <li>Get keys and garage door openers</li>
          <li>Take meter readings</li>
          <li>Change locks for security</li>
        </ul>
        
        <h2>After Closing</h2>
        <p>Your journey doesn't end at closing:</p>
        <ul>
          <li>Set up automatic mortgage payments</li>
          <li>Create an emergency fund</li>
          <li>Plan for regular maintenance</li>
          <li>Consider mortgage insurance</li>
          <li>Start planning for your next move</li>
        </ul>
        
        <h2>Common First-Time Buyer Mistakes to Avoid</h2>
        <ul>
          <li>Not getting pre-approved before house hunting</li>
          <li>Focusing only on the purchase price, not total costs</li>
          <li>Skipping the home inspection</li>
          <li>Not considering future needs and resale value</li>
          <li>Forgetting about closing costs and moving expenses</li>
        </ul>
        
        <p>Remember, buying your first home is a marathon, not a sprint. Take your time, do your research, and don't hesitate to ask questions. The team at MortgageLink Canada is here to help you every step of the way.</p>
      `
    },
    'improve-credit-score': {
      id: 3,
      title: "How to Improve Your Credit Score for Better Rates",
      slug: 'improve-credit-score',
      excerpt: "Practical tips and strategies to boost your credit score and qualify for the best mortgage rates available.",
      category: "Credit & Finance",
      tags: ["Credit Score", "Rates", "Pre-Approval"],
      readTime: "6 min read",
      image: "📈",
      date: "2024-01-10",
      author: "Marie Dubois",
      authorTitle: "Credit Specialist",
      content: `
        <p>Your credit score is one of the most important factors lenders consider when approving your mortgage application and determining your interest rate. A higher credit score can save you thousands of dollars over the life of your mortgage.</p>
        
        <h2>Understanding Credit Scores in Canada</h2>
        <p>In Canada, credit scores range from 300 to 900, with higher scores being better. Here's how they're typically categorized:</p>
        <ul>
          <li><strong>Excellent (750-900):</strong> Best rates and terms available</li>
          <li><strong>Good (700-749):</strong> Good rates, minor restrictions</li>
          <li><strong>Fair (650-699):</strong> Higher rates, some restrictions</li>
          <li><strong>Poor (600-649):</strong> Limited options, high rates</li>
          <li><strong>Very Poor (300-599):</strong> Difficult to qualify</li>
        </ul>
        
        <h2>How Credit Scores Are Calculated</h2>
        <p>Your credit score is based on several factors:</p>
        
        <h3>Payment History (35%)</h3>
        <p>This is the most important factor. Lenders want to see that you pay your bills on time, every time.</p>
        
        <h3>Credit Utilization (30%)</h3>
        <p>This measures how much of your available credit you're using. Aim to keep this below 30%.</p>
        
        <h3>Length of Credit History (15%)</h3>
        <p>Longer credit histories are generally better, as they show more data about your borrowing behavior.</p>
        
        <h3>Types of Credit (10%)</h3>
        <p>Having a mix of different types of credit (credit cards, loans, lines of credit) can be beneficial.</p>
        
        <h3>New Credit Inquiries (10%)</h3>
        <p>Too many recent credit applications can hurt your score.</p>
        
        <h2>Strategies to Improve Your Credit Score</h2>
        
        <h3>1. Pay All Bills on Time</h3>
        <p>This is the single most important thing you can do:</p>
        <ul>
          <li>Set up automatic payments for recurring bills</li>
          <li>Use calendar reminders for manual payments</li>
          <li>Pay at least the minimum amount due</li>
          <li>Contact creditors immediately if you can't pay</li>
        </ul>
        
        <h3>2. Reduce Credit Card Balances</h3>
        <p>High credit utilization can significantly hurt your score:</p>
        <ul>
          <li>Aim to keep balances below 30% of your credit limit</li>
          <li>Pay off high-interest debt first</li>
          <li>Consider a balance transfer to a lower-rate card</li>
          <li>Don't close old accounts (this reduces your total credit limit)</li>
        </ul>
        
        <h3>3. Don't Apply for New Credit Unnecessarily</h3>
        <p>Each credit application creates a hard inquiry that can lower your score:</p>
        <ul>
          <li>Only apply for credit when you need it</li>
          <li>Space out applications by at least 6 months</li>
          <li>Be strategic about when you apply</li>
          <li>Consider pre-qualification offers (soft inquiries)</li>
        </ul>
        
        <h3>4. Build a Positive Credit History</h3>
        <p>If you have limited credit history:</p>
        <ul>
          <li>Get a secured credit card</li>
          <li>Become an authorized user on someone else's card</li>
          <li>Take out a small personal loan and pay it back on time</li>
          <li>Consider a credit-builder loan</li>
        </ul>
        
        <h3>5. Monitor Your Credit Report</h3>
        <p>Regular monitoring helps you catch and fix errors:</p>
        <ul>
          <li>Check your credit report at least annually</li>
          <li>Dispute any errors you find</li>
          <li>Monitor for signs of identity theft</li>
          <li>Use free credit monitoring services</li>
        </ul>
        
        <h2>How Long Does It Take to Improve Your Score?</h2>
        <p>Credit score improvement takes time:</p>
        <ul>
          <li><strong>Quick improvements (1-3 months):</strong> Paying off high balances, correcting errors</li>
          <li><strong>Medium-term improvements (3-6 months):</strong> Consistent on-time payments, reducing utilization</li>
          <li><strong>Long-term improvements (6+ months):</strong> Building positive history, aging of accounts</li>
        </ul>
        
        <h2>Common Credit Score Myths</h2>
        
        <h3>Myth: Checking your credit score hurts it</h3>
        <p><strong>Fact:</strong> Checking your own credit score is a soft inquiry and doesn't affect your score.</p>
        
        <h3>Myth: Closing old accounts helps your score</h3>
        <p><strong>Fact:</strong> Closing old accounts can actually hurt your score by reducing your credit history length and total available credit.</p>
        
        <h3>Myth: You need to carry a balance to build credit</h3>
        <p><strong>Fact:</strong> You can build credit by using your card and paying it off in full each month.</p>
        
        <h2>When to Start Improving Your Credit</h2>
        <p>If you're planning to buy a home:</p>
        <ul>
          <li>Start improving your credit at least 6-12 months before applying</li>
          <li>Focus on the most impactful changes first</li>
          <li>Be patient - credit improvement takes time</li>
          <li>Work with a mortgage professional who can guide you</li>
        </ul>
        
        <h2>Getting Help</h2>
        <p>If you're struggling with credit issues:</p>
        <ul>
          <li>Consider working with a credit counselor</li>
          <li>Look into debt consolidation options</li>
          <li>Contact your creditors to discuss payment arrangements</li>
          <li>Work with a mortgage broker who specializes in credit challenges</li>
        </ul>
        
        <p>Remember, improving your credit score is an investment in your financial future. The better your credit score, the more options you'll have and the more money you'll save on your mortgage.</p>
        
        <p>At MortgageLink Canada, we work with borrowers at all credit levels and can help you find the best mortgage options available to you.</p>
      `
    }
  };

  useEffect(() => {
    // Simulate API call
    const fetchArticle = async () => {
      setLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundArticle = mockArticles[slug];
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          setError('Article not found');
        }
      } catch (error) {
        console.error('Error loading article:', error);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();

    // Cleanup function
    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
    };
  }, [slug]);

  // SEO Metadata - runs when article changes
  useEffect(() => {
    if (article) {
      // Set dynamic title
      const title = article.title 
        ? `${article.title} | Learning Centre | MortgageLink Canada`
        : 'Learning Centre | Mortgage Education & Resources | MortgageLink Canada';
      document.title = title;

      // Set meta description
      const description = article.excerpt || 'Access comprehensive mortgage education resources, guides, and expert insights. Learn about mortgage rates, first-time buying, refinancing, and more.';
      
      // Update or create meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }

      // Set Open Graph meta tags
      const ogTags = [
        { property: 'og:title', content: article.title || 'Mortgage Education Resources' },
        { property: 'og:description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: window.location.href },
        { property: 'og:site_name', content: 'MortgageLink Canada' },
        { property: 'og:image', content: article.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: article.title || 'Mortgage Education Article' },
        { property: 'article:published_time', content: article.date },
        { property: 'article:author', content: article.author || 'MortgageLink Canada' },
        { property: 'article:section', content: article.category || 'Mortgage Education' },
        { property: 'article:tag', content: article.tags ? article.tags.join(', ') : 'mortgage, education, home buying' }
      ];

      // Update or create Open Graph tags
      ogTags.forEach(tag => {
        let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
        if (existingTag) {
          existingTag.setAttribute('content', tag.content);
        } else {
          existingTag = document.createElement('meta');
          existingTag.setAttribute('property', tag.property);
          existingTag.setAttribute('content', tag.content);
          document.head.appendChild(existingTag);
        }
      });

      // Set Twitter Card meta tags
      const twitterTags = [
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: article.title || 'Mortgage Education Resources' },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: article.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' },
        { name: 'twitter:image:alt', content: article.title || 'Mortgage Education Article' }
      ];

      // Update or create Twitter Card tags
      twitterTags.forEach(tag => {
        let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
        if (existingTag) {
          existingTag.setAttribute('content', tag.content);
        } else {
          existingTag = document.createElement('meta');
          existingTag.setAttribute('name', tag.name);
          existingTag.setAttribute('content', tag.content);
          document.head.appendChild(existingTag);
        }
      });

      // Set additional SEO meta tags
      const additionalTags = [
        { name: 'keywords', content: article.tags ? article.tags.join(', ') + ', mortgage, home buying, real estate, financing' : 'mortgage, home buying, real estate, financing, education' },
        { name: 'author', content: article.author || 'MortgageLink Canada' },
        { name: 'robots', content: 'index, follow' }
      ];

      // Update or create additional meta tags
      additionalTags.forEach(tag => {
        let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
        if (existingTag) {
          existingTag.setAttribute('content', tag.content);
        } else {
          existingTag = document.createElement('meta');
          existingTag.setAttribute('name', tag.name);
          existingTag.setAttribute('content', tag.content);
          document.head.appendChild(existingTag);
        }
      });

      // Set structured data for rich snippets
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": description,
        "image": article.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        "author": {
          "@type": "Person",
          "name": article.author || "MortgageLink Canada"
        },
        "publisher": {
          "@type": "Organization",
          "name": "MortgageLink Canada",
          "logo": {
            "@type": "ImageObject",
            "url": "https://mortgagelink.ca/logo.png"
          }
        },
        "datePublished": article.date,
        "dateModified": article.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        },
        "articleSection": article.category || "Mortgage Education",
        "keywords": article.tags ? article.tags.join(', ') : "mortgage, education, home buying"
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
    }

    // Cleanup function
    return () => {
      document.title = 'MortgageLink Canada - Your Trusted Mortgage Partner';
      
      // Remove Open Graph tags
      const ogTags = document.querySelectorAll('meta[property^="og:"]');
      ogTags.forEach(tag => tag.remove());
      
      // Remove Twitter Card tags
      const twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
      twitterTags.forEach(tag => tag.remove());
      
      // Remove structured data
      const structuredDataScript = document.querySelector('script[type="application/ld+json"]');
      if (structuredDataScript) {
        structuredDataScript.remove();
      }
    };
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link 
            to="/learning-centre" 
            className="inline-flex items-center text-[#1B5E20] hover:text-[#2E7D32] font-medium mb-6 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Learning Centre
          </Link>
          
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h1>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link 
              to="/learning-centre" 
              className="bg-[#1B5E20] text-white px-6 py-3 rounded-md hover:bg-[#2E7D32] transition-colors duration-200 font-medium"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50" role="main">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back to Learning Centre Link */}
        <nav className="mb-8" aria-label="Breadcrumb navigation">
          <Link 
            to="/learning-centre" 
            className="inline-flex items-center text-[#1B5E20] hover:text-[#2E7D32] font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-1 rounded px-1"
            aria-label="Navigate back to Learning Centre"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Learning Centre
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8" aria-labelledby="article-title">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-[#E8F5E8] text-[#1B5E20] text-sm font-semibold rounded-full border border-[#1B5E20]/20">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span className="sr-only">Category: </span>
              {article.category}
            </span>
          </div>

          {/* Article Title */}
          <h1 id="article-title" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6 p-4 bg-gray-50 rounded-lg" role="contentinfo" aria-label="Article metadata">
            <time dateTime={article.date} className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="sr-only">Published on: </span>
              {new Date(article.date).toLocaleDateString('en-CA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="sr-only">Reading time: </span>
              {article.readTime}
            </span>

            {article.author && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-[#1B5E20]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="sr-only">Author: </span>
                <span className="font-medium">{article.author}</span>
                {article.authorTitle && (
                  <span className="ml-2 text-gray-500" aria-label={`Author title: ${article.authorTitle}`}>• {article.authorTitle}</span>
                )}
              </span>
            )}
          </div>

          {/* Article Tags */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Article tags">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full hover:bg-gray-50 transition-colors duration-200"
                aria-label={`Tag: ${tag}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
          {/* Article Excerpt */}
          <div className="mb-8 p-6 bg-gradient-to-r from-[#E8F5E8] to-[#F1F8E9] rounded-lg border-l-4 border-[#1B5E20]" role="note" aria-label="Article summary">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-[#1B5E20] mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-lg text-gray-700 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:lg:text-5xl prose-h1:mb-6 prose-h1:mt-8 prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-[#1B5E20] prose-h3:text-xl prose-h3:sm:text-2xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base prose-p:sm:text-lg prose-ul:my-4 prose-ol:my-4 prose-li:text-gray-700 prose-li:mb-1 prose-li:leading-relaxed prose-strong:text-gray-900 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-[#1B5E20] prose-blockquote:bg-gray-50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:my-6 prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:rounded-r-lg prose-a:text-[#1B5E20] prose-a:font-medium prose-a:no-underline hover:prose-a:text-[#2E7D32] prose-a:transition-colors prose-a:duration-200 prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-img:max-w-full prose-video:rounded-lg prose-video:shadow-md prose-video:my-6 prose-video:max-w-full">
            <div dangerouslySetInnerHTML={{ __html: sanitizeAndEnhanceContent(article.content) }} />
          </article>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200" aria-labelledby="cta-heading">
          <div className="bg-gradient-to-r from-[#E8F5E8] to-[#F1F8E9] rounded-lg p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <h3 id="cta-heading" className="text-lg font-semibold text-gray-900 mb-2">
                  Need Personalized Mortgage Advice?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Our licensed mortgage specialists are here to help you navigate your home financing journey. Get expert guidance tailored to your unique situation.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/contact" 
                  className="bg-[#1B5E20] text-white px-6 py-3 rounded-md hover:bg-[#2E7D32] transition-colors duration-200 font-medium text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2"
                  aria-label="Contact us for expert mortgage advice"
                >
                  Get Expert Advice
                </Link>
                <Link 
                  to="/calculator" 
                  className="bg-white text-[#1B5E20] border border-[#1B5E20] px-6 py-3 rounded-md hover:bg-[#1B5E20] hover:text-white transition-colors duration-200 font-medium text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2"
                  aria-label="Use our mortgage calculator"
                >
                  Calculate Payments
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}

export default ArticleDetail; 