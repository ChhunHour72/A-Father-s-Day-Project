import React from 'react';
import { FaPalette, FaTimes } from 'react-icons/fa';
import { useCardContext } from '../../context/useCardContext';

const TemplateSelector = ({ onSelectTemplate, onClose }) => {
  const { templates } = useCardContext();
  
  const templateOptions = [
    { id: 'default', name: "Classic", color: "from-blue-500 to-blue-700" },
    { id: 'modern', name: "Modern", color: "from-gray-600 to-gray-800" },
    { id: 'playful', name: "Playful", color: "from-yellow-400 to-orange-500" },
    { id: 'vintage', name: "Vintage", color: "from-amber-600 to-amber-800" }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Select a Template</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {templateOptions.map(template => (
          <div 
            key={template.id}
            className="border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-orange-300 transition-colors"
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="h-32 bg-gradient-to-r p-4 flex flex-col justify-end">
              <div className={`bg-gradient-to-r ${template.color} w-full h-full rounded flex items-center justify-center`}>
                <span className="text-white font-bold">{template.name}</span>
              </div>
            </div>
            <div className="p-3">
              <h3 className="font-bold text-gray-800 text-sm">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;