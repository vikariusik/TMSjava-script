import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Header.css';

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogoutClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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
            <button onClick={handleLogoutClick} className="menu-button">
              Logout
            </button>
            <button onClick={handleGoToPosts} className="menu-button">
              Go to Posts
            </button>
          </>
        ) : (
          <button onClick={handleGoToRegistration} className="menu-button">
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
            <button type="submit" className="menu-button">
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;