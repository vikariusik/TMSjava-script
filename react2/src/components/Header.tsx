import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isLoggedIn: boolean;
  handleLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, handleLogoutClick }) => {
  const navigate = useNavigate();

  const handleGoToRegistration = () => {
    navigate('/registration');
  };

  const handleGoToPosts = () => {
    navigate('/posts');
  };

  return (
    <header className="app-header">
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
    </header>
  );
};

export default Header;