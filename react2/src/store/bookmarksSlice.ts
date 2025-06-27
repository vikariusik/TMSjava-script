import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Post } from '../types/Post';

interface BookmarksState {
  bookmarkedPosts: Post[];
}

// Загружаем закладки из localStorage
const loadBookmarksFromStorage = (): Post[] => {
  try {
    const saved = localStorage.getItem('bookmarkedPosts');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading bookmarks from localStorage:', error);
    return [];
  }
};

// Сохраняем закладки в localStorage
const saveBookmarksToStorage = (bookmarks: Post[]) => {
  try {
    localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarks));
  } catch (error) {
    console.error('Error saving bookmarks to localStorage:', error);
  }
};

const initialState: BookmarksState = {
  bookmarkedPosts: loadBookmarksFromStorage(),
};

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Post>) => {
      const existingPost = state.bookmarkedPosts.find(post => post.id === action.payload.id);
      if (!existingPost) {
        state.bookmarkedPosts.push(action.payload);
        saveBookmarksToStorage(state.bookmarkedPosts);
      }
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.bookmarkedPosts = state.bookmarkedPosts.filter(post => post.id !== action.payload);
      saveBookmarksToStorage(state.bookmarkedPosts);
    },
    clearBookmarks: (state) => {
      state.bookmarkedPosts = [];
      saveBookmarksToStorage(state.bookmarkedPosts);
    },
  },
});

export const { addBookmark, removeBookmark, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
