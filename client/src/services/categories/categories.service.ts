import { api } from "@/api";
import { Category } from "@/models/category.model";
import { CreateCategoryRequest, UpdateCategoryRequest } from "./categories.types";

class CategoriesService {
    async getCategories(): Promise<Category[]> {
        const response = await api.get<Category[]>('/category');
        return response.data;
    }

    async createCategory(data: CreateCategoryRequest): Promise<Category> {
        const response = await api.post<Category>('/category', data);
        return response.data;
    }

    async updateCategory(id: string, data: UpdateCategoryRequest): Promise<Category> {
        const response = await api.patch<Category>(`/category/${id}`, data);
        return response.data;
    }

    async deleteCategory(id: string): Promise<void> {
        await api.delete(`/category/${id}`);
    }
}

export const categoriesService = new CategoriesService(); 