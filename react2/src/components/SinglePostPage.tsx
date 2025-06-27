import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './SinglePostPage.css';
import type { Post } from '../types/Post';
import BookmarkButton from './BookmarkButton';

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
        setError(err instanceof Error ? err.message : 'Unknown error');
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
    <div className="single-post__page">
      <div className="single-post__header">
        {post.image && <img src={post.image} alt={post.title} className="single-post__image" />}
        <BookmarkButton post={post} className="single-post__bookmark" />
      </div>
      <h1>{post.title}</h1>
      <div>{post.text}</div>
      <div className="single-post__date">Date: {post.date}</div>
    </div>
  );
};

export default SinglePostPage;