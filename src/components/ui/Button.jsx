import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  to, 
  href, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = "inline-block rounded-full font-semibold shadow-md transition-all duration-400 hover:-translate-y-1 hover:shadow-lg";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-secondary to-orange-700 text-white hover:from-orange-700 hover:to-secondary",
    secondary: "border-2 border-secondary text-secondary hover:bg-secondary hover:text-white",
    white: "bg-white text-secondary hover:bg-gray-100",
    dark: "bg-dark text-white hover:bg-gray-800"
  };
  
  const sizeClasses = {
    sm: "py-2 px-6 text-sm",
    md: "py-3 px-8",
    lg: "py-4 px-10 text-lg"
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;