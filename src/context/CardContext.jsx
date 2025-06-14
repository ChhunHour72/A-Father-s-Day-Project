import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced color palettes with richer themes
const COLOR_PALETTES = {
  storyteller: {
    name: 'Storyteller',
    bg: '#f7f3e9',
    primaryText: '#4a2c2a',
    secondaryText: '#8c5d58',
    accent: '#c69f89',
    border: '#d9c8b4'
  },
  handyman: {
    name: 'Workshop',
    bg: '#f5f2ed',
    primaryText: '#3e3a36',
    secondaryText: '#7d6e63',
    accent: '#c56e33',
    border: '#c9b8a8'
  },
  grillmaster: {
    name: 'Grill Master',
    bg: '#fef7e5',
    primaryText: '#5c3a21',
    secondaryText: '#b85c38',
    accent: '#e27d60',
    border: '#e8b796'
  },
  adventurer: {
    name: 'Adventurer',
    bg: '#f0f7f4',
    primaryText: '#2c4a3e',
    secondaryText: '#5b8c7d',
    accent: '#8fb9a9',
    border: '#a7d1c4'
  },
  techie: {
    name: 'Tech Guru',
    bg: '#0d1117',
    primaryText: '#c9d1d9',
    secondaryText: '#8b949e',
    accent: '#58a6ff',
    border: '#30363d'
  },
  elegant: {
    name: 'Gentleman',
    bg: '#1a202c',
    primaryText: '#e2e8f0',
    secondaryText: '#a0aec0',
    accent: '#d69e2e',
    border: '#2d3748'
  },
  coach: {
    name: 'Coach',
    bg: '#f0f9ff',
    primaryText: '#1e40af',
    secondaryText: '#3b82f6',
    accent: '#ef4444',
    border: '#93c5fd'
  },
  musician: {
    name: 'Musician',
    bg: '#f9f5ff',
    primaryText: '#4c1d95',
    secondaryText: '#7e22ce',
    accent: '#d946ef',
    border: '#d8b4fe'
  }
};

// Enhanced font pairings with better theme matching
const FONT_STYLES = {
  vintage: { 
    name: 'Playfair + Merriweather', 
    family: "'Playfair Display', serif, 'Merriweather', serif" 
  },
  playful: { 
    name: 'Poppins + Comic Neue', 
    family: "'Poppins', sans-serif, 'Comic Neue', cursive" 
  },
  modern: { 
    name: 'Montserrat + Raleway', 
    family: "'Montserrat', sans-serif, 'Raleway', sans-serif" 
  },
  tech: { 
    name: 'Source Code Pro + Rajdhani', 
    family: "'Source Code Pro', monospace, 'Rajdhani', sans-serif" 
  },
  elegant: { 
    name: 'Cormorant Garamond', 
    family: "'Cormorant Garamond', serif" 
  },
  adventurous: { 
    name: 'Bebas Neue + Lato', 
    family: "'Bebas Neue', sans-serif, 'Lato', sans-serif" 
  }
};

// Enhanced templates with more personality and thematic elements
const TEMPLATES = {
  storyteller: {
    id: 'storyteller',
    name: "The Storyteller",
    description: "For dads who filled your childhood with magical tales",
    title: "To the Author of My Childhood",
    subtitle: "Happy Father's Day",
    message: "Your stories were my first adventures",
    insideMessage: "Dear Dad,\n\nYour bedtime stories weren't just tales - they were the foundation of my imagination. You taught me dragons could be defeated, heroes could be ordinary people, and every problem had a solution if you approached it with courage and kindness.\n\nThank you for giving me the greatest gift: the ability to dream. I carry your wisdom in every chapter of my life.",
    signature: "Your forever listener,",
    visual: "paper-texture",
    colorPalette: 'storyteller',
    fontFamily: 'vintage',
    decorations: ['📚', '🕯️', '✒️']
  },
  handyman: {
    id: 'handyman',
    name: "Mr. Fix-It",
    description: "For dads who could build or repair anything",
    title: "To My Personal Handyman",
    subtitle: "Happy Father's Day",
    message: "Thanks for fixing more than just broken toys",
    insideMessage: "Dad,\n\nFrom leaky faucets to broken hearts, you've always had the right tool for the job. I'll never forget the Saturday mornings in the garage, where you taught me that most problems can be solved with patience, the right approach, and occasionally some duct tape.\n\nYou showed me that true strength isn't about muscles - it's about showing up and doing what needs to be done. Thanks for always being my anchor.",
    signature: "Your apprentice,",
    visual: "tool-grid",
    colorPalette: 'handyman',
    fontFamily: 'playful',
    decorations: ['🔧', '⚙️', '📐']
  },
  grillmaster: {
    id: 'grillmaster',
    name: "The Grill Master",
    description: "For dads who reign over the backyard barbecue",
    title: "To the Sultan of Smoke",
    subtitle: "Happy Father's Day",
    message: "Thanks for teaching me life's important skills",
    insideMessage: "Dad,\n\nYou taught me that grilling isn't just cooking - it's an art form. The way you command the flames, time the perfect sear, and create magic with simple ingredients has always amazed me.\n\nBut more than that, you showed me that the best moments happen when we slow down, gather around the fire, and savor time together. Thanks for all the flavorsome memories.",
    signature: "Your sous-chef,",
    visual: "flame-effect",
    colorPalette: 'grillmaster',
    fontFamily: 'modern',
    decorations: ['🔥', '🍖', '🍔']
  },
  adventurer: {
    id: 'adventurer',
    name: "The Explorer",
    description: "For dads who taught you to embrace adventure",
    title: "To My Greatest Adventure Guide",
    subtitle: "Happy Father's Day",
    message: "Life's an adventure with you as my compass",
    insideMessage: "Dad,\n\nFrom hiking trails to road trips, you've always shown me that the journey matters more than the destination. Thank you for teaching me to read maps, pitch tents, and most importantly - to find wonder in the world around me.\n\nYou gave me the courage to explore, the wisdom to navigate challenges, and the curiosity to always seek new horizons. The world feels bigger and more beautiful because I saw it through your eyes.",
    signature: "Your fellow explorer,",
    visual: "mountain-silhouette",
    colorPalette: 'adventurer',
    fontFamily: 'adventurous',
    decorations: ['🗺️', '🏔️', '🧭']
  },
  techie: {
    id: 'techie',
    name: "Tech Wizard",
    description: "For dads who speak fluent tech",
    title: "To My Original Tech Support",
    subtitle: "Happy Father's Day",
    message: "404: Dad Jokes Not Found (Just Great Memories)",
    insideMessage: "Dad,\n\n// You debugged my childhood\n// Compiled my confidence\n// And upgraded my life daily\n\nif (dadsCouldCode) {\n  you.wouldBuild('perfect.child');\n} else {\n  you.stillMade(me); // And I turned out okay!\n}\n\nThanks for being my constant in a changing digital world. No system update could ever improve you.",
    signature: "Your grateful user,",
    visual: "circuit-board",
    colorPalette: 'techie',
    fontFamily: 'tech',
    decorations: ['💻', '🔌', '🧪']
  },
  elegant: {
    id: 'elegant',
    name: "The Gentleman",
    description: "For sophisticated dads with timeless style",
    title: "To My Father",
    subtitle: "With Deepest Gratitude",
    message: "A legacy of grace and wisdom",
    insideMessage: "Dearest Father,\n\nYour quiet strength has been the foundation upon which I've built my life. In a world of constant change, you've remained my north star - teaching me that true character is shown through consistency, integrity, and compassion.\n\nThank you for the priceless inheritance of your values, your unwavering support, and the dignified example you set each day. I strive to honor your legacy in all I do.",
    signature: "With profound respect,",
    visual: "gold-border",
    colorPalette: 'elegant',
    fontFamily: 'elegant',
    decorations: ['🎩', '📜', '✉️']
  },
  coach: {
    id: 'coach',
    name: "Team Captain",
    description: "For sports-loving dads who cheered you on",
    title: "To My First Coach",
    subtitle: "Happy Father's Day",
    message: "Thanks for teaching me to play through life",
    insideMessage: "Coach,\n\nFrom the sidelines to the dinner table, you've always been my biggest fan and wisest advisor. Thank you for teaching me that winning is great, but showing up matters more; that teamwork beats talent; and that how you play the game reveals your character.\n\nYou showed me that life's most important victories aren't on scoreboards, but in the relationships we build and the people we become. Thanks for helping me become MVP in the game of life.",
    signature: "Your star player,",
    visual: "sport-field",
    colorPalette: 'coach',
    fontFamily: 'modern',
    decorations: ['⚽', '🏆', '🥇']
  },
  musician: {
    id: 'musician',
    name: "Maestro",
    description: "For dads who filled your home with music",
    title: "To the Conductor of Our Family",
    subtitle: "Happy Father's Day",
    message: "Thanks for our family's soundtrack",
    insideMessage: "Dad,\n\nYou taught me that life needs rhythm - the upbeat moments that make us dance, the soulful ballads that touch our hearts, and the steady bassline that keeps us grounded. Whether you were strumming a guitar or humming in the kitchen, you filled our home with harmony.\n\nThank you for showing me how to listen for life's music, find my own rhythm, and appreciate the spaces between the notes. Our family symphony wouldn't be the same without you.",
    signature: "Your biggest fan,",
    visual: "music-notes",
    colorPalette: 'musician',
    fontFamily: 'playful',
    decorations: ['🎸', '🎶', '🎹']
  }
};

const CardContext = createContext();

// Enhanced default state
const defaultState = {
  ...TEMPLATES.storyteller,
  lastUpdated: new Date().toISOString()
};

export const CardProvider = ({ children }) => {
  const [cardData, setCardData] = useState(() => {
    try {
      const savedData = localStorage.getItem('fathersDayCardDraft');
      return savedData ? JSON.parse(savedData) : defaultState;
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
      ...prev, 
      ...template, 
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