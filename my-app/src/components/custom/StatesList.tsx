"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface StateData {
  state: string;
  abbreviation: string;
  facilities: number;
}

const StatesList: React.FC = () => {
  const [statesData, setStatesData] = useState<StateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        const res = await fetch('/api/listings/count-by-state');
        if (!res.ok) {
          throw new Error('Failed to fetch state data');
        }
        const data = await res.json();
        setStatesData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStateData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Explore by State</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {statesData.map((state, index) => (
            <Link key={index} href={`/states/${state.abbreviation.toLowerCase()}`} passHref className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold text-gray-800">{state.state} ({state.abbreviation})</span>
              </div>
              <p className="mt-2 text-gray-600">{state.facilities} facilities</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatesList;
