export interface api_response<T> {
  message?: string;
  data?: T[];
  accessToken?: string;
  refreshToken?: string;
}

