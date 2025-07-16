import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../components/PostList';
import type { Post } from '../types/Post';
import './SearchResultsPage.css';
import { useAppDispatch, useAppSelector } from '../store/store';
import { fetchPostsRequest } from '../store/postsSlice';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = searchParams.get('q') || '';

  const allPosts = useAppSelector((state) => state.posts.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const searchPosts = async () => {
      try {
        setLoading(true);
        dispatch(fetchPostsRequest());
        
        // Filter posts based on search query
        const filteredPosts = allPosts.filter((post: Post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.text.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setPosts(filteredPosts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      searchPosts();
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) {
    return <div className="search-loading">Searching posts...</div>;
  }

  if (error) {
    return <div className="search-error">Error searching posts: {error}</div>;
  }

  return (
    <div className="search-results-page">
      <h1>Search Results</h1>
      {searchQuery && (
        <p className="search-query">
          Results for: "<strong>{searchQuery}</strong>"
        </p>
      )}
      
      {posts.length > 0 ? (
        <>
          <p className="search-count">{posts.length} post(s) found</p>
          <PostList posts={posts} />
        </>
      ) : (
        <div className="no-results">
          {searchQuery ? 'No posts found matching your search.' : 'Please enter a search term.'}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;