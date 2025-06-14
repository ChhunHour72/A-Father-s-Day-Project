import React, { createContext, useState, useContext, useEffect } from 'react';

// Template configurations
const TEMPLATES = {
  default: {
    title: "Happy Father's Day",
    subtitle: "To the world's greatest dad",
    message: "Thank you for being my hero and my guide",
    insideMessage: "Thank you for your endless love, support, and wisdom. You've taught me so much and been my rock through everything. I'm so grateful to have you as my father.",
    signature: "With all my love,\nYour Child",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colorScheme: 'warm',
    fontFamily: 'playfair',
    layout: 'layout1'
  },
  modern: {
    title: "To My Amazing Dad",
    subtitle: "On Father's Day",
    message: "Your guidance means everything to me",
    insideMessage: "Dear Dad,\n\nYour strength and wisdom have been my compass. Thank you for always believing in me and supporting my dreams. I'm proud to be your child.",
    signature: "Love always,\nYour Child",
    image: "https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colorScheme: 'cool',
    fontFamily: 'poppins',
    layout: 'layout2'
  },
  playful: {
    title: "Happy Father's Day!",
    subtitle: "To the coolest dad around",
    message: "Thanks for being awesome!",
    insideMessage: "Hey Dad!\n\nThanks for all the fun times and great memories. You're not just my dad, you're my friend too. Let's make more memories together!",
    signature: "Your biggest fan,\nYour Child",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colorScheme: 'bright',
    fontFamily: 'cursive',
    layout: 'layout3'
  },
  vintage: {
    title: "To My Dearest Father",
    subtitle: "On this special day",
    message: "With love and gratitude",
    insideMessage: "Dear Father,\n\nYour wisdom and kindness have shaped who I am today. Thank you for your unwavering support and the values you've instilled in me.",
    signature: "With respect and love,\nYour Child",
    image: "https://images.unsplash.com/photo-1599745780087-8a3c873f6396?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    colorScheme: 'vintage',
    fontFamily: 'serif',
    layout: 'layout4'
  }
};

// Create context
const CardContext = createContext();

// Provider component
export const CardProvider = ({ children }) => {
  const [cardData, setCardData] = useState(() => {
    // Load from localStorage if available
    const savedData = localStorage.getItem('fathersDayCardDraft');
    return savedData ? JSON.parse(savedData) : {
      ...TEMPLATES.modern,
      theme: 'warm',
      font: 'sans',
      lastUpdated: new Date().toISOString()
    };
  });

  const updateCardData = (newData) => {
    setCardData(prev => ({ 
      ...prev, 
      ...newData,
      lastUpdated: new Date().toISOString()
    }));
  };

  const resetCard = () => {
    setCardData({
      ...TEMPLATES.modern,
      theme: 'warm',
      font: 'sans',
      lastUpdated: new Date().toISOString()
    });
  };

  const applyTemplate = (templateId) => {
    setCardData(prev => ({
      ...prev,
      ...TEMPLATES[templateId],
      lastUpdated: new Date().toISOString()
    }));
  };

  // Save to localStorage whenever cardData changes
  useEffect(() => {
    localStorage.setItem('fathersDayCardDraft', JSON.stringify(cardData));
  }, [cardData]);

  return (
    <CardContext.Provider value={{ 
      cardData, 
      updateCardData, 
      resetCard,
      applyTemplate,
      templates: TEMPLATES
    }}>
      {children}
    </CardContext.Provider>
  );
};

// Custom hook
export const useCardContext = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};