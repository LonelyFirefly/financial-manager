import api from "@/api/axios";
import { Category } from "@/models/category.model";
import { CreateCategoryRequest } from "@/components/layout/categories/hooks/use-categories";

class CategoriesService {
    async getCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>('/category');
        return response.data;
    }

    async createCategory(data: CreateCategoryRequest): Promise<Category> {
        const response = await api.post<Category>('/category', data);
        return response.data;
    }
}

export const categoriesService = new CategoriesService();