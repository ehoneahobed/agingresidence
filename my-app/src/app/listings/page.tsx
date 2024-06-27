"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';
import Filters from '@/components/custom/Filters';
import Pagination from '@/components/custom/Pagination';
import LoadingSpinner from '@/components/custom/LoadingSpinner';

interface Listing {
  slug: string;
  name: string;
  phone: string;
  views: number;
  state: string;
  image: string;
  popular: boolean;
  description: string;
}

const listingsPerPage = 9;

const AllListings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<{ state: string; popular: boolean }>({ state: '', popular: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch('/api/listings');
        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data: Listing[] = await res.json();
        setListings(data);
        setFilteredListings(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      const filtered = listings.filter((listing) => {
        return (
          (filters.state === '' || listing.state === filters.state) &&
          (!filters.popular || listing.popular)
        );
      });
      setFilteredListings(filtered);
    };

    applyFilters();
  }, [filters, listings]);

  const handleFilterChange = (newFilters: { state: string; popular: boolean }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <LoadingSpinner/>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <main className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">{error}</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <Link key={index} href={`community/${listing.slug}`} passHref className="bg-white rounded-lg shadow-md overflow-hidden">
                <div>
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
              </Link>
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
