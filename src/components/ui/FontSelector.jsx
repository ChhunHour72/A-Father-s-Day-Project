import React from 'react';

/**
 * A component for selecting a font style, with special preview for Khmer fonts.
 * @param {{fonts: object, selectedFont: string, onSelect: function}} props
 */
const FontSelector = ({ fonts, selectedFont, onSelect }) => {

  // Separate fonts into Khmer and English groups
  const khmerFonts = Object.entries(fonts).filter(([key, font]) => font.name.includes('(Khmer)'));
  const englishFonts = Object.entries(fonts).filter(([key, font]) => !font.name.includes('(Khmer)'));

  // Reusable button component for a font choice
  const FontButton = ({ fontKey, font, onSelect }) => {
    const isKhmer = font.name.includes('(Khmer)');
    const previewText = isKhmer 
      ? 'អក្សរសាស្ត្រខ្មែររុងរឿង' 
      : 'The quick brown fox jumps over the lazy dog.';
    
    return (
      <button
        key={fontKey}
        onClick={() => onSelect(fontKey)}
        className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
          selectedFont === fontKey ? 'border-secondary ring-2 ring-orange-200' : 'border-gray-200 hover:border-secondary'
        }`}
      >
        <p className="text-lg" style={{ fontFamily: font.family }}>
          {font.name}
        </p>
        <p className="text-sm text-gray-500" style={{ fontFamily: font.family }}>
          {previewText}
        </p>
      </button>
    );
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
      
      {/* Khmer Fonts Section */}
      {khmerFonts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold text-gray-600 mb-2 border-b pb-1">Khmer Fonts</h3>
          <div className="space-y-2">
            {khmerFonts.map(([key, font]) => (
              <FontButton key={key} fontKey={key} font={font} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}

      {/* English Fonts Section */}
      {englishFonts.length > 0 && (
        <div>
          <h3 className="text-md font-semibold text-gray-600 mb-2 border-b pb-1">English Fonts</h3>
          <div className="space-y-2">
            {englishFonts.map(([key, font]) => (
              <FontButton key={key} fontKey={key} font={font} onSelect={onSelect} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FontSelector;
