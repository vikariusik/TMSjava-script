import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();
  const favoritesCount = useAppSelector(state => state.favorites.movies.length);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 MovieFinder
        </Link>
        
        <div className="nav-links">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'nav-link--active' : ''}`}
          >
            🔍 Поиск
          </Link>
          
          <Link 
            to="/favorites" 
            className={`nav-link ${location.pathname === '/favorites' ? 'nav-link--active' : ''}`}
          >
            ❤️ Избранное
            {favoritesCount > 0 && (
              <span className="favorites-count">{favoritesCount}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
