"use client";

import React, { Suspense } from 'react';
import SearchResultsPage from '@/components/custom/SearchResults';
import LoadingSpinner from '@/components/custom/LoadingSpinner';

const SearchPage: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
};

export default SearchPage;
