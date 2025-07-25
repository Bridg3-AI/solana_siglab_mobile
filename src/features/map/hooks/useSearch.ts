import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMapStore } from './useMapStore';
import { searchPlaces } from '../services/placesService';

export const useSearch = () => {
  const {
    searchQuery,
    setSearchResults,
    setShowResults,
    clearSearch,
  } = useMapStore();

  const searchQuery_ = useQuery({
    queryKey: ['places-search', searchQuery],
    queryFn: () => {
      console.log('🔍 Searching for:', searchQuery);
      return searchPlaces(searchQuery);
    },
    enabled: searchQuery.trim().length > 2, // Require at least 3 characters to reduce API calls
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  const handleSearch = (query: string) => {
    useMapStore.getState().setSearchQuery(query);
    
    if (!query.trim()) {
      clearSearch();
      return;
    }
  };

  // Update results when query data changes using useEffect
  useEffect(() => {
    if (searchQuery_.data) {
      setSearchResults(searchQuery_.data);
      setShowResults(true);
    }
  }, [searchQuery_.data, setSearchResults, setShowResults]);

  return {
    searchQuery,
    searchResults: searchQuery_.data || [],
    isSearching: searchQuery_.isLoading,
    searchError: searchQuery_.error,
    handleSearch,
    clearSearch,
  };
};