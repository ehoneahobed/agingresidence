import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';
import Link from 'next/link';

interface Review {
  link: string;
  rating: number;
  date: string;
  user: {
    name: string;
    link: string;
    thumbnail: string;
  };
  snippet: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
  listingName: string;
}

interface ArrowProps {
  onClick: () => void;
}

const CustomLeftArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 transform -translate-y-1/2 top-1/2 bg-gray-700 text-white p-2 rounded-full"
    style={{ zIndex: 10 }}
  >
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 19l-7-7 7-7"
      ></path>
    </svg>
  </button>
);

const CustomRightArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 transform -translate-y-1/2 top-1/2 bg-gray-700 text-white p-2 rounded-full"
    style={{ zIndex: 10 }}
  >
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5l7 7-7 7"
      ></path>
    </svg>
  </button>
);

const ReviewsCarousel: React.FC<ReviewsCarouselProps> = ({ reviews, listingName }) => {
  const googleSearchLink = `https://www.google.com/search?q=${encodeURIComponent(listingName)}+reviews`;

  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div className="reviews-carousel relative">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
        <p className="text-gray-600">Total Reviews: {totalReviews}</p>
        <p className="text-gray-600">Average Rating: {averageRating} / 5</p>
      </div>
      <Carousel
        responsive={responsive}
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={20000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        customLeftArrow={<CustomLeftArrow onClick={() => {}} />}
        customRightArrow={<CustomRightArrow onClick={() => {}} />}
        arrows={true} // Show custom arrows
      >
        {reviews.map((review, index) => (
          <div key={index} className="review-card p-8 bg-white rounded-lg shadow-md mx-4 w-auto">
            <div className="flex items-center justify-between my-4 pl-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049.906a1 1 0 011.902 0l1.4 3.583a1 1 0 00.95.691h3.794a1 1 0 01.591 1.81l-3.067 2.41a1 1 0 00-.342 1.11l1.25 3.42a1 1 0 01-1.544 1.154l-3.008-2.06a1 1 0 00-1.13 0L5.06 14.084a1 1 0 01-1.544-1.154l1.25-3.42a1 1 0 00-.342-1.11L1.357 6.99a1 1 0 01.591-1.81h3.794a1 1 0 00.95-.691L8.092.906z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center">
                <Image src="/google_logo.png" alt="Google Logo" width={20} height={20} className="ml-2" />
              </div>
            </div>
            <p className="text-gray-600 my-8 px-4">{review.snippet}</p>
            <hr className="my-2" />
            <div className="text-right mt-2">
              <Link href={review.link} target="_blank" className="text-teal-500 underline">Read on Google Reviews</Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ReviewsCarousel;
