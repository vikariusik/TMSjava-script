import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { addBookmark, removeBookmark } from '../store/bookmarksSlice';
import type { Post } from '../types/Post';
import './BookmarkButton.css';

interface BookmarkButtonProps {
  post: Post;
  className?: string;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ post, className = '' }) => {
  const dispatch = useAppDispatch();
  const bookmarkedPosts = useAppSelector((state) => state.bookmarks.bookmarkedPosts);
  const isBookmarked = bookmarkedPosts.some((bookmarkedPost) => bookmarkedPost.id === post.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isBookmarked) {
      dispatch(removeBookmark(post.id));
    } else {
      dispatch(addBookmark(post));
    }
  };

  return (
    <button
      className={`bookmark-button ${className} ${isBookmarked ? 'bookmarked' : ''}`}
      onClick={handleBookmarkClick}
      title={isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
    >
      {isBookmarked ? '★' : '☆'}
    </button>
  );
};

export default BookmarkButton;
