import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-cover bg-center h-screen md:h-[60vh]" style={{ backgroundImage: "url('https://placehold.co/1200x600')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center text-white py-12">
        <div className="max-w-[60rem] mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold text-left">
            Explore Verified Aging Residences Tailored to Your Needs
          </h1>
          <p className="mt-4 text-base sm:text-lg text-left">
            Browse and compare trusted senior residences near you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-[60rem]">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="p-4 w-full sm:flex-1 rounded-lg"
          />
          <select className="p-4 w-full sm:w-40 rounded-lg">
            <option>Category</option>
            {/* Add more options as needed */}
          </select>
          <input
            type="text"
            placeholder="Location"
            className="p-4 w-full sm:w-40 rounded-lg"
          />
          <button className="px-6 py-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 w-full sm:w-auto">
            Search Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
