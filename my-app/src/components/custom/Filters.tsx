"use client"
import React, { useState } from 'react';

interface FiltersProps {
  onFilterChange: (filters: { state: string; popular: boolean }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [state, setState] = useState('');
  const [popular, setPopular] = useState(false);

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
    onFilterChange({ state: e.target.value, popular });
  };

  const handlePopularChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPopular(e.target.checked);
    onFilterChange({ state, popular: e.target.checked });
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Filters</h3>
      <div className="flex flex-col sm:flex-row sm:space-x-4">
        <div className="mb-4 sm:mb-0">
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <select
            id="state"
            name="state"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            value={state}
            onChange={handleStateChange}
          >
            <option value="">All States</option>
            <option value="MA">Massachusetts</option>
            <option value="TX">Texas</option>
            <option value="AZ">Arizona</option>
            {/* Add more states as needed */}
          </select>
        </div>
        <div className="flex items-center">
          <input
            id="popular"
            name="popular"
            type="checkbox"
            className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
            checked={popular}
            onChange={handlePopularChange}
          />
          <label htmlFor="popular" className="ml-2 block text-sm font-medium text-gray-700">
            Popular
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;
