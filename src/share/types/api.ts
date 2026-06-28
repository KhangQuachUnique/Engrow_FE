export type ApiResponse<T> = {
  code: number;
  data: T;
  message?: string;
};

export type ApiErrorResponse = {
  code: number;
  message: string;
  errors?: Record<string, string[]>;
};
