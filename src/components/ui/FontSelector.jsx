import React from 'react';

const FontSelector = ({ fonts, selectedFont, onSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Font Style</label>
      <div className="space-y-2">
        {Object.entries(fonts).map(([key, font]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
              selectedFont === key ? 'border-secondary ring-2 ring-orange-200' : 'border-gray-200 hover:border-secondary'
            }`}
          >
            <p className="text-lg" style={{ fontFamily: font.family }}>
              {font.name}
            </p>
            <p className="text-xs text-gray-500" style={{ fontFamily: font.family }}>
              The quick brown fox jumps over the lazy dog.
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSelector;
