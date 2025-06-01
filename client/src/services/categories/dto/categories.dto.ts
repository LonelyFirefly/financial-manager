/**
 * Category Data Transfer Objects (DTOs)
 * These define the shape of data sent to/from the API
 */

export interface CreateCategoryDto {
  name: string;
  description: string;
  isArchived: boolean;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  isArchived?: boolean;
}

export interface CategoryResponseDto {
  id: string;
  name: string;
  description: string;
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