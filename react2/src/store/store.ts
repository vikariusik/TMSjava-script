import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import usersReducer from './userSlice'
import imageReducer from './ImageSlice'


export const store = configureStore({
  reducer: {
    counter : counterReducer,
    users : usersReducer,
    image: imageReducer,
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()