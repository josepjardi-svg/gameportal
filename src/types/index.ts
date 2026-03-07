// src/types/index.ts
export interface Game {
  id: number;
  title: string;
  slug: string;
  description: string;
  instructions?: string;
  category: string;
  thumbnail: string;
  gameUrl: string;
  tags: string[];
  views: number;
  rating: number;
  featured: boolean;
  isNew: boolean;
  width: number;
  height: number;
  developer?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  gameCount: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  gameCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchParams {
  q?: string;
  category?: string;
  tag?: string;
  sort?: 'views' | 'rating' | 'createdAt';
  page?: number;
  limit?: number;
}
