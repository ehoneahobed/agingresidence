import React from 'react';

function formatReviewGenerated(review: string): string {
  if (!review) return '';

  // Initialize formatted sections
  let formattedOverview = '';
  let formattedPros = '';
  let formattedCons = '';

  // Split the review into sections by pros and cons
  const [overviewSection, prosAndCons] = review.split('Pros:');
  const [prosSection, consSection] = prosAndCons ? prosAndCons.split('Cons:') : ['', ''];

  // Process the overview section if it exists
  if (overviewSection) {
    // Remove any redundant "Overview:" header in the overview section
    const cleanedOverview = overviewSection.replace(/^Overview:\s*/i, '').trim();

    // Split the overview into paragraphs
    const overviewParagraphs = cleanedOverview.split('. ').map(para => para.trim() + '.').filter(para => para.length > 1);

    // Format the overview with paragraph breaks
    formattedOverview = `<h2>Overview:</h2>${overviewParagraphs.map(para => `<p>${para}</p>`).join('')}`;
  }

  // Process the pros section if it exists
  if (prosSection) {
    formattedPros = `<h3>Pros:</h3><ul>${prosSection.trim().split('-').map(pro => pro.trim() ? `<li>${pro.trim()}</li>` : '').join('')}</ul>`;
  }

  // Process the cons section if it exists
  if (consSection) {
    formattedCons = `<h3>Cons:</h3><ul>${consSection.trim().split('-').map(con => con.trim() ? `<li>${con.trim()}</li>` : '').join('')}</ul>`;
  }

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
