import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../components/interfaces'
import { fetchUsers } from './userThunks'
import type { RootState } from './store'

// Define a type for the slice state
interface UsersState {
  users: User[],
  isLoading: boolean,
  error : string

}

const initialState : UsersState = {
    users : [],
    isLoading : false,
    error : ''
}

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    setError: (state, action : PayloadAction<string>) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchUsers.fulfilled,(state, action: PayloadAction<User[]>) => {
      state.users = action.payload
      state.isLoading = false
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setError } = usersSlice.actions

export default usersSlice.reducer

export const usersSelectors = (state: RootState) => state.users.users
export const isLoadingSelectors = (state: RootState) => state.users.isLoading
export const errorSelectors = (state: RootState) => state.users.error