import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';
import { useAppDispatch } from '../store/store';
import { openImageModal } from '../store/ImageSlice';
import BookmarkButton from './BookmarkButton';
import type { Post } from '../types/Post';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const dispatch = useAppDispatch();

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    if (post.image) {
      dispatch(openImageModal(post.image));
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
        <BookmarkButton post={post} className="post-card-bookmark" />
      </div>
      <div className="post-card_date">Date: {post.date}</div>
      <h2>{post.title}</h2>
      <div className="post-card_text">{post.text}</div>
    </Link>
  );
};

export default PostCard;