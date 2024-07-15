import React from 'react';

const SkeletonSimilarCommunity: React.FC = () => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-md animate-pulse">
      <div className="w-full h-32 bg-gray-300 rounded-lg"></div>
      <div className="mt-2 h-6 bg-gray-300 rounded"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-3/4"></div>
    </div>
  );
};

export default SkeletonSimilarCommunity;
