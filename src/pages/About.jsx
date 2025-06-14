import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-playfair font-bold text-center mb-8">About Heartfelt Cards</h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg mb-6">
            Heartfelt Cards was founded in 2025 with a simple mission: to make it easy for anyone to create beautiful, personalized cards for their loved ones.
          </p>
          <p className="text-lg mb-6">
            We started with Father's Day because we believe dads often don't get the appreciation they deserve. Our goal is to help you create a card that truly expresses your love and gratitude.
          </p>
          <p className="text-lg">
            Our team of designers and developers work tirelessly to create an experience that's both powerful and easy to use. Whether you're tech-savvy or just getting started online, you'll find our tools intuitive and fun to use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;