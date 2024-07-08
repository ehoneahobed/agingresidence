"use client"
// app/categories/page.tsx
import { useEffect, useState } from 'react';
import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';
import Link from 'next/link';
import Image from 'next/image';
import LoadingSpinner from '@/components/custom/LoadingSpinner';

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div>
        <NavBar />
        <LoadingSpinner />
        <Footer />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const constructImageUrl = (path: string | null) => {
    if (!path) {
      return '/default_image.jpg'; // Return a default image path if path is null or undefined
    }

    if (path.startsWith('/')) {
      console.log(`Full catgeory image url: ${baseUrl}${path}`)
      return `${baseUrl}${path}`;
    } else {
      console.log(`Full catgeory image url: ${baseUrl}${path}`)
      return `${baseUrl}/${path}`;
    }
  };

  return (
    <div>
      <NavBar />
      <main className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">All Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <div className="cursor-pointer bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative w-full h-40">
                    <Image
                      className="rounded-lg"
                      src={constructImageUrl(category.image)}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-4">{category.name}</h2>
                  <p className="mt-2 text-gray-600">{category.description}</p>
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

export default CategoriesPage;
