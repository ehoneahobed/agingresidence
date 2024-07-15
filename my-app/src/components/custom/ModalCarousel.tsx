import React, { useState } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

interface ModalCarouselProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

const ModalCarousel: React.FC<ModalCarouselProps> = ({ images, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full max-w-4xl mx-auto">
        <button
          className="absolute top-4 right-4 z-50 text-white text-3xl"
          onClick={onClose}
        >
          &times;
        </button>
        <Carousel
          selectedItem={currentIndex}
          onChange={(index) => setCurrentIndex(index)}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          useKeyboardArrows
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full h-96">
              <Image
                src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
                alt={`Gallery image ${index + 1}`}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ModalCarousel;
