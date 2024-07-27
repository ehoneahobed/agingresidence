// components/custom/LocationMap.tsx
import React from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./MapComponent'), { ssr: false });

interface LocationMapProps {
  latitude: number;
  longitude: number;
  name: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ latitude, longitude, name }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Location</h2>
      <div className="relative w-full h-64">
        <DynamicMap latitude={latitude} longitude={longitude} name={name} />
      </div>
    </div>
  );
};

export default LocationMap;
