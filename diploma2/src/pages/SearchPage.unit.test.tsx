import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createMockStore } from '../test/testUtils'

// Mock компонентов для изоляции
vi.mock('../components/SearchBar', () => ({
  default: ({ onSearch, onClear, initialValue }: any) => (
    <div data-testid="search-bar">
      <input 
        placeholder="Введите название фильма..."
        defaultValue={initialValue}
        onChange={(e) => onSearch?.(e.target.value)}
      />
      <button onClick={onClear}>Очистить</button>
    </div>
  )
}))

vi.mock('../components/Sidebar', () => ({
  default: ({ totalResults }: any) => (
    <div data-testid="sidebar">
      <div>Фильтры</div>
      {totalResults && <div>Найдено {totalResults} фильмов</div>}
    </div>
  )
}))

vi.mock('../components/MovieCard', () => ({
  default: ({ movie }: any) => (
    <div data-testid="movie-card">
      <a href={`/movie/${movie.imdbID}`}>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </a>
    </div>
  )
}))

vi.mock('../components/Pagination', () => ({
  default: ({ currentPage, totalPages, onPageChange }: any) => (
    <nav data-testid="pagination" aria-label="pagination">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Предыдущая
      </button>
      <span>Страница {currentPage} из {totalPages}</span>
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Следующая
      </button>
    </nav>
  )
}))

vi.mock('../components/Loading', () => ({
  default: () => <div data-testid="loading">Загрузка...</div>
}))

vi.mock('../components/ErrorMessage', () => ({
  default: ({ message, onRetry }: any) => (
    <div data-testid="error-message">
      <div>⚠️</div>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Попробовать снова</button>}
    </div>
  )
}))

// Теперь импортируем SearchPage после мокирования компонентов
import SearchPage from '../pages/SearchPage'

const mockUseMovieSearch = vi.fn()

vi.mock('../hooks/useMovieSearch', () => ({
  useMovieSearch: () => mockUseMovieSearch()
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(''), vi.fn()],
    useNavigate: () => vi.fn(),
  }
})

const renderWithProviders = (store = createMockStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <SearchPage />
      </BrowserRouter>
    </Provider>
  )
}

describe('SearchPage - Component Integration', () => {
  describe('Component rendering', () => {
    it('renders all main components', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: null,
        searchQuery: '',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByTestId('search-bar')).toBeInTheDocument()
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
      expect(screen.getByText('🎬 MovieFinder')).toBeInTheDocument()
    })

    it('renders welcome content when no search is performed', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: null,
        searchQuery: '',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByText('🎬')).toBeInTheDocument()
      expect(screen.getByText('Добро пожаловать в MovieFinder!')).toBeInTheDocument()
    })

    it('renders loading component when loading', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: true,
        error: null,
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByTestId('loading')).toBeInTheDocument()
    })

    it('renders error component when error occurs', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: 'Server Error',
        originalError: { status: 500, data: 'Server Error' },
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })

  describe('Layout structure', () => {
    it('has correct page structure', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: null,
        searchQuery: '',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      // Проверяем основную структуру
      expect(screen.getByRole('main')).toBeInTheDocument()
      expect(screen.getByText('Поиск фильмов и сериалов')).toBeInTheDocument()
      expect(screen.getByText('Найдите любой фильм, сериал или игру из базы данных OMDB')).toBeInTheDocument()
    })

    it('renders search section with proper styling classes', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: null,
        searchQuery: '',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      const { container } = renderWithProviders()

      expect(container.querySelector('.search-page')).toBeInTheDocument()
      expect(container.querySelector('.search-section')).toBeInTheDocument()
      expect(container.querySelector('.page-layout')).toBeInTheDocument()
    })
  })

  describe('Conditional rendering', () => {
    it('shows movie grid when movies are loaded', () => {
      const mockMovies = [
        { imdbID: '1', Title: 'Movie 1', Year: '2021', Type: 'movie', Poster: 'url1' },
        { imdbID: '2', Title: 'Movie 2', Year: '2022', Type: 'movie', Poster: 'url2' }
      ]

      mockUseMovieSearch.mockReturnValue({
        movies: mockMovies,
        loading: false,
        error: null,
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 1,
        totalResults: 2,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByText('Результаты поиска "test"')).toBeInTheDocument()
      expect(screen.getAllByTestId('movie-card')).toHaveLength(2)
    })

    it('shows no results when empty data received', () => {
      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: null,
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByText('🔍')).toBeInTheDocument()
      expect(screen.getByText('Ничего не найдено')).toBeInTheDocument()
    })

    it('shows pagination when total results exceed page size', () => {
      const mockMovies = Array.from({ length: 10 }, (_, i) => ({
        imdbID: `${i}`,
        Title: `Movie ${i}`,
        Year: '2021',
        Type: 'movie',
        Poster: 'url'
      }))

      mockUseMovieSearch.mockReturnValue({
        movies: mockMovies,
        loading: false,
        error: null,
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 5,
        totalResults: 50,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByTestId('pagination')).toBeInTheDocument()
    })
  })

  describe('Error handling states', () => {
    it('handles API error correctly', () => {
      const mockError = 'Invalid API key!'

      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: mockError,
        originalError: { status: 401, data: { Response: 'False', Error: 'Invalid API key!' } },
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
      expect(screen.getByText('Попробовать снова')).toBeInTheDocument()
    })

    it('handles network error correctly', () => {
      const mockError = 'Network Error'

      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: mockError,
        originalError: { status: 'FETCH_ERROR', error: 'Network Error' },
        searchQuery: 'test',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders()

      expect(screen.getByTestId('error-message')).toBeInTheDocument()
    })
  })

  describe('State management integration', () => {
    it('integrates with Redux store correctly', () => {
      const customStore = createMockStore({
        search: {
          query: 'test query',
          type: 'movie',
          year: '2021',
          page: 1
        }
      })

      mockUseMovieSearch.mockReturnValue({
        movies: [],
        loading: false,
        error: null,
        searchQuery: '',
        currentPage: 1,
        totalPages: 0,
        totalResults: 0,
        filters: {},
        handleSearch: vi.fn(),
        handlePageChange: vi.fn(),
        handleFiltersChange: vi.fn(),
        clearError: vi.fn()
      })

      renderWithProviders(customStore)

      expect(screen.getByTestId('search-bar')).toBeInTheDocument()
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })
  })
})
