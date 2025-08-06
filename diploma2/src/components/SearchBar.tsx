import { useState } from 'react';
import type { FormEvent } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  disabled = false, 
  placeholder = "Поиск фильмов, сериалов...",
  initialValue = ""
}) => {
  const [query, setQuery] = useState<string>(initialValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onSearch(newValue); // Вызываем onSearch при каждом изменении для debounce
  };

  const handleClear = () => {
    setQuery('');
    onSearch(''); // Очищаем поиск
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="search-input"
            disabled={disabled}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="search-clear"
              disabled={disabled}
            >
              ✕
            </button>
          )}
          <button 
            type="submit" 
            className="search-submit"
            disabled={disabled || !query.trim()}
          >
            🔍
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
