// components/custom/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-24 h-24">
          <div className="absolute border-4 border-t-transparent border-blue-500 rounded-full w-24 h-24 animate-spin"></div>
          <div className="absolute border-4 border-t-transparent border-green-500 rounded-full w-20 h-20 top-2 left-2 animate-spin-reverse"></div>
          <div className="absolute border-4 border-t-transparent border-red-500 rounded-full w-16 h-16 top-4 left-4 animate-spin"></div>
        </div>
      </div>
    );
  };
  
  export default LoadingSpinner;