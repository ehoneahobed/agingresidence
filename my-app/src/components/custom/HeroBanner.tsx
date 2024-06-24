"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: number;
  name: string;
}

const HeroBanner: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const queryParams = new URLSearchParams({
      ...(query && { query }),
      ...(category && { category }),
      ...(location && { location }),
    }).toString();

    router.push(`/search?${queryParams}`);
  };

  return (
    <div className="relative bg-cover bg-center h-screen md:h-[60vh]" style={{ backgroundImage: "url('https://agingresidence.com/listing_images/aging_residence_images/aging-residence-banner1.jpg')" }}>
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
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row mt-8 space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-[60rem]">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-4 w-full sm:flex-1 rounded-lg text-teal-950"
          />
          <select
            value={category}
            
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 w-full sm:w-40 appearance-none rounded-lg text-teal-950 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-4 w-full sm:w-40 rounded-lg text-teal-950"
          />
          <button type="submit" className="px-6 py-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 w-full sm:w-auto">
            Search Listing
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroBanner;
