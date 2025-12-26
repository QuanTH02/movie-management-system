export interface Movie {
  movie_id: number;
  movie_name: string;
  movie_year?: number;
  movie_time?: string;
  movie_rating?: number;
  movie_description?: string;
  describe_movie?: string;
  main_img?: string;
  main_trailer?: string;
  total_vote?: number;
  rating?: number;
  revenue?: number;
  [key: string]: unknown;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  [key: string]: unknown;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access?: string;
  refresh?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  username?: string; // For backward compatibility
}

export interface RegisterRequest {
  account: string;
  name: string;
  gmail: string;
  password: string;
  confirm_password: string;
}

export interface RegisterResponse {
  message: string;
  access?: string;
  refresh?: string;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
}

export interface MovieDetailResponse {
  message: string;
  data: Movie[];
}

export interface ReviewRequest {
  movie: string;
  name_review: string;
  star_review: number;
  title_review: string;
  content_review: string;
  film_review_id?: number;
}

export interface LikeMovieRequest {
  userName: string;
  movieName: string;
}

export interface TrackActivityRequest {
  movieName: string;
  activityType: "VIEW_DETAIL" | "CLICK_CARD" | "VIEW_TRAILER" | "SEARCH_CLICK";
}
