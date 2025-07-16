export interface ApiResponse<T> {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
}