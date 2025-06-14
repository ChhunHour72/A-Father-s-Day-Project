// src/components/layout/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';

// Changed from named export to default export
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24"> {/* Added top padding */}
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

// Export as default
export default Layout;