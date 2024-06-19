"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import NavBar from '@/components/custom/NavBar';
import Footer from '@/components/custom/Footer';
import "leaflet/dist/leaflet.css";
import Image from 'next/image';

interface Listing {
  id: number;
  slug: string;
  name: string;
  phone: string;
  views: number;
  state: string;
  image: string;
  gallery: string; // Update gallery to string
  popular: boolean;
  description: string;
  rating: number;
  website: string;
  operatingHours: string;
  tags: string; // Update tags to string
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

const SingleListing: React.FC = () => {
  const { slug } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    zipCode: '',
    phone: '',
    careNeeded: '',
    relationToResident: '',
    moveInDate: '',
    budget: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (typeof slug !== 'string') {
      return;
    }

    const fetchListing = async () => {
      try {
        const res = await fetch(`/api/listings/${slug}`);
        if (!res.ok) {
          throw new Error('Failed to fetch listing');
        }
        const data: Listing = await res.json();
        // Parse the tags and gallery fields
        data.tags = JSON.parse(data.tags as unknown as string);
        data.gallery = JSON.parse(data.gallery as unknown as string);
        setListing(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/service-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          listingId: listing?.id,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit service request');
      }

      setFormSuccess('Your request has been submitted successfully.');
      setFormError(null);
      setFormData({
        fullName: '',
        email: '',
        zipCode: '',
        phone: '',
        careNeeded: '',
        relationToResident: '',
        moveInDate: '',
        budget: '',
      });
    } catch (error: any) {
      setFormError(error.message);
      setFormSuccess(null);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!listing) {
    return <p>Listing not found</p>;
  }

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
                  loader={() => listing.image}
                  src={listing.image}
                  alt={listing.name}
                  layout="fill"
                  objectFit="cover"
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
              <div
                className="prose prose-lg mt-4 text-gray-600"
                dangerouslySetInnerHTML={{ __html: listing.description }}
              />
              <div className="flex flex-wrap -mx-2 mt-6">
                <h2 className="w-full text-2xl font-bold mb-4">Gallery</h2>
                {Array.isArray(listing.gallery) && listing.gallery.map((image, index) => (
                  <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
                    <img className="w-full h-64 object-cover rounded-lg" src={image} alt={`${listing.name} gallery image ${index + 1}`} />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Website:</span> <a href={listing.website} className="text-teal-500 hover:underline">{listing.website}</a></p>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Phone:</span> {listing.phone}</p>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Address:</span> {listing.location.address}</p>
                <p className="text-lg text-gray-600 mt-2"><span className="font-bold">Operating Hours:</span> {listing.operatingHours}</p>
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
                {formError && <p className="text-red-500">{formError}</p>}
                {formSuccess && <p className="text-green-500">{formSuccess}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" id="full-name" name="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email <span className="text-red-500">*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="zip-code" className="block text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
                      <input type="text" id="zip-code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                      <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="care-needed" className="block text-sm font-medium text-gray-700">Care Needed</label>
                      <select id="care-needed" name="careNeeded" value={formData.careNeeded} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option value="">Select Care Needed</option>
                        <option value="assistedLiving">Assisted Living</option>
                        <option value="memoryCare">Memory Care</option>
                        <option value="independentLiving">Independent Living</option>
                        <option value="nursingHome">Nursing Home</option>
                        <option value="respiteCare">Respite Care</option>
                        <option value="hospiceCare">Hospice Care</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="relation-to-resident" className="block text-sm font-medium text-gray-700">Relation to Resident</label>
                      <select id="relation-to-resident" name="relationToResident" value={formData.relationToResident} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option value="">Select Relation</option>
                        <option value="self">Self</option>
                        <option value="spouse">Spouse</option>
                        <option value="child">Child</option>
                        <option value="otherRelative">Other Relative</option>
                        <option value="friend">Friend</option>
                        <option value="professional">Professional</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="move-in-date" className="block text-sm font-medium text-gray-700">Expected Move-in Date</label>
                      <input type="date" id="move-in-date" name="moveInDate" value={formData.moveInDate} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-gray-700">Budget</label>
                      <select id="budget" name="budget" value={formData.budget} onChange={handleInputChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                        <option value="">Select Budget</option>
                        <option value="lessThan5000">Less than $5000</option>
                        <option value="5000to10000">$5000 to $10000</option>
                        <option value="10000to15000">$10000 to $15000</option>
                        <option value="15000to20000">$15000 to $20000</option>
                        <option value="moreThan20000">More than $20000</option>
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
