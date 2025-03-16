import { User } from './User';

export interface UserPaginatedResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  results: User[];
}

export interface ErrorResponse {
  error: string;
}
