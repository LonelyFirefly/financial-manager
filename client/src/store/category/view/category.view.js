import { once } from 'lodash';
import { categoriesService } from '../service/category.service';
export class CategoryView {
    constructor() {
        /**
         * Delete category using service
         */
        this.deleteCategory = async (id) => {
            return categoriesService.deleteCategory(id);
        };
    }
    /**
     * Transform backend category to frontend category
     */
    transformCategory(backendCategory) {
        return Object.assign(Object.assign({}, backendCategory), { value: parseFloat(backendCategory.value) || 0 });
    }
    /**
     * Transform array of backend categories to frontend categories
     */
    _transformCategories(backendCategories) {
        return backendCategories.map(category => this.transformCategory(category));
    }
    /**
     * Get all categories from service with transformation
     */
    async getCategories() {
        const backendCategories = await categoriesService.getCategories();
        return this._transformCategories(backendCategories);
    }
    /**
     * Get category by ID from service with transformation
     */
    async getCategoryById(id) {
        const backendCategory = await categoriesService.getCategoryById(id);
        return this.transformCategory(backendCategory);
    }
    /**
     * Create a new category using service with transformation
     */
    async createCategory(data) {
        const backendCategory = await categoriesService.createCategory(data);
        return this.transformCategory(backendCategory);
    }
    /**
     * Create multiple categories using service with transformation
     */
    async createCategories(data) {
        const backendCategories = await categoriesService.createCategories(data);
        return this._transformCategories(backendCategories);
    }
    /**
     * Update category using service with transformation
     */
    async updateCategory(id, data) {
        const backendCategory = await categoriesService.updateCategory(id, data);
        return this.transformCategory(backendCategory);
    }
    /**
     * Get categories by status from service with transformation
     */
    async getCategoriesByStatus(isArchived) {
        const backendCategories = await categoriesService.getCategoriesByStatus(isArchived);
        return this._transformCategories(backendCategories);
    }
    /**
     * Search categories using service with transformation
     */
    async searchCategories(query) {
        const backendCategories = await categoriesService.searchCategories(query);
        return this._transformCategories(backendCategories);
    }
    /**
     * Get categories count from service
     */
    async getCategoriesCount() {
        return categoriesService.getCategoriesCount();
    }
    /**
     * Get categories count by status from service
     */
    async getCategoriesCountByStatus(isArchived) {
        return categoriesService.getCategoriesCountByStatus(isArchived);
    }
    /**
     * Get categories with summary calculations
     */
    async getCategorySummary() {
        const categories = await this.getCategories();
        return this.calculateSummary(categories);
    }
    /**
     * Get categories with detailed statistics
     */
    async getCategoryStats() {
        const categories = await this.getCategories();
        const summary = this.calculateSummary(categories);
        const averageValue = summary.totalCount > 0 ? summary.grandTotal / summary.totalCount : 0;
        return Object.assign(Object.assign({}, summary), { averageValue, essentialPercentage: summary.grandTotal > 0
                ? (summary.essentialTotal / summary.grandTotal) * 100
                : 0, nonEssentialPercentage: summary.grandTotal > 0
                ? (summary.nonEssentialTotal / summary.grandTotal) * 100
                : 0 });
    }
    /**
     * Get filtered categories
     */
    async getFilteredCategories(filters) {
        const categories = await this.getCategories();
        return this.applyFilters(categories, filters);
    }
    /**
     * Get categories sorted by name
     */
    async getCategoriesSortedByName(ascending = true) {
        const categories = await this.getCategories();
        return this.sortByName(categories, ascending);
    }
    /**
     * Get categories sorted by value
     */
    async getCategoriesSortedByValue(ascending = true) {
        const categories = await this.getCategories();
        return this.sortByValue(categories, ascending);
    }
    /**
     * Get categories that need attention
     */
    async getCategoriesNeedingAttention() {
        const categories = await this.getCategories();
        return {
            highValue: categories.filter((category) => this.isHighValueCategory(category)),
            archived: categories.filter((category) => category.isArchived),
        };
    }
    // Private utility methods for data transformation
    calculateSummary(categories) {
        const essentialCategories = this.filterByType(categories, 'essential');
        const nonEssentialCategories = this.filterByType(categories, 'non-essential');
        const essentialTotal = this.calculateTotal(essentialCategories);
        const nonEssentialTotal = this.calculateTotal(nonEssentialCategories);
        const grandTotal = essentialTotal + nonEssentialTotal;
        const totalCount = categories.length;
        return {
            essentialCategories,
            nonEssentialCategories,
            essentialTotal,
            nonEssentialTotal,
            grandTotal,
            totalCount,
        };
    }
    filterByType(categories, type) {
        return categories.filter(category => category.type === type);
    }
    filterByArchived(categories, isArchived) {
        return categories.filter(category => category.isArchived === isArchived);
    }
    searchCategoriesByQuery(categories, query) {
        const lowercaseQuery = query.toLowerCase();
        return categories.filter(category => category.name.toLowerCase().includes(lowercaseQuery) ||
            category.description.toLowerCase().includes(lowercaseQuery));
    }
    applyFilters(categories, filters) {
        let filtered = [...categories];
        if (filters.type) {
            filtered = this.filterByType(filtered, filters.type);
        }
        if (filters.isArchived !== undefined) {
            filtered = this.filterByArchived(filtered, filters.isArchived);
        }
        if (filters.searchQuery) {
            filtered = this.searchCategoriesByQuery(filtered, filters.searchQuery);
        }
        return filtered;
    }
    calculateTotal(categories) {
        return categories.reduce((sum, category) => sum + (category.value || 0), 0);
    }
    sortByName(categories, ascending = true) {
        return [...categories].sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return ascending ? comparison : -comparison;
        });
    }
    sortByValue(categories, ascending = true) {
        return [...categories].sort((a, b) => {
            const comparison = (a.value || 0) - (b.value || 0);
            return ascending ? comparison : -comparison;
        });
    }
    isHighValueCategory(category, threshold = 1000) {
        return (category.value || 0) > threshold;
    }
    /**
     * Format currency value for display
     */
    formatCurrency(value, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency,
        }).format(value);
    }
}
export const categoryView = once(() => new CategoryView())();
