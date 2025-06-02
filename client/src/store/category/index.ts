// Service layer exports
export { 
  categoriesService, 
  RESOURCES as CategoryResources 
} from './service';

export type { 
  CreateCategoryDto, 
  UpdateCategoryDto, 
  CategoryResponseDto, 
  CategoryListResponseDto,
  CategoryBackendDto 
} from './service';

// View layer exports
export { categoryView } from './view';
export type { CategorySummary, CategoryFilters, CategoryStats } from './view'; 