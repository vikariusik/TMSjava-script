import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import "./PostsPage.css";
import Title from "../components/Title";
import { useAppSelector, useAppDispatch } from "../store/store";
import { clearBookmarks } from "../store/bookmarksSlice";
import { fetchPostsRequest, selectPosts, selectPostsLoading, selectPostsError } from "../store/postsSlice";

type TabType = 'all' | 'bookmarks';

const PostsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  
  const dispatch = useAppDispatch();
  
  // Используем селекторы для получения данных из Redux store
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);
  const bookmarkedPosts = useAppSelector((state) => state.bookmarks.bookmarkedPosts);

  const handleClearBookmarks = () => {
    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
      dispatch(clearBookmarks());
    }
  };

  // Запускаем saga для получения постов
  useEffect(() => {
    dispatch(fetchPostsRequest());
  }, [dispatch]);

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
