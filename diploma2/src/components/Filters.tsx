import type { SearchFilters } from '../types/movie';
import './Filters.css';

interface FiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  disabled?: boolean;
}

const Filters: React.FC<FiltersProps> = ({ filters, onFiltersChange, disabled = false }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      type: e.target.value as SearchFilters['type']
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      year: e.target.value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: '',
      year: ''
    });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="type-filter">Тип:</label>
        <select
          id="type-filter"
          value={filters.type}
          onChange={handleTypeChange}
          disabled={disabled}
          className="filter-select"
        >
          <option value="">Все</option>
          <option value="movie">Фильмы</option>
          <option value="series">Сериалы</option>
          <option value="episode">Эпизоды</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year-filter">Год:</label>
        <select
          id="year-filter"
          value={filters.year}
          onChange={handleYearChange}
          disabled={disabled}
          className="filter-select"
        >
          <option value="">Любой</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {(filters.type || filters.year) && (
        <button 
          onClick={clearFilters} 
          disabled={disabled}
          className="clear-filters-btn"
        >
          Очистить фильтры
        </button>
      )}
    </div>
  );
};

export default Filters;
