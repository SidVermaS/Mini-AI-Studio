export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Generation {
  id: string;
  userId: string;
  imageUrl: string;
  prompt: string;
  resultImageUrl?: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  errorMessage?: string;
  processingTime?: number;
  createdAt: string;
  completedAt?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface GenerationsResponse {
  generations: Generation[];
}
export * from './styles'