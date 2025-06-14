import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = false,
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md overflow-hidden ${hoverEffect ? 'transition-all duration-400 hover:-translate-y-2 hover:shadow-lg' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;