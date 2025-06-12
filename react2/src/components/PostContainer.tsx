import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import type { Post } from '../types/Post';
import './PostContainer.css';

const PostContainer: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://studapi.teachmeskills.by/blog/posts/');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error}</div>;
  }

  return <PostList posts={posts} />;
};

export default PostContainer;