import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-gray-200 pt-24 pb-10 relative">
      <div className="container mx-auto px-4">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="footer-col">
            <h3 className="text-2xl font-bold text-white mb-6 relative pb-2 inline-block">
              Heartfelt Cards
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-secondary"></span>
            </h3>
            <p className="mb-6">
              Making it easy to create beautiful, personalized Father's Day cards that show your love and appreciation.
            </p>
            <div className="social-links flex space-x-4">
              {[
                { icon: <FaFacebookF />, url: '#' },
                { icon: <FaInstagram />, url: '#' },
                { icon: <FaPinterestP />, url: '#' },
                { icon: <FaTwitter />, url: '#' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  className="w-12 h-12 rounded-full bg-white bg-opacity-10 flex items-center justify-center text-lg hover:bg-secondary hover:text-white transition-all duration-400"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="footer-col">
            <h3 className="text-xl font-bold text-white mb-6 relative pb-2 inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              {['Home', 'Templates', 'Create', 'Share', 'About'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item === 'Home' ? '' : item.toLowerCase()}`}
                    className="text-gray-300 hover:text-secondary transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="text-xl font-bold text-white mb-6 relative pb-2 inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              {['Design Tips', 'Father\'s Day Ideas', 'Photo Guide', 'Printing Help', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/resources/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-secondary transition-all duration-300 inline-block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="text-xl font-bold text-white mb-6 relative pb-2 inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@heartfeltcards.com" className="flex items-start text-gray-300 hover:text-secondary transition-all duration-300">
                  <FaEnvelope className="mt-1 mr-3" />
                  longchhunhour74@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:5551234567" className="flex items-start text-gray-300 hover:text-secondary transition-all duration-300">
                  <FaPhone className="mt-1 mr-3" />
                  (+855) 123-4567
                </a>
              </li>
              <li>
                <a href="#" className="flex items-start text-gray-300 hover:text-secondary transition-all duration-300">
                  <FaMapMarkerAlt className="mt-1 mr-3" />
                  Cambodia Academy of Digital Technology, PP
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="copyright text-center pt-10 border-t border-gray-700 text-gray-500">
          <p>
            &copy; 2025 A Father's Day Project. All rights reserved. Made with <FaHeart className="text-accent inline mx-1" /> for awesome dads everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;