import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Templates = () => {
  const [inView, setInView] = useState(false);
  const templates = [
    {
      image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: "Modern & Minimal",
      description: "Clean design with elegant typography for the stylish dad"
    },
    {
      image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: "Fun & Playful",
      description: "Colorful designs with illustrations for the fun-loving dad"
    },
    {
      image: 'https://images.unsplash.com/photo-1599745780087-8a3c873f6396?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: "Vintage Charm",
      description: "Classic designs with retro elements for the nostalgic dad"
    }
  ];

  // Animation for template cards
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const section = document.querySelector('.templates');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 14
      }
    }
  };

  const hoverEffect = {
    scale: 1.03,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  };

  return (
    <section className="templates py-24 bg-gradient-to-b from-warm-light/30 to-warm-medium/30">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-16">
          <motion.h2 
            className="text-4xl font-playfair font-bold text-primary relative inline-block mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Beautiful Card Templates
            <span className="absolute bottom-2 left-1/4 w-1/2 h-3 bg-orange-200 bg-opacity-50 z-[-1]"></span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Choose from our professionally designed templates for every style
          </motion.p>
        </div>
        
        <motion.div 
          className="templates-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {templates.map((template, index) => (
            <motion.div 
              key={index}
              className="template-card rounded-2xl overflow-hidden shadow-lg"
              variants={item}
              whileHover={hoverEffect}
            >
              <div 
                className="template-img h-72 bg-cover bg-center relative overflow-hidden"
                style={{ backgroundImage: `url(${template.image})` }}
              >
                {/* Parallax effect container */}
                <div className="absolute inset-0 bg-cover bg-center transform hover:scale-110 transition-transform duration-700 ease-out"
                     style={{ backgroundImage: `url(${template.image})` }}></div>
                
                {/* Overlay with slide-up animation */}
                <motion.div 
                  className="template-overlay absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    <Link 
                      to="/editor" 
                      className="bg-white text-secondary py-3 px-8 rounded-full font-semibold shadow-md hover:bg-secondary hover:text-white transition-all duration-400"
                    >
                      Try Now
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
              
              <div className="template-content bg-white p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-2">{template.title}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    to="/editor" 
                    className="bg-secondary text-white py-2 px-6 rounded-full font-semibold inline-block hover:bg-orange-700 transition-colors duration-400"
                  >
                    Create Now
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Templates;