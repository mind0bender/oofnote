export interface successResponse<T = never> {
  message: string;
  success: true;
  data?: T;
  status: number;
}

export interface errorResponse {
  message: string;
  success: false;
  errors: string[];
  status: number;
}

export type ResponseType<T = never> = successResponse<T> | errorResponse;

export function successResponse<T = never>(
  message: string = "",
  data?: T,
  status = 200
): ResponseType<T> {
  return {
    message,
    success: true,
    data,
    status,
  };
}

export function errorResponse<T = never>(
  message: string,
  errors: string[] = [],
  status = 400
): ResponseType<T> {
  return {
    message,
    success: false,
    errors,
    status,
  };
}