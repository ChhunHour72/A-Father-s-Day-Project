import React from 'react';

/**
 * A component to display a technology icon with a label.
 * @param {{icon: JSX.Element, label: string}} props
 */
const TechIcon = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="text-4xl text-secondary">{icon}</div>
      <p className="font-semibold text-primary">{label}</p>
    </div>
  );
};

export default TechIcon;
