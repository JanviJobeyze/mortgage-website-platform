import React, { useState, useEffect, useRef } from 'react';

const VoiceReader = () => {
  const [isReading, setIsReading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const buttonRef = useRef(null);

  // Check if speech synthesis is supported
  useEffect(() => {
    console.log('VoiceReader: Checking browser support...');
    console.log('speechSynthesis in window:', 'speechSynthesis' in window);
    console.log('SpeechSynthesisUtterance in window:', 'SpeechSynthesisUtterance' in window);
    
    if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
      setIsSupported(true);
      console.log('VoiceReader: Speech synthesis is supported');
    } else {
      console.log('VoiceReader: Speech synthesis is NOT supported');
    }
  }, []);

  // Get the main content text
  const getMainContent = () => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      // Get text content while preserving some structure
      const textContent = mainElement.innerText || mainElement.textContent || '';
      
      // Clean up the text (remove extra whitespace, etc.)
      return textContent
        .replace(/\s+/g, ' ')
        .replace(/\n+/g, ' ')
        .trim();
    }
    return '';
  };

  // Get available voices
  const getVoices = () => {
    return new Promise((resolve) => {
      let voices = speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          voices = speechSynthesis.getVoices();
          resolve(voices);
        };
      }
    });
  };

  // Find the best voice for reading
  const getBestVoice = async () => {
    const voices = await getVoices();
    
    // Prefer English voices
    const englishVoices = voices.filter(voice => 
      voice.lang.startsWith('en') || voice.lang.startsWith('en-')
    );
    
    if (englishVoices.length > 0) {
      // Prefer Canadian English if available
      const canadianVoice = englishVoices.find(voice => 
        voice.lang.includes('CA') || voice.lang.includes('canada')
      );
      if (canadianVoice) return canadianVoice;
      
      // Otherwise return the first English voice
      return englishVoices[0];
    }
    
    // Fallback to any available voice
    return voices[0] || null;
  };

  // Start reading
  const startReading = async () => {
    if (!isSupported) {
      alert('Speech synthesis is not supported in your browser.');
      return;
    }

    const text = getMainContent();
    if (!text) {
      alert('No content found to read.');
      return;
    }

    try {
      // Stop any current reading
      if (currentUtterance) {
        speechSynthesis.cancel();
      }

      const voice = await getBestVoice();
      const utterance = new SpeechSynthesisUtterance(text);
      
      if (voice) {
        utterance.voice = voice;
      }
      
      // Set properties for better reading
      utterance.rate = 0.9; // Slightly slower for better comprehension
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      utterance.lang = 'en-CA';

      // Event handlers
      utterance.onstart = () => {
        setIsReading(true);
        setIsPaused(false);
        setCurrentUtterance(utterance);
      };

      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
        setCurrentUtterance(null);
      };

      utterance.onpause = () => {
        setIsPaused(true);
      };

      utterance.onresume = () => {
        setIsPaused(false);
      };

      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        setIsReading(false);
        setIsPaused(false);
        setCurrentUtterance(null);
        
        // Don't show alerts for user-initiated stops or cancellations
        if (event.error === 'canceled' || event.error === 'interrupted') {
          console.log('Speech synthesis was canceled by user');
          return;
        }
        
        if (event.error === 'not-allowed') {
          alert('Please allow speech synthesis in your browser settings.');
        } else if (event.error !== 'canceled' && event.error !== 'interrupted') {
          // Only show error for actual errors, not user cancellations
          console.log('Speech synthesis error:', event.error);
        }
      };

      // Start reading
      speechSynthesis.speak(utterance);
      
    } catch (error) {
      console.error('Error starting speech synthesis:', error);
      alert('Unable to start reading. Please try again.');
    }
  };

  // Stop reading
  const stopReading = () => {
    try {
      // Cancel any ongoing speech synthesis
      if (speechSynthesis.speaking || speechSynthesis.pending) {
        speechSynthesis.cancel();
      }
      
      // Reset state
      setIsReading(false);
      setIsPaused(false);
      setCurrentUtterance(null);
      
      console.log('Reading stopped by user');
    } catch (error) {
      console.error('Error stopping speech synthesis:', error);
      // Still reset state even if there's an error
      setIsReading(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    }
  };

  // Pause/Resume reading
  const togglePause = () => {
    try {
      if (isReading) {
        if (isPaused) {
          speechSynthesis.resume();
          console.log('Reading resumed');
        } else {
          speechSynthesis.pause();
          console.log('Reading paused');
        }
      }
    } catch (error) {
      console.error('Error toggling pause/resume:', error);
      // Reset state if there's an error
      setIsReading(false);
      setIsPaused(false);
      setCurrentUtterance(null);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event) => {
      // Ctrl/Cmd + Shift + R to start/stop reading
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'R') {
        event.preventDefault();
        if (isReading) {
          stopReading();
        } else {
          startReading();
        }
      }
      
      // Space to pause/resume when reading
      if (event.key === ' ' && isReading) {
        event.preventDefault();
        togglePause();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isReading, isPaused]);

  // Auto-hide button when not in use
  useEffect(() => {
    let timeout;
    if (!isReading) {
      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Hide after 3 seconds of inactivity
    } else {
      setIsVisible(true);
    }

    return () => clearTimeout(timeout);
  }, [isReading]);

  // Show button on mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      if (!isReading) {
        setIsVisible(true);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [isReading]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        if (speechSynthesis.speaking || speechSynthesis.pending) {
          speechSynthesis.cancel();
        }
      } catch (error) {
        console.error('Error during cleanup:', error);
      }
    };
  }, []);

  // For testing purposes, always show the button
  // if (!isSupported) {
  //   return null;
  // }
  
  // Show a disabled version if not supported
  if (!isSupported) {
    return (
      <div 
        ref={buttonRef}
        className="fixed bottom-6 left-6 z-50 transition-all duration-300 opacity-100"
      >
        <button
          disabled
          className="relative group flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-gray-400 text-white cursor-not-allowed"
          aria-label="Speech synthesis not supported"
          title="Speech synthesis not supported in this browser"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </button>
        <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Speech synthesis not supported
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={buttonRef}
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {/* Main Read Button */}
      <button
        onClick={isReading ? stopReading : startReading}
        className={`relative group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 ${
          isReading 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
        aria-label={isReading ? 'Stop reading' : 'Read page aloud'}
        title={`${isReading ? 'Stop' : 'Read'} page aloud (Ctrl+Shift+R)`}
      >
        {isReading ? (
          // Stop icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h12v16H6z"/>
          </svg>
        ) : (
          // Play/Read icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
        
        {/* Pulse animation when reading */}
        {isReading && (
          <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></div>
        )}
      </button>

      {/* Pause/Resume Button (only when reading) */}
      {isReading && (
        <button
          onClick={togglePause}
          className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label={isPaused ? 'Resume reading' : 'Pause reading'}
          title={isPaused ? 'Resume reading' : 'Pause reading'}
        >
          {isPaused ? (
            // Play icon
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          ) : (
            // Pause icon
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          )}
        </button>
      )}

      {/* Status indicator */}
      {isReading && (
        <div className="absolute -bottom-8 left-0 right-0 text-center">
          <div className="inline-flex items-center px-3 py-1 bg-black bg-opacity-75 text-white text-xs rounded-full">
            <div className={`w-2 h-2 rounded-full mr-2 ${isPaused ? 'bg-yellow-400' : 'bg-green-400 animate-pulse'}`}></div>
            {isPaused ? 'Paused' : 'Reading...'}
          </div>
        </div>
      )}

      {/* Tooltip */}
      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {isReading ? 'Stop reading' : 'Read page aloud'}
        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default VoiceReader; 