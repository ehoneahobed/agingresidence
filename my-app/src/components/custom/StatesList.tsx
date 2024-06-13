import React from 'react';
import Link from 'next/link';

const statesData = [
  { state: "Albuquerque, NM", facilities: 36 },
  { state: "Anaheim, CA", facilities: 68 },
  { state: "Atlanta, GA", facilities: 48 },
  { state: "Austin, TX", facilities: 43 },
  { state: "Baltimore, MD", facilities: 37 },
  { state: "Boston, MA", facilities: 81 },
  { state: "Boynton Beach, FL", facilities: 57 },
  { state: "Buffalo, NY", facilities: 27 },
  { state: "Charlotte, NC", facilities: 27 },
  { state: "Chicago, IL", facilities: 57 },
  { state: "Cleveland, OH", facilities: 50 },
  { state: "Colorado Springs, CO", facilities: 43 },
  { state: "Columbus, OH", facilities: 73 },
  { state: "Dallas, TX", facilities: 65 },
  { state: "Denver, CO", facilities: 64 },
  { state: "Fairfax, VA", facilities: 44 },
  { state: "Fairfield, CT", facilities: 19 },
  { state: "Fort Worth, TX", facilities: 40 },
  { state: "Fresno, CA", facilities: 35 },
  { state: "Glendale, AZ", facilities: 133 },
  { state: "Greenville, SC", facilities: 32 },
  { state: "Houston, TX", facilities: 90 },
  { state: "Jacksonville, FL", facilities: 51 },
  { state: "Kansas City, MO", facilities: 18 },
  { state: "Knoxville, TN", facilities: 33 },
  { state: "Las Vegas, NV", facilities: 27 },
  { state: "Los Angeles, CA", facilities: 101 },
  { state: "Louisville, KY", facilities: 49 },
  { state: "Mesa, AZ", facilities: 70 },
  { state: "Miami, FL", facilities: 68 },
  { state: "Milwaukee, WI", facilities: 104 },
  { state: "Minneapolis, MN", facilities: 125 },
  { state: "New York, NY", facilities: 47 },
  { state: "Oklahoma City, OK", facilities: 46 },
  { state: "Orlando, FL", facilities: 37 },
  { state: "Overland Park, KS", facilities: 65 },
  { state: "Philadelphia, PA", facilities: 40 },
  { state: "Phoenix, AZ", facilities: 125 },
  { state: "Pittsburgh, PA", facilities: 34 },
  { state: "Plano, TX", facilities: 77 },
];

const StatesList: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Explore by State</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
          {statesData.map((state, index) => (
            <Link key={index} href={`/states/${state.state.replace(/, /g, '-').toLowerCase()}`} passHref className="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-800">{state.state}</span>
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
