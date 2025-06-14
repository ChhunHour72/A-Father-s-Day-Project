import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMagic, FaPalette, FaRocket, FaPaintBrush, FaChevronRight } from 'react-icons/fa';
import { useCardContext } from '../context/useCardContext.js';

const Create = () => {
  const navigate = useNavigate();
  const { resetCard, applyTemplate } = useCardContext();
  const [activeTemplate, setActiveTemplate] = useState(null);
  
  const templates = [
    {
      id: 'modern',
      name: "Modern & Minimal",
      description: "Clean design with elegant typography",
      image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <FaRocket className="text-2xl" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 'playful',
      name: "Fun & Playful",
      description: "Colorful designs with illustrations",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <FaPalette className="text-2xl" />,
      color: "from-orange-500 to-yellow-500"
    },
    {
      id: 'vintage',
      name: "Vintage Charm",
      description: "Classic designs with retro elements",
      image: "https://images.unsplash.com/photo-1599745780087-8a3c873f6396?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: <FaPaintBrush className="text-2xl" />,
      color: "from-amber-700 to-yellow-800"
    }
  ];
  
  const handleTemplateSelect = (template) => {
    setActiveTemplate(template.id);
    setTimeout(() => {
      resetCard();
      applyTemplate(template.id);
      navigate(`/editor?template=${template.id}`);
    }, 500);
  };
  
  const handleStartFromScratch = () => {
    resetCard();
    navigate('/editor');
  };

  return (
    <div className="min-h-screen py-16 bg-gradient-to-b from-warm-light to-warm-medium relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-orange-100 opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-secondary opacity-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-accent opacity-10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-6">
            Create Your Perfect Father's Day Card
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose how you'd like to begin designing your personalized card for dad
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-orange-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Start from Scratch Card */}
          <div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl cursor-pointer group"
            onClick={handleStartFromScratch}
          >
            <div className="p-8 flex flex-col h-full">
              <div className="bg-gradient-to-r from-secondary to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FaMagic className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Start from Scratch</h2>
              <p className="text-gray-600 mb-6 flex-grow">
                Unleash your creativity with our intuitive editor. Design a completely unique card from the ground up with complete creative freedom.
              </p>
              
              <div className="mt-auto">
                <div className="flex items-center text-secondary font-semibold group-hover:translate-x-2 transition-transform">
                  <span>Begin Creating</span>
                  <FaChevronRight className="ml-2 transition-all duration-300 group-hover:ml-4" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-8 border-t border-orange-100">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-white rounded-lg p-4 shadow-sm border border-orange-100 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-orange-100 mb-3"></div>
                    <div className="w-full h-2 bg-orange-100 rounded mb-1"></div>
                    <div className="w-3/4 h-2 bg-orange-100 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Template Selection */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="bg-gradient-to-r from-primary to-dark w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <FaPalette className="text-2xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-primary mb-4">Use a Template</h2>
              <p className="text-gray-600 mb-6">
                Choose from our professionally designed templates. Each template is fully customizable to create the perfect card.
              </p>
              
              <div className="space-y-6 mt-8">
                {templates.map((template) => (
                  <div 
                    key={template.id}
                    className={`flex items-center p-5 rounded-xl border transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      activeTemplate === template.id 
                        ? 'border-secondary bg-orange-50 scale-[1.02]' 
                        : 'border-gray-200 hover:border-secondary'
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className={`w-16 h-16 rounded-lg overflow-hidden shadow-md mr-5 ${activeTemplate === template.id ? 'ring-2 ring-secondary' : ''}`}>
                      <img 
                        src={template.image} 
                        alt={template.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-bold text-lg text-primary flex items-center">
                        {template.name}
                        {activeTemplate === template.id && (
                          <span className="ml-2 bg-secondary text-white text-xs px-2 py-1 rounded-full">
                            Selected
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm">{template.description}</p>
                    </div>
                    
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${template.color.replace('from', 'bg-gradient-to-r from')} text-white`}>
                      {template.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-4">Not sure which template to choose?</p>
              <button 
                className="w-full bg-white border border-secondary text-secondary py-3 rounded-xl font-semibold hover:bg-secondary hover:text-white transition-colors duration-300"
                onClick={() => handleTemplateSelect(templates[0])}
              >
                Select Recommended Template
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-dark rounded-3xl p-10 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-playfair font-bold mb-4">Need inspiration?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Browse our gallery of completed cards to see what others have created for their dads
              </p>
              <Link 
                to="/templates" 
                className="inline-block bg-white text-primary py-3 px-8 rounded-full font-semibold shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
              >
                View Inspiration Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;