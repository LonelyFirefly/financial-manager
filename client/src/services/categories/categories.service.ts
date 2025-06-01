import { api } from "@/api";
import { Category } from "@/models/category.model";
import { CreateCategoryDto, UpdateCategoryDto } from "./dto/categories.dto";
import { RESOURCES } from "./categories.resources";

class CategoriesService {
    async getCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>(RESOURCES.LIST);
        return response.data;
    }

    async getCategoryById(id: string): Promise<Category> {
        const response = await api.get<Category>(RESOURCES.GET_BY_ID(id));
        return response.data;
    }

    async createCategory(data: CreateCategoryDto): Promise<Category> {
        const response = await api.post<Category>(RESOURCES.CREATE, data);
        return response.data;
    }

    async updateCategory(id: string, data: UpdateCategoryDto): Promise<Category> {
        const response = await api.patch<Category>(RESOURCES.UPDATE(id), data);
        return response.data;
    }

    async deleteCategory(id: string): Promise<void> {
        await api.delete(RESOURCES.DELETE(id));
    }

    async getCategoriesByStatus(isArchived: boolean): Promise<Category[]> {
        const response = await api.get<Category[]>(RESOURCES.BY_STATUS(isArchived));
        return response.data;
    }

    async searchCategories(query: string): Promise<Category[]> {
        const response = await api.get<Category[]>(RESOURCES.SEARCH(query));
        return response.data;
    }
}

export const categoriesService = new CategoriesService(); 