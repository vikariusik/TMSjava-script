import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, UserProfileState } from '../types/User';
import axios from 'axios';
import type { RootState } from './store';

// Async thunk для получения профиля пользователя из JSONPlaceholder
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchProfile',
  async (userId: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get<UserProfile>(`https://jsonplaceholder.typicode.com/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch profile');
    }
  }
);

const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export const { clearError, clearProfile } = userProfileSlice.actions;

// Селекторы
export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectUserLoading = (state: RootState) => state.userProfile.loading;
export const selectUserError = (state: RootState) => state.userProfile.error;

export default userProfileSlice.reducer;
