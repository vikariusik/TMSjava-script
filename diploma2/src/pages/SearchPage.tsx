import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useLazySearchMoviesQuery } from '../store/api/omdbApi';
import { setQuery, setFilters, setCurrentPage } from '../store/slices/searchSlice';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Sidebar from '../components/Sidebar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import './SearchPage.css';

const SearchPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { query, filters, currentPage, isSearchPerformed } = useAppSelector(state => state.search);
  
  const [searchMovies, { data: searchResult, isLoading, error, isFetching }] = useLazySearchMoviesQuery();

  // Выполняем поиск при изменении параметров
  useEffect(() => {
    if (query && isSearchPerformed) {
      searchMovies({
        query,
        page: currentPage,
        filters
      });
    }
  }, [query, currentPage, filters, searchMovies, isSearchPerformed]);

  const handleSearch = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    dispatch(setFilters(newFilters));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const isLoadingState = isLoading || isFetching;

  return (
    <div className="search-page">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <div className="search-section">
            <h1 className="page-title">Поиск фильмов и сериалов</h1>
            <p className="page-subtitle">
              Найдите любой фильм, сериал или игру из базы данных OMDB
            </p>
            <SearchBar 
              onSearch={handleSearch} 
              disabled={isLoadingState}
              initialValue={query}
            />
          </div>

          <div className="page-layout">
            <aside className="sidebar-container">
              <Sidebar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                disabled={isLoadingState}
                totalResults={searchResult?.totalResults}
              />
            </aside>

            <section className="content-area">
              {error && (
                <div className="error-container">
                  <ErrorMessage 
                    message={typeof error === 'string' ? error : 'Произошла ошибка при поиске'}
                    onRetry={() => query && searchMovies({ query, page: currentPage, filters })}
                  />
                </div>
              )}

              {isLoadingState && (
                <div className="loading-container">
                  <Loading message="Поиск фильмов..." />
                </div>
              )}

              {!isLoadingState && !error && searchResult && searchResult.movies.length > 0 && (
                <>
                  <div className="search-results-header">
                    <h2 className="results-title">
                      Результаты поиска "{query}"
                    </h2>
                    <div className="results-meta">
                      Показано {searchResult.movies.length} из {searchResult.totalResults.toLocaleString()} результатов
                    </div>
                  </div>

                  <div className="movies-grid">
                    {searchResult.movies.map(movie => (
                      <MovieCard key={movie.imdbID} movie={movie} />
                    ))}
                  </div>

                  {searchResult.totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={searchResult.totalPages}
                      onPageChange={handlePageChange}
                      disabled={isLoadingState}
                    />
                  )}
                </>
              )}

              {!isLoadingState && !error && query && searchResult && searchResult.movies.length === 0 && (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3 className="no-results-title">Ничего не найдено</h3>
                  <p className="no-results-text">
                    По запросу "{query}" ничего не найдено. <br />
                    Попробуйте изменить поисковый запрос или настройки фильтров.
                  </p>
                </div>
              )}

              {!query && !isSearchPerformed && (
                <div className="welcome-container">
                  <div className="welcome-content">
                    <div className="welcome-icon">🎬</div>
                    <h2 className="welcome-title">Добро пожаловать в MovieFinder!</h2>
                    <p className="welcome-text">
                      Введите название фильма, сериала или игры в поле поиска выше, 
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
