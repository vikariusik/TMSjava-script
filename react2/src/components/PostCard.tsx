import React from 'react';
import { Link } from 'react-router-dom';
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

const PostCard: React.FC<PostCardProps> = ({ id, image, text, date, lesson_num, title, author }) => {
  return (
    <div className="post-card">
      {image && <img src={image} alt={title} className="post-card-image" />}
      <h2>{title}</h2>
      <p>{text}</p>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Lesson:</strong> {lesson_num}</p>
      <p><strong>Author ID:</strong> {author}</p>
      <Link to={`/post/${id}`} className="post-card-link">Read More</Link>
    </div>
  );
};

export default PostCard;