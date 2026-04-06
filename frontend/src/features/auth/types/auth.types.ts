export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}