import { Link } from 'react-router-dom';
import type { Movie } from '../types/movie';
import FavoriteButton from './FavoriteButton';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const defaultPoster = 'https://via.placeholder.com/300x450/f5f5f5/999999?text=Нет+изображения';

  const getTypeLabel = (type: Movie['Type']): string => {
    const typeLabels = {
      movie: 'Фильм',
      series: 'Сериал',
      episode: 'Эпизод',
      game: 'Игра'
    };
    return typeLabels[type] || type;
  };

  const getTypeColor = (type: Movie['Type']): string => {
    const typeColors = {
      movie: '#007bff',
      series: '#28a745',
      episode: '#ffc107',
      game: '#dc3545'
    };
    return typeColors[type] || '#6c757d';
  };

  return (
    <article className="movie-card">
      <div className="movie-poster-container">
        <Link to={`/movie/${movie.imdbID}`} className="movie-card-link">
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : defaultPoster}
            alt={movie.Title}
            loading="lazy"
            className="movie-poster"
          />
          <div 
            className="movie-type-badge" 
            style={{ backgroundColor: getTypeColor(movie.Type) }}
          >
            {getTypeLabel(movie.Type)}
          </div>
        </Link>
        <FavoriteButton movie={movie} />
      </div>
      <Link to={`/movie/${movie.imdbID}`} className="movie-card-content-link">
        <div className="movie-card-content">
          <p className="movie-card-title" title={movie.Title}>
            {movie.Title}
          </p>
          <div className="movie-year">
            {movie.Year}
          </div>
        </div>
      </Link>
    </article>
  );
};

export default MovieCard;
