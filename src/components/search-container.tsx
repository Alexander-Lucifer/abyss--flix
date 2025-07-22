'use client';

import React from 'react';
import type { Show } from '@/types';
import ShowsGrid from '@/components/shows-grid';
import { useSearchStore } from '@/stores/search';
import { handleDefaultSearchBtn, handleDefaultSearchInp } from '@/lib/utils';

interface SearchContainer {
  query: string;
  shows: Show[];
}

function SearchContainer({ shows, query }: SearchContainer) {
  const searchStore = useSearchStore();

  React.useEffect(() => {
    searchStore.setOpen(true);
    // Only set initial data if the store doesn't already have the same query
    if (searchStore.query !== query || searchStore.shows.length === 0) {
      searchStore.setQuery(query);
      searchStore.setShows(shows);
    }
    const timer1: NodeJS.Timeout = setTimeout(() => {
      handleDefaultSearchBtn();
    }, 5);
    const timer2: NodeJS.Timeout = setTimeout(() => {
      handleDefaultSearchInp();
    }, 10);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [query, shows, searchStore]);

  // Use search store data for real-time updates, fallback to props for initial load
  const displayShows =
    searchStore.shows.length > 0 || searchStore.loading
      ? searchStore.shows
      : shows;
  const displayQuery = searchStore.query || query;

  return <ShowsGrid shows={displayShows} query={displayQuery} />;
}

export default SearchContainer;
