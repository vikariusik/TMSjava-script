import { useParams, Link } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import type { Rating } from '../types/movie';
import './MovieDetailsPage.css';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { movie, loading, error, originalError, clearError } = useMovieDetails(id);

  if (loading) {
    return (
      <div className="movie-details-page">
        <Header />
        <div className="container">
          <Loading message="Загрузка информации о фильме..." />
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-page">
        <Header />
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">← Вернуться к поиску</Link>
          </div>
          <ErrorMessage 
            message={error || 'Фильм не найден'}
            originalError={originalError}
            onRetry={() => clearError()}
          />
        </div>
      </div>
    );
  }

  const defaultPoster = 'https://via.placeholder.com/400x600/f5f5f5/999999?text=Нет+изображения';

  const getRatingColor = (rating: string): string => {
    const numRating = parseFloat(rating);
    if (numRating >= 8) return '#28a745';
    if (numRating >= 6) return '#ffc107';
    return '#dc3545';
  };

  const formatBoxOffice = (boxOffice: string): string => {
    if (boxOffice === 'N/A') return 'Нет данных';
    return boxOffice;
  };

  return (
    <div className="movie-details-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/" className="breadcrumb-link">
              ← Вернуться к поиску
            </Link>
          </div>

          <div className="movie-details-container">
            <div className="movie-poster-section">
              <div className="poster-wrapper">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : defaultPoster}
                  alt={movie.Title}
                  className="movie-poster-large"
                />
              </div>
            </div>

            <div className="movie-info-section">
              <header className="movie-header">
                <h1 className="movie-title">{movie.Title}</h1>
                
                <div className="movie-meta-tags">
                  <span className="meta-tag year">{movie.Year}</span>
                  {movie.Rated !== 'N/A' && (
                    <span className="meta-tag rated">{movie.Rated}</span>
                  )}
                  {movie.Runtime !== 'N/A' && (
                    <span className="meta-tag runtime">{movie.Runtime}</span>
                  )}
                </div>

                {movie.Genre !== 'N/A' && (
                  <div className="movie-genres">
                    {movie.Genre.split(', ').map((genre: string, index: number) => (
                      <span key={index} className="genre-tag">{genre}</span>
                    ))}
                  </div>
                )}
              </header>

              {movie.imdbRating !== 'N/A' && (
                <div className="ratings-section">
                  <h3 className="section-title">Рейтинги</h3>
                  <div className="ratings-grid">
                    <div className="rating-card main-rating">
                      <div className="rating-source">IMDb</div>
                      <div 
                        className="rating-value"
                        style={{ color: getRatingColor(movie.imdbRating) }}
                      >
                        {movie.imdbRating}/10
                      </div>
                      <div className="rating-votes">
                        {movie.imdbVotes} голосов
                      </div>
                    </div>
                    
                    {movie.Ratings && movie.Ratings.length > 0 && 
                      movie.Ratings.map((rating: Rating, index: number) => (
                        <div key={index} className="rating-card">
                          <div className="rating-source">{rating.Source}</div>
                          <div className="rating-value">{rating.Value}</div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              )}

              {movie.Plot !== 'N/A' && (
                <div className="plot-section">
                  <h3 className="section-title">Описание</h3>
                  <p className="plot-text">{movie.Plot}</p>
                </div>
              )}

              <div className="details-section">
                <h3 className="section-title">Детали</h3>
                <div className="details-grid">
                  {movie.Director !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Режиссер:</span>
                      <span className="detail-value">{movie.Director}</span>
                    </div>
                  )}
                  {movie.Writer !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Сценарист:</span>
                      <span className="detail-value">{movie.Writer}</span>
                    </div>
                  )}
                  {movie.Actors !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">В ролях:</span>
                      <span className="detail-value">{movie.Actors}</span>
                    </div>
                  )}
                  {movie.Language !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Язык:</span>
                      <span className="detail-value">{movie.Language}</span>
                    </div>
                  )}
                  {movie.Country !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Страна:</span>
                      <span className="detail-value">{movie.Country}</span>
                    </div>
                  )}
                  {movie.Released !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Дата выхода:</span>
                      <span className="detail-value">{movie.Released}</span>
                    </div>
                  )}
                  {movie.BoxOffice !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Сборы:</span>
                      <span className="detail-value">{formatBoxOffice(movie.BoxOffice)}</span>
                    </div>
                  )}
                  {movie.Awards !== 'N/A' && (
                    <div className="detail-row">
                      <span className="detail-label">Награды:</span>
                      <span className="detail-value">{movie.Awards}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetailsPage;
