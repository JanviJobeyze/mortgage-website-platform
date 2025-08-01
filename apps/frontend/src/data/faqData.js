// Shared FAQ data for both FAQ page and ChatBot
export const faqData = [
  {
    id: 'cat-1',
    category: 'Getting Started',
    isOpenByDefault: true,
    questions: [
      {
        id: 'q-1',
        question: 'What is mortgage pre-approval and why do I need it?',
        answer: 'Mortgage pre-approval is a preliminary assessment by a lender that estimates how much you can borrow. It helps you understand your budget, shows sellers you\'re serious, and speeds up the buying process. Pre-approval is valid for 90-120 days and requires income verification, credit check, and basic documentation.',
        languages: ['EN', 'FR', 'PA'],
        keywords: ['pre-approval', 'pre approval', 'preapproval', 'budget', 'lender assessment', 'income verification', 'credit check']
      },
      {
        id: 'q-2',
        question: 'How much down payment do I need in Canada?',
        answer: 'The minimum down payment depends on the home price: 5% for homes under $500,000, 10% for the portion between $500,000-$999,999, and 20% for homes $1 million+. First-time buyers may qualify for programs with lower requirements. A larger down payment reduces mortgage insurance costs and monthly payments.',
        languages: ['EN', 'FR', 'HI'],
        keywords: ['down payment', 'downpayment', 'minimum down payment', '5%', '10%', '20%', 'first time buyer', 'mortgage insurance']
      },
      {
        id: 'q-3',
        question: 'What credit score do I need for a mortgage?',
        answer: 'Most lenders require a minimum credit score of 680-720 for the best rates. Scores below 600 may still qualify but with higher rates and stricter terms. Government-backed mortgages (CMHC) have more flexible requirements. Improving your credit score before applying can save thousands in interest.',
        languages: ['EN', 'FR'],
        keywords: ['credit score', 'credit rating', '680', '720', '600', 'CMHC', 'government backed', 'interest rates']
      },
      {
        id: 'q-4',
        question: 'What is the difference between fixed and variable rates?',
        answer: 'Fixed rates remain constant throughout the term, providing payment stability. Variable rates fluctuate with the Bank of Canada\'s prime rate, potentially offering lower initial rates but payment uncertainty. Your choice depends on risk tolerance, market conditions, and financial goals.',
        languages: ['EN', 'FR', 'HI'],
        keywords: ['fixed rate', 'variable rate', 'prime rate', 'payment stability', 'risk tolerance', 'market conditions']
      }
    ]
  },
  {
    id: 'cat-2',
    category: 'Application Process',
    isOpenByDefault: false,
    questions: [
      {
        id: 'q-9',
        question: 'What documents do I need to apply?',
        answer: 'Required documents include: government ID, proof of income (T4s, pay stubs, tax returns), employment verification, bank statements, credit report authorization, and property details. Self-employed applicants need additional business documentation.',
        languages: ['EN', 'FR', 'HI'],
        keywords: ['documents', 'government ID', 'T4', 'pay stubs', 'tax returns', 'employment verification', 'bank statements', 'self employed']
      }
    ]
  },
  {
    id: 'cat-3',
    category: 'Rates & Terms',
    isOpenByDefault: false,
    questions: [
      {
        id: 'q-21',
        question: 'What affects mortgage rates in Canada?',
        answer: 'Rates are influenced by: Bank of Canada policy rate, bond yields, lender competition, your credit score, down payment size, property type, and mortgage amount. Economic conditions and inflation also play significant roles.',
        languages: ['EN', 'FR', 'HI'],
        keywords: ['mortgage rates', 'Bank of Canada', 'policy rate', 'bond yields', 'lender competition', 'credit score', 'down payment', 'economic conditions', 'inflation']
      }
    ]
  },
  {
    id: 'cat-6',
    category: 'Refinancing',
    isOpenByDefault: false,
    questions: [
      {
        id: 'q-44',
        question: 'When should I consider refinancing?',
        answer: 'Consider refinancing when: rates are significantly lower, you need to access equity, you want to consolidate debt, or your financial situation has improved. Calculate break-even costs before proceeding.',
        languages: ['EN', 'FR', 'HI'],
        keywords: ['refinancing', 'refinance', 'lower rates', 'access equity', 'consolidate debt', 'break even', 'financial situation']
      }
    ]
  }
];

// Flattened FAQ knowledge base for ChatBot
export const faqKnowledgeBase = faqData.flatMap(category => 
  category.questions.map(question => ({
    id: question.id,
    question: question.question,
    answer: question.answer,
    category: category.category,
    keywords: question.keywords || []
  }))
);

// Function to find the best matching FAQ
export const findBestFAQMatch = (userQuestion) => {
  const question = userQuestion.toLowerCase();
  
  // First, try exact keyword matches
  for (const faq of faqKnowledgeBase) {
    for (const keyword of faq.keywords) {
      if (question.includes(keyword.toLowerCase())) {
        return faq;
      }
    }
  }
  
  // If no keyword match, try partial question matching
  for (const faq of faqKnowledgeBase) {
    const faqQuestion = faq.question.toLowerCase();
    const words = question.split(' ');
    
    // Check if multiple words from user question appear in FAQ question
    const matchingWords = words.filter(word => 
      word.length > 3 && faqQuestion.includes(word)
    );
    
    if (matchingWords.length >= 2) {
      return faq;
    }
  }
  
  return null;
};

// Function to generate contextual response
export const generateResponse = (userQuestion, matchedFAQ = null) => {
  if (matchedFAQ) {
    return {
      message: matchedFAQ.answer,
      source: `From our FAQ: "${matchedFAQ.question}"`,
      category: matchedFAQ.category
    };
  }
  
  // Fallback responses based on question content
  const question = userQuestion.toLowerCase();
  
  if (question.includes('rate') || question.includes('interest')) {
    return {
      message: 'Current mortgage rates vary by lender and your financial profile. For the most accurate rates, I recommend speaking with one of our mortgage specialists who can provide personalized quotes based on your specific situation.',
      source: 'General rate information',
      category: 'Rates & Terms'
    };
  }
  
  if (question.includes('afford') || question.includes('budget') || question.includes('how much')) {
    return {
      message: 'Your mortgage affordability depends on your income, debt, credit score, and down payment. Use our mortgage calculator on the website for a quick estimate, or contact us for a detailed affordability analysis.',
      source: 'Affordability guidance',
      category: 'Getting Started'
    };
  }
  
  if (question.includes('first time') || question.includes('first-time')) {
    return {
      message: 'First-time buyers have access to several programs including RRSP Home Buyers\' Plan, land transfer tax rebates, and special mortgage products. Our team can help you navigate these options and maximize your benefits.',
      source: 'First-time buyer programs',
      category: 'Getting Started'
    };
  }
  
  return {
    message: 'Thank you for your question! While I can help with general mortgage information, for specific advice tailored to your situation, I recommend speaking with one of our mortgage specialists. They can provide personalized guidance and help you find the best mortgage solution.',
    source: 'General assistance',
    category: 'General'
  };
}; 