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

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
