export interface User {
  id: string;
  email: string;
  name?: string;
  is_admin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface Url {
  id: string;
  user_id: string | null;
  original_url: string;
  short_code: string;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
  click_count?: number;
}

export interface CreateUrlRequest {
  original_url: string;
  expires_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}
