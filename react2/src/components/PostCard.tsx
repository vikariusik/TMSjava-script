import React from 'react';
import './PostCard.css';

interface PostCardProps {
  id: number;
  image?: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  author: number;
}

const PostCard: React.FC<PostCardProps> = ({ image, text, date, title }) => {
  return (
    <div className="post-card">
      {image && <img src={image} alt={title} className="post-card-image" />}
      <div  className="post-card-date">Date: {date}</div>
      <h2>{title}</h2>
      <div className="post-card-text">{text}</div>
    </div>
  );
};

export default PostCard;