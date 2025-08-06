import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SearchFilters } from '../../types/movie';

interface SearchState {
  query: string;
  filters: SearchFilters;
  currentPage: number;
  isSearchPerformed: boolean;
}

const initialState: SearchState = {
  query: '',
  filters: {
    type: '',
    year: '',
  },
  currentPage: 1,
  isSearchPerformed: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1;
      state.isSearchPerformed = true;
    },
    setFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {
        type: '',
        year: '',
      };
      state.currentPage = 1;
    },
    resetSearch: (state) => {
      state.query = '';
      state.filters = {
        type: '',
        year: '',
      };
      state.currentPage = 1;
      state.isSearchPerformed = false;
    },
  },
});

export const { 
  setQuery, 
  setFilters, 
  setCurrentPage, 
  clearFilters, 
  resetSearch 
} = searchSlice.actions;

export default searchSlice.reducer;
