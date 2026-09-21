export interface BaseDocument {
  id: string;
  version: number;
  created: Date;
  modified: Date;
  score: number;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
  paginationMeta: PaginationMeta;
  timestamp: string;
  path: string;
}

export interface PaginationMeta {
  size: number;
  page: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
