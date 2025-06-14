import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState('All Templates');
  
  const categories = [
    { name: "All Templates", count: 24 },
    { name: "Modern", count: 8 },
    { name: "Playful", count: 6 },
    { name: "Vintage", count: 5 },
    { name: "Formal", count: 5 }
  ];

  const templates = [
    {
      id: 1,
      name: "Modern Elegance",
      category: "Modern",
      description: "Clean design with minimalist aesthetics",
      image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Playful Colors",
      category: "Playful",
      description: "Bright and cheerful design for fun dads",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Vintage Charm",
      category: "Vintage",
      description: "Classic design with nostalgic elements",
      image: "https://images.unsplash.com/photo-1599745780087-8a3c873f6396?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Formal Tribute",
      category: "Formal",
      description: "Elegant design for sophisticated dads",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      name: "Minimalist Design",
      category: "Modern",
      description: "Simple yet impactful design",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      name: "Fun Illustration",
      category: "Playful",
      description: "Cartoon-style design with humor",
      image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Filter templates based on active category
  const filteredTemplates = activeCategory === 'All Templates' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-warm-light to-warm-medium">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4">
            Beautiful Card Templates
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our professionally designed templates for every style and personality
          </p>
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-secondary to-orange-600 text-white shadow-lg'
                  : 'bg-white text-primary border border-gray-200 hover:border-secondary hover:text-secondary'
              }`}
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name} 
              <span className={`ml-2 rounded-full px-2.5 py-1 text-xs ${
                activeCategory === category.name 
                  ? 'bg-white text-secondary' 
                  : 'bg-orange-100 text-secondary'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
        
        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map(template => (
            <div 
              key={template.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <Link 
                    to="/editor" 
                    className="w-full bg-white text-secondary py-3 rounded-lg font-semibold text-center hover:bg-secondary hover:text-white transition-colors duration-300"
                  >
                    Use This Template
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-primary">{template.name}</h3>
                  <span className="px-3 py-1 bg-orange-100 text-secondary text-xs font-semibold rounded-full">
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Link 
                  to="/editor" 
                  className="inline-flex items-center text-secondary font-semibold group"
                >
                  Start Creating
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No templates found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any templates in this category</p>
            <button 
              className="px-5 py-2.5 bg-gray-100 rounded-lg font-medium text-primary hover:bg-gray-200 transition-colors"
              onClick={() => setActiveCategory('All Templates')}
            >
              View All Templates
            </button>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-primary to-dark rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-secondary/10"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
                Can't find the perfect template?
              </h2>
              <p className="text-lg opacity-90 mb-8">
                Create your own custom design from scratch with our easy-to-use editor
              </p>
              <Link 
                to="/create" 
                className="inline-block bg-white text-secondary py-4 px-10 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
              >
                Start from Scratch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;