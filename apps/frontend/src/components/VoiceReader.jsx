import React, { useState, useEffect } from 'react';

const VoiceReader = ({ 
  text, 
  rate = 0.9, 
  pitch = 1, 
  voice = null,
  onStart = null,
  onEnd = null,
  onError = null,
  className = "",
  buttonText = "🔊 Read aloud",
  disabled = false
}) => {
  const [isReading, setIsReading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Check if Web Speech API is supported
  useEffect(() => {
    const supported = 'speechSynthesis' in window;
    setIsSupported(supported);
    
    if (supported) {
      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Try to find a Canadian English voice, fallback to any English voice
        const canadianVoice = voices.find(v => 
          v.lang.includes('en-CA') || v.lang.includes('en-US') || v.lang.includes('en-GB')
        );
        setSelectedVoice(canadianVoice || voices[0] || null);
      };

      // Load voices immediately if available
      loadVoices();
      
      // Also listen for voices loaded event
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const startReading = () => {
    if (!isSupported || !text || isReading) return;

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create speech utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.voice = selectedVoice;
    utterance.volume = 1;

    // Event handlers
    utterance.onstart = () => {
      setIsReading(true);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      setIsReading(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      setIsReading(false);
      console.error('Speech synthesis error:', event);
      if (onError) onError(event);
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSupported]);

  if (!isSupported) {
    return (
      <button
        disabled
        className={`px-3 py-2 text-sm font-medium text-gray-400 bg-gray-100 rounded-md cursor-not-allowed ${className}`}
        title="Speech synthesis not supported in this browser"
      >
        🔊 Read aloud (Not supported)
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center space-x-2 ${className}`}>
      <button
        onClick={isReading ? stopReading : startReading}
        disabled={disabled || !text}
        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1B5E20] focus:ring-offset-2 ${
          isReading
            ? 'bg-red-600 text-white hover:bg-red-700'
            : 'bg-[#1B5E20] text-white hover:bg-[#2E7D32]'
        } ${
          disabled || !text
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-pointer'
        }`}
        title={isReading ? 'Stop reading' : 'Read rate information aloud'}
      >
        {isReading ? '⏹️ Stop' : buttonText}
      </button>
      
      {isReading && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600">Reading...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceReader; 