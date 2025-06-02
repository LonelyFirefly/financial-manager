import { api } from '@/api';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CategoryBackendDto,
} from './dto/categories.dto';
import { RESOURCES } from './category.resources';
import { once } from 'lodash';

class CategoriesService {
  async getCategories(): Promise<CategoryBackendDto[]> {
    const response = await api.get<CategoryBackendDto[]>(RESOURCES.LIST);
    return response.data;
  }

  async getCategoryById(id: string): Promise<CategoryBackendDto> {
    const response = await api.get<CategoryBackendDto>(RESOURCES.GET_BY_ID(id));
    return response.data;
  }

  async createCategory(data: CreateCategoryDto): Promise<CategoryBackendDto> {
    const response = await api.post<CategoryBackendDto>(RESOURCES.CREATE, data);
    return response.data;
  }

  async createCategories(
    data: CreateCategoryDto[]
  ): Promise<CategoryBackendDto[]> {
    const response = await api.post<CategoryBackendDto[]>(
      RESOURCES.CREATE,
      data
    );
    return response.data;
  }

  async updateCategory(
    id: string,
    data: UpdateCategoryDto
  ): Promise<CategoryBackendDto> {
    const response = await api.patch<CategoryBackendDto>(
      RESOURCES.UPDATE(id),
      data
    );
    return response.data;
  }

  async deleteCategory(id: string): Promise<void> {
    await api.delete(RESOURCES.DELETE(id));
  }

  async getCategoriesByStatus(
    isArchived: boolean
  ): Promise<CategoryBackendDto[]> {
    const response = await api.get<CategoryBackendDto[]>(
      RESOURCES.BY_STATUS(isArchived)
    );
    return response.data;
  }

  async searchCategories(query: string): Promise<CategoryBackendDto[]> {
    const response = await api.get<CategoryBackendDto[]>(
      RESOURCES.SEARCH(query)
    );
    return response.data;
  }

  async getCategoriesCount(): Promise<number> {
    const response = await api.get<{ count: number }>(RESOURCES.COUNT);
    return response.data.count;
  }

  async getCategoriesCountByStatus(isArchived: boolean): Promise<number> {
    const response = await api.get<{ count: number }>(
      RESOURCES.COUNT_BY_STATUS(isArchived)
    );
    return response.data.count;
  }
}

export const categoriesService = once(() => new CategoriesService())();
