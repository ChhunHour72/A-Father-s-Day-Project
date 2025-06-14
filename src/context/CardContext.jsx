import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced color palettes with new additions
const COLOR_PALETTES = {
  storyteller: { name: 'Storyteller', bg: '#f7f3e9', primaryText: '#4a2c2a', secondaryText: '#8c5d58', accent: '#c69f89', border: '#d9c8b4'},
  handyman: { name: 'Workshop', bg: '#f5f2ed', primaryText: '#3e3a36', secondaryText: '#7d6e63', accent: '#c56e33', border: '#c9b8a8' },
  grillmaster: { name: 'Grill Master', bg: '#fef7e5', primaryText: '#5c3a21', secondaryText: '#b85c38', accent: '#e27d60', border: '#e8b796'},
  adventurer: { name: 'Adventurer', bg: '#f0f7f4', primaryText: '#2c4a3e', secondaryText: '#5b8c7d', accent: '#8fb9a9', border: '#a7d1c4'},
  techie: { name: 'Tech Guru', bg: '#0d1117', primaryText: '#c9d1d9', secondaryText: '#8b949e', accent: '#58a6ff', border: '#30363d'},
  elegant: { name: 'Gentleman', bg: '#1a202c', primaryText: '#e2e8f0', secondaryText: '#a0aec0', accent: '#d69e2e', border: '#2d3748'},
  coach: { name: 'Coach', bg: '#f0f9ff', primaryText: '#1e40af', secondaryText: '#3b82f6', accent: '#ef4444', border: '#93c5fd'},
  musician: { name: 'Musician', bg: '#f9f5ff', primaryText: '#4c1d95', secondaryText: '#7e22ce', accent: '#d946ef', border: '#d8b4fe'},
  gamer: { name: 'Gamer', bg: '#1f2937', primaryText: '#d1d5db', secondaryText: '#9ca3af', accent: '#4ade80', border: '#4b5563' },
  gardener: { name: 'Gardener', bg: '#f0fdf4', primaryText: '#166534', secondaryText: '#15803d', accent: '#84cc16', border: '#a7f3d0' },
  khmer: { name: 'Khmer Heritage', bg: '#fffaf0', primaryText: '#a10a11', secondaryText: '#c78b01', accent: '#e5b300', border: '#fde68a' },
};

// Enhanced font pairings with new Khmer fonts
const FONT_STYLES = {
  vintage: { name: 'Playfair + Merriweather', family: "'Playfair Display', serif, 'Merriweather', serif" },
  playful: { name: 'Poppins + Comic Neue', family: "'Poppins', sans-serif, 'Comic Neue', cursive" },
  modern: { name: 'Montserrat + Raleway', family: "'Montserrat', sans-serif, 'Raleway', sans-serif" },
  tech: { name: 'Source Code Pro + Rajdhani', family: "'Source Code Pro', monospace, 'Rajdhani', sans-serif" },
  elegant: { name: 'Cormorant Garamond', family: "'Cormorant Garamond', serif" },
  adventurous: { name: 'Bebas Neue + Lato', family: "'Bebas Neue', sans-serif, 'Lato', sans-serif" },
  khmer_display: { name: 'Koulen (Khmer)', family: "'Koulen', sans-serif" },
  khmer_content: { name: 'Battambang (Khmer)', family: "'Battambang', serif" },
  khmer_art: { name: 'Moul (Khmer)', family: "'Moul', serif" },
};

// Enhanced templates with new Khmer template
const TEMPLATES = {
  khmer: {
    id: 'khmer',
    name: "កេរដំណែលខ្មែរ (Khmer Heritage)",
    category: 'Cultural',
    description: "For celebrating dad with the beauty of Khmer tradition.",
    title: "រីករាយទិវាឪពុក",
    subtitle: "",
    message: "សូមអរគុណលោកជាទីគោរព",
    insideMessage: "កូនសូមគោរពជូនពរលោកឪពុកឲ្យមានសុខភាពល្អ បរិបូរណ៍ និងពោរពេញដោយក្តីសុខក្នុងក្រុមគ្រួសារ។\n\nកូនស្រឡាញ់លោកឪពុក។",
    signature: "ដោយក្តីគោរពស្រឡាញ់ពីកូន,",
    visual: "kbach-pattern",
    colorPalette: 'khmer',
    fontFamily: 'khmer_display',
  },
  storyteller: {
    id: 'storyteller',
    name: "The Storyteller",
    category: 'Heartfelt',
    description: "For the dad who painted worlds with his words.",
    title: "To the Author of My Best Memories",
    subtitle: "Happy Father's Day",
    message: "Your stories were my first and greatest adventures.",
    insideMessage: "Dear Dad,\n\nYou didn't just read stories, you built worlds. Thank you for teaching me that magic is real, heroes can be ordinary, and the best tales are the ones we live together.\n\nI carry your wisdom in every chapter of my life.",
    signature: "Your biggest fan,",
    visual: "paper-texture",
    colorPalette: 'storyteller',
    fontFamily: 'vintage',
  },
  handyman: {
    id: 'handyman',
    name: "Mr. Fix-It",
    category: 'Humorous',
    description: "For the dad who can repair anything, from a leaky faucet to a broken heart.",
    title: "To My Personal Handyman",
    subtitle: "Happy Father's Day",
    message: "Thanks for fixing everything... especially my mistakes.",
    insideMessage: "Dad,\n\nYou've always had the right tool for the job. You taught me that most things can be fixed with patience, duct tape, and a little bit of ingenuity.\n\nThanks for always being the one I can call when things fall apart. You're the glue that holds our family together.",
    signature: "Your #1 apprentice,",
    visual: "tool-grid",
    colorPalette: 'handyman',
    fontFamily: 'playful',
  },
  techie: {
    id: 'techie',
    name: "Tech Wizard",
    category: 'Modern',
    description: "For the dad who is fluent in both dad jokes and JavaScript.",
    title: "To My Original Tech Support",
    subtitle: "Happy Father's Day",
    message: "404: Words Not Found (To describe how great you are)",
    insideMessage: "Dad,\n\n// You debugged my childhood problems.\n// You compiled my confidence.\n// You upgraded my life daily.\n\nThanks for always being my go-to admin. No system update could ever improve on a dad like you.",
    signature: "Your grateful user,",
    visual: "circuit-board",
    colorPalette: 'techie',
    fontFamily: 'tech',
  },
  gamer: {
    id: 'gamer',
    name: "Player 1",
    category: 'Fun',
    description: "For the dad who taught you how to handle a controller.",
    title: "To My Favorite Co-op Partner",
    subtitle: "Happy Father's Day",
    message: "Thanks for always letting me be Player 1.",
    insideMessage: "Dad,\n\nYou taught me how to find the secret levels, beat the final boss, and that it's always better to play together.\n\nLife's biggest quests have been easier with you by my side. Thanks for being the best teammate a kid could ask for. GG.",
    signature: "Your Player 2,",
    visual: "gamer",
    colorPalette: 'gamer',
    fontFamily: 'tech',
  },
  gardener: {
    id: 'gardener',
    name: "The Green Thumb",
    category: 'Heartfelt',
    description: "For the dad who finds his peace in the garden.",
    title: "To the Best Dad in the Whole Patch",
    subtitle: "Happy Father's Day",
    message: "Thanks for helping me grow.",
    insideMessage: "Dad,\n\nJust like your garden, you've nurtured me with patience, wisdom, and care. You taught me that good things take time to grow and that a little bit of dirt never hurt anyone.\n\nThank you for giving me strong roots and teaching me to reach for the sun.",
    signature: "With so much love,",
    visual: "gardener",
    colorPalette: 'gardener',
    fontFamily: 'playful',
  },
   elegant: {
    id: 'elegant',
    name: "The Gentleman",
    category: 'Classic',
    description: "For sophisticated dads with timeless style.",
    title: "To My Father, My Mentor",
    subtitle: "With Deepest Gratitude",
    message: "A legacy of grace and wisdom.",
    insideMessage: "Dearest Father,\n\nYour quiet strength has been the foundation upon which I've built my life. You've taught me that true character is shown through integrity, compassion, and unwavering support.\n\nThank you for the priceless inheritance of your values and for the dignified example you set each day.",
    signature: "With profound respect,",
    visual: "gold-border",
    colorPalette: 'elegant',
    fontFamily: 'elegant',
  },
};

const CardContext = createContext();

// Add backgroundImage to the default state
const defaultState = {
  ...TEMPLATES.storyteller,
  backgroundImage: null, // This property will hold the custom background
  lastUpdated: new Date().toISOString()
};

export const CardProvider = ({ children }) => {
  const [cardData, setCardData] = useState(() => {
    try {
      const savedData = localStorage.getItem('fathersDayCardDraft');
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Ensure new properties exist
        return { ...defaultState, ...parsed };
      }
      return defaultState;
    } catch (error) {
      console.error("Failed to load saved draft:", error);
      return defaultState;
    }
  });

  const updateCardData = (newData) => {
    setCardData(prev => ({ 
      ...prev, 
      ...newData, 
      lastUpdated: new Date().toISOString() 
    }));
  };

  const resetCard = () => {
    setCardData(defaultState);
  };

  const applyTemplate = (templateId) => {
    const template = TEMPLATES[templateId] || TEMPLATES.storyteller;
    setCardData(prev => ({ 
      // Reset to default state, then apply template, keeping existing images
      ...defaultState,
      ...template, 
      image: prev.image,
      backgroundImage: prev.backgroundImage,
      lastUpdated: new Date().toISOString() 
    }));
  };

  useEffect(() => {
    try {
      localStorage.setItem('fathersDayCardDraft', JSON.stringify(cardData));
    } catch (error) {
      console.error("Could not save card data to local storage", error);
    }
  }, [cardData]);

  const value = { 
    cardData, 
    updateCardData, 
    resetCard,
    applyTemplate,
    templates: TEMPLATES,
    palettes: COLOR_PALETTES,
    fonts: FONT_STYLES
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};
