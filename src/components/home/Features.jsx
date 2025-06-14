import React from 'react';
import FeatureCard from '../ui/FeatureCard';
import { FaMagic, FaImages, FaBolt } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      icon: <FaMagic className="text-3xl" />,
      title: "Drag & Drop Editor",
      description: "Easily customize every aspect of your card with our intuitive drag and drop interface."
    },
    {
      icon: <FaImages className="text-3xl" />,
      title: "Photo Integration",
      description: "Upload your favorite photos and integrate them seamlessly into your card design."
    },
    {
      icon: <FaBolt className="text-3xl" />,
      title: "AI Assistant (Comming Soon)",
      description: "Our AI will suggest layouts, colors, and designs based on your preferences."
    }
  ];

  return (
    <section className="features py-24 bg-white bg-opacity-70 backdrop-blur relative">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-primary relative inline-block mb-4">
            Powerful Creation Features
            <span className="absolute bottom-2 left-1/4 w-1/2 h-3 bg-orange-200 bg-opacity-50 z-[-1]"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to design the perfect Father's Day card
          </p>
        </div>
        
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;