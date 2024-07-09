import React from 'react';
import { marked } from 'marked';

function formatReviewGenerated(review: string): string {
  if (!review) return '';

  // Initialize formatted sections
  let formattedOverview = '';
  let formattedPros = '';
  let formattedCons = '';

  // Use case-insensitive regex to match the sections at the start of a line
  const overviewRegex = /^overview[:\s]*/im;
  const prosRegex = /^pros[:\s]*/im;
  const consRegex = /^cons[:\s]*/im;

  // Extract the pros section
  const prosMatch = review.match(prosRegex);
  const consMatch = review.match(consRegex);

  const overviewSection = review.substring(
    0,
    prosMatch ? prosMatch.index! : consMatch ? consMatch.index! : review.length
  );

  const prosSection = prosMatch
    ? review.substring(
        prosMatch.index! + prosMatch[0].length,
        consMatch ? consMatch.index! : review.length
      )
    : '';

  const consSection = consMatch
    ? review.substring(consMatch.index! + consMatch[0].length)
    : '';

  // Function to split text into paragraphs based on full stops but avoiding breaking sentences within addresses or abbreviations
  const splitIntoParagraphs = (text: string) => {
    const regex = /(?<!\b\w{1,2})\.\s+/g;
    return text.split(regex).map((paragraph) => paragraph.trim() + '.');
  };

  // Process the overview section if it exists
  if (overviewSection) {
    const cleanedOverview = overviewSection.replace(overviewRegex, '').trim();
    const overviewParagraphs = splitIntoParagraphs(cleanedOverview).map(
      (para) => `<p>${marked(para)}</p>`
    ).join('');
    formattedOverview = `<h2>Overview:</h2>${overviewParagraphs}`;
  }

  // Process the pros section if it exists
  if (prosSection) {
    formattedPros = `<h3>Pros:</h3>${marked(prosSection.trim())}`;
  }

  // Process the cons section if it exists
  if (consSection) {
    formattedCons = `<h3>Cons:</h3>${marked(consSection.trim())}`;
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
