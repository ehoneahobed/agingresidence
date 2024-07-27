// components/custom/MapComponent.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  name: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, name }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={24} className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          {name}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
