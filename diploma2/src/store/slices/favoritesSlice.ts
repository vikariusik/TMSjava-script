import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface FavoritesState {
  movies: Movie[];
}

const initialState: FavoritesState = {
  movies: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      // Проверяем, нет ли уже этого фильма в избранном
      const exists = state.movies.find(m => m.imdbID === movie.imdbID);
      if (!exists) {
        state.movies.push(movie);
        localStorage.setItem('favorites', JSON.stringify(state.movies));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const imdbID = action.payload;
      state.movies = state.movies.filter(movie => movie.imdbID !== imdbID);
      localStorage.setItem('favorites', JSON.stringify(state.movies));
    },
    clearFavorites: (state) => {
      state.movies = [];
      localStorage.removeItem('favorites');
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
