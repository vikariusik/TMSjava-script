import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../components/PostList';
import type { Post } from '../types/Post';
import './SearchResultsPage.css';
import { postsAPI } from '../services/api';

const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const searchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (searchQuery.trim()) {
          const response = await postsAPI.searchPosts(searchQuery);
          setPosts(response.results);
        } else {
          setPosts([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    searchPosts();
  }, [searchQuery]);

  if (loading) {
    return <div className="search-results-loading">Searching posts...</div>;
  }

  if (error) {
    return <div className="search-results-error">Error: {error}</div>;
  }

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <h1>Search Results</h1>
        <p className="search-query">
          {searchQuery ? `Showing results for: "${searchQuery}"` : 'Enter a search query'}
        </p>
        <p className="search-count">
          {posts.length} post{posts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="search-results-content">
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : searchQuery ? (
          <div className="no-results">
            <p>No posts found matching your search.</p>
            <p>Try different keywords or check your spelling.</p>
          </div>
        ) : (
          <div className="no-search">
            <p>Enter a search query to find posts.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;