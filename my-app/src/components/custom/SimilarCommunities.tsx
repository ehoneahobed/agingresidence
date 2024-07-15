import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SkeletonSimilarCommunity from '../skeletons/skeletonSimilarCommunity';

interface SimilarListing {
  id: number;
  slug: string;
  name: string;
  phone: string;
  image: string;
}

interface SimilarCommunitiesProps {
  listings: SimilarListing[];
  loading: boolean;
}

const SimilarCommunities: React.FC<SimilarCommunitiesProps> = ({ listings, loading }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Communities</h2>
        <div className="grid gap-4">
          {[...Array(3)].map((_, index) => (
            <SkeletonSimilarCommunity key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Communities</h2>
      <div className="grid gap-4">
        {listings.length > 0 ? (
          listings.map((similar) => (
            <div key={similar.id} className="bg-white p-2 rounded-lg shadow-md">
              <Link href={`/community/${similar.slug}`}>
                <div className="relative w-full h-32">
                  <Image
                    className="object-cover rounded-lg"
                    src={`${baseUrl}${similar.image}`}
                    alt={similar.name}
                    layout="fill"
                  />
                </div>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">{similar.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{similar.phone}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>No similar communities found.</p>
        )}
      </div>
    </div>
  );
};

export default SimilarCommunities;
