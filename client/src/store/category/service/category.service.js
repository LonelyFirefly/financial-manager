import { once } from 'lodash';
import { api } from '@/api';
import { RESOURCES } from './category.resources';
class CategoriesService {
    async getCategories() {
        const response = await api.get(RESOURCES.LIST);
        return response.data;
    }
    async getCategoryById(id) {
        const response = await api.get(RESOURCES.GET_BY_ID(id));
        return response.data;
    }
    async createCategory(data) {
        const response = await api.post(RESOURCES.CREATE, data);
        return response.data;
    }
    async createCategories(data) {
        const response = await api.post(RESOURCES.CREATE, data);
        return response.data;
    }
    async updateCategory(id, data) {
        const response = await api.patch(RESOURCES.UPDATE(id), data);
        return response.data;
    }
    async deleteCategory(id) {
        await api.delete(RESOURCES.DELETE(id));
    }
    async getCategoriesByStatus(isArchived) {
        const response = await api.get(RESOURCES.BY_STATUS(isArchived));
        return response.data;
    }
    async searchCategories(query) {
        const response = await api.get(RESOURCES.SEARCH(query));
        return response.data;
    }
    async getCategoriesCount() {
        const response = await api.get(RESOURCES.COUNT);
        return response.data.count;
    }
    async getCategoriesCountByStatus(isArchived) {
        const response = await api.get(RESOURCES.COUNT_BY_STATUS(isArchived));
        return response.data.count;
    }
}
export const categoriesService = once(() => new CategoriesService())();
