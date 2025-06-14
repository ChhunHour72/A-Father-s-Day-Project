import React, { useCallback } from 'react';
import { useCardContext } from '../../context/useCardContext';

const CardEditor = ({ activeTab }) => {
  const { cardData, updateCardData } = useCardContext();

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateCardData({ image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  }, [updateCardData]);

  const handleChange = useCallback((field) => (e) => {
    updateCardData({ [field]: e.target.value });
  }, [updateCardData]);

  return (
    <div className="overflow-y-auto max-h-[60vh]">
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Front Title
            </label>
            <input
              type="text"
              value={cardData.title || ''}
              onChange={handleChange('title')}
              placeholder="Happy Father's Day!"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Front Subtitle
            </label>
            <input
              type="text"
              value={cardData.subtitle || ''}
              onChange={handleChange('subtitle')}
              placeholder="To the world's greatest dad"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Front Message
            </label>
            <textarea
              value={cardData.message || ''}
              onChange={handleChange('message')}
              placeholder="Thank you for being my hero and my guide"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              rows={2}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Inside Message
            </label>
            <textarea
              value={cardData.insideMessage || ''}
              onChange={handleChange('insideMessage')}
              placeholder="Write your personal message here..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Signature
            </label>
            <input
              type="text"
              value={cardData.signature || ''}
              onChange={handleChange('signature')}
              placeholder="With love, Your Child"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      )}

      {activeTab === 'design' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Theme
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['warm', 'cool', 'vintage'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => updateCardData({ theme })}
                  className={`p-2 rounded-lg border text-xs ${
                    cardData.theme === theme 
                      ? 'border-orange-500 ring-1 ring-orange-500' 
                      : 'border-gray-300'
                  }`}
                >
                  <div className={`h-6 rounded mb-1 ${
                    theme === 'warm' ? 'bg-gradient-to-r from-orange-200 to-orange-400' : 
                    theme === 'cool' ? 'bg-gradient-to-r from-blue-200 to-blue-400' : 
                    'bg-gradient-to-r from-amber-200 to-amber-400'
                  }`} />
                  <span className="capitalize">{theme}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Style
            </label>
            <select 
              value={cardData.font || 'sans'}
              onChange={(e) => updateCardData({ font: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            >
              <option value="sans">Modern Sans</option>
              <option value="serif">Classic Serif</option>
              <option value="handwriting">Handwriting</option>
            </select>
          </div>
        </div>
      )}

      {activeTab === 'image' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-6 h-6 mb-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="text-xs text-gray-500">
                    Click to upload
                  </p>
                </div>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" 
                />
              </label>
            </div>
          </div>
          
          {cardData.image && (
            <div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={cardData.image} 
                  alt="Uploaded" 
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={() => updateCardData({ image: null })}
                  className="w-full py-2 bg-gray-100 text-gray-700 text-sm hover:bg-gray-200"
                >
                  Remove Photo
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardEditor;