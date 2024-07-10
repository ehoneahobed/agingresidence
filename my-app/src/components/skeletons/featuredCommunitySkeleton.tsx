import React from 'react';

const FeaturedCommunitySkeletonCard: React.FC = () => {
  return (
    <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-pulse">
      <div className="relative w-full h-48 bg-gray-200"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
    
  );
};

export default FeaturedCommunitySkeletonCard;
