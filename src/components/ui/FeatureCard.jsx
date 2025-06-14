import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="feature-card bg-white rounded-2xl p-8 text-center shadow-md transition-all duration-400 hover:-translate-y-2 hover:shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-orange-700 transform scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100"></div>
      <div className="feature-icon w-20 h-20 rounded-full bg-gradient-to-br from-warm-light to-warm-medium flex items-center justify-center mx-auto mb-6 shadow-md transition-all duration-400 group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-orange-700 group-hover:text-white">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;