import React from 'react';

const SkeletonGallery: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="carousel-wrapper">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="relative w-full h-64 bg-gray-300 rounded-lg animate-pulse mb-4"></div>
      ))}
    </div>
  );
};

export default SkeletonGallery;
