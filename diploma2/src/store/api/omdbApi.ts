import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { 
  SearchResponse, 
  MovieDetailsResponse, 
  SearchResult, 
  SearchFilters, 
  MovieDetails 
} from '../../types/movie';

const API_KEY = '99ff31e8';
const BASE_URL = 'http://www.omdbapi.com/';

// Создаем axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Custom base query using axios
const axiosBaseQuery = () => async ({ url, params }: { url: string; params?: Record<string, any> }) => {
  try {
    const result = await axiosInstance.get(url, { params });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as any;
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const omdbApi = createApi({
  reducerPath: 'omdbApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Movie', 'Search'],
  endpoints: (builder) => ({
    searchMovies: builder.query<SearchResult, { query: string; page?: number; filters?: SearchFilters }>({
      query: ({ query, page = 1, filters = { type: '', year: '' } }) => {
        const params: Record<string, string> = {
          apikey: API_KEY,
          s: query,
          page: page.toString(),
        };

        if (filters.type) params.type = filters.type;
        if (filters.year) params.y = filters.year;

        return {
          url: '',
          params,
        };
      },
      transformResponse: (response: SearchResponse): SearchResult => {
        if (response.Response === 'True') {
          return {
            movies: response.Search,
            totalResults: parseInt(response.totalResults),
            currentPage: 1,
            totalPages: Math.ceil(parseInt(response.totalResults) / 12),
          };
        } else {
          throw new Error(response.Error || 'Фильмы не найдены');
        }
      },
      providesTags: ['Search'],
    }),

    getMovieDetails: builder.query<MovieDetails, string>({
      query: (imdbId) => ({
        url: '',
        params: {
          apikey: API_KEY,
          i: imdbId,
          plot: 'full',
        },
      }),
      transformResponse: (response: MovieDetailsResponse): MovieDetails => {
        if (response.Response === 'True') {
          return response;
        } else {
          throw new Error(response.Error || 'Фильм не найден');
        }
      },
      providesTags: (_result, _error, imdbId) => [{ type: 'Movie', id: imdbId }],
    }),
  }),
});

export const { useSearchMoviesQuery, useGetMovieDetailsQuery, useLazySearchMoviesQuery } = omdbApi;
