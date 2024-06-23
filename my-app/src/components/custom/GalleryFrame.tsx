import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

interface GalleryProps {
  images: string[];
  altText: string;
}

const Gallery: React.FC<GalleryProps> = ({ images, altText }) => {
  return (
    <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} useKeyboardArrows autoPlay>
      {images.map((image, index) => (
        <div key={index}>
          <img className="w-full h-64 object-cover rounded-lg" src={image} alt={`${altText} gallery image ${index + 1}`} />
        </div>
      ))}
    </Carousel>
  );
};

export default Gallery;
