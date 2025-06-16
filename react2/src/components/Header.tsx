import React from "react";

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogoutClick }) => {
  return (
    <header className="app-header">
      {isLoggedIn && (
        <>
          <button onClick={handleLogoutClick} className="menu-button">
            Logout
          </button>
          <button
            onClick={() => {
              window.location.href = "/posts";
            }}
            className="menu-button"
          >
            Go to Posts
          </button>
        </>
      )}
    </header>
  );
};

export default Header;