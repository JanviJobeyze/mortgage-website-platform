import { useState, useEffect } from 'react';
import VoiceBotIcon from '../assets/Chat.png';
import ChatBotIcon from '../assets/Marie_Dubois.png';
import { faqKnowledgeBase, findBestFAQMatch, generateResponse } from '../data/faqData';

function ChatBot() {
  const [isVoiceBotOpen, setIsVoiceBotOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'bot', 
      message: 'Hello! I\'m your mortgage assistant. I can help you with questions about pre-approval, rates, documents, and more. What would you like to know?',
      source: 'Welcome message'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Listen for FAQ page questions
  useEffect(() => {
    const handleFAQQuestion = (event) => {
      console.log('ChatBot: Received FAQ question event:', event.detail);
      const { question, category } = event.detail;
      
      // Open chatbot if not already open
      setIsVoiceBotOpen(true);
      
      // Add user question
      const userMessage = { type: 'user', message: question };
      setChatMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      
      // Find matching FAQ and respond
      setTimeout(() => {
        const matchedFAQ = faqKnowledgeBase.find(faq => 
          faq.question.toLowerCase() === question.toLowerCase() ||
          faq.category === category
        );
        
        console.log('ChatBot: Matched FAQ:', matchedFAQ);
        
        const response = matchedFAQ 
          ? { message: matchedFAQ.answer, source: `From our FAQ: "${matchedFAQ.question}"`, category: matchedFAQ.category }
          : generateResponse(question);
        
        const botResponse = { 
          type: 'bot', 
          message: response.message,
          source: response.source,
          category: response.category
        };
        
        setChatMessages(prev => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    };

    console.log('ChatBot: Setting up event listener for openChatbot');
    window.addEventListener('openChatbot', handleFAQQuestion);
    
    return () => {
      window.removeEventListener('openChatbot', handleFAQQuestion);
    };
  }, []);

  const toggleVoiceBot = () => {
    setIsVoiceBotOpen(!isVoiceBotOpen);
    console.log('Voice bot toggled:', !isVoiceBotOpen);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message
    const userMessage = { type: 'user', message: chatMessage };
    setChatMessages(prev => [...prev, userMessage]);
    setChatMessage('');
    setIsTyping(true);

    // Process the question and find best match
    setTimeout(() => {
      const matchedFAQ = findBestFAQMatch(chatMessage);
      const response = generateResponse(chatMessage, matchedFAQ);
      
      const botResponse = { 
        type: 'bot', 
        message: response.message,
        source: response.source,
        category: response.category
      };
      
      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question) => {
    setChatMessage(question);
    // Auto-submit the quick question
    const userMessage = { type: 'user', message: question };
    setChatMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const matchedFAQ = findBestFAQMatch(question);
      const response = generateResponse(question, matchedFAQ);
      
      const botResponse = { 
        type: 'bot', 
        message: response.message,
        source: response.source,
        category: response.category
      };
      
      setChatMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      <button
        onClick={toggleVoiceBot}
        className={`
          relative w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110
          ${isVoiceBotOpen 
            ? 'bg-[#FFFFFF] border-2 border-[#E65100] hover:bg-[#FFF3E0]' 
            : 'bg-[#FFFFFF] border-2 border-[#1B5E20] hover:bg-[#F1F8E9]'
          }
        `}
        aria-label={isVoiceBotOpen ? "Close voice assistant" : "Open voice assistant"}
        aria-expanded={isVoiceBotOpen}
      >
        {/* Voice Bot Icon */}
        <div className="flex items-center justify-center w-full h-full">
          {isVoiceBotOpen ? (
            // Close X icon when open
            <svg className="w-8 h-8 text-[#E65100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Chat bot icon when closed
                            <img src={VoiceBotIcon} alt="Voice Bot" className="w-6 h-6 sm:w-8 sm:h-8" loading="lazy" />
          )}
        </div>

        {/* Subtle glow effect only on hover */}
        <div className={`
          absolute inset-0 rounded-full transition-all duration-300 opacity-0 hover:opacity-20
          ${isVoiceBotOpen ? 'bg-[#E65100]' : 'bg-[#1B5E20]'}
        `}></div>
      </button>

      {/* Chat Bot Panel (when open) */}
      {isVoiceBotOpen && (
        <div className="absolute bottom-16 sm:bottom-20 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 transform transition-all duration-300 ease-out">
          {/* Chat Header */}
          <div className="flex items-center p-4 border-b border-gray-200">
            <div className="w-10 h-10 flex items-center justify-center mr-3">
                              <img src={ChatBotIcon} alt="Voice Bot" className="w-10 h-10 rounded-full object-cover" loading="lazy" />
            </div>
            <div>
              <h4 className="font-semibold text-[#212121]">Mortgage Assistant</h4>
              <p className="text-sm text-[#757575]">Powered by FAQ knowledge base</p>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-xs px-3 py-2 rounded-lg text-sm
                  ${msg.type === 'user' 
                    ? 'bg-[#1B5E20] text-white rounded-br-none' 
                    : 'bg-[#F5F5F5] text-[#374151] rounded-bl-none'
                  }
                `}>
                  {msg.message}
                  {msg.source && msg.type === 'bot' && (
                    <div className="mt-2 text-xs text-[#6B7280] italic">
                      {msg.source}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#F5F5F5] px-3 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-2 border-t border-gray-100">
            <p className="text-xs text-[#757575] mb-2">Quick questions:</p>
            <div className="space-y-1">
              <button 
                onClick={() => handleQuickQuestion("What is mortgage pre-approval?")}
                className="w-full text-left p-2 rounded-lg hover:bg-[#F5F5F5] text-xs text-[#374151] transition-colors"
              >
                📋 What is mortgage pre-approval?
              </button>
              <button 
                onClick={() => handleQuickQuestion("How much down payment do I need?")}
                className="w-full text-left p-2 rounded-lg hover:bg-[#F5F5F5] text-xs text-[#374151] transition-colors"
              >
                💰 How much down payment do I need?
              </button>
              <button 
                onClick={() => handleQuickQuestion("What credit score do I need?")}
                className="w-full text-left p-2 rounded-lg hover:bg-[#F5F5F5] text-xs text-[#374151] transition-colors"
              >
                📊 What credit score do I need?
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleChatSubmit} className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about mortgages..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B5E20] focus:border-transparent text-sm bg-[#FFFFFF] text-[#9CA3AF]"
              />
              <button
                type="submit"
                disabled={!chatMessage.trim()}
                className="bg-[#1B5E20] text-white px-4 py-2 rounded-lg hover:bg-[#2E7D32] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot; 