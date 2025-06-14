// src/components/layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FaHeart, FaBars, FaTimes, FaUser, FaPalette } from 'react-icons/fa';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);
  
  // Navigation items
  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/templates', name: 'Templates' },
    { path: '/create', name: 'Create' },
    { path: '/editor', name: 'Editor' },
    { path: '/about', name: 'About' },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white shadow-lg py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center text-2xl font-bold z-50"
          >
            <FaHeart className="mr-2 text-secondary transition-transform duration-500 hover:rotate-12" />
            <span className="text-primary">Happy</span>
            <span className="text-secondary">Father's Day</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `relative font-medium transition-colors duration-300 ${
                    isActive ? 'text-secondary' : 'text-primary hover:text-secondary'
                  }`
                }
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
            
            <Link 
              to="/create" 
              className="bg-gradient-to-r from-secondary to-orange-600 text-white py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              Create Now
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary text-2xl z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          
          {/* Mobile Menu Overlay */}
          <div className={`fixed inset-0 bg-white z-40 transition-all duration-500 ease-in-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}>
            <div className="flex flex-col items-center justify-center h-full space-y-10">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `text-2xl font-bold transition-colors duration-300 ${
                      isActive ? 'text-secondary' : 'text-primary hover:text-secondary'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              
              <div className="flex space-x-6 mt-8">
                <Link 
                  to="/create" 
                  className="flex items-center gap-2 bg-gradient-to-r from-secondary to-orange-600 text-white py-3 px-8 rounded-full font-semibold shadow-md"
                >
                  <FaPalette className="text-white" />
                  Create Card
                </Link>
                
                <Link 
                  to="/account" 
                  className="flex items-center gap-2 border-2 border-secondary text-secondary py-3 px-8 rounded-full font-semibold"
                >
                  <FaUser className="text-secondary" />
                  Account
                </Link>
              </div>
              
              <div className="absolute bottom-10 text-center text-gray-500">
                <p>© 2025 Heartfelt Cards</p>
                <p className="text-sm mt-2">Made with ❤️ for awesome dads</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className={`h-1 bg-gradient-to-r from-secondary to-orange-600 fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`} style={{
        width: scrolled ? `${Math.min(100, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%` : '0%'
      }}></div>
    </header>
  );
};

export default Header;