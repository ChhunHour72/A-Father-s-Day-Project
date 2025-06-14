import React from 'react';
import { useCardContext } from '../../context/useCardContext';
import TemplatePreview from '../ui/TemplatePreview';

const TemplateSelector = ({ onSelectTemplate }) => {
  const { templates, palettes, fonts, cardData } = useCardContext();
  
  return (
    <div className="w-full">
        <h2 className="text-2xl font-bold text-primary mb-1">Choose a Template</h2>
        <p className="text-gray-500 mb-6">Select a starting point for your card. You can still customize everything afterwards.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(templates).map(([templateId, templateData]) => (
            <div 
                key={templateId}
                className="cursor-pointer group"
                onClick={() => onSelectTemplate(templateId)}
            >
                <TemplatePreview 
                    template={templateData}
                    palette={palettes[templateData.colorPalette]}
                    font={fonts[templateData.fontFamily]}
                    isSelected={
                        cardData.title === templateData.title && 
                        cardData.colorPalette === templateData.colorPalette
                    }
                />
                <p className="text-center font-semibold text-primary mt-2 group-hover:text-secondary transition-colors capitalize">{templateId}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default TemplateSelector;
