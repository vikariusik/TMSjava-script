import { useState, useCallback } from 'react';
import { useLazySearchMoviesQuery } from '../store/api/omdbApi';
import { useAppDispatch, useAppSelector } from './redux';
import { setQuery, setFilters, setCurrentPage } from '../store/slices/searchSlice';
import type { SearchFilters } from '../types/movie';

interface UseMovieSearchReturn {
  movies: any[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  totalResults: number;
  filters: SearchFilters;
  handleSearch: (query: string) => void;
  handlePageChange: (page: number) => void;
  handleFiltersChange: (newFilters: SearchFilters) => void;
  clearError: () => void;
}

export const useMovieSearch = (): UseMovieSearchReturn => {
  const dispatch = useAppDispatch();
  const { query, filters, currentPage } = useAppSelector(state => state.search);
  
  const [searchMovies, { data: searchResult, isLoading, error: rtqError, isFetching }] = useLazySearchMoviesQuery();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSearch = useCallback((newQuery: string) => {
    dispatch(setQuery(newQuery));
    if (newQuery.trim()) {
      searchMovies({
        query: newQuery,
        page: 1,
        filters
      });
    }
  }, [dispatch, filters, searchMovies]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
    if (query) {
      searchMovies({
        query,
        page,
        filters
      });
    }
  }, [dispatch, query, filters, searchMovies]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    dispatch(setFilters(newFilters));
    if (query) {
      searchMovies({
        query,
        page: 1,
        filters: newFilters
      });
    }
  }, [dispatch, query, searchMovies]);

  const clearError = useCallback(() => {
    setLocalError(null);
  }, []);

  // Объединяем данные из RTK Query и Redux state
  const movies = searchResult?.movies || [];
  const totalPages = searchResult?.totalPages || 0;
  const totalResults = searchResult?.totalResults || 0;
  const loading = isLoading || isFetching;
  const error = rtqError ? 'Error loading movies' : localError;

  return {
    movies,
    loading,
    error,
    searchQuery: query,
    currentPage,
    totalPages,
    totalResults,
    filters,
    handleSearch,
    handlePageChange,
    handleFiltersChange,
    clearError
  };
};
