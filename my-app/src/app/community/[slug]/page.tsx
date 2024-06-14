"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import "leaflet/dist/leaflet.css";

interface Listing {
  slug: string;
  name: string;
  phone: string;
  views: number;
  state: string;
  featuredImage: string;
  gallery: string[];
  popular: boolean;
  description: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const SingleListing: React.FC<{ params: { slug: string } }> = ({ params }) => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { slug } = params;

  useEffect(() => {
    const fetchListing = async () => {
      try {
        // Simulating fetching the listing data from the JSON file
        const res = await fetch("/listing.json");
        if (!res.ok) {
          throw new Error("Listing not found");
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

  if (!listing) {
    return (
      <div>
        <NavBar />
        <main className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">Listing Not Found</h1>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <img className="w-full h-64 object-cover rounded-lg" src={listing.featuredImage} alt={listing.name} />
              <h1 className="text-3xl font-extrabold text-gray-900 mt-6">{listing.name}</h1>
              <div
                className="prose prose-lg mt-4 text-gray-600"
                dangerouslySetInnerHTML={{ __html: listing.description }}
              />
              <div className="flex flex-wrap -mx-2 mt-6">
                <h2 className="w-full text-2xl font-bold mb-4">Gallery</h2>
                {listing.gallery.map((image, index) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                    <img className="w-full h-64 object-cover rounded-lg" src={image} alt={`${listing.name} gallery image ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Location</h2>
                <MapContainer center={[listing.location.latitude, listing.location.longitude]} zoom={13} className="w-full h-64 rounded-lg">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[listing.location.latitude, listing.location.longitude]}>
                    <Popup>
                      {listing.name}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Find the Perfect Assisted Living Community</h2>
                <p className="text-gray-600 mb-4">Connect with top-rated assisted living facilities. Fill out the form below to get started!</p>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" id="full-name" name="full-name" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
                      <input type="text" id="zip-code" name="zip-code" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                      <input type="text" id="phone" name="phone" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="care-needed" className="block text-sm font-medium text-gray-700">Care Needed</label>
                      <select id="care-needed" name="care-needed" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option>Care Needed</option>
                        {/* Add options as needed */}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="relation-to-resident" className="block text-sm font-medium text-gray-700">Relation to Resident</label>
                      <select id="relation-to-resident" name="relation-to-resident" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option>Self</option>
                        {/* Add options as needed */}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="move-in-date" className="block text-sm font-medium text-gray-700">Expected Move-in Date</label>
                      <input type="date" id="move-in-date" name="move-in-date" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
                      <select id="budget" name="budget" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option>Less than $5000</option>
                        {/* Add options as needed */}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Submit</button>
                </form>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Similar Communities</h2>
                <div className="grid gap-4">
                  {/* Mock similar communities - adjust as needed */}
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <img className="w-full h-32 object-cover rounded-lg" src="https://placehold.co/600x400" alt="Similar Community" />
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">Similar Community</h3>
                    <p className="mt-2 text-sm text-gray-600">(123) 456-7890</p>
                    <p className="mt-2 text-sm text-gray-600">State</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-md">
                    <img className="w-full h-32 object-cover rounded-lg" src="https://placehold.co/600x400" alt="Similar Community" />
                    <h3 className="mt-2 text-lg font-semibold text-gray-900">Similar Community</h3>
                    <p className="mt-2 text-sm text-gray-600">(123) 456-7890</p>
                    <p className="mt-2 text-sm text-gray-600">State</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SingleListing;
