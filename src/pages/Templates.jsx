import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCardContext } from '../context/useCardContext';
import CardPreview from '../components/card/CardPreview';
import TemplateCard from '../components/ui/TemplateCard';
import { FaTimes, FaArrowRight, FaSearch, FaFilter, FaRandom } from 'react-icons/fa';

// Main Templates Gallery Page Component
const Templates = () => {
  const navigate = useNavigate();
  const { templates, palettes, fonts, applyTemplate } = useCardContext();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Memoized filtering and sorting logic for performance
  const filteredAndSortedTemplates = useMemo(() => {
    let items = Object.entries(templates);

    // Filter by search query (checks name, category, title)
    if (searchQuery) {
      items = items.filter(([id, data]) => 
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        data.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by active category
    if (activeCategory !== 'All') {
      items = items.filter(([id, data]) => data.category === activeCategory);
    }

    // Sort items based on selected order
    if (sortOrder === 'name-asc') {
      items.sort(([, a], [, b]) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'name-desc') {
      items.sort(([, a], [, b]) => b.name.localeCompare(a.name));
    } else if (sortOrder === 'popular') {
      // Sort by most popular (for future implementation)
      items.sort(([, a], [, b]) => (b.views || 0) - (a.views || 0));
    } else if (sortOrder === 'newest') {
      items.sort(([, a], [, b]) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return items;
  }, [templates, activeCategory, sortOrder, searchQuery]);
  
  // Create a list of unique categories from the templates data
  const categories = useMemo(() => 
    ['All', ...new Set(Object.values(templates).map(t => t.category))]
  , [templates]);

  const handleUseTemplate = () => {
    if (selectedTemplateId) {
      applyTemplate(selectedTemplateId);
      navigate('/editor');
    }
  };

  const handleRandomTemplate = () => {
    const templateIds = Object.keys(templates);
    const randomId = templateIds[Math.floor(Math.random() * templateIds.length)];
    setSelectedTemplateId(randomId);
  };

  // Track template views
  useEffect(() => {
    if (selectedTemplateId) {
      // In a real app, you would track views in a database
      console.log(`Viewing template: ${selectedTemplateId}`);
    }
  }, [selectedTemplateId]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-warm-light to-warm-medium py-16 px-4">
        <div className="container mx-auto">
          {/* === HERO SECTION === */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-playfair font-bold text-primary mb-4"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover Your Perfect Card
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Handcrafted templates to express your love and appreciation
            </motion.p>
            
            <motion.div 
              className="mt-8 flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button 
                onClick={handleRandomTemplate}
                className="flex items-center gap-2 bg-primary text-white py-3 px-6 rounded-full font-medium hover:bg-primary-dark transition-colors"
              >
                <FaRandom /> Surprise Me
              </button>
              <button 
                onClick={() => navigate('/editor')}
                className="flex items-center gap-2 bg-white border border-primary text-primary py-3 px-6 rounded-full font-medium hover:bg-primary/10 transition-colors"
              >
                Start from Scratch
              </button>
            </motion.div>
          </motion.div>

          {/* === FILTERS & SEARCH CONTROLS === */}
          <motion.div 
            className="mb-12 sticky top-16 z-30 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="relative w-full md:w-auto">
                <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search templates by name, style, or description..."
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-white border border-gray-300 py-3 px-4 rounded-lg font-medium hover:border-secondary"
                >
                  <FaFilter /> Filters
                </button>
                
                <div className="relative">
                  <select 
                    className="w-full py-3 pl-4 pr-10 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary appearance-none"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="default">Sort: Featured</option>
                    <option value="name-asc">Sort: A to Z</option>
                    <option value="name-desc">Sort: Z to A</option>
                    <option value="popular">Sort: Most Popular</option>
                    <option value="newest">Sort: Newest First</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  className="mt-4 pt-4 border-t border-gray-200"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-gray-700 mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                          activeCategory === category 
                            ? 'bg-secondary text-white shadow-md' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Template Counter */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{filteredAndSortedTemplates.length}</span> of {Object.keys(templates).length} templates
            </p>
            <button 
              onClick={() => setIsExpandedView(!isExpandedView)}
              className="text-sm text-secondary hover:text-secondary-dark font-medium"
            >
              {isExpandedView ? 'Compact View' : 'Expanded View'}
            </button>
          </div>
          
          {/* === TEMPLATE GALLERY GRID === */}
          {filteredAndSortedTemplates.length > 0 ? (
            <motion.div 
              layout 
              className={`grid gap-8 ${isExpandedView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {filteredAndSortedTemplates.map(([id, data]) => (
                <TemplateCard
                  key={id}
                  templateId={id}
                  template={data}
                  palette={palettes[data.colorPalette]}
                  font={fonts[data.fontFamily]}
                  onClick={setSelectedTemplateId}
                  isExpanded={isExpandedView}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="max-w-md mx-auto">
                <div className="text-5xl mb-4">🖌️</div>
                <h3 className="text-2xl font-bold text-primary mb-2">No Templates Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setSortOrder('default');
                  }}
                  className="bg-secondary text-white py-2 px-6 rounded-lg font-medium hover:bg-secondary-dark"
                >
                  Reset Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* === "QUICK LOOK" MODAL === */}
      <AnimatePresence>
        {selectedTemplateId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedTemplateId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-6xl h-[90vh] flex flex-col md:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Section */}
              <div className="w-full md:w-1/2 lg:w-3/5 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8 relative">
                <button 
                  onClick={() => setSelectedTemplateId(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-100"
                >
                  <FaTimes className="text-gray-600" />
                </button>
                
                <div className="w-full max-w-md">
                  <CardPreview previewData={templates[selectedTemplateId]} />
                </div>
              </div>
              
              {/* Details Section */}
              <div className="w-full md:w-1/2 lg:w-2/5 p-6 md:p-8 flex flex-col overflow-hidden">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-1">
                    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {templates[selectedTemplateId].category}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {templates[selectedTemplateId].name}
                    </h2>
                    <p className="text-gray-600">
                      {templates[selectedTemplateId].description}
                    </p>
                  </div>
                </div>
                
                <div className="flex-grow overflow-y-auto pr-2 mb-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Front Message</h3>
                      <div className="bg-gray-50 rounded-lg p-4 italic">
                        "{templates[selectedTemplateId].message}"
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Inside Message</h3>
                      <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap font-serif">
                        {templates[selectedTemplateId].insideMessage}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Signature</h3>
                        <div className="bg-gray-50 rounded-lg p-4 font-bold">
                          {templates[selectedTemplateId].signature}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Design Style</h3>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full border border-gray-200" 
                            style={{ backgroundColor: palettes[templates[selectedTemplateId].colorPalette]?.bg }}
                          ></div>
                          <span>
                            {palettes[templates[selectedTemplateId].colorPalette]?.name} Theme
                          </span>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm text-gray-600">
                            {fonts[templates[selectedTemplateId].fontFamily]?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleUseTemplate}
                    className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-lg font-bold text-lg hover:from-primary-dark hover:to-secondary-dark transition-all duration-300"
                  >
                    Use This Template <FaArrowRight/>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Templates;