import { useGetMovieDetailsQuery } from '../store/api/omdbApi';
import { getErrorMessage } from '../utils/errorHandling';
import type { MovieDetails } from '../types/movie';

interface UseMovieDetailsReturn {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
  originalError?: any; // Добавляем оригинальную ошибку
  clearError: () => void;
}

export const useMovieDetails = (imdbId: string | undefined): UseMovieDetailsReturn => {
  const { data: movie, isLoading, error: rtqError } = useGetMovieDetailsQuery(
    imdbId || '', 
    { skip: !imdbId }
  );

  const clearError = () => {
    // В RTK Query ошибки управляются автоматически
  };

  return {
    movie: movie || null,
    loading: isLoading,
    error: rtqError ? getErrorMessage(rtqError) : null,
    originalError: rtqError,
    clearError
  };
};
