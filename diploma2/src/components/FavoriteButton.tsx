import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToFavorites, removeFromFavorites, type Movie } from '../store/slices/favoritesSlice';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  movie: Movie;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movie, className }) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.movies);
  
  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.imdbID));
    } else {
      dispatch(addToFavorites(movie));
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      className={`favorite-button ${isFavorite ? 'favorite-button--active' : ''} ${className || ''}`}
      title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
};

export default FavoriteButton;
