import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Helper function to generate page numbers with ellipses
const getPaginationRange = (currentPage: number, totalPages: number): (number | string)[] => {
  const delta = 2;
  const range: (number | string)[] = [];
  const left = currentPage - delta;
  const right = currentPage + delta + 1;
  let l: number | null = null;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i < right)) {
      range.push(i);
    }
  }

  range.forEach((i) => {
    if (l !== null) {
      if (typeof i === 'number' && i - l === 2) {
        range.splice(range.indexOf(i), 0, l + 1);
      } else if (typeof i === 'number' && i - l !== 1) {
        range.splice(range.indexOf(i), 0, '...');
      }
    }
    l = i as number;
  });

  return range;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {paginationRange.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-4 py-2 mx-1">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-teal-500 text-white' : 'bg-gray-300'}`}
          >
            {page}
          </button>
        )
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
