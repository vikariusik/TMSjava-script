import { useMovieSearch } from '../hooks/useMovieSearch';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './SearchPage.css';
import '../App.css'

const SearchPage: React.FC = () => {
  const {
    movies,
    loading,
    error,
    originalError,
    searchQuery,
    currentPage,
    totalPages,
    totalResults,
    filters,
    handleSearch,
    handlePageChange,
    handleFiltersChange,
    clearError
  } = useMovieSearch();

  return (
    <div className="search-page">
      <main className="main-content">
        <div className="container">
          <div className="search-section">
            <h1 className="page-title">Поиск фильмов и сериалов</h1>
            <p className="page-subtitle">
              Найдите любой фильм, сериал или игру из базы данных OMDB
            </p>
            <SearchBar 
              onSearch={handleSearch} 
              disabled={loading}
              initialValue={searchQuery}
            />
          </div>

          <div className="page-layout">
            <aside className="sidebar-container">
              <Sidebar 
                filters={filters}
                onFiltersChange={handleFiltersChange}
                disabled={loading}
                totalResults={totalResults}
              />
            </aside>

            <section className="content-area">
              {error && (
                <div className="error-container">
                  <ErrorMessage 
                    message={error}
                    originalError={originalError}
                    onRetry={() => clearError()}
                  />
                </div>
              )}

              {loading && (
                <div className="loading-container">
                  <Loading message="Поиск фильмов..." />
                </div>
              )}

              {!loading && !error && movies && movies.length > 0 && (
                <>
                  <div className="search-results-header">
                    <h2 className="results-title">
                      Результаты поиска "{searchQuery}"
                    </h2>
                    <div className="results-meta">
                      Показано {movies.length} из {totalResults.toLocaleString()} результатов
                    </div>
                  </div>

                  <div className="movies-grid">
                    {movies.map((movie: any) => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      disabled={loading}
                    />
                  )}
                </>
              )}

              {!loading && !error && searchQuery && movies && movies.length === 0 && (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3 className="no-results-title">Ничего не найдено</h3>
                  <p className="no-results-text">
                    По запросу "{searchQuery}" ничего не найдено. <br />
                    Попробуйте изменить поисковый запрос или настройки фильтров.
                  </p>
                </div>
              )}

              {!searchQuery && (
                <div className="welcome-container">
                  <div className="welcome-content">
                    <div className="welcome-icon">🎬</div>
                    <h2 className="welcome-title">Добро пожаловать в MovieFinder!</h2>
                    <p className="welcome-text">
                      Введите название фильма, сериала в поле поиска выше, 
                      чтобы найти интересующий вас контент.
                    </p>
                    <div className="welcome-features">
                      <div className="feature-item">
                        <span className="feature-icon">🎯</span>
                        <span>Точный поиск</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">🔄</span>
                        <span>Фильтрация</span>
                      </div>
                      <div className="feature-item">
                        <span className="feature-icon">📊</span>
                        <span>Детальная информация</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
