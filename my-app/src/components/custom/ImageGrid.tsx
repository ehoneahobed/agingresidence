import React, { useState } from 'react';
import Image from 'next/image';
import ModalCarousel from './ModalCarousel';

interface ImageGridProps {
  images: string[];
  altText: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, altText }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const imagesToShow = images.slice(0, 9); // Show only the first 9 images

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {imagesToShow.map((image, index) => (
          <div key={index} className="relative w-full h-48 cursor-pointer" onClick={() => handleImageClick(index)}>
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
              alt={`${altText} gallery image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        ))}
      </div>
      {selectedImage !== null && (
        <ModalCarousel
          images={images}
          initialIndex={selectedImage}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default ImageGrid;
