import React from 'react';

const TemplateVisual = ({ visualType, palette }) => {
  const renderVisual = () => {
    switch (visualType) {
      case 'paper-texture':
        return (
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-amber-800/10 rounded-full"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 bg-amber-800/10 rounded-full"></div>
          </div>
        );
        
      case 'tool-grid':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-gray-300 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-400 rounded-md rotate-45"></div>
            </div>
          </div>
        );
        
      case 'flame-effect':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-orange-500 to-transparent opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-full h-8 bg-repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 8px) opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-500 rounded-full blur-xl opacity-30"></div>
          </div>
        );
        
      case 'mountain-silhouette':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gray-800/10 clip-path-polygon"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gray-800/10 clip-path-polygon"></div>
            <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gray-800/10 clip-path-polygon"></div>
          </div>
        );
        
      case 'circuit-board':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/connected.png')]"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-blue-500/30 rounded-full"></div>
          </div>
        );
        
      case 'gold-border':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute inset-0 border-8 border-amber-600/20 rounded-lg"></div>
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-amber-600/10"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-amber-600/10"></div>
          </div>
        );
        
      case 'sport-field':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/10 to-green-700/10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(transparent_49%,white_49%,white_51%,transparent_51%)] opacity-10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,white_49%,white_51%,transparent_51%)] opacity-10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-4 border-white/20"></div>
          </div>
        );
        
      case 'music-notes':
        return (
          <div className="relative w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute top-1/3 left-1/4 w-8 h-8 rounded-full bg-purple-500/10"></div>
            <div className="absolute top-1/2 right-1/4 w-8 h-8 rounded-full bg-purple-500/10"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-purple-500/20 rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-1 bg-purple-500/20 rotate-135"></div>
          </div>
        );
        
      default:
        return (
          <div className="w-full h-full" style={{ backgroundColor: palette.bg }}>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full" style={{ backgroundColor: palette.accent }}></div>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full">
      {renderVisual()}
    </div>
  );
};

export default TemplateVisual;