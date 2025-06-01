export interface CreateCategoryRequest {
  name: string;
  description: string;
  isArchived: boolean;
}

export interface UpdateCategoryRequest {
  name?: string;
  description?: string;
  isArchived?: boolean;
} 