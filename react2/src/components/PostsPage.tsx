import React, { useState, useEffect } from "react";
import PostList from "./PostList";
import type { Post } from "../types/Post";
import "./PostsPage.css";
import Title from "./Title";
import { fakePosts } from "../data/fakePosts";
import { useAppSelector, useAppDispatch } from "../store/store";
import { clearBookmarks } from "../store/bookmarksSlice";

type TabType = 'all' | 'bookmarks';

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  
  const dispatch = useAppDispatch();
  const bookmarkedPosts = useAppSelector((state) => state.bookmarks.bookmarkedPosts);

  const handleClearBookmarks = () => {
    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
      dispatch(clearBookmarks());
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://studapi.teachmeskills.by/blog/posts/"
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const allPosts = [...data.results, ...fakePosts];
        setPosts(allPosts);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
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

  const currentPosts = activeTab === 'all' ? posts : bookmarkedPosts;

  return (
    <div className="posts-with-tabs">
      <Title text="Posts" />
      
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Posts ({posts.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'bookmarks' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookmarks')}
        >
          Bookmarks ({bookmarkedPosts.length})
        </button>
        {bookmarkedPosts.length > 0 && activeTab === 'bookmarks' && (
          <button
            className="clear-bookmarks-button"
            onClick={handleClearBookmarks}
            title="Clear all bookmarks"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="tab-content">
        {currentPosts.length === 0 && activeTab === 'bookmarks' ? (
          <div className="empty-bookmarks">
            <p>No bookmarked posts yet.</p>
            <p>Click the star icon on any post to add it to bookmarks!</p>
          </div>
        ) : (
          <PostList posts={currentPosts} />
        )}
      </div>
    </div>
  );
};

export default PostsPage;
