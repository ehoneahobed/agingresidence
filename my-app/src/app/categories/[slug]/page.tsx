"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { htmlToText } from 'html-to-text';
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

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

const CategoryListingsPage: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const { slug } = params;

  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [slug]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <main className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">Loading...</h1>
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
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">{slug} Listings</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/community/${listing.slug}`}>
                <div className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img className="w-full h-40 object-cover rounded-lg" src={listing.image} alt={listing.name} />
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">{listing.name}</h2>
                  <p className="mt-2 text-gray-600">{truncateDescription(listing.description, 100)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryListingsPage;
