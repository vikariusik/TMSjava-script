import type { SearchFilters } from '../types/movie';
import './Sidebar.css';

interface SidebarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  disabled?: boolean;
  totalResults?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  filters, 
  onFiltersChange, 
  disabled = false,
  totalResults 
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked ? e.target.value as SearchFilters['type'] : '';
    onFiltersChange({
      ...filters,
      type: value
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      year: e.target.value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      type: '',
      year: ''
    });
  };

  const hasActiveFilters = filters.type || filters.year;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">Фильтры</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            disabled={disabled}
            className="clear-all-btn"
          >
            Сбросить
          </button>
        )}
      </div>

      {totalResults !== undefined && (
        <div className="results-count">
          Найдено: <strong>{totalResults.toLocaleString()}</strong> результатов
        </div>
      )}

      <div className="filter-section">
        <h4 className="filter-title">Тип контента</h4>
        <div className="filter-options">
          {[
            { value: 'movie', label: 'Фильмы' },
            { value: 'series', label: 'Сериалы' },
            { value: 'episode', label: 'Эпизоды' },
            { value: 'game', label: 'Игры' }
          ].map(option => (
            <label key={option.value} className="filter-option">
              <input
                type="radio"
                name="type"
                value={option.value}
                checked={filters.type === option.value}
                onChange={handleTypeChange}
                disabled={disabled}
                className="filter-radio"
              />
              <span className="filter-label">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4 className="filter-title">Год выпуска</h4>
        <select
          value={filters.year}
          onChange={handleYearChange}
          disabled={disabled}
          className="filter-select"
        >
          <option value="">Любой год</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="filter-info">
        <small className="filter-note">
          Фильтры помогают найти именно то, что вы ищете
        </small>
      </div>
    </div>
  );
};

export default Sidebar;
