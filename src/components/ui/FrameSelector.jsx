import React from 'react';

const FrameSelector = ({ frames, selectedFrame, onSelect }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {Object.entries(frames).map(([key, frame]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`p-2 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 h-24 ${
            selectedFrame === key ? 'border-secondary ring-2 ring-orange-200' : 'border-gray-200 hover:border-secondary'
          }`}
        >
          <div className="w-12 h-12 flex items-center justify-center">
            {/* Visual Previews for each frame */}
            {key === 'none' && <div className="w-10 h-10 bg-gray-300 rounded-sm" />}
            {key === 'simple' && <div className="w-10 h-10 bg-gray-300 rounded-sm border-2 border-gray-500" />}
            {key === 'circle' && <div className="w-10 h-10 bg-gray-300 rounded-full" />}
            {key === 'polaroid' && (
              <div className="w-10 h-12 bg-white p-1 shadow-sm">
                <div className="w-full h-full bg-gray-300" />
              </div>
            )}
            {/* --- NEW: Vintage Frame Preview --- */}
            {key === 'vintage' && (
                <div className="w-10 h-10 bg-gray-200 border-2 border-amber-800/50 p-0.5">
                    <div className="w-full h-full bg-gray-300 border border-amber-800/30" />
                </div>
            )}
          </div>
          <p className="text-xs font-semibold text-center text-primary">{frame.name}</p>
        </button>
      ))}
    </div>
  );
};

export default FrameSelector;
