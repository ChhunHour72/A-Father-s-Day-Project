import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaSyncAlt } from 'react-icons/fa';

const Hero = () => {
  const [flipped, setFlipped] = useState(false);
  
  const flipCard = () => {
    setFlipped(!flipped);
  };

  return (
    <section className="hero pt-40 pb-20 md:pt-40 md:pb-24 relative">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="hero-content w-full md:w-1/2 mb-16 md:mb-0 md:pr-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight mb-6">
            Create Amazing <span className="relative inline-block">Father's Day
              <span className="absolute bottom-2 left-0 w-full h-3 bg-orange-200 bg-opacity-50 z-[-1]"></span>
            </span> Cards
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg">
            Design beautiful, personalized cards for your dad in minutes. Our easy-to-use editor makes creating the perfect card simple and fun.
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <Link 
              to="/create" 
              className="btn-primary bg-gradient-to-r from-secondary to-orange-700 text-white py-3 px-8 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-400 hover:-translate-y-1 text-center"
            >
              Create Now
            </Link>
            <Link 
              to="/templates" 
              className="btn-secondary border-2 border-secondary text-secondary py-3 px-8 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-400 hover:-translate-y-1 hover:bg-secondary hover:text-white text-center"
            >
              Browse Templates
            </Link>
          </div>
        </div>
        
        <div className="card-showcase w-full md:w-1/2 relative flex justify-center">
          <div 
            className="w-full max-w-md"
            style={{
              perspective: '1000px',
            }}
          >
            <div 
              className="relative w-full aspect-[3/4] rounded-[25px] shadow-2xl overflow-hidden cursor-pointer"
              style={{
                transformStyle: 'preserve-3d',
                transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0.2, 0.2, 1)',
              }}
              onClick={flipCard}
            >
              {/* Card Front - With background image */}
              <div 
                className="absolute w-full h-full flex flex-col justify-center items-center p-10 text-center bg-cover bg-center"
                style={{ 
                  backgroundImage: "linear-gradient(rgba(44, 62, 80, 0.85), rgba(26, 37, 47, 0.9)), url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')",
                  color: 'white',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <FaHeart className="absolute top-5 right-5 text-3xl text-[#e74c3c] animate-pulse" />
                <h2 className="card-title text-3xl md:text-4xl font-playfair font-bold mb-5 text-shadow">Happy Father's Day</h2>
                <p className="card-subtitle text-lg mb-8 max-w-[80%] text-shadow">To the world's greatest dad</p>
                
                <div className="photo-frame w-40 h-40 rounded-full border-4 border-white shadow-lg mb-8 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Father and Child" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="message italic text-lg text-shadow">Thank you for being my hero and my guide</p>
                
                <button 
                  className="flip-button absolute bottom-5 right-5 bg-white bg-opacity-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-opacity-30 hover:rotate-180"
                  onClick={(e) => {
                    e.stopPropagation();
                    flipCard();
                  }}
                >
                  <FaSyncAlt className="text-white" />
                </button>
              </div>
              
              {/* Card Inside - Original background */}
              <div 
                className="absolute w-full h-full flex flex-col justify-center items-center p-10 text-center"
                style={{
                  background: "linear-gradient(to bottom, rgba(253, 249, 243, 0.95), rgba(249, 228, 208, 0.95))",
                  color: '#2c3e50',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <h2 className="card-title text-3xl md:text-4xl font-playfair font-bold mb-5">Dear Dad,</h2>
                <p className="message italic text-lg max-w-[80%] mb-5">
                  Thank you for your endless love, support, and wisdom. You've taught me so much and been my rock through everything. I'm so grateful to have you as my father.
                </p>
                <p className="signature font-playfair font-bold text-xl">With all my love,<br />Your Child</p>
                
                <button 
                  className="flip-button absolute bottom-5 right-5 bg-[#2c3e50] bg-opacity-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-opacity-30 hover:rotate-180"
                  onClick={(e) => {
                    e.stopPropagation();
                    flipCard();
                  }}
                >
                  <FaSyncAlt className="text-[#2c3e50]" />
                </button>
              </div>
            </div>
          </div>
          <div className="hero-decoration absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-orange-100 animate-pulse z-[-1]"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;