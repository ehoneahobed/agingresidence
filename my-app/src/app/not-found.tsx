'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';

const NotFoundPage: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const logError = async () => {
      try {
        const response = await fetch('/api/log-404', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: window.location.href }),
        });

        if (!response.ok) {
          console.error('Failed to log 404 error');
        }
      } catch (error) {
        console.error('Error logging 404 error:', error);
      }
    };

    logError();
  }, [pathname]);

  return (
    <div>
        <NavBar/>
        <div className="min-h-35 flex flex-col items-center justify-center bg-gray-50 px-6 py-20">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-teal-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
        <Link href="/" passHref className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-300">
            Go Back Home
        </Link>
      </div>
    </div>
        <Footer/>
    </div>
  );
};

export default NotFoundPage;
