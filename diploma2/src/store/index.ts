import { configureStore } from '@reduxjs/toolkit';
import { omdbApi } from './api/omdbApi';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    [omdbApi.reducerPath]: omdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(omdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
