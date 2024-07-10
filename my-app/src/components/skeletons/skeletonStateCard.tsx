import React from 'react';

const SkeletonStateCard: React.FC = () => {
  return (
    <div className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonStateCard;
