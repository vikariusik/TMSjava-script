export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: 'movie' | 'series' | 'episode' | 'game';
  Poster: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetailsResponse extends MovieDetails {
  Response: string;
  Error?: string;
}

export interface SearchFilters {
  type: '' | 'movie' | 'series' | 'episode' | 'game';
  year: string;
}

export interface SearchResult {
  movies: Movie[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
}
