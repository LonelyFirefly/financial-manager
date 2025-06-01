/**
 * Category Data Transfer Objects (DTOs)
 * These define the shape of data sent to/from the API
 */

export interface CreateCategoryDto {
  name: string;
  description: string;
  type: 'essential' | 'non-essential';
  value: number;
  isArchived: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  type?: 'essential' | 'non-essential';
  value?: number;
  isArchived?: boolean;
}

// Raw backend response interfaces (before transformation)
export interface CategoryBackendDto {
  id: string;
  name: string;
  description: string;
  type: 'essential' | 'non-essential';
  value: string; // Backend sends as string
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Frontend interfaces (after transformation)
export interface CategoryResponseDto {
  id: string;
  name: string;
  description: string;
  type: 'essential' | 'non-essential';
  value: number; // Transformed to number
  isArchived: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryListResponseDto {
  categories: CategoryResponseDto[];
  total: number;
  page?: number;
  limit?: number;
} 