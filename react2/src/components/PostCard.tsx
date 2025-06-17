import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

interface PostCardProps {
  id: number;
  image?: string;
  text: string;
  date: string;
  title: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, image, text, date, title }) => {
  return (
    <Link to={`/post/${id}`} className="post-card">
      {image && <img src={image} alt={title} className="post-card_image" />}
      <div  className="post-card_date">Date: {date}</div>
      <h2>{title}</h2>
      <div className="post-card_text">{text}</div>
    </Link>
  );
};

export default PostCard;