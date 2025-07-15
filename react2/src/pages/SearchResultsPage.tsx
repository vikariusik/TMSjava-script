import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostList from '../components/PostList';
import type { Post } from '../types/Post';
import './SearchResultsPage.css';
import { fakePosts } from '../data/fakePosts';

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
        const response = await fetch('https://studapi.teachmeskills.by/blog/posts/');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        
        // Combine API posts with fake posts
        const allPosts = [...data.results, ...fakePosts];
        
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