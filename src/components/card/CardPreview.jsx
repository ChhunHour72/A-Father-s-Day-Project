import React, { useState } from 'react';
import { useCardContext } from '../../context/useCardContext';
import { FaHeart, FaSyncAlt } from 'react-icons/fa';

const CardPreview = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { cardData } = useCardContext();

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Inline styles for flip animation
  const perspectiveStyle = {
    perspective: '1000px',
    width: '100%',
    aspectRatio: '3/4'
  };

  const cardContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 1s',
    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
  };

  const cardFaceStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    borderRadius: '25px',
    overflow: 'hidden'
  };

  const cardInsideStyle = {
    ...cardFaceStyle,
    transform: 'rotateY(180deg)'
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full" style={{ aspectRatio: '3/4' }}>
        {/* Perspective container */}
        <div style={perspectiveStyle}>
          <div 
            className="relative w-full rounded-2xl shadow-xl overflow-hidden cursor-pointer"
            style={cardContainerStyle}
            onClick={flipCard}
          >
            {/* Card Front */}
            <div 
              className="p-6 sm:p-8 text-center"
              style={{
                ...cardFaceStyle,
                backgroundImage: "linear-gradient(rgba(44, 62, 80, 0.85), rgba(26, 37, 47, 0.9))",
                color: 'white'
              }}
            >
              {/* Decorative hearts */}
              <div className="absolute top-4 right-4 flex gap-2">
                <FaHeart className="text-xl text-red-400 animate-pulse" />
                <FaHeart className="text-xl text-red-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                <FaHeart className="text-xl text-red-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              
              {/* Card content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  {cardData.title}
                </h2>
                <p className="text-lg mb-4 max-w-[80%] font-medium">
                  {cardData.subtitle}
                </p>
                
                <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg mb-5 overflow-hidden relative">
                  {cardData.image ? (
                    <img 
                      src={cardData.image} 
                      alt="Personalized" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-orange-200 to-orange-300 flex items-center justify-center">
                      <span className="text-white font-medium">Add Photo</span>
                    </div>
                  )}
                </div>
                
                <p className="italic text-base max-w-[80%] font-medium">
                  {cardData.message}
                </p>
              </div>
              
              {/* Flip button */}
              <button 
                className="absolute bottom-4 right-4 bg-white bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  flipCard();
                }}
              >
                <FaSyncAlt className="text-white text-lg" />
              </button>
            </div>
            
            {/* Card Inside */}
            <div 
              className="p-6 sm:p-8 text-center"
              style={{
                ...cardInsideStyle,
                background: "linear-gradient(rgba(253, 249, 243, 0.95), rgba(249, 228, 208, 0.95))",
                color: '#2c3e50',
              }}
            >
              {/* Card content */}
              <div className="relative z-10 max-w-[90%] h-full flex flex-col justify-center items-center">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Dear Dad,
                </h2>
                <div className="mb-5">
                  <p className="text-base sm:text-lg leading-relaxed font-medium text-gray-700">
                    {cardData.insideMessage}
                  </p>
                </div>
                <p className="font-bold text-lg">
                  {cardData.signature}
                </p>
              </div>
              
              {/* Flip button */}
              <button 
                className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:bg-opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  flipCard();
                }}
              >
                <FaSyncAlt className="text-gray-800 text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Flip control button */}
      <div className="mt-4 text-center">
        <button 
          className="bg-orange-500 text-white py-2 px-6 rounded-full font-medium shadow hover:bg-orange-600 transition-colors"
          onClick={flipCard}
        >
          {isFlipped ? 'Show Front' : 'Show Inside'} 
          <span className="ml-2">{isFlipped ? '👨' : '💌'}</span>
        </button>
      </div>
    </div>
  );
};

export default CardPreview;