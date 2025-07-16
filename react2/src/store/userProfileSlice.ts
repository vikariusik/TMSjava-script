import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile, UserProfileState } from '../types/User';
import type { CreateUserFormData } from '../types/CreateUser';
import { usersAPI } from '../services/api';
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

// Async thunk для создания нового пользователя
export const createUser = createAsyncThunk(
  'userProfile/createUser',
  async (userData: CreateUserFormData, { rejectWithValue }) => {
    try {
      const response = await usersAPI.createUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create user');
    }
  }
);

const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  createSuccess: false,
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
    clearCreateState: (state) => {
      state.createLoading = false;
      state.createError = null;
      state.createSuccess = false;
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
      // Create user
      .addCase(createUser.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
        state.createSuccess = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createLoading = false;
        state.createError = null;
        state.createSuccess = true;
        // Не обновляем профиль, так как это создание нового пользователя
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload as string;
        state.createSuccess = false;
      });
  },
});

export const { clearError, clearProfile, clearCreateState } = userProfileSlice.actions;

// Селекторы
export const selectUserProfile = (state: RootState) => state.userProfile.profile;
export const selectUserLoading = (state: RootState) => state.userProfile.loading;
export const selectUserError = (state: RootState) => state.userProfile.error;
export const selectCreateUserLoading = (state: RootState) => state.userProfile.createLoading;
export const selectCreateUserError = (state: RootState) => state.userProfile.createError;
export const selectCreateUserSuccess = (state: RootState) => state.userProfile.createSuccess;

export default userProfileSlice.reducer;
