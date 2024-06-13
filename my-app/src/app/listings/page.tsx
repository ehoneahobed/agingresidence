"use client"
import React, {useState} from 'react';

import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';
import Filters from '@/components/custom/Filters';
import Pagination from '@/components/custom/Pagination';


const allListings = [
    {
      name: "Edelweiss Assisted Living",
      phone: "(857) 547-2000",
      views: 57,
      state: "MA",
      image: "https://placehold.co/600x400",
      popular: true,
    },
    {
      name: "Golden Years Assisted Living",
      phone: "(409) 745-9096",
      views: 30,
      state: "TX",
      image: "https://placehold.co/600x400",
      popular: true,
    },
    {
      name: "Glencroft Senior Living",
      phone: "(623) 939-9475",
      views: 32,
      state: "AZ",
      image: "https://placehold.co/600x400",
      popular: true,
    },
    {
      name: "Tanner Terrace Apartments",
      phone: "(623) 939-9447",
      views: 25,
      state: "AZ",
      image: "https://placehold.co/600x400",
      popular: true,
    },
    {
      name: "Glencroft Center for Modern Aging",
      phone: "(623) 939-9475",
      views: 42,
      state: "AZ",
      image: "https://placehold.co/600x400",
      popular: true,
    },
    {
      name: "Holiday Westgate Village",
      phone: "(623) 233-0425",
      views: 20,
      state: "AZ",
      image: "https://placehold.co/600x400",
      popular: true,
    },
    // Add more listings as needed
  ];
  
  const listingsPerPage = 3;
  
  const AllListings: React.FC = () => {
    const [filters, setFilters] = useState<{ state: string; popular: boolean }>({ state: '', popular: false });
    const [currentPage, setCurrentPage] = useState(1);
  
    const handleFilterChange = (newFilters: { state: string; popular: boolean }) => {
      setFilters(newFilters);
      setCurrentPage(1); // Reset to the first page when filters change
    };
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };
  
    const filteredListings = allListings.filter((listing) => {
      return (
        (filters.state === '' || listing.state === filters.state) &&
        (!filters.popular || listing.popular)
      );
    });
  
    const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
    const paginatedListings = filteredListings.slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage);
  
    return (
      <div>
        <NavBar />
        <main className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">All Listings</h1>
            <p className="mt-4 text-lg text-gray-600 text-center">
              Browse through our comprehensive list of senior living communities.
            </p>
            <Filters onFilterChange={handleFilterChange} />
            <div className="mt-10 grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {paginatedListings.map((listing, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img className="w-full h-48 object-cover" src={listing.image} alt={listing.name} />
                  <div className="p-6">
                    {listing.popular && <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide">Popular</span>}
                    <h3 className="mt-2 text-xl font-semibold text-gray-900">{listing.name}</h3>
                    <p className="mt-3 text-gray-600">
                      <span className="inline-block align-middle">
                        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 13.232a3 3 0 01-4.264 0l-5-5a3 3 0 114.264-4.264l.768.768a2 2 0 002.828 0l.768-.768a3 3 0 014.264 4.264l-5 5z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 10.28V21a2 2 0 01-2 2H8a2 2 0 01-2-2v-10.72a4.002 4.002 0 015.272-5.272l.728.728a4 4 0 005.272 0l.728-.728A4.002 4.002 0 0118 10.28z"></path>
                        </svg>
                      </span>
                      {listing.phone}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-600">{listing.state}</span>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-6 h-6 mr-1 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.44l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"></path>
                        </svg>
                        {listing.views}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </main>
        <Footer />
      </div>
    );
  };
  
  export default AllListings;