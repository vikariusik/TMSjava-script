import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";
import { useAppDispatch, useAppSelector } from "../store/store";
import { openImageModal } from "../store/ImageSlice";
import type { Post } from "../types/Post";
import { addBookmark, removeBookmark } from "../store/bookmarksSlice";
import BookmarkButton from "./BookmarkButton";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({
  post
}) => {
  const dispatch = useAppDispatch();
  const bookmarkedPosts = useAppSelector((s) => s.bookmarks.bookmarkedPosts )

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    if (post.image) {
      dispatch(openImageModal(post.image));
    }
  };

  const isBookmarked = bookmarkedPosts.some(b => b.id === post.id);

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
    <Link to={`/post/${post.id}`} className="post-card">
      <div className="post-card-header">
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="post-card_image"
            onClick={handleImageClick}
          />
        )}
        <BookmarkButton
          isBookmarked={isBookmarked}
          onClick={handleBookmarkClick}
          className="post-card-bookmark"
        />
      </div>
      <div className="post-card_date">Date: {post.date}</div>
      <h2>{post.title}</h2>
      <div className="post-card_text">{post.description}</div>
    </Link>
  );
};

export default PostCard;
