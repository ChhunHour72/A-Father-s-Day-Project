import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMagic, FaPalette, FaChevronRight } from 'react-icons/fa';
import { useCardContext } from '../context/useCardContext.js';
import TemplatePreview from '../components/ui/TemplatePreview.jsx';

const Create = () => {
  const navigate = useNavigate();
  const { resetCard, applyTemplate, templates, palettes, fonts } = useCardContext();
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  const handleStartFromScratch = () => {
    resetCard();
    navigate('/editor');
  };

  const handleTemplateSelect = (templateId) => {
    applyTemplate(templateId);
    navigate(`/editor?template=${templateId}`);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemFadeInUp = {
    hidden: { y: 40, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-warm-light to-warm-medium py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-6">
            Start Your Creation
          </h1>
          <p className="text-xl text-gray-600">
            Choose to start with a blank canvas or select one of our beautiful templates.
          </p>
          <div className="w-24 h-1.5 bg-gradient-to-r from-secondary to-orange-600 mx-auto mt-6 rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {/* === Start from Scratch Card === */}
          <motion.div
            variants={itemFadeInUp}
            whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group flex flex-col h-full"
            onClick={handleStartFromScratch}
          >
            <div className="p-8 flex-grow flex flex-col">
              <div className="bg-gradient-to-br from-primary to-dark w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-md">
                <FaMagic className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Start from Scratch</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Unleash your creativity. You'll have complete control over every element in our powerful editor.
              </p>
              <div className="mt-auto flex items-center text-secondary font-semibold text-lg group-hover:text-orange-600 transition-colors">
                <span>Begin with a Blank Card</span>
                <FaChevronRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
            <div className="bg-gray-50 p-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">Perfect for when you have a specific vision in mind.</p>
            </div>
          </motion.div>
          
          {/* === Use a Template Card === */}
          <motion.div 
            variants={itemFadeInUp}
            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
          >
             <div className="p-8 flex-grow flex flex-col">
                <div className="bg-gradient-to-br from-secondary to-orange-500 w-20 h-20 rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <FaPalette className="text-4xl text-white" />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">Use a Template</h2>
                <p className="text-gray-600 mb-6 flex-grow">
                    Choose a professionally designed starting point. Each template is fully customizable.
                </p>
                
                {/* Live Template Previews */}
                <div className="grid grid-cols-3 gap-4 mt-auto">
                    {Object.entries(templates).map(([id, data]) => (
                        <motion.div
                            key={id}
                            onHoverStart={() => setHoveredTemplate(id)}
                            onHoverEnd={() => setHoveredTemplate(null)}
                            onClick={() => handleTemplateSelect(id)}
                            className="relative cursor-pointer"
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <TemplatePreview 
                                template={data}
                                palette={palettes[data.colorPalette]}
                                font={fonts[data.fontFamily]}
                                isSelected={false}
                            />
                            <motion.div 
                                className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center text-white font-bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hoveredTemplate === id ? 1 : 0 }}
                            >
                                Select
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="bg-gray-50 p-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">A great way to get inspired and save time.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
