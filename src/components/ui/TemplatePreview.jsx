import React from 'react';

const TemplatePreview = ({ template, palette, font, isSelected }) => {
  const cardStyle = {
    fontFamily: font.family,
    backgroundColor: palette.bg,
    color: palette.primaryText,
  };

  return (
    <div className={`w-full aspect-[3/4] rounded-lg overflow-hidden border-4 ${isSelected ? 'border-secondary' : 'border-transparent'}`}>
      <div 
        className="w-full h-full p-4 flex flex-col justify-center items-center text-center"
        style={cardStyle}
      >
        <h3 className="text-lg font-bold" style={{ color: palette.primaryText }}>
          {template.title.substring(0, 20)}
        </h3>
        <p className="text-xs mb-2" style={{ color: palette.secondaryText }}>
          {template.subtitle.substring(0, 30)}
        </p>
        <div className="w-16 h-16 rounded-full border-2 overflow-hidden bg-gray-200" style={{ borderColor: palette.accent }}>
          {template.image && <img src={template.image} alt={template.title} className="w-full h-full object-cover"/>}
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
