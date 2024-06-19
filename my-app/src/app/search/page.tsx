"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';

interface Listing {
  slug: string;
  name: string;
  phone: string;
  views: number;
  state: string;
  image: string;
  description: string;
}

const SearchResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const location = searchParams.get('location') || '';
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/listings/search?query=${query}&category=${category}&location=${location}`);
        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await res.json();
        setListings(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [query, category, location]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <NavBar />
      <main className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-left">Search Results</h1>
          <div className="mt-10 grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {listings.length > 0 ? (
              listings.map((listing) => (
                <Link key={listing.slug} href={`/community/${listing.slug}`} passHref className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md">
                  <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img className="w-full h-48 object-cover" src={listing.image} alt={listing.name} />
                    <div className="p-6">
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">{listing.name}</h3>
                      <p className="mt-3 text-gray-600">{listing.phone}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-gray-600">{listing.state}</span>
                        <div className="flex items-center text-gray-600">
                          <svg className="w-6 h-6 mr-1 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.44l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"></path>
                          </svg>
                          {listing.views}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p>No listings found</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
