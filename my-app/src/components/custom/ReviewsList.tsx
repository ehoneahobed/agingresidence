import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { MdOutlineRateReview } from 'react-icons/md';
import ReviewForm from './ReviewForm';

interface Review {
  id: number;
  text: string;
  rating: number;
  reviewerName: string;
  createdAt: string;
  relationship: string;
  careType: string;
  foodRating?: number;
  activitiesRating?: number;
  staffRating?: number;
  facilityRating?: number;
  valueRating?: number;
}

const ReviewsList = ({ listingId }: { listingId: number }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    console.log('useEffect called with listingId:', listingId);

    const fetchReviews = async () => {
      console.log('Fetching reviews for listingId:', listingId);
      try {
        const res = await fetch(`/api/listings/${listingId}/reviews`);
        console.log('Fetch response:', res);

        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }

        const data = await res.json();
        console.log('Fetched reviews data:', data);
        setReviews(data);
      } catch (error: any) {
        console.error('Error fetching reviews:', error);
        setError(error.message);
      }
    };

    fetchReviews();
  }, [listingId]);

  if (error) {
    console.error('Error state:', error);
    return <p>{error}</p>;
  }

  console.log('Reviews state:', reviews);

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, index) => (
        <AiFillStar
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Reviews from Our Audience</h2>
        <button 
          onClick={() => setShowReviewForm(true)} 
          className="flex items-center bg-teal-500 text-white px-4 py-2 rounded"
        >
          <MdOutlineRateReview className="mr-2" />
          Write a review
        </button>
      </div>
      {showReviewForm && <ReviewForm listingId={listingId} onClose={() => setShowReviewForm(false)} />}
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to leave a review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg mr-2">{review.reviewerName}</h3>
              <span className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center mb-2">
              {renderStars(review.rating)}
              <span className="ml-2 font-bold">{review.rating} / 5</span>
            </div>
            <p className="mb-2">{review.text}</p>
            
            <hr className="my-4" />

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
              {review.foodRating !== undefined && review.foodRating > 0 && (
                <div className="flex items-center">
                  <span className="font-bold">Food: </span>
                  {renderStars(review.foodRating)}
                </div>
              )}
              {review.activitiesRating !== undefined && review.activitiesRating > 0 && (
                <div className="flex items-center">
                  <span className="font-bold">Activities: </span>
                  {renderStars(review.activitiesRating)}
                </div>
              )}
              {review.staffRating !== undefined && review.staffRating > 0 && (
                <div className="flex items-center">
                  <span className="font-bold">Staff: </span>
                  {renderStars(review.staffRating)}
                </div>
              )}
              {review.facilityRating !== undefined && review.facilityRating > 0 && (
                <div className="flex items-center">
                  <span className="font-bold">Facility: </span>
                  {renderStars(review.facilityRating)}
                </div>
              )}
              {review.valueRating !== undefined && review.valueRating > 0 && (
                <div className="flex items-center">
                  <span className="font-bold">Value: </span>
                  {renderStars(review.valueRating)}
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between flex-wrap text-sm text-gray-700">
              <div>
                <span className="font-bold">Relationship: </span>
                {review.relationship}
              </div>
              <div>
                <span className="font-bold">Care Type: </span>
                {review.careType}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsList;
