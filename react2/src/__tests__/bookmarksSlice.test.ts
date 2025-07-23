import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeEach } from 'vitest';
import bookmarksReducer, { 
  addBookmark, 
  removeBookmark,
  clearBookmarks
} from '../store/bookmarksSlice';
import type { Post } from '../types/Post';

const createTestStore = () => {
  return configureStore({
    reducer: {
      bookmarks: bookmarksReducer,
    },
  });
};

const mockPost: Post = {
  id: 1,
  title: 'Test Post',
  description: 'Test description',
  text: 'Test content',
  date: '2023-01-01',
  lesson_num: 1,
  image: undefined,
  author: 1
};

describe('Bookmarks Slice', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should handle initial state', () => {
    const store = createTestStore();
    const state = store.getState();
    
    expect(state.bookmarks.bookmarkedPosts).toEqual([]);
  });

  it('should handle add bookmark', () => {
    const store = createTestStore();
    
    store.dispatch(addBookmark(mockPost));
    const state = store.getState();
    
    expect(state.bookmarks.bookmarkedPosts).toHaveLength(1);
    expect(state.bookmarks.bookmarkedPosts[0]).toEqual(mockPost);
  });

  it('should not add duplicate bookmarks', () => {
    const store = createTestStore();
    
    store.dispatch(addBookmark(mockPost));
    store.dispatch(addBookmark(mockPost)); // Try to add same post again
    
    const state = store.getState();
    expect(state.bookmarks.bookmarkedPosts).toHaveLength(1);
  });

  it('should handle remove bookmark', () => {
    const store = createTestStore();
    
    // Add bookmark first
    store.dispatch(addBookmark(mockPost));
    // Then remove it
    store.dispatch(removeBookmark(mockPost.id));
    
    const state = store.getState();
    expect(state.bookmarks.bookmarkedPosts).toHaveLength(0);
  });

  it('should handle clear all bookmarks', () => {
    const store = createTestStore();
    const mockPost2: Post = { ...mockPost, id: 2, title: 'Test Post 2' };
    
    // Add some bookmarks
    store.dispatch(addBookmark(mockPost));
    store.dispatch(addBookmark(mockPost2));
    
    // Clear all
    store.dispatch(clearBookmarks());
    
    const state = store.getState();
    expect(state.bookmarks.bookmarkedPosts).toEqual([]);
  });
});
