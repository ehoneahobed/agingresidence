import React from 'react';

function formatReviewGenerated(review: string): string {
  if (!review) return '';

  // Split the review into sections by pros and cons
  const [overview, prosAndCons] = review.split('Pros:');
  const [pros, cons] = prosAndCons.split('Cons:');

  // Remove any redundant "Overview:" header in the overview section
  const cleanedOverview = overview.replace(/^Overview:\s*/i, '').trim();

  // Split the overview into paragraphs
  const overviewParagraphs = cleanedOverview.split('. ').map(para => para.trim() + '.').filter(para => para.length > 1);

  // Format the overview with paragraph breaks
  const formattedOverview = `<h2>Overview:</h2>${overviewParagraphs.map(para => `<p>${para}</p>`).join('')}`;

  // Format the pros and cons
  const formattedPros = `<h3>Pros:</h3><ul>${pros.trim().split('-').map(pro => pro.trim() ? `<li>${pro.trim()}</li>` : '').join('')}</ul>`;
  const formattedCons = `<h3>Cons:</h3><ul>${cons.trim().split('-').map(con => con.trim() ? `<li>${con.trim()}</li>` : '').join('')}</ul>`;

  return `${formattedOverview}${formattedPros}${formattedCons}`;
}

interface ListingReviewProps {
  review: string;
}

const ListingReview: React.FC<ListingReviewProps> = ({ review }) => {
  const formattedReview = formatReviewGenerated(review);

  return (
    <div className="prose prose-lg mt-4 text-gray-600" style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: formattedReview }} />
  );
};

export default ListingReview;
