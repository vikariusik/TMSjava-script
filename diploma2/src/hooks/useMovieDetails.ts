import { useState, useEffect } from 'react';
import { omdbService } from '../services/omdbService';
import type { MovieDetails, ApiError } from '../types/movie';

interface UseMovieDetailsReturn {
  movie: MovieDetails | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export const useMovieDetails = (imdbId: string | undefined): UseMovieDetailsReturn => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imdbId) {
      setMovie(null);
      return;
    }

    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const movieData = await omdbService.getMovieDetails(imdbId);
        setMovie(movieData);
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [imdbId]);

  const clearError = () => {
    setError(null);
  };

  return { movie, loading, error, clearError };
};
