import { useState, useCallback, useEffect } from 'react';
import { useLazySearchMoviesQuery } from '../store/api/omdbApi';
import { useAppDispatch, useAppSelector } from './redux';
import { useDebounce } from './useDebounce';
import { setQuery, setFilters, setCurrentPage } from '../store/slices/searchSlice';
import { getErrorMessage } from '../utils/errorHandling';
import type { SearchFilters } from '../types/movie';

interface UseMovieSearchReturn {
  movies: any[];
  loading: boolean;
  error: string | null;
  originalError?: any; // Добавляем оригинальную ошибку
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
  
  // Debounce поисковый запрос с задержкой 1000ms
  const debouncedQuery = useDebounce(query, 1000);
  
  const [searchMovies, { data: searchResult, isLoading, error: rtqError, isFetching }] = useLazySearchMoviesQuery();
  const [localError, setLocalError] = useState<string | null>(null);

  // Автоматически выполняем поиск при изменении debounced query
  useEffect(() => {
    if (debouncedQuery.trim()) {
      searchMovies({
        query: debouncedQuery,
        page: currentPage,
        filters
      });
    }
  }, [debouncedQuery, currentPage, filters, searchMovies]);

  const handleSearch = useCallback((newQuery: string) => {
    dispatch(setQuery(newQuery));
    // Поиск будет выполнен автоматически через debounce
  }, [dispatch]);

  const handlePageChange = useCallback((page: number) => {
    dispatch(setCurrentPage(page));
    // Поиск будет выполнен автоматически через useEffect
  }, [dispatch]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    dispatch(setFilters(newFilters));
    // Поиск будет выполнен автоматически через useEffect
  }, [dispatch]);

  const clearError = useCallback(() => {
    setLocalError(null);
  }, []);

  // Объединяем данные из RTK Query и Redux state
  const movies = searchResult?.movies || [];
  const totalPages = searchResult?.totalPages || 0;
  const totalResults = searchResult?.totalResults || 0;
  const loading = isLoading || isFetching;
  const error = rtqError ? getErrorMessage(rtqError) : localError;

  return {
    movies,
    loading,
    error,
    originalError: rtqError,
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
