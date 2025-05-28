import api from "@/api/axios";

class CategoriesService {
    async getCategories() {
        const response = await api.get<string[]>('/category');
        return response.data;
    }
}

export const categoriesService = new CategoriesService();