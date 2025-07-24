import type { 
  SearchResponse, 
  MovieDetailsResponse, 
  SearchResult, 
  SearchFilters, 
  MovieDetails,
  ApiError 
} from '../types/movie';

const API_KEY = '99ff31e8';
const BASE_URL = 'http://www.omdbapi.com/';

class OMDBService {
  async searchMovies(
    query: string, 
    page: number = 1, 
    filters: SearchFilters = { type: '', year: '' }
  ): Promise<SearchResult> {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: query,
      page: page.toString(),
    });

    if (filters.type) params.append('type', filters.type);
    if (filters.year) params.append('y', filters.year);

    try {
      const response = await fetch(`${BASE_URL}?${params}`);
      const data: SearchResponse = await response.json();
      
      if (data.Response === 'True') {
        return {
          movies: data.Search,
          totalResults: parseInt(data.totalResults),
          currentPage: page,
          totalPages: Math.ceil(parseInt(data.totalResults) / 10)
        };
      } else {
        throw new Error(data.Error || 'Фильмы не найдены');
      }
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Ошибка при поиске фильмов'
      };
      throw apiError;
    }
  }

  async getMovieDetails(imdbId: string): Promise<MovieDetails> {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: imdbId,
      plot: 'full'
    });

    try {
      const response = await fetch(`${BASE_URL}?${params}`);
      const data: MovieDetailsResponse = await response.json();
      
      if (data.Response === 'True') {
        return data;
      } else {
        throw new Error(data.Error || 'Фильм не найден');
      }
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Ошибка при загрузке деталей фильма'
      };
      throw apiError;
    }
  }
}

export const omdbService = new OMDBService();
