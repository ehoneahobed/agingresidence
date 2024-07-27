import React, { useState, ChangeEvent, FormEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';

interface ReviewFormProps {
  listingId: number;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ listingId, onClose }) => {
  const [text, setText] = useState<string>('');
  const [rating, setRating] = useState<number>(0);
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerEmail, setReviewerEmail] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('');
  const [careType, setCareType] = useState<string>('');
  const [foodRating, setFoodRating] = useState<number>(0);
  const [activitiesRating, setActivitiesRating] = useState<number>(0);
  const [staffRating, setStaffRating] = useState<number>(0);
  const [facilityRating, setFacilityRating] = useState<number>(0);
  const [valueRating, setValueRating] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleRatingChange = (rating: number, setRatingFunction: React.Dispatch<React.SetStateAction<number>>) => {
    setRatingFunction(rating);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const review = {
      text,
      rating,
      listingId,
      reviewerName,
      reviewerEmail,
      relationship,
      careType,
      foodRating,
      activitiesRating,
      staffRating,
      facilityRating,
      valueRating,
    };

    try {
      const res = await fetch(`/api/listings/${listingId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (res.ok) {
        setSuccess(true);
        setText('');
        setRating(0);
        setReviewerName('');
        setReviewerEmail('');
        setRelationship('');
        setCareType('');
        setFoodRating(0);
        setActivitiesRating(0);
        setStaffRating(0);
        setFacilityRating(0);
        setValueRating(0);
        // Close the modal after showing success message for a short time
        setTimeout(() => {
          setIsSubmitting(false);
          onClose();
        }, 5000);
      } else {
        setError('Failed to submit review');
        setIsSubmitting(false);
      }
    } catch (error) {
      setError('Failed to submit review');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="relative bg-white w-full max-w-5xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">How would you rate this community?</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  onClick={() => handleRatingChange(star, setRating)}
                />
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">What should care seekers or potential residents know?</label>
            <textarea
              value={text}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Reviewer Name</label>
            <input
              type="text"
              value={reviewerName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setReviewerName(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={reviewerEmail}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setReviewerEmail(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Relationship to provider</label>
            <select
              value={relationship}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setRelationship(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select</option>
              <option value="Visited">I visited this facility</option>
              <option value="Resident">I am/was a resident of this facility</option>
              <option value="Relative">I am a friend or relative of a current/past resident</option>
              <option value="Employee">I am an employee</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Care type or service being reviewed</label>
            <select
              value={careType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setCareType(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
            >
              <option value="">Select</option>
              <option value="Independent Living">Independent Living</option>
              <option value="Assisted Living">Assisted Living</option>
              <option value="Memory Care">Memory Care</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Food (optional)</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= foodRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star, setFoodRating)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Activities (optional)</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= activitiesRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star, setActivitiesRating)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Staff (optional)</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= staffRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star, setStaffRating)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Facility (optional)</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= facilityRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star, setFacilityRating)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Value (optional)</label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= valueRating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => handleRatingChange(star, setValueRating)}
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`mt-4 w-full bg-teal-500 text-white py-2 px-4 rounded-md ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'hover:bg-teal-600 focus:outline-none focus:bg-teal-600'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
        {success && <p className="text-green-500 mt-4 text-center">Review submitted for approval!</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ReviewForm;
