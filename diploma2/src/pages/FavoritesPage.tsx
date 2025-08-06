import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Link } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import './FavoritesPage.css';

const FavoritesPage: React.FC = () => {
  const favorites = useAppSelector(state => state.favorites.movies);

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <h1>Избранные фильмы</h1>
          <Link to="/" className="back-link">← Назад к поиску</Link>
        </div>
        <div className="favorites-empty">
          <div className="empty-icon">💔</div>
          <h2>Пока нет избранных фильмов</h2>
          <p>Добавьте фильмы в избранное, чтобы они появились здесь</p>
          <Link to="/" className="search-link">Найти фильмы</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>Избранные фильмы ({favorites.length})</h1>
        <Link to="/" className="back-link">← Назад к поиску</Link>
      </div>
      
      <div className="favorites-grid">
        {favorites.map(movie => (
          <div key={movie.imdbID} className="favorite-card">
            <div className="favorite-card-poster">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.jpg'} 
                alt={movie.Title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-movie.jpg';
                }}
              />
              <FavoriteButton movie={movie} className="favorite-card-button" />
            </div>
            
            <div className="favorite-card-content">
              <h3 className="favorite-card-title">{movie.Title}</h3>
              <p className="favorite-card-year">{movie.Year}</p>
              <p className="favorite-card-type">{movie.Type}</p>
              
              <Link 
                to={`/movie/${movie.imdbID}`} 
                className="favorite-card-link"
              >
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
