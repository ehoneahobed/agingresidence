import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Image from 'next/image';

interface GalleryProps {
  images: string[];
  altText: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, altText }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} useKeyboardArrows autoPlay>
      {images.map((image, index) => (
        <div key={index}>
          {/* <img className="w-full h-64 object-cover rounded-lg" src={`${baseUrl}${image}`} alt={`${altText} gallery image ${index + 1}`} /> */}
          
          <div className="relative w-full h-64">
            <Image
            className="rounded-lg"
            src={`${baseUrl}${image}`}
            alt={`${altText} gallery image ${index + 1}`}
            layout="fill"
            objectFit="cover"
          />
          </div>
          
        </div>
      ))}
    </Carousel>
  );
};

export default Gallery;
