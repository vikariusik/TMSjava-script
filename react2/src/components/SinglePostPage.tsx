import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePostPage.css';

interface Post {
  id: number;
  image?: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  author: number;
}

const SinglePostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}/`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div>Loading post...</div>;
  }

  if (error) {
    return <div>Error loading post: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="single-post-page">
      {post.image && <img src={post.image} alt={post.title} className="single-post-image" />}
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <p><strong>Date:</strong> {post.date}</p>
      <p><strong>Lesson:</strong> {post.lesson_num}</p>
      <p><strong>Author ID:</strong> {post.author}</p>
    </div>
  );
};

export default SinglePostPage;