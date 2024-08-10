// components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);

  if (totalPages <= maxPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(currentPage + halfPagesToShow, totalPages);

    if (currentPage - halfPagesToShow <= 0) {
      endPage = maxPagesToShow;
    }

    if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      pageNumbers.unshift('...');
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded ${currentPage === page ? 'bg-teal-500 text-white' : 'bg-gray-200'} hover:bg-teal-400 transition-colors duration-200`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-4 py-2 mx-1 text-gray-400">
            {page}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
