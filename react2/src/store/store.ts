import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import counterReducer from './counterSlice'
import { useDispatch, useSelector } from 'react-redux'
import usersReducer from './userSlice'
import imageReducer from './ImageSlice'
import bookmarksReducer from './bookmarksSlice'
import postsReducer from './postsSlice'
import rootSaga from './rootSaga'

// Создаем saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter : counterReducer,
    users : usersReducer,
    image: imageReducer,
    bookmarks: bookmarksReducer,
    posts: postsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Отключаем thunk так как используем saga
    }).concat(sagaMiddleware),
})

// Запускаем saga
sagaMiddleware.run(rootSaga)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()