import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAppSelector } from "../store/store";
import './Header.css';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogoutClick: () => void;
}

const Header = ({ isLoggedIn, handleLogoutClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const bookmarkedPosts = useAppSelector((state) => state.bookmarks.bookmarkedPosts);

  const handleGoToRegistration = () => {
    navigate('/registration');
  };

  const handleGoToPosts = () => {
    navigate('/posts');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="app-header">
      <div className="header-left">
        {isLoggedIn ? (
          <>
            <button onClick={handleLogoutClick} className="primary-button">
              Logout
            </button>
            <button onClick={handleGoToPosts} className="primary-button">
              Go to Posts
            </button>
          </>
        ) : (
          <button onClick={handleGoToRegistration} className="primary-button">
            Register
          </button>
        )}
      </div>
      
      {isLoggedIn && (
        <div className="header-center">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="primary-button">
              Search
            </button>
          </form>
        </div>
      )}
            <div className="header-right">
        {isLoggedIn && bookmarkedPosts.length > 0 && (
          <div className="bookmarks-indicator">
            <span className="bookmark-icon">★</span>
            <span className="bookmark-count">{bookmarkedPosts.length}</span>
          </div>
        )}
        <button onClick={toggleTheme} className="theme-toggle-button">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header;