import React, { useState, forwardRef } from 'react';
import { useCardContext } from '../../context/useCardContext';
import { FaSyncAlt } from 'react-icons/fa';
import TemplateVisual from '../../context/TemplateVisual';

const CardPreview = forwardRef(({ initialData }, ref) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const globalContext = useCardContext();

  const { cardData, palettes, fonts, frames } = initialData ? { ...globalContext, ...initialData } : globalContext;

  const flipCard = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  const currentPalette = palettes[cardData.colorPalette] || palettes.storyteller;
  const currentFont = fonts[cardData.fontFamily] || fonts.vintage;
  const selectedFrame = cardData.frame || 'none';

  const cardContentStyle = {
    fontFamily: currentFont.family,
    color: currentPalette.primaryText,
  };

  const cardContainerStyle = {
    backgroundImage: `url(${cardData.backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: currentPalette.bg,
  };
  
  const insideMessageStyle = {
    whiteSpace: 'pre-wrap',
  };
  
  const getFrameContainerClasses = () => {
    const base = "transition-all duration-500 ease-in-out";
    switch(selectedFrame) {
      case 'polaroid': return `${base} bg-white p-2 pb-8 shadow-lg transform -rotate-2`;
      case 'vintage': return `${base} p-2 border-8`;
      case 'simple': return `${base} p-1 bg-white shadow-md`;
      case 'circle': return `${base} p-1 bg-white shadow-md rounded-full`;
      default: return "";
    }
  }

  const getFrameContainerStyles = () => {
      if (selectedFrame === 'vintage') {
          return { backgroundColor: '#f7f3e9', borderColor: '#c69f89', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.2)' };
      }
      return {};
  }
  
  const getImageClasses = () => {
    const base = "w-40 h-40 object-cover";
    switch(selectedFrame) {
      case 'circle': return `${base} rounded-full`;
      default: return `${base}`;
    }
  }

  const StaticCard = ({ isFront }) => (
    <div 
        className="w-[400px] h-[533px] rounded-2xl overflow-hidden relative"
        style={cardContainerStyle}
    >
        {!cardData.backgroundImage && cardData.visual && (
            <TemplateVisual visualType={cardData.visual} palette={currentPalette}/>
        )}
        {cardData.backgroundImage && (
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: currentPalette.bg, opacity: 0.85 }}
            ></div>
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center" style={cardContentStyle}>
            {isFront ? (
                <>
                    <h2 className="text-4xl font-bold mb-3" style={{ color: currentPalette.primaryText }}>
                        {cardData.title}
                    </h2>
                    <p className="text-xl mb-4" style={{ color: currentPalette.secondaryText }}>
                        {cardData.subtitle}
                    </p>

                    {/* --- MODIFIED: Frame now wraps placeholder too --- */}
                    <div className="mb-5 flex items-center justify-center" style={{minHeight: '220px'}}>
                        <div className={getFrameContainerClasses()} style={getFrameContainerStyles()}>
                            {cardData.image ? (
                                <img src={cardData.image} alt="Personalized" className={getImageClasses()} />
                            ) : (
                                <div className={`${getImageClasses()} bg-gray-200 flex items-center justify-center text-xs text-gray-500`}>
                                    No Photo
                                </div>
                            )}
                        </div>
                    </div>

                    <p className="italic text-lg" style={{ color: currentPalette.secondaryText }}>
                        {cardData.message}
                    </p>
                </>
            ) : (
                <div className="max-w-full w-full text-left p-4">
                    <p className="text-xl leading-relaxed" style={{ ...insideMessageStyle, color: currentPalette.primaryText }}>
                        {cardData.insideMessage}
                    </p>
                    <p className="font-bold text-xl mt-8 w-full text-right" style={{ color: currentPalette.secondaryText }}>
                        {cardData.signature}
                    </p>
                </div>
            )}
        </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto aspect-[3/4] p-4">
        <div className="w-full h-full card-flipper" ref={ref} style={{ perspective: '1200px' }}>
          <div 
            className="relative w-full h-full transition-transform duration-700"
            style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
          >
            <div className="absolute w-full h-full rounded-2xl shadow-lg" style={{ backfaceVisibility: 'hidden' }} onClick={flipCard}>
              <StaticCard isFront={true} />
            </div>
            <div className="absolute w-full h-full rounded-2xl shadow-lg" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} onClick={flipCard}>
              <StaticCard isFront={false} />
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
            <button 
                className="flex items-center gap-2 bg-white text-primary py-2 px-5 rounded-full font-semibold shadow hover:shadow-md transition-all duration-300 border"
                onClick={flipCard}
            >
                <FaSyncAlt className={`transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
                {isFlipped ? 'Show Front' : 'Show Inside'}
            </button>
        </div>
    </div>
  );
});

export default CardPreview;