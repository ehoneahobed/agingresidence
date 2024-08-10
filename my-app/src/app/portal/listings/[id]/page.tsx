"use client";
// app/portal/listings/[id]/page.tsx
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/portal/Button';

// Dynamically import React Quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface Listing {
  id: number;
  slug: string;
  name: string;
  phone: string;
  state: string;
  image: string;
  gallery: string[];
  description: string;
  website: string | null;
  operatingHours: string;
  tags: string[];
  locationId: number;
  authorId: number;
  type_of_service: string[];
  status: string;
}

const EditListing: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<Listing | null>(null);
  const [slug, setSlug] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState('');
  const [image, setImage] = useState('');
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [operatingHours, setOperatingHours] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [locationId, setLocationId] = useState<number | null>(null);
  const [authorId, setAuthorId] = useState<number | null>(null);
  const [typeOfService, setTypeOfService] = useState<string[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/portal/listings/${id}`);
      const data = await response.json();

      console.log('Fetched data:', data);

      if (data) {
        setListing(data);
        setSlug(data.slug || '');
        setName(data.name || '');
        setPhone(data.phone || '');
        setState(data.state || '');
        setImage(data.image || '');
        setGallery(Array.isArray(data.gallery) ? data.gallery : []);
        setDescription(data.description || '');
        setWebsite(data.website || '');
        setOperatingHours(data.operatingHours || '');
        setTags(Array.isArray(data.tags) ? data.tags : []);
        setLocationId(data.locationId ?? null);
        setAuthorId(data.authorId ?? null);
        setTypeOfService(Array.isArray(data.type_of_service) ? data.type_of_service : []);
        setStatus(data.status || 'draft');

        console.log(`Here is the listing after parsing: ${data}`);
      } else {
        console.error('Error: Invalid data structure', data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/portal/listings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          name,
          phone,
          state,
          image,
          gallery,
          description,
          website,
          operatingHours,
          tags,
          locationId,
          authorId,
          type_of_service: typeOfService,
          status,
        }),
      });

      if (response.ok) {
        router.push('/portal/listings');
      } else {
        console.error('Error updating listing');
      }
    } catch (error) {
      console.error('Error updating listing:', error);
    }
  };

  if (!listing) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-teal-700">Edit Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gallery</label>
          <input
            type="text"
            value={gallery.join(',')}
            onChange={(e) => setGallery(e.target.value.split(','))}
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <ReactQuill value={description} onChange={setDescription} className="mb-4" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Website</label>
          <input
            type="text"
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Operating Hours</label>
          <input
            type="text"
            value={operatingHours}
            onChange={(e) => setOperatingHours(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          <input
            type="text"
            value={tags.join(',')}
            onChange={(e) => setTags(e.target.value.split(','))}
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <select
            value={locationId ?? ''}
            onChange={(e) => setLocationId(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg w-full"
            required
          >
            {/* Assuming locations are available from another source */}
            {/* Map locations here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <select
            value={authorId ?? ''}
            onChange={(e) => setAuthorId(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg w-full"
            required
          >
            {/* Assuming authors are available from another source */}
            {/* Map authors here */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Type of Service</label>
          <input
            type="text"
            value={typeOfService.join(',')}
            onChange={(e) => setTypeOfService(e.target.value.split(','))}
            className="px-4 py-2 border rounded-lg w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full"
            required
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <Button type="submit" className="bg-teal-500 text-white hover:bg-teal-400">
          Update Listing
        </Button>
      </form>
    </div>
  );
};

export default EditListing;
