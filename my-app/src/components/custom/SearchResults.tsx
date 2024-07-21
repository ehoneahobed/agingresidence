"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';
import SkeletonListingCard from '../skeletons/skeletonListingCard';
import Pagination from '@/components/custom/Pagination';
import Image from 'next/image';

interface Listing {
  slug: string;
  name: string;
  phone: string;
  views: number;
  state: string;
  image: string;
  description: string;
}

const listingsPerPage = 10; // Adjust the number of listings per page

const SearchResultsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const location = searchParams.get('location') || '';
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/listings/search?query=${query}&category=${category}&location=${location}`);
        console.log('Response status:', res.status);

        if (res.status === 404) {
          setNoResults(true);
          setListings([]);
        } else if (!res.ok) {
          throw new Error('Failed to fetch listings or there were no listings found for your search query!');
        } else {
          const data = await res.json();
          console.log('Fetched listings:', data);
          setListings(data);
          setTotalPages(Math.ceil(data.length / listingsPerPage));
        }
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [query, category, location]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * listingsPerPage;
  const currentListings = listings.slice(startIndex, startIndex + listingsPerPage);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div>
      <NavBar />
      <main className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 text-left">Search Results</h1>
          {loading ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
              {[...Array(listingsPerPage)].map((_, index) => (
                <SkeletonListingCard key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="mt-10 text-center">
              <h2 className="text-2xl font-semibold">Oops! No listing found for your search.</h2>
              <p className="mt-4">Try searching for something else</p>
              <Link href="/" className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors mt-4">
                Go back to Home
              </Link>
            </div>
          ) : noResults ? (
            <div className="mt-10 text-center">
              <p className="text-xl font-semibold">No listings found</p>
              <Link href="/" className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors mt-4">
                Go back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-10 grid gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {currentListings.length > 0 ? (
                  currentListings.map((listing) => (
                    <Link key={listing.slug} href={`/community/${listing.slug}`} passHref className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md">
                      <div className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                        <div className="relative w-full h-48">
                          <Image
                            src={`${baseUrl}${listing.image}`}
                            layout="fill"
                            objectFit="cover"
                            alt={listing.name}
                            className="rounded-t-lg"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
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
                  <div className="mt-10 text-center">
                    <p className="text-xl font-semibold">No listings found</p>
                    <Link href="/" className="inline-block bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors mt-4">
                      Go back to Home
                    </Link>
                  </div>
                )}
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
