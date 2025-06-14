import React from 'react';

const ColorPaletteSelector = ({ palettes, selectedPalette, onSelect }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Color Palette</label>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(palettes).map(([key, palette]) => (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className={`p-2 rounded-lg border-2 transition-all ${
              selectedPalette === key ? 'border-secondary ring-2 ring-orange-200' : 'border-gray-200 hover:border-secondary'
            }`}
          >
            <div className="flex items-center gap-1">
              <div
                className="w-5 h-8 rounded"
                style={{ backgroundColor: palette.bg }}
              ></div>
              <div className="flex-1 flex flex-col gap-1">
                <div
                  className="w-full h-3 rounded"
                  style={{ backgroundColor: palette.primaryText }}
                ></div>
                <div
                  className="w-full h-3 rounded"
                  style={{ backgroundColor: palette.secondaryText }}
                ></div>
              </div>
            </div>
            <p className="text-xs font-semibold text-center mt-2 capitalize text-primary">{key}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteSelector;
