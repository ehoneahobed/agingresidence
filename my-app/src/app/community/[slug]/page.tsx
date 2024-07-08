"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';
import Image from 'next/image';
import ContactInformation from '@/components/custom/ContactInformation';
import OperatingHours from '@/components/custom/OperatingHours';
import LocationMap from '@/components/custom/LocationMap';
import SimilarCommunities from '@/components/custom/SimilarCommunities';
import ServiceRequestForm from '@/components/custom/ServiceRequestForm';
import Gallery from '@/components/custom/GalleryFrame';
import ListingReview from '@/components/custom/ListingReview';
import LoadingSpinner from '@/components/custom/LoadingSpinner';

interface Listing {
  id: number;
  slug: string;
  name: string;
  phone: string;
  views: number;
  state: string;
  image: string;
  gallery: string[];
  popular: boolean;
  description: string;
  rating: number;
  website: string;
  operatingHours: { [key: string]: string }[];
  tags: string[];
  review_generated: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

interface SimilarListing {
  id: number;
  slug: string;
  name: string;
  phone: string;
  image: string;
  location: {
    address: string;
  };
}

const SingleListing: React.FC = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const { slug } = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [similarListings, setSimilarListings] = useState<SimilarListing[]>([]);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof slug !== 'string') {
      return;
    }

    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${slug}`);
        if (!res.ok) {
          if (res.status === 404) {
            router.push(`/404?url=${encodeURIComponent(window.location.href)}`);
          }
          throw new Error('Failed to fetch listing');
        }
        const data: Listing = await res.json();
        setListing(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  useEffect(() => {
    if (listing) {
      const fetchSimilarListings = async () => {
        try {
          const res = await fetch(`/api/listings/similar?slug=${listing.slug}`);
          if (!res.ok) {
            throw new Error('Failed to fetch similar listings');
          }
          const data: SimilarListing[] = await res.json();
          setSimilarListings(data);
        } catch (error: any) {
          console.error(error.message);
        }
      };

      fetchSimilarListings();
    }
  }, [listing]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!listing) {
    return <p>Listing not found</p>;
  }

  // Split the description into paragraphs
  const paragraphs = listing.description.split('. ').map((text, index) => (
    <p key={index} className="mb-4">{text}.</p>
  ));

  return (
    <div>
      <NavBar />
      <main className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="relative w-full h-64">
                <Image
                  className="rounded-lg"
                  src={`${baseUrl}${listing.image}`}
                  alt={listing.name}
                  layout="fill"
                  objectFit="cover"
                  quality={100}
                />

              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-6">{listing.name}</h1>
              <div className="flex items-center mt-2">
                <p className="text-lg text-gray-600 mt-2">Rating: {listing.rating || 'No ratings yet'} / 5</p>
                <div className="flex items-center ml-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${index < listing.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049.906a1 1 0 011.902 0l1.4 3.583a1 1 0 00.95.691h3.794a1 1 0 01.591 1.81l-3.067 2.41a1 1 0 00-.342 1.11l1.25 3.42a1 1 0 01-1.544 1.154l-3.008-2.06a1 1 0 00-1.13 0L5.06 14.084a1 1 0 01-1.544-1.154l1.25-3.42a1 1 0 00-.342-1.11L1.357 6.99a1 1 0 01.591-1.81h3.794a1 1 0 00.95-.691L8.092.906z" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center mt-2">
                {Array.isArray(listing.tags) && listing.tags.map((tag, index) => (
                  <span key={index} className="bg-teal-100 text-teal-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <div className="prose prose-lg mt-4 text-gray-600 text-justify">
                {paragraphs}
              </div>
              <ListingReview review={listing.review_generated} />
              <Gallery images={listing.gallery} altText={listing.name} />
              <ContactInformation phone={listing.phone} website={listing.website} address={listing.location.address} />
              <OperatingHours hours={listing.operatingHours} />
              <LocationMap latitude={listing.location.latitude} longitude={listing.location.longitude} name={listing.name} />
            </div>
            <div>
              <ServiceRequestForm
                listingId={listing.id}
                onSubmitSuccess={(message) => setFormSuccess(message)}
                onSubmitError={(message) => setFormError(message)}
              />
              <SimilarCommunities listings={similarListings} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleListing;
