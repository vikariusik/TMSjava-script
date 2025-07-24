import { useState, useCallback } from 'react';
import { omdbService } from '../services/omdbService';
import type { Movie, SearchFilters, ApiError } from '../types/movie';

interface UseMovieSearchReturn {
  movies: Movie[];
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
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    year: ''
  });

  const searchMovies = useCallback(async (
    query: string, 
    page: number = 1, 
    newFilters: SearchFilters = filters
  ) => {
    if (!query.trim()) {
      setMovies([]);
      setTotalPages(0);
      setTotalResults(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await omdbService.searchMovies(query, page, newFilters);
      
      setMovies(result.movies);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalResults(result.totalResults);
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message);
      setMovies([]);
      setTotalPages(0);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    searchMovies(query, 1, filters);
  }, [filters, searchMovies]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    searchMovies(searchQuery, page, filters);
  }, [searchQuery, filters, searchMovies]);

  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    if (searchQuery) {
      searchMovies(searchQuery, 1, newFilters);
    }
  }, [searchQuery, searchMovies]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    movies,
    loading,
    error,
    searchQuery,
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
