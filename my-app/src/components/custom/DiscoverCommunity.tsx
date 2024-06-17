import React from 'react';

const DiscoverCommunity: React.FC = () => {
  return (
    <div className="relative bg-cover bg-center h-[50vh]" style={{ backgroundImage: "url('https://placehold.co/1920x600')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-4xl font-bold">Discover Your Ideal Senior Living Community</h2>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl">Choose a category that fits your needs. Apply filters to refine your search and find the perfect place for you.</p>
        <button className="mt-8 px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 text-lg">Check All Category</button>
      </div>
    </div>
  );
};

export default DiscoverCommunity;