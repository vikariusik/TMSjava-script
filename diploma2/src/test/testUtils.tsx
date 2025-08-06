import { configureStore } from '@reduxjs/toolkit'
import { omdbApi } from '../store/api/omdbApi'
import searchSlice from '../store/slices/searchSlice'

export const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      [omdbApi.reducerPath]: omdbApi.reducer,
      search: searchSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(omdbApi.middleware),
    preloadedState: initialState,
  })
}

export const mockMovieData = {
  Search: [
    {
      imdbID: 'tt0111161',
      Title: 'The Shawshank Redemption',
      Year: '1994',
      Type: 'movie',
      Poster: 'https://example.com/poster1.jpg'
    },
    {
      imdbID: 'tt0068646',
      Title: 'The Godfather',
      Year: '1972',
      Type: 'movie',
      Poster: 'https://example.com/poster2.jpg'
    }
  ],
  totalResults: '2',
  Response: 'True'
}

export const mockEmptyData = {
  Response: 'False',
  Error: 'Movie not found!'
}

export const mockApiError = {
  status: 500,
  data: {
    Response: 'False',
    Error: 'Internal Server Error'
  }
}
