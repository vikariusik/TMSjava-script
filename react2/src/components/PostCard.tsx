import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';
import { useAppDispatch } from '../store/store';
import { openImageModal } from '../store/ImageSlice';

interface PostCardProps {
  id: number;
  image?: string;
  text: string;
  date: string;
  title: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, image, text, date, title }) => {
  const dispatch = useAppDispatch();

  const handleImageClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    e.stopPropagation(); // Останавливаем всплытие события
    if (image) {
      dispatch(openImageModal(image));
    }
  };

  return (
    <Link to={`/post/${id}`} className="post-card">
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="post-card_image" 
          onClick={handleImageClick}
        />
      )}
      <div className="post-card_date">Date: {date}</div>
      <h2>{title}</h2>
      <div className="post-card_text">{text}</div>
      <span className="post-card_read-more">Read More</span>
    </Link>
  );
};

export default PostCard;