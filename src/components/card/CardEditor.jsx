import React, { useCallback } from 'react';
import { useCardContext } from '../../context/useCardContext';
import ColorPaletteSelector from '../ui/ColorPaletteSelector';
import FontSelector from '../ui/FontSelector';
import FrameSelector from '../ui/FrameSelector';
import { FaUpload } from 'react-icons/fa';

const CardEditor = ({ activeTab }) => {
  const { cardData, updateCardData, palettes, fonts, frames } = useCardContext();

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCardData({ image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  }, [updateCardData]);
  
  const handleBackgroundImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCardData({ backgroundImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  }, [updateCardData]);

  const handleChange = useCallback((field) => (e) => {
    updateCardData({ [field]: e.target.value });
  }, [updateCardData]);

  const inputClass = "w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm transition-shadow";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const textareaClass = `${inputClass} min-h-[80px]`;

  if (activeTab === 'content') {
    return (
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Front Title</label>
          <input type="text" value={cardData.title || ''} onChange={handleChange('title')} placeholder="Happy Father's Day!" className={inputClass}/>
        </div>
        <div>
          <label className={labelClass}>Front Subtitle</label>
          <input type="text" value={cardData.subtitle || ''} onChange={handleChange('subtitle')} placeholder="To the world's greatest dad" className={inputClass}/>
        </div>
        <div>
          <label className={labelClass}>Front Message</label>
          <textarea value={cardData.message || ''} onChange={handleChange('message')} placeholder="A short message for the front" className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>Inside Message</label>
          <textarea value={cardData.insideMessage || ''} onChange={handleChange('insideMessage')} placeholder="Write your personal message here..." className={textareaClass} />
        </div>
        <div>
          <label className={labelClass}>Signature</label>
          <input type="text" value={cardData.signature || ''} onChange={handleChange('signature')} placeholder="With love, Your Child" className={inputClass}/>
        </div>
      </div>
    );
  }

  if (activeTab === 'design') {
    return (
      <div className="space-y-6">
        <ColorPaletteSelector 
            palettes={palettes} 
            selectedPalette={cardData.colorPalette}
            onSelect={(palette) => updateCardData({ colorPalette: palette })}
        />
        <FontSelector
            fonts={fonts}
            selectedFont={cardData.fontFamily}
            onSelect={(font) => updateCardData({ fontFamily: font })}
        />
      </div>
    );
  }

  if (activeTab === 'image') {
    return (
      <div className="space-y-6">
        {/* Card Photo Section */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Card Photo</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-orange-50 transition-colors">
                <FaUpload className="w-8 h-8 text-gray-400 mb-2"/>
                <p className="text-sm text-gray-500">Click to upload a photo</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {cardData.image && (
              <div className="mt-4">
                <p className={labelClass}>Current Photo</p>
                <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                  <img src={cardData.image} alt="Uploaded preview" className="w-full h-32 object-cover"/>
                  <button
                    onClick={() => updateCardData({ image: null })}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/80"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
        </div>

        {/* --- MODIFIED: Frame selector is no longer conditional --- */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Image Frame</h3>
            <FrameSelector
                frames={frames}
                selectedFrame={cardData.frame}
                onSelect={(frame) => updateCardData({ frame })}
            />
        </div>

        {/* Card Background Section */}
        <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Card Background</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-orange-50 transition-colors">
                <FaUpload className="w-8 h-8 text-gray-400 mb-2"/>
                <p className="text-sm text-gray-500">Click to upload a background</p>
                <input type="file" accept="image/*" onChange={handleBackgroundImageUpload} className="hidden" />
            </label>
            {cardData.backgroundImage && (
              <div className="mt-4">
                <p className={labelClass}>Current Background</p>
                <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                  <img src={cardData.backgroundImage} alt="Background preview" className="w-full h-32 object-cover"/>
                  <button
                    onClick={() => updateCardData({ backgroundImage: null })}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/80"
                  >
                    &times;
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }

  return null;
};

export default CardEditor;