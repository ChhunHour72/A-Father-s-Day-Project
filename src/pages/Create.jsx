import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPencilRuler, FaLayerGroup, FaRobot, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useCardContext } from '../context/useCardContext.js';
import TemplateVisual from '../context/TemplateVisual'; 

// A simple spinner component for loading states
const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const Create = () => {
  const navigate = useNavigate();
  const { resetCard, applyTemplate, updateCardData, templates, palettes } = useCardContext();
  const [isAiLoading, setIsAiLoading] = useState(false);

  const featuredTemplates = Object.entries(templates).slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStartFromScratch = () => {
    resetCard();
    navigate('/editor');
  };

  const handleTemplateSelect = (templateId) => {
    applyTemplate(templateId);
    navigate(`/editor?template=${templateId}`);
  };
  
  // --- AI Quick Start Implementation ---
  const handleAiQuickStart = async (e) => {
    e.preventDefault();
    const prompt = e.target.elements.prompt.value;
    if (!prompt) return;

    setIsAiLoading(true);

    // 1. Define the expected JSON structure from the AI
    const cardSchema = {
        type: "OBJECT",
        properties: {
            "templateSuggestion": { 
                "type": "STRING",
                "enum": Object.keys(templates) // Suggest one of the existing templates
            },
            "title": { "type": "STRING" },
            "subtitle": { "type": "STRING" },
            "message": { "type": "STRING" },
            "insideMessage": { "type": "STRING" },
            "signature": { "type": "STRING" }
        },
    };
    
    // 2. Create the payload for the Gemini API
    const fullPrompt = `Based on the following idea for a Father's Day card, generate content for it. Suggest a suitable template from the list of enums. The tone should be appropriate for the prompt. Prompt: "${prompt}"`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      generationConfig: {
          responseMimeType: "application/json",
          responseSchema: cardSchema,
      }
    };

    try {
        // 3. Call the Gemini API
        const apiKey = ""; // API key is handled by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0) {
            const aiResponse = JSON.parse(result.candidates[0].content.parts[0].text);
            
            // 4. Apply the suggested template and update content
            const suggestedTemplateId = aiResponse.templateSuggestion || 'storyteller';
            applyTemplate(suggestedTemplateId);
            
            // Wait for state to update then set AI content
            setTimeout(() => {
                updateCardData({
                    title: aiResponse.title,
                    subtitle: aiResponse.subtitle,
                    message: aiResponse.message,
                    insideMessage: aiResponse.insideMessage,
                    signature: aiResponse.signature,
                });
                navigate(`/editor?prompt=${encodeURIComponent(prompt)}`);
            }, 100);

        } else {
            throw new Error("No content generated from AI.");
        }

    } catch (error) {
        console.error("AI Quick Start failed:", error);
        // Fallback to a random template on error
        const randomTemplateId = Object.keys(templates)[Math.floor(Math.random() * Object.keys(templates).length)];
        applyTemplate(randomTemplateId);
        navigate(`/editor?prompt=${encodeURIComponent(prompt)}&error=true`);
    } finally {
        setIsAiLoading(false);
    }
  };

  const nextTemplate = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredTemplates.length);
  };
  
  const prevTemplate = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredTemplates.length) % featuredTemplates.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextTemplate, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  const [templateId, templateData] = featuredTemplates[currentIndex];
  const currentPalette = palettes[templateData.colorPalette];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-light to-warm-medium py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-4">
            How will you create?
          </h1>
          <p className="text-xl text-gray-600">
            Every great card starts with a choice. Select your path below.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-1 bg-white rounded-2xl shadow-lg flex flex-col group overflow-hidden"
          >
            <div className="relative h-96">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 w-full h-full"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <TemplateVisual visualType={templateData.visual} palette={currentPalette} />
                    </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent p-6 flex flex-col justify-end">
                   <motion.h3 
                        key={currentIndex + 'h3'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl font-bold text-white font-playfair"
                    >
                       {templateData.name}
                    </motion.h3>
                    <motion.p
                        key={currentIndex + 'p'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-white/80"
                    >
                       {templateData.description}
                    </motion.p>
                </div>
                <button onClick={prevTemplate} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 text-white rounded-full p-2 backdrop-blur-sm hover:bg-white/40 transition-all"><FaChevronLeft/></button>
                <button onClick={nextTemplate} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 text-white rounded-full p-2 backdrop-blur-sm hover:bg-white/40 transition-all"><FaChevronRight/></button>
            </div>
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-secondary to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                    <FaLayerGroup size={24}/>
                </div>
                <h2 className="text-2xl font-bold text-primary">Use a Template</h2>
              </div>
              <p className="text-gray-600 mb-6 flex-grow">
                Get a head start with a professionally designed layout. Every template is fully customizable in the editor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button
                  onClick={() => handleTemplateSelect(templateId)}
                  className="flex-1 bg-secondary text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors"
                >
                  Use This Template <FaArrowRight/>
                </button>
                <button 
                  onClick={() => navigate('/templates')}
                  className="flex-1 border-2 border-gray-300 text-primary py-3 px-6 rounded-lg font-semibold hover:border-secondary hover:text-secondary transition-colors"
                >
                  See All
                </button>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'}}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer flex-1 flex flex-col"
              onClick={handleStartFromScratch}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-primary to-dark w-12 h-12 rounded-lg flex items-center justify-center text-white">
                    <FaPencilRuler size={24}/>
                </div>
                <h2 className="text-2xl font-bold text-primary">Start from Scratch</h2>
              </div>
              <p className="text-gray-600 flex-grow">
                For the true artist. Begin with a blank canvas and bring your unique vision to life.
              </p>
              <div className="mt-6 font-semibold text-secondary flex items-center gap-2">
                Open Blank Editor <FaArrowRight/>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 flex-1 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center text-white">
                    <FaRobot size={24}/>
                </div>
                <h2 className="text-2xl font-bold text-primary">AI Quick Start</h2>
              </div>
              <p className="text-gray-600 mb-4">
                Need inspiration? Describe the card you want, and let our AI create a starting point for you.
              </p>
              <form className="mt-auto flex gap-2" onSubmit={handleAiQuickStart}>
                <input
                  type="text"
                  name="prompt"
                  placeholder="e.g., a funny card for a fishing dad"
                  className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100"
                  disabled={isAiLoading}
                />
                <button
                  type="submit"
                  className="bg-indigo-500 text-white p-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center w-24 disabled:bg-indigo-400"
                  disabled={isAiLoading}
                >
                  {isAiLoading ? <Spinner/> : 'Go'}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
