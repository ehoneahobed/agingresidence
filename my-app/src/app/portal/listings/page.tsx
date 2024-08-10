// app/listings/page.tsx
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Pagination from "@/components/portal/Pagination"
import Button from '@/components/portal/Button';

interface Listing {
  id: number;
  name: string;
  phone: string;
  state: string;
}

const Listings: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const pageSize = 10;

  useEffect(() => {
    fetchListings();
  }, [currentPage, filter, sortField, sortOrder]);

  const fetchListings = async () => {
    try {
      const response = await fetch(`/api/portal/listings?page=${currentPage}&pageSize=${pageSize}&filter=${filter}&sortField=${sortField}&sortOrder=${sortOrder}`);
      const data = await response.json();
      setListings(data.listings);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching listings', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (field: string) => {
    setSortField(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4 text-teal-700">Listings</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
        <div>
          <Button onClick={() => handleSortChange('name')} className="mr-2">
            Sort by Name {sortField === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
          </Button>
          <Button onClick={() => handleSortChange('state')}>
            Sort by State {sortField === 'state' && (sortOrder === 'asc' ? '↑' : '↓')}
          </Button>
        </div>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-teal-700 text-white">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">State</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing.id} className="border-t hover:bg-gray-100 transition-colors duration-200">
              <td className="p-4">{listing.name}</td>
              <td className="p-4">{listing.phone}</td>
              <td className="p-4">{listing.state}</td>
              <td className="p-4 flex space-x-2">
                <Link href={`/portal/listings/${listing.id}`}>
                  <Button className="bg-teal-500 p-2 text-white hover:bg-teal-400">Edit</Button>
                </Link>
                <Button className="bg-red-500 p-2 text-white hover:bg-red-400">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default Listings;
