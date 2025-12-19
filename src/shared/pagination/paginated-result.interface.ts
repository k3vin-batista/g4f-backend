export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

export interface PaginatedResponseDTO<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
