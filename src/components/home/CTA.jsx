import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="cta py-32 bg-gradient-to-r from-primary to-dark text-white relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 rounded-full bg-white bg-opacity-5 animate-pulse"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-96 h-96 rounded-full bg-secondary bg-opacity-5 animate-pulse"></div>
      
      {/* Additional floating elements */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-white bg-opacity-5 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/3 w-32 h-32 rounded-full bg-secondary bg-opacity-5 animate-pulse"></div>
      
      {/* Animated stars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
      
      <div className="container mx-auto px-4">
        <div className="cta-content max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-playfair font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Create Your Perfect Father's Day Card
          </motion.h2>
          
          <motion.p 
            className="text-xl opacity-90 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 0.9 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Create unforgettable memories for your dad.<br></br>Start designing now! 
          </motion.p>
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              to="/create" 
              className="relative overflow-hidden group inline-block"
            >
              {/* Main button */}
              <motion.div
                className="btn bg-secondary text-white py-4 px-12 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-700 hover:shadow-xl transition-all duration-400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Now
              </motion.div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />
              </div>
              
              {/* Floating hearts */}
              <motion.div 
                className="absolute -top-3 -left-3 text-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ❤️
              </motion.div>
              <motion.div 
                className="absolute -bottom-3 -right-3 text-xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                ✨
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Floating cards */}
      <motion.div 
        className="absolute top-1/4 left-10 w-16 h-24 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20"
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/3 right-20 w-20 h-28 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/20"
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
      />
    </section>
  );
};

export default CTA;