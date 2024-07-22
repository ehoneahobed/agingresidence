"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { htmlToText } from 'html-to-text';
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Pagination from "@/components/custom/Pagination";

interface Listing {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  categorySlug: string;
  phone: string;
  views: number;
  state: string;
  popular: boolean;
  gallery: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

// Function to truncate the description and strip HTML tags
const truncateDescription = (description: string, maxLength: number) => {
  const plainText = htmlToText(description, {
    wordwrap: false,
    selectors: [{ selector: 'img', format: 'skip' }]
  });
  if (plainText.length <= maxLength) {
    return plainText;
  }
  return plainText.slice(0, maxLength) + '...';
};

// Function to format the title
const formatTitle = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CategoryListingsPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { slug } = params;

  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const listingsPerPage = 10; // Adjust the number of listings per page

  useEffect(() => {
    if (!slug) return;

    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/categories/${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch listings');
        }
        const data = await res.json();
        setListings(data);
        setTotalPages(Math.ceil(data.length / listingsPerPage));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [slug]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * listingsPerPage;
  const currentListings = listings.slice(startIndex, startIndex + listingsPerPage);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const constructImageUrl = (path: string | null) => {
    if (!path) {
      return '/default_image.jpg'; // Return a default image path if path is null or undefined
    }

    if (path.startsWith('/')) {
      return `${baseUrl}${path}`;
    } else {
      return `${baseUrl}/${path}`;
    }
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <main className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
              <Skeleton width={300} />
            </h1>
            <div className="flex flex-wrap -m-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                  <div className="cursor-pointer bg-white p-6 rounded-lg shadow-md flex flex-col h-full">
                    <Skeleton height={160} />
                    <h2 className="text-2xl font-bold text-gray-900 mt-4 flex-grow">
                      <Skeleton width={200} />
                    </h2>
                    <p className="mt-2 text-gray-600 flex-grow">
                      <Skeleton count={3} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
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

  return (
    <div>
      <NavBar />
      <main className="py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{formatTitle(slug)} Listings</h1>
    <div className="flex flex-wrap -m-4">
      {currentListings.map((listing) => (
        <Link key={listing.id} href={`/community/${listing.slug}`} className="w-full sm:w-1/2 lg:w-1/3 p-4">
          <div className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
            <img className="w-full h-40 object-cover rounded-lg" src={constructImageUrl(listing.image)} alt={listing.name} />
            <h2 className="text-2xl font-bold text-gray-900 mt-4 flex-grow">{listing.name}</h2>
            <p className="mt-2 text-gray-600 flex-grow">{truncateDescription(listing.description, 100)}</p>
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

export default CategoryListingsPage;
