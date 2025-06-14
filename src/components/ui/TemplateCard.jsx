import React from 'react';
import { motion } from 'framer-motion';
import TemplateVisual from '../../context/TemplateVisual';
import { FaEye, FaHeart, FaStar } from 'react-icons/fa';

const TemplateCard = ({ templateId, template, palette, font, onClick }) => {
  return (
    <motion.div
      className="cursor-pointer group relative"
      onClick={() => onClick(templateId)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-2xl shadow-lg overflow-hidden transition-all duration-300 bg-white border border-gray-200 h-64">
        <div 
          className="w-full h-full relative"
          style={{ fontFamily: font.family }}
        >
          <TemplateVisual visualType={template.visual} palette={palette} />
          
          <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-10">
            <h3 
              className="text-xl font-bold text-center mb-1"
              style={{ color: palette.primaryText }}
            >
              {template.name}
            </h3>
            <p 
              className="text-sm text-center"
              style={{ color: palette.secondaryText }}
            >
              {template.category}
            </p>
          </div>
        </div>
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 rounded-2xl flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex">
        <FaEye size={24} className="mb-2"/>
        <p className="font-bold">Preview</p>
      </div>
      
      {/* Bottom info */}
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800 group-hover:text-secondary transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar size={12} />
            <span className="text-xs font-bold">4.8</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{template.category}</span>
          <button 
            className="text-gray-400 hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite functionality
            }}
          >
            <FaHeart size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;